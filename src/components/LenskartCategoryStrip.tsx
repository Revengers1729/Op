import React from 'react';
import { Sparkles, Eye, ShieldCheck, Sun, Laptop } from 'lucide-react';

interface Props {
  selectedCategory: string;
  onSelectCategory: (category: string, filterType?: 'gender' | 'shape' | 'category' | 'tier') => void;
}

export const LenskartCategoryStrip: React.FC<Props> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories = [
    {
      id: 'men',
      label: 'Men',
      sublabel: 'Trending',
      type: 'gender' as const,
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'women',
      label: 'Women',
      sublabel: 'Designer',
      type: 'gender' as const,
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'kids',
      label: 'Kids',
      sublabel: 'Unbreakable',
      type: 'gender' as const,
      imageUrl: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'budget',
      label: 'Starts @ ₹499',
      sublabel: 'Hustlr Eyewear',
      type: 'tier' as const,
      imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'screen',
      label: 'Computer Lenses',
      sublabel: 'Zero Power 420nm',
      type: 'category' as const,
      imageUrl: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'sunglasses',
      label: 'Sunglasses',
      sublabel: 'UV400 Polarized',
      type: 'category' as const,
      imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80',
    },
  ];

  return (
    <section className="w-full bg-white py-6 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Strip with "with Power" badge (Exact match to user screenshot) */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0A1938] tracking-tight">
              Eyeglasses
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold tracking-wide">
              with Power
            </span>
          </div>

          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 transition-colors"
          >
            View All ({categories.length}+ categories) →
          </button>
        </div>

        {/* Horizontal Scrolling Avatar Cards (Exact match to user screenshot) */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id, cat.type);
                  const el = document.getElementById('catalog');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex flex-col items-center gap-2 shrink-0 group transition-transform ${
                  isSelected ? 'scale-105' : 'hover:scale-102'
                }`}
              >
                {/* Rounded Avatar Frame */}
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden p-0.5 border-2 transition-all ${
                    isSelected
                      ? 'border-purple-600 shadow-lg shadow-purple-200 bg-purple-600'
                      : 'border-slate-200 group-hover:border-purple-400 bg-slate-50'
                  }`}
                >
                  <img
                    src={cat.imageUrl}
                    alt={cat.label}
                    className="w-full h-full object-cover object-center rounded-[14px] group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Labels */}
                <div className="text-center">
                  <span
                    className={`text-xs font-bold block leading-tight ${
                      isSelected ? 'text-purple-700 font-extrabold' : 'text-slate-800'
                    }`}
                  >
                    {cat.label}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {cat.sublabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
