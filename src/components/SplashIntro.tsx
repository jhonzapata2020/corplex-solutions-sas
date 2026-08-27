import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
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
      className={`fixed inset-0 z-50 bg-[#030712] flex flex-col items-center justify-between p-6 sm:p-12 overflow-hidden transition-all duration-700 ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Mesh & Grid */}
      <div className="absolute inset-0 bg-quantango-mesh opacity-80 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-quantango opacity-30 pointer-events-none" />

      {/* Laser Data Beam Horizontal Line */}
      <div className="absolute top-1/2 left-0 right-0 pointer-events-none overflow-hidden opacity-80">
        <div className="data-beam-line w-full" />
      </div>

      {/* Top Header Status */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-7xl font-mono text-xs text-gray-400 border-b border-gray-800/80 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>SYSTEM READY // SYSTEM BOOT 2026</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-cyan-400">
          <ShieldCheck className="w-3.5 h-3.5 stroke-[1.75]" />
          <span>NIT {LEGAL_INFO.nit} • Urabá, Colombia</span>
        </div>
      </div>

      {/* Central Content Box with Energy Orb Backdrop & Official Logo */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl my-auto">
        
        {/* Animated Quantango Energy Orb with Official Logo Inside */}
        <div className="relative flex items-center justify-center w-44 h-44 mb-8">
          <div className="absolute inset-0 energy-orb-glow rounded-full pointer-events-none" />
          <svg className="absolute inset-0 w-full h-full text-cyan-400/40 animate-spin-slow" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" fill="none" />
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>

          {/* Official Logo Card Badge */}
          <div className="w-24 h-24 rounded-2xl bg-white p-2 border border-cyan-400/60 flex items-center justify-center shadow-2xl shadow-cyan-500/50 hover:scale-105 transition-transform duration-300">
            <img
              src="/logo.jpg"
              alt="CORPLEX SOLUTIONS S.A.S. Logo Oficial"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Brand Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-3">
          CORPLEX <span className="text-cyan-400">SOLUTIONS</span> <span className="text-xs text-cyan-400 font-mono">S.A.S.</span>
        </h1>

        <p className="text-gray-300 text-xs sm:text-sm max-w-md leading-relaxed mb-8 font-mono">
          Ecosistema Institucional de Ingeniería de Software, Simuladores Educativos UNAD & Infraestructura Cloud AWS.
        </p>

        {/* Central Action Button */}
        <button
          onClick={handleStart}
          className="glow-pill-button px-8 py-4 rounded-full text-white font-bold text-xs sm:text-sm shadow-2xl shadow-cyan-500/40 flex items-center gap-3 group transition-transform active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform stroke-[1.75]" />
          <span>✨ HAZ CLIC PARA INICIALIZAR EL ECOSISTEMA</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[1.75]" />
        </button>

        <span className="text-[10px] font-mono text-gray-500 mt-4">
          Presiona cualquier tecla o haz clic para ingresar
        </span>

      </div>

      {/* Bottom Footer Info */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between w-full max-w-7xl font-mono text-[11px] text-gray-400 pt-4 border-t border-gray-800/80 gap-2">
        <div>
          Tecnología, Software & Nube AWS • Turbo, Urabá, Colombia
        </div>

        <div className="flex items-center gap-2 text-emerald-400">
          <Cpu className="w-3.5 h-3.5 stroke-[1.75]" />
          <span>Servidores AWS 100% Operativos</span>
        </div>
      </div>

    </div>
  );
};
