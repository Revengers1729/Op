import React, { useState } from 'react';
import { HelpCircle, X, Phone, MessageSquare, Calendar, MapPin } from 'lucide-react';

interface Props {
  onBookAppointment: () => void;
}

export const FloatingHelpButton: React.FC<Props> = ({ onBookAppointment }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Circular ? Trigger */}
      <div className="fixed bottom-20 md:bottom-6 right-4 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Need Help?"
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0A1938] via-[#162456] to-[#2E1065] text-white flex items-center justify-center shadow-2xl border-2 border-purple-400/50 hover:scale-105 active:scale-95 transition-transform"
        >
          {isOpen ? <X className="w-5 h-5 text-white" /> : <HelpCircle className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Quick Help Modal Popup */}
      {isOpen && (
        <div className="fixed bottom-36 md:bottom-20 right-4 z-50 w-80 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0A1938] via-[#162456] to-[#2E1065] text-white flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm">Anand Optical Helpdesk</h4>
              <p className="text-[11px] text-purple-200">24+ Years Clinical Eyewear Assistance</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-300 hover:text-white rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Options */}
          <div className="p-4 space-y-2.5 text-xs">
            {/* WhatsApp Chat */}
            <a
              href="https://wa.me/919430800015?text=Hello%20Anand%20Optical,%20I%20need%20help%20choosing%20the%20right%20spectacles%20and%20lenses."
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors text-emerald-950 font-medium"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold block">WhatsApp Optician Help</span>
                <span className="text-[11px] text-emerald-700">Send photo of prescription for instant quote</span>
              </div>
            </a>

            {/* Direct Phone Call */}
            <a
              href="tel:+919430800015"
              className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-purple-50 border border-slate-200 rounded-xl transition-colors text-slate-800 font-medium"
            >
              <div className="w-8 h-8 rounded-full bg-[#162456] text-white flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold block">Call: +91 94308 00015</span>
                <span className="text-[11px] text-slate-500">Direct Showroom line (9:30 AM – 9 PM)</span>
              </div>
            </a>

            {/* Book Eye Checkup */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onBookAppointment();
              }}
              className="w-full flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-colors text-purple-950 font-medium text-left"
            >
              <div className="w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold block">Free Computerized Eye Test</span>
                <span className="text-[11px] text-purple-700">12-Step clinical refraction in Danapur</span>
              </div>
            </button>

            {/* Directions */}
            <a
              href="https://www.google.com/maps/place/ANAND+OPTICAL/@25.6111055,85.0504545,2883m/data=!3m2!1e3!4b1!4m6!3m5!1s0x39ed573ff65f2281:0x3b9fccb74ec6bc4c!8m2!3d25.6111059!4d85.0607543!16s%2Fg%2F11y95by830"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors text-slate-700 font-medium"
            >
              <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold block">Store Location & Directions</span>
                <span className="text-[11px] text-slate-500">Danapur, Khagaul, Patna, Bihar</span>
              </div>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
