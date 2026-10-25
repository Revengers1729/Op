import React, { useState } from 'react';
import { X, Check, Shield, Eye, Send, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { EyewearItem, EyewearColor, LensOption } from '../types/optical';
import { LENS_OPTIONS } from '../data/catalog';
import { EyewearGraphic } from './EyewearGraphic';

interface Props {
  item: EyewearItem;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    item: EyewearItem,
    color: EyewearColor,
    lens: LensOption,
    powerMode: 'later' | 'custom' | 'upload_wa',
    prescription?: { rightEye?: string; leftEye?: string; notes?: string }
  ) => void;
}

export const ProductCustomizerModal: React.FC<Props> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedColor, setSelectedColor] = useState<EyewearColor>(item.colors[0]);
  const [selectedLens, setSelectedLens] = useState<LensOption>(LENS_OPTIONS[1]); // Default to Single Vision AR or Blue Cut
  const [powerMode, setPowerMode] = useState<'later' | 'custom' | 'upload_wa'>('upload_wa');
  const [rightEye, setRightEye] = useState('');
  const [leftEye, setLeftEye] = useState('');
  const [prescriptionNotes, setPrescriptionNotes] = useState('');

  if (!isOpen) return null;

  const totalPrice = item.price + selectedLens.priceAddon;

  const handleInstantWhatsApp = () => {
    let text = `*NEW ORDER INQUIRY - ANAND OPTICAL*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `👓 *Frame:* ${item.name} (${item.code})\n`;
    text += `🎨 *Color:* ${selectedColor.name}\n`;
    text += `🔬 *Selected Lens:* ${selectedLens.name} (+₹${selectedLens.priceAddon})\n`;
    text += `💰 *Total Estimated Price:* ₹${totalPrice}\n`;
    text += `📐 *Dimensions:* ${item.dimensions.lensWidth}-${item.dimensions.bridge}-${item.dimensions.temple}mm\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    
    if (powerMode === 'custom') {
      text += `📋 *Prescription Power:* \n`;
      text += `  • Right Eye (OD): ${rightEye || 'Not specified'}\n`;
      text += `  • Left Eye (OS): ${leftEye || 'Not specified'}\n`;
      if (prescriptionNotes) text += `  • Note: ${prescriptionNotes}\n`;
    } else if (powerMode === 'upload_wa') {
      text += `📋 *Prescription:* I will attach my Doctor Prescription slip photo here in this chat.\n`;
    } else {
      text += `📋 *Prescription:* Zero Power / Need consultation on call.\n`;
    }

    text += `\nPlease confirm availability and payment/delivery options!`;
    const encoded = encodeURI(text);
    window.open(`https://wa.me/919430800015?text=${encoded}`, '_blank');
    onClose();
  };

  const handleAddAndClose = () => {
    onAddToCart(
      item,
      selectedColor,
      selectedLens,
      powerMode,
      powerMode === 'custom'
        ? { rightEye, leftEye, notes: prescriptionNotes }
        : undefined
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-purple-200 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100 bg-gradient-to-r from-[#0A1938] via-[#162456] to-[#2E1065] text-white">
          <div>
            <span className="text-[11px] font-mono text-purple-200 font-semibold uppercase tracking-wider">
              OPTICAL CONFIGURATOR · {item.tier}
            </span>
            <h3 className="text-xl font-bold text-white">{item.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-purple-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[75vh] overflow-y-auto">
          {/* Left Preview Column */}
          <div className="md:col-span-5 p-6 bg-[#FAF8FD] flex flex-col justify-between border-b md:border-b-0 md:border-r border-purple-100">
            <div>
              <div className="h-48 sm:h-56 bg-white rounded-xl border border-purple-100 p-4 flex items-center justify-center shadow-xs">
                <EyewearGraphic
                  shape={item.shape}
                  color={selectedColor}
                  className="w-full h-full"
                  lensTint={
                    selectedLens.id === 'polarized_sun'
                      ? 'rgba(15, 23, 42, 0.75)'
                      : selectedLens.id === 'blue_cut_shield'
                      ? 'rgba(124, 58, 237, 0.15)'
                      : 'rgba(255, 255, 255, 0.08)'
                  }
                />
              </div>

              {/* Color Swatches */}
              <div className="mt-5">
                <label className="text-xs font-semibold text-slate-800 block mb-2">
                  Select Frame Color: <span className="text-purple-700 font-bold">{selectedColor.name}</span>
                </label>
                <div className="flex items-center gap-2">
                  {item.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-transform ${
                        selectedColor.name === c.name
                          ? 'border-purple-600 scale-110 shadow-md'
                          : 'border-slate-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor.name === c.name && (
                        <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto drop-shadow-md" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions */}
              <div className="mt-6 p-3 bg-white rounded-lg border border-purple-100 text-xs text-slate-600 space-y-1 font-mono shadow-xs">
                <div className="flex justify-between">
                  <span>Lens Width:</span>
                  <span className="text-slate-900 font-bold">{item.dimensions.lensWidth} mm</span>
                </div>
                <div className="flex justify-between">
                  <span>Nose Bridge:</span>
                  <span className="text-slate-900 font-bold">{item.dimensions.bridge} mm</span>
                </div>
                <div className="flex justify-between">
                  <span>Temple Length:</span>
                  <span className="text-slate-900 font-bold">{item.dimensions.temple} mm</span>
                </div>
                <div className="flex justify-between">
                  <span>Weight:</span>
                  <span className="text-purple-700 font-bold">{item.weightGrams} grams</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-[11px] text-slate-500">
              <span className="text-emerald-700 font-bold">✓ Anand Quality Guarantee:</span> All frames undergo ultrasonic sonic balance alignment prior to dispatch.
            </div>
          </div>

          {/* Right Configuration Column */}
          <div className="md:col-span-7 p-6 space-y-6 bg-white">
            {/* Step 1: Lens Option */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  1. Choose Your Lens Technology:
                </label>
                <span className="text-[11px] font-mono text-purple-700 font-medium">Precision Surfaced</span>
              </div>

              <div className="space-y-2">
                {LENS_OPTIONS.map((lens) => (
                  <button
                    key={lens.id}
                    onClick={() => setSelectedLens(lens)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                      selectedLens.id === lens.id
                        ? 'bg-purple-50/80 border-purple-600 text-slate-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-purple-200'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span>{lens.name}</span>
                        {lens.id === 'blue_cut_shield' && (
                          <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-semibold">
                            Bestseller
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{lens.description}</div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono font-bold text-purple-700">
                        {lens.priceAddon === 0 ? 'Included' : `+₹${lens.priceAddon}`}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Prescription Power Mode */}
            <div>
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                2. Prescription Specification:
              </label>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPowerMode('upload_wa')}
                  className={`p-2.5 rounded-xl border text-center transition-colors ${
                    powerMode === 'upload_wa'
                      ? 'bg-purple-100 border-purple-600 text-purple-900 font-semibold'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-purple-200'
                  }`}
                >
                  <Send className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                  <span className="text-[11px] block">Send Rx on WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPowerMode('custom')}
                  className={`p-2.5 rounded-xl border text-center transition-colors ${
                    powerMode === 'custom'
                      ? 'bg-purple-100 border-purple-600 text-purple-900 font-semibold'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-purple-200'
                  }`}
                >
                  <Eye className="w-4 h-4 mx-auto mb-1 text-purple-700" />
                  <span className="text-[11px] block">Type Power Now</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPowerMode('later')}
                  className={`p-2.5 rounded-xl border text-center transition-colors ${
                    powerMode === 'later'
                      ? 'bg-purple-100 border-purple-600 text-purple-900 font-semibold'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-purple-200'
                  }`}
                >
                  <Sparkles className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                  <span className="text-[11px] block">Zero Power / Call Me</span>
                </button>
              </div>

              {/* If user selected Type Power Now */}
              {powerMode === 'custom' && (
                <div className="mt-3 p-3 bg-purple-50/50 rounded-xl border border-purple-100 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-600 block mb-1">Right Eye (OD):</label>
                    <input
                      type="text"
                      placeholder="e.g. -1.50 / -0.50 Cyl"
                      value={rightEye}
                      onChange={(e) => setRightEye(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 font-mono placeholder:text-slate-400 focus:outline-none focus:border-purple-600"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block mb-1">Left Eye (OS):</label>
                    <input
                      type="text"
                      placeholder="e.g. -2.00 / -0.25 Cyl"
                      value={leftEye}
                      onChange={(e) => setLeftEye(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 font-mono placeholder:text-slate-400 focus:outline-none focus:border-purple-600"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Price Breakdown & CTAs */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-500">Total Complete Eyewear:</div>
                <div className="text-2xl font-bold text-slate-900 font-mono flex items-baseline gap-2">
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-slate-400 line-through">
                    ₹{(item.originalPrice + selectedLens.priceAddon).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleAddAndClose}
                  className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-bold bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-md transition-colors"
                >
                  + Add to Tray
                </button>

                <button
                  type="button"
                  onClick={handleInstantWhatsApp}
                  className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-md transition-colors flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
