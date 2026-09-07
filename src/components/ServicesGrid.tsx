import React, { useState } from 'react';
import { Code2, Cloud, Bot, ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ServicesGridProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectServiceForQuote }) => {
  const [selectedModule, setSelectedModule] = useState<'erp' | 'sim' | 'telemetry'>('erp');

  const getTabClass = (key: 'erp' | 'sim' | 'telemetry') => {
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
            <span>OFERTA COMERCIAL Y PILARES DE INGENIERÍA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Catálogo Bento de Soluciones Estratégicas
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Tres pilares fundamentales diseñados para optimizar operaciones, escalar plataformas digitales y garantizar continuidad en la nube.
          </p>
        </div>

        {/* Bento Grid Layout - 3 Pillar Commercial Offers */}
        <div id="soluciones" className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Pilar 1: Automatización de Atención & Cotización Comercial */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-400 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700">
                  <Bot className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono-tech px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold">
                  PILAR 1 // IA & VENTAS
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-amber-700 transition-colors">
                1. Automatización de Atención & Cotización Comercial
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Agentes de IA conversacionales (RAG), integración con WhatsApp API, cualificación automática de leads y cotizaciones inmediatas con ROI medible.
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 font-mono-tech text-xs space-y-2">
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Agentes RAG entrenados con tu catálogo</span>
                </div>
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Integración WhatsApp API & Webhooks</span>
                </div>
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cualificación y ROI medible en tiempo real</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectServiceForQuote('Automatización de Atención & Cotización Comercial')}
              className="w-full py-2.5 rounded-lg bg-[#2b5b84] hover:bg-[#1b3852] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm group"
            >
              <span>Cotizar Automatización IA</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform stroke-[2]" />
            </button>
          </div>

          {/* Pilar 2: Desarrollo de Software Crítico a Medida */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#3775a9] transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3.5 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-700">
                  <Code2 className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono-tech px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 font-bold">
                  PILAR 2 // SOFTWARE & UNAD
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#3775a9] transition-colors">
                2. Desarrollo de Software Crítico a Medida
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Plataformas web de alto rendimiento, sistemas ERP/CRM corporativos, simuladores interactivos para UNAD / ECBTI y desarrollo a la medida en React 19 / TypeScript.
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 font-mono-tech text-xs">
                <div className="flex flex-wrap gap-2 mb-3 border-b border-slate-200 pb-2">
                  <button
                    onClick={() => setSelectedModule('erp')}
                    className={getTabClass('erp')}
                  >
                    ERP / CRM
                  </button>
                  <button
                    onClick={() => setSelectedModule('sim')}
                    className={getTabClass('sim')}
                  >
                    Simuladores UNAD
                  </button>
                  <button
                    onClick={() => setSelectedModule('telemetry')}
                    className={getTabClass('telemetry')}
                  >
                    Agro & IoT
                  </button>
                </div>

                {selectedModule === 'erp' && (
                  <div className="space-y-1 text-slate-800">
                    <div className="text-[#2b5b84] font-bold">✓ ERP/CRM & Web Apps Modulares</div>
                    <div className="text-[11px] text-slate-600">Arquitectura Cloud Nativa + REST APIs & PostgreSQL.</div>
                  </div>
                )}

                {selectedModule === 'sim' && (
                  <div className="space-y-1 text-slate-800">
                    <div className="text-[#2b5b84] font-bold">✓ Laboratorios Virtuales UNAD</div>
                    <div className="text-[11px] text-slate-600">Simuladores web docentes con soporte a picos masivos.</div>
                  </div>
                )}

                {selectedModule === 'telemetry' && (
                  <div className="space-y-1 text-slate-800">
                    <div className="text-emerald-700 font-bold">✓ Telemetría IoT Agroindustrial</div>
                    <div className="text-[11px] text-slate-600">Monitoreo de cultivos y sensores en tiempo real.</div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => onSelectServiceForQuote('Desarrollo de Software Crítico a Medida')}
              className="w-full py-2.5 rounded-lg bg-[#2b5b84] hover:bg-[#1b3852] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm group"
            >
              <span>Cotizar Software a Medida</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform stroke-[2]" />
            </button>
          </div>

          {/* Pilar 3: Cloud Architecture, Seguridad & Soporte TI Administrado (SLA) */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-500 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700">
                  <Cloud className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono-tech px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 font-bold">
                  PILAR 3 // CLOUD & SLA
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-sky-700 transition-colors">
                3. Cloud Architecture, Seguridad & Soporte TI Administrado
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Infraestructura elástica en Amazon Web Services (EC2, RDS PostgreSQL, ALB), ciberseguridad, redes y Mesa de Ayuda TI con respuesta bajo SLA.
              </p>

              <div className="grid grid-cols-2 gap-2 p-3.5 bg-slate-50 rounded-xl border border-slate-200 mb-6 font-mono-tech text-[11px]">
                <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                  <div>
                    <span className="text-[#2b5b84] block font-bold">Objetivo 99.9%</span>
                    <span className="text-slate-500 text-[10px]">Sujeto a SLA</span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-emerald-700 block font-bold">SLA Prioritario</span>
                    <span className="text-slate-500 text-[10px]">Mesa de Ayuda TI</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectServiceForQuote('Cloud Architecture, Seguridad & Soporte TI Administrado (SLA)')}
              className="w-full py-2.5 rounded-lg bg-[#2b5b84] hover:bg-[#1b3852] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm group"
            >
              <span>Cotizar Cloud & Soporte SLA</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform stroke-[2]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
