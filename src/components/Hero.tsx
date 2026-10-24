import React from 'react';
import { ArrowRight, Phone, ShieldCheck, Award, Eye, Sparkles } from 'lucide-react';
import { Glasses3DViewer } from './Glasses3DViewer';

interface Props {
  onExploreCatalog: () => void;
  onBookAppointment: () => void;
}

export const Hero: React.FC<Props> = ({ onExploreCatalog, onBookAppointment }) => {
  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-950 via-[#0B0F17] to-slate-950">
      {/* Background optical radial accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Hero 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Authoritative Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Trust Kicker (Clean unboxed text, no pill per frontend-design rules) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-amber-400">
              <span className="font-bold tracking-wider">ANAND OPTICAL CLINICAL DISPENSARY</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">EST. OVER 24 YEARS</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <a
                href="#store-location"
                className="text-sky-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Patna / Danapur Clinic</span>
              </a>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12] text-balance">
              Precision Eyecare & Handcrafted Optics
              <span className="block mt-1 bg-gradient-to-r from-amber-200 via-amber-400 to-sky-300 bg-clip-text text-transparent">
                With 24+ Years Clinical Mastery
              </span>
            </h1>

            {/* Direct Value Narrative */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Led by former <strong className="text-white">Head Optical Incharge (17 years)</strong> with <strong className="text-white">7 years of clinical refraction at Drishtipunj</strong>. We fit pure aerospace Japanese titanium, executive middle, and durable budget spectacles with zero-distortion progressive guarantees.
            </p>

            {/* Action Buttons: High Conversion CTAs (Crisp, zero-pill discipline) */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreCatalog}
                className="px-6 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors flex items-center gap-2 shadow-lg shadow-amber-950/40"
              >
                <span>Browse 2026 Frames</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/919430800015?text=Hello%20Anand%20Optical,%20I%20would%20like%20to%20order%20eyewear%20or%20consult%20on%20my%20prescription."
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors flex items-center gap-2 shadow-lg shadow-emerald-950/40"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Order: 9430800015</span>
              </a>

              <button
                onClick={onBookAppointment}
                className="px-4 py-3 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-md transition-colors"
              >
                Book Free Eye Test
              </button>
            </div>

            {/* Micro-guarantee text */}
            <div className="pt-1 flex items-center gap-4 text-[11px] text-slate-400 font-mono">
              <span>✓ All India Doorstep Dispatch</span>
              <span aria-hidden="true">·</span>
              <span>✓ WhatsApp Prescription Upload</span>
              <span aria-hidden="true">·</span>
              <span>✓ COD Available</span>
            </div>
          </div>

          {/* Right Column: 3D Interactive Canvas Viewer */}
          <div className="lg:col-span-6">
            <Glasses3DViewer />
          </div>

        </div>

        {/* 4-Column Proof & KPI Strip (Full-width row placed below the hero split per guidelines) */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 bg-slate-900/40 rounded-lg border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
              24+ Years
            </div>
            <div className="text-xs font-bold text-white mt-1">Clinical Experience</div>
            <div className="text-[11px] text-slate-400 mt-0.5">17 Yrs Incharge · 7 Yrs Drishtipunj</div>
          </div>

          <div className="p-4 bg-slate-900/40 rounded-lg border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono tabular-nums">
              45,000+
            </div>
            <div className="text-xs font-bold text-white mt-1">Prescriptions Fitted</div>
            <div className="text-[11px] text-slate-400 mt-0.5">100% Retinal Adaptation Warranty</div>
          </div>

          <div className="p-4 bg-slate-900/40 rounded-lg border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
              0.01 mm
            </div>
            <div className="text-xs font-bold text-white mt-1">Axis Centration</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Digital Pupillary Distance Calibration</div>
          </div>

          <div className="p-4 bg-slate-900/40 rounded-lg border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-200 font-mono tabular-nums">
              1,200+
            </div>
            <div className="text-xs font-bold text-white mt-1">Ready Frame Styles</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Budget ₹849 to Pure Titanium ₹3,899</div>
          </div>
        </div>

      </div>
    </section>
  );
};
