import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Calculator, Send } from 'lucide-react';
import { LEGAL_INFO } from '../data/corporateData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, preSelectedService }) => {
  const [projectType, setProjectType] = useState<string>('Desarrollo Web & Apps');
  const [scope, setScope] = useState<string>('Intermedio (Escalable)');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['Despliegue Cloud AWS', 'API REST & Base de Datos']);
  const [clientInfo, setClientInfo] = useState({ name: '', email: '', org: '' });

  useEffect(() => {
    if (preSelectedService) {
      setProjectType(preSelectedService);
    }
  }, [preSelectedService]);

  if (!isOpen) return null;

  const toggleAddon = (addon: string) => {
    setSelectedAddons(prev =>
      prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon]
    );
  };

  const generateWhatsAppMessage = () => {
    const text = `*SOLICITUD DE COTIZACIÓN - CORPLEX SOLUTIONS S.A.S.*
*Proyecto:* ${projectType}
*Nivel / Alcance:* ${scope}
*Complementos Seleccionados:* ${selectedAddons.join(', ') || 'Ninguno'}
*Contacto:* ${clientInfo.name || 'Sin especificar'} (${clientInfo.org || 'Institución/Empresa'})
*Correo:* ${clientInfo.email || 'Sin especificar'}`;

    return `https://wa.me/${LEGAL_INFO.whatsapp1}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 font-tech">
      
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto text-slate-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-cyan-600 text-white shadow-sm">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Cotizador de Proyectos TI</h3>
            <span className="text-xs font-mono-tech text-cyan-700 font-bold">CORPLEX SOLUTIONS S.A.S. • Respuesta Inmediata</span>
          </div>
        </div>

        <div className="space-y-6">
          
          {/* Step 1: Project Type */}
          <div>
            <label className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">1. SELECCIONE EL TIPO DE PROYECTO</label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-cyan-500 font-sans"
            >
              <option value="Desarrollo de Software & Web Apps">Desarrollo de Software & Web Apps</option>
              <option value="Arquitectura Cloud AWS & DevOps">Arquitectura Cloud AWS & DevOps</option>
              <option value="Simuladores Educativos UNAD">Simuladores Educativos UNAD</option>
              <option value="Automatización e Inteligencia Artificial">Automatización e Inteligencia Artificial</option>
              <option value="Infraestructura & Soporte Técnico TI">Infraestructura & Soporte Técnico TI</option>
            </select>
          </div>

          {/* Step 2: Scope Level */}
          <div>
            <label className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">2. ALCANCE Y ESCALA DEL PROYECTO</label>
            <div className="grid grid-cols-3 gap-3">
              {['Básico / MVP', 'Intermedio (Escalable)', 'Enterprise / Alta Carga'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setScope(level)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    scope === level
                      ? 'bg-cyan-50 border-cyan-600 text-cyan-700 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Addon Modules */}
          <div>
            <label className="block text-xs font-mono-tech text-slate-700 font-bold mb-2">3. COMPONENTES Y MÓDULOS REQUERIDOS</label>
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
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{addon}</span>
                    <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-emerald-600' : 'text-slate-300'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Client Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <input
              type="text"
              placeholder="Su Nombre Completo"
              value={clientInfo.name}
              onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
              className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-cyan-500"
            />
            <input
              type="text"
              placeholder="Institución o Empresa"
              value={clientInfo.org}
              onChange={(e) => setClientInfo({ ...clientInfo, org: e.target.value })}
              className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={generateWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Cotización a WhatsApp ({LEGAL_INFO.phone1Display})</span>
            </a>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300 cursor-pointer"
            >
              Cancelar
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
