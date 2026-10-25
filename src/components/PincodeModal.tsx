import React, { useState } from 'react';
import { X, MapPin, CheckCircle2, Truck, Clock } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentPincode: string;
  onSelectPincode: (pin: string, city: string) => void;
}

export const PincodeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentPincode,
  onSelectPincode,
}) => {
  const [inputPin, setInputPin] = useState(currentPincode);
  const [status, setStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const pin = inputPin.trim();
    if (!pin || pin.length < 6) {
      setStatus('Please enter a valid 6-digit PIN code.');
      return;
    }

    if (pin.startsWith('801') || pin.startsWith('800')) {
      onSelectPincode(pin, pin.startsWith('801503') ? 'Danapur, Patna' : 'Patna, Bihar');
      setStatus('Success! Express 24h store pickup & 3-day home delivery active for this area.');
      setTimeout(() => onClose(), 1200);
    } else {
      onSelectPincode(pin, 'Bihar / Pan-India');
      setStatus('Standard express delivery (3–4 business days) available via Bluedart / SpeedPost.');
      setTimeout(() => onClose(), 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-[#0A1938] text-white">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">Select Delivery Location</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white rounded-md hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Enter your 6-digit postal pincode to verify rapid delivery, store pickup, and free frame adjustment service at our Danapur, Patna clinic.
          </p>

          <form onSubmit={handleCheck} className="flex gap-2">
            <input
              type="text"
              maxLength={6}
              value={inputPin}
              onChange={(e) => setInputPin(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter Pincode (e.g. 801503)"
              className="flex-1 px-3.5 py-2.5 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:border-[#162456] focus:ring-1 focus:ring-[#162456]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#0A1938] hover:bg-[#162456] text-white text-xs font-bold rounded-lg transition-colors"
            >
              Check
            </button>
          </form>

          {status && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{status}</span>
            </div>
          )}

          {/* Quick presets */}
          <div className="pt-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Popular Nearby Areas
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  onSelectPincode('801503', 'Danapur, Patna');
                  onClose();
                }}
                className="p-2.5 bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-lg text-left transition-colors"
              >
                <strong className="block text-slate-900">801503 · Danapur</strong>
                <span className="text-[11px] text-emerald-600 flex items-center gap-1 mt-0.5">
                  <Truck className="w-3 h-3" /> Same day pickup
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectPincode('800001', 'Patna GPO / Bailey Rd');
                  onClose();
                }}
                className="p-2.5 bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-lg text-left transition-colors"
              >
                <strong className="block text-slate-900">800001 · Patna Central</strong>
                <span className="text-[11px] text-sky-600 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" /> 24–48h Delivery
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectPincode('801105', 'Khagaul, Patna');
                  onClose();
                }}
                className="p-2.5 bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-lg text-left transition-colors"
              >
                <strong className="block text-slate-900">801105 · Khagaul</strong>
                <span className="text-[11px] text-emerald-600 flex items-center gap-1 mt-0.5">
                  <Truck className="w-3 h-3" /> Same day pickup
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectPincode('800020', 'Kankarbagh, Patna');
                  onClose();
                }}
                className="p-2.5 bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-lg text-left transition-colors"
              >
                <strong className="block text-slate-900">800020 · Kankarbagh</strong>
                <span className="text-[11px] text-sky-600 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" /> 24h Delivery
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Physical Showroom: Danapur, Patna</span>
          <a
            href="https://wa.me/919430800015"
            target="_blank"
            rel="noreferrer"
            className="text-emerald-600 font-bold hover:underline"
          >
            WhatsApp Help: 9430800015
          </a>
        </div>
      </div>
    </div>
  );
};
