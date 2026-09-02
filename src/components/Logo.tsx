import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'image' | 'vector' | 'hybrid';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
  variant: _variant = 'hybrid'
}) => {
  const sizeMap = {
    sm: { img: 'h-7 w-7', text: 'text-sm', sub: 'text-[8px]' },
    md: { img: 'h-9 w-9', text: 'text-base sm:text-lg', sub: 'text-[9px]' },
    lg: { img: 'h-12 w-12', text: 'text-xl sm:text-2xl', sub: 'text-[10px]' },
    xl: { img: 'h-20 w-20', text: 'text-3xl sm:text-4xl', sub: 'text-xs' }
  };

  const dim = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      
      {/* Official Brand Logo Container */}
      <div className={`relative flex items-center justify-center rounded-xl bg-white p-1 border border-cyan-500/40 shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform duration-300 ${dim.img} shrink-0 overflow-hidden`}>
        <img
          src="/logo.jpg"
          alt="CORPLEX SOLUTIONS S.A.S. Logo Oficial"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Optional Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-tight">
            <span className={`font-extrabold tracking-tight text-white ${dim.text}`}>
              CORPLEX <span className="text-cyan-400 font-bold">SOLUTIONS</span>
            </span>
            <span className={`font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 ${dim.sub}`}>
              S.A.S.
            </span>
          </div>

          <div className={`flex items-center gap-1.5 text-gray-400 font-mono ${dim.sub}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>NIT 902061373-5</span>
          </div>
        </div>
      )}

    </div>
  );
};

export const VectorIsotype: React.FC<{ size?: number; className?: string }> = ({ size = 36, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* C-Arc (Left - Dark Cobalt Blue) */}
      <path
        d="M 45 25 A 30 30 0 0 0 45 75"
        stroke="#1d4ed8"
        strokeWidth="7"
        strokeLinecap="round"
      />
      
      {/* Connection lines to center */}
      <line x1="45" y1="25" x2="60" y2="50" stroke="#0284c7" strokeWidth="6" />
      <line x1="45" y1="75" x2="60" y2="50" stroke="#0284c7" strokeWidth="6" />
      
      {/* X-Lines (Right - Electric Cyan Blue) */}
      <line x1="60" y1="50" x2="75" y2="25" stroke="#06b6d4" strokeWidth="6" strokeLinecap="round" />
      <line x1="60" y1="50" x2="75" y2="75" stroke="#06b6d4" strokeWidth="6" strokeLinecap="round" />

      {/* Circular Nodes */}
      <circle cx="45" cy="25" r="5" fill="#030712" stroke="#1d4ed8" strokeWidth="3" />
      <circle cx="45" cy="75" r="5" fill="#030712" stroke="#1d4ed8" strokeWidth="3" />
      <circle cx="60" cy="50" r="5" fill="#030712" stroke="#38bdf8" strokeWidth="3" />
      <circle cx="75" cy="25" r="5" fill="#030712" stroke="#06b6d4" strokeWidth="3" />
      <circle cx="75" cy="75" r="5" fill="#030712" stroke="#06b6d4" strokeWidth="3" />
    </svg>
  );
};
