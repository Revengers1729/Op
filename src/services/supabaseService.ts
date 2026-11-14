import { createClient, SupabaseClient, RealtimeChannel } from '@supabase/supabase-js';
import { EyewearItem, LensOption, FrameShape, EyewearTier, EyewearColor } from '../types/optical';
import { CategoryItem, AppointmentItem, StoreSettings, DEFAULT_STORE_SETTINGS, storageService } from './storageService';
import { CATALOG_ITEMS, LENS_OPTIONS } from '../data/catalog';

// ==========================================
// SUPABASE GLOBAL CLOUD DATABASE CONFIGURATION
// ==========================================
export const DEFAULT_SUPABASE_URL = "https://nfciqwxsxoabquruvnzr.supabase.co";
export const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_5mCjPAzG7dePjXOHkSVL1Q_WkZy_keP";

// Single Supabase client instance
export const supabase: SupabaseClient = createClient(
  DEFAULT_SUPABASE_URL,
  DEFAULT_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

// High-res optical eyewear studio photo mapping by shape (Lenskart white background standard)
export const SHAPE_STUDIO_IMAGE_MAP: Record<string, string> = {
  rimless: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=800&q=80',
  hexagonal: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80',
  clubmaster: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
  aviator: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80',
  wayfarer: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
  round: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
  'cat-eye': 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80',
  rectangle: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80',
};

export const REALTIME_CHANNEL_NAME = 'ao_global_realtime';

// Track optional dedicated tables so missing tables don't spam 404 requests
const optionalTableExists: Record<'categories' | 'lens_packages' | 'appointments', boolean | null> = {
  categories: null,
  lens_packages: null,
  appointments: null,
};

function isMissingTableError(error: any): boolean {
  const msg = String(error?.message || '').toLowerCase();
  return (
    error?.code === 'PGRST205' ||
    error?.code === '42P01' ||
    msg.includes('could not find the table') ||
    msg.includes('does not exist')
  );
}

// Global real-time broadcast across all open devices, browsers, and tabs
export async function broadcastCatalogChange(detail?: { table?: string; action?: string; id?: string }): Promise<void> {
  const payload = { timestamp: Date.now(), ...(detail || {}) };

  try {
    const ch = supabase.channel(REALTIME_CHANNEL_NAME, {
      config: { broadcast: { self: false } },
    }) as any;

    if (typeof ch.httpSend === 'function') {
      await ch.httpSend('catalog_updated', payload);
    } else if (typeof ch.send === 'function') {
      await ch.send({
        type: 'broadcast',
        event: 'catalog_updated',
        payload,
      });
    }
  } catch (e) {
    console.warn('Realtime broadcast notice:', e);
  }

  // Cross-tab sync on same client machine via Web BroadcastChannel
  try {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const bc = new BroadcastChannel('ao_local_broadcast');
      bc.postMessage({ type: 'catalog_updated', ...payload });
      bc.close();
    }
  } catch {}
}

const realtimeListeners = new Set<() => void>();
let sharedRealtimeChannel: RealtimeChannel | null = null;
let sharedBroadcastChannel: BroadcastChannel | null = null;
let notifyDebounceTimer: ReturnType<typeof setTimeout> | null = null;

function notifyAllRealtimeListeners(): void {
  if (notifyDebounceTimer) clearTimeout(notifyDebounceTimer);
  notifyDebounceTimer = setTimeout(() => {
    realtimeListeners.forEach((cb) => {
      try {
        cb();
      } catch (err) {
        console.warn('Realtime listener callback error:', err);
      }
    });
  }, 120);
}

function registerRealtimeListener(onDataChange: () => void): { unsubscribe: () => void } {
  realtimeListeners.add(onDataChange);

  if (!sharedRealtimeChannel) {
    sharedRealtimeChannel = supabase
      .channel(REALTIME_CHANNEL_NAME, {
        config: {
          broadcast: { self: false },
        },
      })
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => notifyAllRealtimeListeners()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'categories' },
        () => notifyAllRealtimeListeners()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'lens_packages' },
        () => notifyAllRealtimeListeners()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'appointments' },
        () => notifyAllRealtimeListeners()
      )
      .on(
        'broadcast',
        { event: 'catalog_updated' },
        () => notifyAllRealtimeListeners()
      )
      .subscribe();
  }

  if (!sharedBroadcastChannel && typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    try {
      sharedBroadcastChannel = new BroadcastChannel('ao_local_broadcast');
      sharedBroadcastChannel.onmessage = (event) => {
        if (event.data?.type === 'catalog_updated') {
          notifyAllRealtimeListeners();
        }
      };
    } catch {}
  }

  return {
    unsubscribe: () => {
      realtimeListeners.delete(onDataChange);
      if (realtimeListeners.size === 0) {
        if (notifyDebounceTimer) {
          clearTimeout(notifyDebounceTimer);
          notifyDebounceTimer = null;
        }
        if (sharedRealtimeChannel) {
          try {
            supabase.removeChannel(sharedRealtimeChannel);
          } catch {}
          sharedRealtimeChannel = null;
        }
        if (sharedBroadcastChannel) {
          try {
            sharedBroadcastChannel.close();
          } catch {}
          sharedBroadcastChannel = null;
        }
      }
    },
  };
}

export function getStudioEyewearImage(shape?: string, providedUrl?: string): string {
  if (providedUrl && typeof providedUrl === 'string') {
    const trimmed = providedUrl.trim();
    const lower = trimmed.toLowerCase();
    const isValidScheme =
      lower.startsWith('https://') ||
      lower.startsWith('http://') ||
      lower.startsWith('data:image/') ||
      lower.startsWith('/');
    if (
      trimmed.length > 0 &&
      isValidScheme &&
      lower !== 'null' &&
      lower !== 'undefined' &&
      !lower.startsWith('blob:') &&
      !trimmed.includes('photo-1591076482161-42ce6da69f67') &&
      !(lower.startsWith('data:') && trimmed.length < 300)
    ) {
      return trimmed;
    }
  }
  const s = (shape || 'rectangle').toLowerCase();
  return SHAPE_STUDIO_IMAGE_MAP[s] || SHAPE_STUDIO_IMAGE_MAP.rectangle;
}

// Fallback high-res optical imagery mapping
const CATEGORY_IMAGE_MAP: Record<string, string> = {
  men: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  women: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  kids: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=300&q=80',
  bluecut: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=300&q=80',
  screen: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=300&q=80',
  sunglasses: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80',
  budget: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=300&q=80',
  progressive: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=300&q=80',
  reading: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=300&q=80',
  'contact-lenses': 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=300&q=80',
};

// Color normalization helper to ensure UI hex rendering never breaks
function colorNameToHex(colorName: string): { hex: string; rimColor: string; templeColor: string } {
  const lower = (colorName || '').toLowerCase();
  if (lower.includes('blue') || lower.includes('cobalt') || lower.includes('navy')) {
    return { hex: '#1E3A8A', rimColor: '#2563EB', templeColor: '#0F172A' };
  }
  if (lower.includes('gold') || lower.includes('amber') || lower.includes('honey')) {
    return { hex: '#D97706', rimColor: '#F59E0B', templeColor: '#78350F' };
  }
  if (lower.includes('silver') || lower.includes('grey') || lower.includes('gray') || lower.includes('chrome')) {
    return { hex: '#64748B', rimColor: '#94A3B8', templeColor: '#334155' };
  }
  if (lower.includes('tortoise') || lower.includes('brown') || lower.includes('havana')) {
    return { hex: '#78350F', rimColor: '#92400E', templeColor: '#451A03' };
  }
  if (lower.includes('clear') || lower.includes('crystal') || lower.includes('transparent')) {
    return { hex: '#CBD5E1', rimColor: '#E2E8F0', templeColor: '#94A3B8' };
  }
  if (lower.includes('rose') || lower.includes('pink') || lower.includes('wine') || lower.includes('burgundy')) {
    return { hex: '#9F1239', rimColor: '#BE123C', templeColor: '#4C0519' };
  }
  if (lower.includes('gunmetal') || lower.includes('matte black') || lower.includes('midnight') || lower.includes('black')) {
    return { hex: '#18181B', rimColor: '#27272A', templeColor: '#09090B' };
  }
  if (lower.includes('green') || lower.includes('emerald') || lower.includes('olive')) {
    return { hex: '#065F46', rimColor: '#047857', templeColor: '#022C22' };
  }
  return { hex: '#18181B', rimColor: '#27272A', templeColor: '#09090B' };
}

function parseDimensions(dim: any): { lensWidth: number; bridge: number; temple: number } {
  if (dim && typeof dim === 'object' && 'lensWidth' in dim) {
    return {
      lensWidth: Number(dim.lensWidth) || 52,
      bridge: Number(dim.bridge) || 18,
      temple: Number(dim.temple) || 142,
    };
  }
  if (typeof dim === 'string') {
    const match = dim.match(/(\d+)[\s-]*(\d+)[\s-]*(\d+)/);
    if (match) {
      return {
        lensWidth: Number(match[1]) || 52,
        bridge: Number(match[2]) || 18,
        temple: Number(match[3]) || 142,
      };
    }
  }
  return { lensWidth: 52, bridge: 18, temple: 142 };
}

function normalizeShape(s: any): FrameShape {
  if (!s || typeof s !== 'string') return 'rectangle';
  const l = s.toLowerCase().trim();
  if (l.includes('rect')) return 'rectangle';
  if (l.includes('round')) return 'round';
  if (l.includes('aviat')) return 'aviator';
  if (l.includes('wayf')) return 'wayfarer';
  if (l.includes('club')) return 'clubmaster';
  if (l.includes('cat')) return 'cat-eye';
  if (l.includes('hex') || l.includes('geom') || l.includes('sequire')) return 'hexagonal';
  if (l.includes('rimless')) return 'rimless';
  return 'rectangle';
}

function normalizeCategory(c: any): 'eyeglasses' | 'sunglasses' | 'screen' | 'reading' {
  if (!c || typeof c !== 'string') return 'eyeglasses';
  const l = c.toLowerCase().trim();
  if (l.includes('sun')) return 'sunglasses';
  if (l.includes('screen') || l.includes('blue') || l.includes('comp')) return 'screen';
  if (l.includes('read') || l.includes('power')) return 'reading';
  return 'eyeglasses';
}

function normalizeTier(price: number, tierVal?: any): EyewearTier {
  if (tierVal && ['budget', 'middle', 'premium'].includes(tierVal)) {
    return tierVal as EyewearTier;
  }
  if (price < 1000) return 'budget';
  if (price > 2500) return 'premium';
  return 'middle';
}

export const supabaseService = {
  // Test connection to Supabase
  async testConnection(): Promise<{ success: boolean; message: string; rowCount?: number }> {
    try {
      const { data, count, error } = await supabase
        .from('products')
        .select('id', { count: 'exact' })
        .not('id', 'like', '__config_%')
        .limit(1);

      if (error) {
        return { success: false, message: error.message };
      }
      return {
        success: true,
        message: 'Connected to Supabase Cloud Database successfully!',
        rowCount: count ?? (data?.length || 0),
      };
    } catch (e: any) {
      return { success: false, message: e?.message || 'Connection failed' };
    }
  },

  // ==========================================
  // 1. PRODUCTS / FRAMES (GLOBAL SUPABASE SYNC)
  // ==========================================
  async fetchProducts(): Promise<EyewearItem[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .not('id', 'like', '__config_%')
        .order('id', { ascending: true });

      if (error) {
        console.warn('Supabase fetch products error, fallback to local/default:', error.message);
        return [];
      }

      if (data && data.length > 0) {
        return data
          .filter((row: any) => row.category !== 'system_config' && !String(row.id).startsWith('__config_'))
          .map((row: any) => {
            const rawPrice = Number(row.price || 1499);
            const rawOriginal = Number(
              row.original_price ?? row.mrp ?? row.originalPrice ?? (rawPrice ? Math.round(rawPrice * 1.5) : 2500)
            );
            
            // Normalize colors
            let colors: EyewearColor[] = [];
            if (Array.isArray(row.colors) && row.colors.length > 0) {
              colors = row.colors.map((c: any) => {
                if (typeof c === 'string') {
                  const colorsInfo = colorNameToHex(c);
                  return {
                    name: c,
                    hex: colorsInfo.hex,
                    rimColor: colorsInfo.rimColor,
                    templeColor: colorsInfo.templeColor,
                  };
                }
                if (typeof c === 'object' && c !== null) {
                  const baseInfo = colorNameToHex(c.name || 'Black');
                  return {
                    name: c.name || 'Classic Black',
                    hex: c.hex || baseInfo.hex,
                    rimColor: c.rimColor || c.hex || baseInfo.rimColor,
                    templeColor: c.templeColor || baseInfo.templeColor,
                  };
                }
                return {
                  name: 'Classic Matte Black',
                  hex: '#18181B',
                  rimColor: '#27272A',
                  templeColor: '#09090B',
                };
              });
            } else {
              colors = [
                { name: 'Classic Matte Black', hex: '#18181B', rimColor: '#27272A', templeColor: '#09090B' },
                { name: 'Gunmetal Silver', hex: '#64748B', rimColor: '#94A3B8', templeColor: '#334155' },
              ];
            }

            // Clean legacy text
            const cleanName = (row.name || 'Anand Optical Frame')
              .replace(/Kajal\s*Opticals?/gi, 'Anand Optical')
              .replace(/Kajal/gi, 'Anand')
              .trim();

            const cleanBrand = (row.brand || 'Anand Signature')
              .replace(/Kajal\s*Coll[a-z]*/gi, 'Anand Collection')
              .replace(/Kajal\s*Heritage/gi, 'Anand Heritage')
              .replace(/Kajal\s*OptiShield/gi, 'Anand OptiShield')
              .replace(/Kajal/gi, 'Anand')
              .trim();

            const cleanDesc = (row.description || 'Precision optical frame with pressure-free ergonomics.')
              .replace(/Kajal\s*Opticals?/gi, 'Anand Optical')
              .replace(/Kajal/gi, 'Anand')
              .trim();

            const idStr = String(row.id);
            const codeVal = row.code || `AO-${idStr.replace(/[^a-zA-Z0-9]/g, '').slice(-4).toUpperCase()}`;
            const inStockVal = row.in_stock !== undefined
              ? Boolean(row.in_stock)
              : (row.is_available !== undefined ? Boolean(row.is_available) : true);

            return {
              id: idStr,
              name: cleanName,
              code: codeVal,
              tier: normalizeTier(rawPrice, row.tier),
              shape: normalizeShape(row.shape),
              material: row.material || 'TR90 Ultra-Flex Polymer',
              weightGrams: Number(row.weight_grams ?? row.weightGrams ?? 12),
              price: rawPrice,
              originalPrice: rawOriginal,
              mrp: rawOriginal,
              dimensions: parseDimensions(row.dimensions),
              colors,
              tags: Array.isArray(row.tags) && row.tags.length > 0
                ? row.tags
                : [row.badge || 'Verified Optics', 'Anand Quality'],
              bestForFace: Array.isArray(row.best_for_face ?? row.bestForFace)
                ? (row.best_for_face ?? row.bestForFace)
                : ['Oval', 'Round', 'Square'],
              description: cleanDesc,
              features: Array.isArray(row.features) && row.features.length > 0
                ? row.features
                : ['1-Year Store Warranty', 'Pressure-Free Ergonomics'],
              inStock: inStockVal,
              isAvailable: inStockVal,
              isPopular: Boolean(row.is_popular || row.badge === 'Bestseller'),
              gender: (row.gender?.toLowerCase() as any) || 'unisex',
              category: normalizeCategory(row.category),
              rating: Number(row.rating || 4.8),
              reviewsCount: Number(row.reviews_count || 110),
              size: row.size || 'Medium',
              brand: cleanBrand,
              imageUrl: getStudioEyewearImage(row.shape, row.image_url || row.imageUrl),
            };
          });
      }
    } catch (e) {
      console.warn('Supabase fetchProducts failed:', e);
    }
    return [];
  },

  // UPSERT PRODUCT (Add or Update globally in Supabase Cloud)
  async upsertProduct(product: EyewearItem): Promise<boolean> {
    try {
      const colorsPayload = Array.isArray(product.colors) && product.colors.length > 0
        ? product.colors.map((c: any) => (typeof c === 'string' ? c : (c?.name || 'Classic Black')))
        : ['Classic Matte Black', 'Gunmetal Silver'];

      let dimStr = '52-18-142 mm';
      if (typeof product.dimensions === 'string') {
        dimStr = product.dimensions;
      } else if (product.dimensions && typeof product.dimensions === 'object') {
        dimStr = `${product.dimensions.lensWidth || 52}-${product.dimensions.bridge || 18}-${product.dimensions.temple || 142} mm`;
      }

      const imgUrl = getStudioEyewearImage(product.shape, (product as any).imageUrl || (product as any).imagePreview);

      const rawPrice = Number(product.price) || 1499;
      const rawOriginal = Number(
        product.originalPrice ?? (product as any).mrp ?? (product as any).original_price ?? Math.round(rawPrice * 1.5)
      );
      const inStockVal = product.inStock !== undefined
        ? Boolean(product.inStock)
        : ((product as any).is_available !== undefined ? Boolean((product as any).is_available) : true);

      const payload: any = {
        id: product.id,
        name: (product.name || 'Anand Optical Frame').trim(),
        brand: product.brand ? product.brand.trim() : 'Anand Signature',
        category: product.category || 'eyeglasses',
        shape: product.shape || 'rectangle',
        material: product.material || 'TR90 Ultra-Flex Polymer',
        price: rawPrice,
        original_price: rawOriginal,
        badge: product.isPopular ? 'Bestseller' : (product.tags?.[0] || 'Verified'),
        in_stock: inStockVal,
        image_url: imgUrl,
        description: (product.description || 'Precision optical frame with pressure-free ergonomics.').trim(),
        gender: product.gender || 'unisex',
        dimensions: dimStr,
        colors: colorsPayload,
        features: Array.isArray(product.features) && product.features.length > 0 ? product.features : ['1-Year Store Warranty'],
      };

      let { error } = await supabase
        .from('products')
        .upsert(payload, { onConflict: 'id' });

      // Adaptive retry if database uses mrp / is_available column names
      if (error && (error.message?.includes('original_price') || error.message?.includes('in_stock'))) {
        const altPayload: any = { ...payload };
        if (error.message.includes('original_price')) {
          delete altPayload.original_price;
          altPayload.mrp = rawOriginal;
        }
        if (error.message.includes('in_stock')) {
          delete altPayload.in_stock;
          altPayload.is_available = inStockVal;
        }
        const retry = await supabase.from('products').upsert(altPayload, { onConflict: 'id' });
        error = retry.error;
      }

      if (error) {
        console.error('Supabase upsertProduct error:', error);
        return false;
      }
      await broadcastCatalogChange({ table: 'products', action: 'upsert', id: product.id });
      return true;
    } catch (e) {
      console.error('Supabase upsertProduct exception:', e);
      return false;
    }
  },

  // DELETE PRODUCT
  async deleteProduct(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase deleteProduct error:', error);
        return false;
      }
      await broadcastCatalogChange({ table: 'products', action: 'delete', id });
      return true;
    } catch (e) {
      console.error('Supabase deleteProduct exception:', e);
      return false;
    }
  },

  // TOGGLE IN-STOCK / SOLD-OUT GLOBALLY
  async toggleStock(id: string, inStock: boolean): Promise<boolean> {
    try {
      let { error } = await supabase
        .from('products')
        .update({ in_stock: inStock })
        .eq('id', id);

      if (error && error.message?.includes('in_stock')) {
        const retry = await supabase
          .from('products')
          .update({ is_available: inStock })
          .eq('id', id);
        error = retry.error;
      }

      if (error) {
        console.error('Supabase toggleStock error:', error);
        return false;
      }
      await broadcastCatalogChange({ table: 'products', action: 'stock_toggle', id });
      return true;
    } catch (e) {
      console.error('Supabase toggleStock exception:', e);
      return false;
    }
  },

  // ==========================================
  // 2. CATEGORIES (GLOBAL SUPABASE SYNC)
  // Supports both standalone categories table AND __config_categories__ row
  // ==========================================
  async fetchCategories(): Promise<CategoryItem[]> {
    try {
      // 1. Try dedicated categories table if not known missing
      if (optionalTableExists.categories !== false) {
        const { data, error } = await supabase.from('categories').select('*');
        if (!error) {
          optionalTableExists.categories = true;
          if (data && data.length > 0) {
            return data.map((r: any) => ({
              id: String(r.id),
              label: r.label || r.name || String(r.id),
              type: r.type || 'category',
              sublabel: r.sublabel || '',
              imageUrl: getStudioEyewearImage(
                r.id,
                r.image_url || r.imageUrl || CATEGORY_IMAGE_MAP[r.id]
              ),
            }));
          }
        } else if (isMissingTableError(error)) {
          optionalTableExists.categories = false;
        }
      }

      // 2. Reliable fallback to __config_categories__ in products table
      const { data: configRow } = await supabase
        .from('products')
        .select('description')
        .eq('id', '__config_categories__')
        .maybeSingle();

      if (configRow && configRow.description) {
        const parsed = JSON.parse(configRow.description);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((c: any) => {
            const rawImg = c.imageUrl && !String(c.imageUrl).includes('photo-1591076482161-42ce6da69f67')
              ? c.imageUrl
              : (CATEGORY_IMAGE_MAP[c.id] || SHAPE_STUDIO_IMAGE_MAP[c.id] || SHAPE_STUDIO_IMAGE_MAP.rectangle);
            return {
              id: c.id,
              label: c.label || c.id,
              type: c.type || (['men', 'women', 'kids'].includes(c.id) ? 'gender' : 'category'),
              sublabel: c.sublabel || (c.id === 'men' ? 'Trending' : c.id === 'women' ? 'Designer' : 'Collection'),
              imageUrl: rawImg,
            };
          });
        }
      }
    } catch (e) {
      console.warn('Supabase fetchCategories notice:', e);
    }
    return [];
  },

  // Save full list of categories globally to Supabase
  async saveAllCategories(categoriesList: CategoryItem[]): Promise<boolean> {
    try {
      if (optionalTableExists.categories === true) {
        for (const cat of categoriesList) {
          try {
            await supabase.from('categories').upsert({
              id: cat.id,
              label: cat.label,
              type: cat.type,
              sublabel: cat.sublabel,
              image_url: cat.imageUrl,
            }, { onConflict: 'id' });
          } catch {}
        }
      }

      // Persist to __config_categories__ in products table for guaranteed multi-device sync
      const jsonStr = JSON.stringify(categoriesList);
      const { error } = await supabase.from('products').upsert({
        id: '__config_categories__',
        name: '__GLOBAL_CATEGORIES__',
        brand: 'Anand Collection',
        category: 'system_config',
        shape: 'rectangle',
        material: 'Config Data',
        price: 0,
        original_price: 0,
        in_stock: false,
        image_url: SHAPE_STUDIO_IMAGE_MAP.rectangle,
        description: jsonStr,
        gender: 'unisex',
        dimensions: '52-18-140 mm',
        colors: ['Black', 'Tortoise'],
        features: ['Global Categories Sync'],
      }, { onConflict: 'id' });

      if (error) {
        console.error('Supabase saveAllCategories error:', error);
        return false;
      }

      await broadcastCatalogChange({ table: 'categories', action: 'save_all' });
      return true;
    } catch (e) {
      console.error('Failed to sync categories to Supabase:', e);
      return false;
    }
  },

  async deleteCategory(id: string): Promise<boolean> {
    try {
      if (optionalTableExists.categories === true) {
        await supabase.from('categories').delete().eq('id', id);
      }
      await broadcastCatalogChange({ table: 'categories', action: 'delete', id });
      return true;
    } catch {
      return false;
    }
  },

  // ==========================================
  // 3. LENS PACKAGES (GLOBAL SUPABASE SYNC)
  // Supports both standalone lens_packages table AND __config_lens_packages__ row
  // ==========================================
  async fetchLensPackages(): Promise<LensOption[]> {
    try {
      // 1. Try dedicated lens_packages table if not known missing
      if (optionalTableExists.lens_packages !== false) {
        const { data, error } = await supabase.from('lens_packages').select('*');
        if (!error) {
          optionalTableExists.lens_packages = true;
          if (data && data.length > 0) {
            return data.map((r: any) => ({
              id: r.id,
              name: r.name,
              subtitle: r.subtitle || '',
              priceAddon: Number(r.price_addon ?? r.priceAddon ?? r.price ?? 0),
              description: r.description || '',
              recommendedFor: r.recommended_for ?? r.recommendedFor ?? '',
            }));
          }
        } else if (isMissingTableError(error)) {
          optionalTableExists.lens_packages = false;
        }
      }

      // 2. Reliable fallback to __config_lens_packages__ in products table
      const { data: configRow } = await supabase
        .from('products')
        .select('description')
        .eq('id', '__config_lens_packages__')
        .maybeSingle();

      if (configRow && configRow.description) {
        const parsed = JSON.parse(configRow.description);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((l: any) => ({
            id: l.id,
            name: l.name,
            subtitle: l.subtitle || l.badge || l.category || 'High Definition Optics',
            priceAddon: Number(l.priceAddon ?? l.price ?? 0),
            description: l.description || (l.coating ? `${l.coating}. Includes complete scratch-resistant coating.` : ''),
            recommendedFor: l.recommendedFor || (l.badge ? `Best for ${l.badge}` : 'All Day Visual Comfort'),
          }));
        }
      }
    } catch (e) {
      console.warn('Supabase fetchLensPackages notice:', e);
    }
    return [];
  },

  // Save full list of lens packages globally to Supabase
  async saveAllLensPackages(lensesList: LensOption[]): Promise<boolean> {
    try {
      if (optionalTableExists.lens_packages === true) {
        for (const lens of lensesList) {
          try {
            await supabase.from('lens_packages').upsert({
              id: lens.id,
              name: lens.name,
              subtitle: lens.subtitle,
              price_addon: lens.priceAddon,
              description: lens.description,
              recommended_for: lens.recommendedFor,
            }, { onConflict: 'id' });
          } catch {}
        }
      }

      // Persist to __config_lens_packages__ in products table
      const jsonStr = JSON.stringify(lensesList);
      const { error } = await supabase.from('products').upsert({
        id: '__config_lens_packages__',
        name: '__GLOBAL_LENS_PACKAGES__',
        brand: 'Anand Collection',
        category: 'system_config',
        shape: 'rectangle',
        material: 'Config Data',
        price: 0,
        original_price: 0,
        in_stock: false,
        image_url: SHAPE_STUDIO_IMAGE_MAP.rectangle,
        description: jsonStr,
        gender: 'unisex',
        dimensions: '52-18-140 mm',
        colors: ['Black', 'Tortoise'],
        features: ['Global Lens Packages Sync'],
      }, { onConflict: 'id' });

      if (error) {
        console.error('Supabase saveAllLensPackages error:', error);
        return false;
      }

      await broadcastCatalogChange({ table: 'lens_packages', action: 'save_all' });
      return true;
    } catch (e) {
      console.error('Failed to sync lenses to Supabase:', e);
      return false;
    }
  },

  async deleteLensPackage(id: string): Promise<boolean> {
    try {
      if (optionalTableExists.lens_packages === true) {
        await supabase.from('lens_packages').delete().eq('id', id);
      }
      await broadcastCatalogChange({ table: 'lens_packages', action: 'delete', id });
      return true;
    } catch {
      return false;
    }
  },

  // ==========================================
  // 4. APPOINTMENTS (GLOBAL SUPABASE SYNC)
  // Supports standalone appointments table AND __config_appointments__ row
  // ==========================================
  async fetchAppointments(): Promise<AppointmentItem[]> {
    try {
      if (optionalTableExists.appointments !== false) {
        const { data, error } = await supabase
          .from('appointments')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error) {
          optionalTableExists.appointments = true;
          if (data && data.length > 0) {
            return data.map((r: any) => ({
              id: String(r.id),
              name: r.name,
              phone: r.phone,
              date: r.date,
              timeSlot: r.time_slot ?? r.timeSlot,
              reason: r.reason || 'General Refraction',
              createdAt: r.created_at || new Date().toISOString(),
              status: r.status || 'pending',
            }));
          }
        } else if (isMissingTableError(error)) {
          optionalTableExists.appointments = false;
        }
      }

      const { data: configRow } = await supabase
        .from('products')
        .select('description')
        .eq('id', '__config_appointments__')
        .maybeSingle();

      if (configRow && configRow.description) {
        const parsed = JSON.parse(configRow.description);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Supabase fetchAppointments notice:', e);
    }
    return [];
  },

  async saveAllAppointmentsConfig(list: AppointmentItem[]): Promise<boolean> {
    try {
      const { error } = await supabase.from('products').upsert({
        id: '__config_appointments__',
        name: '__GLOBAL_APPOINTMENTS__',
        brand: 'Anand Collection',
        category: 'system_config',
        shape: 'rectangle',
        material: 'Config Data',
        price: 0,
        original_price: 0,
        in_stock: false,
        image_url: SHAPE_STUDIO_IMAGE_MAP.rectangle,
        description: JSON.stringify(list),
        gender: 'unisex',
        dimensions: '52-18-140 mm',
        colors: ['Black'],
        features: ['Global Appointments Sync'],
      }, { onConflict: 'id' });
      return !error;
    } catch {
      return false;
    }
  },

  async insertAppointment(app: Omit<AppointmentItem, 'id' | 'createdAt' | 'status'>): Promise<boolean> {
    try {
      const newApp: AppointmentItem = {
        id: `AO-APT-${Math.floor(1000 + Math.random() * 9000)}`,
        name: app.name,
        phone: app.phone,
        date: app.date,
        timeSlot: app.timeSlot,
        reason: app.reason,
        createdAt: new Date().toISOString(),
        status: 'pending',
      };

      if (optionalTableExists.appointments !== false) {
        const { error } = await supabase
          .from('appointments')
          .insert([{
            id: newApp.id,
            name: newApp.name,
            phone: newApp.phone,
            date: newApp.date,
            time_slot: newApp.timeSlot,
            reason: newApp.reason,
            status: 'pending',
          }]);
        if (!error) {
          optionalTableExists.appointments = true;
          await broadcastCatalogChange({ table: 'appointments', action: 'insert', id: newApp.id });
          return true;
        } else if (isMissingTableError(error)) {
          optionalTableExists.appointments = false;
        }
      }

      const current = await this.fetchAppointments();
      const updated = [newApp, ...current];
      const ok = await this.saveAllAppointmentsConfig(updated);
      if (ok) {
        await broadcastCatalogChange({ table: 'appointments', action: 'insert', id: newApp.id });
      }
      return ok;
    } catch {
      return false;
    }
  },

  async updateAppointmentStatus(id: string, status: AppointmentItem['status']): Promise<boolean> {
    try {
      if (optionalTableExists.appointments === true) {
        const { error } = await supabase
          .from('appointments')
          .update({ status })
          .eq('id', id);
        if (!error) {
          await broadcastCatalogChange({ table: 'appointments', action: 'update', id });
          return true;
        }
      }
      const current = await this.fetchAppointments();
      const updated = current.map((a) => (a.id === id ? { ...a, status } : a));
      const ok = await this.saveAllAppointmentsConfig(updated);
      if (ok) {
        await broadcastCatalogChange({ table: 'appointments', action: 'update', id });
      }
      return ok;
    } catch {
      return false;
    }
  },

  async deleteAppointment(id: string): Promise<boolean> {
    try {
      if (optionalTableExists.appointments === true) {
        const { error } = await supabase
          .from('appointments')
          .delete()
          .eq('id', id);
        if (!error) {
          await broadcastCatalogChange({ table: 'appointments', action: 'delete', id });
          return true;
        }
      }
      const current = await this.fetchAppointments();
      const updated = current.filter((a) => a.id !== id);
      const ok = await this.saveAllAppointmentsConfig(updated);
      if (ok) {
        await broadcastCatalogChange({ table: 'appointments', action: 'delete', id });
      }
      return ok;
    } catch {
      return false;
    }
  },

  // REALTIME SUBSCRIPTION HELPER (Cross-Device + Multi-Tab Sync)
  subscribeToAllChanges(onDataChange: () => void): { unsubscribe: () => void } {
    return registerRealtimeListener(onDataChange);
  },

  // SEED DEFAULT SHOWROOM FRAMES TO SUPABASE IN 1-CLICK
  async seedDefaultFramesToCloud(): Promise<{ success: boolean; count: number; message: string }> {
    try {
      let inserted = 0;
      for (const item of CATALOG_ITEMS) {
        const ok = await this.upsertProduct(item);
        if (ok) inserted++;
      }
      return {
        success: inserted > 0,
        count: inserted,
        message: `Successfully synchronized ${inserted} showroom frames into Supabase Cloud!`,
      };
    } catch (e: any) {
      return { success: false, count: 0, message: e?.message || 'Sync failed' };
    }
  },

  // Clean all legacy brands to Anand Optical in Cloud
  async cleanseLegacyNamesInCloud(): Promise<{ count: number; message: string }> {
    try {
      const { data } = await supabase.from('products').select('*');
      if (!data || data.length === 0) {
        return { count: 0, message: 'No items to cleanse.' };
      }
      let count = 0;
      for (const item of data) {
        let brand = item.brand || 'Anand Signature';
        let name = item.name || '';
        let desc = item.description || '';
        let changed = false;

        if (/Kajal/i.test(brand)) {
          brand = brand.replace(/Kajal\s*Coll[a-z]*/gi, 'Anand Collection')
            .replace(/Kajal\s*Heritage/gi, 'Anand Heritage')
            .replace(/Kajal\s*OptiShield/gi, 'Anand OptiShield')
            .replace(/Kajal/gi, 'Anand');
          changed = true;
        }
        if (/Kajal/i.test(name)) {
          name = name.replace(/Kajal/gi, 'Anand');
          changed = true;
        }
        if (/Kajal/i.test(desc)) {
          desc = desc.replace(/Kajal\s*Opticals?/gi, 'Anand Optical').replace(/Kajal/gi, 'Anand');
          changed = true;
        }

        if (changed) {
          await supabase.from('products').update({ brand, name, description: desc }).eq('id', item.id);
          count++;
        }
      }
      return {
        count,
        message: `Cleansed ${count} items in Supabase Cloud to Anand Optical!`,
      };
    } catch (e: any) {
      return { count: 0, message: e?.message || 'Cleansing failed.' };
    }
  },

  // SQL Setup Script for Supabase SQL Editor
  getSqlSetupScript(): string {
    return `-- ========================================================
-- ANAND OPTICAL - SUPABASE CLOUD DATABASE SETUP SCRIPT
-- Execute in Supabase SQL Editor: https://supabase.com/dashboard/project/nfciqwxsxoabquruvnzr/sql
-- ========================================================

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT DEFAULT 'Anand Signature',
  category TEXT DEFAULT 'eyeglasses',
  shape TEXT DEFAULT 'rectangle',
  material TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  badge TEXT,
  in_stock BOOLEAN DEFAULT true,
  image_url TEXT,
  description TEXT,
  gender TEXT DEFAULT 'unisex',
  dimensions TEXT DEFAULT '52-18-142 mm',
  colors JSONB DEFAULT '["Classic Matte Black", "Gunmetal Silver"]'::jsonb,
  features JSONB DEFAULT '["1-Year Store Warranty", "Pressure-Free Bridge"]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  type TEXT DEFAULT 'category',
  sublabel TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. LENS PACKAGES TABLE
CREATE TABLE IF NOT EXISTS public.lens_packages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT,
  price_addon NUMERIC DEFAULT 0,
  description TEXT,
  recommended_for TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.appointments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  date TEXT,
  time_slot TEXT,
  reason TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY AND PERMISSIVE POLICIES FOR PUBLIC READ/WRITE
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lens_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public full access on products') THEN
    CREATE POLICY "Allow public full access on products" ON public.products FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public full access on categories') THEN
    CREATE POLICY "Allow public full access on categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public full access on lens_packages') THEN
    CREATE POLICY "Allow public full access on lens_packages" ON public.lens_packages FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public full access on appointments') THEN
    CREATE POLICY "Allow public full access on appointments" ON public.appointments FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;
`;
  },
};
