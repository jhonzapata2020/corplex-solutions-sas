import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';
import { LEGAL_INFO } from '../data/corporateData';
import type { ContactFormData } from '../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    institutionOrCompany: '',
    requestType: 'Desarrollo de Software & Web Apps',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
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

  return (
    <section id="contacto" className="py-24 relative bg-slate-50 border-t border-slate-200 font-tech">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono-tech font-medium mb-4">
            <MessageSquare className="w-4 h-4 text-sky-600 stroke-[1.75]" />
            <span>ATENCIÓN INSTITUCIONAL & PROYECTOS TI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Inicia tu Proyecto Tecnológico
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Comunícate directamente con la dirección técnica de CORPLEX SOLUTIONS S.A.S. para cotizaciones, convenios o consultas de infraestructura.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Communication Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Priority Card */}
            <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm relative overflow-hidden text-slate-900">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600">
                  <MessageSquare className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Canal WhatsApp Prioritario</h3>
                  <span className="text-xs font-mono-tech text-emerald-600 flex items-center gap-1 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    Respuesta Inmediata
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Inicia una conversación instantánea para agendar reuniones técnicas o validar factibilidad de proyectos.
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href={`https://wa.me/${LEGAL_INFO.whatsapp1}?text=${encodeURIComponent('Hola CORPLEX SOLUTIONS, deseo información sobre proyectos de software.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <span>WhatsApp Principal ({LEGAL_INFO.phone1Display})</span>
                  <ExternalLink className="w-4 h-4 stroke-[1.75]" />
                </a>

                <a
                  href={`https://wa.me/${LEGAL_INFO.whatsapp2}?text=${encodeURIComponent('Hola CORPLEX SOLUTIONS, me comunico sobre infraestructura TI.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-mono-tech text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>WhatsApp Secundario ({LEGAL_INFO.phone2Display})</span>
                </a>
              </div>
            </div>

            {/* Direct Telephone & Email Cards */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 text-slate-900">
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-sky-600 shrink-0">
                  <Phone className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <span className="text-xs font-mono-tech text-slate-500 font-bold block">LÍNEAS DIRECTAS</span>
                  <div className="flex flex-col gap-1 mt-1 font-mono-tech text-sm font-bold text-slate-900">
                    <a href={`tel:${LEGAL_INFO.whatsapp1}`} className="hover:text-cyan-700 transition-colors">
                      {LEGAL_INFO.phone1Display}
                    </a>
                    <a href={`tel:${LEGAL_INFO.whatsapp2}`} className="hover:text-cyan-700 transition-colors">
                      {LEGAL_INFO.phone2Display}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-slate-200">
                <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-cyan-600 shrink-0">
                  <Mail className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <span className="text-xs font-mono-tech text-slate-500 font-bold block">CORREO INSTITUCIONAL & JUDICIAL</span>
                  <a href={`mailto:${LEGAL_INFO.institutionalEmail}`} className="text-sm font-bold font-mono-tech text-cyan-700 hover:underline block mt-1">
                    {LEGAL_INFO.institutionalEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-slate-200">
                <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-emerald-600 shrink-0">
                  <MapPin className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <span className="text-xs font-mono-tech text-slate-500 font-bold block">SEDE PRINCIPAL</span>
                  <div className="text-sm font-bold text-slate-900 mt-1">{LEGAL_INFO.address}</div>
                  <div className="text-xs text-slate-600">{LEGAL_INFO.city}, {LEGAL_INFO.department} - Colombia</div>
                </div>
              </div>

            </div>

          </div>

          {/* Formulario de Contacto (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm text-slate-900">
            
            {isSubmitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 stroke-[1.75]" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900">¡Solicitud Preparada Exitosamente!</h3>
                
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  Para agilizar la atención, puedes enviar la solicitud procesada directamente a nuestro WhatsApp oficial.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                  <button
                    onClick={handleSendWhatsAppDirect}
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Enviar a WhatsApp Ahora</span>
                    <Send className="w-4 h-4 stroke-[1.75]" />
                  </button>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300"
                  >
                    Redactar otro Mensaje
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <span className="text-xs font-mono-tech text-cyan-700 font-bold">FORMULARIO INSTITUCIONAL TI</span>
                  <span className="text-xs text-slate-500 font-mono-tech">* Campos obligatorios</span>
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
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
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
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
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
                      placeholder="Ej. UNAD / Alcaldía / Empresa S.A.S."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">Tipo de Solicitud *</label>
                    <select
                      name="requestType"
                      value={formData.requestType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    >
                      <option value="Desarrollo de Software & Web Apps">Desarrollo de Software & Web Apps</option>
                      <option value="Arquitectura Cloud AWS & DevOps">Arquitectura Cloud AWS & DevOps</option>
                      <option value="Simuladores Educativos UNAD">Simuladores Educativos UNAD</option>
                      <option value="Consultoría e Infraestructura TI">Consultoría e Infraestructura TI</option>
                      <option value="Soporte y Mantenimiento (CIIU S9511)">Soporte y Mantenimiento (CIIU S9511)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">Mensaje o Requerimientos *</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describa brevemente los objetivos, tecnologías esperadas o requerimientos institucionales..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    <span>{isSubmitting ? 'Procesando...' : 'Enviar Solicitud Institucional'}</span>
                    <Send className="w-4 h-4 stroke-[1.75]" />
                  </button>

                  <span className="text-[11px] font-mono-tech text-slate-500 text-center">
                    Respuesta garantizada en menos de 24 horas.
                  </span>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
