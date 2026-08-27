import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, ExternalLink, Clock, Building2, Sparkles } from 'lucide-react';
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
    <section id="contacto" className="py-24 relative bg-slate-950 border-t border-slate-800/80">
      
      {/* Glow Effects */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono font-semibold mb-4">
            <MessageSquare className="w-4 h-4 text-sky-400" />
            <span>ATENCIÓN TÉCNICA & COMERCIAL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Contacto e Iniciar Proyecto
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Estamos listos para evaluar sus requerimientos de software, nube o infraestructura. Comuníquese directamente con la dirección técnica de CORPLEX SOLUTIONS S.A.S.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Communication Channels (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Direct Card */}
            <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 bg-emerald-950/20 relative overflow-hidden">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Canal Prioritario WhatsApp</h3>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    Respuesta Inmediata
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                Inicie una conversación instantánea con nuestro equipo para cotizaciones rápidas, dudas técnicas o agendamiento de reuniones.
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href={`https://wa.me/${LEGAL_INFO.whatsapp1}?text=${encodeURIComponent('Hola CORPLEX SOLUTIONS, deseo información para un proyecto de software/nube.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-colors"
                >
                  <span>WhatsApp Principal ({LEGAL_INFO.phone1Display})</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={`https://wa.me/${LEGAL_INFO.whatsapp2}?text=${encodeURIComponent('Hola CORPLEX SOLUTIONS, deseo información sobre servicios de ingeniería TI.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 font-mono text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>WhatsApp Secundario ({LEGAL_INFO.phone2Display})</span>
                </a>
              </div>
            </div>

            {/* Direct Channels Cards */}
            <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-5">
              
              {/* Telephone */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-sky-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block">LÍNEAS DIRECTAS TELÉFONOS</span>
                  <div className="flex flex-col gap-1 mt-1 font-mono text-sm font-bold text-white">
                    <a href={`tel:${LEGAL_INFO.whatsapp1}`} className="hover:text-sky-400 transition-colors">
                      {LEGAL_INFO.phone1Display}
                    </a>
                    <a href={`tel:${LEGAL_INFO.whatsapp2}`} className="hover:text-sky-400 transition-colors">
                      {LEGAL_INFO.phone2Display}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-800/80">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block">CORREO INSTITUCIONAL & JUDICIAL</span>
                  <a href={`mailto:${LEGAL_INFO.institutionalEmail}`} className="text-sm font-bold font-mono text-sky-400 hover:underline block mt-1">
                    {LEGAL_INFO.institutionalEmail}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-800/80">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block">SEDE FISICA Y ATENCIÓN</span>
                  <div className="text-sm font-bold text-white mt-1">{LEGAL_INFO.address}</div>
                  <div className="text-xs text-slate-400">{LEGAL_INFO.city}, {LEGAL_INFO.department} - Colombia</div>
                </div>
              </div>

            </div>

          </div>

          {/* Contact Interactive Form (Right 7 Cols) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 relative">
            
            {isSubmitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-white">¡Mensaje Preparado y Registrado!</h3>
                
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Gracias por comunicarse con CORPLEX SOLUTIONS S.A.S. Para acelerar la atención, puede enviar la solicitud procesada directamente a nuestro WhatsApp.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                  <button
                    onClick={handleSendWhatsAppDirect}
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                  >
                    <span>Enviar a WhatsApp Ahora</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold"
                  >
                    Redactar otro Mensaje
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="text-xs font-mono text-sky-400 font-semibold">FORMULARIO DE SOLICITUD TI</span>
                  <span className="text-xs text-slate-400 font-mono">* Campos requeridos</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">Nombre Completo *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Ej. Ing. Carlos Ramírez"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">Correo Electrónico *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="carlos@institucion.edu.co"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Institution or Company */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">Institución / Empresa *</label>
                    <input
                      type="text"
                      name="institutionOrCompany"
                      required
                      value={formData.institutionOrCompany}
                      onChange={handleChange}
                      placeholder="Ej. UNAD / Alcaldía / Empresa S.A.S."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>

                  {/* Request Type */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">Tipo de Solicitud *</label>
                    <select
                      name="requestType"
                      value={formData.requestType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-sky-500 transition-colors"
                    >
                      <option value="Desarrollo de Software & Web Apps">Desarrollo de Software & Web Apps</option>
                      <option value="Cloud Computing AWS & DevOps">Cloud Computing AWS & DevOps</option>
                      <option value="Simuladores Educativos UNAD">Simuladores Educativos UNAD</option>
                      <option value="Consultoría e Infraestructura TI">Consultoría e Infraestructura TI</option>
                      <option value="Soporte y Mantenimiento (CIIU S9511)">Soporte y Mantenimiento (CIIU S9511)</option>
                    </select>
                  </div>

                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">Mensaje / Requerimiento del Proyecto *</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describa brevemente los objetivos, tecnologías esperadas o requerimientos institucionales..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-sky-500 transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Procesando Solicitud...' : 'Enviar Solicitud Institucional'}</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <span className="text-[11px] font-mono text-slate-400 text-center">
                    Respuesta garantizada en menos de 24 horas hábiles.
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
