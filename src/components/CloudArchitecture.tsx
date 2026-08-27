import React, { useState } from 'react';
import { Cloud, ShieldCheck, Layers, Cpu, Database, Activity, CheckCircle2, ArrowRight } from 'lucide-react';
import { CLOUD_NODES } from '../data/corporateData';
import type { CloudNode } from '../types';

export const CloudArchitecture: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<CloudNode>(CLOUD_NODES[0]);
  const [isSimulatingTraffic, setIsSimulatingTraffic] = useState(false);

  const triggerTrafficSimulation = () => {
    setIsSimulatingTraffic(true);
    setTimeout(() => {
      setIsSimulatingTraffic(false);
    }, 2500);
  };

  const getNodeIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'Layers': return <Layers className="w-5 h-5 text-sky-600" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-cyan-600" />;
      case 'Database': return <Database className="w-5 h-5 text-amber-600" />;
      default: return <Cloud className="w-5 h-5 text-sky-600" />;
    }
  };

  return (
    <section id="arquitectura-cloud" className="py-24 relative bg-slate-50 border-t border-slate-200 font-tech">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono-tech font-semibold mb-4">
            <Cloud className="w-4 h-4 text-sky-600" />
            <span>INFRAESTRUCTURA Y ORQUESTACIÓN AWS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Arquitectura Cloud de Alta Disponibilidad
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Explora la topología interactiva de infraestructura desplegada en Amazon Web Services (AWS). Aislamiento VPC, balanceo dinámico y redundancia de datos.
          </p>
        </div>

        {/* Diagram & Inspection Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Topology Visualizer Diagram (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm relative">
            
            {/* Control Top Bar */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-mono-tech text-slate-500 block">TOPOLOGÍA AWS DE PRODUCCIÓN</span>
                <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  VPC Subnets & Auto Scaling Active
                </span>
              </div>

              <button
                onClick={triggerTrafficSimulation}
                disabled={isSimulatingTraffic}
                className="px-3.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-mono-tech font-bold flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Activity className={`w-3.5 h-3.5 text-sky-600 ${isSimulatingTraffic ? 'animate-spin' : ''}`} />
                <span>{isSimulatingTraffic ? 'Simulando Peticiones...' : 'Simular Tráfico HTTP'}</span>
              </button>
            </div>

            {/* Interactive Nodes Topology Layout */}
            <div className="space-y-4 relative py-4">
              
              {/* Traffic Pulse Overlay Line */}
              {isSimulatingTraffic && (
                <div className="absolute left-6 top-8 bottom-8 w-1 bg-gradient-to-b from-emerald-500 via-sky-500 to-amber-500 animate-pulse z-20 pointer-events-none rounded-full" />
              )}

              {CLOUD_NODES.map((node, index) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`p-4 sm:p-5 rounded-xl border cursor-pointer transition-all duration-300 flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-white border-cyan-600 shadow-sm ring-1 ring-cyan-500/40 translate-x-1'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Step Number & Node Icon */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono-tech text-slate-400 w-5 text-right">0{index + 1}</span>
                        <div className={`p-3 rounded-xl border ${
                          isSelected ? 'bg-cyan-50 border-cyan-200' : 'bg-white border-slate-200'
                        }`}>
                          {getNodeIcon(node.iconName)}
                        </div>
                      </div>

                      {/* Node Text */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-slate-900">{node.name}</h4>
                          <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-slate-200 text-slate-700 border border-slate-300 font-bold">
                            {node.serviceType}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">{node.description}</p>
                      </div>
                    </div>

                    {/* Metrics Pill */}
                    <div className="hidden sm:flex flex-col items-end shrink-0">
                      <span className="text-xs font-mono-tech font-bold text-cyan-700">{node.metrics}</span>
                      <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-mono-tech font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        {node.status}
                      </span>
                    </div>
                  </div>
                );
              })}

            </div>

          </div>

          {/* Node Detailed Inspection Card (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm sticky top-28">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <span className="text-xs font-mono-tech text-cyan-700 font-bold">INSPECTOR DE NODO AWS</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-mono-tech text-emerald-700 font-bold">
                {selectedNode.status}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200">
                {getNodeIcon(selectedNode.iconName)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedNode.name}</h3>
                <span className="text-xs font-mono-tech text-slate-500">{selectedNode.serviceType}</span>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {selectedNode.description}
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6">
              <span className="text-xs text-slate-500 font-mono-tech block mb-1">MÉTRICA CLAVE // PERFORMANCE</span>
              <span className="text-lg font-mono-tech font-bold text-cyan-700">{selectedNode.metrics}</span>
            </div>

            <h4 className="text-xs font-mono-tech text-slate-500 uppercase tracking-wider mb-3 font-bold">ESPECIFICACIONES TÉCNICAS</h4>
            
            <div className="space-y-2.5 mb-8">
              {selectedNode.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <p className="text-xs text-slate-600 mb-2">¿Necesitas una arquitectura cloud personalizada para tu entidad?</p>
              <a
                href={`https://wa.me/573207105618?text=${encodeURIComponent(`Hola CORPLEX SOLUTIONS, deseo consultar sobre la arquitectura AWS para ${selectedNode.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-700 hover:text-cyan-800 transition-colors"
              >
                <span>Consultar con Arquitecto AWS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
