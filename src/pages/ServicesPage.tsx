import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { QuoteModal } from '../components/QuoteModal';
import { ScrollToTop } from '../components/ScrollToTop';
import { fetchSiteServices } from '../services/cmsService';
import type { SiteServiceEntity } from '../types/lead';
import {
  Bot,
  Code2,
  Cloud,
  Cpu,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Clock,
  Lock,
  ChevronRight,
  Server,
  Terminal,
  Database,
  Gauge,
  Workflow
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<SiteServiceEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | undefined>(undefined);
  const [isControlRoomOpen, setIsControlRoomOpen] = useState<boolean>(false);
  const [activeBlock, setActiveBlock] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadServices = async () => {
      try {
        const data = await fetchSiteServices();
        setServices(data.filter(s => s.is_active !== false));
      } catch (err) {
        console.error('Error loading services page:', err);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const handleOpenQuoteModal = (title?: string) => {
    setSelectedServiceTitle(title);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedServiceTitle(undefined);
  };

  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return <Bot className="w-6 h-6 text-[#ffd343]" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-sky-400" />;
      case 'Cloud':
        return <Cloud className="w-6 h-6 text-emerald-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-cyan-300" />;
      default:
        return <Zap className="w-6 h-6 text-[#ffd343]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1722] text-slate-100 font-tech selection:bg-[#ffd343] selection:text-black">
      
      {/* Header Navigation */}
      <Navbar
        onOpenQuoteModal={() => handleOpenQuoteModal()}
        onOpenControlRoom={() => setIsControlRoomOpen(true)}
      />

      {/* Main Services Page Layout */}
      <main>
        
        {/* HERO CORPOATIVO DE SERVICIOS */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-[#111d28] via-[#0d1722] to-[#142332] relative border-b border-[#2b5b84]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1b3852] border border-[#2b5b84] text-[#ffd343] text-xs font-mono-tech font-bold mb-6 shadow-md">
              <Sparkles className="w-4 h-4 text-[#ffd343]" />
              <span>CATÁLOGO DE SERVICIOS ENTERPRISE · CORPLEX SOLUTIONS S.A.S.</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
              Ingeniería de Software & Soluciones Tecnológicas a la Medida
            </h1>

            <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto mb-8 font-sans">
              Diseñamos, construimos y escalamos arquitecturas tecnológicas de alto rendimiento en Colombia: Automatización Comercial con IA, Software Crítico Empresarial e Infraestructura AWS.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleOpenQuoteModal()}
                className="px-6 py-3 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#0d1722] font-bold text-sm shadow-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Cotizar Proyecto o Servicio 🚀</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/control-room"
                className="px-6 py-3 rounded-xl bg-[#142332] hover:bg-[#1b3852] border border-[#2b5b84] text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Probar Agentes en Control Room ⚡</span>
              </Link>
            </div>

          </div>
        </section>

        {/* 3 PILARES ESTRATÉGICOS */}
        <section className="py-16 bg-[#142332] border-b border-[#2b5b84]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono-tech text-[#ffd343] font-bold uppercase tracking-wider block mb-2">
                NUESTROS 3 PILARES FUNDAMENTALES
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
                Soluciones de Ingeniería & Arquitectura Empresarial
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Pilar 1 */}
              <div className="bg-[#0d1722] p-6 rounded-2xl border border-[#2b5b84] hover:border-[#ffd343]/60 transition-all duration-300 shadow-md">
                <div className="p-3 rounded-xl bg-[#1b3852] text-[#ffd343] w-fit mb-4 border border-[#ffd343]/30">
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">1. Automatización Comercial IA</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Ecosistemas de agentes autónomos integrados con canales omnicanal oficiales (WhatsApp Business API), sistemas CRM corporativos y plataformas core legadas para la orquestación integral del ciclo de ventas y atención.
                </p>
                <div className="pt-3 border-t border-[#2b5b84] text-[11px] font-mono-tech text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Eficiencia Operativa Escalable
                </div>
              </div>

              {/* Pilar 2 */}
              <div className="bg-[#0d1722] p-6 rounded-2xl border border-[#2b5b84] hover:border-sky-400/60 transition-all duration-300 shadow-md">
                <div className="p-3 rounded-xl bg-[#1b3852] text-sky-400 w-fit mb-4 border border-sky-400/30">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">2. Software Crítico a la Medida</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Sistemas ERP/CRM corporativos, plataformas web de alta concurrencia y aplicaciones cloud nativas diseñadas para operar lógica de negocio compleja con máxima resiliencia.
                </p>
                <div className="pt-3 border-t border-[#2b5b84] text-[11px] font-mono-tech text-sky-300 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> React 19 & TypeScript
                </div>
              </div>

              {/* Pilar 3 */}
              <div className="bg-[#0d1722] p-6 rounded-2xl border border-[#2b5b84] hover:border-emerald-400/60 transition-all duration-300 shadow-md">
                <div className="p-3 rounded-xl bg-[#1b3852] text-emerald-400 w-fit mb-4 border border-emerald-400/30">
                  <Cloud className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">3. Cloud AWS & Soporte SLA</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Infraestructura elástica en Amazon Web Services (EC2, RDS PostgreSQL cifrado, ALB) con monitoreo 24/7.
                </p>
                <div className="pt-3 border-t border-[#2b5b84] text-[11px] font-mono-tech text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Objetivo de disponibilidad de hasta 99.9%, sujeto a arquitectura y SLA contratado
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ARQUITECTURA TÉCNICA Y FLUJO OPERATIVO */}
        <section className="py-16 sm:py-24 bg-[#09111a] border-b border-[#2b5b84]/50 relative overflow-hidden">
          {/* Accent glow background elements */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#ffd343]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Encabezado de la Sección */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b3852] border border-[#2b5b84] text-[#ffd343] text-xs font-mono-tech font-bold mb-4 shadow-lg">
                <Cpu className="w-4 h-4 text-[#ffd343]" />
                <span>ARQUITECTURA DE AGENTES DE ALTA VELOCIDAD</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
                Ingeniería de Orquestación: Alta Velocidad sin Perder Control Humano
              </h2>

              <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-sans">
                Cómo procesamos solicitudes omnicanal en tiempo real desacoplando la recepción, la inferencia de IA y las reglas de negocio.
              </p>
            </div>

            {/* Diagrama de Bloques Interactivo (Pipeline Bento) */}
            <div className="mb-16">
              {/* Barra superior de secuencia en escritorio */}
              <div className="hidden lg:flex items-center justify-between mb-8 px-4 py-3 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs font-mono-tech text-slate-400">
                <div className="flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-sky-400" />
                  <span className="font-bold text-white uppercase tracking-wider">PIPELINE OPERATIVO SECUENCIAL DE 5 BLOQUES</span>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1 text-amber-400 font-semibold">01. Webhook</span>
                  <span>→</span>
                  <span className="flex items-center gap-1 text-sky-400 font-semibold">02. SQS Queue</span>
                  <span>→</span>
                  <span className="flex items-center gap-1 text-purple-400 font-semibold">03. Inferencia LLM</span>
                  <span>→</span>
                  <span className="flex items-center gap-1 text-cyan-400 font-semibold">04. Motor DB</span>
                  <span>→</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">05. Human HITL</span>
                </div>
              </div>

              {/* Grid de 5 Bloques Bento */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                
                {/* Bloque 1: Ingreso Ultrarrápido */}
                <div 
                  onClick={() => setActiveBlock(0)}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                    activeBlock === 0 
                      ? 'bg-[#1b3852] border-[#ffd343] shadow-lg shadow-[#ffd343]/10 ring-1 ring-[#ffd343]' 
                      : 'bg-[#142332] border-[#2b5b84] hover:border-slate-400/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      BLOQUE 01
                    </span>
                    <span className="text-[10px] font-mono-tech text-amber-400 font-bold">&lt; 300 ms</span>
                  </div>

                  <div className="mb-4">
                    <div className="p-2.5 rounded-xl bg-[#0d1722] text-amber-400 w-fit mb-3 border border-[#2b5b84]">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">Ingreso Ultrarrápido</h3>
                    <span className="text-[11px] font-mono-tech text-amber-400 font-semibold block mb-2">
                      FastAPI / AWS Lambda
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Respuesta inmediata (&lt;300ms) al webhook emisor con deduplicación de eventos en Redis.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#2b5b84]/60 flex items-center justify-between text-[11px] font-mono-tech text-slate-400">
                    <span>Deduplicación Redis</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                </div>

                {/* Bloque 2: Cola y Procesamiento Asíncrono */}
                <div 
                  onClick={() => setActiveBlock(1)}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                    activeBlock === 1 
                      ? 'bg-[#1b3852] border-sky-400 shadow-lg shadow-sky-400/10 ring-1 ring-sky-400' 
                      : 'bg-[#142332] border-[#2b5b84] hover:border-slate-400/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      BLOQUE 02
                    </span>
                    <span className="text-[10px] font-mono-tech text-sky-400 font-bold">Asíncrono</span>
                  </div>

                  <div className="mb-4">
                    <div className="p-2.5 rounded-xl bg-[#0d1722] text-sky-400 w-fit mb-3 border border-[#2b5b84]">
                      <Layers className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">Cola Asíncrona</h3>
                    <span className="text-[11px] font-mono-tech text-sky-400 font-semibold block mb-2">
                      Amazon SQS / Redis Streams
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Desacoplamiento total entre recepción e inferencia evitando cuellos de botella.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#2b5b84]/60 flex items-center justify-between text-[11px] font-mono-tech text-slate-400">
                    <span>Zero-Drop Queues</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                </div>

                {/* Bloque 3: Agentes Especializados */}
                <div 
                  onClick={() => setActiveBlock(2)}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                    activeBlock === 2 
                      ? 'bg-[#1b3852] border-purple-400 shadow-lg shadow-purple-400/10 ring-1 ring-purple-400' 
                      : 'bg-[#142332] border-[#2b5b84] hover:border-slate-400/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      BLOQUE 03
                    </span>
                    <span className="text-[10px] font-mono-tech text-purple-400 font-bold">Inferencia</span>
                  </div>

                  <div className="mb-4">
                    <div className="p-2.5 rounded-xl bg-[#0d1722] text-purple-400 w-fit mb-3 border border-[#2b5b84]">
                      <Bot className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">Agentes IA</h3>
                    <span className="text-[11px] font-mono-tech text-purple-400 font-semibold block mb-2">
                      JSON Estructurado LLM
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Inferencia con salidas JSON estructuradas (Intención, Calificación y Extracción).
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#2b5b84]/60 flex items-center justify-between text-[11px] font-mono-tech text-slate-400">
                    <span>Schema Validation</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                </div>

                {/* Bloque 4: Reglas Deterministas */}
                <div 
                  onClick={() => setActiveBlock(3)}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                    activeBlock === 3 
                      ? 'bg-[#1b3852] border-cyan-400 shadow-lg shadow-cyan-400/10 ring-1 ring-cyan-400' 
                      : 'bg-[#142332] border-[#2b5b84] hover:border-slate-400/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      BLOQUE 04
                    </span>
                    <span className="text-[10px] font-mono-tech text-cyan-400 font-bold">Determinista</span>
                  </div>

                  <div className="mb-4">
                    <div className="p-2.5 rounded-xl bg-[#0d1722] text-cyan-400 w-fit mb-3 border border-[#2b5b84]">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">Reglas Deterministas</h3>
                    <span className="text-[11px] font-mono-tech text-cyan-400 font-semibold block mb-2">
                      Motor DB Estricto
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Precios, impuestos y políticas calculados por base de datos estricta, no alucinados por la IA.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#2b5b84]/60 flex items-center justify-between text-[11px] font-mono-tech text-slate-400 gap-2">
                    <span>Reglas deterministas para precios y validación humana en decisiones críticas</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  </div>
                </div>

                {/* Bloque 5: Human-in-the-Loop */}
                <div 
                  onClick={() => setActiveBlock(4)}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                    activeBlock === 4 
                      ? 'bg-[#1b3852] border-emerald-400 shadow-lg shadow-emerald-400/10 ring-1 ring-emerald-400' 
                      : 'bg-[#142332] border-[#2b5b84] hover:border-slate-400/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      BLOQUE 05
                    </span>
                    <span className="text-[10px] font-mono-tech text-emerald-400 font-bold">Control HITL</span>
                  </div>

                  <div className="mb-4">
                    <div className="p-2.5 rounded-xl bg-[#0d1722] text-emerald-400 w-fit mb-3 border border-[#2b5b84]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">Human-in-the-Loop</h3>
                    <span className="text-[11px] font-mono-tech text-emerald-400 font-semibold block mb-2">
                      PENDING_HUMAN_APPROVAL
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Ningún compromiso contractual sale al cliente sin visto bueno previo del equipo humano.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#2b5b84]/60 flex items-center justify-between text-[11px] font-mono-tech text-slate-400">
                    <span>Aprobación Humana</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>

              </div>
            </div>

            {/* Caja de Métricas y Cumplimiento */}
            <div className="bg-[#142332] rounded-3xl p-6 sm:p-8 border border-[#2b5b84] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Cpu className="w-48 h-48 text-white" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <Gauge className="w-5 h-5 text-[#ffd343]" />
                  <h3 className="text-xs sm:text-sm font-bold font-mono-tech text-white uppercase tracking-wider">
                    MÉTRICAS CLAVE DE DESEMPEÑO Y CUMPLIMIENTO REGULATORIO
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Métrica 1 */}
                  <div className="bg-[#0d1722] p-5 rounded-2xl border border-[#2b5b84] hover:border-amber-400/40 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono-tech text-slate-400 font-bold uppercase">LATENCIA DE RECEPCIÓN</span>
                      <Gauge className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono-tech mb-1">
                      &lt; 300 ms
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Respuesta ultrarrápida al webhook de entrada. Procesa en background sin demoras ni bloqueos en la interfaz del cliente.
                    </p>
                  </div>

                  {/* Métrica 2 */}
                  <div className="bg-[#0d1722] p-5 rounded-2xl border border-[#2b5b84] hover:border-emerald-400/40 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono-tech text-slate-400 font-bold uppercase">PROTECCIÓN DE DATOS</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono-tech mb-1">
                      Ley 1581 / 2012
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Aislamiento estricto de datos sensibles. Consentimiento informado y cifrado AES-256 de extremo a extremo en Colombia.
                    </p>
                  </div>

                  {/* Métrica 3 */}
                  <div className="bg-[#0d1722] p-5 rounded-2xl border border-[#2b5b84] hover:border-sky-400/40 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono-tech text-slate-400 font-bold uppercase">TRAZABILIDAD & AUDITORÍA</span>
                      <Database className="w-4 h-4 text-sky-400" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono-tech mb-1">
                      Supabase PG
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Trazabilidad y auditoría completa en Supabase PostgreSQL. Registro inmutable de prompts, inferencias y autorizaciones.
                    </p>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* GRID DINÁMICO DE SERVICIOS (DESDE SUPABASE / CMS) */}
        <section id="grid-servicios" className="py-16 md:py-24 bg-[#0d1722]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#142332] border border-[#2b5b84] text-xs font-mono-tech font-bold mb-3">
                <Terminal className="w-4 h-4 text-sky-400" />
                <span>OFERTA DETALLADA DE SERVICIOS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Catálogo de Soluciones Corporativas
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Nuestros servicios incluyen soporte técnico directo, garantía de licenciamiento propio y acatamiento estricto a la Ley 1581 de 2012.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-[#ffd343] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-xs font-mono-tech text-slate-400">Cargando catálogo de servicios desde Supabase CMS...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-[#142332] rounded-2xl p-6 border border-[#2b5b84] hover:border-[#ffd343]/60 shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Header de Card */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-[#0d1722] border border-[#2b5b84]">
                          {renderServiceIcon(service.icon_name)}
                        </div>
                        {service.badge && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#ffd343]/20 text-[#ffd343] text-xs font-mono-tech font-bold border border-[#ffd343]/40">
                            {service.badge}
                          </span>
                        )}
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl font-bold text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                        {service.short_description}
                      </p>

                      {/* Scope & Deliverables */}
                      <div className="space-y-2 mb-6 font-mono-tech text-xs">
                        <div className="flex items-center gap-2 text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Código fuente y documentación</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Soporte SLA directo en Colombia</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Cumplimiento Ley 1581 de 2012</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-4 border-t border-[#2b5b84] space-y-4">
                      {service.price_starting_at > 0 && (
                        <div className="flex items-baseline justify-between text-xs font-mono-tech">
                          <span className="text-slate-400">Desde:</span>
                          <span className="text-[#ffd343] font-bold text-base">
                            ${service.price_starting_at.toLocaleString('es-CO')} COP
                          </span>
                        </div>
                      )}

                      <button
                        onClick={() => handleOpenQuoteModal(service.title)}
                        className="w-full py-2.5 rounded-xl bg-[#2b5b84] hover:bg-[#1b3852] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#4b7da5]/50"
                      >
                        <span>Solicitar Propuesta ↗</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </section>

        {/* ESPECIFICACIONES DE TRANSPARENCIA & SLA */}
        <section className="py-16 bg-[#111d28] border-t border-[#2b5b84]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#142332] rounded-3xl p-8 border border-[#2b5b84] shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                
                <div className="p-4 rounded-xl bg-[#0d1722] border border-[#2b5b84]">
                  <Lock className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-xs font-bold text-white uppercase font-mono-tech mb-1">Cifrado & Seguridad</h4>
                  <p className="text-[11px] text-slate-400">Protocolos SSL/TLS y cifrado AES-256 en bases de datos PostgreSQL.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#0d1722] border border-[#2b5b84]">
                  <ShieldCheck className="w-6 h-6 text-sky-400 mx-auto mb-2" />
                  <h4 className="text-xs font-bold text-white uppercase font-mono-tech mb-1">Ley 1581 de 2012</h4>
                  <p className="text-[11px] text-slate-400">Consentimiento informado y tratamiento riguroso de datos personales.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#0d1722] border border-[#2b5b84]">
                  <Server className="w-6 h-6 text-[#ffd343] mx-auto mb-2" />
                  <h4 className="text-xs font-bold text-white uppercase font-mono-tech mb-1">AWS Cloud Native</h4>
                  <p className="text-[11px] text-slate-400">Infraestructura auto-escalable con balanceadores ALB y respaldo constante.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#0d1722] border border-[#2b5b84]">
                  <Clock className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <h4 className="text-xs font-bold text-white uppercase font-mono-tech mb-1">Soporte SLA Garantizado</h4>
                  <p className="text-[11px] text-slate-400">Respuesta prioritaria en Colombia para operaciones críticas 24/7.</p>
                </div>

              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Component */}
      <Footer />

      {/* Scroll to Top */}
      <ScrollToTop />

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuoteModal}
        preSelectedService={selectedServiceTitle}
      />

    </div>
  );
};
