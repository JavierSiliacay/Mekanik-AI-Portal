import React from "react";

interface MekanikLogoProps {
  className?: string;
}

export default function MekanikLogo({ className = "w-9 h-9" }: MekanikLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Glow and Shadow Filters for cyber/mechanical theme */}
        <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="shadow-filter" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodOpacity="0.5" />
        </filter>
        <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06321a" />
          <stop offset="50%" stopColor="#084223" />
          <stop offset="100%" stopColor="#031e0f" />
        </linearGradient>
      </defs>

      {/* 1. Green Robot Shield Backplane */}
      <path
        d="M48,15 L72,15 C82,15 88,18 92,25 C95,30 96,38 96,44 C104,46 108,52 108,60 C108,68 104,74 96,76 C96,82 95,90 92,95 C88,102 82,105 72,105 L48,105 C38,105 32,102 28,95 C25,90 24,82 24,76 C16,74 12,68 12,60 C12,52 16,46 24,44 C24,38 25,30 28,25 C32,18 38,15 48,15 Z"
        fill="url(#shield-grad)"
        stroke="#39FF14"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#neon-glow)"
      />

      {/* 2. Highlight/Inner Border on Green Shield */}
      <path
        d="M50,19 L70,19 C78,19 83,21 86,27 C88,31 89,37 89,43 M31,27 C34,21 39,19 47,19"
        stroke="#39FF14"
        strokeWidth="1"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />

      {/* 3. Left Symmetrical White Loop ("q") */}
      <rect
        x="30"
        y="42"
        width="16"
        height="28"
        rx="8"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#shadow-filter)"
      />
      {/* Downward connector/detail to complete "q" feel style */}
      <path
        d="M46,54 V72 C46,75 44,77 41,77"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 4. Right Symmetrical White Loop ("p") */}
      <rect
        x="74"
        y="42"
        width="16"
        height="28"
        rx="8"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#shadow-filter)"
      />
      {/* Downward connector/detail to complete "p" feel style */}
      <path
        d="M74,54 V72 C74,75 76,77 79,77"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 5. Central Vertical Wrench Overlay (Solid Black) */}
      <g filter="url(#shadow-filter)">
        {/* Top Round Head */}
        <circle cx="60" cy="27" r="13" fill="#0c0d10" stroke="#1d2026" strokeWidth="1" />
        
        {/* Vertical Handle */}
        <rect x="54.5" y="27" width="11" height="58" rx="2" fill="#0c0d10" stroke="#1d2026" strokeWidth="1" />
        
        {/* Bottom Round Fork Head (Open End Wrench) */}
        <circle cx="60" cy="85" r="16" fill="#0c0d10" stroke="#1d2026" strokeWidth="1" />
      </g>

      {/* 6. Wrench Internal Details / Scribing (White/Green Accents) */}
      {/* Hexagon Hollow cut-out in top Head */}
      <polygon
        points="60,21 65.2,24 65.2,30 60,33 54.8,30 54.8,24"
        fill="#FFFFFF"
      />

      {/* Hexagon inset outline */}
      <polygon
        points="60,22 64,24.3 64,28.7 60,31 56,28.7 56,24.3"
        fill="#0c0d10"
      />

      {/* Vertical center highlight scribe line inside wrench handle */}
      <line
        x1="60"
        y1="37"
        x2="60"
        y2="71"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.9"
      />

      {/* Sleek thin carbon lines inside wrench handle */}
      <line
        x1="57.5"
        y1="42"
        x2="57.5"
        y2="66"
        stroke="#39FF14"
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />
      <line
        x1="62.5"
        y1="42"
        x2="62.5"
        y2="66"
        stroke="#39FF14"
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />

      {/* 7. Bottom Jaw Wrench Cutout (U-Shape Jaw Fork Open End) */}
      {/* The background is url(#shield-grad), so drawing the jaw matching the shield background fill perfectly creates the negative space cut-out! */}
      <path
        d="M51,88 C51,80 69,80 69,88 L64,103 L56,103 Z"
        fill="url(#shield-grad)"
        stroke="#1d2026"
        strokeWidth="0.5"
      />
      {/* Give the cutout jaw a nice smooth inner white boundary edge to pop */}
      <path
        d="M51,91 C53.5,82 66.5,82 69,91"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
