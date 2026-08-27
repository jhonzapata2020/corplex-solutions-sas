import React, { useState } from 'react';
import { Code2, Cloud, Zap, Server, ArrowRight, Sparkles } from 'lucide-react';

interface ServicesGridProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectServiceForQuote }) => {
  const [selectedModule, setSelectedModule] = useState<'erp' | 'telemetry' | 'ai' | 'sim'>('erp');

  const getTabClass = (key: 'erp' | 'telemetry' | 'ai' | 'sim') => {
    const isSelected = selectedModule === key;
    if (isSelected) {
      return 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/80 shadow-sm font-bold px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer';
    }
    return 'bg-[#1b3852] text-slate-200 hover:bg-[#2b5b84] border border-[#4b7da5]/40 font-medium px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer';
  };

  return (
    <section id="servicios" className="py-24 relative bg-[#2b5b84] border-t border-[#1b3852] font-tech text-slate-100">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#142332] border border-cyan-500/40 text-cyan-300 text-xs font-mono-tech font-medium mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 stroke-[1.75]" />
            <span>SOLUCIONES Y PORTAFOLIO DE INGENIERÍA CORPORATIVA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Catálogo Bento de Servicios Tecnológicos
          </h2>

          <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
            Arquitectura de soluciones abiertas y escalables para empresas, agroindustria, instituciones de educación superior y entidades públicas.
          </p>
        </div>

        {/* Bento Grid Layout - 4 Open Versatile Corporate Pillars */}
        <div id="soluciones" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Desarrollo de Software a la Medida */}
          <div className="bg-[#1b3852] p-8 rounded-2xl border border-[#4b7da5]/40 shadow-2xl hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3.5 rounded-2xl bg-[#142332] border border-[#2b5b84] text-cyan-400">
                  <Code2 className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono-tech px-3 py-1 rounded-full bg-[#142332] text-cyan-300 border border-cyan-500/30 font-medium">
                  CIIU J6201 // Core Software
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                1. Desarrollo de Software a la Medida
              </h3>

              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-6">
                Construcción de aplicaciones web interactivas, sistemas ERP/CRM corporativos, telemetría IoT, componentes de IA y simuladores educativos en React/TypeScript y Python/Node.js.
              </p>

              {/* Selector interactivo de especialidad */}
              <div className="bg-[#142332] p-4 rounded-xl border border-[#2b5b84] mb-6 font-mono-tech text-xs">
                <div className="flex flex-wrap gap-2 mb-3 border-b border-[#2b5b84] pb-2">
                  <button
                    onClick={() => setSelectedModule('erp')}
                    className={getTabClass('erp')}
                  >
                    ERP & Web Apps
                  </button>
                  <button
                    onClick={() => setSelectedModule('telemetry')}
                    className={getTabClass('telemetry')}
                  >
                    IoT & Telemetría
                  </button>
                  <button
                    onClick={() => setSelectedModule('ai')}
                    className={getTabClass('ai')}
                  >
                    Modelos IA
                  </button>
                  <button
                    onClick={() => setSelectedModule('sim')}
                    className={getTabClass('sim')}
                  >
                    Simuladores
                  </button>
                </div>

                {selectedModule === 'erp' && (
                  <div className="space-y-1.5 text-slate-100">
                    <div className="text-cyan-300 font-bold">✓ Sistemas de Gestión, Inventarios & Logística</div>
                    <div className="text-[11px] text-slate-300">Arquitectura modular limpia en React 18, TypeScript y REST APIs.</div>
                  </div>
                )}

                {selectedModule === 'telemetry' && (
                  <div className="space-y-1.5 text-slate-100">
                    <div className="text-emerald-400 font-bold">✓ Telemetría IoT & Monitoreo Agro/Industrial</div>
                    <div className="text-[11px] text-slate-300">Captura de datos de sensores en tiempo real con dashboards gráficos.</div>
                  </div>
                )}

                {selectedModule === 'ai' && (
                  <div className="space-y-1.5 text-slate-100">
                    <div className="text-amber-300 font-bold">✓ Inteligencia Artificial Aplicada & BI</div>
                    <div className="text-[11px] text-slate-300">Algoritmos predictivos, análisis documental e integración LLM.</div>
                  </div>
                )}

                {selectedModule === 'sim' && (
                  <div className="space-y-1.5 text-slate-100">
                    <div className="text-cyan-300 font-bold">✓ Simuladores Interactivos & Entornos UNAD</div>
                    <div className="text-[11px] text-slate-300">Laboratorios virtuales docentes con soporte a picos de concurrencia.</div>
                  </div>
                )}
              </div>
            </div>

            {/* Refined Cyan Glass Button */}
            <button
              onClick={() => onSelectServiceForQuote('Desarrollo de Software a la Medida')}
              className="w-full py-3 rounded-xl bg-[#142332] hover:bg-cyan-950/60 text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-400/80 font-medium text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm group"
            >
              <span>Cotizar Desarrollo de Software</span>
              <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform stroke-[2]" />
            </button>
          </div>

          {/* Card 2: Arquitectura Cloud AWS & DevOps */}
          <div className="bg-[#1b3852] p-8 rounded-2xl border border-[#4b7da5]/40 shadow-2xl hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3.5 rounded-2xl bg-[#142332] border border-[#2b5b84] text-sky-400">
                  <Cloud className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono-tech px-3 py-1 rounded-full bg-[#142332] text-sky-300 border border-sky-400/30 font-medium">
                  CIIU J6202 // Cloud AWS
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                2. Arquitectura Cloud AWS & DevOps
              </h3>

              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-6">
                Despliegue e integración en Amazon Web Services (EC2 Auto Scaling, RDS PostgreSQL cifrado, Amazon S3, ALB). Garantía de 99.9% de disponibilidad y monitoreo continuo 24/7.
              </p>

              <div className="grid grid-cols-3 gap-2 p-3 bg-[#142332] rounded-xl border border-[#2b5b84] mb-6 font-mono-tech text-[11px]">
                <div className="p-2 rounded-lg bg-[#1b3852] text-center border border-[#4b7da5]/30">
                  <span className="text-sky-300 block font-bold">AWS ALB</span>
                  <span className="text-slate-400">Load Balancer</span>
                </div>
                <div className="p-2 rounded-lg bg-[#1b3852] text-center border border-[#4b7da5]/30">
                  <span className="text-cyan-300 block font-bold">EC2 Auto</span>
                  <span className="text-slate-400">Scaling</span>
                </div>
                <div className="p-2 rounded-lg bg-[#1b3852] text-center border border-[#4b7da5]/30">
                  <span className="text-emerald-400 block font-bold">RDS DB</span>
                  <span className="text-slate-400">PostgreSQL</span>
                </div>
              </div>
            </div>

            {/* Refined Cyan Glass Button */}
            <button
              onClick={() => onSelectServiceForQuote('Arquitectura Cloud AWS & DevOps')}
              className="w-full py-3 rounded-xl bg-[#142332] hover:bg-cyan-950/60 text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-400/80 font-medium text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm group"
            >
              <span>Cotizar Arquitectura AWS</span>
              <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform stroke-[2]" />
            </button>
          </div>

          {/* Card 3: Agentes de Inteligencia Artificial & Automatización */}
          <div className="bg-[#1b3852] p-8 rounded-2xl border border-[#4b7da5]/40 shadow-2xl hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3.5 rounded-2xl bg-[#142332] border border-[#2b5b84] text-amber-400">
                  <Zap className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono-tech px-3 py-1 rounded-full bg-[#142332] text-amber-300 border border-amber-400/30 font-medium">
                  AI & Automation
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                3. Agentes de IA & Automatización de Datos
              </h3>

              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-6">
                Automatización inteligente de flujos de trabajo, asistentes conversacionales para atención institucional y tableros gerenciales en tiempo real.
              </p>

              <div className="p-3.5 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs font-mono-tech text-amber-300 flex items-center justify-between mb-6">
                <span>Flujos Inteligentes:</span>
                <span className="font-bold text-emerald-400">Operatividad 100%</span>
              </div>
            </div>

            {/* Refined Cyan Glass Button */}
            <button
              onClick={() => onSelectServiceForQuote('Agentes de Inteligencia Artificial & Automatización')}
              className="w-full py-3 rounded-xl bg-[#142332] hover:bg-cyan-950/60 text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-400/80 font-medium text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm group"
            >
              <span>Cotizar Automatización con IA</span>
              <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform stroke-[2]" />
            </button>
          </div>

          {/* Card 4: Soporte Técnico Especializado TI & Consultoría */}
          <div className="bg-[#1b3852] p-8 rounded-2xl border border-[#4b7da5]/40 shadow-2xl hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3.5 rounded-2xl bg-[#142332] border border-[#2b5b84] text-emerald-400">
                  <Server className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono-tech px-3 py-1 rounded-full bg-[#142332] text-emerald-300 border border-emerald-400/30 font-medium">
                  CIIU S9511 / G4651
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                4. Soporte Técnico Especializado TI & Consultoría
              </h3>

              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-6">
                Mantenimiento de hardware, estructuración de redes corporativas LAN/WiFi, consultoría informática y suministro de equipamiento especializado.
              </p>

              <div className="p-3.5 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs font-mono-tech text-emerald-300 flex items-center justify-between mb-6">
                <span>Atención Continuidad:</span>
                <span className="font-bold text-cyan-300">SLA Prioritario</span>
              </div>
            </div>

            {/* Refined Cyan Glass Button */}
            <button
              onClick={() => onSelectServiceForQuote('Soporte Técnico Especializado TI & Consultoría')}
              className="w-full py-3 rounded-xl bg-[#142332] hover:bg-cyan-950/60 text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-400/80 font-medium text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm group"
            >
              <span>Cotizar Soporte TI & Consultoría</span>
              <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform stroke-[2]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
