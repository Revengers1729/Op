import React from 'react';
import { Home, Store, ScanEye, CalendarPlus, Receipt, MessageCircle } from 'lucide-react';

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenTryOn: () => void;
  onBookAppointment: () => void;
  onScrollToStore: () => void;
}

export const LenskartBottomNav: React.FC<Props> = ({
  activeTab,
  onTabChange,
  cartCount,
  onOpenCart,
  onOpenTryOn,
  onBookAppointment,
  onScrollToStore,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-1 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-around">
      {/* 1. Home */}
      <button
        onClick={() => {
          onTabChange('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center flex-1 py-1 relative ${
          activeTab === 'home' ? 'text-[#162456]' : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-semibold mt-0.5">Home</span>
        {activeTab === 'home' && (
          <span className="absolute bottom-0 w-8 h-0.5 bg-[#162456] rounded-full" />
        )}
      </button>

      {/* 2. Stores */}
      <button
        onClick={() => {
          onTabChange('stores');
          onScrollToStore();
        }}
        className={`flex flex-col items-center justify-center flex-1 py-1 relative ${
          activeTab === 'stores' ? 'text-[#162456]' : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <Store className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-0.5">Stores</span>
        {activeTab === 'stores' && (
          <span className="absolute bottom-0 w-8 h-0.5 bg-[#162456] rounded-full" />
        )}
      </button>

      {/* 3. AR Try on */}
      <button
        onClick={() => {
          onTabChange('tryon');
          onOpenTryOn();
        }}
        className={`flex flex-col items-center justify-center flex-1 py-1 relative ${
          activeTab === 'tryon' ? 'text-[#162456]' : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <div className="relative">
          <ScanEye className="w-5 h-5 text-purple-700" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
        </div>
        <span className="text-[10px] font-bold text-purple-900 mt-0.5">AR Try on</span>
        {activeTab === 'tryon' && (
          <span className="absolute bottom-0 w-8 h-0.5 bg-purple-700 rounded-full" />
        )}
      </button>

      {/* 4. Eye Test */}
      <button
        onClick={() => {
          onTabChange('eyetest');
          onBookAppointment();
        }}
        className={`flex flex-col items-center justify-center flex-1 py-1 relative ${
          activeTab === 'eyetest' ? 'text-[#162456]' : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <CalendarPlus className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-0.5">Eye Test</span>
        {activeTab === 'eyetest' && (
          <span className="absolute bottom-0 w-8 h-0.5 bg-[#162456] rounded-full" />
        )}
      </button>

      {/* 5. Orders (Tray) */}
      <button
        onClick={() => {
          onTabChange('orders');
          onOpenCart();
        }}
        className={`flex flex-col items-center justify-center flex-1 py-1 relative ${
          activeTab === 'orders' ? 'text-[#162456]' : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <div className="relative">
          <Receipt className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 px-1.5 py-0.5 rounded-full bg-purple-600 text-white text-[9px] font-mono font-bold leading-none">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-medium mt-0.5">Orders</span>
        {activeTab === 'orders' && (
          <span className="absolute bottom-0 w-8 h-0.5 bg-[#162456] rounded-full" />
        )}
      </button>

      {/* 6. Assistant / WhatsApp */}
      <a
        href="https://wa.me/919430800015?text=Hello%20Anand%20Optical,%20I%20am%20browsing%20your%20eyewear%20collection%20and%20need%20assistance."
        target="_blank"
        rel="noreferrer"
        className="flex flex-col items-center justify-center flex-1 py-1 text-emerald-600 hover:text-emerald-700"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-[10px] font-bold mt-0.5">WhatsApp</span>
      </a>
    </nav>
  );
};
