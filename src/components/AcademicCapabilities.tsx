import React, { useState } from 'react';
import { GraduationCap, CheckCircle2, Cpu, BarChart3, RefreshCw, Terminal } from 'lucide-react';

export const AcademicCapabilities: React.FC = () => {
  const [simulatorValue, setSimulatorValue] = useState(75);
  const [isSimulating, setIsSimulating] = useState(false);
  const [concurrencyCount, setConcurrencyCount] = useState(2450);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 1200);
  };

  const handleIncreaseConcurrency = () => {
    setConcurrencyCount(prev => prev + 500);
  };

  return (
    <section id="enfoque-academico" className="py-20 relative bg-slate-50 border-t-4 border-[#3775a9] font-tech text-slate-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-[#2b5b84] text-xs font-mono-tech font-bold mb-4 shadow-sm">
            <GraduationCap className="w-4 h-4 text-[#3775a9] stroke-[1.75]" />
            <span>SECTOR EDUCATIVO & ARTICULACIÓN UNAD (ECBTI)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Ingeniería & Capacidad para Educación Superior
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Plataformas y simuladores web interactivos creados para la Escuela de Ciencias Básicas, Tecnología e Ingeniería (ECBTI - UNAD) y semilleros de investigación.
          </p>
        </div>

        {/* 3 Technical Capacities Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
            <div>
              <div className="p-3 rounded-2xl bg-cyan-50 text-cyan-700 w-fit mb-4 border border-cyan-200">
                <Terminal className="w-5 h-5 stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Simuladores Web & Laboratorios</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prácticas de código, lógica de programación y modelos matemáticos ejecutados directo en el navegador sin descargas extra.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 text-[11px] font-mono-tech text-[#2b5b84] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Estándar LTI / Web Embed
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
            <div>
              <div className="p-3 rounded-2xl bg-sky-50 text-sky-700 w-fit mb-4 border border-sky-200">
                <Cpu className="w-5 h-5 stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Alta Disponibilidad en Exámenes</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Resistencia comprobada para picos masivos de matrícula y evaluaciones nacionales mediante AWS Auto-Scaling.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 text-[11px] font-mono-tech text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Cero caídas garantizado
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
            <div>
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 w-fit mb-4 border border-emerald-200">
                <BarChart3 className="w-5 h-5 stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Trazabilidad I+D+i Semilleros</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sistemas de seguimiento curricular a proyectos de investigación formativa y convocatorias institucionales.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 text-[11px] font-mono-tech text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Auditoría Curricular
            </div>
          </div>

        </div>

        {/* Interactive Dynamic Interactive Demo Component */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono-tech text-[#2b5b84] font-bold block mb-1">DEMOSTRACIÓN INTERACTIVA DE SIMULADOR</span>
              <h3 className="text-xl font-bold text-slate-900">Laboratorio Virtual ECBTI-LAB-01</h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono-tech font-bold">
                Status: Operational (18ms)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4 font-mono-tech text-xs">
              <div className="flex justify-between text-slate-800 font-bold">
                <span>Parámetro de Entrada simulado:</span>
                <span className="text-[#2b5b84] font-bold">{simulatorValue}%</span>
              </div>

              <input
                type="range"
                min="10"
                max="100"
                value={simulatorValue}
                onChange={(e) => setSimulatorValue(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2b5b84]"
              />

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 block text-[11px]">Rendimiento de Simulación:</span>
                  <span className="text-emerald-700 font-bold text-base">
                    {(simulatorValue * 14.5).toFixed(2)} ops/sec
                  </span>
                </div>

                <button
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className="px-4 py-2 rounded-lg bg-[#2b5b84] hover:bg-[#1b3852] text-white font-bold font-sans text-xs flex items-center gap-2 transition-colors disabled:opacity-50 shadow-sm cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                  <span>{isSimulating ? 'Calculando...' : 'Re-calcular'}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 font-mono-tech text-xs text-slate-800">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 text-slate-500">
                <span>SIMULADOR DE CONCURRENCIA NACIONAL</span>
                <button
                  onClick={handleIncreaseConcurrency}
                  className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold cursor-pointer"
                >
                  +500 Estudiantes
                </button>
              </div>

              <div className="text-slate-900 font-bold text-lg">
                {concurrencyCount.toLocaleString()} <span className="text-xs text-slate-500 font-normal">estudiantes concurrentes rindiendo evaluación</span>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden p-0.5 border border-slate-300">
                <div
                  className="bg-gradient-to-r from-sky-500 via-[#3775a9] to-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (concurrencyCount / 5000) * 100)}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Baseline (1,000)</span>
                <span className="text-emerald-700 font-bold">AWS Auto Scaling Activo</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
