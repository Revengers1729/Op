import React from 'react';
import { Phone, MapPin, Mail, ShieldCheck, Heart, Award } from 'lucide-react';
import { PolicyType } from './LegalModals';

interface Props {
  onOpenPolicy: (type: PolicyType) => void;
  onBookAppointment: () => void;
}

export const Footer: React.FC<Props> = ({ onOpenPolicy, onBookAppointment }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      {/* Upper Footer Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand & Credentials */}
        <div className="md:col-span-5 space-y-4">
          <span className="font-display text-lg font-bold text-white tracking-wider block">
            ANAND OPTICAL
          </span>
          <p className="text-slate-400 leading-relaxed max-w-sm">
            Certified Ophthalmic Eyewear Dispensary & Computerized Testing Clinic. Led by former Optical Incharge (17 years) and Drishtipunj Clinical Expert (7 years). Total 24+ years dedicated to precision vision.
          </p>
          <div className="text-[11px] font-mono text-slate-500">
            CIN / Registration: Registered Optical Establishment · Direct WhatsApp: 9430800015
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 space-y-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider block">
            Clinical Services
          </span>
          <ul className="space-y-2">
            <li>
              <button
                onClick={onBookAppointment}
                className="hover:text-amber-300 transition-colors text-left"
              >
                Free Computerized Eye Testing
              </button>
            </li>
            <li>
              <a href="#lens-tech" className="hover:text-amber-300 transition-colors">
                Blue-Cut Computer Lenses (420nm)
              </a>
            </li>
            <li>
              <a href="#lens-tech" className="hover:text-amber-300 transition-colors">
                Freeform Progressive Multifocals
              </a>
            </li>
            <li>
              <a href="#catalog" className="hover:text-amber-300 transition-colors">
                Pure Japanese Titanium Frames
              </a>
            </li>
            <li>
              <a href="#face-guide" className="hover:text-amber-300 transition-colors">
                Face Shape Virtual Try-On
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Hours */}
        <div className="md:col-span-4 space-y-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider block">
            Store & WhatsApp Helpline
          </span>
          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <a
                  href="https://wa.me/919430800015"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white font-mono font-bold hover:text-emerald-400 transition-colors block text-sm"
                >
                  +91 94308 00015
                </a>
                <span className="text-[11px] text-slate-500">Direct WhatsApp Orders & Prescription Help</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div className="text-slate-300">
                <a
                  href="https://www.google.com/maps/place/ANAND+OPTICAL/@25.6111055,85.0504545,2883m/data=!3m2!1e3!4b1!4m6!3m5!1s0x39ed573ff65f2281:0x3b9fccb74ec6bc4c!8m2!3d25.6111059!4d85.0607543!16s%2Fg%2F11y95by830"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition-colors font-medium text-white block"
                >
                  Anand Optical Showroom & Clinic ↗
                </a>
                <span className="block text-[11px] text-slate-400">Danapur, Khagaul, Patna, Bihar (25.6111059, 85.0607543)</span>
                <span className="block text-[11px] text-slate-500">Open 7 Days: 9:30 AM – 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal Strip */}
      <div className="border-t border-slate-900 bg-black/60 px-4 sm:px-6 py-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} Anand Optical. All Rights Reserved. Precision Eyewear & Dispensing.
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <button
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => onOpenPolicy('refund')}
              className="hover:text-white transition-colors"
            >
              7-Day Adaptation & Refund Policy
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => onOpenPolicy('cookies')}
              className="hover:text-white transition-colors"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
