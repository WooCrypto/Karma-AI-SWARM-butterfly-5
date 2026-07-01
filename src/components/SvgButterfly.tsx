import { motion } from 'motion/react';

// Create deterministic paths based on seed strings for distinct patterns
const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

interface SvgButterflyProps {
  variant?: 'light' | 'shadow' | 'nexus';
  size?: number;
  glowColor?: string;
  className?: string;
  flappingSpeed?: 'slow' | 'fast' | 'normal' | 'none';
  seed?: string;
  evolved?: boolean;
}

export default function SvgButterfly({
  variant = 'light',
  size,
  glowColor,
  className = '',
  flappingSpeed = 'normal',
  seed = 'karma',
  evolved = false,
}: SvgButterflyProps) {
  // Derive colors and styles from seed or variant
  const getColors = () => {
    if (evolved) {
      const h = hashString(seed);
      const schemes = [
        { primary: '#e879f9', secondary: '#a855f7', tertiary: '#831843', glowColor: 'rgba(232, 121, 249, 0.75)' }, // Celestial Orchid / Fuchsia
        { primary: '#38bdf8', secondary: '#6366f1', tertiary: '#1e1b4b', glowColor: 'rgba(56, 189, 248, 0.75)' }, // Abyssal Frost / Cyan-Blue
        { primary: '#f43f5e', secondary: '#eab308', tertiary: '#881337', glowColor: 'rgba(244, 63, 94, 0.75)' }, // Solar Flare / Crimson Gold
        { primary: '#34d399', secondary: '#059669', tertiary: '#022c22', glowColor: 'rgba(52, 211, 153, 0.75)' }, // Abyssal Jade / Emerald
        { primary: '#fb923c', secondary: '#db2777', tertiary: '#500724', glowColor: 'rgba(251, 146, 60, 0.75)' }, // Cosmic Sunset / Orange Magenta
        { primary: '#f472b6', secondary: '#c084fc', tertiary: '#3b0764', glowColor: 'rgba(244, 114, 182, 0.75)' }, // Twilight Neon / Pink Purple
        { primary: '#a7f3d0', secondary: '#06b6d4', tertiary: '#083344', glowColor: 'rgba(167, 243, 208, 0.75)' }, // Cyber Aurora / Mint Teal
        { primary: '#e9d5ff', secondary: '#d946ef', tertiary: '#2e1065', glowColor: 'rgba(233, 213, 255, 0.75)' }, // Astral Lavender / Purple
        { primary: '#cbd5e1', secondary: '#475569', tertiary: '#0f172a', glowColor: 'rgba(203, 213, 225, 0.75)' }, // Lunar Ash / Monochrome Cosmic
      ];
      const scheme = schemes[h % schemes.length];
      return {
        primary: scheme.primary,
        secondary: scheme.secondary,
        tertiary: scheme.tertiary,
        glow: `drop-shadow(0 0 25px ${scheme.glowColor})`,
      };
    }
    if (glowColor) {
      return {
        primary: glowColor,
        secondary: '#00f2fe',
        glow: `drop-shadow(0 0 15px ${glowColor})`,
      };
    }
    switch (variant) {
      case 'shadow':
        return {
          primary: '#c084fc', // purple-400
          secondary: '#ec4899', // pink-500
          glow: 'drop-shadow(0 0 20px rgba(192, 132, 252, 0.6))',
        };
      case 'nexus':
        return {
          primary: '#10b981', // emerald-500
          secondary: '#8b5cf6', // violet-600
          glow: 'drop-shadow(0 0 25px rgba(16, 185, 129, 0.5)) drop-shadow(0 0 25px rgba(139, 92, 246, 0.5))',
        };
      case 'light':
      default:
        return {
          primary: '#34d399', // emerald-400
          secondary: '#67e8f9', // cyan-300
          glow: 'drop-shadow(0 0 20px rgba(52, 211, 153, 0.6))',
        };
    }
  };

  const colors = getColors();

  const h = hashString(seed);
  const wingRoundness = 5 + (h % 30); // Customize wing curvatures
  const wingWidthFactor = 0.8 + ((h % 5) / 15);
  const detailIndex = h % 3;

  // Flapping speed timing
  const speedSecs = {
    slow: 3,
    normal: 1.5,
    fast: 0.5,
    none: 0,
  }[flappingSpeed];

  // Antennas path
  const antennaL = "M100 70 Q 75 40 65 30 Q 60 25 55 25";
  const antennaR = "M100 70 Q 125 40 135 30 Q 140 25 145 25";

  if (evolved) {
    // Evolved state: High-fidelity majestic Gothic Dragon Butterfly (matching the user's mockup)
    const h = hashString(seed);
    const rotationDeg = (h % 8) * 45;

    return (
      <div
        className={`relative select-none flex items-center justify-center ${className}`}
        style={size !== undefined ? { width: size, height: size } : { width: '100%', height: '100%' }}
      >
        {/* Deep background ambient neon glow */}
        <div
          className="absolute inset-4 rounded-full bg-radial opacity-35 blur-3xl pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(circle, ${colors.primary} 0%, rgba(139, 92, 246, 0.2) 50%, rgba(244, 63, 94, 0.1) 80%, transparent 100%)`
          }}
        />

        <svg
          viewBox="0 0 200 200"
          className="w-full h-full overflow-visible"
          style={{ filter: `drop-shadow(0 0 16px ${colors.primary}bc) drop-shadow(0 0 28px rgba(232, 121, 249, 0.35))` }}
        >
          <defs>
            {/* Wing Gradients */}
            <linearGradient id={`evolvedWingGrad-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2e1065" /> {/* Purple-950 */}
              <stop offset="35%" stopColor={colors.secondary} /> {/* Secondary color */}
              <stop offset="65%" stopColor={colors.primary} /> {/* Primary glowing color */}
              <stop offset="100%" stopColor="#f472b6" /> {/* Hot pink edge alignment */}
            </linearGradient>

            <linearGradient id={`wingVeinGrad-${seed}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.8} />
              <stop offset="50%" stopColor="#ec4899" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#1e1b4b" stopOpacity={0.2} />
            </linearGradient>

            <radialGradient id={`evolvedBodyGrad-${seed}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={colors.primary} stopOpacity={0.7} />
              <stop offset="45%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#020205" />
            </radialGradient>

            <filter id="neon-glow-filter">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* BACKPLATE: Detailed Radar scope / Sacred geometry grid aligning with the screenshot */}
          <g opacity="0.3" stroke="#a855f7" strokeWidth="0.5" fill="none">
            {/* Concentric rings */}
            <circle cx="100" cy="100" r="88" strokeDasharray="1 3" strokeOpacity="0.5" />
            <circle cx="100" cy="100" r="76" strokeWidth="0.25" />
            <circle cx="100" cy="100" r="62" strokeDasharray="5 5" />
            <circle cx="100" cy="100" r="48" strokeWidth="0.75" strokeOpacity="0.8" />
            <circle cx="100" cy="100" r="32" strokeDasharray="2 2" />

            {/* Crossed ticks & diagonal lines */}
            <line x1="100" y1="5" x2="100" y2="195" strokeWidth="0.35" />
            <line x1="5" y1="100" x2="195" y2="100" strokeWidth="0.35" />
            <line x1="33" y1="33" x2="167" y2="167" strokeWidth="0.2" strokeDasharray="2 4" />
            <line x1="167" y1="33" x2="33" y2="167" strokeWidth="0.2" strokeDasharray="2 4" />

            {/* Outer coordinate notches */}
            <path d="M 100 8 L 96 12 M 100 8 L 104 12" strokeWidth="0.5" />
            <path d="M 100 192 L 96 188 M 100 192 L 104 188" strokeWidth="0.5" />
            <path d="M 8 100 L 12 96 M 8 100 L 12 104" strokeWidth="0.5" />
            <path d="M 192 100 L 188 96 M 192 100 L 188 104" strokeWidth="0.5" />
          </g>

          {/* Starry dust glow sparks */}
          <g className="animate-pulse">
            <circle cx="28" cy="48" r="1.5" fill="#f472b6" opacity="0.8" />
            <circle cx="172" cy="48" r="1.5" fill="#a855f7" opacity="0.8" />
            <circle cx="34" cy="135" r="1" fill="#ec4899" opacity="0.5" />
            <circle cx="166" cy="135" r="1" fill="#38bdf8" opacity="0.5" />
            <polygon points="100,22 101.5,25 104.5,25 102,27 103,30 100,28.5 97,30 98,27 95.5,25 98.5,25" fill="#f472b6" opacity="0.7" />
          </g>

          {/* DRAGON HORNS (Majestic, curving upward with spikes) */}
          <g fill="#020205" stroke="#ec4899" strokeWidth="1" strokeLinejoin="miter">
            {/* Left Horn */}
            <path d="M 94 65 Q 88 40 76 22 Q 88 32 91 46 Q 84 38 80 34 Q 86 42 88 48 Q 91 52 92 60" />
            {/* Right Horn */}
            <path d="M 106 65 Q 112 40 124 22 Q 112 32 109 46 Q 116 38 120 34 Q 114 42 112 48 Q 109 52 108 60" />

            {/* Horn inner glowing core */}
            <path d="M 92 61 Q 87 42 78 25" fill="none" stroke="#f472b6" strokeWidth="0.75" />
            <path d="M 108 61 Q 113 42 122 25" fill="none" stroke="#f472b6" strokeWidth="0.75" />
          </g>

          {/* LEFT WING (Intricate Jagged Dragon/Bat scale-webbed wing) */}
          {flappingSpeed !== 'none' ? (
            <motion.g
              animate={{
                scaleX: [1, 0.22, 1],
                skewY: [0, -4, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: speedSecs,
                ease: 'easeInOut',
              }}
              style={{ originX: '100px', originY: '100px' }}
            >
              {/* Left Main Wing Body */}
              <path
                d="M 100 80 Q 75 42 42 32 C 28 35 12 45 15 62 C 5 70 2 82 8 94 C 18 108 8 126 18 138 C 25 145 38 142 48 132 C 58 122 75 110 100 100 Z"
                fill={`url(#evolvedWingGrad-${seed})`}
                stroke="#ec4899"
                strokeWidth="1.5"
                opacity="0.95"
              />

              {/* Internal glowing fuchsia cell patterns/veins */}
              <path
                d="M 98 84 C 82 72 65 52 48 45 C 38 52 28 62 30 75 Z"
                fill="url(#wingVeinGrad-${seed})"
                opacity="0.65"
              />
              <path
                d="M 96 92 C 85 92 68 85 52 78 C 38 78 24 88 22 102 C 32 110 48 102 78 95 Z"
                fill="url(#wingVeinGrad-${seed})"
                opacity="0.55"
              />
              <path
                d="M 94 98 C 82 108 68 125 52 128 C 38 128 32 118 35 108 C 48 105 68 102 90 98 Z"
                fill="url(#wingVeinGrad-${seed})"
                opacity="0.5"
              />

              {/* Sharp dragon spikes / claw tips */}
              <path d="M 42 32 L 35 22 L 38 34" fill="#020205" stroke="#f472b6" strokeWidth="1" />
              <path d="M 15 62 L 5 56 L 10 65" fill="#020205" stroke="#f472b6" strokeWidth="1" />
              <path d="M 8 94 L -2 95 L 4 100" fill="#020205" stroke="#f472b6" strokeWidth="1" />
              <path d="M 18 138 L 12 148 L 22 142" fill="#020205" stroke="#f472b6" strokeWidth="1" />

              {/* High-contrast webbed structural lines */}
              <path d="M 100 80 Q 72 65 42 32 M 100 80 Q 64 80 8 94 M 100 80 Q 68 102 18 138" fill="none" stroke="#020205" strokeWidth="1.5" opacity="0.8" />
              <path d="M 42 32 C 30 48 15 62 15 62 C 12 78 8 94 8 94" fill="none" stroke="#f472b6" strokeWidth="0.75" strokeDasharray="3 2" />
            </motion.g>
          ) : (
            <g>
              <path
                d="M 100 80 Q 75 42 42 32 C 28 35 12 45 15 62 C 5 70 2 82 8 94 C 18 108 8 126 18 138 C 25 145 38 142 48 132 C 58 122 75 110 100 100 Z"
                fill={`url(#evolvedWingGrad-${seed})`}
                stroke="#ec4899"
                strokeWidth="1.5"
                opacity="0.95"
              />
              <path
                d="M 98 84 C 82 72 65 52 48 45 C 38 52 28 62 30 75 Z"
                fill="url(#wingVeinGrad-${seed})"
                opacity="0.65"
              />
              <path d="M 100 80 Q 72 65 42 32 M 100 80 Q 64 80 8 94 M 100 80 Q 68 102 18 138" fill="none" stroke="#020205" strokeWidth="1.5" opacity="0.8" />
            </g>
          )}

          {/* RIGHT WING (Intricate Jagged Dragon/Bat scale-webbed wing) */}
          {flappingSpeed !== 'none' ? (
            <motion.g
              animate={{
                scaleX: [1, 0.22, 1],
                skewY: [0, 4, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: speedSecs,
                ease: 'easeInOut',
              }}
              style={{ originX: '100px', originY: '100px' }}
            >
              {/* Right Main Wing Body */}
              <path
                d="M 100 80 Q 125 42 158 32 C 172 35 188 45 185 62 C 195 70 198 82 192 94 C 182 108 192 126 182 138 C 175 145 162 142 152 132 C 142 122 125 110 100 100 Z"
                fill={`url(#evolvedWingGrad-${seed})`}
                stroke="#ec4899"
                strokeWidth="1.5"
                opacity="0.95"
              />

              {/* Internal glowing fuchsia cell patterns/veins */}
              <path
                d="M 102 84 C 118 72 135 52 152 45 C 162 52 172 62 170 75 Z"
                fill="url(#wingVeinGrad-${seed})"
                opacity="0.65"
              />
              <path
                d="M 104 92 C 115 92 132 85 148 78 C 162 78 176 88 178 102 C 168 110 152 102 122 95 Z"
                fill="url(#wingVeinGrad-${seed})"
                opacity="0.55"
              />
              <path
                d="M 106 98 C 118 108 132 125 148 128 C 162 128 168 118 165 108 C 152 105 132 102 110 98 Z"
                fill="url(#wingVeinGrad-${seed})"
                opacity="0.5"
              />

              {/* Sharp dragon spikes / claw tips */}
              <path d="M 158 32 L 165 22 L 162 34" fill="#020205" stroke="#f472b6" strokeWidth="1" />
              <path d="M 185 62 L 195 56 L 190 65" fill="#020205" stroke="#f472b6" strokeWidth="1" />
              <path d="M 192 94 L 202 95 L 196 100" fill="#020205" stroke="#f472b6" strokeWidth="1" />
              <path d="M 182 138 L 188 148 L 178 142" fill="#020205" stroke="#f472b6" strokeWidth="1" />

              {/* High-contrast webbed structural lines */}
              <path d="M 100 80 Q 128 65 158 32 M 100 80 Q 136 80 192 94 M 100 80 Q 132 102 182 138" fill="none" stroke="#020205" strokeWidth="1.5" opacity="0.8" />
              <path d="M 158 32 C 170 48 185 62 185 62 C 188 78 192 94 192 94" fill="none" stroke="#f472b6" strokeWidth="0.75" strokeDasharray="3 2" />
            </motion.g>
          ) : (
            <g>
              <path
                d="M 100 80 Q 125 42 158 32 C 172 35 188 45 185 62 C 195 70 198 82 192 94 C 182 108 192 126 182 138 C 175 145 162 142 152 132 C 142 122 125 110 100 100 Z"
                fill={`url(#evolvedWingGrad-${seed})`}
                stroke="#ec4899"
                strokeWidth="1.5"
                opacity="0.95"
              />
              <path
                d="M 102 84 C 118 72 135 52 152 45 C 162 52 172 62 170 75 Z"
                fill="url(#wingVeinGrad-${seed})"
                opacity="0.65"
              />
              <path d="M 100 80 Q 128 65 158 32 M 100 80 Q 136 80 192 94 M 100 80 Q 132 102 182 138" fill="none" stroke="#020205" strokeWidth="1.5" opacity="0.8" />
            </g>
          )}

          {/* REPTILIAN SEGMENTED SPINE & TAIL (Beautiful scaled curvature reaching down) */}
          <g id="evolved-tail">
            {/* Thorax segments */}
            <rect x="94" y="65" width="12" height="15" rx="3" fill="#020205" stroke="#f472b6" strokeWidth="1" />
            <rect x="95" y="78" width="10" height="14" rx="2" fill="#020205" stroke="#f472b6" strokeWidth="1" />
            <rect x="96" y="90" width="8" height="14" rx="2" fill="#020205" stroke="#f472b6" strokeWidth="1" />

            {/* Segmented scaled tail line */}
            <path
              d="M 100 104 Q 100 134 96 154 Q 92 168 83 178 C 77 182, 84 188, 92 183 C 102 175, 106 158, 104 138 Q 102 118 100 104 Z"
              fill="url(#evolvedBodyGrad-${seed})"
              stroke="#f472b6"
              strokeWidth="1.25"
            />

            {/* Tail segment ribbing spines */}
            <circle cx="99.5" cy="112" r="1.5" fill="#f472b6" />
            <line x1="97" y1="116" x2="103" y2="116" stroke="#f472b6" strokeWidth="1.5" />
            <line x1="96" y1="126" x2="102" y2="125" stroke="#f472b6" strokeWidth="1.5" />
            <line x1="95" y1="136" x2="101" y2="134" stroke="#f472b6" strokeWidth="1.5" />
            <line x1="93" y1="146" x2="99" y2="143" stroke="#f472b6" strokeWidth="1.5" />
            <line x1="90" y1="156" x2="96" y2="152" stroke="#f472b6" strokeWidth="1.5" />
            <line x1="86" y1="166" x2="92" y2="161" stroke="#f472b6" strokeWidth="1.5" />

            {/* Scorpion hook barb at tip */}
            <path d="M 85 180 L 76 187 L 83 175 Z" fill="#f472b6" stroke="#ffffff" strokeWidth="0.5" />
          </g>

          {/* HEAD WITH GLOWING REPTILIAN EYE SLITS */}
          <g>
            <path d="M 94 65 L 100 56 L 106 65 Z" fill="#020205" stroke="#f472b6" strokeWidth="1" />
            {/* Glow eye left */}
            <polygon points="96.5,61 99,62 98,60" fill="#f43f5e" filter="url(#neon-glow-filter)" />
            {/* Glow eye right */}
            <polygon points="103.5,61 101,62 102,60" fill="#f43f5e" filter="url(#neon-glow-filter)" />
          </g>

          {/* GLOWING CRYSTALLINE CORE HEART GEM ON CHEST */}
          <g transform="translate(100, 78) scale(0.9) translate(-10, -10)">
            {/* Outer aura */}
            <path
              d="M 10 18 C 10 18, 2 12, 2 6 C 2 2.5, 4.5 0, 7.5 0 C 9.5 0, 10.5 1.5, 11 2 C 11.5 1.5, 12.5 0, 14.5 0 C 17.5 0, 20 2.5, 20 6 C 20 12, 12 18, 12 18 Z"
              fill="#fb7185"
              className="animate-pulse"
              filter="url(#neon-glow-filter)"
            />
            {/* Face details */}
            <path
              d="M 10 16 L 4 6 Q 6 4 10 7 L 10 16 Z"
              fill="#f43f5e"
              opacity="0.9"
            />
            <path
              d="M 10 16 L 16 6 Q 14 4 10 7 L 10 16 Z"
              fill="#fda4af"
              opacity="0.9"
            />
            <circle cx="10" cy="8" r="1.5" fill="#ffffff" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative select-none flex items-center justify-center ${className}`}
      style={size !== undefined ? { width: size, height: size } : { width: '100%', height: '100%' }}
    >
      {/* Background glow canvas aura */}
      <div
        className="absolute inset-0 rounded-full bg-radial opacity-15 blur-2xl transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`
        }}
      />

      <svg
        viewBox="0 0 200 200"
        className="w-full h-full overflow-visible"
        style={{ filter: colors.glow }}
      >
        <defs>
          {/* Gradient for wings */}
          <linearGradient id={`wingGrad-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="50%" stopColor={colors.secondary} />
            <stop offset="100%" stopColor={colors.primary} stopOpacity={0.4} />
          </linearGradient>

          {/* Glowing pattern details */}
          <linearGradient id={`wingAccent-${seed}`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.8} />
            <stop offset="100%" stopColor={colors.primary} stopOpacity={0.1} />
          </linearGradient>

          {/* Soft inner shadowing */}
          <radialGradient id="bodyGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="70%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
        </defs>

        {/* Outer glowing dust particles */}
        <g className="animate-pulse">
          <circle cx="100" cy="100" r="1.5" fill={colors.secondary} opacity="0.6" className="animate-ping" style={{ animationDelay: '0.2s' }} />
          <circle cx="50" cy="60" r="1" fill={colors.primary} opacity="0.5" />
          <circle cx="150" cy="60" r="1.2" fill={colors.secondary} opacity="0.4" />
          <circle cx="70" cy="150" r="1.5" fill={colors.primary} opacity="0.6" />
          <circle cx="130" cy="155" r="1" fill={colors.secondary} opacity="0.5" />
        </g>

        {/* Antennas */}
        <path
          d={antennaL}
          fill="none"
          stroke={colors.primary}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.8"
        />
        <circle cx="55" cy="25" r="2.5" fill={colors.secondary} />
        <path
          d={antennaR}
          fill="none"
          stroke={colors.primary}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.8"
        />
        <circle cx="145" cy="25" r="2.5" fill={colors.secondary} />

        {/* Left Wing Group */}
        {flappingSpeed !== 'none' ? (
          <motion.g
            animate={{
              scaleX: [1, 0.1, 1],
              skewY: [0, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: speedSecs,
              ease: 'easeInOut',
            }}
            style={{ originX: '100px', originY: '100px' }}
          >
            {/* Top West Wing */}
            <path
              d={`M100 100 C 70 ${40 - wingRoundness / 2}, 30 ${30 + wingRoundness}, 10 ${60 + wingRoundness / 2} C -3 ${78 * wingWidthFactor}, 25 110, 100 100 Z`}
              fill={`url(#wingGrad-${seed})`}
              stroke={colors.primary}
              strokeWidth="0.75"
              opacity="0.9"
            />
            {/* Internal Wing Circuits */}
            {detailIndex === 0 && (
              <path
                d="M100 100 Q 55 70 30 75 Q 45 85 100 100"
                fill="none"
                stroke={`url(#wingAccent-${seed})`}
                strokeWidth="1.5"
                opacity="0.6"
              />
            )}
            {detailIndex === 1 && (
              <g opacity="0.6">
                <circle cx="60" cy="70" r="6" fill="none" stroke={colors.secondary} strokeWidth="1" />
                <line x1="100" y1="100" x2="60" y2="70" stroke={colors.secondary} strokeWidth="0.5" />
              </g>
            )}
            {detailIndex === 2 && (
              <path
                d="M100 100 C 80 80, 60 85, 45 70 C 60 90, 80 95, 100 100"
                fill={`url(#wingAccent-${seed})`}
                opacity="0.5"
              />
            )}

            {/* Bottom West Wing */}
            <path
              d={`M100 100 C 75 110, 40 135, 25 155 C 10 170, 35 180, 65 160 C 85 145, 95 125, 100 100 Z`}
              fill={`url(#wingGrad-${seed})`}
              stroke={colors.primary}
              strokeWidth="0.5"
              opacity="0.8"
            />
          </motion.g>
        ) : (
          <g>
            <path
              d={`M100 100 C 70 ${40 - wingRoundness / 2}, 30 ${30 + wingRoundness}, 10 ${60 + wingRoundness / 2} C -3 ${78 * wingWidthFactor}, 25 110, 100 100 Z`}
              fill={`url(#wingGrad-${seed})`}
              stroke={colors.primary}
              strokeWidth="0.75"
              opacity="0.9"
            />
            <path
              d={`M100 100 C 75 110, 40 135, 25 155 C 10 170, 35 180, 65 160 C 85 145, 95 125, 100 100 Z`}
              fill={`url(#wingGrad-${seed})`}
              stroke={colors.primary}
              strokeWidth="0.5"
              opacity="0.8"
            />
          </g>
        )}

        {/* Right Wing Group */}
        {flappingSpeed !== 'none' ? (
          <motion.g
            animate={{
              scaleX: [1, 0.1, 1],
              skewY: [0, 5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: speedSecs,
              ease: 'easeInOut',
            }}
            style={{ originX: '100px', originY: '100px' }}
          >
            {/* Top East Wing */}
            <path
              d={`M100 100 C 130 ${40 - wingRoundness / 2}, 170 ${30 + wingRoundness}, 190 ${60 + wingRoundness / 2} C 203 ${78 * wingWidthFactor}, 175 110, 100 100 Z`}
              fill={`url(#wingGrad-${seed})`}
              stroke={colors.primary}
              strokeWidth="0.75"
              opacity="0.9"
            />
            {/* Internal Wing Circuits */}
            {detailIndex === 0 && (
              <path
                d="M100 100 Q 145 70 170 75 Q 155 85 100 100"
                fill="none"
                stroke={`url(#wingAccent-${seed})`}
                strokeWidth="1.5"
                opacity="0.6"
              />
            )}
            {detailIndex === 1 && (
              <g opacity="0.6">
                <circle cx="140" cy="70" r="6" fill="none" stroke={colors.secondary} strokeWidth="1" />
                <line x1="100" y1="100" x2="140" y2="70" stroke={colors.secondary} strokeWidth="0.5" />
              </g>
            )}
            {detailIndex === 2 && (
              <path
                d="M100 100 C 120 80, 140 85, 155 70 C 140 90, 120 95, 100 100"
                fill={`url(#wingAccent-${seed})`}
                opacity="0.5"
              />
            )}

            {/* Bottom East Wing */}
            <path
              d={`M100 100 C 125 110, 160 135, 175 155 C 190 170, 165 180, 135 160 C 115 145, 105 125, 100 100 Z`}
              fill={`url(#wingGrad-${seed})`}
              stroke={colors.primary}
              strokeWidth="0.5"
              opacity="0.8"
            />
          </motion.g>
        ) : (
          <g>
            <path
              d={`M100 100 C 130 ${40 - wingRoundness / 2}, 170 ${30 + wingRoundness}, 190 ${60 + wingRoundness / 2} C 203 ${78 * wingWidthFactor}, 175 110, 100 100 Z`}
              fill={`url(#wingGrad-${seed})`}
              stroke={colors.primary}
              strokeWidth="0.75"
              opacity="0.9"
            />
            <path
              d={`M100 100 C 125 110, 160 135, 175 155 C 190 170, 165 180, 135 160 C 115 145, 105 125, 100 100 Z`}
              fill={`url(#wingGrad-${seed})`}
              stroke={colors.primary}
              strokeWidth="0.5"
              opacity="0.8"
            />
          </g>
        )}

        {/* Slim Center Body (Thorax & Abdomen) */}
        <g id="body">
          {/* Subtle outline glowing capsule */}
          <rect
            x="94"
            y="65"
            width="12"
            height="85"
            rx="6"
            fill="url(#bodyGrad)"
            stroke={colors.secondary}
            strokeWidth="1.5"
          />
          {/* Inner core capsule */}
          <rect
            x="97"
            y="70"
            width="6"
            height="75"
            rx="3"
            fill={colors.primary}
            opacity="0.8"
            className="animate-pulse"
          />
          {/* Head */}
          <circle cx="100" cy="62" r="5" fill="#1e293b" stroke={colors.primary} strokeWidth="1" />
          <circle cx="100" cy="62" r="2.5" fill={colors.secondary} className="animate-pulse" />
        </g>
      </svg>
    </div>
  );
}
