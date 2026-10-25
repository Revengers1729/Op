import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Feather, Sparkles, Layers } from 'lucide-react';

interface Props {
  onFilterMaterial: (keyword: string) => void;
}

export const MaterialStoriesSection: React.FC<Props> = ({ onFilterMaterial }) => {
  const [activeTab, setActiveTab] = useState<'titanium' | 'acetate' | 'tr90' | 'metal' | 'steel'>('titanium');

  const materials = {
    titanium: {
      name: 'Air Titanium',
      tag: 'Aerospace Grade 5',
      weight: '7.8g Featherlight',
      features: ['Corrosion proof for life', 'Memory flex temples', 'Zero skin allergy / Hypoallergenic'],
      description: 'Milled from high-purity Japanese beta-titanium wire. So light you will forget you are wearing spectacles even after 16 hours at your computer workstation.',
      image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
      keyword: 'Titanium',
    },
    acetate: {
      name: 'Italian Mazzucchelli Acetate',
      tag: 'Hand-Finished Mirror Polish',
      weight: '14.5g Solid Stature',
      features: ['Deep lustrous color depth', 'Cotton-derived natural polymer', 'Internal brass wire core for custom optician ear bending'],
      description: 'Carved from solid blocks of Italian cellulose acetate. Provides rich tortoiseshell patterns and lustrous black finishes that never peel or fade over decades.',
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80',
      keyword: 'Acetate',
    },
    tr90: {
      name: 'Swiss Grilamid TR90',
      tag: 'Unbreakable Flex Polymer',
      weight: '10.2g Active Daily',
      features: ['Snaps back after extreme twists', 'Sweat, oil and heat resistant', 'No screw hinges to loosen'],
      description: 'High-impact thermoplastic memory polymer. Engineered for sports, rough daily commutes in Patna, and active students who need unbreakable optical frames.',
      image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80',
      keyword: 'TR90',
    },
    metal: {
      name: 'Gold Ion Monel Alloy',
      tag: 'Executive Stature',
      weight: '12.0g Balanced Rigidity',
      features: ['Dual-bridge architectural strength', 'Micro coin-edge rim bezel', 'Micro-adjustable soft silicone nose pads'],
      description: 'Precision forged metal with electroplated gold, rose gold, and gunmetal ionic coatings that prevent tarnish under high-humidity climates.',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      keyword: 'Monel',
    },
    steel: {
      name: 'Surgical Stainless Steel',
      tag: 'Thin Profile Suprecord',
      weight: '11.8g Minimalist Line',
      features: ['Slim 0.8mm profile', 'Suprecord nylon thread lens mounting', 'High tensile spring tension'],
      description: 'Laser-cut medical grade stainless steel. Minimal visual weight across your face with maximum structural rigidity for high-power lenses.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      keyword: 'Steel',
    },
  };

  const mat = materials[activeTab];

  return (
    <section className="w-full bg-white py-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-6">
          <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest block">
            Craftsmanship & Substrates
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A1938] tracking-tight">
            Material Stories
          </h3>
        </div>

        {/* Material Selector Tabs (From Lenskart video) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
          {(Object.keys(materials) as (keyof typeof materials)[]).map((key) => {
            const isSelected = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#162456] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {materials[key].name}
              </button>
            );
          })}
        </div>

        {/* Feature Story Card (Matches video showcase) */}
        <div className="bg-[#FAF8FD] border border-slate-200 rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Details */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-purple-100 text-purple-800 text-[11px] font-bold">
                {mat.tag}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                <Feather className="w-3.5 h-3.5" />
                <span>{mat.weight}</span>
              </span>
            </div>

            <h4 className="text-2xl font-extrabold text-[#0A1938]">
              {mat.name}
            </h4>

            <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
              {mat.description}
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {mat.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <button
                onClick={() => {
                  onFilterMaterial(mat.keyword);
                  const el = document.getElementById('catalog');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-[#0A1938] hover:bg-[#162456] text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-2"
              >
                <span>View {mat.name} Frames</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visual Showcase Photo */}
          <div className="md:col-span-5">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src={mat.image}
                alt={mat.name}
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
