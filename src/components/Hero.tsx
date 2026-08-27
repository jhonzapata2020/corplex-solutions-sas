import React from 'react';
import { ShieldCheck, ArrowRight, Code2, Cloud, Terminal, Cpu, CheckCircle2, Award, Building2 } from 'lucide-react';
import { LEGAL_INFO } from '../data/corporateData';

interface HeroProps {
  onOpenQuoteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial-hero">
      
      {/* Background Ambient Glows & Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">

          {/* Top Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-sky-500/30 text-sky-300 text-xs sm:text-sm font-medium shadow-xl shadow-sky-950/50 mb-8 backdrop-blur-md hover:border-sky-500/50 transition-colors">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <Building2 className="w-4 h-4 text-sky-400" />
            <span>Tecnología e Ingeniería de Software en Urabá y Colombia</span>
          </div>

          {/* H1 Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.15] mb-6">
            Desarrollo de Software a la Medida,{' '}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              Arquitectura Cloud
            </span>{' '}
            e Innovación Digital
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-10 font-normal">
            Diseñamos, construimos y escalamos plataformas web interactivas, entornos cloud en AWS y soluciones tecnológicas robustas para instituciones educativas, entidades públicas y empresas.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
            <a
              href="#servicios"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-600 text-white font-semibold text-base shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 group"
            >
              <span>Explorar Líneas de Servicio</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#cumplimiento"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 font-semibold text-base backdrop-blur-md hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Ver Respaldo Legal y Ficha Técnica</span>
            </a>
          </div>

          {/* Technical Trust Badges Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl pt-8 border-t border-slate-800/80">
            <div className="glass-card p-4 rounded-xl flex items-center gap-3 text-left">
              <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 shrink-0">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">100% Código Limpio & Ágil</h4>
                <p className="text-xs text-slate-400 font-mono">React, TypeScript & Rest APIs</p>
              </div>
            </div>

            <div className="glass-card p-4 rounded-xl flex items-center gap-3 text-left">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Arquitecturas AWS Escalables</h4>
                <p className="text-xs text-slate-400 font-mono">EC2, RDS, S3 & Load Balancer</p>
              </div>
            </div>

            <div className="glass-card p-4 rounded-xl flex items-center gap-3 text-left">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Registro Mercantil al Día</h4>
                <p className="text-xs text-slate-400 font-mono">Matrícula {LEGAL_INFO.mercantileRegistration}</p>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-12 w-full max-w-5xl glass-panel p-6 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-around gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                NIT 902061373-5
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1 font-medium">
                Sociedad por Acciones Simplificada
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-slate-800" />
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono">
                CIIU J6201 / J6202
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1 font-medium">
                Desarrollo & Consultoría Software
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-slate-800" />
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                Urabá - Antioquia
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1 font-medium">
                Cámara de Comercio de Urabá
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
