import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const EyeTestBookingModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [service, setService] = useState('Free Computerized Eye Testing');
  const [consent, setConsent] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;

    try {
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    } catch (e) {}

    let text = `*CLINICAL APPOINTMENT BOOKING - ANAND OPTICAL*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `👤 *Patient Name:* ${fullName}\n`;
    text += `📞 *Phone:* ${phone}\n`;
    text += `🔬 *Requested Service:* ${service}\n`;
    text += `📅 *Preferred Date:* ${preferredDate || 'Tomorrow / Earliest Available'}\n`;
    text += `⏰ *Time Slot:* ${preferredTime}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Requesting consultation with Senior Optical Incharge (24+ Yrs Exp).\n`;
    text += `Please confirm my appointment slot at Anand Optical.`;

    const encoded = encodeURI(text);
    window.open(`https://wa.me/919430800015?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div>
            <span className="text-[11px] font-mono text-sky-400 font-semibold uppercase tracking-wider">
              FREE COMPUTERIZED CLINIC APPOINTMENT
            </span>
            <h3 className="text-lg font-bold text-white">Book Your Eye Examination</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clinic address note */}
        <div className="px-6 py-2 bg-slate-950/80 border-b border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Clinic Location: <strong className="text-slate-200">Danapur, Patna, Bihar</strong></span>
          <a
            href="https://www.google.com/maps/place/ANAND+OPTICAL/@25.6111055,85.0504545,2883m/data=!3m2!1e3!4b1!4m6!3m5!1s0x39ed573ff65f2281:0x3b9fccb74ec6bc4c!8m2!3d25.6111059!4d85.0607543!16s%2Fg%2F11y95by830"
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 hover:underline"
          >
            View Map ↗
          </a>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Select Optical Examination:
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="Free Computerized Eye Testing">Free 3-Second Computerized Eye Testing</option>
              <option value="Progressive & Multifocal Fitting">Progressive & Multifocal Corridor Calibration</option>
              <option value="Blue-Light Digital Eye Strain Check">Digital Fatigue & Blue-Shield Evaluation</option>
              <option value="Pediatric Power Assessment">Children / Pediatric Gentle Power Check</option>
              <option value="Frame Realignment & Ultrasonic Cleaning">Complimentary Ultrasonic Bath & Frame Contouring</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Patient Full Name:
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Anand Kumar"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                WhatsApp / Mobile:
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 94XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Preferred Date:
              </label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Preferred Slot:
              </label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="10:00 AM - 12:00 PM">Morning (10:00 AM - 12:00 PM)</option>
                <option value="12:00 PM - 03:00 PM">Afternoon (12:00 PM - 03:00 PM)</option>
                <option value="04:00 PM - 07:00 PM">Evening (04:00 PM - 07:00 PM)</option>
                <option value="07:00 PM - 09:00 PM">Night (07:00 PM - 09:00 PM)</option>
              </select>
            </div>
          </div>

          {/* Form Consent Checkbox */}
          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="appointmentConsent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              className="mt-0.5 accent-sky-500 cursor-pointer"
            />
            <label htmlFor="appointmentConsent" className="text-[11px] text-slate-400 leading-tight cursor-pointer">
              I consent to share my appointment details with Anand Optical via WhatsApp (9430800015) for clinical eye examination scheduling.
            </label>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-emerald-400 font-medium">
              ✓ 100% Free Consultation & Testing
            </span>

            <button
              type="submit"
              disabled={!consent}
              className="px-5 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 disabled:opacity-50 rounded-md transition-colors flex items-center gap-2 shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Confirm on WhatsApp</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
