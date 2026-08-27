import React, { useState } from 'react';
import { CheckCircle2, Code2, ShieldCheck, Cloud, Zap, Layers, ArrowRight, Terminal } from 'lucide-react';
import { METHODOLOGY_STEPS } from '../data/corporateData';

export const Methodology: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-sky-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-cyan-400" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-sky-400" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-cyan-400" />;
      default: return <Zap className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="metodologia" className="py-24 relative bg-slate-950 border-t border-slate-800/80">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold mb-4">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>METODOLOGÍA DE INGENIERÍA & CICLO DE VIDA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Proceso Ágil de Desarrollo e Integración
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Garantizamos la máxima precisión en entregables institucionales mediante un ciclo de vida estructurado en 6 etapas iterativas con control de calidad continuo.
          </p>
        </div>

        {/* Timeline Pipeline Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {METHODOLOGY_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? 'bg-slate-900 border-sky-500 shadow-lg shadow-sky-500/10 ring-1 ring-sky-500/30'
                    : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-sky-400' : 'text-slate-500'}`}>
                    ETAPA {step.number}
                  </span>
                  {getStepIcon(step.icon)}
                </div>
                <h4 className="text-xs font-bold text-white leading-tight line-clamp-2">{step.title}</h4>
              </button>
            );
          })}
        </div>

        {/* Step Detailed View Panel */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold">
                FASE {METHODOLOGY_STEPS[activeStep].number} // {METHODOLOGY_STEPS[activeStep].phaseCode}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {METHODOLOGY_STEPS[activeStep].subtitle}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              {METHODOLOGY_STEPS[activeStep].title}
            </h3>

            <p className="text-slate-300 text-base leading-relaxed mb-8">
              {METHODOLOGY_STEPS[activeStep].description}
            </p>

            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
              ENTREGABLES CLAVE DE ESTA FASE
            </h4>

            <div className="space-y-3">
              {METHODOLOGY_STEPS[activeStep].deliverables.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-slate-200 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs font-mono text-slate-400">CONTROL DE CALIDAD</span>
                <span className="text-xs font-mono text-emerald-400">Standard CORPLEX S.A.S.</span>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="text-sky-400 font-bold block mb-1">✓ Control de Versiones Git</span>
                  Ramas de desarrollo aisladas, Pull Requests aprobados por Lead Architect.
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="text-cyan-400 font-bold block mb-1">✓ Documentación Técnica</span>
                  Diagramación relacional, manuales de usuario y endpoints documentados.
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % METHODOLOGY_STEPS.length)}
              className="w-full py-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Avanzar a la Siguiente Etapa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
