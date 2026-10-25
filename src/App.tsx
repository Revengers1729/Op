import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { EyewearItem, CartItem, EyewearColor, LensOption } from './types/optical';
import { CATALOG_ITEMS, LENS_OPTIONS } from './data/catalog';
import { LenskartHeader } from './components/LenskartHeader';
import { LenskartHeroCarousel } from './components/LenskartHeroCarousel';
import { LenskartCategoryStrip } from './components/LenskartCategoryStrip';
import { ShopByShapeSection } from './components/ShopByShapeSection';
import { MaterialStoriesSection } from './components/MaterialStoriesSection';
import { CatalogSection } from './components/CatalogSection';
import { Glasses3DViewer } from './components/Glasses3DViewer';
import { InteractiveLensLab } from './components/InteractiveLensLab';
import { VirtualTryOnGuide } from './components/VirtualTryOnGuide';
import { OwnerAndStoreSpotlight } from './components/OwnerAndStoreSpotlight';
import { ProductCustomizerModal } from './components/ProductCustomizerModal';
import { OrderTrayDrawer } from './components/OrderTrayDrawer';
import { EyeTestBookingModal } from './components/EyeTestBookingModal';
import { PincodeModal } from './components/PincodeModal';
import { LenskartBottomNav } from './components/LenskartBottomNav';
import { FloatingHelpButton } from './components/FloatingHelpButton';
import { LegalModals, PolicyType } from './components/LegalModals';
import { CookieBanner } from './components/CookieBanner';
import { Footer } from './components/Footer';

export default function App() {
  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ao_eyewear_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ao_wishlist_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Location / Pincode state (Default: Danapur 801503 matching screenshot)
  const [currentPincode, setCurrentPincode] = useState('801503');
  const [currentCity, setCurrentCity] = useState('Danapur, Patna');
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);

  // Filter state synchronized from Category Strip, Shapes, or Mega Menu
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeShape, setActiveShape] = useState<string>('all');
  const [externalFilter, setExternalFilter] = useState<{
    type: 'gender' | 'shape' | 'category' | 'tier';
    value: string;
  } | null>(null);

  // Active Bottom Navigation Tab (Home, Stores, AR Try on, Eye Test, Orders)
  const [activeBottomTab, setActiveBottomTab] = useState<string>('home');

  // Modal states
  const [selectedItemForCustomizer, setSelectedItemForCustomizer] = useState<EyewearItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isEyeTestOpen, setIsEyeTestOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ao_eyewear_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ao_wishlist_ids', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  // Clean non-hash URLs for Google Search Console indexing (/catalog, /store-location, etc.)
  useEffect(() => {
    const path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '').toLowerCase();
    const routeMap: Record<string, string> = {
      catalog: 'catalog',
      'lens-lab': 'lens-tech',
      'founder-clinic': 'founder-clinic',
      'store-location': 'store-location',
      'face-guide': 'face-guide',
    };
    if (routeMap[path]) {
      setTimeout(() => {
        const el = document.getElementById(routeMap[path]);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showNotification('Removed from Wishlist');
        return prev.filter((item) => item !== id);
      } else {
        showNotification('Saved to Wishlist ♡');
        return [...prev, id];
      }
    });
  };

  // Quick Add handler (from the "+" button on catalog cards)
  const handleQuickAdd = (item: EyewearItem) => {
    const defaultColor = item.colors[0];
    const defaultLens = LENS_OPTIONS[1]; // Single Vision AR
    const cartId = `${item.id}-${defaultColor.name}-${defaultLens.id}-${Date.now()}`;

    const newCartItem: CartItem = {
      cartId,
      item,
      selectedColor: defaultColor,
      selectedLens: defaultLens,
      powerOption: 'upload_wa',
      quantity: 1,
    };

    setCartItems((prev) => [newCartItem, ...prev]);
    showNotification(`Added ${item.name} to order tray!`);

    try {
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.8 },
      });
    } catch (e) {}
  };

  // Add from Customizer Modal
  const handleAddFromCustomizer = (
    item: EyewearItem,
    color: EyewearColor,
    lens: LensOption,
    powerOption: 'later' | 'custom' | 'upload_wa',
    prescriptionDetails?: { rightEye?: string; leftEye?: string; notes?: string }
  ) => {
    const cartId = `${item.id}-${color.name}-${lens.id}-${Date.now()}`;

    const newCartItem: CartItem = {
      cartId,
      item,
      selectedColor: color,
      selectedLens: lens,
      powerOption,
      prescriptionDetails,
      quantity: 1,
    };

    setCartItems((prev) => [newCartItem, ...prev]);
    showNotification(`Added configured ${item.name} to order tray!`);
    setIsCartOpen(true);
  };

  const handleUpdateQty = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Category and Shape selection handlers
  const handleSelectCategory = (category: string, filterType?: 'gender' | 'shape' | 'category' | 'tier') => {
    setActiveCategory(category);
    if (filterType) {
      setExternalFilter({ type: filterType, value: category });
    } else {
      setExternalFilter(null);
    }
  };

  const handleSelectShape = (shape: string) => {
    setActiveShape(shape);
    if (shape !== 'all') {
      setExternalFilter({ type: 'shape', value: shape });
    } else {
      setExternalFilter(null);
    }
  };

  // Welcome Gift / Hustlr reservation action -> opens WhatsApp with pre-filled message
  const handleReserveHustlr = () => {
    const msg = encodeURIComponent(
      "Hello Anand Optical, I want to reserve the Welcome Gift - A FREE pair of Hustlr computer glasses for ₹99! Please confirm availability for Danapur/Patna."
    );
    window.open(`https://wa.me/919430800015?text=${msg}`, '_blank');
  };

  const handleExploreFestive = () => {
    setExternalFilter({ type: 'category', value: 'sunglasses' });
    const el = document.getElementById('catalog');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreTitanium = () => {
    setExternalFilter({ type: 'tier', value: 'premium' });
    const el = document.getElementById('catalog');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToStore = () => {
    const el = document.getElementById('store-location');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenTryOn = () => {
    const el = document.getElementById('try-on-3d-lab');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8FD] text-slate-900 flex flex-col justify-between selection:bg-purple-600 selection:text-white font-sans pb-16 md:pb-0">
      
      {/* Toast Notification Bar */}
      {notification && (
        <div className="fixed top-16 right-4 z-50 bg-[#162456] border border-purple-400/50 text-white px-4 py-2.5 rounded-xl shadow-2xl shadow-purple-950/30 flex items-center gap-2 text-xs font-semibold animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* 1. LENSKART-STYLE BRAND HEADER & MEGA-NAV */}
      <LenskartHeader
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {
          showNotification(`Wishlist contains ${wishlistIds.length} saved frames.`);
          const el = document.getElementById('catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenTryOn={handleOpenTryOn}
        onBookAppointment={() => setIsEyeTestOpen(true)}
        onOpenPincodeModal={() => setIsPincodeModalOpen(true)}
        currentPincode={currentPincode}
        currentCity={currentCity}
        catalogItems={CATALOG_ITEMS}
        onSelectCategory={handleSelectCategory}
        onSelectProduct={(item) => setSelectedItemForCustomizer(item)}
      />

      {/* MAIN BODY FLOW (Exact Match to Lenskart Mobile & Desktop Experience) */}
      <main className="flex-1">
        
        {/* 2. LENSKART HERO CAROUSEL & LIVE COUNTDOWN TIMER */}
        <LenskartHeroCarousel
          onReserveHustlr={handleReserveHustlr}
          onExploreFestive={handleExploreFestive}
          onExploreTitanium={handleExploreTitanium}
        />

        {/* 3. CATEGORY AVATARS STRIP (Exact match to user's mobile screenshot) */}
        <LenskartCategoryStrip
          selectedCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* 4. SHOP BY SHAPE SECTION (From user's video) */}
        <ShopByShapeSection
          selectedShape={activeShape}
          onSelectShape={handleSelectShape}
        />

        {/* 5. MATERIAL STORIES SECTION (From user's video: Acetate, Titanium, TR90, Steel) */}
        <MaterialStoriesSection
          onFilterMaterial={(kw) => {
            setExternalFilter({ type: 'shape', value: 'all' });
            // scroll to catalog
            const el = document.getElementById('catalog');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 6. PRIMARY CATALOG GRID WITH QUICK "+" ADD & WHATSAPP ORDERS */}
        <CatalogSection
          onQuickAdd={handleQuickAdd}
          onOpenCustomizer={(item) => setSelectedItemForCustomizer(item)}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          externalFilter={externalFilter}
          onClearExternalFilter={() => setExternalFilter(null)}
        />

        {/* 7. 3D THREE.JS GLASSES VIEWER & 10D INTERACTIVE OPHTHALMIC LENS LAB */}
        <section id="try-on-3d-lab" className="py-16 bg-gradient-to-b from-[#FAF8FD] via-[#101938] to-[#0A1226] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="mb-8 text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-widest block">
                Next-Gen 10D Optical Lab
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
                3D Interactive Frame & Lens Studio
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/80 mt-2">
                Rotate spectacles 360°, test 420nm blue-laser cut coatings, and preview night-driving anti-glare filters.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* 3D Three.js Glasses Viewer */}
              <div className="lg:col-span-6">
                <Glasses3DViewer />
              </div>

              {/* 10D Clinical Technology Description */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-[#141F48]/80 border border-purple-500/30 rounded-2xl p-6 shadow-xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
                    <span>CLINICAL OPHTHALMIC CERTIFICATION</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    Computerized Refraction & Lens Alignment
                  </h4>
                  <p className="text-xs text-purple-200/80 leading-relaxed">
                    Surfaced strictly with our Senior Optician’s 24+ years of clinical protocol (17 years Ex-Head Optical Incharge, 7 years Drishtipunj Eye Hospital). We guarantee zero pupil aberration, no prismatic distortion, and rapid 24-hour optical adaptation.
                  </p>
                  
                  <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-purple-300">
                    <span className="px-2.5 py-1 rounded bg-[#0A1226] border border-purple-500/30">✓ IOR 1.58 - 1.67 Aspheric</span>
                    <span className="px-2.5 py-1 rounded bg-[#0A1226] border border-purple-500/30">✓ 420nm Blue Block</span>
                    <span className="px-2.5 py-1 rounded bg-[#0A1226] border border-purple-500/30">✓ Hydrophobic AR Coat</span>
                  </div>
                </div>

                <div className="p-4 bg-purple-950/40 border border-purple-400/30 rounded-xl text-xs text-purple-200 flex items-center justify-between">
                  <div>
                    <strong className="block text-white">Need prescription assistance?</strong>
                    <span>Send your doctor's slip on WhatsApp for a free optical power review.</span>
                  </div>
                  <a
                    href="https://wa.me/919430800015?text=Hello%20Anand%20Optical,%20here%20is%20my%20prescription%20slip.%20Please%20recommend%20the%20best%20lenses."
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold shrink-0 shadow-sm"
                  >
                    Send on WhatsApp
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 8. INTERACTIVE 10D OPHTHALMIC LAB (Split slider, blue cut, photochromic) */}
        <InteractiveLensLab />

        {/* 9. VIRTUAL TRY-ON & LIVE WEBCAM MIRROR */}
        <VirtualTryOnGuide
          onSelectFrame={(item) => setSelectedItemForCustomizer(item)}
        />

        {/* 10. VISIT US IN STORE / DANAPUR MAIN SHOWROOM & GOOGLE MAPS */}
        <OwnerAndStoreSpotlight
          onBookAppointment={() => setIsEyeTestOpen(true)}
        />

      </main>

      {/* 11. FOOTER (Multi-column Lenskart hierarchy + credentials) */}
      <Footer
        onOpenPolicy={(policy) => setActivePolicy(policy)}
        onBookAppointment={() => setIsEyeTestOpen(true)}
      />

      {/* 12. LENSKART MOBILE BOTTOM DOCK (Exact match to user's mobile screenshot) */}
      <LenskartBottomNav
        activeTab={activeBottomTab}
        onTabChange={(tab) => setActiveBottomTab(tab)}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTryOn={handleOpenTryOn}
        onBookAppointment={() => setIsEyeTestOpen(true)}
        onScrollToStore={handleScrollToStore}
      />

      {/* 13. FLOATING CIRCULAR ? HELP BUTTON (Exact match to bottom-right button in screenshot) */}
      <FloatingHelpButton
        onBookAppointment={() => setIsEyeTestOpen(true)}
      />

      {/* 14. PINCODE MODAL (Location Selector for Danapur / Patna / Bihar) */}
      <PincodeModal
        isOpen={isPincodeModalOpen}
        onClose={() => setIsPincodeModalOpen(false)}
        currentPincode={currentPincode}
        onSelectPincode={(pin, city) => {
          setCurrentPincode(pin);
          setCurrentCity(city);
          showNotification(`Delivery location set to ${pin} · ${city}`);
        }}
      />

      {/* 15. ORDER TRAY DRAWER (Slide-over with instant WhatsApp checkout to 9430800015) */}
      <OrderTrayDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 16. PRODUCT CUSTOMIZER MODAL */}
      {selectedItemForCustomizer && (
        <ProductCustomizerModal
          item={selectedItemForCustomizer}
          isOpen={Boolean(selectedItemForCustomizer)}
          onClose={() => setSelectedItemForCustomizer(null)}
          onAddToCart={handleAddFromCustomizer}
        />
      )}

      {/* 17. FREE EYE TEST APPOINTMENT BOOKING MODAL */}
      <EyeTestBookingModal
        isOpen={isEyeTestOpen}
        onClose={() => setIsEyeTestOpen(false)}
      />

      {/* 18. LEGAL MODALS (Privacy Policy, Terms of Service, 7-Day Refund, Cookie Policy) */}
      <LegalModals
        activePolicy={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      {/* 19. COOKIE CONSENT BANNER */}
      <CookieBanner onOpenPolicy={(policy) => setActivePolicy(policy)} />

    </div>
  );
}
