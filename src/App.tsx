import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { EyewearItem, CartItem, EyewearColor, LensOption } from './types/optical';
import { LENS_OPTIONS } from './data/catalog';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveLensLab } from './components/InteractiveLensLab';
import { CatalogSection } from './components/CatalogSection';
import { VirtualTryOnGuide } from './components/VirtualTryOnGuide';
import { OwnerAndStoreSpotlight } from './components/OwnerAndStoreSpotlight';
import { ProductCustomizerModal } from './components/ProductCustomizerModal';
import { OrderTrayDrawer } from './components/OrderTrayDrawer';
import { EyeTestBookingModal } from './components/EyeTestBookingModal';
import { LegalModals, PolicyType } from './components/LegalModals';
import { CookieBanner } from './components/CookieBanner';
import { MobileStickyCTA } from './components/MobileStickyCTA';
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

  // Modal states
  const [selectedItemForCustomizer, setSelectedItemForCustomizer] = useState<EyewearItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isEyeTestOpen, setIsEyeTestOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('ao_eyewear_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3200);
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
        particleCount: 25,
        spread: 35,
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

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950 font-sans">
      
      {/* Toast Notification Bar */}
      {notification && (
        <div className="fixed top-16 right-4 z-50 bg-slate-900 border border-amber-400 text-white px-4 py-2.5 rounded-lg shadow-2xl flex items-center gap-2 text-xs font-semibold animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onBookAppointment={() => setIsEyeTestOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 pb-16 md:pb-0">
        {/* Hero with 3D Canvas */}
        <Hero
          onExploreCatalog={() => {
            const el = document.getElementById('catalog');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onBookAppointment={() => setIsEyeTestOpen(true)}
        />

        {/* Catalog Section with quick "+" add */}
        <CatalogSection
          onQuickAdd={handleQuickAdd}
          onOpenCustomizer={(item) => setSelectedItemForCustomizer(item)}
        />

        {/* Interactive Lens Laboratory (Blue-Cut, AR, Transitions, Progressives) */}
        <InteractiveLensLab />

        {/* Physiognomic Face Shape Guide & Live Mirror Try-On */}
        <VirtualTryOnGuide
          onSelectFrame={(item) => setSelectedItemForCustomizer(item)}
        />

        {/* Founder (24+ Yrs Ex-Incharge & Drishtipunj) & Showroom Presentation */}
        <OwnerAndStoreSpotlight
          onBookAppointment={() => setIsEyeTestOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenPolicy={(policy) => setActivePolicy(policy)}
        onBookAppointment={() => setIsEyeTestOpen(true)}
      />

      {/* Mobile Sticky Bar (Strictly <= 15% viewport cap) */}
      <MobileStickyCTA
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Order Tray Slide-over Drawer */}
      <OrderTrayDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Product Customizer Modal */}
      {selectedItemForCustomizer && (
        <ProductCustomizerModal
          item={selectedItemForCustomizer}
          isOpen={Boolean(selectedItemForCustomizer)}
          onClose={() => setSelectedItemForCustomizer(null)}
          onAddToCart={handleAddFromCustomizer}
        />
      )}

      {/* Free Eye Test Appointment Booking Modal */}
      <EyeTestBookingModal
        isOpen={isEyeTestOpen}
        onClose={() => setIsEyeTestOpen(false)}
      />

      {/* Legal Modals (Privacy, Terms, Refund, Cookies) */}
      <LegalModals
        activePolicy={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      {/* Cookie Consent Banner */}
      <CookieBanner onOpenPolicy={(policy) => setActivePolicy(policy)} />

    </div>
  );
}
