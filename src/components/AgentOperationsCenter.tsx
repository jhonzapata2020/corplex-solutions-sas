import React, { useState } from 'react';
import {
  MessageSquare,
  Mail,
  Globe,
  Play,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Database,
  FileText,
  ArrowRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';

interface PresetOption {
  id: string;
  label: string;
  sector: string;
  channel: 'whatsapp' | 'email' | 'web';
  message: string;
  crmLeadId: string;
  estimatedRange: string;
}

const PRESET_MESSAGES: PresetOption[] = [
  {
    id: 'comercial',
    label: 'Empresa Comercial',
    sector: 'Comercial & Ventas',
    channel: 'whatsapp',
    message: 'Hola, recibimos 150 cotizaciones por WhatsApp a la semana y las pasamos a mano a Excel. Necesitamos automatizar la cualificación y asignación.',
    crmLeadId: 'LEAD-COM-8941',
    estimatedRange: '$1,800,000 - $3,500,000 COP'
  },
  {
    id: 'educacion',
    label: 'Educación & EdTech',
    sector: 'Educación & UNAD',
    channel: 'web',
    message: 'Necesitamos coordinar 500 estudiantes en maratones de código con ranking en vivo y entrega automática de certificados.',
    crmLeadId: 'LEAD-EDU-3302',
    estimatedRange: '$2,500,000 - $4,800,000 COP'
  },
  {
    id: 'salud',
    label: 'Salud & Clínicas',
    sector: 'Salud & Clínicas',
    channel: 'email',
    message: 'Requerimos clasificar citas prioritarias por correo y WhatsApp sin solicitar ni almacenar datos médicos sensibles.',
    crmLeadId: 'LEAD-MED-7719',
    estimatedRange: '$2,200,000 - $4,000,000 COP'
  }
];

interface AgentOperationsCenterProps {
  onSelectLeadData?: (sector: string, bottleneck: string) => void;
}

export const AgentOperationsCenter: React.FC<AgentOperationsCenterProps> = ({ onSelectLeadData }) => {
  const [selectedPreset, setSelectedPreset] = useState<PresetOption>(PRESET_MESSAGES[0]);
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'email' | 'web'>('whatsapp');
  const [customMessage, setCustomMessage] = useState<string>(PRESET_MESSAGES[0].message);
  
  // Execution Simulation State
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionProgress, setExecutionProgress] = useState<number>(5); // 1 to 5 steps completed
  const [executionTimeMs, setExecutionTimeMs] = useState<number>(1240);

  const handleSelectPreset = (preset: PresetOption) => {
    setSelectedPreset(preset);
    setActiveChannel(preset.channel);
    setCustomMessage(preset.message);
    triggerSimulation();
  };

  const triggerSimulation = () => {
    setIsExecuting(true);
    setExecutionProgress(1);

    // Simulate progressive agent execution pipeline
    setTimeout(() => setExecutionProgress(2), 250);
    setTimeout(() => setExecutionProgress(3), 550);
    setTimeout(() => setExecutionProgress(4), 850);
    setTimeout(() => {
      setExecutionProgress(5);
      setIsExecuting(false);
      setExecutionTimeMs(Math.floor(1100 + Math.random() * 300));
    }, 1150);
  };

  const handleProceedToDiagnosis = () => {
    if (onSelectLeadData) {
      onSelectLeadData(selectedPreset.sector, customMessage);
    }
    
    // Smooth scroll to automation form or contact section
    const targetElement = document.getElementById('formulario-automatizacion') || document.getElementById('contacto');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="centro-operaciones" className="py-16 md:py-24 bg-[#0d1722] text-slate-100 font-tech relative border-b border-[#1b3852]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#142332] border border-[#2b5b84] text-xs font-mono-tech font-bold mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
            <span className="text-emerald-400">AGENT OPERATING DEMO</span>
            <span className="text-slate-500">::</span>
            <span className="text-[#ffd343]">LIVE SIMULATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Centro de Operaciones de Agentes Corplex
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Orquestación omnicanal transparente en tiempo real. Observa cómo la red de agentes procesa solicitudes, clasifica oportunidades y solicita validación comercial.
          </p>

          <div className="mt-3 inline-block px-3.5 py-1 rounded-lg bg-[#1b3852]/60 border border-[#4b7da5]/40 text-[#ffd343] font-mono-tech text-xs font-bold">
            [MODO SIMULACIÓN INTERACTIVA — DEMO TRANSPARENTE EN VIVO]
          </div>
        </div>

        {/* 3-Column Interactive Control Room Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10 items-stretch">
          
          {/* COLUMN 1: Entrada del Cliente (Omnicanal) - 4 Cols */}
          <div className="lg:col-span-4 bg-[#142332] rounded-2xl border border-[#2b5b84] p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2b5b84]">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[#2b5b84]/40 text-[#ffd343]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-mono-tech uppercase">Columna 1: Entrada Omnicanal</h3>
                    <span className="text-[11px] text-slate-400">Canal de Ingreso del Cliente</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  LIVE PAYLOAD
                </span>
              </div>

              {/* Channel Selector */}
              <div className="mb-4">
                <label className="block text-xs font-mono-tech text-slate-400 mb-2 font-bold uppercase">
                  Canal de Ingreso:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setActiveChannel('whatsapp')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeChannel === 'whatsapp'
                        ? 'bg-emerald-600 text-white border border-emerald-400 shadow-md'
                        : 'bg-[#1b3852] text-slate-300 hover:bg-[#2b5b84] border border-[#2b5b84]'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => setActiveChannel('email')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeChannel === 'email'
                        ? 'bg-sky-600 text-white border border-sky-400 shadow-md'
                        : 'bg-[#1b3852] text-slate-300 hover:bg-[#2b5b84] border border-[#2b5b84]'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Correo</span>
                  </button>

                  <button
                    onClick={() => setActiveChannel('web')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeChannel === 'web'
                        ? 'bg-[#3775a9] text-white border border-[#ffd343]/60 shadow-md'
                        : 'bg-[#1b3852] text-slate-300 hover:bg-[#2b5b84] border border-[#2b5b84]'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Form Web</span>
                  </button>
                </div>
              </div>

              {/* Sector Presets (1-Click) */}
              <div className="mb-4">
                <label className="block text-xs font-mono-tech text-slate-400 mb-2 font-bold uppercase">
                  Probar Escenario por Sector (1-Clic):
                </label>
                <div className="space-y-2">
                  {PRESET_MESSAGES.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`w-full p-2.5 rounded-xl text-left text-xs font-tech transition-all cursor-pointer border flex items-center justify-between ${
                        selectedPreset.id === preset.id
                          ? 'bg-[#1b3852] border-[#ffd343] text-white shadow-sm'
                          : 'bg-[#0d1722] border-[#2b5b84] text-slate-300 hover:bg-[#1b3852]/60'
                      }`}
                    >
                      <span className="font-bold">{preset.label}</span>
                      <span className="text-[10px] font-mono-tech text-[#ffd343] font-bold">Probar →</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Payload Payload Area */}
              <div>
                <label className="block text-xs font-mono-tech text-slate-400 mb-2 font-bold uppercase">
                  Payload de Mensaje Entrante:
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={4}
                  className="w-full p-3 rounded-xl bg-[#0d1722] border border-[#2b5b84] text-xs font-mono-tech text-slate-200 focus:outline-none focus:border-[#ffd343] resize-none"
                />
              </div>
            </div>

            {/* Action Trigger */}
            <div className="pt-4 mt-4 border-t border-[#2b5b84]">
              <button
                onClick={triggerSimulation}
                disabled={isExecuting}
                className="w-full py-3 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#0d1722] font-bold text-xs font-sans flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                <Play className={`w-4 h-4 fill-current ${isExecuting ? 'animate-spin' : ''}`} />
                <span>{isExecuting ? 'Orquestando Agentes...' : '▶ Iniciar Cadena de Agentes'}</span>
              </button>
            </div>
          </div>

          {/* COLUMN 2: Orquestador de Agentes (En Cadena Observable) - 4 Cols */}
          <div className="lg:col-span-4 bg-[#142332] rounded-2xl border border-[#2b5b84] p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2b5b84]">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-mono-tech uppercase">Columna 2: Cadena de Agentes</h3>
                    <span className="text-[11px] text-slate-400">Secuencia de Orquestación</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                  OBSERVABLE PIPELINE
                </span>
              </div>

              {/* 5 Agent Chain Sequence */}
              <div className="space-y-3 font-mono-tech text-xs">
                
                {/* Agent 1 */}
                <div className={`p-3 rounded-xl border transition-all duration-300 ${
                  executionProgress >= 1
                    ? 'bg-[#1b3852] border-emerald-500/60 text-white'
                    : 'bg-[#0d1722] border-[#2b5b84]/50 text-slate-500'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      01. Agente de Recepción
                    </span>
                    <span className="text-[10px] text-slate-400">0.1s | 99% Conf.</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans">
                    Canal: <strong className="uppercase text-emerald-300">{activeChannel}</strong>. Payload verificado y sanitizado.
                  </p>
                </div>

                {/* Agent 2 */}
                <div className={`p-3 rounded-xl border transition-all duration-300 ${
                  executionProgress >= 2
                    ? 'bg-[#1b3852] border-emerald-500/60 text-white'
                    : 'bg-[#0d1722] border-[#2b5b84]/50 text-slate-500'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sky-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                      02. Agente de Intención
                    </span>
                    <span className="text-[10px] text-slate-400">0.3s | 97% Conf.</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans">
                    Sector: <strong className="text-sky-300">{selectedPreset.sector}</strong>. Intención: Automatización Operativa.
                  </p>
                </div>

                {/* Agent 3 */}
                <div className={`p-3 rounded-xl border transition-all duration-300 ${
                  executionProgress >= 3
                    ? 'bg-[#1b3852] border-emerald-500/60 text-white'
                    : 'bg-[#0d1722] border-[#2b5b84]/50 text-slate-500'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      03. Agente de Calificación
                    </span>
                    <span className="text-[10px] text-slate-400">0.6s | 95% Conf.</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans">
                    Complejidad: <strong className="text-amber-300">Media / Alta</strong>. Proceso crítico identificado.
                  </p>
                </div>

                {/* Agent 4 */}
                <div className={`p-3 rounded-xl border transition-all duration-300 ${
                  executionProgress >= 4
                    ? 'bg-[#1b3852] border-emerald-500/60 text-white'
                    : 'bg-[#0d1722] border-[#2b5b84]/50 text-slate-500'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#ffd343] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ffd343]" />
                      04. Agente Cotizador & Reglas
                    </span>
                    <span className="text-[10px] text-slate-400">0.9s | 94% Conf.</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans">
                    Rango orientativo: <strong className="text-[#ffd343]">{selectedPreset.estimatedRange}</strong>.
                  </p>
                </div>

                {/* Agent 5 - Human Supervisor */}
                <div className={`p-3 rounded-xl border transition-all duration-300 ${
                  executionProgress >= 5
                    ? 'bg-[#2b1f13] border-amber-500/80 text-white'
                    : 'bg-[#0d1722] border-[#2b5b84]/50 text-slate-500'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-amber-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      05. Supervisión Comercial
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-200 font-bold">
                      REQUERIDA
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-200/90 font-sans">
                    Badge Ámbar: Se requiere revisión del equipo comercial Corplex antes de confirmación final.
                  </p>
                </div>

              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#2b5b84] text-[11px] font-mono-tech text-slate-400 flex items-center justify-between">
              <span>ESTADO DE PIPELINE:</span>
              <span className="text-emerald-400 font-bold">
                {executionProgress === 5 ? '100% COMPLETADO' : `PROCESANDO STEPS (${executionProgress}/5)`}
              </span>
            </div>
          </div>

          {/* COLUMN 3: Resultado Operativo Tangible - 4 Cols */}
          <div className="lg:col-span-4 bg-[#142332] rounded-2xl border border-[#2b5b84] p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2b5b84]">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-mono-tech uppercase">Columna 3: Resultado Tangible</h3>
                    <span className="text-[11px] text-slate-400">Outputs Generados en CRM</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  REALTIME CRM OUTPUT
                </span>
              </div>

              {/* Tangible Cards */}
              <div className="space-y-4">
                
                {/* Lead CRM Card */}
                <div className="p-3.5 rounded-xl bg-[#0d1722] border border-[#2b5b84]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono-tech font-bold text-slate-400 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-sky-400" />
                      Lead Creado (`automation_leads`)
                    </span>
                    <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">
                      {selectedPreset.crmLeadId}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs text-slate-300 font-tech">
                    <p><strong className="text-slate-400">Sector:</strong> {selectedPreset.sector}</p>
                    <p><strong className="text-slate-400">Canal:</strong> WhatsApp / Omnicanal</p>
                    <p><strong className="text-slate-400">Prioridad:</strong> <span className="text-amber-300 font-bold">Alta</span></p>
                  </div>
                </div>

                {/* Quotation Draft Card */}
                <div className="p-3.5 rounded-xl bg-[#0d1722] border border-[#2b5b84]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono-tech font-bold text-slate-400 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#ffd343]" />
                      Cotización Borrador Preliminar
                    </span>
                    <span className="text-[10px] font-mono-tech text-[#ffd343] font-bold">
                      ESTIMACIÓN
                    </span>
                  </div>
                  <div className="space-y-1 text-xs text-slate-300 font-tech">
                    <p><strong className="text-slate-400">Rango Estimado:</strong> <span className="text-[#ffd343] font-bold">{selectedPreset.estimatedRange}</span></p>
                    <p><strong className="text-slate-400">Vigencia Borrador:</strong> 7 días calendario</p>
                    <p className="text-[11px] text-slate-400 italic">Sujeto a validación técnica de arquitectura.</p>
                  </div>
                </div>

                {/* Follow-up Task Card */}
                <div className="p-3.5 rounded-xl bg-[#0d1722] border border-[#2b5b84]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono-tech font-bold text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      Tarea de Seguimiento Programada
                    </span>
                    <span className="text-[10px] font-mono-tech text-emerald-400 font-bold">
                      +24 HORAS
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-tech">
                    Asignada a Consultor Comercial Corplex para llamada de validación técnica y Ley 1581.
                  </p>
                </div>

              </div>
            </div>

            {/* CTA Final */}
            <div className="pt-4 mt-4 border-t border-[#2b5b84]">
              <button
                onClick={handleProceedToDiagnosis}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#3775a9] to-[#2b5b84] hover:from-[#2b5b84] hover:to-[#1b3852] text-white font-bold text-xs font-sans flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer border border-[#ffd343]/50"
              >
                <span>Quiero este flujo en mi empresa (Solicitar Diagnóstico)</span>
                <ArrowRight className="w-4 h-4 text-[#ffd343]" />
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM TIMELINE & OBSERVABILITY BAR */}
        <div className="bg-[#142332] rounded-2xl border border-[#2b5b84] p-4 sm:p-6 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            
            <div className="p-3 rounded-xl bg-[#0d1722] border border-[#2b5b84]">
              <div className="text-xs font-mono-tech text-slate-400 mb-1">DURACIÓN TOTAL</div>
              <div className="text-lg font-bold text-emerald-400 font-mono-tech">{executionTimeMs} ms ({(executionTimeMs / 1000).toFixed(2)}s)</div>
            </div>

            <div className="p-3 rounded-xl bg-[#0d1722] border border-[#2b5b84]">
              <div className="text-xs font-mono-tech text-slate-400 mb-1">PRECISIÓN ORQUESTADOR</div>
              <div className="text-lg font-bold text-[#ffd343] font-mono-tech">96.4% Accuracy</div>
            </div>

            <div className="p-3 rounded-xl bg-[#0d1722] border border-[#2b5b84]">
              <div className="text-xs font-mono-tech text-slate-400 mb-1">SISTEMAS IMPACTADOS</div>
              <div className="text-xs font-bold text-sky-300 font-mono-tech pt-1">CRM Supabase + WhatsApp API</div>
            </div>

            <div className="p-3 rounded-xl bg-[#0d1722] border border-[#2b5b84]">
              <div className="text-xs font-mono-tech text-slate-400 mb-1">PROTOCOLO DE SEGURIDAD</div>
              <div className="text-xs font-bold text-emerald-300 font-mono-tech pt-1 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Ley 1581 & AES-256
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
