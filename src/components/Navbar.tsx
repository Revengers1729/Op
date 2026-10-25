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
    <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-[#0A1938] via-[#162456] to-[#2E1065] text-white shadow-lg border-b border-purple-500/20 backdrop-blur-md">
      {/* 3-ZONE TOP BAR CONTRACT */}
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3">
        
        {/* Zone 1: Single text element / logo lockup matching reference photo */}
        <a
          href="/"
          className="text-white whitespace-nowrap shrink-0 flex items-center gap-2.5 group"
        >
          {/* Eyeglasses Brand Icon */}
          <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center p-1.5 shadow-sm group-hover:bg-white/15 transition-colors">
            <svg viewBox="0 0 24 24" className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="6" cy="12" r="4" />
              <circle cx="18" cy="12" r="4" />
              <path d="M10 12h4" />
              <path d="M2 12h0" />
              <path d="M22 12h0" />
            </svg>
          </div>

          <div>
            <span className="font-display font-extrabold tracking-wider text-base sm:text-lg block leading-none text-white">
              ANAND OPTICAL
            </span>
            <span className="text-[9px] font-mono tracking-widest text-purple-200 block mt-0.5 uppercase">
              See The World Clearly
            </span>
          </div>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-purple-100">
          <a
            href="#catalog"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Eyewear Collection
          </a>
          <a
            href="#lens-tech"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Lens Lab
          </a>
          <a
            href="#founder-clinic"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Clinical Mastery
          </a>
          <a
            href="#store-location"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Store Map & Location
          </a>
          <a
            href="#face-guide"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Face Fit Guide
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onBookAppointment}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            <Calendar className="w-3.5 h-3.5 text-purple-200" />
            <span>Book Eye Test</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative px-3.5 py-1.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-md transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0"
            title="View order tray"
          >
            <ShoppingBag className="w-4 h-4 text-purple-700" />
            <span>Order Tray</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] font-mono flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-purple-200 hover:text-white rounded-md transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-purple-500/20 bg-[#0B1536] px-4 py-4 space-y-3 animate-fade-in">
          <div className="flex flex-col space-y-2 text-sm font-medium text-purple-100">
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white"
            >
              Eyewear Collection
            </a>
            <a
              href="#lens-tech"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white"
            >
              Lens Laboratory & Glare Test
            </a>
            <a
              href="#founder-clinic"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white"
            >
              Clinical Mastery (24+ Yrs Incharge)
            </a>
            <a
              href="#store-location"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white"
            >
              Store Location & Google Maps
            </a>
            <a
              href="#face-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white"
            >
              Face Shape & Virtual Mirror
            </a>
          </div>

          <div className="pt-3 border-t border-purple-500/20 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookAppointment();
              }}
              className="w-full py-2 text-xs font-semibold text-white bg-white/10 border border-white/20 rounded-md flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-purple-200" />
              <span>Book Free Eye Test</span>
            </button>

            <a
              href="https://wa.me/919430800015"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md flex items-center justify-center gap-1.5 shadow"
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
