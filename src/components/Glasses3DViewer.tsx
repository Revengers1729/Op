import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Eye, ShieldCheck, Sun, Layers } from 'lucide-react';

interface Props {
  initialColor?: string;
  initialShape?: string;
}

export const Glasses3DViewer: React.FC<Props> = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [frameMaterial, setFrameMaterial] = useState<'gold' | 'black' | 'silver' | 'amber'>('gold');
  const [lensMode, setLensMode] = useState<'ar_clear' | 'blue_cut' | 'sun_dark' | 'transition'>('ar_clear');
  const [autoRotate, setAutoRotate] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  
  // Three.js instances refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const glassesGroupRef = useRef<THREE.Group | null>(null);
  const frameMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const lensMaterialsRef = useRef<THREE.MeshPhysicalMaterial[]>([]);
  const requestRef = useRef<number | null>(null);

  // Mouse interaction state
  const prevMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotVelocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 400;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // CAMERA
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0.4, 5.5);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(5, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.4); // Cool optical blue rim light
    dirLight2.position.set(-6, -3, -4);
    scene.add(dirLight2);

    const goldRimLight = new THREE.DirectionalLight(0xf59e0b, 1.0);
    goldRimLight.position.set(0, -6, 5);
    scene.add(goldRimLight);

    // GLASSES GROUP
    const glassesGroup = new THREE.Group();
    glassesGroupRef.current = glassesGroup;
    scene.add(glassesGroup);

    // MATERIALS
    const getMaterialConfig = (matType: typeof frameMaterial) => {
      switch (matType) {
        case 'gold':
          return { color: 0xd4af37, metalness: 0.95, roughness: 0.2 };
        case 'black':
          return { color: 0x18181b, metalness: 0.6, roughness: 0.4 };
        case 'silver':
          return { color: 0xe2e8f0, metalness: 0.98, roughness: 0.15 };
        case 'amber':
          return { color: 0x92400e, metalness: 0.3, roughness: 0.3 };
      }
    };

    const curMatConfig = getMaterialConfig(frameMaterial);
    const metalMat = new THREE.MeshStandardMaterial(curMatConfig);
    frameMaterialsRef.current = [metalMat];

    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.96,
      opacity: 1,
      transparent: true,
      roughness: 0.04,
      ior: 1.58,
      reflectivity: 0.7,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      sheen: 1.0,
      sheenColor: new THREE.Color(0x38bdf8),
    });
    lensMaterialsRef.current = [lensMat];

    // BUILD 3D GLASSES
    const buildGlasses = () => {
      // Clear previous children
      while (glassesGroup.children.length > 0) {
        glassesGroup.remove(glassesGroup.children[0]);
      }

      const eyeRadius = 0.85;
      const eyeSeparation = 1.15;
      const rimThickness = 0.055;

      // 1. LEFT RIM & LENS
      const leftRimGeo = new THREE.TorusGeometry(eyeRadius, rimThickness, 24, 64);
      const leftRim = new THREE.Mesh(leftRimGeo, metalMat);
      leftRim.position.set(-eyeSeparation, 0, 0);
      glassesGroup.add(leftRim);

      const leftLensGeo = new THREE.CylinderGeometry(eyeRadius - 0.01, eyeRadius - 0.01, 0.04, 48);
      leftLensGeo.rotateX(Math.PI / 2);
      const leftLens = new THREE.Mesh(leftLensGeo, lensMat);
      leftLens.position.set(-eyeSeparation, 0, 0);
      glassesGroup.add(leftLens);

      // 2. RIGHT RIM & LENS
      const rightRimGeo = new THREE.TorusGeometry(eyeRadius, rimThickness, 24, 64);
      const rightRim = new THREE.Mesh(rightRimGeo, metalMat);
      rightRim.position.set(eyeSeparation, 0, 0);
      glassesGroup.add(rightRim);

      const rightLensGeo = new THREE.CylinderGeometry(eyeRadius - 0.01, eyeRadius - 0.01, 0.04, 48);
      rightLensGeo.rotateX(Math.PI / 2);
      const rightLens = new THREE.Mesh(rightLensGeo, lensMat);
      rightLens.position.set(eyeSeparation, 0, 0);
      glassesGroup.add(rightLens);

      // 3. ARCHED NOSE BRIDGE
      const bridgeCurve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(-eyeSeparation + eyeRadius * 0.85, 0.1, 0),
        new THREE.Vector3(-0.3, 0.45, 0.1),
        new THREE.Vector3(0.3, 0.45, 0.1),
        new THREE.Vector3(eyeSeparation - eyeRadius * 0.85, 0.1, 0)
      );
      const bridgeGeo = new THREE.TubeGeometry(bridgeCurve, 32, rimThickness * 0.85, 16, false);
      const bridgeMesh = new THREE.Mesh(bridgeGeo, metalMat);
      glassesGroup.add(bridgeMesh);

      // 4. NOSE PADS
      const padGeo = new THREE.CapsuleGeometry(0.06, 0.22, 12, 16);
      const padMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.8,
        roughness: 0.2,
        transparent: true,
      });

      const leftPad = new THREE.Mesh(padGeo, padMat);
      leftPad.position.set(-0.35, -0.2, -0.15);
      leftPad.rotation.z = Math.PI / 6;
      glassesGroup.add(leftPad);

      const rightPad = new THREE.Mesh(padGeo, padMat);
      rightPad.position.set(0.35, -0.2, -0.15);
      rightPad.rotation.z = -Math.PI / 6;
      glassesGroup.add(rightPad);

      // 5. TEMPLES (SIDES)
      const templeLength = 2.4;
      const templeCurveLeft = new THREE.CubicBezierCurve3(
        new THREE.Vector3(-eyeSeparation - eyeRadius, 0.1, 0),
        new THREE.Vector3(-eyeSeparation - eyeRadius - 0.05, 0.1, -templeLength * 0.7),
        new THREE.Vector3(-eyeSeparation - eyeRadius - 0.08, 0.05, -templeLength * 0.9),
        new THREE.Vector3(-eyeSeparation - eyeRadius - 0.1, -0.35, -templeLength)
      );
      const templeGeoLeft = new THREE.TubeGeometry(templeCurveLeft, 36, rimThickness * 0.75, 12, false);
      const templeLeftMesh = new THREE.Mesh(templeGeoLeft, metalMat);
      glassesGroup.add(templeLeftMesh);

      const templeCurveRight = new THREE.CubicBezierCurve3(
        new THREE.Vector3(eyeSeparation + eyeRadius, 0.1, 0),
        new THREE.Vector3(eyeSeparation + eyeRadius + 0.05, 0.1, -templeLength * 0.7),
        new THREE.Vector3(eyeSeparation + eyeRadius + 0.08, 0.05, -templeLength * 0.9),
        new THREE.Vector3(eyeSeparation + eyeRadius + 0.1, -0.35, -templeLength)
      );
      const templeGeoRight = new THREE.TubeGeometry(templeCurveRight, 36, rimThickness * 0.75, 12, false);
      const templeRightMesh = new THREE.Mesh(templeGeoRight, metalMat);
      glassesGroup.add(templeRightMesh);
    };

    buildGlasses();

    // Initial slight angle
    glassesGroup.rotation.y = 0.35;
    glassesGroup.rotation.x = 0.08;

    // ANIMATION LOOP
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);

      if (autoRotate && !isDragging) {
        glassesGroup.rotation.y += 0.007;
        glassesGroup.position.y = Math.sin(Date.now() * 0.0018) * 0.08;
      } else {
        // Damping velocity
        glassesGroup.rotation.y += rotVelocityRef.current.y;
        glassesGroup.rotation.x += rotVelocityRef.current.x;
        rotVelocityRef.current.y *= 0.92;
        rotVelocityRef.current.x *= 0.92;
        // Clamp X tilt
        glassesGroup.rotation.x = Math.max(-0.6, Math.min(0.6, glassesGroup.rotation.x));
      }

      renderer.render(scene, camera);
    };

    requestRef.current = requestAnimationFrame(animate);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, []);

  // Update Frame Material
  useEffect(() => {
    if (!frameMaterialsRef.current.length) return;
    const mat = frameMaterialsRef.current[0];
    switch (frameMaterial) {
      case 'gold':
        mat.color.setHex(0xd4af37);
        mat.metalness = 0.95;
        mat.roughness = 0.2;
        break;
      case 'black':
        mat.color.setHex(0x18181b);
        mat.metalness = 0.6;
        mat.roughness = 0.4;
        break;
      case 'silver':
        mat.color.setHex(0xe2e8f0);
        mat.metalness = 0.98;
        mat.roughness = 0.15;
        break;
      case 'amber':
        mat.color.setHex(0x92400e);
        mat.metalness = 0.25;
        mat.roughness = 0.35;
        break;
    }
  }, [frameMaterial]);

  // Update Lens Mode
  useEffect(() => {
    if (!lensMaterialsRef.current.length) return;
    const lMat = lensMaterialsRef.current[0];
    switch (lensMode) {
      case 'ar_clear':
        lMat.color.setHex(0xffffff);
        lMat.transmission = 0.96;
        lMat.sheenColor.setHex(0x38bdf8);
        lMat.roughness = 0.04;
        break;
      case 'blue_cut':
        lMat.color.setHex(0xf0f9ff);
        lMat.transmission = 0.94;
        lMat.sheenColor.setHex(0x818cf8); // Stronger blue-violet reflection
        lMat.roughness = 0.02;
        break;
      case 'sun_dark':
        lMat.color.setHex(0x1e293b);
        lMat.transmission = 0.25; // Dark sunglasses
        lMat.sheenColor.setHex(0xd4af37);
        lMat.roughness = 0.08;
        break;
      case 'transition':
        lMat.color.setHex(0x475569);
        lMat.transmission = 0.55;
        lMat.sheenColor.setHex(0x60a5fa);
        lMat.roughness = 0.05;
        break;
    }
  }, [lensMode]);

  // Pointer Interaction
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    prevMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !glassesGroupRef.current) return;
    const deltaX = e.clientX - prevMouseRef.current.x;
    const deltaY = e.clientY - prevMouseRef.current.y;
    
    rotVelocityRef.current = {
      x: deltaY * 0.005,
      y: deltaX * 0.005,
    };

    glassesGroupRef.current.rotation.y += deltaX * 0.01;
    glassesGroupRef.current.rotation.x += deltaY * 0.01;
    glassesGroupRef.current.rotation.x = Math.max(-0.6, Math.min(0.6, glassesGroupRef.current.rotation.x));

    prevMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full h-[460px] md:h-[520px] bg-gradient-to-b from-slate-900/80 via-[#0B0F17] to-slate-950 border border-slate-800/80 rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between">
      {/* Top HUD Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <span className="text-sky-400 font-semibold">10D PRECISION VIEW</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>IOR 1.58</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>4-BASE CURVE</span>
        </div>

        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 rounded-md transition-colors backdrop-blur-md"
          title="Toggle 360 Rotation"
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span>{autoRotate ? 'Rotating' : 'Static'}</span>
        </button>
      </div>

      {/* 3D Canvas Mounting Area */}
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none select-none"
      />

      {/* Drag & Tilt Interaction Hint */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 hidden md:flex flex-col gap-1 text-[11px] font-mono text-slate-500 pointer-events-none">
        <span>[DRAG TO ROTATE 360°]</span>
        <span>[PINCH/SWIPE TO TILT]</span>
      </div>

      {/* Bottom Interactive Controls */}
      <div className="relative z-10 px-4 py-3 bg-slate-900/90 border-t border-slate-800/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        {/* Frame Material Selector */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mr-1">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Finish:</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-md border border-slate-800">
            <button
              onClick={() => setFrameMaterial('gold')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                frameMaterial === 'gold' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Gold Ion
            </button>
            <button
              onClick={() => setFrameMaterial('black')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                frameMaterial === 'black' ? 'bg-slate-200 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Obsidian
            </button>
            <button
              onClick={() => setFrameMaterial('silver')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                frameMaterial === 'silver' ? 'bg-slate-200 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Titanium
            </button>
            <button
              onClick={() => setFrameMaterial('amber')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                frameMaterial === 'amber' ? 'bg-amber-700 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tortoise
            </button>
          </div>
        </div>

        {/* Lens Coating Selector */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Optics:</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-md border border-slate-800">
            <button
              onClick={() => setLensMode('ar_clear')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                lensMode === 'ar_clear' ? 'bg-sky-500 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              AR Clear
            </button>
            <button
              onClick={() => setLensMode('blue_cut')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                lensMode === 'blue_cut' ? 'bg-indigo-500 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Blue Shield
            </button>
            <button
              onClick={() => setLensMode('transition')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                lensMode === 'transition' ? 'bg-slate-300 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Transition
            </button>
            <button
              onClick={() => setLensMode('sun_dark')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                lensMode === 'sun_dark' ? 'bg-slate-700 text-amber-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Polarized
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
