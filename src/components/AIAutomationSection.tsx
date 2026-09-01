import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Zap,
  CheckCircle2,
  ArrowRight,
  HeartPulse,
  GraduationCap,
  Sprout,
  ShieldCheck,
  TrendingUp,
  SearchCheck,
  Rocket,
  MessageSquare,
  Send,
  Database,
  Layers,
  Activity,
  Check,
  Clock,
  BarChart3,
  Terminal,
  ChevronRight,
  Network,
  Cpu,
  AlertTriangle,
  Workflow
} from 'lucide-react';
import {
  AUTOMATION_VERTICALS,
  AUTOMATION_PACKAGES,
  AUTOMATION_PHASES,
  AUTOMATION_HOW_IT_WORKS,
  OPERATION_VOLUMES
} from '../data/aiAutomationData';
import { LEGAL_INFO } from '../data/corporateData';
import type { AutomationFormData } from '../types';

interface AIAutomationSectionProps {
  onOpenQuoteModal: (serviceTitle?: string) => void;
}

export const AIAutomationSection: React.FC<AIAutomationSectionProps> = ({ onOpenQuoteModal }) => {
  const [activeVerticalId, setActiveVerticalId] = useState<string>('salud');
  const [activeHowStepIndex, setActiveHowStepIndex] = useState<number>(0);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [selectedPackageForForm, setSelectedPackageForForm] = useState<string>('2. Automatización Inicial (Piloto Rápido)');
  
  // Form State
  const [formData, setFormData] = useState<AutomationFormData>({
    fullName: '',
    company: '',
    email: '',
    sector: 'Salud y Clínicas',
    bottleneck: '',
    operationVolume: OPERATION_VOLUMES[1],
    selectedPackage: '2. Automatización Inicial (Piloto Rápido)'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeVertical = AUTOMATION_VERTICALS.find(v => v.id === activeVerticalId) || AUTOMATION_VERTICALS[0];
  const activeHowStep = AUTOMATION_HOW_IT_WORKS[activeHowStepIndex];
  const activePhase = AUTOMATION_PHASES[activePhaseIndex];

  const renderVerticalIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 stroke-[1.75]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 stroke-[1.75]" />;
      case 'Sprout':
        return <Sprout className="w-6 h-6 stroke-[1.75]" />;
      default:
        return <Bot className="w-6 h-6 stroke-[1.75]" />;
    }
  };

  const renderHowStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'SearchCheck':
        return <SearchCheck className="w-5 h-5 stroke-[1.75]" />;
      case 'Network':
        return <Network className="w-5 h-5 stroke-[1.75]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 stroke-[1.75]" />;
      case 'Activity':
        return <Activity className="w-5 h-5 stroke-[1.75]" />;
      default:
        return <Workflow className="w-5 h-5 stroke-[1.75]" />;
    }
  };

  const renderPhaseIcon = (iconName: string) => {
    switch (iconName) {
      case 'SearchCheck':
        return <SearchCheck className="w-5 h-5 stroke-[1.75]" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5 stroke-[1.75]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 stroke-[1.75]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 stroke-[1.75]" />;
      default:
        return <Zap className="w-5 h-5 stroke-[1.75]" />;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleSendWhatsApp = () => {
    const text = `*SOLICITUD DE DIAGNÓSTICO DE AUTOMATIZACIÓN - CORPLEX AI*
*Nombre:* ${formData.fullName}
*Empresa/Institución:* ${formData.company}
*Correo:* ${formData.email}
*Sector:* ${formData.sector}
*Volumen Aproximado de Operaciones:* ${formData.operationVolume}
*Paquete de Interés:* ${formData.selectedPackage || selectedPackageForForm}
*Cuello de Botella / Proceso:* ${formData.bottleneck}`;

    window.open(`https://wa.me/${LEGAL_INFO.whatsapp1}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="ai-automation" className="py-20 relative bg-[#111d28] font-tech text-slate-100 border-t border-[#2b5b84]/50 overflow-hidden">
      
      {/* Visual Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* BLOQUE 1: Hero & Propuesta de Valor (Claridad Inmediata & ROI) */}
        <div className="bg-[#1b3852] rounded-3xl border border-[#4b7da5]/40 shadow-2xl p-6 sm:p-10 mb-20 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge Subtítulo */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#142332] border border-[#ffd343]/50 text-[#ffd343] text-xs font-mono-tech font-bold shadow-md">
                <Sparkles className="w-4 h-4 text-[#ffd343] animate-pulse" />
                <span>CORPLEX AI AUTOMATION • UNIDAD COMERCIAL</span>
              </div>

              {/* Tagline Corporativo */}
              <p className="text-xs font-mono-tech text-cyan-300 font-bold uppercase tracking-wider">
                Unidad de Automatización Inteligente e Integración Empresarial respaldada por Corplex Solutions S.A.S.
              </p>

              {/* Titular Principal de Alto Impacto */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ffd343] tracking-tight leading-tight">
                Automatización Inteligente de Procesos: Conectamos tus sistemas, eliminamos tareas repetitivas y escalamos tu operación con IA.
              </h1>

              {/* Subtexto Explicativo Técnico */}
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
                Orquestamos tus flujos de trabajo conectando tus herramientas actuales mediante <strong className="text-white">Make, n8n, Python y APIs empresariales</strong>. Implementamos agentes autónomos de lenguaje (LLMs) entrenados con tus reglas de negocio sin obligarte a cambiar de software.
              </p>

              {/* 4 Badges de Confianza Destacados */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#142332] border border-[#2b5b84]">
                  <span className="text-xl sm:text-2xl font-bold text-[#ffd343] block font-mono-tech">+80%</span>
                  <span className="text-[11px] text-slate-300 leading-tight block">Ahorro de Tiempo Operativo</span>
                </div>

                <div className="p-3 rounded-xl bg-[#142332] border border-[#2b5b84]">
                  <span className="text-xl sm:text-2xl font-bold text-emerald-400 block font-mono-tech">100%</span>
                  <span className="text-[11px] text-slate-300 leading-tight block">Integración con Sistemas Actuales</span>
                </div>

                <div className="p-3 rounded-xl bg-[#142332] border border-[#2b5b84]">
                  <span className="text-xl sm:text-2xl font-bold text-sky-400 block font-mono-tech">24/7</span>
                  <span className="text-[11px] text-slate-300 leading-tight block">Monitoreo & Ejecución Autónoma</span>
                </div>

                <div className="p-3 rounded-xl bg-[#142332] border border-[#2b5b84]">
                  <span className="text-xl sm:text-2xl font-bold text-cyan-300 block font-mono-tech">99.9%</span>
                  <span className="text-[11px] text-slate-300 leading-tight block">SLA Cloud Garantizado</span>
                </div>
              </div>

              {/* CTAs Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                <a
                  href="#formulario-automatizacion"
                  className="px-6 py-3.5 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Bot className="w-4 h-4 text-[#111d28]" />
                  <span>Diagnosticar mi Empresa (Gratis)</span>
                  <ArrowRight className="w-4 h-4 text-[#111d28]" />
                </a>

                <a
                  href="#casos-uso-sectores"
                  className="px-6 py-3.5 rounded-xl bg-[#142332] hover:bg-[#2b5b84] text-slate-200 text-xs font-bold border border-[#2b5b84] flex items-center justify-center gap-2 transition-all"
                >
                  <Layers className="w-4 h-4 text-[#ffd343]" />
                  <span>Ver Casos de Uso por Sector</span>
                </a>
              </div>

            </div>

            {/* Right Interactive Pipeline Terminal Visualizer (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="bg-[#142332] rounded-2xl border border-[#2b5b84] p-5 shadow-2xl space-y-4 font-mono-tech">
                
                {/* Terminal Header */}
                <div className="flex items-center justify-between border-b border-[#2b5b84] pb-3 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#ffd343]" />
                    <span className="font-bold text-slate-200">corplex_orchestrator.py</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    MAKE / N8N / AWS
                  </span>
                </div>

                {/* Pipeline Execution Flow Visual */}
                <div className="space-y-3 text-xs">
                  
                  {/* Ingestion */}
                  <div className="p-3 rounded-lg bg-[#1b3852]/80 border border-[#2b5b84] space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1 text-slate-300">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        [1] ENTRADA OMNICANAL
                      </span>
                      <span className="text-emerald-400">WhatsApp / Webhook</span>
                    </div>
                    <p className="text-slate-200 font-sans text-xs italic">
                      "Solicito agendamiento de cita médica y confirmación de cobertura..."
                    </p>
                  </div>

                  {/* AI & Automation Routing */}
                  <div className="p-3 rounded-lg bg-[#1b3852]/80 border border-[#ffd343]/40 space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Cpu className="w-3.5 h-3.5 text-[#ffd343]" />
                        [2] IA AGENT & REGLAS
                      </span>
                      <span className="text-[#ffd343] font-bold">GPT-4o RAG</span>
                    </div>
                    <div className="text-slate-300 text-[11px] space-y-0.5">
                      <p>• Intención: <span className="text-[#ffd343]">Agendamiento Especialidad</span></p>
                      <p>• Extracción: <span className="text-emerald-400">Cédula & Convenio Validados</span></p>
                      <p>• Orquestación: <span className="text-sky-400">Make / n8n Webhook Triggered</span></p>
                    </div>
                  </div>

                  {/* Systems Sync */}
                  <div className="p-3 rounded-lg bg-[#1b3852]/80 border border-emerald-500/40 space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Database className="w-3.5 h-3.5 text-cyan-400" />
                        [3] SISTEMAS ACTUALES (HIS/CRM)
                      </span>
                      <span className="text-cyan-400">Cero Digitación</span>
                    </div>
                    <p className="text-emerald-300 text-[11px] font-mono-tech">
                      ✓ Cita reservada en Software Médico • Recordatorio programado • Log AWS KMS
                    </p>
                  </div>

                </div>

                {/* Footer status */}
                <div className="pt-2 border-t border-[#2b5b84] flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Workflow className="w-3.5 h-3.5 text-[#ffd343]" />
                    Herramientas: Make, n8n, Python, AWS
                  </span>
                  <span className="text-emerald-400 font-bold">Respuesta en &lt; 3s</span>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* BLOQUE 2: "¿Cómo Funciona?" (Stepper Visual de 4 Pasos) */}
        <div className="mb-20">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b3852] border border-[#2b5b84] text-[#ffd343] text-xs font-mono-tech font-bold mb-3">
              <Workflow className="w-3.5 h-3.5 text-[#ffd343]" />
              <span>DESMITIFICANDO EL SERVICIO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              ¿Cómo Funciona cuando contratas a Corplex?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Un proceso ágil en 4 etapas diseñadas para integrar tus herramientas actuales sin que tu equipo tenga que cambiar de software.
            </p>
          </div>

          {/* Stepper Tabs Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {AUTOMATION_HOW_IT_WORKS.map((stepItem, idx) => {
              const isActive = idx === activeHowStepIndex;
              return (
                <button
                  key={stepItem.step}
                  onClick={() => setActiveHowStepIndex(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#3775a9] border-[#ffd343] text-white shadow-xl scale-102'
                      : 'bg-[#142332] border-[#2b5b84] text-slate-300 hover:bg-[#1b3852]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono-tech text-xs font-bold ${isActive ? 'text-[#ffd343]' : 'text-slate-400'}`}>
                      PASO {stepItem.step}
                    </span>
                    <div className={isActive ? 'text-[#ffd343]' : 'text-slate-400'}>
                      {renderHowStepIcon(stepItem.icon)}
                    </div>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold line-clamp-1">{stepItem.title}</h3>
                </button>
              );
            })}
          </div>

          {/* Active How It Works Step Detail Panel */}
          <div className="bg-[#142332] rounded-3xl border border-[#2b5b84] p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-[#ffd343] text-[#111d28] flex items-center justify-center font-mono-tech font-bold text-sm shadow-md">
                    0{activeHowStep.step}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Paso {activeHowStep.step}: {activeHowStep.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeHowStep.description}
                </p>

                {/* Details */}
                <div className="space-y-2.5 pt-2">
                  <h4 className="text-xs font-mono-tech text-[#ffd343] font-bold uppercase tracking-wider">
                    Actividades y Ejecución en este paso:
                  </h4>
                  {activeHowStep.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Deliverable Callout */}
              <div className="lg:col-span-4 bg-[#1b3852] p-6 rounded-2xl border border-[#4b7da5]/40 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#142332] text-[#ffd343] border border-[#2b5b84]">
                    {renderHowStepIcon(activeHowStep.icon)}
                  </div>
                  <div>
                    <span className="text-xs font-mono-tech text-slate-400 font-bold block uppercase">
                      GARANTÍA TÉCNICA
                    </span>
                    <span className="text-xs text-emerald-400 font-bold font-mono-tech">
                      Grado Empresarial Cifrado
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#2b5b84] text-xs text-slate-300 leading-relaxed">
                  <p>
                    Acompañamos a tu equipo en la curva de adopción garantizando supervisión humana (Human-in-the-loop) cuando la operación lo requiera.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* BLOQUE 3: Casos de Uso por Sector (Pestañas Interactivas Problema vs Solución) */}
        <div id="casos-uso-sectores" className="mb-20">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b3852] border border-[#2b5b84] text-[#ffd343] text-xs font-mono-tech font-bold mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>CASOS DE USO REALES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Problema Manual vs. Solución Automatizada
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Compara el impacto de transformar la operación tradicional de tu sector mediante la orquestación de herramientas e IA.
            </p>
          </div>

          {/* Sector Tabs Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {AUTOMATION_VERTICALS.map((vertical) => {
              const isActive = vertical.id === activeVerticalId;
              return (
                <button
                  key={vertical.id}
                  onClick={() => setActiveVerticalId(vertical.id)}
                  className={`px-5 py-3 rounded-2xl font-tech text-xs sm:text-sm font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#3775a9] text-[#ffd343] border border-[#ffd343]/60 shadow-lg scale-105'
                      : 'bg-[#142332] text-slate-300 hover:bg-[#1b3852] border border-[#2b5b84]'
                  }`}
                >
                  <div className={isActive ? 'text-[#ffd343]' : 'text-slate-400'}>
                    {renderVerticalIcon(vertical.iconName)}
                  </div>
                  <span>{vertical.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Vertical Card: Problem vs Solution Side by Side Grid */}
          <div className="bg-[#142332] rounded-3xl border border-[#2b5b84] p-6 sm:p-10 shadow-2xl space-y-8">
            
            {/* Header of Active Sector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2b5b84] pb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ffd343] text-[#111d28] flex items-center justify-center font-bold shadow-md">
                  {renderVerticalIcon(activeVertical.iconName)}
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono-tech text-xs font-bold border border-emerald-500/30">
                    {activeVertical.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    {activeVertical.title}
                  </h3>
                </div>
              </div>

              {/* Impact Metric Banner */}
              <div className="p-3 rounded-xl bg-[#1b3852] border border-[#ffd343]/40 text-xs font-mono-tech">
                <span className="text-[#ffd343] font-bold block mb-0.5">IMPACTO MEDIBLE DE LA TRANSFORMACIÓN:</span>
                <span className="text-white font-bold">{activeVertical.beforeAfterMetric}</span>
              </div>
            </div>

            {/* 2-Column Side-by-Side Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Recuadro Rojo/Gris: Antes (Problema Manual) */}
              <div className="p-6 rounded-2xl bg-[#1f1519] border border-rose-500/40 space-y-4 shadow-inner">
                <div className="flex items-center gap-2 text-rose-400 font-mono-tech text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>Antes (Problema Manual Tradicional)</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {activeVertical.realProblem}
                </p>
              </div>

              {/* Recuadro Verde/Esmeralda: Con Corplex (Solución Automatizada) */}
              <div className="p-6 rounded-2xl bg-[#12241e] border border-emerald-500/40 space-y-4 shadow-inner">
                <div className="flex items-center gap-2 text-emerald-400 font-mono-tech text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Con Corplex (Solución Automatizada con IA)</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-sans">
                  {activeVertical.implementedSolution}
                </p>
              </div>

            </div>

            {/* Features list */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono-tech text-[#ffd343] font-bold uppercase tracking-wider">
                Capacidades Integradas en este Sector:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                {activeVertical.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Tech Stack & CTA */}
            <div className="pt-4 border-t border-[#2b5b84] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono-tech text-slate-400">Stack Aplicado:</span>
                {activeVertical.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-[#1b3852] text-slate-200 text-[11px] font-mono-tech border border-[#4b7da5]/40 font-bold"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  setFormData(prev => ({ ...prev, sector: activeVertical.title }));
                  const formElem = document.getElementById('formulario-automatizacion');
                  if (formElem) formElem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>Solicitar Flujo para {activeVertical.badge}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* BLOQUE 4: Tarjetas de Niveles de Servicio (Bento Grid Limpio) */}
        <div className="mb-20">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b3852] border border-[#2b5b84] text-[#ffd343] text-xs font-mono-tech font-bold mb-3">
              <Zap className="w-3.5 h-3.5 text-[#ffd343]" />
              <span>SERVICIOS Y ALCANCE COMERCIAL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Niveles de Servicio & Entregables Llave en Mano
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Tarjetas bento transparentes con lista de entregables y botón directo para solicitar cotización.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {AUTOMATION_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-[#142332] rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between relative ${pkg.highlightColor}`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#ffd343] text-[#111d28] font-mono-tech font-bold text-[11px] shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-current" />
                    <span>MÁS POPULAR</span>
                  </div>
                )}

                <div>
                  {/* Badge & Timeframe */}
                  <div className="flex items-center justify-between text-xs font-mono-tech mb-4 pt-1">
                    <span className="text-[#ffd343] font-bold">{pkg.badge}</span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {pkg.timeframe}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-slate-300 mb-6 leading-relaxed min-h-[36px]">
                    {pkg.tagline}
                  </p>

                  {/* Scope List */}
                  <div className="space-y-2.5 mb-6 text-xs text-slate-200 border-t border-[#2b5b84] pt-4">
                    <span className="text-[11px] font-mono-tech text-slate-400 uppercase font-bold block mb-2">
                      Alcance Incluido:
                    </span>
                    {pkg.scope.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Deliverable */}
                  <div className="p-3 rounded-xl bg-[#1b3852]/80 border border-[#2b5b84] mb-6 text-xs">
                    <span className="text-[#ffd343] font-mono-tech text-[10px] font-bold uppercase block mb-1">
                      Entregable Clave:
                    </span>
                    <p className="text-slate-200 leading-snug">{pkg.deliverable}</p>
                  </div>
                </div>

                {/* Target Audience & Action */}
                <div>
                  <p className="text-[11px] text-slate-400 mb-4 italic">
                    Ideal para: <strong className="text-slate-200 font-normal">{pkg.recommendedFor}</strong>
                  </p>

                  <button
                    onClick={() => {
                      setSelectedPackageForForm(pkg.title);
                      setFormData(prev => ({ ...prev, selectedPackage: pkg.title }));
                      const elem = document.getElementById('formulario-automatizacion');
                      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      pkg.isPopular
                        ? 'bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] shadow-md'
                        : 'bg-[#1b3852] hover:bg-[#2b5b84] text-slate-100 border border-[#2b5b84]'
                    }`}
                  >
                    <span>Seleccionar este Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* BLOQUE 5: Formulario de Diagnóstico / Calificación */}
        <div id="formulario-automatizacion" className="bg-white rounded-3xl p-6 sm:p-12 shadow-2xl text-slate-900 border border-slate-200">
          
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111d28] text-[#ffd343] text-xs font-mono-tech font-bold mb-3 shadow-md">
              <Bot className="w-4 h-4" />
              <span>DIAGNÓSTICO TÉCNICO DE AUTOMATIZACIÓN</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
              Solicita tu Diagnóstico Gratuito
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Completa la información sobre la operación de tu empresa. Evaluaremos tus cuellos de botella y te enviaremos una propuesta con cálculo de ahorro en menos de 24 horas.
            </p>
          </div>

          {isSubmitted ? (
            <div className="max-w-xl mx-auto text-center py-10 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-300">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900">¡Solicitud Procesada con Éxito!</h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                Hemos registrado los detalles para <strong>{formData.company}</strong>. Haz clic en el botón a continuación para enviar la ficha directamente a nuestro WhatsApp oficial prioritario.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                <button
                  onClick={handleSendWhatsApp}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>Enviar Diagnóstico a WhatsApp Prioritario</span>
                  <Send className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300"
                >
                  Diligenciar otra Consulta
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitForm} className="max-w-4xl mx-auto space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Ej. Ing. Carlos Ramírez"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">
                    Empresa / Institución *
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Ej. Clínica San Rafael / Grupo Agro S.A.S."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">
                    Correo Electrónico Corporativo *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="carlos@empresa.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">
                    Sector de la Organización *
                  </label>
                  <select
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84]"
                  >
                    <option value="Salud y Clínicas">Salud y Clínicas</option>
                    <option value="Educación Superior">Educación Superior</option>
                    <option value="Agroindustria & Operaciones">Agroindustria & Operaciones</option>
                    <option value="Servicios & Comercio">Servicios & Comercio</option>
                    <option value="Otro Sector">Otro Sector Empresarial</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">
                    Volumen Aproximado de Operaciones Mensuales *
                  </label>
                  <select
                    name="operationVolume"
                    value={formData.operationVolume}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84]"
                  >
                    {OPERATION_VOLUMES.map((vol, idx) => (
                      <option key={idx} value={vol}>{vol}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">
                    Nivel de Servicio de Interés *
                  </label>
                  <select
                    name="selectedPackage"
                    value={formData.selectedPackage || selectedPackageForForm}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84]"
                  >
                    <option value="1. Diagnóstico & Mapeo de Procesos">1. Diagnóstico & Mapeo de Procesos (1-2 semanas)</option>
                    <option value="2. Automatización Inicial (Piloto Rápido)">2. Automatización Inicial - Piloto Rápido (&lt;30 días)</option>
                    <option value="3. Retainer de Automatización Mensual">3. Retainer de Automatización Mensual</option>
                    <option value="4. Plataforma / Agentes Enterprise">4. Plataforma / Agentes Enterprise (AWS/GCP)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">
                  Principal cuello de botella o tarea repetitiva a automatizar *
                </label>
                <textarea
                  name="bottleneck"
                  rows={4}
                  required
                  value={formData.bottleneck}
                  onChange={handleChange}
                  placeholder="Ej. 'Atendemos más de 500 solicitudes mensuales por WhatsApp que requieren consultar manualmente en el ERP y digitar en Excel'..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84] resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-bold text-xs flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  <span>{isSubmitting ? 'Procesando Solicitud...' : 'Solicitar Diagnóstico Gratuito'}</span>
                  <Send className="w-4 h-4 text-[#111d28]" />
                </button>

                <span className="text-[11px] font-mono-tech text-slate-500 text-center">
                  Respuesta prioritaria garantizada en menos de 24 horas.
                </span>
              </div>

            </form>
          )}

        </div>

      </div>

    </section>
  );
};
