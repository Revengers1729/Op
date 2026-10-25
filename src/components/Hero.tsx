import React from 'react';
import { ArrowRight, Phone, ShieldCheck, Award, Eye, Sparkles, Navigation } from 'lucide-react';
import { Glasses3DViewer } from './Glasses3DViewer';

interface Props {
  onExploreCatalog: () => void;
  onBookAppointment: () => void;
}

export const Hero: React.FC<Props> = ({ onExploreCatalog, onBookAppointment }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#081530] via-[#152352] to-[#2B0E5E] text-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Radiant ambient light glow (Ishanya / Eastern morning clarity) */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Hero 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Authoritative Editorial Copy inspired by reference layout */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Trust Kicker (Clean unboxed text, no pill per frontend-design rules) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-purple-200">
              <span className="font-bold tracking-wider text-amber-300">ANAND OPTICAL CLINICAL DISPENSARY</span>
              <span aria-hidden="true" className="text-purple-400">·</span>
              <span>EST. OVER 24 YEARS</span>
              <span aria-hidden="true" className="text-purple-400">·</span>
              <a
                href="#store-location"
                className="text-sky-300 hover:text-white flex items-center gap-1 font-semibold"
              >
                <span>Patna / Danapur Clinic</span>
              </a>
            </div>

            {/* Main Headline - Bold, Inspiring & Radiant */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
                See Better. Look Better.
              </h1>
              <div className="text-lg sm:text-xl font-medium text-purple-100/90 tracking-wide">
                Precision Eyecare & Clinical Optics
              </div>
            </div>

            {/* Direct Value Narrative - Clean clinical authority */}
            <p className="text-sm sm:text-base text-purple-100/80 leading-relaxed max-w-xl">
              Harmonious vision and radiant clarity for your eyes. Led by former <strong className="text-white">Head Optical Incharge (17 years)</strong> with <strong className="text-white">7 years of clinical refraction at Drishtipunj</strong>. We fit Japanese beta-titanium, executive middle, and daily durable spectacles with zero-distortion progressive warranties.
            </p>

            {/* Micro value strip matching photo subtitle: Premium Eyewear • Quality Lenses • Personalised Service */}
            <div className="flex items-center gap-2 text-xs text-purple-200 font-medium">
              <span>Premium Eyewear</span>
              <span aria-hidden="true" className="text-purple-400">·</span>
              <span>Quality Lenses</span>
              <span aria-hidden="true" className="text-purple-400">·</span>
              <span>Personalised Service</span>
            </div>

            {/* Action Buttons: High Conversion CTAs styled with clean white and outline buttons as in photo */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreCatalog}
                className="px-6 py-3 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-md transition-all flex items-center gap-2 shadow-lg shadow-black/20 hover:scale-[1.02]"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 text-purple-700" />
              </button>

              <a
                href="https://wa.me/919430800015?text=Hello%20Anand%20Optical,%20I%20would%20like%20to%20order%20eyewear%20or%20consult%20on%20my%20prescription."
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors flex items-center gap-2 shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Order: 9430800015</span>
              </a>

              <button
                onClick={onBookAppointment}
                className="px-4 py-3 text-xs font-semibold text-white hover:bg-white/10 border border-white/30 rounded-md transition-colors"
              >
                Book Free Eye Test
              </button>
            </div>

            {/* Micro-guarantee text */}
            <div className="pt-1 flex flex-wrap items-center gap-4 text-[11px] text-purple-200/80 font-mono">
              <span>✓ All India Express Dispatch</span>
              <span aria-hidden="true">·</span>
              <span>✓ WhatsApp Prescription Upload</span>
              <span aria-hidden="true">·</span>
              <span>✓ 100% Adaptation Guarantee</span>
            </div>
          </div>

          {/* Right Column: 3D Interactive Canvas Viewer */}
          <div className="lg:col-span-6">
            <Glasses3DViewer />
          </div>

        </div>

        {/* 4-Card Quick Eyewear Showcase Grid (Exact visual category cards inspired by user's reference photo) */}
        <div className="mt-16 pt-10 border-t border-purple-500/20">
          <div className="text-center md:text-left mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Our Eyewear Collection
            </h2>
            <p className="text-xs text-purple-200 mt-1">
              Engineered with balanced weight distribution and ophthalmic precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Eyeglass Frames */}
            <div
              onClick={onExploreCatalog}
              className="group cursor-pointer bg-white text-slate-900 rounded-xl p-5 shadow-lg border border-purple-100 hover:border-purple-300 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="h-28 flex items-center justify-center p-2 bg-[#FAF8FD] rounded-lg border border-slate-100 mb-4 group-hover:bg-purple-50/50 transition-colors">
                <svg viewBox="0 0 160 80" className="w-36 h-20 drop-shadow-sm text-slate-800" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="18" y="18" width="50" height="42" rx="10" />
                  <rect x="92" y="18" width="50" height="42" rx="10" />
                  <path d="M68 32 C 74 26, 86 26, 92 32" strokeWidth="3.5" />
                  <path d="M18 28 L 5 22" strokeWidth="2.5" />
                  <path d="M142 28 L 155 22" strokeWidth="2.5" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                  Eyeglass Frames
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Stylish precision frames for every face geometry
                </p>
              </div>
            </div>

            {/* Card 2: Premium Lenses */}
            <a
              href="#lens-tech"
              className="group cursor-pointer bg-white text-slate-900 rounded-xl p-5 shadow-lg border border-purple-100 hover:border-purple-300 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="h-28 flex items-center justify-center p-2 bg-[#FAF8FD] rounded-lg border border-slate-100 mb-4 group-hover:bg-purple-50/50 transition-colors">
                <div className="relative w-20 h-20 rounded-full border-2 border-sky-400/80 bg-gradient-to-tr from-sky-100 via-white to-purple-100 flex items-center justify-center shadow-inner">
                  <div className="absolute inset-1 rounded-full border border-dashed border-sky-300" />
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span className="text-[9px] font-mono font-bold text-purple-700 bg-white/90 px-1 py-0.5 rounded shadow-sm">
                    420nm
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                  Premium Lenses
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Single Vision, Blue-Cut & Freeform Progressives
                </p>
              </div>
            </a>

            {/* Card 3: Sunglasses */}
            <div
              onClick={onExploreCatalog}
              className="group cursor-pointer bg-white text-slate-900 rounded-xl p-5 shadow-lg border border-purple-100 hover:border-purple-300 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="h-28 flex items-center justify-center p-2 bg-[#FAF8FD] rounded-lg border border-slate-100 mb-4 group-hover:bg-purple-50/50 transition-colors">
                <svg viewBox="0 0 160 80" className="w-36 h-20 drop-shadow-sm text-slate-900" fill="currentColor" stroke="none">
                  <path d="M 16 20 C 40 18, 70 18, 70 24 C 70 48, 56 60, 42 60 C 26 60, 14 46, 16 20 Z" opacity="0.85" />
                  <path d="M 144 20 C 120 18, 90 18, 90 24 C 90 48, 104 60, 118 60 C 134 60, 146 46, 144 20 Z" opacity="0.85" />
                  <line x1="70" y1="26" x2="90" y2="26" stroke="#D4AF37" strokeWidth="4" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                  Sunglasses
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fashion meets UV400 polarized glare protection
                </p>
              </div>
            </div>

            {/* Card 4: Optical Services */}
            <div
              onClick={onBookAppointment}
              className="group cursor-pointer bg-white text-slate-900 rounded-xl p-5 shadow-lg border border-purple-100 hover:border-purple-300 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="h-28 flex items-center justify-center p-2 bg-[#FAF8FD] rounded-lg border border-slate-100 mb-4 group-hover:bg-purple-50/50 transition-colors">
                <div className="w-14 h-14 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700">
                  <ShieldCheck className="w-8 h-8" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                  Optical Services
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Free 3-sec computerized testing & personalized fitting
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof & KPI Strip (Full-width row placed below the hero split per guidelines) */}
        <div className="mt-12 pt-8 border-t border-purple-500/20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono tabular-nums">
              24+ Years
            </div>
            <div className="text-xs font-bold text-white mt-1">Clinical Mastery</div>
            <div className="text-[11px] text-purple-200 mt-0.5">17 Yrs Incharge · 7 Yrs Drishtipunj</div>
          </div>

          <div className="p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-300 font-mono tabular-nums">
              45,000+
            </div>
            <div className="text-xs font-bold text-white mt-1">Prescriptions Fitted</div>
            <div className="text-[11px] text-purple-200 mt-0.5">100% Adaptation Guarantee</div>
          </div>

          <div className="p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-mono tabular-nums">
              0.01 mm
            </div>
            <div className="text-xs font-bold text-white mt-1">Axis Centration</div>
            <div className="text-[11px] text-purple-200 mt-0.5">Digital Pupillary Distance Calibration</div>
          </div>

          <div className="p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-200 font-mono tabular-nums">
              1,200+
            </div>
            <div className="text-xs font-bold text-white mt-1">Ready Frame Styles</div>
            <div className="text-[11px] text-purple-200 mt-0.5">Budget ₹849 to Pure Titanium ₹3,899</div>
          </div>
        </div>

      </div>
    </section>
  );
};
