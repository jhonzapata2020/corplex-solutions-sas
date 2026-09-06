import React, { useState, useEffect } from 'react';
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
  Cpu,
  X,
  Terminal,
  Activity
} from 'lucide-react';
import { Logo } from './Logo';

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
  isOpen: boolean;
  onClose: () => void;
  onSelectLeadData?: (sector: string, bottleneck: string) => void;
}

export const AgentOperationsCenter: React.FC<AgentOperationsCenterProps> = ({
  isOpen,
  onClose,
  onSelectLeadData
}) => {
  const [selectedPreset, setSelectedPreset] = useState<PresetOption>(PRESET_MESSAGES[0]);
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'email' | 'web'>('whatsapp');
  const [customMessage, setCustomMessage] = useState<string>(PRESET_MESSAGES[0].message);
  
  // Execution Simulation State
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionProgress, setExecutionProgress] = useState<number>(5);
  const [executionTimeMs, setExecutionTimeMs] = useState<number>(1240);

  // Lock body scroll and register Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectPreset = (preset: PresetOption) => {
    setSelectedPreset(preset);
    setActiveChannel(preset.channel);
    setCustomMessage(preset.message);
    triggerSimulation();
  };

  const triggerSimulation = () => {
    setIsExecuting(true);
    setExecutionProgress(1);

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
    
    // Close modal first, then smooth scroll to automation form
    onClose();

    setTimeout(() => {
      const targetElement = document.getElementById('formulario-automatizacion') || document.getElementById('contacto');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070e17]/95 backdrop-blur-md flex flex-col overflow-hidden text-slate-100 font-tech animate-in fade-in duration-200">
      
      {/* 1. TOP STUDIO HEADER BAR */}
      <header className="bg-[#0f1b29] border-b border-[#2b5b84]/60 px-4 sm:px-6 py-3 flex items-center justify-between z-10 shadow-md">
        
        {/* Brand & Workstation Tag */}
        <div className="flex items-center gap-3">
          <div className="scale-90 origin-left">
            <Logo size="sm" />
          </div>
          
          <div className="hidden sm:flex flex-col border-l border-[#2b5b84]/60 pl-3 font-mono-tech text-xs">
            <span className="text-white font-bold tracking-tight">AI AGENTS CONTROL ROOM</span>
            <span className="text-[#ffd343] text-[10px] font-extrabold">WORKSTATION STUDIO MODE</span>
          </div>
        </div>

        {/* Live Status Indicator Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#142332] border border-[#2b5b84] text-xs font-mono-tech">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-emerald-400 font-bold hidden md:inline">MODO SIMULACIÓN OPERATIVA ACTIVO</span>
          <span className="text-slate-400 hidden lg:inline">|</span>
          <span className="text-slate-300 text-[11px] hidden lg:inline">DEMO TRANSPARENTE EN TIEMPO REAL</span>
        </div>

        {/* Close Workstation Button */}
        <button
          onClick={onClose}
          className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold font-mono-tech transition-all flex items-center gap-1.5 cursor-pointer"
          title="Cerrar y volver al sitio web (Esc)"
        >
          <span>Cerrar (Esc)</span>
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

      </header>

      {/* 2. CENTRAL WORKSPACE AREA (3 COLUMNS) */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-7xl mx-auto w-full flex flex-col justify-between">
        
        {/* Top Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            Centro de Operaciones de Agentes Corplex
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Orquestación omnicanal en tiempo real. Selecciona un canal y escenario para observar la cascada de 5 agentes en ejecución.
          </p>
        </div>

        {/* 3-Column Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6 items-stretch">
          
          {/* COLUMN 1: Entrada Omnicanal (4 cols) */}
          <div className="lg:col-span-4 bg-[#142332] rounded-2xl border border-[#2b5b84] p-5 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2b5b84]">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#2b5b84]/40 text-[#ffd343]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white font-mono-tech uppercase">Columna 1: Entrada Omnicanal</h3>
                    <span className="text-[10px] text-slate-400">Canal de Ingreso</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  LIVE PAYLOAD
                </span>
              </div>

              {/* Channel Selector */}
              <div className="mb-4">
                <label className="block text-[11px] font-mono-tech text-slate-400 mb-1.5 font-bold uppercase">
                  Canal de Ingreso:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setActiveChannel('whatsapp')}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
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
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
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
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
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

              {/* Sector Presets */}
              <div className="mb-3">
                <label className="block text-[11px] font-mono-tech text-slate-400 mb-1.5 font-bold uppercase">
                  Probar Escenario (1-Clic):
                </label>
                <div className="space-y-1.5">
                  {PRESET_MESSAGES.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`w-full p-2 rounded-xl text-left text-xs font-tech transition-all cursor-pointer border flex items-center justify-between ${
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
                <label className="block text-[11px] font-mono-tech text-slate-400 mb-1.5 font-bold uppercase">
                  Payload del Mensaje:
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 rounded-xl bg-[#0d1722] border border-[#2b5b84] text-xs font-mono-tech text-slate-200 focus:outline-none focus:border-[#ffd343] resize-none"
                />
              </div>
            </div>

            {/* Action Trigger */}
            <div className="pt-3 mt-3 border-t border-[#2b5b84]">
              <button
                onClick={triggerSimulation}
                disabled={isExecuting}
                className="w-full py-2.5 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#0d1722] font-bold text-xs font-sans flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                <Play className={`w-4 h-4 fill-current ${isExecuting ? 'animate-spin' : ''}`} />
                <span>{isExecuting ? 'Orquestando Agentes...' : '▶ Iniciar Cadena de Agentes'}</span>
              </button>
            </div>
          </div>

          {/* COLUMN 2: Orquestador de Agentes (4 cols) */}
          <div className="lg:col-span-4 bg-[#142332] rounded-2xl border border-[#2b5b84] p-5 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2b5b84]">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white font-mono-tech uppercase">Columna 2: Cadena de Agentes</h3>
                    <span className="text-[10px] text-slate-400">Secuencia de Orquestación</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                  OBSERVABLE PIPELINE
                </span>
              </div>

              {/* 5 Agent Chain Sequence */}
              <div className="space-y-2.5 font-mono-tech text-xs">
                
                {/* Agent 1 */}
                <div className={`p-2.5 rounded-xl border transition-all duration-300 ${
                  executionProgress >= 1
                    ? 'bg-[#1b3852] border-emerald-500/60 text-white'
                    : 'bg-[#0d1722] border-[#2b5b84]/50 text-slate-500'
                }`}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-emerald-400 flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      01. Agente de Recepción
                    </span>
                    <span className="text-[10px] text-slate-400">0.1s | 99% Conf.</span>
                  </div>
                  <p className="text-[10px] text-slate-300 font-sans">
                    Canal: <strong className="uppercase text-emerald-300">{activeChannel}</strong>. Payload sanitizado.
                  </p>
                </div>

                {/* Agent 2 */}
                <div className={`p-2.5 rounded-xl border transition-all duration-300 ${
                  executionProgress >= 2
                    ? 'bg-[#1b3852] border-emerald-500/60 text-white'
                    : 'bg-[#0d1722] border-[#2b5b84]/50 text-slate-500'
                }`}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-sky-400 flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-sky-400" />
                      02. Agente de Intención
                    </span>
                    <span className="text-[10px] text-slate-400">0.3s | 97% Conf.</span>
                  </div>
                  <p className="text-[10px] text-slate-300 font-sans">
                    Sector: <strong className="text-sky-300">{selectedPreset.sector}</strong>. Intención detectada.
                  </p>
                </div>

                {/* Agent 3 */}
                <div className={`p-2.5 rounded-xl border transition-all duration-300 ${
                  executionProgress >= 3
                    ? 'bg-[#1b3852] border-emerald-500/60 text-white'
                    : 'bg-[#0d1722] border-[#2b5b84]/50 text-slate-500'
                }`}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-amber-400 flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-amber-400" />
                      03. Agente de Calificación
                    </span>
                    <span className="text-[10px] text-slate-400">0.6s | 95% Conf.</span>
                  </div>
                  <p className="text-[10px] text-slate-300 font-sans">
                    Complejidad: <strong className="text-amber-300">Media / Alta</strong>. Proceso clasificado.
                  </p>
                </div>

                {/* Agent 4 */}
                <div className={`p-2.5 rounded-xl border transition-all duration-300 ${
                  executionProgress >= 4
                    ? 'bg-[#1b3852] border-emerald-500/60 text-white'
                    : 'bg-[#0d1722] border-[#2b5b84]/50 text-slate-500'
                }`}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-[#ffd343] flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-[#ffd343]" />
                      04. Agente Cotizador & Reglas
                    </span>
                    <span className="text-[10px] text-slate-400">0.9s | 94% Conf.</span>
                  </div>
                  <p className="text-[10px] text-slate-300 font-sans">
                    Estimación: <strong className="text-[#ffd343]">{selectedPreset.estimatedRange}</strong>.
                  </p>
                </div>

                {/* Agent 5 - Human Supervisor */}
                <div className={`p-2.5 rounded-xl border transition-all duration-300 ${
                  executionProgress >= 5
                    ? 'bg-[#2b1f13] border-amber-500/80 text-white'
                    : 'bg-[#0d1722] border-[#2b5b84]/50 text-slate-500'
                }`}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-amber-300 flex items-center gap-1 text-[11px]">
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      05. Supervisión Comercial
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-200 font-bold">
                      REQUERIDA
                    </span>
                  </div>
                  <p className="text-[10px] text-amber-200/90 font-sans">
                    Badge Ámbar: Requiere validación comercial previa a contrato.
                  </p>
                </div>

              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-[#2b5b84] text-[10px] font-mono-tech text-slate-400 flex items-center justify-between">
              <span>ESTADO DE PIPELINE:</span>
              <span className="text-emerald-400 font-bold">
                {executionProgress === 5 ? '100% COMPLETADO' : `PROCESANDO (${executionProgress}/5)`}
              </span>
            </div>
          </div>

          {/* COLUMN 3: Resultado Tangible (4 cols) */}
          <div className="lg:col-span-4 bg-[#142332] rounded-2xl border border-[#2b5b84] p-5 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2b5b84]">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white font-mono-tech uppercase">Columna 3: Resultado Tangible</h3>
                    <span className="text-[10px] text-slate-400">Outputs Generados</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  REALTIME CRM OUTPUT
                </span>
              </div>

              {/* Tangible Cards */}
              <div className="space-y-3">
                
                {/* Lead CRM Card */}
                <div className="p-3 rounded-xl bg-[#0d1722] border border-[#2b5b84]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono-tech font-bold text-slate-400 flex items-center gap-1">
                      <Database className="w-3 h-3 text-sky-400" />
                      Lead Creado (`automation_leads`)
                    </span>
                    <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">
                      {selectedPreset.crmLeadId}
                    </span>
                  </div>
                  <div className="space-y-0.5 text-xs text-slate-300 font-tech">
                    <p><strong className="text-slate-400">Sector:</strong> {selectedPreset.sector}</p>
                    <p><strong className="text-slate-400">Canal:</strong> WhatsApp / Omnicanal</p>
                    <p><strong className="text-slate-400">Prioridad:</strong> <span className="text-amber-300 font-bold">Alta</span></p>
                  </div>
                </div>

                {/* Quotation Draft Card */}
                <div className="p-3 rounded-xl bg-[#0d1722] border border-[#2b5b84]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono-tech font-bold text-slate-400 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-[#ffd343]" />
                      Cotización Borrador Preliminar
                    </span>
                    <span className="text-[10px] font-mono-tech text-[#ffd343] font-bold">
                      ESTIMACIÓN
                    </span>
                  </div>
                  <div className="space-y-0.5 text-xs text-slate-300 font-tech">
                    <p><strong className="text-slate-400">Rango Estimado:</strong> <span className="text-[#ffd343] font-bold">{selectedPreset.estimatedRange}</span></p>
                    <p><strong className="text-slate-400">Vigencia:</strong> 7 días calendario</p>
                  </div>
                </div>

                {/* Follow-up Task Card */}
                <div className="p-3 rounded-xl bg-[#0d1722] border border-[#2b5b84]">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-mono-tech font-bold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      Tarea de Seguimiento
                    </span>
                    <span className="text-[10px] font-mono-tech text-emerald-400 font-bold">
                      +24 HORAS
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-tech">
                    Asignada a Consultor Comercial Corplex para validación técnica.
                  </p>
                </div>

              </div>
            </div>

            {/* CTA Final */}
            <div className="pt-3 mt-3 border-t border-[#2b5b84]">
              <button
                onClick={handleProceedToDiagnosis}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#3775a9] to-[#2b5b84] hover:from-[#2b5b84] hover:to-[#1b3852] text-white font-bold text-xs font-sans flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer border border-[#ffd343]/50"
              >
                <span>Quiero este flujo en mi empresa (Solicitar Diagnóstico)</span>
                <ArrowRight className="w-4 h-4 text-[#ffd343]" />
              </button>
            </div>
          </div>

        </div>

      </main>

      {/* 3. BOTTOM OBSERVABILITY STATUS BAR */}
      <footer className="bg-[#0f1b29] border-t border-[#2b5b84]/60 px-4 sm:px-6 py-2.5 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs font-mono-tech">
          
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-slate-400">DURACIÓN:</span>
            <span className="text-emerald-400 font-bold">{executionTimeMs} ms ({(executionTimeMs / 1000).toFixed(2)}s)</span>
          </div>

          <div className="flex items-center justify-center gap-1.5">
            <span className="text-slate-400">PRECISIÓN:</span>
            <span className="text-[#ffd343] font-bold">96.4% Accuracy</span>
          </div>

          <div className="flex items-center justify-center gap-1.5">
            <span className="text-slate-400">SISTEMAS:</span>
            <span className="text-sky-300 font-bold">CRM Supabase + WhatsApp API</span>
          </div>

          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-300 font-bold">Ley 1581 & AES-256</span>
          </div>

        </div>
      </footer>

    </div>
  );
};
