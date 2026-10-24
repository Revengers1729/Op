import React from 'react';
import { ShoppingBag, Phone, Plus } from 'lucide-react';

interface Props {
  cartCount: number;
  onOpenCart: () => void;
}

export const MobileStickyCTA: React.FC<Props> = ({ cartCount, onOpenCart }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-950/95 border-t border-slate-800 backdrop-blur-md px-3 py-2 flex items-center justify-between gap-3 shadow-[0_-8px_20px_rgba(0,0,0,0.5)]">
      {/* Tray quick peek */}
      <button
        onClick={onOpenCart}
        className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 rounded-md text-xs font-semibold text-slate-200"
      >
        <div className="relative">
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[9px] font-mono font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span>Tray {cartCount > 0 ? `(${cartCount})` : ''}</span>
      </button>

      {/* High-conversion primary WhatsApp button */}
      <a
        href="https://wa.me/919430800015?text=Hello%20Anand%20Optical,%20I%20am%20browsing%20your%20eyewear%20collection%20and%20would%20like%20to%20order."
        target="_blank"
        rel="noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-xs font-bold shadow-md shadow-emerald-950/40"
      >
        <Phone className="w-3.5 h-3.5" />
        <span>WhatsApp Order: 9430800015</span>
      </a>
    </div>
  );
};
