import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Code2, Cloud, Cpu, Activity, Database, Sparkles, CheckCircle2, Lock, Zap, Server, Globe } from 'lucide-react';
import { LEGAL_INFO } from '../data/corporateData';

interface HeroProps {
  onOpenQuoteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  const [activePanel, setActivePanel] = useState<'perf' | 'sec' | 'unad'>('perf');

  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-aurora-mesh">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-mesh opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Top Intro Composition */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          
          {/* Perimeter Glow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900/90 border border-sky-500/40 text-sky-300 text-xs font-mono font-medium shadow-xl shadow-sky-950/50 mb-6 backdrop-blur-xl hover:border-sky-500/60 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-sky-400 stroke-[1.75]" />
            <span>✨ Soluciones de Software & Nube AWS para la Transformación Digital</span>
          </div>

          {/* H1 Editorial Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] mb-6 text-white">
            Ingeniería de Software de Alto Nivel y{' '}
            <span className="text-sky-400">
              Arquitectura Cloud Escalable.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed mb-10 font-normal">
            Diseñamos plataformas web de misión crítica, simuladores educativos y ecosistemas en la nube con altos estándares de seguridad y disponibilidad.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onOpenQuoteModal}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full glow-button text-white font-bold text-sm flex items-center justify-center gap-2.5 group"
            >
              <span>Explorar Servicios e Iniciar Cotización</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[1.75]" />
            </button>

            <a
              href="#cumplimiento"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gray-900/80 hover:bg-gray-800 text-gray-200 border border-gray-800 hover:border-gray-700 font-semibold text-sm backdrop-blur-xl transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400 stroke-[1.75]" />
              <span>Ver Ficha Legal & NIT 902061373-5</span>
            </a>
          </div>

        </div>

        {/* Showcase Visual Central: Centro de Control de Arquitectura */}
        <div className="glass-card-pro p-6 sm:p-8 rounded-3xl border border-gray-800/80 shadow-2xl relative">
          
          {/* Dashboard Control Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-gray-800/80">
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              <span className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">
                CENTRO DE CONTROL DE ARQUITECTURA // PRODUCCIÓN
              </span>
            </div>

            {/* Perspective Tabs Selector */}
            <div className="flex items-center gap-1.5 bg-gray-950/80 p-1 rounded-xl border border-gray-800">
              <button
                onClick={() => setActivePanel('perf')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                  activePanel === 'perf'
                    ? 'bg-sky-500 text-gray-950 font-bold shadow-sm'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5 stroke-[1.75]" />
                <span>Rendimiento</span>
              </button>

              <button
                onClick={() => setActivePanel('sec')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                  activePanel === 'sec'
                    ? 'bg-cyan-500 text-gray-950 font-bold shadow-sm'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Lock className="w-3.5 h-3.5 stroke-[1.75]" />
                <span>Seguridad & Datos</span>
              </button>

              <button
                onClick={() => setActivePanel('unad')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                  activePanel === 'unad'
                    ? 'bg-emerald-500 text-gray-950 font-bold shadow-sm'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5 stroke-[1.75]" />
                <span>Ecosistema UNAD</span>
              </button>
            </div>

          </div>

          {/* Dynamic perspective panels grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* Panel 1: Rendimiento */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
              activePanel === 'perf'
                ? 'bg-gray-900/90 border-sky-500/60 shadow-xl shadow-sky-500/10 ring-1 ring-sky-500/30'
                : 'bg-gray-950/60 border-gray-800/80 hover:border-gray-700'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
                    <Activity className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Active Load Balancer
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">Panel de Rendimiento</h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  Respuestas de bajísima latencia con distribución multi-zona en Amazon Elastic Load Balancing (ALB).
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-800 font-mono text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>Latencia Media:</span>
                  <span className="text-emerald-400 font-bold">&lt; 18ms</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Disponibilidad AWS:</span>
                  <span className="text-sky-300 font-bold">99.9% Uptime</span>
                </div>
              </div>
            </div>

            {/* Panel 2: Seguridad & Datos */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
              activePanel === 'sec'
                ? 'bg-gray-900/90 border-cyan-500/60 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                : 'bg-gray-950/60 border-gray-800/80 hover:border-gray-700'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    <Database className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    KMS Encrypted
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">Panel de Seguridad & Datos</h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  Bases de datos PostgreSQL cifradas en reposo con backups automatizados diarios en Amazon S3.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-800 font-mono text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>Cifrado AES-256:</span>
                  <span className="text-cyan-300 font-bold">Activo</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Respaldo S3:</span>
                  <span className="text-emerald-400 font-bold">Automatizado</span>
                </div>
              </div>
            </div>

            {/* Panel 3: Ecosistema UNAD */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
              activePanel === 'unad'
                ? 'bg-gray-900/90 border-emerald-500/60 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                : 'bg-gray-950/60 border-gray-800/80 hover:border-gray-700'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Globe className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    ECBTI Standard
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">Panel Ecosistema UNAD</h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  Simuladores web e infraestructura con Auto-Scaling diseñada para soportar picos de exámenes nacionales.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-800 font-mono text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>Concurrencia:</span>
                  <span className="text-emerald-400 font-bold">5,000+ usuarios</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Semilleros:</span>
                  <span className="text-sky-300 font-bold">Trazabilidad I+D</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
