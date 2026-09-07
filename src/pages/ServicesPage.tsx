import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { QuoteModal } from '../components/QuoteModal';
import { ScrollToTop } from '../components/ScrollToTop';
import { AgentOperationsCenter } from '../components/AgentOperationsCenter';
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
  Terminal
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<SiteServiceEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | undefined>(undefined);
  const [isControlRoomOpen, setIsControlRoomOpen] = useState<boolean>(false);

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

              <button
                onClick={() => setIsControlRoomOpen(true)}
                className="px-6 py-3 rounded-xl bg-[#142332] hover:bg-[#1b3852] border border-[#2b5b84] text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Probar Agentes en Control Room ⚡</span>
              </button>
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
                Capacidad Técnica Probada
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
                  Agentes conversacionales inteligentes integrados con WhatsApp API, CRM Supabase y sistemas legacy sin tipeo manual.
                </p>
                <div className="pt-3 border-t border-[#2b5b84] text-[11px] font-mono-tech text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ROI 4.2x Estimado
                </div>
              </div>

              {/* Pilar 2 */}
              <div className="bg-[#0d1722] p-6 rounded-2xl border border-[#2b5b84] hover:border-sky-400/60 transition-all duration-300 shadow-md">
                <div className="p-3 rounded-xl bg-[#1b3852] text-sky-400 w-fit mb-4 border border-sky-400/30">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">2. Software Crítico a la Medida</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Sistemas ERP/CRM corporativos, plataformas web interactivas y simuladores docentes para la UNAD / ECBTI.
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
                  <CheckCircle2 className="w-3.5 h-3.5" /> 99.9% Uptime Garantizado
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

      {/* Control Room Workstation Modal */}
      <AgentOperationsCenter
        isOpen={isControlRoomOpen}
        onClose={() => setIsControlRoomOpen(false)}
      />

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuoteModal}
        preSelectedService={selectedServiceTitle}
      />

    </div>
  );
};
