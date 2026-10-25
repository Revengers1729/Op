import React from 'react';
import { FrameShape } from '../types/optical';

interface Props {
  selectedShape: string;
  onSelectShape: (shape: FrameShape | 'all') => void;
}

export const ShopByShapeSection: React.FC<Props> = ({
  selectedShape,
  onSelectShape,
}) => {
  const shapes: { id: FrameShape; label: string; count: string; svgD: string }[] = [
    {
      id: 'rectangle',
      label: 'Rectangle',
      count: '48+ styles',
      svgD: 'M 4 8 L 20 8 A 2 2 0 0 1 22 10 L 22 16 A 2 2 0 0 1 20 18 L 4 18 A 2 2 0 0 1 2 16 L 2 10 A 2 2 0 0 1 4 8 Z M 28 8 L 44 8 A 2 2 0 0 1 46 10 L 46 16 A 2 2 0 0 1 44 18 L 28 18 A 2 2 0 0 1 26 16 L 26 10 A 2 2 0 0 1 28 8 Z M 22 13 L 26 13',
    },
    {
      id: 'round',
      label: 'Round',
      count: '36+ styles',
      svgD: 'M 12 13 m -9, 0 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0 M 36 13 m -9, 0 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0 M 21 13 L 27 13',
    },
    {
      id: 'aviator',
      label: 'Aviator',
      count: '24+ styles',
      svgD: 'M 12 7 C 6 7 3 11 3 16 C 3 20 8 21 12 21 C 18 21 21 18 21 14 C 21 10 18 7 12 7 Z M 36 7 C 30 7 27 10 27 14 C 27 18 30 21 36 21 C 40 21 45 20 45 16 C 45 11 42 7 36 7 Z M 21 10 L 27 10 M 21 14 L 27 14',
    },
    {
      id: 'cat-eye',
      label: 'Cat-Eye',
      count: '30+ styles',
      svgD: 'M 2 11 Q 2 6 7 6 L 19 8 Q 23 10 21 15 Q 19 20 12 20 Q 2 20 2 11 Z M 46 11 Q 46 6 41 6 L 29 8 Q 25 10 27 15 Q 29 20 36 20 Q 46 20 46 11 Z M 19 9 L 29 9',
    },
    {
      id: 'clubmaster',
      label: 'Clubmaster',
      count: '22+ styles',
      svgD: 'M 2 8 L 21 8 L 21 17 C 21 20 5 21 3 17 Z M 27 8 L 46 8 L 45 17 C 43 21 27 20 27 17 Z M 21 12 L 27 12 M 2 8 L 21 8 M 27 8 L 46 8',
    },
    {
      id: 'hexagonal',
      label: 'Geometric',
      count: '18+ styles',
      svgD: 'M 7 7 L 17 7 L 22 13 L 17 19 L 7 19 L 2 13 Z M 31 7 L 41 7 L 46 13 L 41 19 L 31 19 L 26 13 Z M 22 13 L 26 13',
    },
    {
      id: 'wayfarer',
      label: 'Wayfarer',
      count: '40+ styles',
      svgD: 'M 2 7 L 21 8 L 19 19 L 4 18 Z M 27 8 L 46 7 L 44 18 L 29 19 Z M 21 9 L 27 9',
    },
  ];

  return (
    <section className="w-full bg-[#FAF8FD] py-10 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest block">
              Curated Optical Architecture
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A1938] tracking-tight">
              Shop by Shape
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onSelectShape('all');
                const el = document.getElementById('catalog');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                selectedShape === 'all'
                  ? 'bg-[#162456] text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Shapes
            </button>
          </div>
        </div>

        {/* Shape Cards Grid (Matches Lenskart video) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {shapes.map((s) => {
            const isSelected = selectedShape === s.id;

            return (
              <button
                key={s.id}
                onClick={() => {
                  onSelectShape(s.id);
                  const el = document.getElementById('catalog');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-4 rounded-xl border text-center flex flex-col items-center justify-between transition-all group ${
                  isSelected
                    ? 'bg-white border-purple-600 shadow-lg shadow-purple-100 ring-2 ring-purple-600/20'
                    : 'bg-white border-slate-200 hover:border-purple-300 hover:shadow-md'
                }`}
              >
                {/* Frame Silhouette SVG */}
                <div className="w-16 h-10 flex items-center justify-center my-2 text-slate-800 group-hover:text-purple-700 transition-colors">
                  <svg
                    viewBox="0 0 48 24"
                    className="w-full h-full fill-none stroke-current stroke-[2.2]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={s.svgD} />
                  </svg>
                </div>

                {/* Name & Count */}
                <div className="mt-2">
                  <span
                    className={`text-xs font-bold block ${
                      isSelected ? 'text-purple-800' : 'text-slate-900'
                    }`}
                  >
                    {s.label}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {s.count}
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
