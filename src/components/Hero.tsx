import React from 'react';
import { ShieldCheck, ArrowRight, Activity, Sparkles, Lock, Zap } from 'lucide-react';
import { LEGAL_INFO } from '../data/corporateData';

interface HeroProps {
  onOpenQuoteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  return (
    <section id="inicio" className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-quantango-mesh">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-quantango opacity-30 pointer-events-none" />

      {/* Laser Data Beam Horizontal Scan Line */}
      <div className="absolute top-1/2 left-0 right-0 pointer-events-none overflow-hidden opacity-70">
        <div className="data-beam-line w-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Ambient Diffuse Light Glow Behind Headline */}
        <div className="absolute -z-10 w-[500px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        {/* Editorial Top Composition */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          
          {/* Superior Micro-Pill Badge */}
          <div className="inline-flex items-center gap-2 text-[11px] font-mono-tech font-medium text-slate-400 bg-slate-900/80 border border-slate-800 px-4 py-1.5 rounded-full tracking-widest uppercase mb-6 backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 stroke-[1.75]" />
            <span>SOFTWARE, AI & CLOUD INFRASTRUCTURE 2026</span>
          </div>

          {/* High-Tech Space Grotesk H1 Headline */}
          <h1 className="font-tech text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] mb-6 text-white">
            Ingeniería de Software de Misión Crítica y{' '}
            <span className="text-cyan-400 font-bold">
              Arquitectura Cloud Escalable.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-tech text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed mb-10 font-normal">
            Ingeniería de Software a la Medida, Inteligencia Artificial, Arquitectura Cloud y Transformación Digital.
          </p>

          {/* Minimalist Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16 font-tech">
            {/* Primary Orange Accent Pill Button */}
            <button
              onClick={onOpenQuoteModal}
              className="w-full sm:w-auto bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 hover:text-orange-200 border border-orange-500/40 hover:border-orange-400/80 px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 shadow-lg shadow-orange-950/30 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Cotizar Solución</span>
              <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform stroke-[2]" />
            </button>

            {/* Secondary Glass Ghost Button */}
            <a
              href="#cumplimiento"
              className="w-full sm:w-auto bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 backdrop-blur-xl flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400 stroke-[1.75]" />
              <span>Ficha Legal & NIT</span>
            </a>
          </div>

        </div>

        {/* Quantango Central Energy Orb Visual & 3 High-Availability Metric Cards */}
        <div className="relative max-w-5xl mx-auto font-tech">
          
          {/* Energy Orb Backdrop SVG */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 energy-orb-glow rounded-full pointer-events-none flex items-center justify-center">
            <svg className="w-full h-full text-cyan-500/20 animate-spin-slow opacity-60" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
              <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* 3 High-Availability Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            
            {/* Metric Card 1: 99.9% Uptime */}
            <div className="glass-smoked-card p-6 rounded-3xl border border-gray-800 text-center flex flex-col items-center justify-between group">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4">
                <Activity className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div className="text-3xl font-black text-white font-mono-tech mb-1 group-hover:text-cyan-300 transition-colors">
                99.9% Uptime
              </div>
              <div className="text-xs font-mono-tech text-cyan-400 font-bold mb-2">
                AWS Auto-Scaling Activo
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-tech">
                Infraestructura elástica preparada para responder a picos masivos de tráfico e interacciones.
              </p>
            </div>

            {/* Metric Card 2: Latencia < 20ms */}
            <div className="glass-smoked-card p-6 rounded-3xl border border-gray-800 text-center flex flex-col items-center justify-between group">
              <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 mb-4">
                <Zap className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div className="text-3xl font-black text-white font-mono-tech mb-1 group-hover:text-sky-300 transition-colors">
                &lt; 20ms Latencia
              </div>
              <div className="text-xs font-mono-tech text-sky-400 font-bold mb-2">
                Elastic Load Balancer (ALB)
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-tech">
                Enrutamiento inteligente con balanceo de cargas HTTP/HTTPS multi-zona de disponibilidad.
              </p>
            </div>

            {/* Metric Card 3: Databases Cifradas */}
            <div className="glass-smoked-card p-6 rounded-3xl border border-gray-800 text-center flex flex-col items-center justify-between group">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4">
                <Lock className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div className="text-3xl font-black text-white font-mono-tech mb-1 group-hover:text-emerald-300 transition-colors">
                RDS Cifrado
              </div>
              <div className="text-xs font-mono-tech text-emerald-400 font-bold mb-2">
                PostgreSQL AES-256 KMS
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-tech">
                Bases de datos relacionales administradas con backups automatizados en Amazon S3.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
