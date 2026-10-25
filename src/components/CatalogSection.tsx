import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter, Send, SlidersHorizontal, Check, Eye } from 'lucide-react';
import { EyewearItem, EyewearTier, FrameShape, EyewearColor, LensOption } from '../types/optical';
import { CATALOG_ITEMS, LENS_OPTIONS } from '../data/catalog';
import { EyewearGraphic } from './EyewearGraphic';

interface Props {
  onQuickAdd: (item: EyewearItem) => void;
  onOpenCustomizer: (item: EyewearItem) => void;
}

export const CatalogSection: React.FC<Props> = ({
  onQuickAdd,
  onOpenCustomizer,
}) => {
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedShape, setSelectedShape] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return CATALOG_ITEMS.filter((item) => {
      // Tier filter
      if (selectedTier !== 'all' && item.tier !== selectedTier) return false;
      // Shape filter
      if (selectedShape !== 'all' && item.shape !== selectedShape) return false;
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCode = item.code.toLowerCase().includes(q);
        const matchesMaterial = item.material.toLowerCase().includes(q);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesCode && !matchesMaterial && !matchesTags) return false;
      }
      return true;
    });
  }, [selectedTier, selectedShape, searchQuery]);

  return (
    <section id="catalog" className="py-20 bg-gradient-to-b from-[#FAF8FD] via-white to-[#F5F0FF] text-slate-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-700 mb-2 tracking-wider font-semibold">
              <span>CERTIFIED CLINICAL INVENTORY</span>
              <span aria-hidden="true" className="text-purple-300">·</span>
              <span>DIRECT WHATSAPP DISPATCH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Optical Frame Collections
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              From pure Japanese beta-titanium to ultra-flexible TR90 daily wear. Click <span className="text-purple-700 font-mono font-bold">+</span> to add directly to your order tray.
            </p>
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search titanium, wayfarer, code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-purple-200 rounded-md pl-9 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 shadow-sm transition-colors"
            />
          </div>
        </div>

        {/* Filter Bar: Tier Buttons & Shape Selectors */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-purple-100">
          {/* Segmented Controls for Tier */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-purple-200 rounded-lg shadow-sm overflow-x-auto max-w-full">
            <button
              onClick={() => setSelectedTier('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedTier === 'all'
                  ? 'bg-purple-700 text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-purple-700'
              }`}
            >
              All Ranges ({CATALOG_ITEMS.length})
            </button>
            <button
              onClick={() => setSelectedTier('premium')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedTier === 'premium'
                  ? 'bg-purple-700 text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-purple-700'
              }`}
            >
              ★ Premium Luxury (₹3,299+)
            </button>
            <button
              onClick={() => setSelectedTier('middle')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedTier === 'middle'
                  ? 'bg-purple-700 text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-purple-700'
              }`}
            >
              Executive Middle (₹1,899+)
            </button>
            <button
              onClick={() => setSelectedTier('budget')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedTier === 'budget'
                  ? 'bg-purple-700 text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-purple-700'
              }`}
            >
              Daily Budget (₹849+)
            </button>
          </div>

          {/* Shape Selector Dropdown / Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">Shape:</span>
            {['all', 'wayfarer', 'aviator', 'round', 'clubmaster', 'rimless', 'hexagonal', 'cat-eye', 'rectangle'].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedShape(s)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md capitalize whitespace-nowrap transition-colors border ${
                  selectedShape === s
                    ? 'bg-purple-100 text-purple-900 border-purple-400 font-semibold'
                    : 'bg-white text-slate-600 border-purple-100 hover:border-purple-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center bg-white border border-purple-100 rounded-xl shadow-sm">
            <Filter className="w-8 h-8 text-purple-300 mx-auto mb-2" />
            <h3 className="text-base font-semibold text-slate-900">No optical frames match your search</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting filters or search by model code.</p>
            <button
              onClick={() => { setSelectedTier('all'); setSelectedShape('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-1.5 text-xs font-semibold bg-purple-700 hover:bg-purple-800 text-white rounded-md transition-colors shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isHovered = hoveredCardId === item.id;
              const defaultColor = item.colors[0];

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredCardId(item.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className="group relative bg-white border border-purple-100 hover:border-purple-300 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Card Header: Unboxed metadata */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="text-purple-700 font-semibold">{item.code}</span>
                        <span aria-hidden="true" className="text-purple-300">·</span>
                        <span className="capitalize">{item.shape}</span>
                      </div>

                      <div className="text-slate-500 font-mono text-[11px]">
                        {item.dimensions.lensWidth}-{item.dimensions.bridge}-{item.dimensions.temple}mm
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                      {item.name}
                    </h3>
                    
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Eyewear Graphic Stage */}
                  <div
                    onClick={() => onOpenCustomizer(item)}
                    className="relative my-4 py-2 cursor-pointer bg-[#FAF8FD] rounded-lg border border-purple-50 group-hover:bg-purple-50/60 transition-colors"
                  >
                    <EyewearGraphic
                      shape={item.shape}
                      color={defaultColor}
                      className="w-full h-36"
                      isHovered={isHovered}
                    />

                    {/* Weight tag */}
                    <div className="absolute bottom-1 right-2 text-[10px] font-mono text-purple-700 bg-white/95 px-2 py-0.5 rounded border border-purple-200 shadow-xs">
                      {item.weightGrams}g ultralight
                    </div>
                  </div>

                  {/* Card Footer: Colors, Price & Dual Action (+ Quick Add / WhatsApp) */}
                  <div className="pt-4 border-t border-purple-100">
                    <div className="flex items-center justify-between mb-3">
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

                      {/* Price in Tabular Numerals */}
                      <div className="text-right">
                        <div className="text-sm font-mono font-bold text-slate-900">
                          ₹{item.price.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 line-through">
                          ₹{item.originalPrice.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: 
                        1. Direct "+" Quick Add to Tray 
                        2. "Configure Lenses" 
                    */}
                    <div className="grid grid-cols-12 gap-2">
                      <button
                        onClick={() => onQuickAdd(item)}
                        className="col-span-4 py-2 px-2.5 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-md transition-colors flex items-center justify-center gap-1 shadow-sm"
                        title="Quick add to order tray"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </button>

                      <button
                        onClick={() => onOpenCustomizer(item)}
                        className="col-span-8 py-2 px-3 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-md transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-purple-700" />
                        <span>Configure Lenses</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Assurance Banner with Clean White & Purple Palette */}
        <div className="mt-16 p-6 bg-white border border-purple-100 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Direct WhatsApp Dispatch</div>
              <div className="text-[11px] text-slate-500">Order directly to 9430800015 with prescription photo</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">7-Day Optical Adaptation</div>
              <div className="text-[11px] text-slate-500">100% comfort guarantee or free prescription re-surface</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Personalized Frame Alignment</div>
              <div className="text-[11px] text-slate-500">Custom temple & bridge fitting by senior optical incharge</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
