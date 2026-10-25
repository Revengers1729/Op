import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  MapPin, 
  Sparkles, 
  Camera, 
  User, 
  ChevronDown, 
  Flame, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Phone
} from 'lucide-react';
import { EyewearItem } from '../types/optical';

interface Props {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenTryOn: () => void;
  onBookAppointment: () => void;
  onOpenPincodeModal: () => void;
  currentPincode: string;
  currentCity: string;
  catalogItems: EyewearItem[];
  onSelectCategory: (category: string, filterType?: 'gender' | 'shape' | 'category' | 'tier') => void;
  onSelectProduct: (item: EyewearItem) => void;
}

export const LenskartHeader: React.FC<Props> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenTryOn,
  onBookAppointment,
  onOpenPincodeModal,
  currentPincode,
  currentCity,
  catalogItems,
  onSelectCategory,
  onSelectProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const searchRef = useRef<HTMLDivElement>(null);

  const placeholders = [
    'Search "color changing lens"',
    'Search "blue cut computer glasses"',
    'Search "pure japanese titanium"',
    'Search "cat-eye glasses"',
    'Search "polarized sunglasses"',
    'Search "reading glasses"',
    'Search "kids unbreakable frame"',
  ];

  // Rotate placeholder every 3.2s
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Filter items dynamically based on search
  const filteredSearchResults = searchQuery.trim()
    ? catalogItems.filter(
        (it) =>
          it.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          it.shape.toLowerCase().includes(searchQuery.toLowerCase()) ||
          it.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
          it.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (it.brand && it.brand.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm border-b border-slate-200">
      {/* 1. TOP ANNOUNCEMENT STRIP (Exact match to screenshot top strip) */}
      <div className="bg-[#0A1938] text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-amber-400">4.9 ★ Rating</span>
          <span className="text-slate-400">|</span>
          <span className="hidden sm:inline text-slate-200">50,000+ Happy Eyes in Patna & Danapur</span>
          <span className="sm:hidden text-slate-200">Patna & Danapur Clinic</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:+919430800015"
            className="flex items-center gap-1 font-mono font-bold text-emerald-300 hover:text-white"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>9430800015</span>
          </a>
          <span className="text-slate-500">|</span>
          <a
            href="https://wa.me/919430800015?text=Hello%20Anand%20Optical,%20I%20want%20to%20order%20eyewear."
            target="_blank"
            rel="noreferrer"
            className="bg-white/10 hover:bg-white/20 text-white px-2 py-0.5 rounded text-[10px] font-bold tracking-wide"
          >
            WhatsApp Order
          </a>
        </div>
      </div>

      {/* 2. MAIN HEADER ROW (Avatar, Delivery, Brand Logo, Gold, Wishlist, Cart) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 md:gap-6">
        
        {/* Left Side: Avatar & Delivery Location (Exact match to mobile screenshot) */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onBookAppointment()}
            title="Senior Optician Clinic"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-purple-100 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-purple-700 transition-colors shrink-0"
          >
            <User className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenPincodeModal}
            className="flex flex-col text-left group"
          >
            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 leading-tight">
              <span>3 day delivery</span>
              <span className="text-red-500">⚡</span>
            </span>
            <span className="text-xs font-semibold text-slate-900 group-hover:text-purple-700 flex items-center gap-0.5 leading-tight">
              <span>{currentPincode} · {currentCity}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-purple-700" />
            </span>
          </button>
        </div>

        {/* Center: Brand Logo - ANAND OPTICAL with Connected Eyeglasses Icon */}
        <a
          href="/"
          className="flex items-center gap-2 group shrink-0"
        >
          {/* Lenskart-style modern connected dual-rim eyewear logo */}
          <div className="w-9 h-7 flex items-center justify-center text-[#162456] group-hover:text-purple-700 transition-colors">
            <svg viewBox="0 0 44 24" className="w-full h-full fill-none stroke-current stroke-[2.8]" strokeLinecap="round" strokeLinejoin="round">
              {/* Left Lens */}
              <circle cx="11" cy="12" r="8.5" />
              {/* Right Lens */}
              <circle cx="33" cy="12" r="8.5" />
              {/* Bridge */}
              <path d="M19.5 12h5" />
              {/* Temples */}
              <path d="M2.5 12h0" />
              <path d="M41.5 12h0" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#0A1938] leading-none group-hover:text-purple-800 transition-colors">
              ANAND OPTICAL
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase mt-0.5 hidden sm:block">
              Precision Vision & Eyewear
            </span>
          </div>
        </a>

        {/* Right Side: GET GOLD VIP Badge, Wishlist, Cart, Menu */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          {/* GET GOLD VIP Badge (Exact match to screenshot) */}
          <button
            onClick={() => onBookAppointment()}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 text-slate-950 border border-amber-500 shadow-sm hover:scale-105 active:scale-95 transition-transform"
          >
            <Sparkles className="w-3 h-3 text-amber-900 fill-amber-900" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider">GET GOLD</span>
          </button>

          {/* Wishlist Heart */}
          <button
            onClick={onOpenWishlist}
            className="relative p-1.5 text-slate-700 hover:text-red-500 transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart / Order Tray Bag */}
          <button
            onClick={onOpenCart}
            className="relative p-1.5 text-slate-700 hover:text-purple-700 transition-colors"
            title="Order Tray"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-700 text-white text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-700 hover:text-slate-950"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. SEARCH ROW (Rounded Search Bar + 3D Camera Try-on Icon matching screenshot) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pb-2.5">
        <div ref={searchRef} className="relative flex items-center gap-2">
          
          {/* Big Search Input with rotating placeholder */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchFocused(true);
              }}
              onFocus={() => setSearchFocused(true)}
              placeholder={placeholders[placeholderIndex]}
              className="w-full pl-10 pr-9 py-2.5 bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-xs sm:text-sm text-slate-900 border border-slate-200 focus:border-[#162456] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#162456]/15 transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 3D / AR Try-on Camera button (Orange/Red glyph matching screenshot icon) */}
          <button
            onClick={onOpenTryOn}
            title="3D Virtual Try-On"
            className="px-3 py-2.5 bg-gradient-to-tr from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl shadow-sm flex items-center gap-1.5 shrink-0 transition-transform hover:scale-105 active:scale-95"
          >
            <Camera className="w-4 h-4" />
            <span className="text-xs font-bold hidden sm:inline">3D Try On</span>
          </button>

          {/* LIVE SEARCH AUTOCOMPLETE DROPDOWN */}
          {searchFocused && searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden max-h-96 overflow-y-auto animate-fade-in">
              <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Matching frames ({filteredSearchResults.length})</span>
                <span className="font-mono text-[11px]">Direct WhatsApp Checkout</span>
              </div>

              {filteredSearchResults.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500">
                  <p>No exact frame found for "{searchQuery}".</p>
                  <p className="mt-1 text-slate-400">Try searching "titanium", "blue cut", "aviator", or "cat-eye".</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {filteredSearchResults.slice(0, 6).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onSelectProduct(item);
                        setSearchFocused(false);
                      }}
                      className="p-3 hover:bg-purple-50/60 flex items-center justify-between gap-3 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center p-1 border border-slate-200">
                          <span className="text-[10px] font-mono font-bold text-slate-600 uppercase">
                            {item.shape.slice(0, 4)}
                          </span>
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-900">{item.name}</h5>
                          <span className="text-[11px] text-slate-500">
                            {item.material} · {item.shape}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-900 block">₹{item.price}</span>
                        <span className="text-[10px] text-slate-400 line-through">₹{item.originalPrice}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 4. DESKTOP MEGA NAVIGATION BAR (From Lenskart desktop video) */}
      <nav className="hidden md:block border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <ul className="flex items-center gap-8 text-xs font-semibold text-slate-700">
            
            {/* Eyeglasses with Power */}
            <li
              onMouseEnter={() => setActiveMegaMenu('eyeglasses')}
              className="py-3 relative group"
            >
              <button
                onClick={() => onSelectCategory('eyeglasses', 'category')}
                className="flex items-center gap-1.5 hover:text-[#162456] transition-colors"
              >
                <span>Eyeglasses</span>
                <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">
                  with Power
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform" />
              </button>
            </li>

            {/* Sunglasses */}
            <li
              onMouseEnter={() => setActiveMegaMenu('sunglasses')}
              className="py-3 relative group"
            >
              <button
                onClick={() => onSelectCategory('sunglasses', 'category')}
                className="flex items-center gap-1.5 hover:text-[#162456] transition-colors"
              >
                <span>Sunglasses</span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform" />
              </button>
            </li>

            {/* Screen Glasses (Blue Light Cut) */}
            <li
              onMouseEnter={() => setActiveMegaMenu('screen')}
              className="py-3 relative group"
            >
              <button
                onClick={() => onSelectCategory('screen', 'category')}
                className="flex items-center gap-1.5 hover:text-[#162456] transition-colors"
              >
                <span>Computer Glasses</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Zero Power
                </span>
              </button>
            </li>

            {/* Contact Lenses */}
            <li
              onMouseEnter={() => setActiveMegaMenu('contact-lenses')}
              className="py-3 relative group"
            >
              <button
                onClick={() => onSelectCategory('contact-lenses', 'category')}
                className="flex items-center gap-1.5 hover:text-[#162456] transition-colors"
              >
                <span>Contact Lenses</span>
              </button>
            </li>

            {/* Stores */}
            <li className="py-3">
              <a
                href="#store-location"
                className="hover:text-[#162456] transition-colors flex items-center gap-1"
              >
                <MapPin className="w-3.5 h-3.5 text-purple-700" />
                <span>Danapur Store</span>
              </a>
            </li>

            {/* Try @ Home / Clinic Test */}
            <li className="py-3">
              <button
                onClick={onBookAppointment}
                className="hover:text-[#162456] transition-colors flex items-center gap-1 text-purple-700 font-bold"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Free Eye Test Booking</span>
              </button>
            </li>
          </ul>

          {/* Right helper text */}
          <div className="text-[11px] font-mono text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Senior Master Optician: 24+ Yrs Clinical Experience</span>
          </div>
        </div>

        {/* LENSKART MEGA MENU DROPDOWN (Matches the mega menu from user's video) */}
        {activeMegaMenu && (
          <div
            onMouseLeave={() => setActiveMegaMenu(null)}
            className="absolute top-full left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-2xl animate-fade-in"
          >
            <div className="max-w-7xl mx-auto p-8 grid grid-cols-5 gap-8">
              
              {/* Col 1: Buying for */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block border-b border-slate-100 pb-2">
                  Buying For
                </span>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li>
                    <button
                      onClick={() => {
                        onSelectCategory('men', 'gender');
                        setActiveMegaMenu(null);
                      }}
                      className="hover:text-purple-700 font-medium transition-colors"
                    >
                      Men's Eyewear
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        onSelectCategory('women', 'gender');
                        setActiveMegaMenu(null);
                      }}
                      className="hover:text-purple-700 font-medium transition-colors"
                    >
                      Women's Eyewear
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        onSelectCategory('kids', 'gender');
                        setActiveMegaMenu(null);
                      }}
                      className="hover:text-purple-700 font-medium transition-colors"
                    >
                      Kids Unbreakable Frames
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        onSelectCategory('budget', 'tier');
                        setActiveMegaMenu(null);
                      }}
                      className="hover:text-purple-700 font-medium transition-colors text-emerald-600 font-bold"
                    >
                      Starting @ ₹499 (Hustlr)
                    </button>
                  </li>
                </ul>
              </div>

              {/* Col 2: By Shape */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block border-b border-slate-100 pb-2">
                  By Shape
                </span>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li>
                    <button
                      onClick={() => {
                        onSelectCategory('rectangle', 'shape');
                        setActiveMegaMenu(null);
                      }}
                      className="hover:text-purple-700 transition-colors"
                    >
                      Classic Rectangle
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        onSelectCategory('round', 'shape');
                        setActiveMegaMenu(null);
                      }}
                      className="hover:text-purple-700 transition-colors"
                    >
                      Pantos Round
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        onSelectCategory('aviator', 'shape');
                        setActiveMegaMenu(null);
                      }}
                      className="hover:text-purple-700 transition-colors"
                    >
                      Pilot Aviator
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        onSelectCategory('cat-eye', 'shape');
                        setActiveMegaMenu(null);
                      }}
                      className="hover:text-purple-700 transition-colors"
                    >
                      Sculpted Cat-Eye
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        onSelectCategory('clubmaster', 'shape');
                        setActiveMegaMenu(null);
                      }}
                      className="hover:text-purple-700 transition-colors"
                    >
                      Clubmaster Browline
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        onSelectCategory('hexagonal', 'shape');
                        setActiveMegaMenu(null);
                      }}
                      className="hover:text-purple-700 transition-colors"
                    >
                      Geometric Hexagonal
                    </button>
                  </li>
                </ul>
              </div>

              {/* Col 3: By Brand */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block border-b border-slate-100 pb-2">
                  By Brand / Collection
                </span>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li>
                    <span className="font-bold text-slate-900 block">Anand Signature Royale</span>
                    <span className="text-[11px] text-slate-400">Pure Japanese Beta-Titanium</span>
                  </li>
                  <li>
                    <span className="font-bold text-slate-900 block">Vincent Chase</span>
                    <span className="text-[11px] text-slate-400">Urban Trendsetter Eyewear</span>
                  </li>
                  <li>
                    <span className="font-bold text-slate-900 block">John Jacobs</span>
                    <span className="text-[11px] text-slate-400">Italian Block Acetate & Steel</span>
                  </li>
                  <li>
                    <span className="font-bold text-slate-900 block">Hustlr by Anand</span>
                    <span className="text-[11px] text-slate-400">Zero-Power Blue Cut @ ₹499</span>
                  </li>
                </ul>
              </div>

              {/* Col 4: Special Powers */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block border-b border-slate-100 pb-2">
                  Special Powers & Lenses
                </span>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li>
                    <a href="#lens-tech" className="hover:text-purple-700 block transition-colors">
                      <strong className="text-slate-900">Blue-Cut 420nm Shield</strong>
                      <span className="block text-[11px] text-slate-400">Anti-eyestrain for monitors</span>
                    </a>
                  </li>
                  <li>
                    <a href="#lens-tech" className="hover:text-purple-700 block transition-colors">
                      <strong className="text-slate-900">Digital Freeform Progressive</strong>
                      <span className="block text-[11px] text-slate-400">Distance + intermediate + near</span>
                    </a>
                  </li>
                  <li>
                    <a href="#lens-tech" className="hover:text-purple-700 block transition-colors">
                      <strong className="text-slate-900">Smart Transitions Photochromic</strong>
                      <span className="block text-[11px] text-slate-400">Clear indoor, dark sunglasses outdoor</span>
                    </a>
                  </li>
                  <li>
                    <a href="#lens-tech" className="hover:text-purple-700 block transition-colors">
                      <strong className="text-slate-900">1.67 Aspheric Ultra-Thin</strong>
                      <span className="block text-[11px] text-slate-400">For high myopia (-3.00 to -10.00)</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Col 5: Visual Promo Card (Matches video showcase) */}
              <div className="rounded-xl overflow-hidden bg-gradient-to-br from-[#0A1938] via-[#162456] to-[#2E1065] text-white p-5 flex flex-col justify-between shadow-lg">
                <div className="space-y-2">
                  <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase">
                    Welcome Gift
                  </span>
                  <h4 className="text-sm font-bold text-white">Free Pair of Hustlr Glasses</h4>
                  <p className="text-[11px] text-purple-200 leading-relaxed">
                    Reserve with ₹99 and receive zero-power blue protection glasses. Direct delivery in Danapur & Patna.
                  </p>
                </div>

                <a
                  href="https://wa.me/919430800015?text=Hello%20Anand%20Optical,%20I%20would%20like%20to%20reserve%20the%20FREE%20pair%20of%20Hustlr%20glasses%20for%20₹99."
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 px-3 py-2 bg-white hover:bg-slate-100 text-[#0A1938] text-xs font-bold rounded-lg text-center shadow-md transition-colors flex items-center justify-center gap-1"
                >
                  <span>Reserve on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>
        )}
      </nav>

      {/* 5. MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-4 animate-fade-in shadow-xl">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Quick Categories
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  onSelectCategory('men', 'gender');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 bg-slate-50 hover:bg-purple-50 rounded-lg text-left font-semibold text-slate-800"
              >
                Men's Eyeglasses
              </button>
              <button
                onClick={() => {
                  onSelectCategory('women', 'gender');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 bg-slate-50 hover:bg-purple-50 rounded-lg text-left font-semibold text-slate-800"
              >
                Women's Eyeglasses
              </button>
              <button
                onClick={() => {
                  onSelectCategory('kids', 'gender');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 bg-slate-50 hover:bg-purple-50 rounded-lg text-left font-semibold text-slate-800"
              >
                Kids Safe Frames
              </button>
              <button
                onClick={() => {
                  onSelectCategory('sunglasses', 'category');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 bg-slate-50 hover:bg-purple-50 rounded-lg text-left font-semibold text-slate-800"
              >
                Polarized Sunglasses
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookAppointment();
              }}
              className="w-full py-2.5 bg-[#162456] text-white rounded-lg font-bold flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Eye Checkup</span>
            </button>

            <a
              href="https://wa.me/919430800015"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 bg-emerald-600 text-white rounded-lg font-bold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Direct: 9430800015</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
