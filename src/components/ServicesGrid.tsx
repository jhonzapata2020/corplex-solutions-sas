import React, { useState } from 'react';
import { Code2, Cloud, Zap, Server, CheckCircle2, ArrowRight, Activity, Database, Layers, ShieldCheck, Cpu, Sparkles, Sprout, GraduationCap } from 'lucide-react';

interface ServicesGridProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectServiceForQuote }) => {
  const [selectedModule, setSelectedModule] = useState<'erp' | 'telemetry' | 'ai' | 'sim'>('erp');

  return (
    <section id="servicios" className="py-24 relative bg-gray-950 border-t border-gray-800/80">
      
      {/* Ambient Diffuse Lights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 stroke-[1.75]" />
            <span>SOLUCIONES Y PORTAFOLIO DE INGENIERÍA CORPORATIVA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Catálogo Bento de Servicios Tecnológicos
          </h2>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Arquitectura de soluciones abiertas y escalables para empresas, agroindustria, instituciones de educación superior y entidades públicas.
          </p>
        </div>

        {/* Bento Grid Layout - 4 Open Versatile Corporate Pillars */}
        <div id="soluciones" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Desarrollo de Software a la Medida */}
          <div className="glass-smoked-card p-8 rounded-3xl border border-cyan-500/30 hover:border-cyan-500/60 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3.5 rounded-2xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-400">
                  <Code2 className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold">
                  CIIU J6201 // Core Software
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                1. Desarrollo de Software a la Medida
              </h3>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                Construcción de aplicaciones web interactivas, sistemas ERP/CRM corporativos, telemetría IoT, componentes de IA y simuladores educativos en React/TypeScript y Python/Node.js.
              </p>

              {/* Selector interactivo de especialidad */}
              <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 mb-6 font-mono text-xs">
                <div className="flex flex-wrap gap-2 mb-3 border-b border-gray-800 pb-2">
                  <button
                    onClick={() => setSelectedModule('erp')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedModule === 'erp' ? 'bg-cyan-400 text-black' : 'text-white hover:text-cyan-300'
                    }`}
                  >
                    ERP & Web Apps
                  </button>
                  <button
                    onClick={() => setSelectedModule('telemetry')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedModule === 'telemetry' ? 'bg-emerald-400 text-black' : 'text-white hover:text-emerald-300'
                    }`}
                  >
                    IoT & Telemetría
                  </button>
                  <button
                    onClick={() => setSelectedModule('ai')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedModule === 'ai' ? 'bg-sky-400 text-black' : 'text-white hover:text-sky-300'
                    }`}
                  >
                    Modelos IA
                  </button>
                  <button
                    onClick={() => setSelectedModule('sim')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedModule === 'sim' ? 'bg-amber-400 text-black' : 'text-white hover:text-amber-300'
                    }`}
                  >
                    Simuladores
                  </button>
                </div>

                {selectedModule === 'erp' && (
                  <div className="space-y-1.5 text-gray-200">
                    <div className="text-cyan-300 font-bold">✓ Sistemas de Gestión, Inventarios & Logística</div>
                    <div className="text-[11px] text-gray-300">Arquitectura modular limpia en React 18, TypeScript y REST APIs.</div>
                  </div>
                )}

                {selectedModule === 'telemetry' && (
                  <div className="space-y-1.5 text-gray-200">
                    <div className="text-emerald-300 font-bold">✓ Telemetría IoT & Monitoreo Agro/Industrial</div>
                    <div className="text-[11px] text-gray-300">Captura de datos de sensores en tiempo real con dashboards gráficos.</div>
                  </div>
                )}

                {selectedModule === 'ai' && (
                  <div className="space-y-1.5 text-gray-200">
                    <div className="text-sky-300 font-bold">✓ Inteligencia Artificial Aplicada & BI</div>
                    <div className="text-[11px] text-gray-300">Algoritmos predictivos, análisis documental e integración LLM.</div>
                  </div>
                )}

                {selectedModule === 'sim' && (
                  <div className="space-y-1.5 text-gray-200">
                    <div className="text-amber-300 font-bold">✓ Simuladores Interactivos & Entornos UNAD</div>
                    <div className="text-[11px] text-gray-300">Laboratorios virtuales docentes con soporte a picos de concurrencia.</div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => onSelectServiceForQuote('Desarrollo de Software a la Medida')}
              className="w-full py-3.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Cotizar Desarrollo de Software</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>

          {/* Card 2: Arquitectura Cloud AWS & DevOps */}
          <div className="glass-smoked-card p-8 rounded-3xl border border-sky-500/30 hover:border-sky-500/60 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3.5 rounded-2xl bg-sky-500/15 border border-sky-500/40 text-sky-400">
                  <Cloud className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30 font-bold">
                  CIIU J6202 // Cloud AWS
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                2. Arquitectura Cloud AWS & DevOps
              </h3>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                Despliegue e integración en Amazon Web Services (EC2 Auto Scaling, RDS PostgreSQL cifrado, Amazon S3, ALB). Garantía de 99.9% de disponibilidad y monitoreo continuo 24/7.
              </p>

              <div className="grid grid-cols-3 gap-2 p-3 bg-gray-950 rounded-2xl border border-gray-800 mb-6 font-mono text-[11px]">
                <div className="p-2 rounded-lg bg-gray-900 text-center border border-gray-800">
                  <span className="text-cyan-300 block font-bold">AWS ALB</span>
                  <span className="text-gray-400">Load Balancer</span>
                </div>
                <div className="p-2 rounded-lg bg-gray-900 text-center border border-gray-800">
                  <span className="text-sky-300 block font-bold">EC2 Auto</span>
                  <span className="text-gray-400">Scaling</span>
                </div>
                <div className="p-2 rounded-lg bg-gray-900 text-center border border-gray-800">
                  <span className="text-emerald-300 block font-bold">RDS DB</span>
                  <span className="text-gray-400">PostgreSQL</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectServiceForQuote('Arquitectura Cloud AWS & DevOps')}
              className="w-full py-3.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/40 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Cotizar Arquitectura AWS</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>

          {/* Card 3: Agentes de Inteligencia Artificial & Automatización */}
          <div className="glass-smoked-card p-8 rounded-3xl border border-emerald-500/30 hover:border-emerald-500/60 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400">
                  <Zap className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
                  AI & Automation
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                3. Agentes de IA & Automatización de Datos
              </h3>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                Automatización inteligente de flujos de trabajo, asistentes conversacionales para atención institucional y tableros gerenciales en tiempo real.
              </p>

              <div className="p-3.5 rounded-2xl bg-gray-950 border border-gray-800 text-xs font-mono text-emerald-300 flex items-center justify-between mb-6">
                <span>Flujos Inteligentes:</span>
                <span className="font-bold text-emerald-400">Operatividad 100%</span>
              </div>
            </div>

            <button
              onClick={() => onSelectServiceForQuote('Agentes de Inteligencia Artificial & Automatización')}
              className="w-full py-3.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Cotizar Automatización con IA</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>

          {/* Card 4: Soporte Técnico Especializado TI & Consultoría */}
          <div className="glass-smoked-card p-8 rounded-3xl border border-blue-500/30 hover:border-blue-500/60 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3.5 rounded-2xl bg-blue-500/15 border border-blue-500/40 text-blue-400">
                  <Server className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 font-bold">
                  CIIU S9511 / G4651
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                4. Soporte Técnico Especializado TI & Consultoría
              </h3>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                Mantenimiento de hardware, estructuración de redes corporativas LAN/WiFi, consultoría informática y suministro de equipamiento especializado.
              </p>

              <div className="p-3.5 rounded-2xl bg-gray-950 border border-gray-800 text-xs font-mono text-blue-300 flex items-center justify-between mb-6">
                <span>Atención Continuidad:</span>
                <span className="font-bold text-sky-400">SLA Prioritario</span>
              </div>
            </div>

            <button
              onClick={() => onSelectServiceForQuote('Soporte Técnico Especializado TI & Consultoría')}
              className="w-full py-3.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/40 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Cotizar Soporte TI & Consultoría</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
