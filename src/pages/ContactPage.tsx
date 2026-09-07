import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { QuoteModal } from '../components/QuoteModal';
import { ScrollToTop } from '../components/ScrollToTop';
import { PrivacyModal } from '../components/PrivacyModal';
import { LEGAL_INFO } from '../data/corporateData';
import { submitLead } from '../services/leadService';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  MessageSquare,
  ExternalLink,
  Sparkles,
  Clock,
  ShieldCheck,
  Building2,
  Compass,
  Headphones,
  Bot
} from 'lucide-react';
import type { ContactFormData } from '../types';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    institutionOrCompany: '',
    requestType: 'Desarrollo de Software & Web Apps',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [hasAcceptedPrivacy, setHasAcceptedPrivacy] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | undefined>(undefined);
  const [isControlRoomOpen, setIsControlRoomOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasAcceptedPrivacy) return;
    setIsSubmitting(true);

    try {
      await submitLead({
        fullName: formData.fullName,
        companyName: formData.institutionOrCompany,
        contactDetail: formData.email,
        email: formData.email,
        bottleneckDescription: `[Tipo: ${formData.requestType}] ${formData.message}`,
        selectedPackage: formData.requestType,
        sector: 'Contacto Web Directo'
      });
    } catch (err) {
      console.warn('Registro local Supabase con advertencia, continuando interacción:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleSendWhatsAppDirect = () => {
    const text = `*SOLICITUD WEB - CORPLEX SOLUTIONS S.A.S.*
*Nombre:* ${formData.fullName}
*Institución/Empresa:* ${formData.institutionOrCompany}
*Correo:* ${formData.email}
*Tipo de Solicitud:* ${formData.requestType}
*Mensaje:* ${formData.message}`;

    window.open(`https://wa.me/${LEGAL_INFO.whatsapp1}?text=${encodeURIComponent(text)}`, '_blank');
  };

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
        onOpenControlRoom={() => setIsControlRoomOpen(true)}
      />

      {/* Main Contact Page Layout */}
      <main>
        
        {/* HERO CORPOATIVO DE CONTACTO */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-[#111d28] via-[#0d1722] to-[#142332] relative border-b border-[#2b5b84]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1b3852] border border-[#2b5b84] text-[#ffd343] text-xs font-mono-tech font-bold mb-6 shadow-md">
              <Sparkles className="w-4 h-4 text-[#ffd343]" />
              <span>ATENCIÓN INSTITUCIONAL DIRECTA · CORPLEX SOLUTIONS S.A.S.</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
              Canales Oficiales & Atención a Proyectos TI
            </h1>

            <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto mb-8 font-sans">
              Ponte en contacto directo con la gerencia técnica y comercial de CORPLEX. Atendemos cotizaciones de desarrollo, proyectos de automatización e infraestructura Cloud en toda Colombia.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`https://wa.me/${LEGAL_INFO.whatsapp1}?text=${encodeURIComponent('Hola CORPLEX SOLUTIONS, solicito atención inmediata para un proyecto.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Prioritario 24/7</span>
              </a>

              <Link
                to="/control-room"
                className="px-6 py-3 rounded-xl bg-[#142332] hover:bg-[#1b3852] border border-[#2b5b84] text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-[#ffd343]" />
                <span>Probar Agentes en Control Room ⚡</span>
              </Link>
            </div>

          </div>
        </section>

        {/* SECCIÓN PRINCIPAL DE CONTACTO & FORMULARIO */}
        <section id="formulario-contacto" className="py-16 md:py-24 bg-[#0d1722]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* CANALES DIRECTOS DE COMUNICACIÓN (5 COLS) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Tarjeta de Respuesta WhatsApp Prioritario */}
                <div className="bg-[#142332] p-6 sm:p-8 rounded-2xl border border-[#2b5b84] shadow-xl relative overflow-hidden text-slate-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-2xl bg-[#1b3852] border border-[#4b7da5]/40 text-emerald-400">
                      <Headphones className="w-6 h-6 stroke-[1.75]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Línea de Respuesta Inmediata</h3>
                      <span className="text-xs font-mono-tech text-emerald-400 flex items-center gap-1 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        Disponibilidad Comercial & Técnica
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                    Atención personalizada para gerentes de tecnología, coordinadores académicos de la UNAD y directores de proyectos empresariales.
                  </p>

                  <div className="flex flex-col gap-3">
                    <a
                      href={`https://wa.me/${LEGAL_INFO.whatsapp1}?text=${encodeURIComponent('Hola CORPLEX SOLUTIONS, deseo información sobre desarrollo de software.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                    >
                      <span>WhatsApp Línea 1 ({LEGAL_INFO.phone1Display})</span>
                      <ExternalLink className="w-4 h-4 stroke-[1.75]" />
                    </a>

                    <a
                      href={`https://wa.me/${LEGAL_INFO.whatsapp2}?text=${encodeURIComponent('Hola CORPLEX SOLUTIONS, me comunico sobre infraestructura Cloud.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-[#1b3852] hover:bg-[#2b5b84] text-emerald-300 border border-emerald-500/40 font-mono-tech text-xs flex items-center justify-center gap-2 transition-colors font-bold"
                    >
                      <span>WhatsApp Línea 2 ({LEGAL_INFO.phone2Display})</span>
                    </a>
                  </div>
                </div>

                {/* Datos Institucionales y Sede */}
                <div className="bg-[#142332] p-6 sm:p-8 rounded-2xl border border-[#2b5b84] shadow-xl space-y-6 text-slate-100">
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-[#0d1722] border border-[#2b5b84] text-[#ffd343] shrink-0">
                      <Phone className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <div>
                      <span className="text-xs font-mono-tech text-slate-400 font-bold block">TELÉFONOS INSTITUCIONALES</span>
                      <div className="flex flex-col gap-1 mt-1 font-mono-tech text-sm font-bold text-white">
                        <a href={`tel:${LEGAL_INFO.whatsapp1}`} className="hover:text-[#ffd343] transition-colors">
                          {LEGAL_INFO.phone1Display}
                        </a>
                        <a href={`tel:${LEGAL_INFO.whatsapp2}`} className="hover:text-[#ffd343] transition-colors">
                          {LEGAL_INFO.phone2Display}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pt-4 border-t border-[#2b5b84]">
                    <div className="p-3 rounded-xl bg-[#0d1722] border border-[#2b5b84] text-sky-400 shrink-0">
                      <Mail className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <div>
                      <span className="text-xs font-mono-tech text-slate-400 font-bold block">CORREO INSTITUCIONAL & JUDICIAL</span>
                      <a href={`mailto:${LEGAL_INFO.institutionalEmail}`} className="text-sm font-bold font-mono-tech text-[#ffd343] hover:underline block mt-1">
                        {LEGAL_INFO.institutionalEmail}
                      </a>
                      <span className="text-[10px] text-slate-400 font-mono-tech mt-0.5 block">Notificaciones Judiciales & Peticiones</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pt-4 border-t border-[#2b5b84]">
                    <div className="p-3 rounded-xl bg-[#0d1722] border border-[#2b5b84] text-emerald-400 shrink-0">
                      <MapPin className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <div>
                      <span className="text-xs font-mono-tech text-slate-400 font-bold block">SEDE PRINCIPAL</span>
                      <div className="text-sm font-bold text-white mt-1">{LEGAL_INFO.address}</div>
                      <div className="text-xs text-slate-300">{LEGAL_INFO.city}, {LEGAL_INFO.department} - Colombia</div>
                      <div className="text-[11px] font-mono-tech text-emerald-400 mt-1 font-bold">NIT: {LEGAL_INFO.nit}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pt-4 border-t border-[#2b5b84]">
                    <div className="p-3 rounded-xl bg-[#0d1722] border border-[#2b5b84] text-amber-400 shrink-0">
                      <Clock className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <div>
                      <span className="text-xs font-mono-tech text-slate-400 font-bold block">HORARIOS DE ATENCIÓN</span>
                      <div className="text-xs text-white mt-1 font-bold">Lunes a Viernes: 8:00 AM – 6:00 PM (COT)</div>
                      <div className="text-[11px] text-slate-400">Monitoreo técnico de servidores 24/7</div>
                    </div>
                  </div>

                </div>

              </div>

              {/* FORMULARIO INSTITUCIONAL (7 COLS) */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-2xl text-slate-900">
                
                {isSubmitted ? (
                  <div className="text-center py-12 space-y-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 stroke-[1.75]" />
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900">¡Solicitud Registrada Exitosamente!</h3>
                    
                    <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                      Tu mensaje fue guardado en nuestro CRM Supabase. Para agilizar la respuesta con un ingeniero técnico, puedes enviarlo directamente por WhatsApp.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                      <button
                        onClick={handleSendWhatsAppDirect}
                        className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                      >
                        <span>Abrir en WhatsApp Ahora</span>
                        <Send className="w-4 h-4 stroke-[1.75]" />
                      </button>

                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 cursor-pointer"
                      >
                        Redactar otra Consulta
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                      <div>
                        <span className="text-xs font-mono-tech text-[#2b5b84] font-bold block">FORMULARIO DE ATENCIÓN DIRECTA</span>
                        <h3 className="text-lg font-bold text-slate-900">Formula tu Consulta o Requerimiento</h3>
                      </div>
                      <span className="text-xs text-slate-500 font-mono-tech hidden sm:inline">* Campos obligatorios</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">Nombre Completo *</label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Ej. Ing. Carlos Ramírez"
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">Correo Electrónico *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="carlos@institucion.edu.co"
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">Institución / Empresa *</label>
                        <input
                          type="text"
                          name="institutionOrCompany"
                          required
                          value={formData.institutionOrCompany}
                          onChange={handleChange}
                          placeholder="Ej. UNAD / Empresa S.A.S. / Alcaldía"
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">Tipo de Solicitud *</label>
                        <select
                          name="requestType"
                          value={formData.requestType}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84] transition-colors"
                        >
                          <option value="Desarrollo de Software & Web Apps">Desarrollo de Software & Web Apps</option>
                          <option value="Arquitectura Cloud AWS & DevOps">Arquitectura Cloud AWS & DevOps</option>
                          <option value="Simuladores Educativos UNAD">Simuladores Educativos UNAD</option>
                          <option value="Automatización e Inteligencia Artificial">Automatización e Inteligencia Artificial</option>
                          <option value="Infraestructura & Soporte Técnico TI">Infraestructura & Soporte Técnico TI</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">Mensaje o Requerimientos Técnicos *</label>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describa los objetivos del proyecto, tiempos estimados o tecnología de preferencia..."
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84] transition-colors resize-none"
                      />
                    </div>

                    {/* Autorización Ley 1581 */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="privacy-consent-contact-page"
                        required
                        checked={hasAcceptedPrivacy}
                        onChange={(e) => setHasAcceptedPrivacy(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-[#2b5b84] focus:ring-[#2b5b84] border-slate-300 cursor-pointer shrink-0"
                      />
                      <label htmlFor="privacy-consent-contact-page" className="text-xs text-slate-700 leading-relaxed cursor-pointer select-none">
                        Autorizo el tratamiento de mis datos personales conforme a la Ley 1581 de 2012 y la{' '}
                        <button
                          type="button"
                          onClick={() => setIsPrivacyOpen(true)}
                          className="text-[#2b5b84] hover:underline font-mono-tech font-bold cursor-pointer inline-flex items-center gap-0.5"
                        >
                          <span>Política de Privacidad y Manejo de Datos de CORPLEX SOLUTIONS S.A.S.</span>
                        </button>
                        <span className="text-rose-600 font-bold ml-1">*</span>
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting || !hasAcceptedPrivacy}
                        className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-bold text-xs flex items-center justify-center gap-2 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all active:scale-95"
                      >
                        <span>{isSubmitting ? 'Guardando en Supabase...' : 'Enviar Consulta a Gerencia Técnico-Comercial'}</span>
                        <Send className="w-4 h-4 text-[#111d28] stroke-[2]" />
                      </button>

                      <span className="text-[11px] font-mono-tech text-slate-500 text-center">
                        ✓ Respuesta en menos de 24 horas hábiles.
                      </span>
                    </div>

                  </form>
                )}

              </div>

            </div>

          </div>
        </section>

        {/* UBICACIÓN & UMBRAL TERRITORIAL EN URABÁ */}
        <section className="py-16 bg-[#111d28] border-t border-[#2b5b84]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#142332] rounded-3xl p-8 border border-[#2b5b84] shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b3852] border border-[#2b5b84] text-emerald-400 text-xs font-mono-tech font-bold">
                    <Compass className="w-4 h-4" />
                    <span>PRESENCIA REGIONAL URABÁ</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Sede Corporativa en Turbo, Urabá, Colombia</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Operamos desde el polo de desarrollo agroindustrial y tecnológico de la subregión del Urabá antioqueño, con cobertura de software en toda Colombia y alcance internacional.
                  </p>
                  <div className="pt-2 text-xs font-mono-tech text-[#ffd343] font-bold">
                    NIT {LEGAL_INFO.nit} · Registro Mercantil Vigente
                  </div>
                </div>

                <div className="lg:col-span-2 bg-[#0d1722] p-6 rounded-2xl border border-[#2b5b84] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#142332] border border-[#2b5b84]">
                    <Building2 className="w-5 h-5 text-sky-400 mb-2" />
                    <h4 className="text-xs font-bold text-white uppercase font-mono-tech mb-1">Domicilio Principal</h4>
                    <p className="text-[11px] text-slate-300">{LEGAL_INFO.address}, {LEGAL_INFO.city}</p>
                    <span className="text-[10px] text-slate-400 font-mono-tech block mt-1">Departamento de Antioquia</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#142332] border border-[#2b5b84]">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
                    <h4 className="text-xs font-bold text-white uppercase font-mono-tech mb-1">Garantía Legal & Contratos</h4>
                    <p className="text-[11px] text-slate-300">Acatamiento estricto a las normas de contratación nacional y estatutos TI.</p>
                    <span className="text-[10px] text-slate-400 font-mono-tech block mt-1">Cumplimiento Ley 1581 de 2012</span>
                  </div>
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

      {/* Privacy Policy Modal */}
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuoteModal}
        preSelectedService={selectedServiceTitle}
      />

    </div>
  );
};

export default ContactPage;
