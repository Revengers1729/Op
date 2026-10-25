import React, { useState, useEffect } from 'react';
import { Cookie, Check, X, Shield } from 'lucide-react';
import { PolicyType } from './LegalModals';

interface Props {
  onOpenPolicy: (type: PolicyType) => void;
}

export const CookieBanner: React.FC<Props> = ({ onOpenPolicy }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('ao_cookie_consent');
    if (!consent) {
      // Delay slightly for polite entry
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('ao_cookie_consent', JSON.stringify({ essential: true, analytics: true }));
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('ao_cookie_consent', JSON.stringify({ essential: true, analytics: false }));
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    localStorage.setItem('ao_cookie_consent', JSON.stringify({ essential: true, analytics: analyticsAllowed }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-40 max-w-lg bg-[#0B1538]/95 border border-purple-500/40 rounded-xl p-5 shadow-2xl shadow-purple-950/40 backdrop-blur-md animate-fade-in text-purple-100">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 shrink-0">
          <Cookie className="w-5 h-5" />
        </div>

        <div className="flex-1">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Cookie & Privacy Preferences
          </h4>
          <p className="text-xs text-purple-200/80 mt-1 leading-relaxed">
            We use essential cookies to maintain your eyewear order tray and remembered frame settings. No invasive tracking is performed. Read our{' '}
            <button
              onClick={() => onOpenPolicy('cookies')}
              className="text-purple-300 hover:underline font-medium"
            >
              Cookie Policy
            </button>{' '}
            &{' '}
            <button
              onClick={() => onOpenPolicy('privacy')}
              className="text-purple-300 hover:underline font-medium"
            >
              Privacy Policy
            </button>.
          </p>

          {showCustomize && (
            <div className="mt-3 p-3 bg-[#060D26] rounded-lg border border-purple-500/30 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Strictly Essential Cookies</span>
                  <span className="text-[10px] text-purple-300/70">Order tray, lens options, security tokens</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold">Always Active</span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-purple-900/50">
                <div>
                  <span className="font-bold text-white block">Functional Diagnostics</span>
                  <span className="text-[10px] text-purple-300/70">Anonymous 3D canvas frame render performance</span>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsAllowed}
                  onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                  className="accent-purple-500 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Action buttons (No pill shape per design guidelines) */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {!showCustomize ? (
              <>
                <button
                  onClick={handleAcceptAll}
                  className="px-3.5 py-1.5 text-xs font-semibold bg-purple-600 text-white hover:bg-purple-500 rounded-md transition-colors shadow-sm"
                >
                  Accept All
                </button>
                <button
                  onClick={handleEssentialOnly}
                  className="px-3.5 py-1.5 text-xs font-semibold bg-[#162456] hover:bg-[#1E306E] text-purple-200 border border-purple-400/30 rounded-md transition-colors"
                >
                  Essential Only
                </button>
                <button
                  onClick={() => setShowCustomize(true)}
                  className="px-3.5 py-1.5 text-xs font-medium text-purple-300 hover:text-white transition-colors"
                >
                  Customize
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSaveCustom}
                  className="px-4 py-1.5 text-xs font-semibold bg-purple-600 text-white hover:bg-purple-500 rounded-md transition-colors"
                >
                  Save Choices
                </button>
                <button
                  onClick={() => setShowCustomize(false)}
                  className="px-3 py-1.5 text-xs font-medium text-purple-300 hover:text-white transition-colors"
                >
                  Back
                </button>
              </>
            )}
          </div>
        </div>

        <button
          onClick={handleEssentialOnly}
          className="text-purple-300/60 hover:text-white p-1 rounded"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
