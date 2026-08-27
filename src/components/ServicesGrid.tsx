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
      return 'bg-[#2b5b84] text-white font-bold px-3 py-1.5 rounded-md text-xs transition-all cursor-pointer shadow-sm';
    }
    return 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 font-medium px-3 py-1.5 rounded-md text-xs transition-all cursor-pointer';
  };

  return (
    <section id="servicios" className="py-20 relative bg-white border-t-4 border-[#3775a9] font-tech text-slate-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-[#2b5b84] text-xs font-mono-tech font-bold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#3775a9] stroke-[1.75]" />
            <span>SOLUCIONES Y PORTAFOLIO DE INGENIERÍA CORPORATIVA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Catálogo Bento de Servicios Tecnológicos
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Arquitectura de soluciones abiertas y escalables para empresas, agroindustria, instituciones de educación superior y entidades públicas.
          </p>
        </div>

        {/* Bento Grid Layout - 4 Open Versatile Corporate Pillars */}
        <div id="soluciones" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Desarrollo de Software a la Medida */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#3775a9] transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3.5 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-700">
                  <Code2 className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono-tech px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 font-bold">
                  CIIU J6201 // Core Software
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#3775a9] transition-colors">
                1. Desarrollo de Software a la Medida
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Construcción de aplicaciones web interactivas, sistemas ERP/CRM corporativos, telemetría IoT, componentes de IA y simuladores educativos en React/TypeScript y Python/Node.js.
              </p>

              {/* Selector interactivo de especialidad */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 font-mono-tech text-xs">
                <div className="flex flex-wrap gap-2 mb-3 border-b border-slate-200 pb-2">
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
                  <div className="space-y-1.5 text-slate-800">
                    <div className="text-[#2b5b84] font-bold">✓ Sistemas de Gestión, Inventarios & Logística</div>
                    <div className="text-[11px] text-slate-600">Arquitectura modular limpia en React 18, TypeScript y REST APIs.</div>
                  </div>
                )}

                {selectedModule === 'telemetry' && (
                  <div className="space-y-1.5 text-slate-800">
                    <div className="text-emerald-700 font-bold">✓ Telemetría IoT & Monitoreo Agro/Industrial</div>
                    <div className="text-[11px] text-slate-600">Captura de datos de sensores en tiempo real con dashboards gráficos.</div>
                  </div>
                )}

                {selectedModule === 'ai' && (
                  <div className="space-y-1.5 text-slate-800">
                    <div className="text-amber-700 font-bold">✓ Inteligencia Artificial Aplicada & BI</div>
                    <div className="text-[11px] text-slate-600">Algoritmos predictivos, análisis documental e integración LLM.</div>
                  </div>
                )}

                {selectedModule === 'sim' && (
                  <div className="space-y-1.5 text-slate-800">
                    <div className="text-[#2b5b84] font-bold">✓ Simuladores Interactivos & Entornos UNAD</div>
                    <div className="text-[11px] text-slate-600">Laboratorios virtuales docentes con soporte a picos de concurrencia.</div>
                  </div>
                )}
              </div>
            </div>

            {/* Python.org Style Clean Navy Action Button */}
            <button
              onClick={() => onSelectServiceForQuote('Desarrollo de Software a la Medida')}
              className="w-full py-2.5 rounded-lg bg-[#2b5b84] hover:bg-[#1b3852] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm group"
            >
              <span>Cotizar Desarrollo de Software</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform stroke-[2]" />
            </button>
          </div>

          {/* Card 2: Arquitectura Cloud AWS & DevOps */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#3775a9] transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700">
                  <Cloud className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono-tech px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 font-bold">
                  CIIU J6202 // Cloud AWS
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-sky-700 transition-colors">
                2. Arquitectura Cloud AWS & DevOps
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Despliegue e integración en Amazon Web Services (EC2 Auto Scaling, RDS PostgreSQL cifrado, Amazon S3, ALB). Garantía de 99.9% de disponibilidad y monitoreo continuo 24/7.
              </p>

              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 mb-6 font-mono-tech text-[11px]">
                <div className="p-2 rounded-lg bg-white text-center border border-slate-200 shadow-sm">
                  <span className="text-[#2b5b84] block font-bold">AWS ALB</span>
                  <span className="text-slate-500">Load Balancer</span>
                </div>
                <div className="p-2 rounded-lg bg-white text-center border border-slate-200 shadow-sm">
                  <span className="text-[#3775a9] block font-bold">EC2 Auto</span>
                  <span className="text-slate-500">Scaling</span>
                </div>
                <div className="p-2 rounded-lg bg-white text-center border border-slate-200 shadow-sm">
                  <span className="text-emerald-700 block font-bold">RDS DB</span>
                  <span className="text-slate-500">PostgreSQL</span>
                </div>
              </div>
            </div>

            {/* Python.org Style Clean Navy Action Button */}
            <button
              onClick={() => onSelectServiceForQuote('Arquitectura Cloud AWS & DevOps')}
              className="w-full py-2.5 rounded-lg bg-[#2b5b84] hover:bg-[#1b3852] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm group"
            >
              <span>Cotizar Arquitectura AWS</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform stroke-[2]" />
            </button>
          </div>

          {/* Card 3: Agentes de Inteligencia Artificial & Automatización */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#3775a9] transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700">
                  <Zap className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono-tech px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold">
                  AI & Automation
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-amber-700 transition-colors">
                3. Agentes de IA & Automatización de Datos
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Automatización inteligente de flujos de trabajo, asistentes conversacionales para atención institucional y tableros gerenciales en tiempo real.
              </p>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono-tech text-amber-700 flex items-center justify-between mb-6">
                <span>Flujos Inteligentes:</span>
                <span className="font-bold text-emerald-700">Operatividad 100%</span>
              </div>
            </div>

            {/* Python.org Style Clean Navy Action Button */}
            <button
              onClick={() => onSelectServiceForQuote('Agentes de Inteligencia Artificial & Automatización')}
              className="w-full py-2.5 rounded-lg bg-[#2b5b84] hover:bg-[#1b3852] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm group"
            >
              <span>Cotizar Automatización con IA</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform stroke-[2]" />
            </button>
          </div>

          {/* Card 4: Soporte Técnico Especializado TI & Consultoría */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#3775a9] transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <Server className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono-tech px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  CIIU S9511 / G4651
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                4. Soporte Técnico Especializado TI & Consultoría
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Mantenimiento de hardware, estructuración de redes corporativas LAN/WiFi, consultoría informática y suministro de equipamiento especializado.
              </p>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono-tech text-emerald-700 flex items-center justify-between mb-6">
                <span>Atención Continuidad:</span>
                <span className="font-bold text-[#2b5b84]">SLA Prioritario</span>
              </div>
            </div>

            {/* Python.org Style Clean Navy Action Button */}
            <button
              onClick={() => onSelectServiceForQuote('Soporte Técnico Especializado TI & Consultoría')}
              className="w-full py-2.5 rounded-lg bg-[#2b5b84] hover:bg-[#1b3852] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm group"
            >
              <span>Cotizar Soporte TI & Consultoría</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform stroke-[2]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
