import React, { useEffect } from 'react';
import { X, ShieldCheck, Lock, Mail, FileText } from 'lucide-react';
import { LEGAL_INFO } from '../data/corporateData';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  // Manejo de tecla ESC para cerrar accesibilidad
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-tech"
    >
      <div className="w-full max-w-2xl rounded-2xl border border-[#4b7da5]/60 bg-[#1b3852] p-6 sm:p-8 relative shadow-2xl max-h-[85vh] overflow-y-auto text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal de política de privacidad"
          className="absolute top-6 right-6 p-2 rounded-xl bg-[#142332] text-slate-400 hover:text-white border border-[#2b5b84] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 border-b border-[#2b5b84] pb-4">
          <div className="p-3 rounded-2xl bg-[#ffd343] text-[#111d28] shadow-md font-bold">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 id="privacy-modal-title" className="text-xl font-bold text-white">
              Política Informativa de Tratamiento de Datos
            </h2>
            <span className="text-xs font-mono-tech text-[#ffd343] font-bold">
              {LEGAL_INFO.companyName} • NIT {LEGAL_INFO.nit}
            </span>
          </div>
        </div>

        {/* Informational Disclaimer Alert */}
        <div className="p-3.5 rounded-xl bg-[#142332] border border-[#ffd343]/40 text-xs text-slate-300 mb-5 leading-relaxed">
          <div className="flex items-center gap-2 text-[#ffd343] font-mono-tech font-bold mb-1">
            <FileText className="w-4 h-4" />
            <span>Marco Informativo de Referencia</span>
          </div>
          <p>
            Esta política se presenta como un marco informativo de referencia general conforme a los principios de la Ley 1581 de 2012 de Colombia sobre Habeas Data. No constituye una certificación o garantía legal absoluta y está sujeta a revisión legal formal.
          </p>
        </div>

        <div className="space-y-4 text-xs text-slate-200 leading-relaxed font-sans">
          
          <section>
            <h3 className="text-sm font-bold text-[#ffd343] mb-1 font-mono-tech">
              1. Identificación del Responsable del Tratamiento
            </h3>
            <p>
              El responsable del tratamiento de los datos personales recolectados a través de este portal web es <strong>{LEGAL_INFO.companyName}</strong>, sociedad identificada con NIT <strong>{LEGAL_INFO.nit}</strong>, con domicilio en {LEGAL_INFO.address}, {LEGAL_INFO.city}, Colombia, y correo electrónico institucional: <a href={`mailto:${LEGAL_INFO.institutionalEmail}`} className="text-[#ffd343] underline">{LEGAL_INFO.institutionalEmail}</a>.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold text-[#ffd343] mb-1 font-mono-tech">
              2. Finalidad de la Recolección de Datos
            </h3>
            <p>
              Los datos personales solicitados en el formulario de captación de automatización (nombre, empresa, datos de contacto, sector y descripción del proceso) se utilizan exclusivamente para:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-1 text-slate-300">
              <li>Responder a la solicitud de diagnóstico inicial y evaluación de factibilidad.</li>
              <li>Coordinar conversaciones comerciales o reuniones técnicas de diagnóstico.</li>
              <li>Generar propuestas orientativas de arquitectura y servicio.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-bold text-[#ffd343] mb-1 font-mono-tech">
              3. Protección y No Transferencia a Terceros
            </h3>
            <p>
              Sus datos no serán vendidos, alquilados ni compartidos con terceros comerciales sin su previa autorización explícita. {LEGAL_INFO.companyName} implementa prácticas de seguridad lógica y control de accesos para proteger la información contra pérdida, uso indebido o acceso no autorizado.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold text-[#ffd343] mb-1 font-mono-tech">
              4. Derechos del Titular de los Datos
            </h3>
            <p>
              De acuerdo con la legislación colombiana (Ley 1581 de 2012), como titular de los datos usted tiene derecho a conocer, actualizar, rectificar y solicitar la supresión de su información de nuestras bases de datos en cualquier momento enviando una comunicación escrita a <strong>{LEGAL_INFO.institutionalEmail}</strong>.
            </p>
          </section>

        </div>

        {/* Footer Actions */}
        <div className="pt-6 mt-6 border-t border-[#2b5b84] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-bold text-xs cursor-pointer shadow-md"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
