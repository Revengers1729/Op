import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, ShieldCheck, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types/optical';
import { EyewearGraphic } from './EyewearGraphic';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const OrderTrayDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (acc, curr) => acc + (curr.item.price + curr.selectedLens.priceAddon) * curr.quantity,
    0
  );

  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (items.length === 0) {
      setErrorMessage('Your eyewear tray is empty. Add a frame first!');
      return;
    }

    if (!consentAccepted) {
      setErrorMessage('Please accept the consent terms to proceed with the order inquiry.');
      return;
    }

    // Trigger confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#7c3aed', '#6366f1', '#10b981', '#f59e0b'],
      });
    } catch (err) {}

    // Build structured WhatsApp message
    let msg = `*NEW SPECTACLES ORDER - ANAND OPTICAL*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `👤 *Customer Name:* ${customerName || 'Customer'}\n`;
    if (customerPhone) msg += `📞 *Phone:* ${customerPhone}\n`;
    msg += `🚚 *Fulfillment:* ${deliveryType === 'delivery' ? 'Home Delivery' : 'In-Store Pickup (Danapur Showroom)'}\n`;
    if (deliveryType === 'delivery' && address) msg += `📍 *Delivery Address:* ${address}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `👓 *ORDERED EYEWEAR (${items.length} items):*\n\n`;

    items.forEach((ci, idx) => {
      const itemTotal = (ci.item.price + ci.selectedLens.priceAddon) * ci.quantity;
      msg += `${idx + 1}. *${ci.item.name}* (${ci.item.code})\n`;
      msg += `   • Color: ${ci.selectedColor.name}\n`;
      msg += `   • Lens Type: ${ci.selectedLens.name}\n`;
      msg += `   • Qty: ${ci.quantity} × ₹${ci.item.price + ci.selectedLens.priceAddon} = ₹${itemTotal}\n`;
      
      if (ci.powerOption === 'custom' && ci.prescriptionDetails) {
        msg += `   • Prescription (OD/OS): ${ci.prescriptionDetails.rightEye || 'OD'} / ${ci.prescriptionDetails.leftEye || 'OS'}\n`;
      } else if (ci.powerOption === 'upload_wa') {
        msg += `   • Prescription: *[Attaching Doctor Prescription slip photo in chat]*\n`;
      } else {
        msg += `   • Prescription: Zero Power / Consultation requested\n`;
      }
      msg += `\n`;
    });

    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💰 *TOTAL ESTIMATE:* ₹${subtotal.toLocaleString('en-IN')}\n`;
    msg += `✓ *24+ Yrs Optical Incharge Fitting Guarantee*\n\n`;
    msg += `Please confirm my order and share payment instructions (UPI / Cash / Card). Thank you!`;

    const encoded = encodeURI(msg);
    window.open(`https://wa.me/919430800015?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white border-l border-purple-200 h-full flex flex-col justify-between shadow-2xl">
        
        {/* Drawer Header with Royal Purple Gradient */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#0A1938] via-[#162456] to-[#2E1065] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold uppercase tracking-wider">
              Eyewear Order Tray
            </span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-white text-purple-900 rounded-full shadow-xs">
              {items.length} {items.length === 1 ? 'Frame' : 'Frames'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-purple-200 hover:text-white transition-colors"
                title="Clear all"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-purple-200 hover:text-white rounded-md hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Items List Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FAF8FD]">
          {items.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center mx-auto mb-4 text-purple-600">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Your tray is empty</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                Browse our collection and click the <span className="text-purple-700 font-bold">+</span> button on any spectacles to add and configure lenses.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-4 py-2 text-xs font-bold bg-purple-700 text-white hover:bg-purple-800 rounded-md transition-colors shadow-sm"
              >
                Browse Eyewear Collection
              </button>
            </div>
          ) : (
            items.map((ci) => {
              const itemTotal = (ci.item.price + ci.selectedLens.priceAddon) * ci.quantity;

              return (
                <div
                  key={ci.cartId}
                  className="p-4 bg-white rounded-xl border border-purple-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-14 bg-[#FAF8FD] rounded-lg border border-purple-100 flex items-center justify-center shrink-0">
                      <EyewearGraphic
                        shape={ci.item.shape}
                        color={ci.selectedColor}
                        className="w-full h-full"
                      />
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        {ci.item.name}
                      </h4>
                      <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                        <span>Color: {ci.selectedColor.name}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{ci.item.code}</span>
                      </div>
                      <div className="text-[11px] text-purple-700 font-bold mt-0.5">
                        Lens: {ci.selectedLens.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                    <div className="text-sm font-mono font-bold text-slate-900">
                      ₹{itemTotal.toLocaleString('en-IN')}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-purple-200 rounded-md bg-white">
                        <button
                          onClick={() => onUpdateQty(ci.cartId, -1)}
                          className="p-1 text-slate-600 hover:text-purple-700 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-slate-900">
                          {ci.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(ci.cartId, 1)}
                          className="p-1 text-slate-600 hover:text-purple-700 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(ci.cartId)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer & WhatsApp Checkout Form */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-purple-100 space-y-4">
            {/* Quick Customer Info Form */}
            <form onSubmit={handleSendWhatsAppOrder} className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[11px] text-slate-600 font-medium block mb-1">Your Full Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#FAF8FD] border border-slate-300 rounded-md px-3 py-1.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-600 font-medium block mb-1">Mobile (WhatsApp):</label>
                  <input
                    type="tel"
                    placeholder="e.g. 98XXXXXXXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#FAF8FD] border border-slate-300 rounded-md px-3 py-1.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 text-xs"
                  />
                </div>
              </div>

              {/* Delivery vs In-Store Pickup */}
              <div className="flex items-center gap-4 text-xs pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryType === 'delivery'}
                    onChange={() => setDeliveryType('delivery')}
                    className="accent-purple-700"
                  />
                  <span>Free Doorstep Delivery</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryType === 'pickup'}
                    onChange={() => setDeliveryType('pickup')}
                    className="accent-purple-700"
                  />
                  <span>Showroom Pickup</span>
                </label>
              </div>

              {deliveryType === 'delivery' && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter city / delivery address in Bihar or Patna..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#FAF8FD] border border-slate-300 rounded-md px-3 py-1.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 text-xs"
                  />
                </div>
              )}

              {/* Form Consent Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="orderConsent"
                  checked={consentAccepted}
                  onChange={(e) => setConsentAccepted(e.target.checked)}
                  className="mt-0.5 accent-purple-700 cursor-pointer"
                />
                <label htmlFor="orderConsent" className="text-[11px] text-slate-500 leading-tight cursor-pointer">
                  I agree to send this eyewear order inquiry to Anand Optical (+91 9430800015) via WhatsApp and agree to the Privacy Policy & 7-Day Adaptation terms.
                </label>
              </div>

              {errorMessage && (
                <div className="p-2 bg-rose-50 border border-rose-200 text-rose-700 rounded-md text-xs flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Price Calculation & Action */}
              <div className="pt-2 border-t border-purple-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Total Tray Amount:</span>
                  <span className="text-2xl font-bold font-mono text-purple-900">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors flex items-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Order via WhatsApp</span>
                </button>
              </div>
            </form>

            <div className="text-center text-[10px] text-slate-400">
              Direct connection to Anand Optical WhatsApp: <span className="font-mono text-slate-600 font-bold">9430800015</span>. No middleman markup.
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
