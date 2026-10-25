import React from 'react';
import { Phone, MapPin, Mail, ShieldCheck, Heart, Award } from 'lucide-react';
import { PolicyType } from './LegalModals';

interface Props {
  onOpenPolicy: (type: PolicyType) => void;
  onBookAppointment: () => void;
}

export const Footer: React.FC<Props> = ({ onOpenPolicy, onBookAppointment }) => {
  return (
    <footer className="bg-gradient-to-b from-[#0A1938] via-[#141B4B] to-[#1E0942] border-t border-purple-500/25 text-purple-200/80 text-xs">
      {/* Upper Footer Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand & Credentials */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-purple-900/40">
              AO
            </div>
            <span className="font-display text-lg font-bold text-white tracking-wider block">
              ANAND OPTICAL
            </span>
          </div>
          <p className="text-purple-200/80 leading-relaxed max-w-sm">
            Certified Ophthalmic Eyewear Dispensary & Computerized Testing Clinic. Led by former Optical Incharge (17 years) and Drishtipunj Clinical Expert (7 years). Total 24+ years dedicated to precision vision and eye care.
          </p>
          <div className="text-[11px] font-mono text-purple-300/70">
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
                className="hover:text-purple-300 transition-colors text-left"
              >
                Free Computerized Eye Testing
              </button>
            </li>
            <li>
              <a href="#lens-tech" className="hover:text-purple-300 transition-colors">
                Blue-Cut Computer Lenses (420nm)
              </a>
            </li>
            <li>
              <a href="#lens-tech" className="hover:text-purple-300 transition-colors">
                Freeform Progressive Multifocals
              </a>
            </li>
            <li>
              <a href="#catalog" className="hover:text-purple-300 transition-colors">
                Pure Japanese Titanium Frames
              </a>
            </li>
            <li>
              <a href="#face-guide" className="hover:text-purple-300 transition-colors">
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
                <span className="text-[11px] text-purple-300/70">Direct WhatsApp Orders & Prescription Help</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div className="text-purple-200">
                <a
                  href="https://www.google.com/maps/place/ANAND+OPTICAL/@25.6111055,85.0504545,2883m/data=!3m2!1e3!4b1!4m6!3m5!1s0x39ed573ff65f2281:0x3b9fccb74ec6bc4c!8m2!3d25.6111059!4d85.0607543!16s%2Fg%2F11y95by830"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-purple-300 transition-colors font-medium text-white block"
                >
                  Anand Optical Showroom & Clinic ↗
                </a>
                <span className="block text-[11px] text-purple-200/70">Danapur, Khagaul, Patna, Bihar (25.6111059, 85.0607543)</span>
                <span className="block text-[11px] text-purple-300/60">Open 7 Days: 9:30 AM – 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal Strip */}
      <div className="border-t border-purple-900/50 bg-[#060C20]/90 px-4 sm:px-6 py-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="text-purple-300/80">
            © {new Date().getFullYear()} Anand Optical. All Rights Reserved. Precision Eyewear & Clinical Dispensing.
          </div>

          <div className="flex flex-wrap items-center gap-4 text-purple-300/80">
            <button
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true" className="text-purple-500/40">·</span>
            <button
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <span aria-hidden="true" className="text-purple-500/40">·</span>
            <button
              onClick={() => onOpenPolicy('refund')}
              className="hover:text-white transition-colors"
            >
              7-Day Adaptation & Refund Policy
            </button>
            <span aria-hidden="true" className="text-purple-500/40">·</span>
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
