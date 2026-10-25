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
    <section id="lens-tech" className="py-20 bg-gradient-to-b from-[#F5F0FF] via-[#FAF8FD] to-white border-y border-purple-100 relative overflow-hidden">
      {/* Background optical grid */}
      <div className="absolute inset-0 bg-optical-grid opacity-60 pointer-events-none" />
      
      {/* Radiant ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-purple-700 mb-3 tracking-wider font-semibold">
            <span>CLINICAL OPHTHALMIC LABORATORY</span>
            <span aria-hidden="true" className="text-purple-300">·</span>
            <span>24+ YEARS DISPENSING EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Interactive Lens Technology
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Experience ophthalmic optics in real-time. Test how clinical-grade lens coatings deflect digital glare, eliminate night driving reflections, and adapt to natural light.
          </p>

          {/* Interactive Lab Tabs */}
          <div className="mt-8 inline-flex p-1.5 bg-white border border-purple-200 rounded-xl shadow-md max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('blue_cut')}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'blue_cut'
                  ? 'bg-purple-700 text-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-purple-700'
              }`}
            >
              1. Blue-Cut 420nm Shield
            </button>
            <button
              onClick={() => setActiveTab('ar_coating')}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'ar_coating'
                  ? 'bg-purple-700 text-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-purple-700'
              }`}
            >
              2. Night Driving AR Anti-Glare
            </button>
            <button
              onClick={() => setActiveTab('photochromic')}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'photochromic'
                  ? 'bg-purple-700 text-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-purple-700'
              }`}
            >
              3. Smart Photochromic UV
            </button>
            <button
              onClick={() => setActiveTab('progressive')}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'progressive'
                  ? 'bg-purple-700 text-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-purple-700'
              }`}
            >
              4. Freeform Progressive Corridor
            </button>
          </div>
        </div>

        {/* TAB 1: BLUE CUT SHIELD SIMULATOR */}
        {activeTab === 'blue_cut' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-purple-200 rounded-2xl p-6 md:p-8 shadow-xl">
            {/* Visual simulation stage (High-contrast dark optics viewport) */}
            <div className="lg:col-span-7 relative h-72 sm:h-80 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center p-4 shadow-inner">
              {/* Laser emitter */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <div className="w-10 h-10 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-purple-400 shadow-inner">
                  <Zap className="w-5 h-5 animate-pulse" />
                </div>
                <div className="hidden sm:block text-[11px] font-mono text-slate-400">
                  420nm Laser Test
                </div>
              </div>

              {/* Laser Beam */}
              {laserFiring && (
                <div className="absolute left-16 top-1/2 -translate-y-1/2 right-1/2 h-2 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-400 shadow-[0_0_20px_#a855f7] animate-pulse" />
              )}

              {/* The Spectacle Lens */}
              <div className="relative z-10 w-24 h-56 rounded-[40px] border-4 border-slate-600/80 bg-slate-800/40 backdrop-blur-sm shadow-2xl flex flex-col items-center justify-center transition-all duration-300">
                <div className="text-[10px] font-mono text-center text-purple-200 uppercase tracking-wider px-1">
                  {hasBlueCut ? 'Anand Shield 420nm' : 'Standard Glass'}
                </div>
                {hasBlueCut && (
                  <div className="absolute inset-0 rounded-[36px] bg-gradient-to-tr from-purple-400/20 via-indigo-500/10 to-transparent pointer-events-none" />
                )}
              </div>

              {/* Reflected Laser Beam if BlueCut active */}
              {laserFiring && hasBlueCut && (
                <div
                  className="absolute left-[45%] top-1/2 h-2 w-28 bg-gradient-to-r from-purple-400 to-violet-500 shadow-[0_0_15px_#c084fc] origin-left -rotate-45 transition-all"
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

            {/* Controls & clinical explanation in Clean White & Purple */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-purple-700 font-semibold tracking-wider uppercase">
                  CLINICAL RETINAL PROTECTION
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">
                  Harmful Blue-Violet Ray Shielding
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Monitors and phones emit high-frequency blue-violet rays between 415nm and 455nm that cause digital macular fatigue. Our specialized blue-cut ophthalmic coating selectively reflects harmful peaks while passing healthy natural light.
                </p>
              </div>

              {/* Interactive Toggles */}
              <div className="space-y-4 bg-purple-50/70 p-4 rounded-xl border border-purple-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-800">Equip Anand Blue-Cut Lens:</span>
                  <button
                    onClick={() => setHasBlueCut(!hasBlueCut)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      hasBlueCut
                        ? 'bg-purple-700 text-white shadow-sm'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {hasBlueCut ? 'Active (Protected)' : 'Unprotected Standard'}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-800">420nm Laser Test Beam:</span>
                  <button
                    onClick={() => setLaserFiring(!laserFiring)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      laserFiring
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {laserFiring ? 'Firing Test' : 'Paused'}
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Available in zero-power (screen spectacles) or power prescriptions.</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: NIGHT DRIVING AR COATING SLIDER */}
        {activeTab === 'ar_coating' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-purple-200 rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="lg:col-span-7 relative h-72 sm:h-80 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col justify-end p-4 shadow-inner">
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
                    <div className="absolute -top-8 w-24 h-24 rounded-full border-2 border-purple-400/20 blur-sm" />
                    <span className="relative z-20 text-xs font-mono font-bold text-amber-300 bg-slate-950/80 px-2 py-1 rounded mt-2">
                      UNCOATED: Starburst Glare
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
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-300 ml-8 -mt-2 shadow-[0_0_8px_#c084fc]" />
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-950/80 px-2 py-1 rounded mt-6">
                      ANAND AR: 99.4% Crisp Light
                    </span>
                  </div>
                </div>
              </div>

              {/* Split Divider line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-purple-400 z-20 pointer-events-none shadow-[0_0_10px_#a855f7]"
                style={{ left: `${arSliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-purple-600 border-2 border-white flex items-center justify-center text-white shadow-md">
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
                <span className="text-xs font-mono text-purple-700 font-semibold tracking-wider uppercase">
                  NIGHT DRIVING SAFETY
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">
                  Anti-Reflective (AR) Multi-Coating
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Standard spectacles reflect up to 14% of ambient light right off the lens surface, causing starburst flares from oncoming LED headlights. Our multi-layer AR coating reduces reflections to under 0.6%, dramatically improving night driving reaction times.
                </p>
              </div>

              <div className="bg-purple-50/70 p-4 rounded-xl border border-purple-100">
                <label className="flex items-center justify-between text-xs font-medium text-slate-800 mb-2">
                  <span>Interactive Glare Split Slider:</span>
                  <span className="font-mono text-purple-700 font-bold">{arSliderPos}% Uncoated / {100 - arSliderPos}% AR</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={arSliderPos}
                  onChange={(e) => setArSliderPos(Number(e.target.value))}
                  className="w-full accent-purple-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Includes hydrophobic & oleophobic easy-clean smudge resistance.</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SMART PHOTOCHROMIC UV SLIDER */}
        {activeTab === 'photochromic' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-purple-200 rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="lg:col-span-7 relative h-72 sm:h-80 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col items-center justify-center p-6 shadow-inner">
              {/* Dynamic Sunlight Background */}
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
                <span className="text-xs font-mono text-purple-700 font-semibold tracking-wider uppercase">
                  2-IN-1 INTELLIGENT EYEWEAR
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">
                  Fast-Active Photochromic Technology
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Millions of photochromic micro-crystals embedded in the lens surface rearrange structure instantly when exposed to ultraviolet photons. Clear optical glasses inside your office; sleek protective sunglasses outdoors.
                </p>
              </div>

              <div className="bg-purple-50/70 p-4 rounded-xl border border-purple-100">
                <label className="flex items-center justify-between text-xs font-medium text-slate-800 mb-2">
                  <span>Simulate Sunlight / UV Exposure:</span>
                  <span className="font-mono text-purple-700 font-bold">UV Level: {uvIndex}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={uvIndex}
                  onChange={(e) => setUvIndex(Number(e.target.value))}
                  className="w-full accent-purple-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>Indoor Office (0)</span>
                  <span>Overcast (5)</span>
                  <span>Blazing Sun (10)</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% UVA/UVB blocking in both clear and dark states.</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROGRESSIVE MULTIFOCAL CORRIDOR */}
        {activeTab === 'progressive' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-purple-200 rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="lg:col-span-7 relative h-72 sm:h-80 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col items-center justify-center p-4 shadow-inner">
              {/* Progressive Lens Visual Outline */}
              <div className="relative w-48 h-64 rounded-[40px] border-2 border-slate-600 bg-slate-900/60 overflow-hidden flex flex-col shadow-2xl">
                {/* Zone 1: Distance */}
                <button
                  onClick={() => setProgressiveZone('distance')}
                  className={`flex-1 flex flex-col items-center justify-center border-b border-dashed border-slate-700/60 transition-all ${
                    progressiveZone === 'distance'
                      ? 'bg-purple-600/30 text-purple-200 font-bold'
                      : 'hover:bg-slate-800/40 text-slate-400'
                  }`}
                >
                  <span className="text-xs uppercase tracking-wider">Distance Zone</span>
                  <span className="text-[10px] font-mono text-slate-400">Driving · Walking</span>
                </button>

                {/* Zone 2: Intermediate */}
                <button
                  onClick={() => setProgressiveZone('intermediate')}
                  className={`h-16 flex flex-col items-center justify-center border-b border-dashed border-slate-700/60 transition-all ${
                    progressiveZone === 'intermediate'
                      ? 'bg-purple-600/30 text-purple-200 font-bold'
                      : 'hover:bg-slate-800/40 text-slate-400'
                  }`}
                >
                  <span className="text-xs uppercase tracking-wider">Intermediate Corridor</span>
                  <span className="text-[10px] font-mono text-slate-400">Laptop · Desktop Screen</span>
                </button>

                {/* Zone 3: Near */}
                <button
                  onClick={() => setProgressiveZone('near')}
                  className={`flex-1 flex flex-col items-center justify-center transition-all ${
                    progressiveZone === 'near'
                      ? 'bg-emerald-500/30 text-emerald-200 font-bold'
                      : 'hover:bg-slate-800/40 text-slate-400'
                  }`}
                >
                  <span className="text-xs uppercase tracking-wider">Near Reading Zone</span>
                  <span className="text-[10px] font-mono text-slate-400">Smartphone · Books</span>
                </button>
              </div>

              <div className="mt-3 text-[11px] font-mono text-slate-400">
                CLICK ANY ZONE TO TEST THE DIGITAL CORRIDOR
              </div>
            </div>

            {/* Explanation with 24 yrs Drishtipunj Expertise */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-purple-700 font-semibold tracking-wider uppercase">
                  CLINICAL DISPENSING MASTERY
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">
                  No Bifocal Lines. Seamless Vision.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Fitting progressive lenses requires micrometer-level pupillary distance (PD) and fitting-height accuracy. Having served as Optical Incharge for 17 years and 7 years in clinical refraction at Drishtipunj, we guarantee 100% adaptation with zero swimming sensation or distortion corridors.
                </p>
              </div>

              <div className="bg-purple-50/70 p-4 rounded-xl border border-purple-100 space-y-2">
                <div className="text-xs font-medium text-slate-800">
                  Current Selected Zone: <span className="font-bold text-purple-700 uppercase">{progressiveZone}</span>
                </div>
                <p className="text-xs text-slate-600">
                  {progressiveZone === 'distance' && 'Offers unrestricted panoramic clarity for driving, outdoor walks, and distance presentations without tipping your head back.'}
                  {progressiveZone === 'intermediate' && 'Calibrated for modern computer screens at 50cm–80cm arm length, preventing neck crane and posture strain.'}
                  {progressiveZone === 'near' && 'Wider reading corridor engineered for effortless mobile phone typing, book reading, and needle threading.'}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Adaptation Guarantee or free optical corridor replacement.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
