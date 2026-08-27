import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Code2, Cloud, Terminal, Cpu, CheckCircle2, Building2, Sparkles, Network, Database, Layers } from 'lucide-react';
import { LEGAL_INFO } from '../data/corporateData';

interface HeroProps {
  onOpenQuoteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  const [activeHeroTab, setActiveHeroTab] = useState<'software' | 'cloud' | 'unad'>('software');

  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-radial-hero">
      
      {/* Ambient Radial Lights */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-sky-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Messaging & CTAs */}
          <div className="lg:col-span-7 flex flex-col text-left">
            
            {/* Top Institutional Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-sky-500/30 text-sky-300 text-xs font-mono font-medium shadow-xl mb-6 w-fit backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <Building2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Ingeniería de Software & Nube AWS en Urabá</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] mb-6">
              Desarrollo de Software a la Medida,{' '}
              <span className="text-sky-400">
                Arquitectura Cloud
              </span>{' '}
              e Innovación Digital
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              Diseñamos, construimos y escalamos plataformas web interactivas, entornos cloud en AWS y soluciones tecnológicas para instituciones educativas (UNAD - ECBTI), entidades públicas y empresas.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={onOpenQuoteModal}
                className="px-7 py-3.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-black font-extrabold text-sm shadow-xl shadow-sky-500/20 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5 group"
              >
                <span>Cotizar Proyecto</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#cumplimiento"
                className="px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 font-semibold text-sm backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Respaldo Legal & NIT</span>
              </a>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
                <Code2 className="w-4 h-4 text-sky-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Código Limpio</div>
                  <div className="text-[10px] font-mono text-slate-400">React & TS</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
                <Cloud className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">AWS Cloud</div>
                  <div className="text-[10px] font-mono text-slate-400">EC2 & RDS</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Legal Al Día</div>
                  <div className="text-[10px] font-mono text-slate-400">No. 128676</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Interactive Tech Terminal Showcase */}
          <div className="lg:col-span-5">
            
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
              
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  <span className="text-xs font-mono text-slate-400 ml-2">CORPLEX-TECH-STACK // PRODUCTION</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  99.9% Uptime
                </span>
              </div>

              {/* Selector Tabs */}
              <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800 mb-5">
                <button
                  onClick={() => setActiveHeroTab('software')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    activeHeroTab === 'software' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Software Dev
                </button>
                <button
                  onClick={() => setActiveHeroTab('cloud')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    activeHeroTab === 'cloud' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Cloud AWS
                </button>
                <button
                  onClick={() => setActiveHeroTab('unad')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    activeHeroTab === 'unad' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  UNAD ECBTI
                </button>
              </div>

              {/* Tab Content 1: Software */}
              {activeHeroTab === 'software' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
                    <span className="text-slate-400">// Stack Frontend</span>
                    <div className="text-sky-300 font-bold mt-1">React 18 + TypeScript + Tailwind CSS</div>
                    <div className="text-[11px] text-slate-300 mt-1">Componentes reutilizables, tipado estricto, 0 deuda técnica.</div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
                    <span className="text-slate-400">// Stack Backend & APIs</span>
                    <div className="text-emerald-400 font-bold mt-1">Node.js / Python REST APIs</div>
                    <div className="text-[11px] text-slate-300 mt-1">Autenticación JWT, arquitectura limpia y ORM relacional.</div>
                  </div>
                </div>
              )}

              {/* Tab Content 2: Cloud */}
              {activeHeroTab === 'cloud' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
                    <span className="text-slate-400">// Amazon Web Services</span>
                    <div className="text-cyan-300 font-bold mt-1">EC2 Auto Scaling + RDS PostgreSQL</div>
                    <div className="text-[11px] text-slate-300 mt-1">Balanceadores de carga ALB, almacenamiento S3 y CDN CloudFront.</div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
                    <span className="text-slate-400">// Seguridad & VPC</span>
                    <div className="text-emerald-400 font-bold mt-1">AWS WAF + Route 53 DNS</div>
                    <div className="text-[11px] text-slate-300 mt-1">Protección DDoS y aislamiento en subredes privadas.</div>
                  </div>
                </div>
              )}

              {/* Tab Content 3: UNAD */}
              {activeHeroTab === 'unad' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
                    <span className="text-slate-400">// Articulación Académica</span>
                    <div className="text-emerald-300 font-bold mt-1">Simuladores Web & Semilleros</div>
                    <div className="text-[11px] text-slate-300 mt-1">Laboratorios virtuales interactivos para prácticas de ingeniería.</div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
                    <span className="text-slate-400">// Picos Masivos</span>
                    <div className="text-sky-300 font-bold mt-1">Respuesta a Exámenes Nacionales</div>
                    <div className="text-[11px] text-slate-300 mt-1">Soporte a más de 5,000 estudiantes concurrentes sin caídas.</div>
                  </div>
                </div>
              )}

              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Razón Social: {LEGAL_INFO.companyName}</span>
                <span className="text-sky-400 font-bold">NIT {LEGAL_INFO.nit}</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
