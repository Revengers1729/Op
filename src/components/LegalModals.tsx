import React from 'react';
import { X, Shield, FileText, RefreshCw, Cookie } from 'lucide-react';

export type PolicyType = 'privacy' | 'terms' | 'refund' | 'cookies' | null;

interface Props {
  activePolicy: PolicyType;
  onClose: () => void;
}

export const LegalModals: React.FC<Props> = ({ activePolicy, onClose }) => {
  if (!activePolicy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2.5">
            {activePolicy === 'privacy' && <Shield className="w-5 h-5 text-sky-400" />}
            {activePolicy === 'terms' && <FileText className="w-5 h-5 text-amber-400" />}
            {activePolicy === 'refund' && <RefreshCw className="w-5 h-5 text-emerald-400" />}
            {activePolicy === 'cookies' && <Cookie className="w-5 h-5 text-indigo-400" />}

            <h3 className="text-lg font-bold text-white capitalize">
              {activePolicy === 'privacy' && 'Privacy Policy'}
              {activePolicy === 'terms' && 'Terms of Service & Clinical Dispensing'}
              {activePolicy === 'refund' && '7-Day Adaptation & Refund Policy'}
              {activePolicy === 'cookies' && 'Cookie Policy & Data Transparency'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto text-xs text-slate-300 leading-relaxed space-y-4">
          {/* ================= PRIVACY POLICY ================= */}
          {activePolicy === 'privacy' && (
            <>
              <p className="text-slate-400">
                <strong>Effective Date:</strong> October 2026 | <strong>Entity:</strong> Anand Optical (+91 94308 00015)
              </p>

              <h4 className="text-sm font-bold text-white mt-4">1. Information We Collect</h4>
              <p>
                Anand Optical collects customer information strictly necessary for optical dispensing, lens surfacing, and delivery. This includes your name, phone number, delivery address, and ophthalmic prescription parameters (Sphere, Cylinder, Axis, Pupillary Distance, and doctor prescription slips).
              </p>

              <h4 className="text-sm font-bold text-white mt-4">2. Client-Side Virtual Mirror & Camera Processing</h4>
              <p>
                When you activate our Virtual Mirror Try-On, all video frames are processed entirely client-side inside your web browser using HTML5 Canvas. We do NOT record, stream, or store any facial video or biometric geometry on external servers.
              </p>

              <h4 className="text-sm font-bold text-white mt-4">3. WhatsApp Order Communication</h4>
              <p>
                Orders initiated via our order tray generate pre-filled text directed to Anand Optical's certified WhatsApp helpline (+91 94308 00015). Communications over WhatsApp are protected by end-to-end encryption under Meta’s privacy policies.
              </p>

              <h4 className="text-sm font-bold text-white mt-4">4. Third-Party Sharing</h4>
              <p>
                We never sell, rent, or trade your prescription or personal records. Data is solely utilized by our master optician and authorized courier partners for order fulfilment.
              </p>
            </>
          )}

          {/* ================= TERMS OF SERVICE ================= */}
          {activePolicy === 'terms' && (
            <>
              <p className="text-slate-400">
                <strong>Last Updated:</strong> October 2026 | <strong>Jurisdiction:</strong> Anand Optical
              </p>

              <h4 className="text-sm font-bold text-white mt-4">1. Scope of Dispensing Services</h4>
              <p>
                Anand Optical provides prescription spectacles, zero-power blue-cut protective eyewear, sunglasses, and computerized refraction testing overseen by our Senior Master Optician (24+ years clinical experience, Ex-Optical Incharge 17 yrs, Drishtipunj 7 yrs).
              </p>

              <h4 className="text-sm font-bold text-white mt-4">2. Prescription Verification & Accuracy</h4>
              <p>
                Customized ophthalmic lenses are fabricated according to the exact prescription measurements provided by you or derived during our clinical computerized refraction. Customers are advised to ensure prescriptions are less than 12 months old.
              </p>

              <h4 className="text-sm font-bold text-white mt-4">3. Lifetime In-Store Maintenance</h4>
              <p>
                All frames purchased from Anand Optical qualify for complimentary lifetime frame realignment, nose pad replacement, screw tightening, and ultrasonic sonic-bath cleaning at our physical showroom.
              </p>

              <h4 className="text-sm font-bold text-white mt-4">4. Pricing & WhatsApp Confirmation</h4>
              <p>
                All prices displayed on this platform are listed in Indian Rupees (INR). Final orders are confirmed via WhatsApp with payment flexibility through UPI (PhonePe, GPay, Paytm), Bank Transfer, or Cash on Delivery (COD) as mutually agreed.
              </p>
            </>
          )}

          {/* ================= REFUND & ADAPTATION POLICY ================= */}
          {activePolicy === 'refund' && (
            <>
              <p className="text-slate-400">
                <strong>Clinical Guarantee:</strong> Anand Optical 7-Day Adaptation & Exchange Policy
              </p>

              <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-lg text-emerald-300">
                <strong>Our Clinical Promise:</strong> Because our optical incharge has over 24 years of experience, we stand behind the optical comfort of every pair of glasses we dispense.
              </div>

              <h4 className="text-sm font-bold text-white mt-4">1. 7-Day Optical Adaptation Guarantee</h4>
              <p>
                Transitioning to new progressive multifocals or high-cylinder lenses sometimes requires 3 to 7 days for retinal neurological adaptation. If you experience persistent eye strain or discomfort within 7 days of delivery, our Senior Optician will re-evaluate your axis and pupillary distance and re-surface your lenses free of charge.
              </p>

              <h4 className="text-sm font-bold text-white mt-4">2. Frame Manufacturing Warranty</h4>
              <p>
                All frames are covered under a 6-month warranty against manufacturing defects, weld joint failure, or ionic coating peeling under normal usage conditions.
              </p>

              <h4 className="text-sm font-bold text-white mt-4">3. Returns & Exchange Process</h4>
              <p>
                To request an exchange or adjustment, simply message us on WhatsApp (+91 94308 00015) with your order details. We provide hassle-free pickup or in-store replacement.
              </p>
            </>
          )}

          {/* ================= COOKIE POLICY ================= */}
          {activePolicy === 'cookies' && (
            <>
              <p className="text-slate-400">
                <strong>Cookie & Local Storage Policy</strong>
              </p>

              <h4 className="text-sm font-bold text-white mt-4">1. What We Store</h4>
              <p>
                We use strictly essential local storage to remember your active eyewear tray items, selected frame finishes, and your cookie consent preference.
              </p>

              <h4 className="text-sm font-bold text-white mt-4">2. Zero Invasive Trackers</h4>
              <p>
                We do NOT deploy invasive third-party ad pixels or sell your browsing history. You may clear your browser cookies or reset your preferences at any time.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            For questions, call our direct line: <strong className="text-slate-300">+91 94308 00015</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-md transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
