import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface Props {
  onReserveHustlr: () => void;
  onExploreFestive: () => void;
  onExploreTitanium: () => void;
}

export const LenskartHeroCarousel: React.FC<Props> = ({
  onReserveHustlr,
  onExploreFestive,
  onExploreTitanium,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Live countdown timer matching screenshot "02h : 02m : 40s"
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 2,
    seconds: 40,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 2, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const slides = [
    // Slide 1: Exact match to user's mobile screenshot (Model couple wearing Hustlr glasses)
    {
      id: 'hustlr-welcome-gift',
      tag: 'Reserve for just ₹99',
      heading: 'Your welcome gift?',
      title: 'A FREE pair of Hustlr',
      subtitle: 'Zero-power blue-cut computer eyewear or single-vision power lenses included.',
      ctaText: 'Reserve Now',
      action: onReserveHustlr,
      bgGradient: 'from-[#0A1226] via-[#101B3B] to-[#1C0E30]',
      badgeBg: 'bg-white/10 text-white border border-white/20',
      btnStyle: 'bg-white text-slate-900 hover:bg-slate-100',
      imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80',
    },
    // Slide 2: Exact match to screenshot Diwali/Festive 2X benefits banner
    {
      id: 'festive-2x-benefits',
      tag: 'Festive VIP Privileges',
      heading: 'DOUBLE THE BENEFITS',
      title: 'DIWALI 2X BENEFITS',
      subtitle: '2 Years 4 Years Now · Buy One Get One Free On Complete Spectacles.',
      ctaText: 'DOUBLE THE GOLD PERKS →',
      action: onExploreFestive,
      bgGradient: 'from-[#291705] via-[#45270A] to-[#1F1206]',
      badgeBg: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
      btnStyle: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:brightness-105',
      imageUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=80',
    },
    // Slide 3: From video "SHUNYA - Echoes of the Universe"
    {
      id: 'shunya-titanium',
      tag: 'Pure Japanese Beta-Titanium',
      heading: 'SHUNYA',
      title: 'Echoes of the Universe',
      subtitle: 'Featherlight 7.8g rimless architecture. Zero nose fatigue guaranteed.',
      ctaText: 'EXPLORE COLLECTION →',
      action: onExploreTitanium,
      bgGradient: 'from-[#050C1F] via-[#0E1A3D] to-[#251245]',
      badgeBg: 'bg-sky-500/20 text-sky-300 border border-sky-500/30',
      btnStyle: 'bg-purple-600 text-white hover:bg-purple-500',
      imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  // Auto-advance slides every 5.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className="w-full bg-[#FAF8FD]">
      
      {/* LIMITED MEMBERSHIPS LIVE COUNTDOWN TIMER (Exact match to user's mobile screenshot) */}
      <div className="max-w-7xl mx-auto px-4 pt-3 pb-2">
        <div className="flex items-center justify-center gap-3 text-slate-800">
          <div className="h-[1px] w-12 sm:w-24 bg-slate-300" />
          
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700">
              Limited Memberships
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-mono text-xs font-bold shadow-sm">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>

          <div className="h-[1px] w-12 sm:w-24 bg-slate-300" />
        </div>
      </div>

      {/* HERO SLIDER CAROUSEL (Mobile & Desktop Viewport) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2">
        <div className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-r ${slide.bgGradient} text-white shadow-xl min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] flex items-center transition-all duration-700`}>
          
          {/* Background Ambient Glows */}
          <div className="absolute inset-0 bg-radial from-purple-500/10 via-transparent to-black/60 pointer-events-none" />

          {/* Grid Layout: Content Left, Model Photography Right */}
          <div className="relative z-10 w-full h-full p-6 sm:p-10 lg:p-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Offer details & CTA */}
            <div className="md:col-span-7 space-y-4 sm:space-y-5">
              
              {/* Badge (e.g. "Reserve for just ₹99") */}
              <div className="inline-block">
                <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm ${slide.badgeBg}`}>
                  {slide.tag}
                </span>
              </div>

              {/* Headlines */}
              <div className="space-y-1 sm:space-y-2">
                <p className="text-sm sm:text-base font-medium text-purple-200 tracking-wide">
                  {slide.heading}
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  {slide.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed pt-1">
                  {slide.subtitle}
                </p>
              </div>

              {/* Action Button (Reserve Now / Explore) */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={slide.action}
                  className={`px-6 py-3 rounded-xl font-extrabold text-xs sm:text-sm shadow-xl transition-all duration-200 flex items-center gap-2 hover:scale-105 active:scale-95 ${slide.btnStyle}`}
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Senior Optician 24+ Yrs Clinic</span>
                </div>
              </div>

              {/* Quick Perks */}
              <div className="pt-2 flex items-center gap-4 text-[11px] text-slate-400 font-mono">
                <span>✓ 100% UV Protection</span>
                <span>✓ Free Computerized Test</span>
                <span>✓ Direct WhatsApp Help</span>
              </div>
            </div>

            {/* Right Column: Visual Model Artwork (Matching the couple in the screenshot) */}
            <div className="md:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 group">
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-mono font-bold text-amber-300">
                    Anand Optical Signature Look
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Carousel Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            aria-label="Next slide"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* SECOND PROMOTIONAL BANNER: DIWALI 2X BENEFITS (Exact match to user's screenshot banner) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2">
        <div
          onClick={onExploreFestive}
          className="cursor-pointer relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#201306] via-[#3B220B] to-[#1A0E04] text-white p-4 sm:p-6 shadow-md border border-amber-600/30 flex flex-col sm:flex-row items-center justify-between gap-4 hover:shadow-xl transition-all"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl text-amber-300 tracking-wide">
                DIWALI 2X BENEFITS
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase">
                VIP
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-100">
              <strong className="line-through text-amber-300/70 mr-1.5">2 Years</strong>
              <strong className="text-white text-base">4 Years Now</strong> · Limited time only.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1 group-hover:underline">
              <span>DOUBLE THE GOLD PERKS</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>

    </section>
  );
};
