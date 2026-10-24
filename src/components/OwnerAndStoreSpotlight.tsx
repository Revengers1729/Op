import React, { useState } from 'react';
import { Award, ShieldCheck, Microscope, Calendar, Phone, MapPin, ExternalLink, CheckCircle2, Navigation, Clock } from 'lucide-react';

interface Props {
  onBookAppointment: () => void;
}

export const OwnerAndStoreSpotlight: React.FC<Props> = ({ onBookAppointment }) => {
  // Candidate image paths in priority order (.jpeg, .jpg, .png, .webp)
  const OWNER_CANDIDATES = [
    '/images/owner.jpeg',
    '/images/owner.jpg',
    '/images/owner.png',
    '/images/owner.webp',
  ];

  const SHOP_CANDIDATES = [
    '/images/shop.jpeg',
    '/images/shop.jpg',
    '/images/shop.png',
    '/images/shop.webp',
  ];

  const [ownerIdx, setOwnerIdx] = useState<number>(0);
  const [ownerImgFailed, setOwnerImgFailed] = useState<boolean>(false);

  const [shopIdx, setShopIdx] = useState<number>(0);
  const [shopImgFailed, setShopImgFailed] = useState<boolean>(false);

  const handleOwnerError = () => {
    if (ownerIdx < OWNER_CANDIDATES.length - 1) {
      setOwnerIdx((prev) => prev + 1);
    } else {
      setOwnerImgFailed(true);
    }
  };

  const handleShopError = () => {
    if (shopIdx < SHOP_CANDIDATES.length - 1) {
      setShopIdx((prev) => prev + 1);
    } else {
      setShopImgFailed(true);
    }
  };

  const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/ANAND+OPTICAL/@25.6111055,85.0504545,2883m/data=!3m2!1e3!4b1!4m6!3m5!1s0x39ed573ff65f2281:0x3b9fccb74ec6bc4c!8m2!3d25.6111059!4d85.0607543!16s%2Fg%2F11y95by830";
  const MAP_EMBED_URL = "https://maps.google.com/maps?q=25.6111059,85.0607543&hl=en&z=16&output=embed";

  return (
    <section id="founder-clinic" className="py-20 bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2 tracking-wider">
              <span>FOUNDER HERITAGE & CLINICAL MASTERY</span>
              <span aria-hidden="true">·</span>
              <span>ANAND OPTICAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Crafted by 24+ Years of Clinical Optometry
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
              Eyewear is not merely an accessory—it is an ophthalmic medical device. At Anand Optical, every frame is dispensed with clinical accuracy born from decades of hospital and clinic leadership.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-sky-400 border border-slate-700 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Locate on Google Maps</span>
            </a>

            <a
              href="https://wa.me/919430800015?text=Hello%20Anand%20Optical,%20I%20would%20like%20to%20consult%20with%20the%20Senior%20Optician%20regarding%20my%20prescription."
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-md transition-colors flex items-center gap-1.5 shadow-lg shadow-emerald-950/50"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Direct WhatsApp Consult</span>
            </a>
          </div>
        </div>

        {/* 1. FOUNDER PROFILE CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16 bg-slate-900/60 border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl">
          {/* Left Column: Owner Photo with Dignified Framing */}
          <div className="lg:col-span-5 relative bg-gradient-to-br from-slate-900 via-slate-950 to-black min-h-[380px] lg:min-h-[460px] flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
            {!ownerImgFailed ? (
              <img
                src={OWNER_CANDIDATES[ownerIdx]}
                alt="Founder & Senior Master Optician - Anand Optical"
                onLoad={(e) => {
                  if (e.currentTarget.naturalWidth <= 1) {
                    handleOwnerError();
                  }
                }}
                onError={handleOwnerError}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              /* High-end Styled Portrait Container */
              <div className="w-full h-full p-8 flex flex-col justify-between relative bg-gradient-to-t from-slate-950 via-slate-900 to-slate-900/40">
                <div className="w-16 h-16 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                  <Award className="w-8 h-8" />
                </div>

                <div className="relative z-10">
                  <div className="inline-block px-2.5 py-1 text-[11px] font-mono font-semibold bg-amber-400 text-slate-950 rounded mb-2">
                    24+ YEARS CLINICAL EXPERT
                  </div>
                  <h3 className="text-2xl font-bold text-white">Founder & Chief Optician</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Ex-Optical Incharge (17 Yrs) · Drishtipunj Clinical Incharge (7 Yrs)
                  </p>
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                    Personalized dispensing of complex progressives, high astigmatism powers, and pediatric eyewear with certified accuracy.
                  </p>
                </div>

                <div className="absolute right-4 top-1/3 opacity-10 pointer-events-none">
                  <svg className="w-48 h-48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="6" cy="12" r="4" strokeWidth="1" />
                    <circle cx="18" cy="12" r="4" strokeWidth="1" />
                    <path d="M10 12h4" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            )}

            {/* Overlaid Badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-3 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-amber-400 block font-semibold">SENIOR OPTICIAN</span>
                <span className="text-xs font-bold text-white">Anand Optical Leadership</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-400 font-mono">24+ Yrs</span>
                <span className="text-[10px] text-slate-400 block">Precision Dispensing</span>
              </div>
            </div>
          </div>

          {/* Right Column: In-Depth Credentials & Authority */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                <span>AUTHORITY & CLINICAL TRACK RECORD</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Personalized Optical Fitting by an Industry Veteran
              </h3>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Milestone 1: 17 Yrs Optical Incharge */}
                <div className="p-4 bg-slate-950/80 rounded-lg border border-slate-800">
                  <div className="text-2xl font-bold text-amber-400 font-mono">17 Years</div>
                  <div className="text-xs font-semibold text-white mt-1">Ex-Optical Incharge</div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Supervised premier optical dispensing centers, overseeing lens manufacturing, computerized surfacing, and high-complexity spectacle adaptation.
                  </p>
                </div>

                {/* Milestone 2: 7 Yrs Drishtipunj */}
                <div className="p-4 bg-slate-950/80 rounded-lg border border-slate-800">
                  <div className="text-2xl font-bold text-sky-400 font-mono">7 Years</div>
                  <div className="text-xs font-semibold text-white mt-1">Drishtipunj Clinical Dispensing</div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Rigorous clinical experience at Drishtipunj, specializing in high-cylinder astigmatism, pediatric power fitting, and post-cataract progressive rehabilitation.
                  </p>
                </div>
              </div>

              {/* Core Commitments */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white">0.01mm Pupillary Distance (PD) Centration:</span>
                    <span className="text-xs text-slate-400 ml-1">
                      Misaligned optical centers cause hidden eye-strain and headaches. We measure your exact optical axis using digital callipers.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white">Guaranteed Progressive Adaptation:</span>
                    <span className="text-xs text-slate-400 ml-1">
                      Trained in freeform progressive lens design so you never feel dizziness or tunnel vision when transitioning to bifocals/progressives.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white">Lifetime Free Service:</span>
                    <span className="text-xs text-slate-400 ml-1">
                      Free ultrasonic sonic bath frame cleaning, nose pad replacement, and screw tightening whenever you visit Anand Optical.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                <span>Direct Personal Line: </span>
                <a href="tel:+919430800015" className="text-amber-400 font-mono font-bold hover:underline">
                  +91 94308 00015
                </a>
              </div>

              <button
                onClick={onBookAppointment}
                className="px-5 py-2.5 text-xs font-semibold bg-white text-slate-950 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-2 shadow-md"
              >
                <Calendar className="w-4 h-4 text-slate-900" />
                <span>Book Free Eye Testing</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. SHOWROOM & CLINIC CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16 bg-slate-900/60 border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl">
          {/* Left Column: Clinic Highlights & Tech */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between order-2 lg:order-1">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
                <span>DIAGNOSTIC FACILITIES</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Modern Optical Boutique & Computerized Clinic
              </h3>
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                Step inside Anand Optical for an immersive eyewear discovery experience. Our clinic houses the latest ophthalmic diagnostic machinery for instantaneous, painless refraction checks.
              </p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
                  <Microscope className="w-5 h-5 text-sky-400 mx-auto mb-1.5" />
                  <span className="text-xs font-bold text-white block">Auto-Refractometer</span>
                  <span className="text-[10px] text-slate-400">3-sec Computerized Scan</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-1.5" />
                  <span className="text-xs font-bold text-white block">Digital Lensometer</span>
                  <span className="text-[10px] text-slate-400">UV & Power Verification</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
                  <Award className="w-5 h-5 text-amber-400 mx-auto mb-1.5" />
                  <span className="text-xs font-bold text-white block">1,200+ Frames</span>
                  <span className="text-[10px] text-slate-400">Budget to Pure Titanium</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-950/60 rounded-lg border border-slate-800 text-xs text-slate-400 leading-relaxed">
                <strong className="text-white block mb-1">Showroom & Doorstep Delivery:</strong>
                Visit our physical store to try hundreds of designer frames, or message us on WhatsApp with your prescription slip for express doorstep delivery across Patna and Bihar!
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Open All 7 Days: <strong className="text-white">9:30 AM – 9:00 PM</strong></span>
              </span>

              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 underline"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Shop Photo */}
          <div className="lg:col-span-5 relative bg-gradient-to-br from-slate-900 via-slate-950 to-black min-h-[300px] lg:min-h-[400px] flex items-center justify-center overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-800 order-1 lg:order-2">
            {!shopImgFailed ? (
              <img
                src={SHOP_CANDIDATES[shopIdx]}
                alt="Anand Optical Modern Showroom and Clinic"
                onLoad={(e) => {
                  if (e.currentTarget.naturalWidth <= 1) {
                    handleShopError();
                  }
                }}
                onError={handleShopError}
                className="w-full h-full object-cover"
              />
            ) : (
              /* High-end Styled Showroom Container */
              <div className="w-full h-full p-8 flex flex-col justify-between relative bg-gradient-to-t from-slate-950 via-slate-900 to-slate-900/40">
                <div className="w-16 h-16 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-inner">
                  <Microscope className="w-8 h-8" />
                </div>

                <div className="relative z-10">
                  <div className="inline-block px-2.5 py-1 text-[11px] font-mono font-semibold bg-sky-500 text-slate-950 rounded mb-2">
                    ANAND OPTICAL SHOWROOM
                  </div>
                  <h3 className="text-2xl font-bold text-white">Precision Optical Boutique</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Computerized Refraction Clinic & Curated Luxury Frames Display
                  </p>
                </div>
              </div>
            )}

            <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-800 text-[11px] font-mono text-slate-300">
              SHOWROOM & LAB
            </div>
          </div>
        </div>

        {/* 3. INTERACTIVE GOOGLE MAPS STORE LOCATION SECTION */}
        <div id="store-location" className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>OFFICIAL VERIFIED LOCATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Visit Anand Optical in Person
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Coordinates: 25.6111059° N, 85.0607543° E · Serving Patna, Danapur, Khagaul, Bailey Road & Bihar
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors flex items-center gap-2 shadow-md"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Driving Directions</span>
              </a>

              <a
                href="https://wa.me/919430800015?text=Hello%20Anand%20Optical,%20please%20share%20your%20exact%20shop%20address%20and%20nearby%20landmark."
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-slate-800 relative shadow-inner">
            <iframe
              title="Anand Optical Google Maps Location"
              src={MAP_EMBED_URL}
              className="w-full h-full border-0 grayscale-[20%] contrast-[105%]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Overlaid Floating Location Card */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm bg-slate-950/95 backdrop-blur-md p-4 rounded-xl border border-slate-800 shadow-2xl">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    ANAND OPTICAL
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Premier Eyewear & Computerized Testing Showroom
                  </p>
                  <p className="text-[11px] text-amber-300 font-mono mt-1">
                    Helpline: +91 94308 00015
                  </p>
                </div>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-lg shrink-0 transition-colors"
                  title="Open in Google Maps App"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Landmark Highlights */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-slate-400 pt-4 border-t border-slate-800">
            <div>
              <span className="text-slate-500 block text-[10px]">REGION:</span>
              <span className="text-slate-200">Patna / Danapur / Bihar</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">TIMING:</span>
              <span className="text-slate-200">Mon - Sun (9:30 AM - 9 PM)</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">CLINIC:</span>
              <span className="text-slate-200">Free Computerized Testing</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">WHATSAPP:</span>
              <span className="text-emerald-400 font-bold">9430800015</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
