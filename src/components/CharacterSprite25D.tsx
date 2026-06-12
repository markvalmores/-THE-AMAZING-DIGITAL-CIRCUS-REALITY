import React from 'react';

interface SpriteProps {
  id: string;
  avatarColor: string;
  isSelected?: boolean;
  pulsate?: boolean;
  isDeceased?: boolean;
  hasHalo?: boolean;
}

export const CharacterSprite25D: React.FC<SpriteProps> = ({ id, avatarColor, isSelected = false, pulsate = false, isDeceased = false, hasHalo = false }) => {
  const hoverClass = "transition-all duration-300 hover:scale-110";
  const animateBounce = pulsate ? "animate-bounce" : "";

  if (isDeceased) {
    return (
      <div className={`relative w-12 h-14 transition-all duration-300 hover:scale-110 flex flex-col items-center justify-center`} style={{ filter: isSelected ? 'drop-shadow(0 0 10px rgba(255,255,255,0.8))' : 'drop-shadow(0 0 4px rgba(255,255,255,0.15))' }}>
        {/* Memorial Holy Cross / Tombstone */}
        <svg viewBox="0 0 48 56" className="w-10 h-12" shapeRendering="crispEdges">
          {/* Base */}
          <rect x="10" y="48" width="28" height="6" fill="#3a3a3a" stroke="#111" strokeWidth="1.5" />
          <rect x="14" y="44" width="20" height="4" fill="#555555" stroke="#111" strokeWidth="1.5" />
          
          {/* Shaft of the cross */}
          <rect x="21" y="8" width="6" height="36" fill="#777777" stroke="#111" strokeWidth="1.5" />
          {/* Crossbar */}
          <rect x="13" y="18" width="22" height="6" fill="#777777" stroke="#111" strokeWidth="1.5" />
          
          {/* Outer glow or shroud */}
          <rect x="22" y="10" width="4" height="32" fill="#aaaaaa" />
          <rect x="15" y="20" width="18" height="2" fill="#aaaaaa" />

          {/* R.I.P Text representation or little holy aura */}
          <circle cx="24" cy="5" r="2" fill="#ffcc00" className="animate-pulse" />
        </svg>
        <span className="text-[6px] font-mono text-white/50 bg-[#151515] px-1 rounded-sm mt-0.5 uppercase font-bold border border-white/5 tracking-wider">
          RIP
        </span>
      </div>
    );
  }

  const haloElement = hasHalo && (
    <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 w-8 h-2.5 pointer-events-none z-30 animate-pulse">
      <svg viewBox="0 0 32 10" className="w-full h-full">
        {/* Glowing Golden Ring (Halo) */}
        <ellipse cx="16" cy="5" rx="11" ry="3.2" fill="none" stroke="#ffcc00" strokeWidth="2.2" />
        <ellipse cx="16" cy="5" rx="11" ry="3.2" fill="none" stroke="#fff" strokeWidth="0.8" className="opacity-80" />
      </svg>
    </div>
  );

  const renderInner = () => {
    switch (id) {
      case "pomni":
        return (
          <div className={`relative w-12 h-14 ${animateBounce} ${hoverClass}`} style={{ filter: isSelected ? 'drop-shadow(0 0 8px rgba(255,49,49,0.8))' : 'none' }}>
            {/* Pomni - Jester Clown with Red/Blue hat */}
            <svg viewBox="0 0 48 56" className="w-full h-full" shapeRendering="crispEdges">
              {/* Jester Hat - Red Horn */}
              <rect x="8" y="4" width="8" height="6" fill="#000" />
              <rect x="4" y="10" width="8" height="6" fill="#3b82f6" fillOpacity="0.9" /> {/* Blue Left Horn */}
              <rect x="12" y="10" width="10" height="6" fill="#ef4444" fillOpacity="0.9" /> {/* Red Right Horn */}
              <rect x="22" y="10" width="8" height="6" fill="#ef4444" />
              <circle cx="6" cy="13" r="2.5" fill="#facc15" /> {/* Bell */}
              <circle cx="28" cy="13" r="2.5" fill="#facc15" /> {/* Bell */}

              {/* Face Shield */}
              <rect x="10" y="16" width="18" height="18" fill="#ffffff" stroke="#000" strokeWidth="2" />
              
              {/* Big Blue / Red Jester Eyes */}
              <rect x="12" y="20" width="4" height="4" fill="#3b82f6" />
              <rect x="22" y="20" width="4" height="4" fill="#ef4444" />
              <circle cx="14" cy="22" r="1" fill="#fff" />
              <circle cx="24" cy="22" r="1" fill="#fff" />

              {/* Blush cheeks */}
              <rect x="11" y="26" width="3" height="2" fill="#f43f5e" />
              <rect x="24" y="26" width="3" height="2" fill="#f43f5e" />

              {/* Jester collar */}
              <polygon points="8,34 14,40 19,34 24,40 30,34" fill="#facc15" stroke="#000" strokeWidth="1" />

              {/* Jester Bodice */}
              <rect x="12" y="34" width="14" height="12" fill="#ef4444" stroke="#000" strokeWidth="2" />
              <rect x="19" y="34" width="7" height="12" fill="#3b82f6" /> {/* Halved layout */}
              
              {/* White buttons */}
              <circle cx="19" cy="38" r="2" fill="#fff" />
              <circle cx="19" cy="42" r="2" fill="#fff" />

              {/* Boots */}
              <rect x="10" y="46" width="5" height="4" fill="#eab308" stroke="#000" />
              <rect x="23" y="46" width="5" height="4" fill="#3b82f6" stroke="#000" />
            </svg>
          </div>
        );

      case "jax":
        return (
          <div className={`relative w-12 h-16 ${animateBounce} ${hoverClass}`} style={{ filter: isSelected ? 'drop-shadow(0 0 8px rgba(168,85,247,0.8))' : 'none' }}>
            {/* Jax - Purple Bunny with long tall ears */}
            <svg viewBox="0 0 48 64" className="w-full h-full" shapeRendering="crispEdges">
              {/* Long Purple Ears */}
              <rect x="10" y="2" width="6" height="20" fill="#a855f7" stroke="#000" strokeWidth="1.5" />
              <rect x="12" y="6" width="2" height="12" fill="#f472b6" /> {/* Pink Inner Ear */}
              
              <rect x="22" y="2" width="6" height="20" fill="#a855f7" stroke="#000" strokeWidth="1.5" />
              <rect x="24" y="6" width="2" height="12" fill="#f472b6" />

              {/* Head */}
              <rect x="8" y="20" width="22" height="18" fill="#c084fc" stroke="#000" strokeWidth="2" />
              
              {/* Smug Yellow Eyes */}
              <rect x="11" y="25" width="4" height="4" fill="#eab308" />
              <rect x="23" y="25" width="4" height="4" fill="#eab308" />
              <rect x="13" y="27" width="2" height="2" fill="#000" />
              <rect x="23" y="27" width="2" height="2" fill="#000" />

              {/* Cheerful wide bucktooth grin */}
              <rect x="14" y="32" width="10" height="3" fill="#ffffff" stroke="#000" strokeWidth="1" />
              <line x1="19" y1="32" x2="19" y2="35" stroke="#000" strokeWidth="1" />

              {/* Body - Red/Orange Overalls */}
              <rect x="10" y="38" width="18" height="16" fill="#f97316" stroke="#000" strokeWidth="2" />
              {/* Yellow overall buttons */}
              <circle cx="13" cy="42" r="1.5" fill="#eab308" />
              <circle cx="25" cy="42" r="1.5" fill="#eab308" />

              {/* Purple shoes */}
              <rect x="9" y="54" width="7" height="4" fill="#c084fc" stroke="#000" />
              <rect x="22" y="54" width="7" height="4" fill="#c084fc" stroke="#000" />
            </svg>
          </div>
        );

      case "ragatha":
        return (
          <div className={`relative w-12 h-14 ${animateBounce} ${hoverClass}`} style={{ filter: isSelected ? 'drop-shadow(0 0 8px rgba(244,63,94,0.8))' : 'none' }}>
            {/* Ragatha - Red yarn doll */}
            <svg viewBox="0 0 48 56" className="w-full h-full" shapeRendering="crispEdges">
              {/* Yarn Red Hair Blocks */}
              <rect x="6" y="8" width="26" height="16" fill="#b91c1c" stroke="#000" strokeWidth="2" />
              <rect x="4" y="16" width="4" height="14" fill="#b91c1c" />
              <rect x="30" y="16" width="4" height="14" fill="#b91c1c" />

              {/* Face */}
              <rect x="10" y="14" width="18" height="16" fill="#ffedd5" />
              
              {/* Button eye & normal eye */}
              <circle cx="14" cy="22" r="3.5" fill="#1e3a8a" /> {/* Left blue button eye */}
              <line x1="12" y1="20" x2="16" y2="24" stroke="#fff" strokeWidth="1" />
              <line x1="16" y1="20" x2="12" y2="24" stroke="#fff" strokeWidth="1" />
              
              <circle cx="23" cy="22" r="2.5" fill="#000" />

              {/* Orange triangular nose */}
              <polygon points="18,24 20,24 19,27" fill="#f97316" />

              {/* Ribbon on hair */}
              <rect x="8" y="6" width="6" height="4" fill="#3b82f6" />

              {/* Blue and White Gingham Dress */}
              <rect x="8" y="30" width="22" height="18" fill="#2563eb" stroke="#000" strokeWidth="2" />
              {/* White apron overlay */}
              <rect x="12" y="32" width="14" height="16" fill="#ffffff" />
              
              {/* Red stitch dots on apron */}
              <circle cx="15" cy="35" r="1" fill="#ef4444" />
              <circle cx="23" cy="35" r="1" fill="#ef4444" />

              {/* Rag shoes */}
              <rect x="10" y="48" width="6" height="3" fill="#78350f" />
              <rect x="22" y="48" width="6" height="3" fill="#78350f" />
            </svg>
          </div>
        );

      case "kinger":
        return (
          <div className={`relative w-12 h-15 ${animateBounce} ${hoverClass}`} style={{ filter: isSelected ? 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' : 'none' }}>
            {/* Kinger - King chess piece with crown and mantle */}
            <svg viewBox="0 0 48 60" className="w-full h-full" shapeRendering="crispEdges">
              {/* Chess Crown Tip */}
              <rect x="17" y="1" width="4" height="5" fill="#facc15" stroke="#000" />
              <rect x="14" y="3" width="10" height="2" fill="#facc15" />
              <polygon points="11,12 28,12 25,6 20,9 14,6" fill="#fbbf24" stroke="#000" strokeWidth="1.5" />

              {/* Head - Checker Piece */}
              <rect x="13" y="12" width="13" height="12" fill="#c084fc" stroke="#000" strokeWidth="1.5" />
              
              {/* Paralyzed/Shaking big cartoon bug eyes of Static Dementia */}
              <circle cx="15" cy="18" r="4" fill="#fff" stroke="#000" />
              <circle cx="15" cy="18" r="1.5" fill="#000" />
              
              <circle cx="23" cy="18" r="3.5" fill="#fff" stroke="#000" />
              <circle cx="23" cy="18" r="1.5" fill="#000" />

              {/* Royal Purple mantel robe */}
              <rect x="8" y="24" width="23" height="26" fill="#7e22ce" stroke="#000" strokeWidth="2" />
              {/* Ermine white/black spot lining trim */}
              <rect x="8" y="24" width="4" height="26" fill="#ffffff" />
              <rect x="27" y="24" width="4" height="26" fill="#ffffff" />
              {/* Ermine spots */}
              <circle cx="10" cy="28" r="1" fill="#000" />
              <circle cx="10" cy="38" r="1" fill="#000" />
              <circle cx="29" cy="31" r="1" fill="#000" />
              <circle cx="29" cy="41" r="1" fill="#000" />

              {/* Gold sceptre rod */}
              <rect x="3" y="16" width="3" height="34" fill="#fbbf24" stroke="#000" />
              <circle cx="4.5" cy="14" r="3" fill="#ef4444" />
            </svg>
          </div>
        );

      case "gangle":
        return (
          <div className={`relative w-12 h-14 ${animateBounce} ${hoverClass}`} style={{ filter: isSelected ? 'drop-shadow(0 0 8px rgba(251,113,133,0.8))' : 'none' }}>
            {/* Gangle - Pink spiral ribbon and masks */}
            <svg viewBox="0 0 48 56" className="w-full h-full" shapeRendering="crispEdges">
              {/* Porcelain white Mask */}
              <circle cx="19" cy="16" r="9" fill="#ffffff" stroke="#e11d48" strokeWidth="2" />
              {/* Sad expression (Tragedy Fracture) */}
              <path d="M 14,19 Q 19,14 24,19" fill="none" stroke="#000" strokeWidth="2" />
              <circle cx="15" cy="14" r="1.5" fill="#000" />
              <circle cx="23" cy="14" r="1.5" fill="#000" />
              {/* Blue tears */}
              <line x1="15" y1="15" x2="15" y2="18" stroke="#3b82f6" strokeWidth="1.5" />

              {/* Spiraling pink ribbon body */}
              <path d="M 19,25 Q 11,30 19,35 T 19,45 Q 15,48 19,53" fill="none" stroke="#fb7185" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M 12,28 Q 23,32 10,38" fill="none" stroke="#fb7185" strokeWidth="3" />
            </svg>
          </div>
        );

      case "zooble":
        return (
          <div className={`relative w-12 h-15 ${animateBounce} ${hoverClass}`} style={{ filter: isSelected ? 'drop-shadow(0 0 8px rgba(6,182,212,0.8))' : 'none' }}>
            {/* Zooble - Abstract geometric peg-puzzle */}
            <svg viewBox="0 0 48 60" className="w-full h-full" shapeRendering="crispEdges">
              {/* Neon pink triangle head */}
              <polygon points="10,20 28,20 19,4" fill="#fc1a9f" stroke="#000" strokeWidth="2" />
              
              {/* Odd eyes */}
              <circle cx="15" cy="15" r="2" fill="#00ffcc" />
              <rect x="20" y="13" width="4" height="4" fill="#fbbf24" stroke="#000" />

              {/* Cylindrical blue neck */}
              <rect x="17" y="20" width="4" height="6" fill="#0284c7" />

              {/* Geometric cubic body blocks */}
              <rect x="11" y="26" width="16" height="16" fill="#facc15" stroke="#000" strokeWidth="2" />
              <circle cx="19" cy="34" r="4.5" fill="#22c55e" /> {/* Green body sphere */}

              {/* Crazy leg segments (left spiral wire leg, right orange block peg) */}
              <path d="M 14,42 Q 10,48 14,54" fill="none" stroke="#fc1a9f" strokeWidth="2.5" />
              <rect x="22" y="42" width="4" height="12" fill="#f97316" stroke="#000" />
              <circle cx="24" cy="55" r="2" fill="#ef4444" />
            </svg>
          </div>
        );

      case "caine":
        return (
          <div className={`relative w-14 h-14 ${animateBounce} ${hoverClass}`} style={{ filter: isSelected ? 'drop-shadow(0 0 8px rgba(250,204,21,0.8))' : 'none' }}>
            {/* Caine - Teeth dentures and floating eyeballs */}
            <svg viewBox="0 0 54 56" className="w-full h-full" shapeRendering="crispEdges">
              {/* Eyeballs inside center jaw */}
              <circle cx="21" cy="24" r="6" fill="#fff" stroke="#000" strokeWidth="1.5" />
              <circle cx="21" cy="24" r="2.5" fill="#3b82f6" />
              <circle cx="21.5" cy="23.5" r="1" fill="#fff" />

              <circle cx="31" cy="24" r="6.5" fill="#fff" stroke="#000" strokeWidth="1.5" />
              <circle cx="31" cy="24" r="2.5" fill="#10b981" /> {/* Green left eye */}
              <circle cx="31.5" cy="23.5" r="1" fill="#fff" />

              {/* Upper Jaw Teeth */}
              <path d="M 6,18 Q 26,6 46,18 L 43,23 L 9,23 Z" fill="#ef4444" stroke="#000" strokeWidth="2" />
              {/* Individual sharp pixel teeth */}
              <rect x="11" y="20" width="3" height="3" fill="#fff" />
              <rect x="17" y="20" width="3" height="3" fill="#fff" />
              <rect x="23" y="19" width="3" height="3" fill="#fff" />
              <rect x="29" y="19" width="3" height="3" fill="#fff" />
              <rect x="35" y="20" width="3" height="3" fill="#fff" />
              <rect x="41" y="20" width="3" height="3" fill="#fff" />

              {/* Lower Jaw Teeth */}
              <path d="M 8,28 L 44,28 Q 26,44 8,28 Z" fill="#ef4444" stroke="#000" strokeWidth="2" />
              <rect x="13" y="28" width="3" height="3" fill="#fff" />
              <rect x="19" y="28" width="3" height="3" fill="#fff" />
              <rect x="25" y="29" width="3" height="3" fill="#fff" />
              <rect x="31" y="29" width="3" height="3" fill="#fff" />
              <rect x="37" y="28" width="3" height="3" fill="#fff" />

              {/* Ringmaster Bowtie */}
              <polygon points="19,45 27,41 35,45 27,47" fill="#dc2626" stroke="#000" strokeWidth="1" />
            </svg>
          </div>
        );

      case "bubble":
        return (
          <div className={`relative w-10 h-10 ${animateBounce} ${hoverClass}`} style={{ filter: isSelected ? 'drop-shadow(0 0 8px rgba(56,189,248,0.8))' : 'none' }}>
            {/* Bubble - Bubble with cartoon eyes & sharp mouth */}
            <svg viewBox="0 0 40 40" className="w-full h-full" shapeRendering="auto">
              <defs>
                <radialGradient id="bubbleGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
                  <stop offset="45%" stopColor="#7dd3fc" stopOpacity="0.4" />
                  <stop offset="90%" stopColor="#0284c7" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.95" />
                </radialGradient>
              </defs>
              {/* Bubble sphere outer */}
              <circle cx="20" cy="20" r="17" fill="url(#bubbleGrad)" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Gloss sheen highlight */}
              <ellipse cx="14" cy="12" rx="4" ry="2" fill="#fff" transform="rotate(-30, 14, 12)" />

              {/* Wacky wide sawtooth shark mouth */}
              <polygon points="12,24 15,22 17,24 20,21 23,24 25,22 28,24 24,27 20,25 16,27" fill="#000" />
              <circle cx="14" cy="17" r="1.5" fill="#000" />
              <circle cx="26" cy="17" r="1.5" fill="#000" />
            </svg>
          </div>
        );

      case "kaufmo":
        return (
          <div className={`relative w-11 h-13 ${animateBounce} ${hoverClass}`} style={{ filter: isSelected ? 'drop-shadow(0 0 8px rgba(251,223,98,0.8))' : 'none' }}>
            {/* Kaufmo - Restored clown format */}
            <svg viewBox="0 0 44 52" className="w-full h-full" shapeRendering="crispEdges">
              <rect x="8" y="10" width="28" height="26" fill="#eab308" stroke="#000" strokeWidth="2" />
              {/* Colorful layout */}
              <circle cx="22" cy="22" r="10" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
              {/* Big pink nose */}
              <circle cx="22" cy="22" r="3.5" fill="#ec4899" />
              {/* Playful smiling dots */}
              <rect x="15" y="16" width="3" height="3" fill="#000" />
              <rect x="26" y="16" width="3" height="3" fill="#000" />
              {/* Restored crown */}
              <polygon points="12,10 32,10 28,3 22,6 16,3" fill="#fbdf62" stroke="#000" strokeWidth="1" />
              
              {/* Body */}
              <rect x="12" y="36" width="20" height="12" fill="#ef4444" stroke="#000" />
              <rect x="22" y="36" width="10" height="12" fill="#10b981" />
            </svg>
          </div>
        );

      case "queener":
        return (
          <div className={`relative w-11 h-14 ${animateBounce} ${hoverClass}`} style={{ filter: isSelected ? 'drop-shadow(0 0 8px rgba(255,255,255,0.85))' : 'none' }}>
            {/* Queener - Elegant chess Queen piece */}
            <svg viewBox="0 0 44 56" className="w-full h-full" shapeRendering="crispEdges">
              <polygon points="11,10 33,10 30,3 26,7 22,3 18,7 14,3" fill="#e5e7eb" stroke="#000" strokeWidth="1.5" />
              {/* Rounded checker base head */}
              <rect x="12" y="11" width="20" height="14" fill="#f3f4f6" stroke="#000" strokeWidth="1.5" />
              
              {/* Warm, wise big sovereign eyes */}
              <circle cx="16" cy="18" r="3" fill="#fff" stroke="#000" />
              <circle cx="16" cy="18" r="1" fill="#000" />
              <circle cx="28" cy="18" r="3" fill="#fff" stroke="#000" />
              <circle cx="28" cy="18" r="1" fill="#000" />

              {/* Regal silver bodice */}
              <rect x="9" y="25" width="26" height="25" fill="#cbd5e1" stroke="#000" strokeWidth="2" />
              {/* White diamond in center */}
              <polygon points="22,27 27,35 22,43 17,35" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
              
              {/* Base */}
              <rect x="7" y="50" width="30" height="4" fill="#94a3b8" stroke="#000" />
            </svg>
          </div>
        );

      default:
        return (
          <span 
            className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#111] animate-pulse`} 
            style={{ backgroundColor: avatarColor }}
          >
            <span className="text-[11px] font-bold text-black select-none">✝</span>
          </span>
        );
    }
  };

  return (
    <div className="relative">
      {haloElement}
      {renderInner()}
    </div>
  );
};
