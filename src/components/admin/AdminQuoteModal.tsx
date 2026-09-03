import React, { useState } from 'react';
import type { QuoteEntity, QuoteItemEntity, AutomationLeadEntity } from '../../types/lead';
import { createQuote, updateQuote } from '../../services/quoteService';
import {
  X,
  Plus,
  Trash2,
  Save,
  Send,
  Building2,
  DollarSign,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

interface AdminQuoteModalProps {
  quote?: QuoteEntity | null;
  lead?: AutomationLeadEntity | null;
  onClose: () => void;
  onSuccess: (savedQuote: QuoteEntity) => void;
}

export const AdminQuoteModal: React.FC<AdminQuoteModalProps> = ({
  quote,
  lead,
  onClose,
  onSuccess
}) => {
  const isEditing = Boolean(quote?.id);

  // Client Data State
  const [clientName, setClientName] = useState(
    quote?.client_name || lead?.full_name || ''
  );
  const [clientCompany, setClientCompany] = useState(
    quote?.client_company || lead?.company_name || ''
  );
  const [clientEmail, setClientEmail] = useState(
    quote?.client_email || lead?.email || ''
  );
  const [clientPhone, setClientPhone] = useState(
    quote?.client_phone || lead?.phone || lead?.contact_detail || ''
  );
  const [clientSector, setClientSector] = useState(
    quote?.client_sector || lead?.sector || 'General'
  );

  // Quote Header Configuration State
  const [taxRate, setTaxRate] = useState<number>(
    quote?.tax_rate !== undefined ? Number(quote.tax_rate) : 19.0
  );

  const defaultValidDate = new Date();
  defaultValidDate.setDate(defaultValidDate.getDate() + 30);
  const [validUntil, setValidUntil] = useState<string>(
    quote?.valid_until || defaultValidDate.toISOString().split('T')[0]
  );

  const [paymentTerms, setPaymentTerms] = useState<string>(
    quote?.payment_terms ||
      '50% anticipado con la orden de compra, 50% al finalizar la entrega y pruebas de aceptación.'
  );

  const [notes, setNotes] = useState<string>(
    quote?.notes ||
      'Cotización emitida por CORPLEX SOLUTIONS S.A.S. Sujeta a confirmación de alcance y disponibilidad de servicios.'
  );

  // Dynamic Line Items State
  const [items, setItems] = useState<Omit<QuoteItemEntity, 'id' | 'quote_id'>[]>(
    quote?.items && quote.items.length > 0
      ? quote.items.map(i => ({
          concept: i.concept,
          description: i.description || '',
          quantity: Number(i.quantity) || 1,
          unit_price: Number(i.unit_price) || 0,
          discount_percent: Number(i.discount_percent) || 0,
          is_taxable: i.is_taxable !== false,
          item_subtotal: Number(i.item_subtotal) || 0
        }))
      : [
          {
            concept: lead?.selected_package ? `Implementación de ${lead.selected_package}` : 'Desarrollo de Solución de Automatización Corplex',
            description: lead?.bottleneck_description || 'Servicios profesionales de ingeniería de software, arquitectura cloud y automatización de procesos.',
            quantity: 1,
            unit_price: lead?.estimated_value ? Number(lead.estimated_value) : 4500000,
            discount_percent: 0,
            is_taxable: true,
            item_subtotal: lead?.estimated_value ? Number(lead.estimated_value) : 4500000
          }
        ]
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Item management handlers
  const handleAddItem = () => {
    setItems(prev => [
      ...prev,
      {
        concept: 'Nuevo Servicio / Módulo',
        description: '',
        quantity: 1,
        unit_price: 1000000,
        discount_percent: 0,
        is_taxable: true,
        item_subtotal: 1000000
      }
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) return;
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    field: keyof Omit<QuoteItemEntity, 'id' | 'quote_id'>,
    val: unknown
  ) => {
    setItems(prev => {
      const updated = [...prev];
      const target = { ...updated[index], [field]: val };

      // Recalcular subtotal del ítem
      const qty = Number(target.quantity) || 0;
      const price = Number(target.unit_price) || 0;
      const disc = Number(target.discount_percent) || 0;
      const rawSub = qty * price;
      const subAfterDisc = rawSub * (1 - disc / 100);

      target.item_subtotal = Math.max(0, subAfterDisc);
      updated[index] = target;
      return updated;
    });
  };

  // Calculations totals
  let grossSubtotal = 0;
  let discountTotal = 0;
  let taxableSubtotal = 0;

  items.forEach(i => {
    const qty = Number(i.quantity) || 0;
    const price = Number(i.unit_price) || 0;
    const disc = Number(i.discount_percent) || 0;
    const raw = qty * price;
    const discAmount = raw * (disc / 100);
    const itemSub = raw - discAmount;

    grossSubtotal += raw;
    discountTotal += discAmount;

    if (i.is_taxable) {
      taxableSubtotal += itemSub;
    }
  });

  const netSubtotal = grossSubtotal - discountTotal;
  const taxAmount = (taxableSubtotal * (Number(taxRate) || 0)) / 100;
  const grandTotal = netSubtotal + taxAmount;

  // Form submission handler
  const handleSubmit = async (targetStatus: 'draft' | 'sent') => {
    if (!clientName.trim()) {
      setError('Por favor ingresa el nombre del cliente.');
      return;
    }

    if (items.length === 0 || items.some(i => !i.concept.trim())) {
      setError('Todos los conceptos de la cotización deben tener un nombre válido.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const headerPayload: Omit<QuoteEntity, 'id' | 'quote_number' | 'created_at' | 'updated_at'> = {
        automation_lead_id: lead?.id || quote?.automation_lead_id || null,
        version_number: quote?.version_number || 1,
        parent_quote_id: quote?.parent_quote_id || null,
        status: targetStatus,
        client_name: clientName,
        client_company: clientCompany,
        client_email: clientEmail,
        client_phone: clientPhone,
        client_sector: clientSector,
        tax_rate: Number(taxRate) || 0,
        subtotal: grossSubtotal,
        discount_total: discountTotal,
        taxable_subtotal: taxableSubtotal,
        tax_amount: taxAmount,
        total: grandTotal,
        valid_until: validUntil,
        payment_terms: paymentTerms,
        notes: notes
      };

      let resultQuote: QuoteEntity;

      if (isEditing && quote?.id) {
        resultQuote = await updateQuote(quote.id, headerPayload, items);
      } else {
        resultQuote = await createQuote(headerPayload, items);
      }

      onSuccess(resultQuote);
    } catch (err) {
      console.error('Error al guardar cotización:', err);
      const msg = err instanceof Error ? err.message : 'No se pudo guardar la cotización en Supabase.';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111d28]/80 backdrop-blur-md font-tech overflow-y-auto">
      <div className="bg-[#1b3852] border border-[#2b5b84] rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        
        {/* Header Modal */}
        <div className="p-5 border-b border-[#2b5b84] flex items-center justify-between bg-[#142332]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#ffd343] text-[#111d28] font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {isEditing ? `Editar Cotización ${quote?.quote_number || ''}` : 'Nueva Cotización Comercial'}
              </h2>
              <p className="text-xs text-slate-300">
                {lead ? `Vinculada al Lead: ${lead.full_name} (${lead.company_name || 'Sin empresa'})` : 'Propuesta corporativa de servicios Corplex'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1b3852] hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-[#2b5b84] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form Scrollable */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Section 1: Client Information */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono-tech text-[#ffd343] font-bold uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              1. Datos del Cliente & Empresa
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  placeholder="Ej: Ing. María Pérez"
                  className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Empresa / Institución</label>
                <input
                  type="text"
                  value={clientCompany}
                  onChange={e => setClientCompany(e.target.value)}
                  placeholder="Ej: Clínica Urabá S.A."
                  className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={e => setClientEmail(e.target.value)}
                  placeholder="cliente@empresa.com"
                  className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Teléfono / WhatsApp</label>
                <input
                  type="text"
                  value={clientPhone}
                  onChange={e => setClientPhone(e.target.value)}
                  placeholder="+57 300 000 0000"
                  className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Sector Económico</label>
                <select
                  value={clientSector}
                  onChange={e => setClientSector(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
                >
                  <option value="Salud y Clínicas">Salud y Clínicas</option>
                  <option value="Educación y Universidades">Educación y Universidades</option>
                  <option value="Agroindustria & Operaciones">Agroindustria & Operaciones</option>
                  <option value="Comercio & Servicios">Comercio & Servicios</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Válida Hasta *</label>
                <input
                  type="date"
                  value={validUntil}
                  onChange={e => setValidUntil(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Items & Services Builder Table */}
          <div className="space-y-3 pt-3 border-t border-[#2b5b84]/60">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono-tech text-[#ffd343] font-bold uppercase tracking-wider flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                2. Conceptos, Servicios & Tarifas
              </h3>
              <button
                type="button"
                onClick={handleAddItem}
                className="px-3 py-1.5 rounded-xl bg-[#142332] hover:bg-[#2b5b84] text-[#ffd343] font-bold text-xs border border-[#2b5b84] inline-flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Concepto</span>
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#142332] border border-[#2b5b84] space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono-tech text-[#ffd343] font-bold">
                      Ítem #{idx + 1}
                    </span>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs transition-colors cursor-pointer"
                        title="Eliminar este concepto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                    <div className="md:col-span-4">
                      <label className="text-[10px] text-slate-400 block mb-1">Nombre del Concepto *</label>
                      <input
                        type="text"
                        value={item.concept}
                        onChange={e => handleItemChange(idx, 'concept', e.target.value)}
                        placeholder="Ej: Desarrollo de Módulo IA de Selección"
                        className="w-full px-3 py-1.5 rounded-lg bg-[#1b3852] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label className="text-[10px] text-slate-400 block mb-1">Descripción del Alcance</label>
                      <input
                        type="text"
                        value={item.description || ''}
                        onChange={e => handleItemChange(idx, 'description', e.target.value)}
                        placeholder="Alcance, entregables y especificaciones técnicas..."
                        className="w-full px-3 py-1.5 rounded-lg bg-[#1b3852] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="text-[10px] text-slate-400 block mb-1">Precio Unitario ($ COP) *</label>
                      <input
                        type="number"
                        min="0"
                        step="50000"
                        value={item.unit_price}
                        onChange={e => handleItemChange(idx, 'unit_price', Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#1b3852] border border-[#2b5b84] text-xs text-[#ffd343] font-bold font-mono-tech focus:outline-none focus:border-[#ffd343]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-12 gap-3 items-center pt-2 border-t border-[#2b5b84]/40">
                    <div className="md:col-span-3">
                      <label className="text-[10px] text-slate-400 block mb-1">Cantidad</label>
                      <input
                        type="number"
                        min="0.1"
                        step="0.5"
                        value={item.quantity}
                        onChange={e => handleItemChange(idx, 'quantity', Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#1b3852] border border-[#2b5b84] text-xs text-white font-mono-tech focus:outline-none focus:border-[#ffd343]"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="text-[10px] text-slate-400 block mb-1">Descuento (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.discount_percent}
                        onChange={e => handleItemChange(idx, 'discount_percent', Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#1b3852] border border-[#2b5b84] text-xs text-white font-mono-tech focus:outline-none focus:border-[#ffd343]"
                      />
                    </div>

                    <div className="md:col-span-3 flex items-center gap-2 pt-4">
                      <input
                        type="checkbox"
                        id={`taxable-${idx}`}
                        checked={item.is_taxable}
                        onChange={e => handleItemChange(idx, 'is_taxable', e.target.checked)}
                        className="w-4 h-4 rounded bg-[#1b3852] border-[#2b5b84] text-[#ffd343] focus:ring-0 cursor-pointer"
                      />
                      <label htmlFor={`taxable-${idx}`} className="text-xs text-slate-300 cursor-pointer select-none">
                        Aplica IVA ({taxRate}%)
                      </label>
                    </div>

                    <div className="md:col-span-3 text-right">
                      <span className="text-[10px] text-slate-400 block">Subtotal Ítem:</span>
                      <span className="font-mono-tech font-bold text-white text-sm">
                        ${item.item_subtotal.toLocaleString('es-CO')}
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Taxes & Totals Calculation Summary Box */}
          <div className="p-5 rounded-2xl bg-[#142332] border border-[#2b5b84] space-y-3 font-mono-tech">
            <div className="flex items-center justify-between pb-2 border-b border-[#2b5b84]">
              <span className="text-xs font-bold text-slate-300">Tasa de Impuesto Configurable:</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">IVA Colombia:</span>
                <select
                  value={taxRate}
                  onChange={e => setTaxRate(Number(e.target.value))}
                  className="px-3 py-1.5 rounded-xl bg-[#1b3852] border border-[#2b5b84] text-xs text-[#ffd343] font-bold focus:outline-none"
                >
                  <option value={19}>19.00% (Régimen General)</option>
                  <option value={0}>0.00% (Exento / Exportación)</option>
                  <option value={5}>5.00% (Régimen Especial)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Subtotal Bruto:</span>
                <span className="font-bold text-white text-sm">${grossSubtotal.toLocaleString('es-CO')}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Descuentos Aplicados:</span>
                <span className="font-bold text-rose-400 text-sm">-${discountTotal.toLocaleString('es-CO')}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Impuesto IVA ({taxRate}%):</span>
                <span className="font-bold text-purple-300 text-sm">
                  {taxAmount > 0 ? `$${taxAmount.toLocaleString('es-CO')}` : 'Exento'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[#ffd343] font-extrabold block">TOTAL COTIZADO (COP):</span>
                <span className="font-extrabold text-[#ffd343] text-lg">${grandTotal.toLocaleString('es-CO')}</span>
              </div>
            </div>
          </div>

          {/* Section 4: Terms & Conditions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#2b5b84]/60">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Condiciones de Pago & Banco</label>
              <textarea
                rows={3}
                value={paymentTerms}
                onChange={e => setPaymentTerms(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Notas Comerciales & Alcance</label>
              <textarea
                rows={3}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
              />
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 border-t border-[#2b5b84] bg-[#142332] flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#1b3852] hover:bg-[#2b5b84] text-slate-300 font-bold text-xs border border-[#2b5b84] cursor-pointer"
          >
            Cancelar
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSubmit('draft')}
              className="px-5 py-2.5 rounded-xl bg-[#1b3852] hover:bg-[#2b5b84] text-white font-bold text-xs border border-[#2b5b84] inline-flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-slate-300" />}
              <span>Guardar Borrador</span>
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={() => handleSubmit('sent')}
              className="px-6 py-2.5 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-extrabold text-xs inline-flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>Guardar & Marcar como Enviada</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
