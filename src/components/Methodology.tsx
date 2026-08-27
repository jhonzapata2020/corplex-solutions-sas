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
      default: return <Zap className="w-5 h-5 text-emerald-600 stroke-[1.75]" />;
    }
  };

  return (
    <section id="metodologia" className="py-24 relative bg-slate-50 border-t border-slate-200 font-tech">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-mono-tech font-medium mb-4">
            <Terminal className="w-4 h-4 text-cyan-600 stroke-[1.75]" />
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
                    ? 'bg-white border-cyan-600 shadow-sm ring-1 ring-cyan-500/30'
                    : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono-tech font-bold ${isActive ? 'text-cyan-700' : 'text-slate-400'}`}>
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
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-mono-tech font-bold">
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
                <div key={i} className="flex items-start gap-3 text-xs text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[1.75]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs font-mono-tech text-slate-400">CONTROL DE CALIDAD</span>
                <span className="text-xs font-mono-tech text-emerald-400 font-bold">Standard CORPLEX S.A.S.</span>
              </div>
              
              <div className="space-y-3 mb-6 font-mono-tech text-xs">
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-slate-200">
                  <span className="text-cyan-400 font-bold block mb-1">✓ Repositorios Git Privados</span>
                  Flujo GitFlow con ramas aisladas y Code Reviews requeridos.
                </div>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-slate-200">
                  <span className="text-emerald-400 font-bold block mb-1">✓ Transferencia de Activos</span>
                  Entrega formal de código fuente y documentación de APIs.
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % METHODOLOGY_STEPS.length)}
              className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Avanzar al Siguiente Hito</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
