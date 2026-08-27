import React, { useState } from 'react';
import { Code2, Cloud, Zap, Server, CheckCircle2, ArrowRight, Activity, Database, Layers, ShieldCheck, Cpu, Terminal, Sparkles } from 'lucide-react';

interface ServicesGridProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectServiceForQuote }) => {
  const [selectedModule, setSelectedModule] = useState<'sim' | 'web' | 'api'>('sim');

  return (
    <section id="servicios" className="py-24 relative bg-gray-950 border-t border-gray-800/80">
      
      {/* Ambient Diffuse Lights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 stroke-[1.75]" />
            <span>SOLUCIONES & LÍNEAS DE INGENIERÍA 2026</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Catálogo Bento de Servicios Tecnológicos
          </h2>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Arquitectura de servicios estructurada para empresas, entidades públicas y la Universidad Nacional Abierta y a Distancia (UNAD).
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* Card 1 (2x2): Desarrollo de Software & Simuladores Educativos */}
          <div className="md:col-span-2 lg:col-span-2 glass-smoked-card p-7 rounded-3xl border border-gray-800 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Code2 className="w-6 h-6 stroke-[1.75]" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  CIIU J6201 // Core Software
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Desarrollo de Software & Simuladores Educativos
              </h3>

              <p className="text-gray-300 text-xs leading-relaxed mb-6">
                Construcción de aplicaciones web interactivas, simuladores gráficos para prácticas formativas en React/TypeScript y plataformas backend estructuradas.
              </p>

              {/* Selector interactivo de módulos */}
              <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 mb-6 font-mono text-xs">
                <div className="flex gap-2 mb-3 border-b border-gray-800 pb-2">
                  <button
                    onClick={() => setSelectedModule('sim')}
                    className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      selectedModule === 'sim' ? 'bg-cyan-400 text-black font-extrabold' : 'text-white hover:text-cyan-300'
                    }`}
                  >
                    Simulador Lab
                  </button>
                  <button
                    onClick={() => setSelectedModule('web')}
                    className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      selectedModule === 'web' ? 'bg-sky-400 text-black font-extrabold' : 'text-white hover:text-sky-300'
                    }`}
                  >
                    Portal Web
                  </button>
                  <button
                    onClick={() => setSelectedModule('api')}
                    className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      selectedModule === 'api' ? 'bg-emerald-400 text-black font-extrabold' : 'text-white hover:text-emerald-300'
                    }`}
                  >
                    API REST
                  </button>
                </div>

                {selectedModule === 'sim' && (
                  <div className="space-y-1 text-gray-200">
                    <div className="text-cyan-300 font-bold">✓ Visualizador 2D/3D Integrable LTI</div>
                    <div className="text-[11px] text-gray-300">Prácticas docentes sin plugins extra, ejecución 100% web.</div>
                  </div>
                )}

                {selectedModule === 'web' && (
                  <div className="space-y-1 text-gray-200">
                    <div className="text-sky-300 font-bold">✓ React 18 + TypeScript + Vite</div>
                    <div className="text-[11px] text-gray-300">Diseño adaptativo con velocidad de carga de nivel enterprise.</div>
                  </div>
                )}

                {selectedModule === 'api' && (
                  <div className="space-y-1 text-gray-200">
                    <div className="text-emerald-300 font-bold">✓ Node.js & Python FastAPI</div>
                    <div className="text-[11px] text-gray-300">Endpoints autenticados JWT con arquitectura limpia.</div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => onSelectServiceForQuote('Desarrollo de Software & Simuladores Educativos')}
              className="w-full py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Cotizar Software o Simulador</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>

          {/* Card 2 (2x1): Infraestructura Cloud en AWS & DevOps */}
          <div className="md:col-span-1 lg:col-span-2 glass-smoked-card p-7 rounded-3xl border border-gray-800 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
                  <Cloud className="w-6 h-6 stroke-[1.75]" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/30">
                  CIIU J6202 // Cloud AWS
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Infraestructura Cloud en AWS & DevOps
              </h3>

              <p className="text-gray-300 text-xs leading-relaxed mb-6">
                Despliegues en Amazon Web Services (EC2 Auto Scaling, RDS PostgreSQL, S3, ALB) con 99.9% de disponibilidad.
              </p>

              {/* Architecture Topology Box */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-gray-950 rounded-2xl border border-gray-800 mb-6 font-mono text-[10px]">
                <div className="p-2 rounded bg-gray-900 text-center border border-gray-800">
                  <span className="text-cyan-400 block font-bold">AWS ALB</span>
                  <span className="text-gray-200">Load Balancer</span>
                </div>
                <div className="p-2 rounded bg-gray-900 text-center border border-gray-800">
                  <span className="text-sky-400 block font-bold">EC2 Auto</span>
                  <span className="text-gray-200">Scaling</span>
                </div>
                <div className="p-2 rounded bg-gray-900 text-center border border-gray-800">
                  <span className="text-emerald-400 block font-bold">RDS DB</span>
                  <span className="text-gray-200">PostgreSQL</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectServiceForQuote('Infraestructura Cloud en AWS & DevOps')}
              className="w-full py-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Cotizar Arquitectura AWS</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>

          {/* Card 3 (1x1): Agentes de IA & Automatización */}
          <div className="glass-smoked-card p-6 rounded-3xl border border-gray-800 flex flex-col justify-between group">
            <div>
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-fit mb-4">
                <Zap className="w-5 h-5 stroke-[1.75]" />
              </div>

              <h3 className="text-lg font-bold text-white mb-2">Agentes IA & Automatización</h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Procesamiento inteligente de datos y tableros gerenciales en tiempo real.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-gray-950 border border-gray-800 text-[11px] font-mono text-emerald-400 flex items-center justify-between">
              <span>Flujos Inteligentes:</span>
              <span className="font-bold">Activo 100%</span>
            </div>
          </div>

          {/* Card 4 (1x1): Soporte Técnico & Redes */}
          <div className="glass-smoked-card p-6 rounded-3xl border border-gray-800 flex flex-col justify-between group">
            <div>
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 w-fit mb-4">
                <Server className="w-5 h-5 stroke-[1.75]" />
              </div>

              <h3 className="text-lg font-bold text-white mb-2">Soporte Técnico & Redes</h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Mantenimiento de hardware (CIIU S9511) y estructuración de redes LAN/WiFi (CIIU G4651).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-gray-950 border border-gray-800 text-[11px] font-mono text-cyan-400 flex items-center justify-between">
              <span>Continuidad SLA:</span>
              <span className="font-bold">Monitoreo 24/7</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
