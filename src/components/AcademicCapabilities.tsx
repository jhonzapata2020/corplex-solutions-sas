import React, { useState } from 'react';
import { GraduationCap, Play, ShieldCheck, CheckCircle2, Cpu, BarChart3, Database, Layers, Sparkles, RefreshCw, Terminal, Users } from 'lucide-react';
import { ACADEMIC_FEATURES } from '../data/corporateData';

export const AcademicCapabilities: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
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
    <section id="enfoque-academico" className="py-24 relative bg-slate-950 border-t border-slate-800/80">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono font-semibold mb-4">
            <GraduationCap className="w-4 h-4 text-sky-400" />
            <span>ENFOQUE SECTOR EDUCATIVO & UNAD (ECBTI)</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Capacidades Tecnológicas para Educación Superior e Investigación
          </h2>
          
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Soluciones de ingeniería diseñadas para la Escuela de Ciencias Básicas, Tecnología e Ingeniería (ECBTI - UNAD), semilleros de investigación y plataformas institucionales de alto impacto.
          </p>
        </div>

        {/* Interactive Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Navigation Sidebar Cards */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {ACADEMIC_FEATURES.map((feature, idx) => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(idx)}
                className={`text-left p-6 rounded-2xl transition-all duration-300 border ${
                  activeTab === idx
                    ? 'bg-slate-900/90 border-sky-500/60 shadow-lg shadow-sky-500/10 ring-1 ring-sky-500/40'
                    : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl shrink-0 ${
                    activeTab === idx ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'bg-slate-800/80 text-slate-400'
                  }`}>
                    {idx === 0 && <GraduationCap className="w-6 h-6" />}
                    {idx === 1 && <BarChart3 className="w-6 h-6" />}
                    {idx === 2 && <Cpu className="w-6 h-6" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2 inline-block">
                      {feature.badge}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-1 leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {feature.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Dynamic Interactive Demo Panel */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between relative overflow-hidden">
            
            {/* Active Feature Header */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-xs font-mono text-slate-400">
                  CASO DE USO // {ACADEMIC_FEATURES[activeTab].subtitle}
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verificado ECBTI Standard</span>
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                {ACADEMIC_FEATURES[activeTab].title}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {ACADEMIC_FEATURES[activeTab].description}
              </p>

              {/* Feature Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {ACADEMIC_FEATURES[activeTab].highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Demo Component Box */}
            <div className="bg-slate-950/90 rounded-2xl p-5 border border-slate-800/90 shadow-inner">
              
              {/* Demo 1: Simulator Interactive Preview */}
              {activeTab === 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                    <span className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-sky-400" />
                      Simulador de Prácticas Web // ECBTI-LAB-01
                    </span>
                    <span className="text-sky-400">Status: Running</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-300 font-mono">
                      <span>Carga de Variables de Entrada:</span>
                      <span className="text-sky-300 font-bold">{simulatorValue}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={simulatorValue}
                      onChange={(e) => setSimulatorValue(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                    />
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 flex items-center justify-between">
                    <div>
                      <span className="text-slate-500">Calculado: </span>
                      <span className="text-emerald-400 font-bold">
                        {(simulatorValue * 14.5).toFixed(2)} ops/sec
                      </span>
                    </div>
                    <button
                      onClick={handleSimulate}
                      disabled={isSimulating}
                      className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-sans text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                      <span>{isSimulating ? 'Ejecutando...' : 'Re-calcular'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Demo 2: Semilleros & Tracking Preview */}
              {activeTab === 1 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-cyan-400" />
                      Semillero de Investigación // Matriz de Avances
                    </span>
                    <span className="text-emerald-400 font-bold">12 Proyectos Activos</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-white">PROJ-2026-UNAD: Arquitectura IoT & Sensorización</div>
                        <div className="text-[11px] text-slate-400">Tutores: ECBTI Urabá • 4 Estudiantes</div>
                      </div>
                      <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono">
                        Aprobado (98%)
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-white">PROJ-2026-CLOUD: Microservicios para Registro Curricular</div>
                        <div className="text-[11px] text-slate-400">Fase 3: Pruebas de Carga AWS</div>
                      </div>
                      <span className="px-2 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-mono">
                        En Revisión (75%)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Demo 3: AWS Auto-scaling Concurrency Demo */}
              {activeTab === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                    <span className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-emerald-400" />
                      AWS Auto Scaling Stress Monitor
                    </span>
                    <span className="text-emerald-400 font-bold">Latencia: 18ms</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Estudiantes Concurrentes</div>
                      <div className="text-2xl font-mono font-bold text-white">
                        {concurrencyCount.toLocaleString()} <span className="text-xs font-normal text-slate-400">usuarios</span>
                      </div>
                    </div>
                    <button
                      onClick={handleIncreaseConcurrency}
                      className="px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-2 transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Simular Pico +500</span>
                    </button>
                  </div>

                  <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (concurrencyCount / 5000) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Baseline (1,000)</span>
                    <span>Capacidad Auto Scaled (5,000+)</span>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
