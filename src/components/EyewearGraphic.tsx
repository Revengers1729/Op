import React from 'react';
import { FrameShape, EyewearColor } from '../types/optical';

interface Props {
  shape: FrameShape;
  color: EyewearColor;
  className?: string;
  lensTint?: string;
  isHovered?: boolean;
}

export const EyewearGraphic: React.FC<Props> = ({
  shape,
  color,
  className = 'w-full h-44',
  lensTint = 'rgba(255, 255, 255, 0.08)',
  isHovered = false,
}) => {
  const rimStroke = color.rimColor || '#D4AF37';
  const templeStroke = color.templeColor || '#B8860B';

  return (
    <div className={`relative flex items-center justify-center select-none overflow-hidden ${className}`}>
      {/* Subtle Studio Glow Backdrop */}
      <div
        className="absolute w-36 h-36 rounded-full blur-2xl opacity-20 pointer-events-none transition-all duration-500"
        style={{
          backgroundColor: color.hex,
          transform: isHovered ? 'scale(1.2)' : 'scale(1)',
        }}
      />

      <svg
        viewBox="0 0 320 140"
        className="w-full h-full max-h-48 drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out"
        style={{
          transform: isHovered ? 'translateY(-4px) scale(1.03)' : 'translateY(0) scale(1)',
        }}
      >
        <defs>
          {/* Metallic / Acetate gradient */}
          <linearGradient id={`frameGrad-${shape}-${color.name}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={rimStroke} stopOpacity="1" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor={templeStroke} stopOpacity="1" />
          </linearGradient>

          {/* Optical anti-reflective green/cyan reflection sheen */}
          <linearGradient id={`lensReflection-${shape}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="rgba(56, 189, 248, 0.25)" />
            <stop offset="60%" stopColor="rgba(129, 140, 248, 0.3)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          {/* Glass glare line */}
          <linearGradient id="glareSweep" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="30%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* ================= SHAPE: ROUND ================= */}
        {shape === 'round' && (
          <g>
            {/* Temples extending back */}
            <path d="M 68 70 Q 30 65 15 50" stroke={templeStroke} strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 252 70 Q 290 65 305 50" stroke={templeStroke} strokeWidth="3" fill="none" strokeLinecap="round" />
            
            {/* Left Lens & Rim */}
            <circle cx="106" cy="70" r="38" fill={lensTint} stroke={`url(#frameGrad-${shape}-${color.name})`} strokeWidth="4.5" />
            <circle cx="106" cy="70" r="35" fill={`url(#lensReflection-${shape})`} opacity="0.6" />
            <path d="M 85 45 Q 120 40 135 60" stroke="url(#glareSweep)" strokeWidth="2.5" fill="none" opacity="0.7" />

            {/* Right Lens & Rim */}
            <circle cx="214" cy="70" r="38" fill={lensTint} stroke={`url(#frameGrad-${shape}-${color.name})`} strokeWidth="4.5" />
            <circle cx="214" cy="70" r="35" fill={`url(#lensReflection-${shape})`} opacity="0.6" />
            <path d="M 193 45 Q 228 40 243 60" stroke="url(#glareSweep)" strokeWidth="2.5" fill="none" opacity="0.7" />

            {/* Keyhole Arched Bridge */}
            <path d="M 144 68 C 148 56, 172 56, 176 68" stroke={`url(#frameGrad-${shape}-${color.name})`} strokeWidth="4" fill="none" strokeLinecap="round" />

            {/* Nose pads */}
            <rect x="141" y="74" width="4" height="12" rx="2" fill="#E2E8F0" opacity="0.8" />
            <rect x="175" y="74" width="4" height="12" rx="2" fill="#E2E8F0" opacity="0.8" />
          </g>
        )}

        {/* ================= SHAPE: AVIATOR ================= */}
        {shape === 'aviator' && (
          <g>
            {/* Temples */}
            <path d="M 52 58 Q 20 54 10 40" stroke={templeStroke} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 268 58 Q 300 54 310 40" stroke={templeStroke} strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Left Teardrop */}
            <path
              d="M 60 52 C 85 48, 135 50, 142 56 C 146 75, 130 102, 102 102 C 70 102, 54 78, 60 52 Z"
              fill={lensTint}
              stroke={`url(#frameGrad-${shape}-${color.name})`}
              strokeWidth="3.5"
            />
            {/* Left Glare */}
            <path d="M 72 58 Q 110 52 130 65" stroke="url(#glareSweep)" strokeWidth="2.5" fill="none" opacity="0.8" />

            {/* Right Teardrop */}
            <path
              d="M 260 52 C 235 48, 185 50, 178 56 C 174 75, 190 102, 218 102 C 250 102, 266 78, 260 52 Z"
              fill={lensTint}
              stroke={`url(#frameGrad-${shape}-${color.name})`}
              strokeWidth="3.5"
            />
            {/* Right Glare */}
            <path d="M 248 58 Q 210 52 190 65" stroke="url(#glareSweep)" strokeWidth="2.5" fill="none" opacity="0.8" />

            {/* Double Top Brow Bar & Bridge */}
            <line x1="90" y1="46" x2="230" y2="46" stroke={rimStroke} strokeWidth="2" strokeLinecap="round" />
            <path d="M 142 58 Q 160 54 178 58" stroke={rimStroke} strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Nose pads */}
            <circle cx="148" cy="74" r="3" fill="#E2E8F0" opacity="0.85" />
            <circle cx="172" cy="74" r="3" fill="#E2E8F0" opacity="0.85" />
          </g>
        )}

        {/* ================= SHAPE: WAYFARER ================= */}
        {shape === 'wayfarer' && (
          <g>
            {/* Temples with wide hinge */}
            <polygon points="50,50 18,44 14,48 48,56" fill={templeStroke} />
            <polygon points="270,50 302,44 306,48 272,56" fill={templeStroke} />

            {/* Left Wayfarer Lens & Thick Acetate Rim */}
            <path
              d="M 52 48 L 140 48 C 145 70, 138 98, 102 98 C 66 98, 50 78, 52 48 Z"
              fill={lensTint}
              stroke={`url(#frameGrad-${shape}-${color.name})`}
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <path d="M 64 56 Q 105 52 128 66" stroke="url(#glareSweep)" strokeWidth="3" fill="none" opacity="0.75" />

            {/* Right Wayfarer Lens & Thick Acetate Rim */}
            <path
              d="M 268 48 L 180 48 C 175 70, 182 98, 218 98 C 254 98, 270 78, 268 48 Z"
              fill={lensTint}
              stroke={`url(#frameGrad-${shape}-${color.name})`}
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <path d="M 256 56 Q 215 52 192 66" stroke="url(#glareSweep)" strokeWidth="3" fill="none" opacity="0.75" />

            {/* Solid Bridge with keyhole notch */}
            <path d="M 139 52 C 146 48, 174 48, 181 52" stroke={`url(#frameGrad-${shape}-${color.name})`} strokeWidth="7" fill="none" strokeLinecap="round" />

            {/* Silver temple front rivets */}
            <ellipse cx="50" cy="50" rx="3" ry="1.5" fill="#E2E8F0" />
            <ellipse cx="270" cy="50" rx="3" ry="1.5" fill="#E2E8F0" />
          </g>
        )}

        {/* ================= SHAPE: CLUBMASTER ================= */}
        {shape === 'clubmaster' && (
          <g>
            {/* Temples */}
            <path d="M 52 50 Q 25 46 15 36" stroke={templeStroke} strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M 268 50 Q 295 46 305 36" stroke={templeStroke} strokeWidth="3.5" fill="none" strokeLinecap="round" />

            {/* Upper Acetate Brow (Left & Right) */}
            <path d="M 48 48 C 80 44, 138 46, 142 56" stroke={templeStroke} strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M 272 48 C 240 44, 182 46, 178 56" stroke={templeStroke} strokeWidth="8" fill="none" strokeLinecap="round" />

            {/* Gold / Metal Lower Eyewire */}
            <path d="M 54 54 C 58 84, 136 84, 140 54" stroke="#D4AF37" strokeWidth="2.5" fill={lensTint} />
            <path d="M 266 54 C 262 84, 184 84, 180 54" stroke="#D4AF37" strokeWidth="2.5" fill={lensTint} />

            {/* Glare Reflections */}
            <path d="M 68 56 Q 105 52 125 66" stroke="url(#glareSweep)" strokeWidth="2" fill="none" opacity="0.7" />
            <path d="M 252 56 Q 215 52 195 66" stroke="url(#glareSweep)" strokeWidth="2" fill="none" opacity="0.7" />

            {/* Metallic Bridge with filigree notches */}
            <path d="M 141 52 C 147 47, 173 47, 179 52" stroke="#D4AF37" strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx="148" cy="68" r="3" fill="#CBD5E1" />
            <circle cx="172" cy="68" r="3" fill="#CBD5E1" />
          </g>
        )}

        {/* ================= SHAPE: RIMLESS ================= */}
        {shape === 'rimless' && (
          <g>
            {/* Ultra-thin Titanium Temples with mounting screws */}
            <path d="M 58 65 Q 25 62 12 50" stroke={templeStroke} strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 262 65 Q 295 62 308 50" stroke={templeStroke} strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Left Free-floating Lens with polished facet edge */}
            <rect x="58" y="44" width="84" height="48" rx="14" fill={lensTint} stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
            <rect x="60" y="46" width="80" height="44" rx="12" fill={`url(#lensReflection-${shape})`} opacity="0.5" />
            <path d="M 70 52 Q 105 48 132 58" stroke="url(#glareSweep)" strokeWidth="2" fill="none" opacity="0.8" />

            {/* Right Free-floating Lens */}
            <rect x="178" y="44" width="84" height="48" rx="14" fill={lensTint} stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
            <rect x="180" y="46" width="80" height="44" rx="12" fill={`url(#lensReflection-${shape})`} opacity="0.5" />
            <path d="M 190 52 Q 225 48 252 58" stroke="url(#glareSweep)" strokeWidth="2" fill="none" opacity="0.8" />

            {/* Micro Titanium Bridge bolted to lenses */}
            <path d="M 142 64 C 148 58, 172 58, 178 64" stroke={rimStroke} strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Precision Micro Mounting Screws / Grommets */}
            <circle cx="62" cy="65" r="2" fill={rimStroke} />
            <circle cx="140" cy="64" r="2" fill={rimStroke} />
            <circle cx="180" cy="64" r="2" fill={rimStroke} />
            <circle cx="258" cy="65" r="2" fill={rimStroke} />

            {/* Silicone Nose Pads */}
            <rect x="145" y="70" width="3" height="10" rx="1.5" fill="#E2E8F0" opacity="0.9" />
            <rect x="172" y="70" width="3" height="10" rx="1.5" fill="#E2E8F0" opacity="0.9" />
          </g>
        )}

        {/* ================= SHAPE: HEXAGONAL ================= */}
        {shape === 'hexagonal' && (
          <g>
            {/* Temples */}
            <path d="M 52 64 Q 25 60 15 48" stroke={templeStroke} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 268 64 Q 295 60 305 48" stroke={templeStroke} strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Left Hexagonal Lens & Rim */}
            <polygon
              points="75,44 125,44 145,68 125,92 75,92 55,68"
              fill={lensTint}
              stroke={`url(#frameGrad-${shape}-${color.name})`}
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path d="M 75 52 Q 105 48 135 58" stroke="url(#glareSweep)" strokeWidth="2.5" fill="none" opacity="0.75" />

            {/* Right Hexagonal Lens & Rim */}
            <polygon
              points="195,44 245,44 265,68 245,92 195,92 175,68"
              fill={lensTint}
              stroke={`url(#frameGrad-${shape}-${color.name})`}
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path d="M 195 52 Q 225 48 255 58" stroke="url(#glareSweep)" strokeWidth="2.5" fill="none" opacity="0.75" />

            {/* Sculpted Bridge */}
            <path d="M 145 68 C 150 60, 170 60, 175 68" stroke={`url(#frameGrad-${shape}-${color.name})`} strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <circle cx="149" cy="74" r="2.5" fill="#CBD5E1" />
            <circle cx="171" cy="74" r="2.5" fill="#CBD5E1" />
          </g>
        )}

        {/* ================= SHAPE: CAT-EYE ================= */}
        {shape === 'cat-eye' && (
          <g>
            {/* Upturned Temples */}
            <path d="M 45 46 Q 22 40 14 30" stroke={templeStroke} strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M 275 46 Q 298 40 306 30" stroke={templeStroke} strokeWidth="3.5" fill="none" strokeLinecap="round" />

            {/* Left Sculpted Cat-Eye */}
            <path
              d="M 45 46 Q 80 44 140 54 Q 135 88 100 90 Q 56 90 45 46 Z"
              fill={lensTint}
              stroke={`url(#frameGrad-${shape}-${color.name})`}
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path d="M 58 50 Q 95 48 128 58" stroke="url(#glareSweep)" strokeWidth="2.5" fill="none" opacity="0.8" />

            {/* Right Sculpted Cat-Eye */}
            <path
              d="M 275 46 Q 240 44 180 54 Q 185 88 220 90 Q 264 90 275 46 Z"
              fill={lensTint}
              stroke={`url(#frameGrad-${shape}-${color.name})`}
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path d="M 262 50 Q 225 48 192 58" stroke="url(#glareSweep)" strokeWidth="2.5" fill="none" opacity="0.8" />

            {/* Arched Bridge */}
            <path d="M 140 54 C 146 50, 174 50, 180 54" stroke={`url(#frameGrad-${shape}-${color.name})`} strokeWidth="4.5" fill="none" strokeLinecap="round" />
          </g>
        )}

        {/* ================= SHAPE: RECTANGLE ================= */}
        {(shape === 'rectangle' || !shape) && (
          <g>
            {/* Sleek Temples */}
            <path d="M 50 62 Q 22 58 12 45" stroke={templeStroke} strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 270 62 Q 298 58 308 45" stroke={templeStroke} strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Left Rounded Rectangle */}
            <rect
              x="52"
              y="46"
              width="88"
              height="44"
              rx="8"
              fill={lensTint}
              stroke={`url(#frameGrad-${shape}-${color.name})`}
              strokeWidth="4"
            />
            <path d="M 62 52 Q 100 48 130 58" stroke="url(#glareSweep)" strokeWidth="2.5" fill="none" opacity="0.75" />

            {/* Right Rounded Rectangle */}
            <rect
              x="180"
              y="46"
              width="88"
              height="44"
              rx="8"
              fill={lensTint}
              stroke={`url(#frameGrad-${shape}-${color.name})`}
              strokeWidth="4"
            />
            <path d="M 190 52 Q 228 48 258 58" stroke="url(#glareSweep)" strokeWidth="2.5" fill="none" opacity="0.75" />

            {/* Central Bridge */}
            <path d="M 140 62 C 146 56, 174 56, 180 62" stroke={`url(#frameGrad-${shape}-${color.name})`} strokeWidth="4" fill="none" strokeLinecap="round" />
            <rect x="144" y="68" width="3" height="9" rx="1.5" fill="#CBD5E1" />
            <rect x="173" y="68" width="3" height="9" rx="1.5" fill="#CBD5E1" />
          </g>
        )}
      </svg>
    </div>
  );
};
