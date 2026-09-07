import React, { useState } from 'react';
import { X, CheckCircle2, Calculator, Send, AlertCircle, RefreshCw, CheckCircle } from 'lucide-react';
import { LEGAL_INFO } from '../data/corporateData';
import { supabase } from '../lib/supabase';
import { submitLead } from '../services/leadService';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, preSelectedService }) => {
  const [projectType, setProjectType] = useState<string>(preSelectedService || 'Desarrollo de Software & Web Apps');
  const [scope, setScope] = useState<string>('Intermedio (Escalable)');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['Despliegue Cloud AWS', 'API REST & Base de Datos']);
  
  const [clientInfo, setClientInfo] = useState({
    name: '',
    org: '',
    email: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false);
  const [radicadoId, setRadicadoId] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleAddon = (addon: string) => {
    setSelectedAddons(prev =>
      prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon]
    );
  };

  const calculateEstimatedPrice = (): number => {
    let basePrice = 5000000;
    if (scope.includes('Básico')) basePrice = 2500000;
    if (scope.includes('Enterprise')) basePrice = 12000000;

    const addonPrice = selectedAddons.length * 800000;
    return basePrice + addonPrice;
  };

  const generateWhatsAppMessage = (currentRadicado?: string) => {
    const estimatedPrice = calculateEstimatedPrice();
    const radicadoLine = currentRadicado ? `\n*Radicado N°:* ${currentRadicado}` : '';
    
    const text = `*SOLICITUD DE COTIZACIÓN TI - CORPLEX SOLUTIONS S.A.S.*${radicadoLine}
*Tipo de Proyecto:* ${projectType}
*Alcance / Escala:* ${scope}
*Módulos Seleccionados:* ${selectedAddons.join(', ') || 'Ninguno'}
*Estimación Aproximada:* $${estimatedPrice.toLocaleString('es-CO')} COP
*Contacto:* ${clientInfo.name || 'Sin especificar'} (${clientInfo.org || 'Institución/Empresa'})
*Teléfono / WhatsApp:* ${clientInfo.phone || 'No especificado'}
*Correo Electrónico:* ${clientInfo.email || 'No especificado'}`;

    return `https://wa.me/${LEGAL_INFO.whatsapp1}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validación de campos obligatorios
    if (!clientInfo.name.trim() || !clientInfo.org.trim()) {
      setErrorMsg('Por favor complete su Nombre Completo y su Institución o Empresa.');
      return;
    }

    setIsSubmitting(true);
    const estimatedPrice = calculateEstimatedPrice();
    const problemDescription = `Cotización TI: Escala [${scope}] - Módulos: [${selectedAddons.join(', ') || 'Sin módulos adicionales'}]`;
    const contactDetail = [clientInfo.phone.trim(), clientInfo.email.trim()].filter(Boolean).join(' | ') || 'Contacto por WhatsApp';
    const generatedId = `LEAD-${Date.now().toString().slice(-6)}`;

    try {
      // 1. Inserción obligatoria en Supabase (tabla 'automation_leads')
      const { error } = await supabase
        .from('automation_leads')
        .insert([
          {
            contact_name: clientInfo.name.trim(),
            full_name: clientInfo.name.trim(),
            company_name: clientInfo.org.trim(),
            email: clientInfo.email.trim() || null,
            phone: clientInfo.phone.trim() || null,
            contact_detail: contactDetail,
            sector: projectType || 'Desarrollo de Software',
            problem_description: problemDescription,
            bottleneck_description: problemDescription,
            status: 'pending',
            source: 'cotizador_modal',
            channel: 'cotizador_modal',
            estimated_budget: estimatedPrice,
            estimated_value: estimatedPrice,
            created_at: new Date().toISOString(),
          }
        ]);

      if (error) {
        console.warn('SDK Supabase devolvió advertencia/error, ejecutando servicio fallback REST:', error);
        // Fallback dual REST
        await submitLead({
          fullName: clientInfo.name.trim(),
          companyName: clientInfo.org.trim(),
          company: clientInfo.org.trim(),
          contactDetail: contactDetail,
          email: clientInfo.email.trim(),
          phone: clientInfo.phone.trim(),
          sector: projectType,
          bottleneckDescription: problemDescription,
          bottleneck: problemDescription,
          selectedPackage: scope,
          operationVolume: 'Estándar'
        });
      }

      // 2. Disparar evento para refresco en tiempo real del CRM
      window.dispatchEvent(new CustomEvent('corplex_refresh_leads'));
      window.dispatchEvent(new CustomEvent('corplex_lead_created', {
        detail: { name: clientInfo.name, company: clientInfo.org }
      }));

      setRadicadoId(generatedId);
      setLeadSubmitted(true);

      // 3. Abrir WhatsApp en nueva pestaña
      const waUrl = generateWhatsAppMessage(generatedId);
      window.open(waUrl, '_blank', 'noopener,noreferrer');

    } catch (err) {
      console.error('Error procesando el registro en Supabase:', err);
      setErrorMsg('Ocurrió una interrupción de red al registrar en BD, pero puedes continuar abriendo WhatsApp.');
      
      const waUrl = generateWhatsAppMessage(generatedId);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setLeadSubmitted(false);
    setRadicadoId(null);
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-tech">
      
      <div className="w-full max-w-2xl rounded-2xl border border-[#4b7da5]/60 bg-[#1b3852] p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-[#142332] text-slate-400 hover:text-white border border-[#2b5b84] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-[#ffd343] text-[#111d28] shadow-md font-bold">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Cotizador de Proyectos TI</h3>
            <span className="text-xs font-mono-tech text-[#ffd343] font-bold">CORPLEX SOLUTIONS S.A.S. • Respuesta Inmediata</span>
          </div>
        </div>

        {/* Confirmación de Guardado Exitoso en Supabase */}
        {leadSubmitted ? (
          <div className="space-y-6 py-4">
            <div className="p-6 rounded-2xl bg-[#0d1722] border border-emerald-500/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">¡Cotización Registrada en Supabase!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Tu solicitud fue guardada con éxito en nuestro CRM. Se ha abierto una conversación en WhatsApp para atención personalizada de inmediato.
              </p>

              {radicadoId && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] font-mono-tech text-xs font-bold text-[#ffd343]">
                  <span>CÓDIGO DE RADICADO:</span>
                  <span>{radicadoId}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={generateWhatsAppMessage(radicadoId || undefined)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Re-abrir Chat en WhatsApp ({LEGAL_INFO.phone1Display})</span>
              </a>

              <button
                type="button"
                onClick={handleResetForm}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#142332] hover:bg-[#2b5b84] text-slate-300 text-xs font-bold border border-[#2b5b84] cursor-pointer"
              >
                Nueva Cotización
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Error Feedback */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Step 1: Project Type */}
            <div>
              <label className="block text-xs font-mono-tech text-slate-300 font-bold mb-2 uppercase">
                1. SELECCIONE EL TIPO DE PROYECTO
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#142332] border border-[#2b5b84] text-slate-100 text-xs focus:outline-none focus:border-[#ffd343] font-sans"
              >
                <option value="Desarrollo de Software & Web Apps">Desarrollo de Software & Web Apps</option>
                <option value="Corplex AI Automation - Diagnóstico & Piloto">Corplex AI Automation - Diagnóstico & Piloto</option>
                <option value="Arquitectura Cloud AWS & DevOps">Arquitectura Cloud AWS & DevOps</option>
                <option value="Simuladores Educativos UNAD">Simuladores Educativos UNAD</option>
                <option value="Automatización e Inteligencia Artificial">Automatización e Inteligencia Artificial</option>
                <option value="Infraestructura & Soporte Técnico TI">Infraestructura & Soporte Técnico TI</option>
              </select>
            </div>

            {/* Step 2: Scope Level */}
            <div>
              <label className="block text-xs font-mono-tech text-slate-300 font-bold mb-2 uppercase">
                2. ALCANCE Y ESCALA DEL PROYECTO
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Básico / MVP', 'Intermedio (Escalable)', 'Enterprise / Alta Carga'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setScope(level)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      scope === level
                        ? 'bg-[#3775a9] border-[#ffd343] text-[#ffd343] shadow-md'
                        : 'bg-[#142332] border-[#2b5b84] text-slate-300 hover:bg-[#2b5b84]'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Addon Modules */}
            <div>
              <label className="block text-xs font-mono-tech text-slate-300 font-bold mb-2 uppercase">
                3. COMPONENTES Y MÓDULOS REQUERIDOS
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Despliegue Cloud AWS',
                  'API REST & Base de Datos',
                  'Autenticación & Permisos',
                  'Simulador Gráfico Interactivo',
                  'Soporte & SLA Continuo 24/7',
                  'Integración LTI / LMS'
                ].map((addon) => {
                  const isSelected = selectedAddons.includes(addon);
                  return (
                    <button
                      key={addon}
                      type="button"
                      onClick={() => toggleAddon(addon)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#3775a9] border-[#ffd343] text-[#ffd343]'
                          : 'bg-[#142332] border-[#2b5b84] text-slate-300 hover:bg-[#2b5b84]'
                      }`}
                    >
                      <span>{addon}</span>
                      <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-[#ffd343]' : 'text-slate-500'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Estimador Visual de Valor */}
            <div className="p-4 rounded-xl bg-[#142332] border border-[#2b5b84] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono-tech text-slate-400 block font-bold">ESTIMACIÓN DE REFERENCIA PRELIMINAR</span>
                <span className="text-xs text-slate-300">Sujeto a diagnóstico técnico formal</span>
              </div>
              <div className="text-right">
                <span className="text-lg sm:text-xl font-bold font-mono-tech text-[#ffd343]">
                  ${calculateEstimatedPrice().toLocaleString('es-CO')} COP
                </span>
              </div>
            </div>

            {/* Client Details Form */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-mono-tech text-slate-300 font-bold uppercase">
                4. DATOS DE CONTACTO (REQUERIDOS PARA REGISTRO)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Su Nombre Completo *"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-slate-100 focus:outline-none focus:border-[#ffd343]"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Institución o Empresa *"
                    value={clientInfo.org}
                    onChange={(e) => setClientInfo({ ...clientInfo, org: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-slate-100 focus:outline-none focus:border-[#ffd343]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="tel"
                  placeholder="Teléfono / WhatsApp (Opcional)"
                  value={clientInfo.phone}
                  onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-slate-100 focus:outline-none focus:border-[#ffd343]"
                />
                <input
                  type="email"
                  placeholder="Correo Electrónico (Opcional)"
                  value={clientInfo.email}
                  onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-slate-100 focus:outline-none focus:border-[#ffd343]"
                />
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-4 border-t border-[#2b5b84] flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Guardando en Supabase y abriendo WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Guardar Lead & Enviar a WhatsApp ({LEGAL_INFO.phone1Display})</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#142332] hover:bg-[#2b5b84] text-slate-300 text-xs font-bold border border-[#2b5b84] cursor-pointer"
              >
                Cancelar
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
};

