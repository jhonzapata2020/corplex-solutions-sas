import React from 'react';
import { ShieldCheck, ArrowRight, Cpu, Activity, Database, Sparkles, CheckCircle2, Lock, Zap, Server, Globe } from 'lucide-react';
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
        
        {/* Editorial Top Composition */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          
          {/* Minimalist Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium shadow-2xl mb-6 backdrop-blur-2xl hover:border-cyan-500/60 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 stroke-[1.75]" />
            <span>ENGINEERING & CLOUD INFRASTRUCTURE 2026</span>
          </div>

          {/* H1 Dominant Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] mb-6 text-white">
            Ingeniería de Software de Misión Crítica y{' '}
            <span className="text-cyan-400">
              Arquitectura Cloud Escalable.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl leading-relaxed mb-10 font-normal">
            Diseñamos ecosistemas digitales robustos, simuladores interactivos e infraestructura en AWS para instituciones educativas, entidades y empresas.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
            <button
              onClick={onOpenQuoteModal}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full glow-pill-button text-white font-bold text-sm flex items-center justify-center gap-2.5 group"
            >
              <span>Cotizar Proyecto / WhatsApp</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[1.75]" />
            </button>

            <a
              href="#cumplimiento"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gray-900/90 hover:bg-gray-800 text-gray-200 border border-gray-800 hover:border-gray-700 font-semibold text-sm backdrop-blur-xl transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400 stroke-[1.75]" />
              <span>Ver Ficha Legal & NIT {LEGAL_INFO.nit}</span>
            </a>
          </div>

        </div>

        {/* Quantango Central Energy Orb Visual & 3 High-Availability Metric Cards */}
        <div className="relative max-w-5xl mx-auto">
          
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
              <div className="text-3xl font-black text-white font-mono mb-1 group-hover:text-cyan-300 transition-colors">
                99.9% Uptime
              </div>
              <div className="text-xs font-mono text-cyan-400 font-bold mb-2">
                AWS Auto-Scaling Activo
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Infraestructura elástica preparada para responder a picos masivos de tráfico e interacciones.
              </p>
            </div>

            {/* Metric Card 2: Latencia < 20ms */}
            <div className="glass-smoked-card p-6 rounded-3xl border border-gray-800 text-center flex flex-col items-center justify-between group">
              <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 mb-4">
                <Zap className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div className="text-3xl font-black text-white font-mono mb-1 group-hover:text-sky-300 transition-colors">
                &lt; 20ms Latencia
              </div>
              <div className="text-xs font-mono text-sky-400 font-bold mb-2">
                Elastic Load Balancer (ALB)
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Enrutamiento inteligente con balanceo de cargas HTTP/HTTPS multi-zona de disponibilidad.
              </p>
            </div>

            {/* Metric Card 3: Databases Cifradas */}
            <div className="glass-smoked-card p-6 rounded-3xl border border-gray-800 text-center flex flex-col items-center justify-between group">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4">
                <Lock className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div className="text-3xl font-black text-white font-mono mb-1 group-hover:text-emerald-300 transition-colors">
                RDS Cifrado
              </div>
              <div className="text-xs font-mono text-emerald-400 font-bold mb-2">
                PostgreSQL AES-256 KMS
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Bases de datos relacionales administradas con backups automatizados en Amazon S3.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
