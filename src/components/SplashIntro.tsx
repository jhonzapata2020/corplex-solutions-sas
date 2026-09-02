import React, { useEffect, useState } from 'react';
import { ArrowRight, ShieldCheck, Cpu, Sparkles, Bot, Zap, Activity } from 'lucide-react';
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
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
      setIsExiting(false);
    }, 700);
  };

  return (
    <div
      onClick={handleStart}
      role="button"
      tabIndex={0}
      aria-label="Iniciar experiencia interactiva de Corplex AI"
      className={`fixed inset-0 z-50 bg-[#111d28] flex flex-col items-center justify-between p-6 sm:p-12 overflow-hidden transition-all duration-700 cursor-pointer select-none font-tech ${
        isExiting ? 'opacity-0 scale-110 blur-sm pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Visual Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Laser Data Beam Horizontal Line */}
      <div className="absolute top-1/2 left-0 right-0 pointer-events-none overflow-hidden opacity-70">
        <div className="data-beam-line w-full" />
      </div>

      {/* Top Header Status Bar */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-7xl font-mono-tech text-xs text-slate-300 border-b border-[#2b5b84] pb-4 pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-emerald-400 font-bold">SYSTEM BOOT :: CORPLEX AI CORE 2026</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-[#ffd343] font-bold">
          <ShieldCheck className="w-3.5 h-3.5 stroke-[1.75]" />
          <span>NIT {LEGAL_INFO.nit} • Urabá, Colombia</span>
        </div>
      </div>

      {/* Central Interactive AI Neural Container */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl my-auto pointer-events-auto">
        
        {/* Floating AI Status Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="px-3 py-1 rounded-full bg-[#1b3852] border border-[#ffd343]/40 text-[#ffd343] text-[11px] font-mono-tech font-bold flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3 h-3 text-[#ffd343] animate-pulse" />
            AGENTES DE IA Y REGLAS DE NEGOCIO
          </span>
          <span className="px-3 py-1 rounded-full bg-[#142332] border border-[#2b5b84] text-emerald-400 text-[11px] font-mono-tech font-bold flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-emerald-400" />
            AWS CLOUD READY
          </span>
        </div>

        {/* Animated AI Energy Orb Container */}
        <div className="relative flex items-center justify-center w-48 h-48 mb-8 group">
          {/* Pulsing Outer Rings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/20 via-sky-500/20 to-emerald-500/20 blur-xl animate-pulse" />
          
          <svg className="absolute inset-0 w-full h-full text-[#ffd343]/60 animate-spin-slow" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 4" fill="none" />
          </svg>

          <svg className="absolute inset-0 w-full h-full text-sky-400/40 animate-spin-reverse-slow" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" fill="none" />
          </svg>

          {/* Core Official Logo Card Badge */}
          <div className="w-28 h-28 rounded-2xl bg-white p-2 border-2 border-[#ffd343] flex items-center justify-center shadow-2xl shadow-[#ffd343]/40 group-hover:scale-105 transition-transform duration-300 relative z-10">
            <img
              src="/logo.jpg"
              alt="CORPLEX SOLUTIONS S.A.S. Logo Oficial"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Brand Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
          CORPLEX <span className="text-[#ffd343]">SOLUTIONS</span> <span className="text-xs text-[#ffd343] font-mono-tech">S.A.S.</span>
        </h1>

        {/* Corporate Subtitle */}
        <p className="text-slate-200 text-xs sm:text-sm max-w-lg leading-relaxed mb-6 font-mono-tech">
          Automatización Inteligente con IA, Arquitectura Cloud AWS, Agrotech & Desarrollo de Software.
        </p>

        {/* Interactive CTA Gold Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleStart();
          }}
          className="px-6 py-3 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-bold text-sm shadow-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95 transform hover:-translate-y-0.5"
        >
          <Bot className="w-4 h-4 text-[#111d28]" />
          <span>Iniciar Experiencia IA ✨</span>
          <ArrowRight className="w-4 h-4 text-[#111d28] stroke-[2.5]" />
        </button>

        <span className="text-[11px] font-mono-tech text-slate-300 mt-4">
          Toca o haz clic en cualquier lugar para ingresar
        </span>

      </div>

      {/* Bottom Footer Info */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between w-full max-w-7xl font-mono-tech text-[11px] text-slate-300 pt-4 border-t border-[#2b5b84] gap-2 pointer-events-auto">
        <div>
          Tecnología, Software & Nube • Turbo, Urabá, Colombia
        </div>

        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <Cpu className="w-3.5 h-3.5 stroke-[1.75]" />
          <span>Servidores AWS & Agentes Operativos</span>
        </div>
      </div>

    </div>
  );
};
