import React, { useEffect, useState } from 'react';
import { ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { LEGAL_INFO } from '../data/corporateData';

interface SplashIntroProps {
  isOpen: boolean;
  onEnter: () => void;
}

export const SplashIntro: React.FC<SplashIntroProps> = ({ isOpen, onEnter }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && !isExiting) {
        handleStart();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isExiting]);

  if (!isOpen && !isExiting) return null;

  const handleStart = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
      setIsExiting(false);
    }, 700);
  };

  return (
    <div
      onClick={handleStart}
      className={`fixed inset-0 z-50 bg-slate-50 flex flex-col items-center justify-between p-6 sm:p-12 overflow-hidden transition-all duration-700 cursor-pointer ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Mesh & Grid */}
      <div className="absolute inset-0 bg-grid-quantango opacity-30 pointer-events-none" />

      {/* Laser Data Beam Horizontal Line */}
      <div className="absolute top-1/2 left-0 right-0 pointer-events-none overflow-hidden opacity-80">
        <div className="data-beam-line w-full" />
      </div>

      {/* Top Header Status */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-7xl font-mono-tech text-xs text-slate-600 border-b border-slate-200 pb-4 pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>SYSTEM READY // SYSTEM BOOT 2026</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-cyan-700 font-bold">
          <ShieldCheck className="w-3.5 h-3.5 stroke-[1.75]" />
          <span>NIT {LEGAL_INFO.nit} • Urabá, Colombia</span>
        </div>
      </div>

      {/* Central Content Box with Energy Orb Backdrop & Official Logo */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl my-auto pointer-events-auto font-tech">
        
        {/* Animated Energy Orb with Official Logo Inside */}
        <div className="relative flex items-center justify-center w-44 h-44 mb-8">
          <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <svg className="absolute inset-0 w-full h-full text-cyan-600/30 animate-spin-slow" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" fill="none" />
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>

          {/* Official Logo Card Badge */}
          <div className="w-24 h-24 rounded-2xl bg-white p-2 border border-slate-200 flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300">
            <img
              src="/logo.jpg"
              alt="CORPLEX SOLUTIONS S.A.S. Logo Oficial"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Brand Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-3">
          CORPLEX <span className="text-cyan-700">SOLUTIONS</span> <span className="text-xs text-cyan-700 font-mono-tech">S.A.S.</span>
        </h1>

        {/* General Corporate Subtitle */}
        <p className="text-slate-600 text-xs sm:text-sm max-w-lg leading-relaxed mb-8 font-mono-tech">
          Ingeniería de Software a la Medida, Inteligencia Artificial, Arquitectura Cloud y Transformación Digital.
        </p>

        {/* Minimalist Interactive Cyan Text Link CTA */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleStart();
          }}
          className="group inline-flex items-center gap-2.5 text-base md:text-lg font-bold tracking-wide text-white bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 cursor-pointer active:scale-95 py-2.5 px-6 rounded-full shadow-md"
        >
          <span className="animate-pulse">Explorar plataforma</span>
          <ArrowRight className="w-4.5 h-4.5 text-white group-hover:translate-x-1.5 transition-transform duration-300 stroke-[2]" />
        </button>

        <span className="text-[10px] font-mono-tech text-slate-500 mt-4">
          Presiona cualquier tecla o haz clic en cualquier lugar para ingresar
        </span>

      </div>

      {/* Bottom Footer Info */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between w-full max-w-7xl font-mono-tech text-[11px] text-slate-600 pt-4 border-t border-slate-200 gap-2 pointer-events-auto">
        <div>
          Tecnología, Software & Nube • Turbo, Urabá, Colombia
        </div>

        <div className="flex items-center gap-2 text-emerald-600 font-bold">
          <Cpu className="w-3.5 h-3.5 stroke-[1.75]" />
          <span>Servidores AWS 100% Operativos</span>
        </div>
      </div>

    </div>
  );
};
