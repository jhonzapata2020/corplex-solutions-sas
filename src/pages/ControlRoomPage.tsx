import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { QuoteModal } from '../components/QuoteModal';
import { ScrollToTop } from '../components/ScrollToTop';
import { AgentOperationsCenter } from '../components/AgentOperationsCenter';
import { Sparkles, Terminal, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ControlRoomPage: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOpenQuoteModal = (title?: string) => {
    setSelectedServiceTitle(title);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedServiceTitle(undefined);
  };

  return (
    <div className="min-h-screen bg-[#0d1722] text-slate-100 font-tech selection:bg-[#ffd343] selection:text-black">
      
      {/* Header Navigation */}
      <Navbar
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Main Page Layout */}
      <main>
        
        {/* HERO BANNER CONTROL ROOM */}
        <section className="py-12 sm:py-16 bg-gradient-to-b from-[#111d28] via-[#0d1722] to-[#142332] relative border-b border-[#2b5b84]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1b3852] border border-[#2b5b84] text-[#ffd343] text-xs font-mono-tech font-bold mb-4 shadow-md">
              <Sparkles className="w-4 h-4 text-[#ffd343]" />
              <span>ESTACIÓN DE TRABAJO EMANADA · AGENT OPERATIONS CONTROL ROOM ⚡</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4 max-w-4xl mx-auto leading-tight">
              Simulador Interactivo de Agentes Omnicanal
            </h1>

            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mb-6 font-sans">
              Ejecuta pruebas de automatización comercial en vivo. Observa cómo nuestros 5 agentes autónomos procesan mensajes por WhatsApp, filtran leads en Supabase CRM y notifican tareas en tiempo real.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleOpenQuoteModal('Automatización Comercial con IA')}
                className="px-6 py-2.5 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#0d1722] font-bold text-xs shadow-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Solicitar Flujo Personalizado 🚀</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/contacto"
                className="px-6 py-2.5 rounded-xl bg-[#142332] hover:bg-[#1b3852] border border-[#2b5b84] text-white font-bold text-xs transition-all flex items-center gap-2"
              >
                <span>Agendar Diagnóstico TI</span>
              </Link>
            </div>

          </div>
        </section>

        {/* WORKSTATION AGENT OPERATIONS CENTER EMBEDDED SECTION */}
        <section className="py-8 bg-[#070e17]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-[#2b5b84] shadow-2xl overflow-hidden bg-[#070e17]">
              <AgentOperationsCenter
                isPage={true}
                onOpenQuoteModal={handleOpenQuoteModal}
              />
            </div>
          </div>
        </section>

        {/* GARANTÍA & METRICAS DE OBSERVABILIDAD */}
        <section className="py-12 bg-[#111d28] border-t border-[#2b5b84]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              
              <div className="bg-[#142332] p-6 rounded-2xl border border-[#2b5b84]">
                <Terminal className="w-6 h-6 text-sky-400 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-white mb-1">Cero Tipeo Manual</h3>
                <p className="text-xs text-slate-400">Extracción automática de datos estructurados para su empresa.</p>
              </div>

              <div className="bg-[#142332] p-6 rounded-2xl border border-[#2b5b84]">
                <Zap className="w-6 h-6 text-[#ffd343] mx-auto mb-2" />
                <h3 className="text-sm font-bold text-white mb-1">Respuesta Sub-segundo</h3>
                <p className="text-xs text-slate-400">Tiempo de respuesta promedio de 1.2 segundos por interacción.</p>
              </div>

              <div className="bg-[#142332] p-6 rounded-2xl border border-[#2b5b84]">
                <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-white mb-1">Cumplimiento Ley 1581</h3>
                <p className="text-xs text-slate-400">Seguridad jurídica y confidencialidad en el manejo de leads.</p>
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

export default ControlRoomPage;
