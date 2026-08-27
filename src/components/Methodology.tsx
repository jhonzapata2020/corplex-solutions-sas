import React, { useState } from 'react';
import { CheckCircle2, Code2, ShieldCheck, Cloud, Zap, Layers, ArrowRight, Terminal } from 'lucide-react';
import { METHODOLOGY_STEPS } from '../data/corporateData';

export const Methodology: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-sky-400 stroke-[1.75]" />;
      case 'Layers': return <Layers className="w-5 h-5 text-cyan-400 stroke-[1.75]" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-emerald-400 stroke-[1.75]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-sky-400 stroke-[1.75]" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-cyan-400 stroke-[1.75]" />;
      default: return <Zap className="w-5 h-5 text-emerald-400 stroke-[1.75]" />;
    }
  };

  return (
    <section id="metodologia" className="py-24 relative bg-gray-950 border-t border-gray-800/80">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-4">
            <Terminal className="w-4 h-4 text-cyan-400 stroke-[1.75]" />
            <span>METODOLOGÍA DE ENTREGA Y CICLO DE VIDA DE SOFTWARE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Proceso Ágil de 6 Hitos de Ingeniería
          </h2>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
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
                className={`p-4 rounded-2xl border text-left transition-all duration-300 ${
                  isActive
                    ? 'bg-gray-900 border-sky-500 shadow-xl shadow-sky-500/10 ring-1 ring-sky-500/30'
                    : 'bg-gray-900/40 border-gray-800/80 hover:bg-gray-900/80 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-sky-400' : 'text-gray-500'}`}>
                    0{idx + 1}
                  </span>
                  {getStepIcon(step.icon)}
                </div>
                <h4 className="text-xs font-bold text-white leading-tight line-clamp-2">{step.title}</h4>
              </button>
            );
          })}
        </div>

        {/* Hito Detail Panel */}
        <div className="glass-card-pro p-6 sm:p-10 rounded-3xl border border-gray-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold">
                HITO 0{activeStep + 1} // {METHODOLOGY_STEPS[activeStep].phaseCode}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {METHODOLOGY_STEPS[activeStep].subtitle}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              {METHODOLOGY_STEPS[activeStep].title}
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed mb-8">
              {METHODOLOGY_STEPS[activeStep].description}
            </p>

            <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-4">
              ENTREGABLES TÉCNICOS VERIFICABLES
            </h4>

            <div className="space-y-3">
              {METHODOLOGY_STEPS[activeStep].deliverables.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-xs text-gray-200 bg-gray-950 p-3 rounded-xl border border-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 stroke-[1.75]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-gray-950 p-6 rounded-2xl border border-gray-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
                <span className="text-xs font-mono text-gray-400">CONTROL DE CALIDAD</span>
                <span className="text-xs font-mono text-emerald-400">Standard CORPLEX S.A.S.</span>
              </div>
              
              <div className="space-y-3 mb-6 font-mono text-xs">
                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 text-gray-300">
                  <span className="text-sky-400 font-bold block mb-1">✓ Repositorios Git Privados</span>
                  Flujo GitFlow con ramas aisladas y Code Reviews requeridos.
                </div>
                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 text-gray-300">
                  <span className="text-cyan-400 font-bold block mb-1">✓ Transferencia de Activos</span>
                  Entrega formal de código fuente y documentación de APIs.
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % METHODOLOGY_STEPS.length)}
              className="w-full py-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
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
