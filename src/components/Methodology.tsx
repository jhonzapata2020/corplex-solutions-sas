import React, { useState } from 'react';
import { CheckCircle2, Code2, ShieldCheck, Cloud, Zap, Layers, ArrowRight, Terminal } from 'lucide-react';
import { METHODOLOGY_STEPS } from '../data/corporateData';

export const Methodology: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-sky-600 stroke-[1.75]" />;
      case 'Layers': return <Layers className="w-5 h-5 text-cyan-600 stroke-[1.75]" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-emerald-600 stroke-[1.75]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-sky-600 stroke-[1.75]" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-cyan-600 stroke-[1.75]" />;
      default: return <Zap className="w-5 h-5 text-[#2b5b84] stroke-[1.75]" />;
    }
  };

  return (
    <section id="metodologia" className="py-20 relative bg-white border-t-4 border-[#3775a9] font-tech text-slate-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-[#2b5b84] text-xs font-mono-tech font-bold mb-4 shadow-sm">
            <Terminal className="w-4 h-4 text-[#3775a9] stroke-[1.75]" />
            <span>METODOLOGÍA DE ENTREGA Y CICLO DE VIDA DE SOFTWARE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Proceso Ágil de 6 Hitos de Ingeniería
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Garantizamos la máxima rigurosidad técnica en proyectos institucionales a través de un pipeline iterativo con entregables claros en cada hito.
          </p>
        </div>

        {/* 6 Step Cards Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {METHODOLOGY_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-sky-50 border-[#3775a9] shadow-sm ring-1 ring-[#3775a9]/40'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-[#3775a9]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono-tech font-bold ${isActive ? 'text-[#2b5b84]' : 'text-slate-400'}`}>
                    0{idx + 1}
                  </span>
                  {getStepIcon(step.icon)}
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-tight line-clamp-2">{step.title}</h4>
              </button>
            );
          })}
        </div>

        {/* Hito Detail Panel */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-slate-900">
          
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-[#2b5b84] text-xs font-mono-tech font-bold">
                HITO 0{activeStep + 1} // {METHODOLOGY_STEPS[activeStep].phaseCode}
              </span>
              <span className="text-xs text-slate-500 font-mono-tech">
                {METHODOLOGY_STEPS[activeStep].subtitle}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              {METHODOLOGY_STEPS[activeStep].title}
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              {METHODOLOGY_STEPS[activeStep].description}
            </p>

            <h4 className="text-xs font-mono-tech text-slate-500 uppercase tracking-wider mb-4 font-bold">
              ENTREGABLES TÉCNICOS VERIFICABLES
            </h4>

            <div className="space-y-3">
              {METHODOLOGY_STEPS[activeStep].deliverables.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[1.75]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 text-slate-900 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                <span className="text-xs font-mono-tech text-slate-500">CONTROL DE CALIDAD</span>
                <span className="text-xs font-mono-tech text-emerald-700 font-bold">Standard CORPLEX S.A.S.</span>
              </div>
              
              <div className="space-y-3 mb-6 font-mono-tech text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-700 shadow-sm">
                  <span className="text-[#2b5b84] font-bold block mb-1">✓ Repositorios Git Privados</span>
                  Flujo GitFlow con ramas aisladas y Code Reviews requeridos.
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-700 shadow-sm">
                  <span className="text-emerald-700 font-bold block mb-1">✓ Transferencia de Activos</span>
                  Entrega formal de código fuente y documentación de APIs.
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % METHODOLOGY_STEPS.length)}
              className="w-full py-2.5 rounded-lg bg-[#2b5b84] hover:bg-[#1b3852] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Avanzar al Siguiente Hito</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
