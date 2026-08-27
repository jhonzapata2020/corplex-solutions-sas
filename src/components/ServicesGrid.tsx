import React, { useState } from 'react';
import { Code2, Cloud, Zap, Server, CheckCircle2, ArrowRight, Activity, Database, Layers, ShieldCheck, Cpu, Terminal, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data/corporateData';

interface ServicesGridProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectServiceForQuote }) => {
  const [selectedModule, setSelectedModule] = useState<'sim' | 'web' | 'api'>('sim');

  return (
    <section id="servicios" className="py-24 relative bg-gray-950 border-t border-gray-800/80">
      
      {/* Ambient Radial Lights */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Catálogo Bento de Servicios e Ingeniería
          </h2>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Explora nuestras soluciones estructuradas en módulos de alta precisión técnica, adaptadas para empresas, comités de compras y la UNAD.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* Card 1: Card Principal (2x2) - Desarrollo de Software & Simuladores Académicos */}
          <div className="md:col-span-2 lg:col-span-2 glass-card-pro p-7 rounded-3xl border border-gray-800 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
                  <Code2 className="w-6 h-6 stroke-[1.75]" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/30">
                  CIIU J6201 // Flagship
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Desarrollo de Software & Simuladores Académicos
              </h3>

              <p className="text-gray-300 text-xs leading-relaxed mb-6">
                Construcción de aplicaciones web interactivas, simuladores gráficos para laboratorios docentes en React/TypeScript y entornos backend estructurados.
              </p>

              {/* Interactive Module Selector Inside Bento Card */}
              <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 mb-6 font-mono text-xs">
                <div className="flex gap-2 mb-3 border-b border-gray-800 pb-2">
                  <button
                    onClick={() => setSelectedModule('sim')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      selectedModule === 'sim' ? 'bg-sky-500 text-gray-950 font-bold' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Simulador Lab
                  </button>
                  <button
                    onClick={() => setSelectedModule('web')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      selectedModule === 'web' ? 'bg-cyan-500 text-gray-950 font-bold' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Portal Web
                  </button>
                  <button
                    onClick={() => setSelectedModule('api')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      selectedModule === 'api' ? 'bg-emerald-500 text-gray-950 font-bold' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    API REST
                  </button>
                </div>

                {selectedModule === 'sim' && (
                  <div className="space-y-1.5 text-gray-300">
                    <div className="text-sky-300 font-bold">✓ Renderizador Gráfico 2D/3D</div>
                    <div className="text-[11px] text-gray-300">Prácticas formativas sin instalación previa. Integrable vía LTI.</div>
                  </div>
                )}

                {selectedModule === 'web' && (
                  <div className="space-y-1.5 text-gray-300">
                    <div className="text-cyan-300 font-bold">✓ React 18 + Vite + Tailwind CSS</div>
                    <div className="text-[11px] text-gray-300">Diseño adaptativo, tiempo de carga inferior a 1 segundo.</div>
                  </div>
                )}

                {selectedModule === 'api' && (
                  <div className="space-y-1.5 text-gray-300">
                    <div className="text-emerald-300 font-bold">✓ Node.js & Python FastAPI</div>
                    <div className="text-[11px] text-gray-300">Endpoints autenticados con JWT y documentación OpenAPI.</div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => onSelectServiceForQuote('Desarrollo de Software & Simuladores Académicos')}
              className="w-full py-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Cotizar Solución de Software</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>

          {/* Card 2: Card Nube (2x1) - Infraestructura AWS & DevOps */}
          <div className="md:col-span-1 lg:col-span-2 glass-card-pro p-7 rounded-3xl border border-gray-800 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Cloud className="w-6 h-6 stroke-[1.75]" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  CIIU J6202 // Cloud AWS
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Infraestructura AWS & DevOps
              </h3>

              <p className="text-gray-300 text-xs leading-relaxed mb-6">
                Despliegues en Amazon Web Services (EC2 Auto Scaling, RDS PostgreSQL, S3, ALB) con 99.9% de disponibilidad garantizada.
              </p>

              {/* AWS Topology Micro Diagram */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-gray-950 rounded-2xl border border-gray-800 mb-6 font-mono text-[10px]">
                <div className="p-2 rounded bg-gray-900 text-center border border-gray-800">
                  <span className="text-sky-400 block font-bold">AWS ALB</span>
                  <span className="text-gray-300">Load Balancer</span>
                </div>
                <div className="p-2 rounded bg-gray-900 text-center border border-gray-800">
                  <span className="text-cyan-400 block font-bold">EC2 Auto</span>
                  <span className="text-gray-300">Scaling</span>
                </div>
                <div className="p-2 rounded bg-gray-900 text-center border border-gray-800">
                  <span className="text-emerald-400 block font-bold">RDS DB</span>
                  <span className="text-gray-300">PostgreSQL</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectServiceForQuote('Infraestructura AWS & DevOps')}
              className="w-full py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Cotizar Arquitectura AWS</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>

          {/* Card 3: Card IA & Automatización (1x1) */}
          <div className="glass-card-pro p-6 rounded-3xl border border-gray-800 flex flex-col justify-between group">
            <div>
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-fit mb-4">
                <Zap className="w-5 h-5 stroke-[1.75]" />
              </div>

              <h3 className="text-lg font-bold text-white mb-2">Agentes IA & Analítica BI</h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Automatización inteligente de procesos y tableros gerenciales en tiempo real.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-gray-950 border border-gray-800 text-[11px] font-mono text-emerald-400 flex items-center justify-between">
              <span>Flujos Automáticos:</span>
              <span className="font-bold">Activo 100%</span>
            </div>
          </div>

          {/* Card 4: Card Respaldo TI & Redes (1x1) */}
          <div className="glass-card-pro p-6 rounded-3xl border border-gray-800 flex flex-col justify-between group">
            <div>
              <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 w-fit mb-4">
                <Server className="w-5 h-5 stroke-[1.75]" />
              </div>

              <h3 className="text-lg font-bold text-white mb-2">Soporte TI & Redes</h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Mantenimiento de hardware (CIIU S9511) y estructuración de redes LAN/WiFi (CIIU G4651).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-gray-950 border border-gray-800 text-[11px] font-mono text-sky-400 flex items-center justify-between">
              <span>Monitoreo 24/7:</span>
              <span className="font-bold">SLA Garantizado</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
