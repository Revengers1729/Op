import React, { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Maximize2,
  X,
} from 'lucide-react';
import { HeroBanner, DEFAULT_HERO_BANNERS } from '../services/storageService';

interface Props {
  banners?: HeroBanner[];
  onReserveHustlr: () => void;
  onExploreFestive: () => void;
  onExploreTitanium: () => void;
  onBookAppointment?: () => void;
}

export const LenskartHeroCarousel: React.FC<Props> = ({
  banners,
  onReserveHustlr,
  onExploreFestive,
  onExploreTitanium,
  onBookAppointment,
}) => {
  const activeSlides = React.useMemo(() => {
    const source = banners && banners.length > 0 ? banners : DEFAULT_HERO_BANNERS;
    const filtered = source.filter((b) => b.isActive);
    return filtered.length > 0 ? filtered : DEFAULT_HERO_BANNERS;
  }, [banners]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [zoomedBanner, setZoomedBanner] = useState<HeroBanner | null>(null);

  // Keep slide index within bounds when admin deletes/hides slides
  useEffect(() => {
    if (currentSlide >= activeSlides.length) {
      setCurrentSlide(0);
    }
  }, [activeSlides.length, currentSlide]);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  }, [activeSlides.length]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  }, [activeSlides.length]);

  // Auto-advance every 4.5s unless hovered or zoomed
  useEffect(() => {
    if (isHoverPaused || zoomedBanner || activeSlides.length <= 1) return;
    const timer = setInterval(handleNext, 4500);
    return () => clearInterval(timer);
  }, [isHoverPaused, zoomedBanner, activeSlides.length, handleNext]);

  const slide = activeSlides[currentSlide] || activeSlides[0];

  const handleBannerAction = (ctaLink?: string) => {
    const link = (ctaLink || '#catalog').trim();
    if (link === 'reserve_hustlr') {
      onReserveHustlr();
      return;
    }
    if (link === 'explore_titanium') {
      onExploreTitanium();
      return;
    }
    if (link === '#eyetest') {
      if (onBookAppointment) {
        onBookAppointment();
      } else {
        document.getElementById('store-location')?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    if (link === 'whatsapp') {
      const msg = encodeURIComponent(
        `Hello Anand Optical, I saw "${slide.title || 'Essilor Lens Collection'}" on your website and would like pricing and consultation details.`
      );
      window.open(`https://wa.me/919430800015?text=${msg}`, '_blank');
      return;
    }
    if (link.startsWith('#')) {
      const targetId = link.slice(1);
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    if (link.startsWith('http://') || link.startsWith('https://')) {
      window.open(link, '_blank', 'noopener,noreferrer');
      return;
    }
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="w-full" aria-label="Anand Optical Featured Hero Banner Slider">
      {/* FULL-WIDTH EDGE-TO-EDGE TOP HERO SLIDER (Directly under Header) */}
      <div
        className="relative w-full h-[330px] sm:h-[420px] md:h-[470px] lg:h-[520px] overflow-hidden bg-[#040915] text-white select-none group"
        onMouseEnter={() => setIsHoverPaused(true)}
        onMouseLeave={() => setIsHoverPaused(false)}
      >
        {/* Slides Stack with Smooth Crossfade */}
        {activeSlides.map((item, idx) => {
          const isCurrent = idx === currentSlide;
          const isWideChart = item.layout === 'fullbleed';

          return (
            <div
              key={item.id}
              aria-hidden={!isCurrent}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isCurrent ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Layer 1: Full-Bleed Edge-to-Edge Atmospheric Background */}
              <img
                src={item.imageUrl}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center scale-105 blur-md opacity-35"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallbackApplied) {
                    target.dataset.fallbackApplied = '1';
                    target.src =
                      'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1400&q=80';
                  }
                }}
              />

              {/* Layer 2: Crisp Foreground Visual Seamlessly Blended on Right / Full Canvas */}
              {isWideChart ? (
                <div className="absolute inset-0 flex items-center justify-end md:pr-12">
                  <img
                    src={item.imageUrl}
                    alt={item.title || 'Anand Optical Featured Banner'}
                    referrerPolicy="no-referrer"
                    className="w-full md:w-[68%] h-full object-contain object-right opacity-95 transition-transform duration-700 [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.65)_14%,black_28%,black_100%)]"
                  />
                </div>
              ) : (
                <div className="absolute inset-y-0 right-0 w-full md:w-[62%] lg:w-[58%] h-full flex items-center justify-end overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title || 'Anand Optical Featured Banner'}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center md:object-contain md:object-right transition-transform duration-700 [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.75)_18%,black_34%,black_96%,transparent_100%)]"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.fallbackApplied) {
                        target.dataset.fallbackApplied = '1';
                        target.src =
                          'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1400&q=80';
                      }
                    }}
                  />
                </div>
              )}

              {/* Layer 3: Deep Cinematic Left-to-Right Dark Scrim (Matches Kajal Opticals Hero Contrast) */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#040915] via-[#050D1E]/90 md:via-[#050D1E]/75 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#040915]/90 to-transparent pointer-events-none" />

              {/* Layer 4: Left-Aligned Hero Typography & Clean White CTA Button */}
              <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-full flex items-center">
                <div className="max-w-xl space-y-3 sm:space-y-4 pb-6">
                  {item.badge && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500 text-white text-[10px] sm:text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-teal-950/50">
                      <Sparkles className="w-3 h-3 shrink-0" />
                      <span className="truncate max-w-[260px] sm:max-w-none">{item.badge}</span>
                    </span>
                  )}

                  {item.title && (
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-[1.08] drop-shadow-md">
                      {item.title}
                    </h2>
                  )}

                  {item.subtitle && (
                    <p className="text-xs sm:text-sm md:text-base text-slate-200/90 font-medium leading-relaxed line-clamp-2 max-w-lg">
                      {item.subtitle}
                    </p>
                  )}

                  <div className="pt-1 flex flex-wrap items-center gap-3">
                    {item.ctaText && (
                      <button
                        type="button"
                        onClick={() => handleBannerAction(item.ctaLink)}
                        className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-white hover:bg-teal-50 text-slate-950 font-bold text-xs sm:text-sm shadow-xl transition-all hover:translate-x-0.5"
                      >
                        <span>{item.ctaText}</span>
                        <ArrowRight className="w-4 h-4 text-slate-700" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setZoomedBanner(item)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 sm:py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs backdrop-blur-sm transition-colors"
                      title="View Full Poster"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">View Poster</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Subtle Left / Right Navigation Arrows */}
        {activeSlides.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/35 hover:bg-black/65 text-white flex items-center justify-center backdrop-blur-sm border border-white/15 opacity-70 sm:opacity-0 group-hover:opacity-100 transition-all z-20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/35 hover:bg-black/65 text-white flex items-center justify-center backdrop-blur-sm border border-white/15 opacity-70 sm:opacity-0 group-hover:opacity-100 transition-all z-20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Centered Bottom Pagination Dots (Exact Match to Screenshot) */}
        {activeSlides.length > 1 && (
          <div className="absolute bottom-3.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm max-w-[92vw] overflow-x-auto">
            {activeSlides.map((b, idx) => {
              const isSelected = idx === currentSlide;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}: ${b.title || 'Banner'}`}
                  title={b.title || `Slide ${idx + 1}`}
                  className={`shrink-0 h-1.5 rounded-full transition-all duration-300 ${
                    isSelected
                      ? 'w-6 bg-teal-400 shadow-sm shadow-teal-400/60'
                      : 'w-1.5 bg-white/55 hover:bg-white'
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* PROMO STRIP BELOW HERO SLIDER: DIWALI 2X BENEFITS */}
      <div className="w-full bg-[#FAF8FD] pt-3 pb-1">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div
            onClick={onExploreFestive}
            className="cursor-pointer relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#201306] via-[#3B220B] to-[#1A0E04] text-white p-4 sm:p-5 shadow-md border border-amber-600/30 flex flex-col sm:flex-row items-center justify-between gap-3 hover:shadow-xl transition-all"
          >
            <div className="space-y-0.5 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-extrabold text-base sm:text-lg text-amber-300 tracking-wide">
                  DIWALI 2X BENEFITS
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase">
                  VIP
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-100">
                <strong className="line-through text-amber-300/70 mr-1.5">2 Years</strong>
                <strong className="text-white text-sm sm:text-base">4 Years Now</strong> · Limited time only.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1 hover:underline">
                <span>DOUBLE THE GOLD PERKS</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FULL-SIZE POSTER LIGHTBOX MODAL */}
      {zoomedBanner && (
        <div
          className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setZoomedBanner(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-950 border border-white/15 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-900/90">
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-teal-300 uppercase tracking-wider block">
                  {zoomedBanner.badge || 'ESSILOR® & ANAND OPTICAL'}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white truncate">
                  {zoomedBanner.title || 'Campaign Poster'}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setZoomedBanner(null)}
                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 sm:p-5 bg-slate-950 flex items-center justify-center max-h-[80vh] overflow-auto">
              <img
                src={zoomedBanner.imageUrl}
                alt={zoomedBanner.title || 'Poster'}
                referrerPolicy="no-referrer"
                className="max-h-[72vh] max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
