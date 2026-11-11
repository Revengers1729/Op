import { EyewearItem, LensOption } from '../types/optical';
import { CATALOG_ITEMS, LENS_OPTIONS } from '../data/catalog';

export interface CategoryItem {
  id: string;
  label: string;
  type?: 'category' | 'gender' | 'tier' | 'shape';
  sublabel?: string;
  imageUrl?: string;
}

export interface AppointmentItem {
  id: string;
  name: string;
  phone: string;
  date: string;
  timeSlot: string;
  reason: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  landmark: string;
  timings: string;
  mapsUrl: string;
  promoText: string;
}

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: 'men', label: 'Men', type: 'gender', sublabel: 'Trending', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
  { id: 'women', label: 'Women', type: 'gender', sublabel: 'Designer', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
  { id: 'kids', label: 'Kids', type: 'gender', sublabel: 'Unbreakable', imageUrl: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=300&q=80' },
  { id: 'budget', label: 'Starts @ ₹499', type: 'tier', sublabel: 'Hustlr Eyewear', imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=300&q=80' },
  { id: 'screen', label: 'Computer Lenses', type: 'category', sublabel: 'Zero Power 420nm', imageUrl: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=300&q=80' },
  { id: 'sunglasses', label: 'Sunglasses', type: 'category', sublabel: 'UV400 Polarized', imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80' },
];

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: 'Anand Optical',
  tagline: 'Precision Vision & Eyewear',
  phone: '9430800015',
  whatsapp: '9430800015',
  email: 'anandopticalpatna@gmail.com',
  address: 'Danapur, Khagaul, Patna, Bihar - 801503',
  landmark: 'Near Danapur Station / Khagaul Road',
  timings: 'Open 7 Days: 9:30 AM – 9:00 PM',
  mapsUrl: 'https://www.google.com/maps/place/ANAND+OPTICAL/@25.6111055,85.0504545,2883m/data=!3m2!1e3!4b1!4m6!3m5!1s0x39ed573ff65f2281:0x3b9fccb74ec6bc4c!8m2!3d25.6111059!4d85.0607543!16s%2Fg%2F11y95by830',
  promoText: '4.9 ★ Rating | 50,000+ Happy Eyes in Patna & Danapur | Call: 9430800015',
};

// Storage Keys
const KEY_PRODUCTS = 'ao_products_catalog';
const KEY_LENSES = 'ao_lens_packages';
const KEY_CATEGORIES = 'ao_categories_list';
const KEY_APPOINTMENTS = 'ao_appointments_list';
const KEY_SETTINGS = 'ao_store_settings';
const KEY_ADMIN_PASS = 'ao_admin_password';

export const ADMIN_DEFAULT_PASSWORD = 'anand@12345';

// Safe localStorage helper
export const storageService = {
  // PRODUCTS
  getProducts(): EyewearItem[] {
    try {
      const data = localStorage.getItem(KEY_PRODUCTS);
      if (data !== null) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading products from localStorage', e);
    }
    return CATALOG_ITEMS;
  },

  saveProducts(products: EyewearItem[]): boolean {
    try {
      localStorage.setItem(KEY_PRODUCTS, JSON.stringify(products));
      return true;
    } catch (e) {
      console.error('Error saving products', e);
      return false;
    }
  },

  resetProducts(): EyewearItem[] {
    try {
      localStorage.removeItem(KEY_PRODUCTS);
    } catch (e) {}
    return CATALOG_ITEMS;
  },

  // LENS PACKAGES
  getLensPackages(): LensOption[] {
    try {
      const data = localStorage.getItem(KEY_LENSES);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading lens packages', e);
    }
    return LENS_OPTIONS;
  },

  saveLensPackages(lenses: LensOption[]): boolean {
    try {
      localStorage.setItem(KEY_LENSES, JSON.stringify(lenses));
      return true;
    } catch (e) {
      console.error('Error saving lenses', e);
      return false;
    }
  },

  resetLensPackages(): LensOption[] {
    try {
      localStorage.removeItem(KEY_LENSES);
    } catch (e) {}
    return LENS_OPTIONS;
  },

  // CATEGORIES
  getCategories(): CategoryItem[] {
    try {
      const data = localStorage.getItem(KEY_CATEGORIES);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading categories', e);
    }
    return DEFAULT_CATEGORIES;
  },

  saveCategories(cats: CategoryItem[]): boolean {
    try {
      localStorage.setItem(KEY_CATEGORIES, JSON.stringify(cats));
      return true;
    } catch (e) {
      console.error('Error saving categories', e);
      return false;
    }
  },

  resetCategories(): CategoryItem[] {
    try {
      localStorage.removeItem(KEY_CATEGORIES);
    } catch (e) {}
    return DEFAULT_CATEGORIES;
  },

  // APPOINTMENTS
  getAppointments(): AppointmentItem[] {
    try {
      const data = localStorage.getItem(KEY_APPOINTMENTS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading appointments', e);
    }
    return [];
  },

  saveAppointment(app: Omit<AppointmentItem, 'id' | 'createdAt' | 'status'>): AppointmentItem {
    const list = this.getAppointments();
    const newItem: AppointmentItem = {
      ...app,
      id: `AO-APT-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    list.unshift(newItem);
    try {
      localStorage.setItem(KEY_APPOINTMENTS, JSON.stringify(list));
    } catch (e) {
      console.error('Error saving appointment', e);
    }
    return newItem;
  },

  updateAppointmentStatus(id: string, status: AppointmentItem['status']): AppointmentItem[] {
    const list = this.getAppointments().map((it) => (it.id === id ? { ...it, status } : it));
    try {
      localStorage.setItem(KEY_APPOINTMENTS, JSON.stringify(list));
    } catch (e) {}
    return list;
  },

  deleteAppointment(id: string): AppointmentItem[] {
    const list = this.getAppointments().filter((it) => it.id !== id);
    try {
      localStorage.setItem(KEY_APPOINTMENTS, JSON.stringify(list));
    } catch (e) {}
    return list;
  },

  // STORE SETTINGS
  getStoreSettings(): StoreSettings {
    try {
      const data = localStorage.getItem(KEY_SETTINGS);
      if (data) {
        return { ...DEFAULT_STORE_SETTINGS, ...JSON.parse(data) };
      }
    } catch (e) {
      console.warn('Error reading store settings', e);
    }
    return DEFAULT_STORE_SETTINGS;
  },

  saveStoreSettings(settings: StoreSettings): boolean {
    try {
      localStorage.setItem(KEY_SETTINGS, JSON.stringify(settings));
      return true;
    } catch (e) {
      console.error('Error saving settings', e);
      return false;
    }
  },

  // ADMIN PASSWORD
  getAdminPassword(): string {
    try {
      const saved = localStorage.getItem(KEY_ADMIN_PASS);
      if (saved) return saved;
    } catch (e) {}
    return ADMIN_DEFAULT_PASSWORD;
  },

  saveAdminPassword(newPass: string): boolean {
    try {
      localStorage.setItem(KEY_ADMIN_PASS, newPass);
      return true;
    } catch (e) {
      return false;
    }
  },
};
