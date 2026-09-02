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
  MessageSquare,
  Send,
  Database,
  Layers,
  Activity,
  Check,
  Clock,
  Terminal,
  ChevronRight,
  Network,
  Cpu,
  Workflow,
  Lock,
  Shield,
  AlertCircle,
  Info
} from 'lucide-react';
import {
  AUTOMATION_VERTICALS,
  AUTOMATION_PACKAGES,
  AUTOMATION_HOW_IT_WORKS,
  AUTOMATION_TRUST_PROMISES,
  AUTOMATION_SUMMARY_BANNER
} from '../data/aiAutomationData';
import { LEGAL_INFO } from '../data/corporateData';
import { submitAutomationLead } from '../services/leadService';
import { PrivacyModal } from './PrivacyModal';
import type { AutomationFormData } from '../types';
import type { LeadSubmissionResult } from '../types/lead';

interface AIAutomationSectionProps {
  onOpenQuoteModal: (serviceTitle?: string) => void;
}

export const AIAutomationSection: React.FC<AIAutomationSectionProps> = () => {
  const [activeVerticalId, setActiveVerticalId] = useState<string>('salud');
  const [activeHowStepIndex, setActiveHowStepIndex] = useState<number>(0);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  
  // Form State (Simplified 5-field form)
  const [formData, setFormData] = useState<AutomationFormData>({
    fullName: '',
    company: '',
    contactDetail: '',
    bottleneck: '',
    sector: 'Salud y Clínicas'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<LeadSubmissionResult | null>(null);
  const [honeypot, setHoneypot] = useState('');

  const activeVertical = AUTOMATION_VERTICALS.find(v => v.id === activeVerticalId) || AUTOMATION_VERTICALS[0];
  const activeHowStep = AUTOMATION_HOW_IT_WORKS[activeHowStepIndex];

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

  const renderTrustIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock':
        return <Clock className="w-5 h-5 text-[#ffd343]" />;
      case 'Network':
        return <Network className="w-5 h-5 text-emerald-400" />;
      case 'Workflow':
        return <Workflow className="w-5 h-5 text-sky-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-cyan-300" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-300" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-[#ffd343]" />;
    }
  };

  const renderHowStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 stroke-[1.75]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 stroke-[1.75]" />;
      case 'Database':
        return <Database className="w-5 h-5 stroke-[1.75]" />;
      case 'Activity':
        return <Activity className="w-5 h-5 stroke-[1.75]" />;
      default:
        return <Workflow className="w-5 h-5 stroke-[1.75]" />;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formError) setFormError(null);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Protección Anti-Spam: Si el campo honeypot fue llenado por un bot
    if (honeypot.trim().length > 0) {
      setIsSubmitted(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitAutomationLead({
        fullName: formData.fullName,
        company: formData.company,
        contactDetail: formData.contactDetail,
        bottleneck: formData.bottleneck,
        sector: formData.sector,
        selectedPackage: formData.selectedPackage
      });

      setIsSubmitting(false);

      if (result.success) {
        setSubmissionResult(result);
        setIsSubmitted(true);
        handleSendWhatsApp();
      } else {
        // Preservamos los datos ingresados en formData para que el usuario no pierda información
        setFormError(result.message || 'No pudimos enviar la solicitud. Por favor verifica tus datos.');
      }
    } catch {
      setIsSubmitting(false);
      // Preservamos los datos ingresados
      setFormError('Ocurrió un error inesperado al procesar la solicitud. Por favor intenta de nuevo.');
    }
  };

  const handleSendWhatsApp = () => {
    const text = `*SOLICITUD DE DIAGNÓSTICO DE AUTOMATIZACIÓN - CORPLEX AI*
*Nombre:* ${formData.fullName}
*Empresa/Institución:* ${formData.company}
*Contacto:* ${formData.contactDetail}
*Sector:* ${formData.sector || 'No especificado'}
*Proceso a Mejorar:* ${formData.bottleneck}`;

    window.open(`https://wa.me/${LEGAL_INFO.whatsapp1}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="ai-automation" className="py-20 relative bg-[#111d28] font-tech text-slate-100 border-t border-[#2b5b84]/50 overflow-hidden">
      
      {/* Visual Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Clarificación de Capacidades vs Integraciones Activas */}
        <div className="mb-8 p-3 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-slate-300 flex items-center gap-2">
          <Info className="w-4 h-4 text-sky-400 shrink-0" />
          <span>
            <strong>Nota de arquitectura:</strong> Las herramientas y conectores descritos (WhatsApp API, LLMs, Make, n8n, AWS, CRM, HIS) representan capacidades de integración diseñables según el alcance contratado y no implican conexiones automáticas activas por defecto en esta web.
          </span>
        </div>

        {/* BLOQUE 1: Encabezado Principal & Propuesta de Valor */}
        <div className="bg-[#1b3852] rounded-3xl border border-[#4b7da5]/40 shadow-2xl p-6 sm:p-10 mb-16 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge Subtítulo / Etiqueta */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#142332] border border-[#ffd343]/50 text-[#ffd343] text-xs font-mono-tech font-bold shadow-md">
                <Sparkles className="w-4 h-4 text-[#ffd343] animate-pulse" />
                <span>CORPLEX AI AUTOMATION · UNIDAD COMERCIAL</span>
              </div>

              {/* Título Principal Corregido */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ffd343] tracking-tight leading-tight">
                Automatiza tus procesos. Conecta tus sistemas. Haz crecer tu operación.
              </h1>

              {/* Descripción Corregida */}
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
                Diseñamos e implementamos soluciones de automatización con IA para reducir tareas repetitivas, conectar las herramientas que ya utilizas y mejorar la velocidad de respuesta de tu equipo, sin obligarte a cambiar todo tu software.
              </p>

              {/* Llamados a la Acción */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="#formulario-automatizacion"
                  className="px-6 py-3.5 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-[#111d28]" />
                  <span>Solicitar diagnóstico inicial</span>
                  <ArrowRight className="w-4 h-4 text-[#111d28]" />
                </a>

                <a
                  href="#casos-uso-sectores"
                  className="px-6 py-3.5 rounded-xl bg-[#142332] hover:bg-[#2b5b84] text-slate-200 text-xs font-bold border border-[#2b5b84] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-[#ffd343]" />
                  <span>Ver soluciones por sector</span>
                </a>
              </div>

            </div>

            {/* Right Terminal Execution Diagram (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="bg-[#142332] rounded-2xl border border-[#2b5b84] p-5 shadow-2xl space-y-4 font-mono-tech">
                
                <div className="flex items-center justify-between border-b border-[#2b5b84] pb-3 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#ffd343]" />
                    <span className="font-bold text-slate-200">corplex_automation_flow.py</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    SISTEMAS CONECTADOS
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#1b3852]/80 border border-[#2b5b84] space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span className="text-slate-300 font-bold">[1] RECEPCIÓN DE SOLICITUD</span>
                      <span className="text-emerald-400">WhatsApp / Webhook</span>
                    </div>
                    <p className="text-slate-200 font-sans text-xs italic">
                      "Solicitud entrante de cita o consulta académica..."
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#1b3852]/80 border border-[#ffd343]/40 space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span className="text-slate-300 font-bold">[2] INTERPRETA Y APLICA REGLAS</span>
                      <span className="text-[#ffd343] font-bold">Agente IA RAG</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      Clasificación de intención • Extracción de datos • Aplicación de reglas
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#1b3852]/80 border border-emerald-500/40 space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span className="text-slate-300 font-bold">[3] INTEGRACIÓN Y SEGUIMIENTO</span>
                      <span className="text-cyan-400">CRM / ERP / HIS</span>
                    </div>
                    <p className="text-emerald-300 text-[11px] font-mono-tech">
                      ✓ Actualización inmediata • Historial registrado • Supervisión disponible
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#2b5b84] flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-slate-300">Respuestas ágiles & cero duplicación</span>
                  <span className="text-emerald-400 font-bold">Sin cambiar tu software</span>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* BLOQUE 2: Promesas Comerciales Corregidas (Indicadores de Confianza Verificables) */}
        <div className="mb-20">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b3852] border border-[#2b5b84] text-[#ffd343] text-xs font-mono-tech font-bold mb-3">
              <Shield className="w-3.5 h-3.5 text-[#ffd343]" />
              <span>COMPROMISO Y TRANSPARENCIA OPERATIVA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Principios de trabajo para tu organización
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Diseñamos cada automatización adaptada a las condiciones técnicas reales y los permisos de tus sistemas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {AUTOMATION_TRUST_PROMISES.map((promise, idx) => (
              <div
                key={idx}
                className="bg-[#142332] p-5 rounded-2xl border border-[#2b5b84] hover:border-[#ffd343]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded bg-[#1b3852] text-[#ffd343] text-[10px] font-mono-tech font-bold border border-[#ffd343]/30">
                      {promise.shortIndicator}
                    </span>
                    <div className="p-2 rounded-lg bg-[#1b3852]">
                      {renderTrustIcon(promise.iconName)}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                    {promise.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {promise.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* BLOQUE 3: Flujo Técnico (De la solicitud a la acción, sin digitación innecesaria) */}
        <div className="mb-20">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b3852] border border-[#2b5b84] text-[#ffd343] text-xs font-mono-tech font-bold mb-3">
              <Workflow className="w-3.5 h-3.5 text-[#ffd343]" />
              <span>ARQUITECTURA DE FLUJO TÉCNICO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              De la solicitud a la acción, sin digitación innecesaria
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Conectamos tus canales de entrada con tus reglas de negocio y tus sistemas actuales. Cada flujo se diseña con validaciones, registros y una ruta de escalamiento hacia una persona cuando la situación lo requiere.
            </p>
          </div>

          {/* Stepper Steps Selector */}
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
                      PASO {stepItem.step}: {stepItem.phaseName}
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

          {/* Active Step Panel */}
          <div className="bg-[#142332] rounded-3xl border border-[#2b5b84] p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-[#ffd343] text-[#111d28] flex items-center justify-center font-mono-tech font-bold text-sm shadow-md">
                    0{activeHowStep.step}
                  </span>
                  <div>
                    <span className="text-xs font-mono-tech text-cyan-300 uppercase font-bold">
                      Fase: {activeHowStep.phaseName}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {activeHowStep.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeHowStep.description}
                </p>

                <div className="space-y-2.5 pt-2">
                  <h4 className="text-xs font-mono-tech text-[#ffd343] font-bold uppercase tracking-wider">
                    Detalles de Ejecución:
                  </h4>
                  {activeHowStep.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#1b3852] p-6 rounded-2xl border border-[#4b7da5]/40 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#142332] text-[#ffd343] border border-[#2b5b84]">
                    {renderHowStepIcon(activeHowStep.icon)}
                  </div>
                  <div>
                    <span className="text-xs font-mono-tech text-slate-400 font-bold block uppercase">
                      CONTROL Y SUPERVISIÓN
                    </span>
                    <span className="text-xs text-emerald-400 font-bold font-mono-tech">
                      Escalamiento Humano Definido
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-300 leading-relaxed border-t border-[#2b5b84]">
                  <p>
                    Cada flujo incluye validaciones de seguridad y derivación hacia personas del equipo cuando el caso supera las reglas automatizadas.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* BLOQUE 4: Casos de Uso por Sector */}
        <div id="casos-uso-sectores" className="mb-20">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b3852] border border-[#2b5b84] text-[#ffd343] text-xs font-mono-tech font-bold mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>RESULTADOS MEDIBLES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Casos de uso orientados a resultados medibles
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Cada automatización comienza con un proceso real, una métrica de referencia y un alcance definido. Primero analizamos cómo funciona hoy la operación; después implementamos un piloto y medimos el cambio.
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

          {/* Active Vertical Card */}
          <div className="bg-[#142332] rounded-3xl border border-[#2b5b84] p-6 sm:p-10 shadow-2xl space-y-6">
            
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
                    {activeVertical.title} — {activeVertical.subtitle}
                  </h3>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#1b3852] border border-[#ffd343]/40 text-xs font-mono-tech">
                <span className="text-[#ffd343] font-bold block mb-0.5">MÉTRICAS SUGERIDAS:</span>
                <span className="text-white font-bold">{activeVertical.suggestedMetrics}</span>
              </div>
            </div>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {activeVertical.description}
            </p>

            {/* Problem vs Solution Side by Side Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-6 rounded-2xl bg-[#1f1519] border border-rose-500/40 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-mono-tech text-xs font-bold uppercase">
                  <span>Situación habitual / Desafío operativo</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {activeVertical.realProblem}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#12241e] border border-emerald-500/40 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-mono-tech text-xs font-bold uppercase">
                  <span>Solución de Automatización Corplex</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                  {activeVertical.implementedSolution}
                </p>
              </div>

            </div>

            {/* Clarification Note */}
            <div className="p-4 rounded-xl bg-[#1b3852]/60 border border-[#2b5b84] text-xs text-slate-300 leading-relaxed italic">
              <strong>Nota sobre resultados:</strong> Los ejemplos muestran posibilidades de automatización. Los resultados finales dependen del proceso, el volumen de operaciones, la calidad de los datos, las integraciones disponibles y el nivel de adopción del equipo.
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#2b5b84]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono-tech text-slate-400">Integraciones aplicables:</span>
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
                <span>Solicitar diagnóstico para {activeVertical.title}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* BLOQUE 5: Niveles de Solución y Alcance */}
        <div className="mb-20">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b3852] border border-[#2b5b84] text-[#ffd343] text-xs font-mono-tech font-bold mb-3">
              <Zap className="w-3.5 h-3.5 text-[#ffd343]" />
              <span>OPCIONES Y NIVELES DE ALCANCE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Modalidades de Acompañamiento
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Propuestas orientativas ajustadas al alcance y la complejidad de cada proyecto.
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
                    <span>MÁS SOLICITADO</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between text-xs font-mono-tech mb-4 pt-1">
                    <span className="text-[#ffd343] font-bold">{pkg.badge}</span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {pkg.timeframe}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-slate-300 mb-6 leading-relaxed min-h-[36px]">
                    {pkg.tagline}
                  </p>

                  <div className="space-y-2.5 mb-6 text-xs text-slate-200 border-t border-[#2b5b84] pt-4">
                    <span className="text-[11px] font-mono-tech text-slate-400 uppercase font-bold block mb-2">
                      Alcance del plan:
                    </span>
                    {pkg.scope.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-[#1b3852]/80 border border-[#2b5b84] mb-6 text-xs">
                    <span className="text-[#ffd343] font-mono-tech text-[10px] font-bold uppercase block mb-1">
                      Entregable clave:
                    </span>
                    <p className="text-slate-200 leading-snug">{pkg.deliverable}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] text-slate-400 mb-4 italic">
                    Recomendado para: <strong className="text-slate-200 font-normal">{pkg.recommendedFor}</strong>
                  </p>

                  <button
                    onClick={() => {
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
                    <span>Seleccionar este plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* BLOQUE 6: Resumen Institucional ("Automatización inteligente para tu operación") */}
        <div className="bg-[#142332] rounded-3xl border border-[#2b5b84] p-6 sm:p-10 mb-20 space-y-6">
          <div className="max-w-4xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#ffd343]">
              {AUTOMATION_SUMMARY_BANNER.title}
            </h2>
            
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {AUTOMATION_SUMMARY_BANNER.paragraph}
            </p>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {AUTOMATION_SUMMARY_BANNER.subparagraph}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#2b5b84]">
              <div className="p-4 rounded-xl bg-[#1b3852]/80 border border-[#2b5b84] text-xs leading-relaxed space-y-1">
                <span className="text-[#ffd343] font-mono-tech font-bold uppercase block">
                  Metodología de Acompañamiento
                </span>
                <p className="text-slate-200">{AUTOMATION_SUMMARY_BANNER.workMethod}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#1b3852]/80 border border-[#2b5b84] text-xs leading-relaxed space-y-1">
                <span className="text-emerald-400 font-mono-tech font-bold uppercase block">
                  Expectativa y Medición Individual
                </span>
                <p className="text-slate-200">{AUTOMATION_SUMMARY_BANNER.expectation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* BLOQUE 7: Formulario Simplificado de 5 Campos (Con servicio desacoplado y accesibilidad ARIA) */}
        <div id="formulario-automatizacion" className="bg-white rounded-3xl p-6 sm:p-12 shadow-2xl text-slate-900 border border-slate-200">
          
          <div className="max-w-3xl mx-auto text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111d28] text-[#ffd343] text-xs font-mono-tech font-bold mb-3 shadow-md">
              <Bot className="w-4 h-4" />
              <span>ORIENTACIÓN INICIAL SIN COSTO</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
              Cuéntanos qué proceso quieres mejorar
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-2">
              Completa este formulario en menos de dos minutos. Revisaremos tu caso y te contactaremos para identificar si existe una oportunidad concreta de automatización.
            </p>

            <p className="text-xs font-mono-tech text-emerald-700 font-bold bg-emerald-50 inline-block px-3 py-1 rounded-full border border-emerald-200">
              Primera orientación sin costo. No necesitas conocer de IA ni saber qué herramienta utilizar.
            </p>
          </div>

          {isSubmitted && submissionResult?.success ? (
            <div className="max-w-xl mx-auto text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-300">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                ¡Recibimos tu solicitud!
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {submissionResult.message}
              </p>

              {submissionResult.isDemonstrationMode && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs text-center">
                  <span className="font-bold font-mono-tech block mb-0.5">MODO DEMOSTRACIÓN CLIENTE</span>
                  <span>ID de seguimiento generado: <strong>{submissionResult.leadId}</strong>. Haz clic a continuación para enviar los detalles por WhatsApp a nuestro equipo.</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <button
                  onClick={handleSendWhatsApp}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span>Enviar datos también por WhatsApp</span>
                  <Send className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setSubmissionResult(null);
                    setFormData({ fullName: '', company: '', contactDetail: '', bottleneck: '', sector: 'Salud y Clínicas' });
                  }}
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 cursor-pointer"
                >
                  Diligenciar otra solicitud
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitForm} className="max-w-3xl mx-auto space-y-5">
              
              {/* Campo Honeypot Oculto (Anti-Spam / Bots) */}
              <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                <input
                  type="text"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Preservación de datos ante error */}
              {formError && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-rose-900 mb-0.5">No pudimos procesar la solicitud</span>
                    <p>{formError}</p>
                    <p className="text-[11px] text-rose-700 mt-1 font-semibold">Tus datos se han mantenido en el formulario para que puedas corregir o reintentar sin perder tu información.</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="lead-fullname" className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">
                    ¿Cómo te llamas? *
                  </label>
                  <input
                    id="lead-fullname"
                    type="text"
                    name="fullName"
                    required
                    aria-required="true"
                    aria-invalid={formError ? 'true' : 'false'}
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84]"
                  />
                </div>

                <div>
                  <label htmlFor="lead-company" className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">
                    Nombre de tu empresa o institución *
                  </label>
                  <input
                    id="lead-company"
                    type="text"
                    name="company"
                    required
                    aria-required="true"
                    aria-invalid={formError ? 'true' : 'false'}
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Empresa o institución"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="lead-contact" className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">
                    ¿Cómo podemos contactarte? *
                  </label>
                  <input
                    id="lead-contact"
                    type="text"
                    name="contactDetail"
                    required
                    aria-required="true"
                    aria-invalid={formError ? 'true' : 'false'}
                    value={formData.contactDetail}
                    onChange={handleChange}
                    placeholder="Correo electrónico o número de WhatsApp"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84]"
                  />
                </div>

                <div>
                  <label htmlFor="lead-sector" className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">
                    Sector (opcional)
                  </label>
                  <select
                    id="lead-sector"
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84]"
                  >
                    <option value="Salud y Clínicas">Salud y Clínicas</option>
                    <option value="Educación Superior">Educación Superior</option>
                    <option value="Agroindustria & Operaciones">Agroindustria & Operaciones</option>
                    <option value="Servicios">Servicios</option>
                    <option value="Comercio">Comercio</option>
                    <option value="Otro">Otro Sector</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="lead-bottleneck" className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">
                  ¿Qué proceso quieres mejorar? *
                </label>
                <textarea
                  id="lead-bottleneck"
                  name="bottleneck"
                  rows={4}
                  required
                  aria-required="true"
                  aria-invalid={formError ? 'true' : 'false'}
                  value={formData.bottleneck}
                  onChange={handleChange}
                  placeholder="Ejemplo: recibimos muchas solicitudes por WhatsApp y las registramos manualmente en Excel..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84] resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-bold text-xs flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  <span>{isSubmitting ? 'Procesando...' : 'Solicitar diagnóstico inicial'}</span>
                  <Send className="w-4 h-4 text-[#111d28]" />
                </button>

                <span className="text-[11px] font-mono-tech text-slate-500 text-center">
                  Te contactaremos en un máximo de un día hábil.
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 text-center space-y-1">
                <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400" />
                  Usaremos tus datos únicamente para responder a esta solicitud y coordinar el diagnóstico. No compartiremos tu información con terceros sin autorización.
                </p>

                <button
                  type="button"
                  onClick={() => setIsPrivacyOpen(true)}
                  className="text-[11px] text-[#2b5b84] hover:underline font-mono-tech font-bold cursor-pointer inline-flex items-center gap-1"
                >
                  <Lock className="w-3 h-3" />
                  <span>Ver política informativa de privacidad (Ley 1581)</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

      {/* Modal accesible de política de privacidad */}
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />

    </section>
  );
};
