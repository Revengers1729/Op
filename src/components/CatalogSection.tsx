import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Filter, Send, Heart, Check, Eye, Star, Sparkles } from 'lucide-react';
import { EyewearItem, EyewearTier, FrameShape, EyewearColor, LensOption } from '../types/optical';
import { CATALOG_ITEMS, LENS_OPTIONS } from '../data/catalog';
import { EyewearGraphic } from './EyewearGraphic';

interface Props {
  onQuickAdd: (item: EyewearItem) => void;
  onOpenCustomizer: (item: EyewearItem) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  externalFilter?: { type: 'gender' | 'shape' | 'category' | 'tier'; value: string } | null;
  onClearExternalFilter?: () => void;
}

export const CatalogSection: React.FC<Props> = ({
  onQuickAdd,
  onOpenCustomizer,
  wishlistIds,
  onToggleWishlist,
  externalFilter,
  onClearExternalFilter,
}) => {
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedShape, setSelectedShape] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Sync external filter from category strip or mega menu
  useEffect(() => {
    if (!externalFilter) return;
    if (externalFilter.type === 'gender') {
      setSelectedGender(externalFilter.value);
      setSelectedTier('all');
      setSelectedShape('all');
      setSelectedCategory('all');
    } else if (externalFilter.type === 'shape') {
      setSelectedShape(externalFilter.value);
      setSelectedTier('all');
      setSelectedGender('all');
    } else if (externalFilter.type === 'category') {
      setSelectedCategory(externalFilter.value);
      setSelectedTier('all');
    } else if (externalFilter.type === 'tier') {
      setSelectedTier(externalFilter.value);
      setSelectedGender('all');
    }
  }, [externalFilter]);

  const filteredItems = useMemo(() => {
    return CATALOG_ITEMS.filter((item) => {
      // Tier filter
      if (selectedTier !== 'all' && item.tier !== selectedTier) return false;
      // Shape filter
      if (selectedShape !== 'all' && item.shape !== selectedShape) return false;
      // Gender filter
      if (selectedGender !== 'all') {
        if (selectedGender === 'men' && item.gender !== 'men' && item.gender !== 'unisex') return false;
        if (selectedGender === 'women' && item.gender !== 'women' && item.gender !== 'unisex') return false;
        if (selectedGender === 'kids' && item.gender !== 'kids') return false;
      }
      // Category filter (e.g. eyeglasses, sunglasses, screen)
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'eyeglasses' && item.category !== 'eyeglasses' && item.category !== 'screen') return false;
        if (selectedCategory === 'sunglasses' && item.category !== 'sunglasses') return false;
        if (selectedCategory === 'screen' && item.category !== 'screen') return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCode = item.code.toLowerCase().includes(q);
        const matchesMaterial = item.material.toLowerCase().includes(q);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(q));
        const matchesBrand = item.brand ? item.brand.toLowerCase().includes(q) : false;
        if (!matchesName && !matchesCode && !matchesMaterial && !matchesTags && !matchesBrand) return false;
      }
      return true;
    });
  }, [selectedTier, selectedShape, selectedGender, selectedCategory, searchQuery]);

  const hasActiveFilters =
    selectedTier !== 'all' ||
    selectedShape !== 'all' ||
    selectedGender !== 'all' ||
    selectedCategory !== 'all' ||
    searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setSelectedTier('all');
    setSelectedShape('all');
    setSelectedGender('all');
    setSelectedCategory('all');
    setSearchQuery('');
    if (onClearExternalFilter) onClearExternalFilter();
  };

  return (
    <section id="catalog" className="py-16 bg-[#FAF8FD] text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading matching Lenskart grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-700 mb-1.5 tracking-wider font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>IN-STOCK SHOWROOM INVENTORY</span>
              <span aria-hidden="true" className="text-purple-300">·</span>
              <span>PATNA & DANAPUR DISPENSING</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0A1938]">
              Eyeglasses & Sunglasses Collection
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-xl">
              Showing {filteredItems.length} styles ready for computerized surfacing. Click <span className="text-purple-700 font-mono font-bold">+</span> to add directly to WhatsApp tray.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search brand, shape, titanium..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-purple-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 shadow-sm transition-colors"
            />
          </div>
        </div>

        {/* Lenskart-Style Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-purple-200/60">
          
          {/* Gender Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-purple-200 rounded-xl shadow-xs overflow-x-auto">
            {['all', 'men', 'women', 'kids'].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGender(g)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize whitespace-nowrap transition-colors ${
                  selectedGender === g
                    ? 'bg-[#162456] text-white shadow-xs'
                    : 'text-slate-600 hover:text-purple-800'
                }`}
              >
                {g === 'all' ? 'All Genders' : g}
              </button>
            ))}
          </div>

          {/* Tier / Category Range */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-purple-200 rounded-xl shadow-xs overflow-x-auto">
            <button
              onClick={() => setSelectedTier('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
                selectedTier === 'all'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-purple-800'
              }`}
            >
              All Prices
            </button>
            <button
              onClick={() => setSelectedTier('budget')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
                selectedTier === 'budget'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-purple-800'
              }`}
            >
              Hustlr (₹499+)
            </button>
            <button
              onClick={() => setSelectedTier('middle')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
                selectedTier === 'middle'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-purple-800'
              }`}
            >
              Executive (₹1,599+)
            </button>
            <button
              onClick={() => setSelectedTier('premium')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
                selectedTier === 'premium'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-purple-800'
              }`}
            >
              ★ Royale Titanium (₹3,299+)
            </button>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-red-600 hover:underline px-2 py-1"
            >
              Clear Filters ✕
            </button>
          )}
        </div>

        {/* Product Cards Grid (Matches Lenskart UI) */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center bg-white border border-purple-100 rounded-2xl shadow-sm">
            <Filter className="w-8 h-8 text-purple-300 mx-auto mb-2" />
            <h3 className="text-base font-semibold text-slate-900">No frames match this filter combination</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting your filters or search by model code.</p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 text-xs font-bold bg-[#162456] hover:bg-[#203273] text-white rounded-lg transition-colors shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isHovered = hoveredCardId === item.id;
              const isWishlisted = wishlistIds.includes(item.id);
              const defaultColor = item.colors[0];

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredCardId(item.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className="group relative bg-white border border-purple-100 hover:border-purple-300 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Top Bar: Brand, Rating & Wishlist Heart */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider font-mono">
                          {item.brand || 'Anand Signature'}
                        </span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-[11px] text-slate-500 capitalize">{item.shape}</span>
                      </div>

                      {/* Wishlist Heart Toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(item.id);
                        }}
                        aria-label="Save to Wishlist"
                        className={`p-1.5 rounded-full transition-colors ${
                          isWishlisted
                            ? 'text-red-500 bg-red-50'
                            : 'text-slate-400 hover:text-red-500 hover:bg-slate-50'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
                      </button>
                    </div>

                    {/* Frame Name */}
                    <h3 className="text-base font-bold text-[#0A1938] group-hover:text-purple-800 transition-colors line-clamp-1">
                      {item.name}
                    </h3>

                    {/* Rating & Size */}
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                      <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                        <span>{item.rating || 4.8}</span>
                        <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                      </div>
                      <span>({item.reviewsCount || 110}+ verified)</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span>{item.size || 'Medium'} · {item.dimensions.lensWidth}-{item.dimensions.bridge}</span>
                    </div>
                  </div>

                  {/* Eyewear Graphic Canvas Area */}
                  <div
                    onClick={() => onOpenCustomizer(item)}
                    className="relative my-4 py-3 cursor-pointer bg-[#FAF8FD] rounded-xl border border-purple-50 group-hover:bg-purple-50/70 transition-colors"
                  >
                    <EyewearGraphic
                      shape={item.shape}
                      color={defaultColor}
                      className="w-full h-36"
                      isHovered={isHovered}
                    />

                    {/* Weight / Feature Tag */}
                    <div className="absolute bottom-2 right-2 text-[10px] font-mono text-purple-800 bg-white/95 px-2 py-0.5 rounded-md border border-purple-200 shadow-xs">
                      {item.weightGrams}g ultralight
                    </div>

                    {/* Gold Member Promo Tag */}
                    {item.tier === 'budget' && item.price <= 499 && (
                      <div className="absolute top-2 left-2 text-[10px] font-extrabold text-amber-900 bg-amber-400 px-2 py-0.5 rounded shadow-xs">
                        FREE WITH ₹99 PROMO
                      </div>
                    )}
                  </div>

                  {/* Footer: Color Swatches, Price, & High-Conversion Action Buttons */}
                  <div className="pt-3 border-t border-purple-100 space-y-3">
                    
                    <div className="flex items-center justify-between">
                      {/* Color swatches */}
                      <div className="flex items-center gap-1.5">
                        {item.colors.map((c) => (
                          <span
                            key={c.name}
                            className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-xs"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                        <span className="text-[11px] text-slate-500 ml-1">
                          {item.colors.length} shades
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="text-right">
                        <div className="text-base font-extrabold text-slate-900">
                          ₹{item.price.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-slate-400 line-through">
                          ₹{item.originalPrice.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons (Direct + quick add to tray & Configure Lenses) */}
                    <div className="grid grid-cols-12 gap-2">
                      <button
                        onClick={() => onQuickAdd(item)}
                        className="col-span-4 py-2 px-2 text-xs font-extrabold text-white bg-purple-700 hover:bg-purple-800 rounded-xl transition-all flex items-center justify-center gap-1 shadow-sm hover:scale-102 active:scale-98"
                        title="Add to WhatsApp Order Tray"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </button>

                      <button
                        onClick={() => onOpenCustomizer(item)}
                        className="col-span-8 py-2 px-3 text-xs font-bold text-[#162456] bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-colors flex items-center justify-center gap-1"
                      >
                        <span>Configure Lenses</span>
                        <Eye className="w-3.5 h-3.5 text-purple-700" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
