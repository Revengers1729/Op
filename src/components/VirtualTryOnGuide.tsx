import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, Sparkles, Check, Info, ZoomIn, ZoomOut, AlertCircle } from 'lucide-react';
import { CATALOG_ITEMS } from '../data/catalog';
import { EyewearGraphic } from './EyewearGraphic';
import { EyewearItem } from '../types/optical';

interface Props {
  onSelectFrame: (item: EyewearItem) => void;
}

const FACE_SHAPES = [
  {
    id: 'oval',
    name: 'Oval Face',
    description: 'Balanced proportions with slightly narrower jaw than temples.',
    recommended: ['Wayfarer', 'Round', 'Aviator', 'Hexagonal'],
    avoid: 'Overly oversized frames that exceed cheekbone width',
    tip: 'Almost all frame geometries look exceptionally flattering on oval shapes.',
  },
  {
    id: 'round',
    name: 'Round Face',
    description: 'Soft curves with equal width and length, gentle rounded jawline.',
    recommended: ['Wayfarer', 'Rectangle', 'Hexagonal', 'Clubmaster'],
    avoid: 'Small round or circular frames which accentuate roundness',
    tip: 'Angular, square and rectangular frames add structure and lengthen the face.',
  },
  {
    id: 'square',
    name: 'Square Face',
    description: 'Strong, defined jawline with broad forehead and linear cheekbones.',
    recommended: ['Round', 'Aviator', 'Rimless', 'Cat-Eye'],
    avoid: 'Heavy geometric square or boxy thick frames',
    tip: 'Curved and round lenses soften sharp angles and balance facial prominence.',
  },
  {
    id: 'heart',
    name: 'Heart Face',
    description: 'Broader forehead tapering down to a delicate, pointed chin.',
    recommended: ['Rimless', 'Round', 'Aviator', 'Cat-Eye'],
    avoid: 'Heavy top browlines that exaggerate forehead width',
    tip: 'Light rimless titanium or frames with wider lower borders balance the chin.',
  },
  {
    id: 'diamond',
    name: 'Diamond Face',
    description: 'High, dramatic cheekbones with narrower eye-line and jawline.',
    recommended: ['Clubmaster', 'Cat-Eye', 'Round', 'Oval'],
    avoid: 'Narrow frames that draw focus away from cheekbone elegance',
    tip: 'Browlines and cat-eye upswept frames accentuate high cheekbones beautifully.',
  },
];

export const VirtualTryOnGuide: React.FC<Props> = ({ onSelectFrame }) => {
  const [selectedFace, setSelectedFace] = useState(FACE_SHAPES[0]);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [activeFrame, setActiveFrame] = useState<EyewearItem>(CATALOG_ITEMS[0]);
  
  // Frame position & scale overlay adjustments
  const [frameScale, setFrameScale] = useState<number>(1.0);
  const [frameOffsetY, setFrameOffsetY] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err) {
      console.error(err);
      setCameraError('Unable to access camera. Please check browser permissions or enjoy the 3D optical simulator.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <section id="face-guide" className="py-20 bg-gradient-to-b from-white via-[#FAF8FD] to-[#F5F0FF] border-t border-purple-100 text-slate-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-purple-700 mb-2 tracking-wider font-semibold uppercase">
            <span>FACIAL PROPORTION & HARMONY</span>
            <span aria-hidden="true" className="text-purple-300">·</span>
            <span>FIND YOUR FIT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            Face Shape Matrix & Live Mirror Try-On
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Finding your quintessential spectacles requires balancing frame geometry against your cheekbones and jawline. Use our clinical matching guide or launch the live camera mirror.
          </p>
        </div>

        {/* Dual Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Face Shapes Selector & Recommendations */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {FACE_SHAPES.map((face) => (
                <button
                  key={face.id}
                  onClick={() => setSelectedFace(face)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedFace.id === face.id
                      ? 'bg-purple-700 text-white border-purple-700 shadow-md font-semibold'
                      : 'bg-white border-purple-100 text-slate-600 hover:border-purple-300 hover:text-purple-700'
                  }`}
                >
                  <span className="text-xs font-bold block">{face.name.split(' ')[0]}</span>
                  <span className={`text-[10px] capitalize block ${selectedFace.id === face.id ? 'text-purple-200' : 'text-slate-400'}`}>
                    {face.recommended[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Face Details Card */}
            <div className="p-6 bg-white border border-purple-100 rounded-2xl shadow-md space-y-4">
              <div>
                <span className="text-[11px] font-mono text-purple-700 font-semibold uppercase">
                  {selectedFace.name} ANALYSIS
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">{selectedFace.description}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-100">
                  <span className="text-purple-800 font-bold block mb-1">Recommended Geometries:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedFace.recommended.map((r) => (
                      <span key={r} className="text-purple-900 bg-white px-2 py-0.5 rounded text-[11px] font-medium border border-purple-200 shadow-2xs">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-100">
                  <span className="text-rose-700 font-bold block mb-1">Frame Shapes to Avoid:</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {selectedFace.avoid}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900 leading-relaxed">
                <strong>Optician's Advice: </strong> {selectedFace.tip}
              </div>

              {/* Recommended Frames for this Face Shape */}
              <div className="pt-2">
                <div className="text-xs font-bold text-slate-900 mb-3">
                  Matching Frames in Stock:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {CATALOG_ITEMS.filter((item) =>
                    item.bestForFace.some((f) => f.toLowerCase().includes(selectedFace.id))
                  ).slice(0, 4).map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setActiveFrame(f);
                        onSelectFrame(f);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-colors flex items-center justify-between gap-2 ${
                        activeFrame.id === f.id
                          ? 'bg-purple-100 border-purple-400 text-purple-900 font-semibold'
                          : 'bg-[#FAF8FD] border-purple-100 text-slate-700 hover:border-purple-300'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold truncate max-w-[120px]">{f.name}</div>
                        <div className="text-[10px] font-mono text-purple-700 font-bold">₹{f.price}</div>
                      </div>
                      <span className="text-[10px] text-purple-700 font-mono font-medium">Select</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Video Mirror */}
          <div className="lg:col-span-6 bg-white border border-purple-100 rounded-2xl p-6 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-purple-700 font-semibold uppercase">
                    VIRTUAL MIRROR TRY-ON
                  </span>
                </div>

                {!cameraActive ? (
                  <button
                    onClick={startCamera}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-purple-700 hover:bg-purple-800 text-white rounded-md transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Launch Live Mirror</span>
                  </button>
                ) : (
                  <button
                    onClick={stopCamera}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-md transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Turn Off Camera</span>
                  </button>
                )}
              </div>

              {/* Viewport Area */}
              <div className="relative h-80 sm:h-96 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center shadow-inner">
                {cameraActive ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover -scale-x-100"
                  />
                ) : (
                  /* Stylized Neutral Portrait Silhouette Canvas */
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#1E1B4B] via-[#0F172A] to-slate-950">
                    <div className="w-32 h-44 rounded-[50px] border-2 border-dashed border-purple-300/40 flex items-center justify-center opacity-50 relative">
                      <div className="w-2 h-2 rounded-full bg-purple-300 absolute top-12 left-8" />
                      <div className="w-2 h-2 rounded-full bg-purple-300 absolute top-12 right-8" />
                      <div className="w-8 h-1 bg-purple-400/50 rounded-full absolute bottom-12" />
                    </div>
                    <div className="relative z-10 mt-4 max-w-xs text-white">
                      <span className="text-xs font-bold block">Camera Standby</span>
                      <p className="text-[11px] text-purple-200/80 mt-1">
                        Click 'Launch Live Mirror' to see this frame directly on your face with instant reflection!
                      </p>
                    </div>
                  </div>
                )}

                {/* Overlaid Spectacles Graphic */}
                <div
                  className="absolute pointer-events-none transition-transform duration-75"
                  style={{
                    transform: `translateY(${frameOffsetY}px) scale(${frameScale})`,
                    width: '280px',
                  }}
                >
                  <EyewearGraphic
                    shape={activeFrame.shape}
                    color={activeFrame.colors[0]}
                    className="w-full h-32"
                  />
                </div>

                {/* Overlaid Info */}
                <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-slate-800 text-[11px] font-mono text-slate-200 pointer-events-none">
                  Trying: <span className="text-amber-300 font-bold">{activeFrame.name}</span>
                </div>
              </div>

              {cameraError && (
                <div className="mt-2 p-2 bg-rose-50 border border-rose-200 rounded text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{cameraError}</span>
                </div>
              )}

              {/* Position & Scale Adjusters */}
              <div className="mt-4 p-3 bg-purple-50/60 rounded-xl border border-purple-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-600">Scale:</span>
                  <button
                    onClick={() => setFrameScale((s) => Math.max(0.7, s - 0.05))}
                    className="p-1 text-slate-700 bg-white hover:bg-slate-100 border border-purple-200 rounded"
                    title="Scale Down"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-mono font-bold text-purple-800">{frameScale.toFixed(2)}x</span>
                  <button
                    onClick={() => setFrameScale((s) => Math.min(1.4, s + 0.05))}
                    className="p-1 text-slate-700 bg-white hover:bg-slate-100 border border-purple-200 rounded"
                    title="Scale Up"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-600">Nose Height:</span>
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    value={frameOffsetY}
                    onChange={(e) => setFrameOffsetY(Number(e.target.value))}
                    className="w-24 accent-purple-700 cursor-pointer h-1.5 bg-purple-200 rounded"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span>All camera frames remain 100% on-device and private.</span>
              <button
                onClick={() => onSelectFrame(activeFrame)}
                className="text-purple-700 hover:underline font-bold"
              >
                Configure & Order This Frame →
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
