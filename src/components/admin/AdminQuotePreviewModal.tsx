import React from 'react';
import type { QuoteEntity } from '../../types/lead';
import { Logo } from '../Logo';
import {
  X,
  Printer,
  Building2,
  Phone,
  Mail,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface AdminQuotePreviewModalProps {
  quote: QuoteEntity;
  onClose: () => void;
}

export const AdminQuotePreviewModal: React.FC<AdminQuotePreviewModalProps> = ({
  quote,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  const taxRate = Number(quote.tax_rate) || 0;
  const items = quote.items || [];
  const hasTaxableItems = items.some(i => i.is_taxable);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#111d28]/85 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static print:block">
      
      {/* Container Box */}
      <div className="bg-[#1b3852] border border-[#2b5b84] rounded-3xl w-full max-w-4xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden my-auto print:border-none print:shadow-none print:max-h-none print:bg-white print:text-slate-900 print:rounded-none">
        
        {/* Screen Header Bar (Hidden on Print) */}
        <div className="p-4 border-b border-[#2b5b84] bg-[#142332] flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#ffd343] text-[#111d28] font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-tech">
                Propuesta Comercial PDF — {quote.quote_number} (v{quote.version_number})
              </h2>
              <p className="text-xs text-slate-300">
                Ficha corporativa oficial de CORPLEX SOLUTIONS S.A.S.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-extrabold text-xs inline-flex items-center gap-2 cursor-pointer shadow transition-all font-tech"
            >
              <Printer className="w-4 h-4" />
              <span>Descargar / Imprimir PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#1b3852] hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-[#2b5b84] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Proposal Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-white text-slate-900 font-sans print:p-0 print:overflow-visible">
          
          {/* Printable Header: Corplex Info & Document Metadata */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-slate-900 pb-6 gap-6">
            
            {/* Corplex Brand & Legal Identity */}
            <div className="space-y-2">
              <Logo size="md" showText={true} />
              <div className="text-xs text-slate-700 space-y-0.5 pt-2">
                <p className="font-extrabold text-slate-900 text-sm">CORPLEX SOLUTIONS S.A.S.</p>
                <p className="font-mono text-slate-800">NIT: 902061373-5</p>
                <p>Turbo, Urabá, Antioquia, Colombia</p>
                <p className="flex items-center gap-1.5 pt-1">
                  <Mail className="w-3.5 h-3.5 text-slate-600" />
                  <span>contacto@corplex.co | triangelturbo@gmail.com</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                  <span>+57 310 892 4825</span>
                </p>
              </div>
            </div>

            {/* Document Metadata Box */}
            <div className="bg-slate-50 border border-slate-300 rounded-2xl p-4 min-w-[260px] text-right space-y-1 font-mono text-xs">
              <span className="inline-block px-3 py-1 rounded bg-[#111d28] text-[#ffd343] font-bold text-sm mb-2">
                {quote.quote_number} (v{quote.version_number})
              </span>
              <p className="text-slate-600">
                Fecha de Emisión: <strong className="text-slate-900">{new Date(quote.created_at).toLocaleDateString('es-CO')}</strong>
              </p>
              <p className="text-slate-600">
                Válida Hasta: <strong className="text-slate-900">{new Date(quote.valid_until).toLocaleDateString('es-CO')}</strong>
              </p>
              <p className="text-slate-600">
                Estado: <strong className="text-slate-900 uppercase font-bold">{quote.status}</strong>
              </p>
            </div>
          </div>

          {/* Client Information Section */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block">
                PROPUESTA EMITIDA PARA:
              </span>
              <p className="font-bold text-sm text-slate-900">{quote.client_name}</p>
              {quote.client_company && (
                <p className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  {quote.client_company}
                </p>
              )}
              {quote.client_sector && (
                <p className="text-slate-600">Sector: {quote.client_sector}</p>
              )}
            </div>

            <div className="space-y-1 md:text-right">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block">
                DATOS DE CONTACTO:
              </span>
              {quote.client_email && <p className="text-slate-700">{quote.client_email}</p>}
              {quote.client_phone && <p className="text-slate-700">{quote.client_phone}</p>}
            </div>
          </div>

          {/* Services & Concept Items Table */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-300 pb-2">
              RESUMEN DE CONCEPTOS & ALCANCE TÉCNICO
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 uppercase font-mono text-[10px] border-b border-slate-300">
                    <th className="py-3 px-3 font-bold">#</th>
                    <th className="py-3 px-3 font-bold">Concepto / Servicio</th>
                    <th className="py-3 px-3 font-bold text-center">Cant.</th>
                    <th className="py-3 px-3 font-bold text-right">Precio Unitario</th>
                    <th className="py-3 px-3 font-bold text-center">Dto.</th>
                    <th className="py-3 px-3 font-bold text-center">IVA</th>
                    <th className="py-3 px-3 font-bold text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {items.map((item, idx) => (
                    <tr key={idx} className="align-top">
                      <td className="py-3 px-3 font-mono font-bold text-slate-500">{idx + 1}</td>
                      <td className="py-3 px-3 space-y-0.5">
                        <p className="font-bold text-slate-900">{item.concept}</p>
                        {item.description && (
                          <p className="text-slate-600 text-[11px] leading-relaxed italic">{item.description}</p>
                        )}
                      </td>
                      <td className="py-3 px-3 font-mono text-center font-bold text-slate-800">{item.quantity}</td>
                      <td className="py-3 px-3 font-mono text-right text-slate-800">
                        ${Number(item.unit_price).toLocaleString('es-CO')}
                      </td>
                      <td className="py-3 px-3 font-mono text-center text-slate-600">
                        {item.discount_percent > 0 ? `${item.discount_percent}%` : '-'}
                      </td>
                      <td className="py-3 px-3 font-mono text-center text-[10px]">
                        {item.is_taxable && taxRate > 0 ? (
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-300">
                            {taxRate}%
                          </span>
                        ) : (
                          <span className="text-emerald-700 font-bold">Exento</span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-mono text-right font-bold text-slate-900">
                        ${Number(item.item_subtotal).toLocaleString('es-CO')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals & Tax Calculation Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-t border-slate-300 pt-4">
            
            {/* Commercial Terms */}
            <div className="space-y-3 flex-1 text-xs text-slate-700">
              {quote.payment_terms && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block text-[11px] uppercase mb-1">CONDICIONES DE PAGO:</span>
                  <p className="leading-relaxed">{quote.payment_terms}</p>
                </div>
              )}

              {quote.notes && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block text-[11px] uppercase mb-1">OBSERVACIONES & ALCANCE:</span>
                  <p className="leading-relaxed">{quote.notes}</p>
                </div>
              )}
            </div>

            {/* Calculations Box */}
            <div className="w-full sm:w-72 bg-slate-900 text-white rounded-2xl p-4 space-y-2 font-mono text-xs shadow-md shrink-0">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal Bruto:</span>
                <span>${Number(quote.subtotal).toLocaleString('es-CO')}</span>
              </div>

              {Number(quote.discount_total) > 0 && (
                <div className="flex justify-between text-rose-300">
                  <span>Descuentos (-):</span>
                  <span>-${Number(quote.discount_total).toLocaleString('es-CO')}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-300">
                <span>Subtotal Imponible:</span>
                <span>${Number(quote.taxable_subtotal).toLocaleString('es-CO')}</span>
              </div>

              <div className="flex justify-between text-purple-300 pb-2 border-b border-slate-700">
                <span>IVA ({taxRate}%):</span>
                <span>{hasTaxableItems && taxRate > 0 ? `$${Number(quote.tax_amount).toLocaleString('es-CO')}` : 'Exento de IVA'}</span>
              </div>

              <div className="flex justify-between items-center text-sm font-bold pt-1 text-[#ffd343]">
                <span>TOTAL PROCESADO:</span>
                <span className="text-base">${Number(quote.total).toLocaleString('es-CO')} COP</span>
              </div>
            </div>

          </div>

          {/* Mandatory Legal & Disclaimers Footer */}
          <div className="border-t-2 border-slate-900 pt-6 space-y-4 text-[11px] text-slate-600 leading-relaxed">
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
              <span>
                <strong>Nota Comercial Controlada:</strong> Esta cotización está sujeta a confirmación de alcance, disponibilidad y aceptación de las condiciones comerciales indicadas. Los precios expresados en pesos colombianos (COP) se congelan de forma inmutable tras la emisión oficial del documento.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-end pt-6 gap-6">
              <div className="space-y-1">
                <p className="font-bold text-slate-900">CORPLEX SOLUTIONS S.A.S.</p>
                <p>Ingeniería de Software & Soluciones Cloud</p>
                <p className="text-slate-500 font-mono text-[10px]">Documento generado electrónicamente por la plataforma CRM Corplex.</p>
              </div>

              <div className="text-center w-52 border-t border-slate-900 pt-2">
                <p className="font-bold text-slate-900 text-xs">Firma Autorizada Corplex</p>
                <p className="text-slate-500 text-[10px]">Departamento Comercial & Proyectos</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
