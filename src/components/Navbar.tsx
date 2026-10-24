import React, { useState } from 'react';
import { ShoppingBag, Phone, Menu, X, Calendar } from 'lucide-react';

interface Props {
  cartCount: number;
  onOpenCart: () => void;
  onBookAppointment: () => void;
}

export const Navbar: React.FC<Props> = ({
  cartCount,
  onOpenCart,
  onBookAppointment,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      {/* 3-ZONE TOP BAR CONTRACT */}
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          <span className="font-display font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent">
            ANAND OPTICAL
          </span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-300">
          <a
            href="#catalog"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            Eyewear Catalog
          </a>
          <a
            href="#lens-tech"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            Lens Lab
          </a>
          <a
            href="#founder-clinic"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            Founder & Clinic
          </a>
          <a
            href="#store-location"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            Store Map & Location
          </a>
          <a
            href="#face-guide"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            Face Fit Guide
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onBookAppointment}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white border border-slate-700/80 hover:border-slate-500 rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            <Calendar className="w-3.5 h-3.5 text-sky-400" />
            <span>Book Eye Test</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0"
            title="View order tray"
          >
            <ShoppingBag className="w-4 h-4 text-slate-950" />
            <span>Order Tray</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-slate-950 text-amber-300 text-[10px] font-mono flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-md transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3 animate-fade-in">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-300">
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-300"
            >
              Eyewear Catalog
            </a>
            <a
              href="#lens-tech"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-300"
            >
              Lens Laboratory & Glare Test
            </a>
            <a
              href="#founder-clinic"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-300"
            >
              Founder & Showroom (24+ Yrs Exp)
            </a>
            <a
              href="#store-location"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-300"
            >
              Store Location & Google Maps
            </a>
            <a
              href="#face-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-300"
            >
              Face Shape & Virtual Mirror
            </a>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookAppointment();
              }}
              className="w-full py-2 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-700 rounded-md flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              <span>Book Free Eye Test</span>
            </button>

            <a
              href="https://wa.me/919430800015"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Direct WhatsApp: 9430800015</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
