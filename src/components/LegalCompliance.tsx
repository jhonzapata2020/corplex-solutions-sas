import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Copy, Check, Building2, Scale, ExternalLink } from 'lucide-react';
import { LEGAL_INFO } from '../data/corporateData';

export const LegalCompliance: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLegalSummary = () => {
    const summary = `FICHA DE TRANSPARENCIA CORPORATIVA - CORPLEX SOLUTIONS S.A.S.
Razón Social: ${LEGAL_INFO.companyName}
NIT: ${LEGAL_INFO.nit}
Matrícula Mercantil: ${LEGAL_INFO.mercantileRegistration} (${LEGAL_INFO.chamberOfCommerce})
Representante Legal / Dir. Tecnológico: ${LEGAL_INFO.legalRep}
Sede Principal: ${LEGAL_INFO.address}, ${LEGAL_INFO.city}, ${LEGAL_INFO.department}, ${LEGAL_INFO.country}
Clasificación CIIU: ${LEGAL_INFO.ciiuCodes.map(c => c.code).join(', ')}
Marco Contable: ${LEGAL_INFO.niifCategory}
Correo Notificaciones Judiciales/DIAN: ${LEGAL_INFO.institutionalEmail}
Teléfonos: ${LEGAL_INFO.phone1Display} | ${LEGAL_INFO.phone2Display}`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="cumplimiento" className="py-24 relative bg-gray-950 border-t border-gray-800/80">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-400 stroke-[1.75]" />
            <span>CREDENCIAL LEGAL & TRANSPARENCIA INSTITUCIONAL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Ficha Técnica Corporativa Verificada
          </h2>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Consulte y copie la información legal verificada para auditorías universitarias (UNAD), licitaciones públicas y contratación empresarial.
          </p>
        </div>

        {/* Enterprise Credential Datasheet Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Credential Card (8 Cols) */}
          <div className="lg:col-span-8 glass-card-pro p-6 sm:p-10 rounded-3xl border border-gray-800 flex flex-col justify-between">
            
            <div>
              {/* Top Credential Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Building2 className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{LEGAL_INFO.companyName}</h3>
                    <span className="text-xs font-mono text-gray-400">NIT: {LEGAL_INFO.nit}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[1.75]" />
                    <span>Registro Mercantil Activo</span>
                  </span>
                </div>
              </div>

              {/* Legal Information Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                
                <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800">
                  <span className="text-[11px] font-mono text-gray-400 block mb-1">MATRÍCULA MERCANTIL</span>
                  <div className="text-base font-bold text-white font-mono">{LEGAL_INFO.mercantileRegistration}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{LEGAL_INFO.chamberOfCommerce}</div>
                </div>

                <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800">
                  <span className="text-[11px] font-mono text-gray-400 block mb-1">REPRESENTACIÓN LEGAL & DIRECCIÓN TI</span>
                  <div className="text-base font-bold text-white">{LEGAL_INFO.legalRep}</div>
                  <div className="text-xs text-gray-400 mt-0.5">Director Tecnológico</div>
                </div>

                <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800">
                  <span className="text-[11px] font-mono text-gray-400 block mb-1">MARCO CONTABLE NIIF</span>
                  <div className="text-sm font-bold text-sky-400 font-mono">{LEGAL_INFO.niifCategory}</div>
                  <div className="text-xs text-gray-400 mt-0.5">Contabilidad Simplificada Vigente</div>
                </div>

                <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800">
                  <span className="text-[11px] font-mono text-gray-400 block mb-1">SEDE PRINCIPAL & NOTIFICACIONES</span>
                  <div className="text-xs font-bold text-white leading-tight">{LEGAL_INFO.address}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{LEGAL_INFO.city}, {LEGAL_INFO.department}, Colombia</div>
                </div>

              </div>

              {/* CIIU Breakdown */}
              <div className="mb-8">
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-4">
                  CLASIFICACIÓN INDUSTRIAL UNIFORME (CIIU AUTORIZADOS DIAN)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {LEGAL_INFO.ciiuCodes.map((ciiu) => (
                    <div key={ciiu.code} className="p-3 rounded-xl bg-gray-950 border border-gray-800 flex items-start gap-2.5">
                      <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 font-mono font-bold text-xs border border-sky-500/20 shrink-0">
                        {ciiu.code}
                      </span>
                      <span className="text-xs text-gray-300 leading-snug">{ciiu.description}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={handleCopyLegalSummary}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-sky-300 hover:text-white border border-gray-700 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400 stroke-[1.75]" /> : <Copy className="w-4 h-4 text-sky-400 stroke-[1.75]" />}
                <span>{copied ? '¡Ficha Copiada al Portapapeles!' : 'Copiar Ficha Legal para Licitación / Contratación'}</span>
              </button>

              <span className="text-[11px] font-mono text-gray-400 text-center">
                Notificación Electrónica DIAN: <strong className="text-gray-200">{LEGAL_INFO.institutionalEmail}</strong>
              </span>
            </div>

          </div>

          {/* Institutional Backing Side Card (4 Cols) */}
          <div className="lg:col-span-4 glass-card-pro p-6 sm:p-8 rounded-3xl border border-gray-800 flex flex-col justify-between">
            <div>
              <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 w-fit mb-6">
                <Scale className="w-6 h-6 stroke-[1.75]" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                Respaldo Institucional para Contratación
              </h3>

              <p className="text-gray-300 text-xs leading-relaxed mb-6">
                CORPLEX SOLUTIONS S.A.S. opera bajo el marco normativo colombiano para convenios de I+D+i, desarrollo de plataformas de software y soporte de infraestructura TI.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2.5 text-xs text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 stroke-[1.75]" />
                  <span>Matrícula No. 128676 en la CCU</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 stroke-[1.75]" />
                  <span>Cumplimiento tributario DIAN al día</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 stroke-[1.75]" />
                  <span>Facturación y notificaciones electrónicas</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800 text-center font-mono">
              <span className="text-xs text-gray-400 block mb-1">Sede Principal Urabá</span>
              <span className="text-xs text-white font-bold block">{LEGAL_INFO.address}</span>
              <span className="text-[10px] text-gray-400 block mt-0.5">Turbo, Antioquia - Colombia</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
