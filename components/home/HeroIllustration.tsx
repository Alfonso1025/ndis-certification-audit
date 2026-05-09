"use client";

export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="hi-title hi-desc"
      className="w-full h-full"
    >
      <title id="hi-title">Home care illustration</title>
      <desc id="hi-desc">
        A stylised home interior. A large window lets in warm sunlight. On a
        table below sit a cup of tea and a care document. A small leafy plant
        stands to the right.
      </desc>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .hi-ray {
            animation: hiRayPulse 4s ease-in-out infinite;
          }
        }
        @keyframes hiRayPulse {
          0%, 100% { opacity: 0.15; }
          50%       { opacity: 0.25; }
        }
      `}</style>

      {/* ── Back wall — barely-there plane to read against the hero bg ─── */}
      <rect width="480" height="265" fill="rgba(255,255,255,0.035)" />

      {/* ── Light rays (animated) ─────────────────────────────────────── */}
      <g className="hi-ray">
        <polygon points="143,118  480,-15  480,90"  fill="#FDE68A" />
        <polygon points="143,118  480,90   480,200" fill="#FDE68A" />
        <polygon points="143,118  480,200  480,295" fill="#FDE68A" />
        <polygon points="143,118  480,295  355,360" fill="#FDE68A" />
      </g>

      {/* ── Window ──────────────────────────────────────────────────────── */}
      {/* Frame body */}
      <rect x="40" y="22" width="207" height="193" rx="4" fill="#1A2E50" />
      {/* Frame border */}
      <rect x="40" y="22" width="207" height="193" rx="4" fill="none"
            stroke="rgba(255,255,255,0.42)" strokeWidth="5" />

      {/* Glass panes */}
      <rect x="47"  y="29"  width="90" height="88" rx="2" fill="rgba(180,215,255,0.17)" />
      <rect x="147" y="29"  width="93" height="88" rx="2" fill="rgba(180,215,255,0.17)" />
      <rect x="47"  y="124" width="90" height="85" rx="2" fill="rgba(180,215,255,0.12)" />
      <rect x="147" y="124" width="93" height="85" rx="2" fill="rgba(180,215,255,0.12)" />

      {/* Crossbars */}
      <rect x="139" y="22"  width="8"   height="193" fill="#1A2E50" />
      <rect x="40"  y="117" width="207" height="9"   fill="#1A2E50" />

      {/* Pane light streaks */}
      <rect x="47"  y="29" width="12" height="88" rx="2" fill="rgba(255,255,255,0.06)" />
      <rect x="147" y="29" width="12" height="88" rx="2" fill="rgba(255,255,255,0.06)" />

      {/* Sill */}
      <rect x="32" y="212" width="224" height="10" rx="3" fill="rgba(255,255,255,0.24)" />

      {/* ── Floor / table divider ────────────────────────────────────── */}
      <rect y="263" width="480" height="2" fill="rgba(255,255,255,0.09)" />

      {/* ── Table ────────────────────────────────────────────────────── */}
      <rect y="265" width="480" height="95" fill="#17294A" />
      {/* Top-edge highlight */}
      <rect y="265" width="480" height="7"  fill="rgba(255,255,255,0.09)" />

      {/* ── Document ─────────────────────────────────────────────────── */}
      <g transform="translate(70,188) rotate(-5)">
        {/* Drop shadow */}
        <rect x="4" y="4" width="108" height="138" rx="3" fill="rgba(0,0,0,0.18)" />
        {/* Paper */}
        <rect width="108" height="138" rx="3" fill="#F5F4EE" />
        {/* Teal header label */}
        <rect x="10" y="12" width="36" height="5" rx="2" fill="#0F6E56" />
        {/* Body lines */}
        <rect x="10" y="28" width="88" height="4" rx="2" fill="rgba(27,58,107,0.22)" />
        <rect x="10" y="38" width="68" height="4" rx="2" fill="rgba(27,58,107,0.14)" />
        <rect x="10" y="48" width="80" height="4" rx="2" fill="rgba(27,58,107,0.14)" />
        <rect x="10" y="58" width="54" height="4" rx="2" fill="rgba(27,58,107,0.14)" />
        <rect x="10" y="74" width="88" height="4" rx="2" fill="rgba(27,58,107,0.14)" />
        <rect x="10" y="84" width="72" height="4" rx="2" fill="rgba(27,58,107,0.14)" />
        <rect x="10" y="94" width="60" height="4" rx="2" fill="rgba(27,58,107,0.14)" />
        {/* Amber signature line */}
        <rect x="10" y="112" width="44" height="5" rx="2" fill="#D97706" opacity="0.7" />
      </g>

      {/* ── Cup ──────────────────────────────────────────────────────── */}
      <g transform="translate(278,212)">
        {/* Steam wisps */}
        <path d="M 12 -2 Q 7 -14 12 -26"  stroke="rgba(255,255,255,0.30)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 21 -4 Q 16 -17 21 -30"  stroke="rgba(255,255,255,0.24)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 30 -2 Q 25 -14 30 -26"  stroke="rgba(255,255,255,0.18)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Cup body */}
        <rect width="48" height="50" rx="5" fill="#D97706" />
        {/* Rim */}
        <ellipse cx="24" cy="0"  rx="24" ry="6"  fill="#B45309" />
        {/* Liquid surface */}
        <ellipse cx="24" cy="0"  rx="21" ry="5"  fill="#92400E" />
        {/* Handle */}
        <path d="M 48 13 Q 66 20 66 31 Q 66 44 48 47"
              stroke="#B45309" strokeWidth="6" fill="none" strokeLinecap="round" />
        {/* Highlight */}
        <rect x="5" y="9" width="6" height="28" rx="3" fill="rgba(255,255,255,0.22)" />
        {/* Saucer */}
        <ellipse cx="24" cy="54" rx="32" ry="5"  fill="rgba(217,119,6,0.38)" />
      </g>

      {/* ── Plant ─────────────────────────────────────────────────────── */}
      <g transform="translate(388,137)">
        {/* Stem */}
        <line x1="26" y1="92" x2="26" y2="24" stroke="#0B4D3C" strokeWidth="4" strokeLinecap="round" />

        {/* Leaves — painted back to front */}
        <ellipse cx="13" cy="74" rx="18" ry="9" fill="#0F6E56" transform="rotate(-38,13,74)" />
        <ellipse cx="39" cy="66" rx="18" ry="9" fill="#0F6E56" transform="rotate(38,39,66)" />
        <ellipse cx="10" cy="54" rx="16" ry="8" fill="#0A5A46" transform="rotate(-30,10,54)" />
        <ellipse cx="42" cy="47" rx="16" ry="8" fill="#0F6E56" transform="rotate(30,42,47)" />
        <ellipse cx="13" cy="36" rx="14" ry="7" fill="#0A5A46" transform="rotate(-22,13,36)" />
        <ellipse cx="39" cy="30" rx="14" ry="7" fill="#0F6E56" transform="rotate(22,39,30)" />
        <ellipse cx="26" cy="20" rx="12" ry="6" fill="#0F6E56" />

        {/* Leaf sheen highlights */}
        <ellipse cx="13" cy="74" rx="5" ry="3" fill="rgba(255,255,255,0.10)" transform="rotate(-38,13,74)" />
        <ellipse cx="39" cy="66" rx="5" ry="3" fill="rgba(255,255,255,0.10)" transform="rotate(38,39,66)" />

        {/* Pot rim */}
        <rect x="5" y="92" width="42" height="8" rx="3" fill="#9D7A1A" />
        {/* Pot body */}
        <path d="M 7 100 L 3 128 L 49 128 L 45 100 Z" fill="#8B6612" />
        {/* Pot highlight */}
        <rect x="9" y="102" width="5" height="22" rx="2" fill="rgba(255,255,255,0.14)" />
        {/* Soil */}
        <ellipse cx="26" cy="100" rx="22" ry="5" fill="#4A3208" />
      </g>

    </svg>
  );
}
