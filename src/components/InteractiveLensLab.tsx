import React, { useState } from 'react';
import { Shield, Sparkles, Sun, Eye, Zap, CheckCircle2, Sliders } from 'lucide-react';

export const InteractiveLensLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blue_cut' | 'ar_coating' | 'photochromic' | 'progressive'>('blue_cut');
  
  // Blue Cut state
  const [laserFiring, setLaserFiring] = useState(true);
  const [hasBlueCut, setHasBlueCut] = useState(true);

  // AR Coating night driving slider
  const [arSliderPos, setArSliderPos] = useState(50);

  // Photochromic UV state
  const [uvIndex, setUvIndex] = useState(8);

  // Progressive focal zone
  const [progressiveZone, setProgressiveZone] = useState<'distance' | 'intermediate' | 'near'>('intermediate');

  return (
    <section id="lens-tech" className="py-20 bg-slate-950 border-y border-slate-800/80 relative overflow-hidden">
      {/* Background optical grid */}
      <div className="absolute inset-0 bg-optical-grid opacity-30 pointer-events-none" />
      
      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-sky-400 mb-3 tracking-wider">
            <span>CLINICAL OPTICAL SIMULATOR</span>
            <span aria-hidden="true">·</span>
            <span>24+ YEARS DISPENSING EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Interactive Lens Laboratory
          </h2>
          <p className="text-base text-slate-400 leading-relaxed">
            Experience ophthalmic optics in real-time. Test how medical-grade lens coatings deflect digital glare, eliminate night driving reflections, and adapt to sunlight.
          </p>

          {/* Interactive Lab Tabs */}
          <div className="mt-8 inline-flex p-1 bg-slate-900 border border-slate-800 rounded-lg max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('blue_cut')}
              className={`px-4 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                activeTab === 'blue_cut'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Blue-Cut 420nm Shield
            </button>
            <button
              onClick={() => setActiveTab('ar_coating')}
              className={`px-4 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                activeTab === 'ar_coating'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Night Driving AR Anti-Glare
            </button>
            <button
              onClick={() => setActiveTab('photochromic')}
              className={`px-4 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                activeTab === 'photochromic'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              3. Smart Photochromic UV
            </button>
            <button
              onClick={() => setActiveTab('progressive')}
              className={`px-4 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                activeTab === 'progressive'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              4. Freeform Progressive Corridor
            </button>
          </div>
        </div>

        {/* TAB 1: BLUE CUT SHIELD SIMULATOR */}
        {activeTab === 'blue_cut' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/60 border border-slate-800 rounded-xl p-6 md:p-8 backdrop-blur-md">
            {/* Visual simulation stage */}
            <div className="lg:col-span-7 relative h-72 sm:h-80 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center p-4">
              {/* Laser emitter */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <div className="w-10 h-10 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 shadow-inner">
                  <Zap className="w-5 h-5 animate-pulse" />
                </div>
                <div className="hidden sm:block text-[11px] font-mono text-slate-400">
                  420nm High-Energy Laser
                </div>
              </div>

              {/* Laser Beam */}
              {laserFiring && (
                <div className="absolute left-16 top-1/2 -translate-y-1/2 right-1/2 h-2 bg-gradient-to-r from-violet-600 via-indigo-500 to-sky-400 shadow-[0_0_20px_#6366f1] animate-pulse" />
              )}

              {/* The Spectacle Lens */}
              <div className="relative z-10 w-24 h-56 rounded-[40px] border-4 border-slate-600/80 bg-slate-800/40 backdrop-blur-sm shadow-2xl flex flex-col items-center justify-center transition-all duration-300">
                <div className="text-[10px] font-mono text-center text-slate-400 uppercase tracking-wider px-1">
                  {hasBlueCut ? 'Anand Shield 420nm' : 'Standard Glass'}
                </div>
                {hasBlueCut && (
                  <div className="absolute inset-0 rounded-[36px] bg-gradient-to-tr from-sky-400/20 via-indigo-500/10 to-transparent pointer-events-none" />
                )}
              </div>

              {/* Reflected Laser Beam if BlueCut active */}
              {laserFiring && hasBlueCut && (
                <div
                  className="absolute left-[45%] top-1/2 h-2 w-28 bg-gradient-to-r from-sky-400 to-violet-500 shadow-[0_0_15px_#38bdf8] origin-left -rotate-45 transition-all"
                  style={{ transform: 'translateY(-50%) rotate(-40deg)' }}
                />
              )}

              {/* Piercing Beam towards eye if NOT BlueCut */}
              {laserFiring && !hasBlueCut && (
                <div className="absolute left-1/2 top-1/2 -translate-y-1/2 right-16 h-2 bg-gradient-to-r from-indigo-500 to-violet-600 shadow-[0_0_15px_#818cf8] animate-pulse" />
              )}

              {/* Target Eye Sensor */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5">
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    hasBlueCut
                      ? 'border-emerald-500/80 bg-emerald-950/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'border-red-500/80 bg-red-950/50 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.5)] animate-bounce'
                  }`}
                >
                  <Eye className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-medium text-slate-300">
                  {hasBlueCut ? 'Retina Protected' : 'Blue Light Strain!'}
                </span>
              </div>
            </div>

            {/* Controls & clinical explanation */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-sky-400 font-semibold tracking-wider">
                  CLINICAL VERIFICATION
                </span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2">
                  Harmful Blue-Violet Ray Shielding
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Monitors and phones emit high-frequency blue-violet rays between 415nm and 455nm that penetrate straight to the macular region. Our specialized blue-cut ophthalmic coating selectively reflects harmful peaks while passing healthy natural light.
                </p>
              </div>

              {/* Interactive Toggles */}
              <div className="space-y-4 bg-slate-950/80 p-4 rounded-lg border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">Equip Anand Blue-Cut Lens:</span>
                  <button
                    onClick={() => setHasBlueCut(!hasBlueCut)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      hasBlueCut
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {hasBlueCut ? 'Active (Protected)' : 'Unprotected Standard'}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">420nm Laser Test Beam:</span>
                  <button
                    onClick={() => setLaserFiring(!laserFiring)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      laserFiring
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {laserFiring ? 'Firing Test' : 'Paused'}
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Available with zero power (screen glasses) or prescription powers.</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: NIGHT DRIVING AR COATING SLIDER */}
        {activeTab === 'ar_coating' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/60 border border-slate-800 rounded-xl p-6 md:p-8 backdrop-blur-md">
            <div className="lg:col-span-7 relative h-72 sm:h-80 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden flex flex-col justify-end p-4">
              {/* Split Night Highway Driving Visual */}
              <div className="absolute inset-0 flex">
                {/* Left Side: Uncoated Glass with blinding glare */}
                <div
                  className="h-full relative overflow-hidden bg-slate-950 flex items-center justify-center transition-all"
                  style={{ width: `${arSliderPos}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />
                  
                  {/* Blinding headlight glare and ghost halos */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-amber-200/90 blur-xl animate-pulse" />
                    <div className="absolute w-40 h-40 rounded-full border-4 border-amber-300/30 blur-sm" />
                    <div className="absolute -top-8 w-24 h-24 rounded-full border-2 border-sky-400/20 blur-sm" />
                    <span className="relative z-20 text-xs font-mono font-bold text-amber-300 bg-slate-950/80 px-2 py-1 rounded mt-2">
                      UNCOATED: Blinding Starburst Glare
                    </span>
                  </div>
                </div>

                {/* Right Side: Multi-Coated AR Lens (Pinpoint clarity) */}
                <div
                  className="h-full relative overflow-hidden bg-slate-950 flex items-center justify-center flex-1 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />
                  {/* Crisp pinpoint headlight */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-5 h-5 rounded-full bg-white shadow-[0_0_12px_#ffffff]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-300 ml-8 -mt-2 shadow-[0_0_8px_#f59e0b]" />
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-950/80 px-2 py-1 rounded mt-6">
                      ANAND AR: 99.4% Crisp Transmission
                    </span>
                  </div>
                </div>
              </div>

              {/* Split Divider line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-sky-400 z-20 pointer-events-none shadow-[0_0_10px_#38bdf8]"
                style={{ left: `${arSliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-sky-500 border-2 border-white flex items-center justify-center text-slate-950 shadow-md">
                  <Sliders className="w-3 h-3" />
                </div>
              </div>

              {/* Slider instruction */}
              <div className="relative z-30 bg-slate-950/80 px-3 py-1.5 rounded-md border border-slate-800 text-[11px] font-mono text-slate-300 self-center">
                DRAG SLIDER BELOW TO COMPARE GLARE CUTOFF
              </div>
            </div>

            {/* Interactive Slider & Info */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-sky-400 font-semibold tracking-wider">
                  NIGHT DRIVING SAFETY
                </span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2">
                  Anti-Reflective (AR) Multi-Coating
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Standard spectacles reflect up to 14% of ambient light right off the lens surface, causing starburst flares from oncoming LED headlights. Our 16-layer vacuum-deposited AR coating reduces reflections to under 0.6%, dramatically improving night driving reaction times.
                </p>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
                <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
                  <span>Interactive Split Slider:</span>
                  <span className="font-mono text-sky-400">{arSliderPos}% Uncoated / {100 - arSliderPos}% AR</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={arSliderPos}
                  onChange={(e) => setArSliderPos(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Includes hydrophobic & oleophobic easy-clean smudge resistance.</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SMART PHOTOCHROMIC UV SLIDER */}
        {activeTab === 'photochromic' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/60 border border-slate-800 rounded-xl p-6 md:p-8 backdrop-blur-md">
            <div className="lg:col-span-7 relative h-72 sm:h-80 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden flex flex-col items-center justify-center p-6">
              {/* Dynamic Sunlight / Room Background */}
              <div
                className="absolute inset-0 transition-colors duration-500"
                style={{
                  backgroundColor: `rgba(245, 158, 11, ${uvIndex * 0.04})`,
                }}
              />

              {/* Reactive Glasses Lens Visual */}
              <div className="relative z-10 w-44 h-36 rounded-full border-4 border-slate-500 flex flex-col items-center justify-center transition-all duration-700 shadow-2xl overflow-hidden"
                style={{
                  backgroundColor: `rgba(15, 23, 42, ${0.08 + (uvIndex / 10) * 0.82})`,
                  borderColor: uvIndex > 5 ? '#f59e0b' : '#64748b',
                }}
              >
                {/* Visual Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                
                <span className="relative z-20 text-xs font-mono font-bold text-center px-3 text-slate-200">
                  {uvIndex <= 2 ? 'Indoors: 95% Crystal Clear' : uvIndex <= 6 ? 'Subtle Shade (UV 3-6)' : 'Full Dark Sunglasses (Cat 3)'}
                </span>

                <div className="relative z-20 mt-2 text-[11px] font-mono text-amber-300">
                  Tint: {Math.round(15 + (uvIndex / 10) * 75)}% Darkness
                </div>
              </div>

              <div className="relative z-20 mt-6 flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-950/80 px-3 py-1.5 rounded border border-slate-800">
                <Sun className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '12s' }} />
                <span>Simulated Outdoor UV Index: {uvIndex} / 10</span>
              </div>
            </div>

            {/* Interactive UV Slider & Info */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-amber-400 font-semibold tracking-wider">
                  2-IN-1 INTELLIGENT EYEWEAR
                </span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2">
                  Fast-Active Photochromic Technology
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Millions of photochromic micro-crystals embedded in the lens surface rearrange structure instantly when exposed to ultraviolet photons. Clear optical glasses inside your office; sleek protective sunglasses within 25 seconds of stepping outside.
                </p>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
                <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
                  <span>Simulate Sunlight / UV Exposure:</span>
                  <span className="font-mono text-amber-400">UV Level: {uvIndex}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={uvIndex}
                  onChange={(e) => setUvIndex(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>Indoor Office (0)</span>
                  <span>Overcast (5)</span>
                  <span>Blazing Sun (10)</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% UVA/UVB blocking in both clear and dark states.</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROGRESSIVE MULTIFOCAL CORRIDOR */}
        {activeTab === 'progressive' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/60 border border-slate-800 rounded-xl p-6 md:p-8 backdrop-blur-md">
            <div className="lg:col-span-7 relative h-72 sm:h-80 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden flex flex-col items-center justify-center p-4">
              {/* Progressive Lens Visual Outline */}
              <div className="relative w-48 h-64 rounded-[40px] border-2 border-slate-600 bg-slate-900/60 overflow-hidden flex flex-col shadow-2xl">
                {/* Zone 1: Distance */}
                <button
                  onClick={() => setProgressiveZone('distance')}
                  className={`flex-1 flex flex-col items-center justify-center border-b border-dashed border-slate-700/60 transition-all ${
                    progressiveZone === 'distance'
                      ? 'bg-sky-500/20 text-sky-300 font-bold'
                      : 'hover:bg-slate-800/40 text-slate-400'
                  }`}
                >
                  <span className="text-xs uppercase tracking-wider">Distance Zone</span>
                  <span className="text-[10px] font-mono text-slate-500">Driving · TV · Walking</span>
                </button>

                {/* Zone 2: Intermediate */}
                <button
                  onClick={() => setProgressiveZone('intermediate')}
                  className={`h-16 flex flex-col items-center justify-center border-b border-dashed border-slate-700/60 transition-all ${
                    progressiveZone === 'intermediate'
                      ? 'bg-amber-500/20 text-amber-300 font-bold'
                      : 'hover:bg-slate-800/40 text-slate-400'
                  }`}
                >
                  <span className="text-xs uppercase tracking-wider">Intermediate Corridor</span>
                  <span className="text-[10px] font-mono text-slate-500">Laptop · Desktop Screen</span>
                </button>

                {/* Zone 3: Near */}
                <button
                  onClick={() => setProgressiveZone('near')}
                  className={`flex-1 flex flex-col items-center justify-center transition-all ${
                    progressiveZone === 'near'
                      ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                      : 'hover:bg-slate-800/40 text-slate-400'
                  }`}
                >
                  <span className="text-xs uppercase tracking-wider">Near Reading Zone</span>
                  <span className="text-[10px] font-mono text-slate-500">Smartphone · Books</span>
                </button>
              </div>

              <div className="mt-3 text-[11px] font-mono text-slate-400">
                CLICK ANY ZONE TO TEST THE DIGITAL CORRIDOR
              </div>
            </div>

            {/* Explanation with 24 yrs Drishtipunj Expertise */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-sky-400 font-semibold tracking-wider">
                  CLINICAL DISPENSING MASTERY
                </span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2">
                  No Bifocal Lines. Seamless Vision.
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  Fitting progressive lenses requires micrometer-level pupillary distance (PD) and fitting-height accuracy. Having served as Optical Incharge for 17 years and 7 years in clinical refraction at Drishtipunj, we guarantee 100% adaptation with zero swimming sensation or distortion corridors.
                </p>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800 space-y-2">
                <div className="text-xs font-medium text-slate-200">
                  Current Selected Zone: <span className="font-bold text-sky-400 uppercase">{progressiveZone}</span>
                </div>
                <p className="text-xs text-slate-400">
                  {progressiveZone === 'distance' && 'Offers unrestricted panoramic clarity for driving, outdoor sports, and distance presentations without tipping your head back.'}
                  {progressiveZone === 'intermediate' && 'Calibrated for modern computer screens at 50cm–80cm arm length, preventing neck crane and posture strain.'}
                  {progressiveZone === 'near' && 'Wider reading corridor engineered for effortless mobile phone typing, book reading, and needle threading.'}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Adaptation Guarantee or free optical corridor replacement.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
