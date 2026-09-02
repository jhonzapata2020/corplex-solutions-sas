import React, { useState, useEffect } from 'react';
import type { AutomationLeadEntity, AdminLeadStatus, LeadActivityItem } from '../../types/lead';
import { LEAD_STATUS_LABELS } from '../../types/lead';
import { updateAdminLead, fetchLeadActivity } from '../../services/adminLeadService';
import {
  X,
  User,
  Building2,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  UserCheck,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  MessageSquare,
  Activity
} from 'lucide-react';
import { LEGAL_INFO } from '../../data/corporateData';

interface AdminLeadDetailDrawerProps {
  lead: AutomationLeadEntity;
  onClose: () => void;
  onUpdate: () => void;
}

export const AdminLeadDetailDrawer: React.FC<AdminLeadDetailDrawerProps> = ({
  lead,
  onClose,
  onUpdate
}) => {
  const [status, setStatus] = useState<AdminLeadStatus>((lead.status as AdminLeadStatus) || 'pending');
  const [assignedTo, setAssignedTo] = useState(lead.assigned_to || '');
  const [estimatedValue, setEstimatedValue] = useState<number | string>(lead.estimated_value || '');
  const [nextFollowUpAt, setNextFollowUpAt] = useState(lead.next_follow_up_at ? lead.next_follow_up_at.split('T')[0] : '');
  const [lastContactedAt, setLastContactedAt] = useState(lead.last_contacted_at ? lead.last_contacted_at.split('T')[0] : '');
  const [notes, setNotes] = useState(lead.notes || '');

  const [activities, setActivities] = useState<LeadActivityItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showStatusConfirm, setShowStatusConfirm] = useState<AdminLeadStatus | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeadActivity(lead.id).then(setActivities);
  }, [lead.id]);

  const handleSave = async (targetStatus?: AdminLeadStatus) => {
    const statusToSave = targetStatus || status;

    // Si intenta pasar a 'won' o 'lost' y no ha confirmado
    if ((statusToSave === 'won' || statusToSave === 'lost') && !targetStatus && statusToSave !== lead.status) {
      setShowStatusConfirm(statusToSave);
      return;
    }

    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      await updateAdminLead(
        lead.id,
        {
          status: statusToSave,
          assigned_to: assignedTo.trim() || null,
          estimated_value: estimatedValue ? Number(estimatedValue) : 0,
          next_follow_up_at: nextFollowUpAt ? new Date(nextFollowUpAt).toISOString() : null,
          last_contacted_at: lastContactedAt ? new Date(lastContactedAt).toISOString() : null,
          notes: notes.trim() || null
        },
        lead
      );

      setSaveSuccess(true);
      setShowStatusConfirm(null);
      onUpdate();

      // Recargar actividad
      const updatedActivity = await fetchLeadActivity(lead.id);
      setActivities(updatedActivity);

      setTimeout(() => setSaveSuccess(false), 3000);

    } catch (err) {
      console.error('Error al guardar cambios del lead:', err);
      setSaveError('Ocurrió un error al guardar los cambios en Supabase.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendWhatsApp = () => {
    const contact = lead.email || lead.phone || lead.contact_detail || '';
    const text = `Hola ${lead.full_name}, te saludamos de CORPLEX SOLUTIONS S.A.S. respecto a tu solicitud de diagnóstico para ${lead.company_name || 'tu empresa'}.`;
    window.open(`https://wa.me/${contact.replace(/[^0-9]/g, '') || LEGAL_INFO.whatsapp1}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const statusMeta = LEAD_STATUS_LABELS[status] || LEAD_STATUS_LABELS.pending;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 font-tech">
      
      {/* Side Drawer Body */}
      <div className="w-full max-w-2xl bg-[#1b3852] border-l border-[#2b5b84] h-full overflow-y-auto flex flex-col justify-between shadow-2xl text-slate-100 p-6 sm:p-8 space-y-6">
        
        <div className="space-y-6">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#2b5b84] pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded text-xs font-mono-tech font-bold border ${statusMeta.bgClass} ${statusMeta.textClass}`}>
                  {statusMeta.label}
                </span>
                <span className="text-xs font-mono-tech text-slate-400">
                  ID: {lead.id.slice(0, 8)}...
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {lead.full_name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-[#ffd343] font-bold">
                <Building2 className="w-3.5 h-3.5" />
                <span>{lead.company_name || 'Sin empresa'}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#142332] text-slate-400 hover:text-white border border-[#2b5b84] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Toast Status Alerts */}
          {saveSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>¡Cambios guardados con éxito en Supabase!</span>
            </div>
          )}

          {saveError && (
            <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{saveError}</span>
            </div>
          )}

          {/* Status Change Confirmation Dialog */}
          {showStatusConfirm && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-200 text-xs space-y-3">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <AlertTriangle className="w-4 h-4" />
                <span>Confirmar cambio de estado final</span>
              </div>
              <p>
                ¿Estás seguro de marcar esta oportunidad como <strong>{showStatusConfirm === 'won' ? 'GANADO (Cliente)' : 'PERDIDO'}</strong>?
              </p>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  onClick={() => setShowStatusConfirm(null)}
                  className="px-3 py-1.5 rounded-lg bg-[#142332] text-slate-300 text-xs cursor-pointer border border-[#2b5b84]"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleSave(showStatusConfirm)}
                  className="px-3 py-1.5 rounded-lg bg-amber-400 text-[#111d28] font-bold text-xs cursor-pointer shadow"
                >
                  Sí, confirmar estado
                </button>
              </div>
            </div>
          )}

          {/* SECTION 1: Contact Info */}
          <div className="p-4 rounded-2xl bg-[#142332] border border-[#2b5b84] space-y-3">
            <h3 className="text-xs font-mono-tech text-slate-400 uppercase font-bold tracking-wider">
              Información de Contacto & Requerimiento
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{lead.email || lead.contact_detail || 'Sin correo'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lead.phone || lead.contact_detail || 'Sin teléfono'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <User className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Sector: <strong>{lead.sector || 'General'}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Plan: <strong>{lead.selected_package || 'No especificado'}</strong></span>
              </div>
            </div>

            {/* Bottleneck / Need */}
            <div className="pt-2 border-t border-[#2b5b84]">
              <span className="text-[11px] font-mono-tech text-[#ffd343] font-bold block mb-1">
                Proceso a Mejorar / Necesidad Detectada:
              </span>
              <p className="text-xs text-slate-200 bg-[#1b3852] p-3 rounded-xl border border-[#2b5b84] leading-relaxed font-sans italic">
                "{lead.bottleneck_description || 'Sin descripción'}"
              </p>
            </div>
          </div>

          {/* SECTION 2: Editable Commercial Management Form */}
          <div className="p-5 rounded-2xl bg-[#142332] border border-[#ffd343]/30 space-y-4">
            <h3 className="text-xs font-mono-tech text-[#ffd343] uppercase font-bold tracking-wider">
              Gestión Comercial & Seguimiento
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Status Selector */}
              <div>
                <label className="block text-xs font-mono-tech text-slate-300 font-bold mb-1.5">
                  Estado Comercial *
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as AdminLeadStatus)}
                  className="w-full px-3 py-2 rounded-xl bg-[#1b3852] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
                >
                  <option value="pending">Pendiente (Sin responder)</option>
                  <option value="contacted">Contactado (Respuesta inicial)</option>
                  <option value="qualified">Calificado (Oportunidad real)</option>
                  <option value="proposal_sent">Cotización enviada</option>
                  <option value="won">Ganado (Proyecto Contratado 🎉)</option>
                  <option value="lost">Perdido / Descartado</option>
                </select>
              </div>

              {/* Assigned To */}
              <div>
                <label className="block text-xs font-mono-tech text-slate-300 font-bold mb-1.5">
                  Responsable Asignado
                </label>
                <div className="relative">
                  <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    placeholder="ej: @jhon.zapata"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#1b3852] border border-[#2b5b84] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd343]"
                  />
                </div>
              </div>

              {/* Estimated Value */}
              <div>
                <label className="block text-xs font-mono-tech text-slate-300 font-bold mb-1.5">
                  Valor Estimado ($ COP)
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-[#ffd343] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    value={estimatedValue}
                    onChange={(e) => setEstimatedValue(e.target.value)}
                    placeholder="0"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#1b3852] border border-[#2b5b84] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd343]"
                  />
                </div>
              </div>

              {/* Next Follow Up Date */}
              <div>
                <label className="block text-xs font-mono-tech text-slate-300 font-bold mb-1.5">
                  Próximo Seguimiento
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={nextFollowUpAt}
                    onChange={(e) => setNextFollowUpAt(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#1b3852] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
                  />
                </div>
              </div>

              {/* Last Contacted Date */}
              <div>
                <label className="block text-xs font-mono-tech text-slate-300 font-bold mb-1.5">
                  Última Respuesta / Contacto
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={lastContactedAt}
                    onChange={(e) => setLastContactedAt(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#1b3852] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
                  />
                </div>
              </div>

            </div>

            {/* Commercial Notes */}
            <div>
              <label className="block text-xs font-mono-tech text-slate-300 font-bold mb-1.5">
                Notas y Bitácora de Seguimiento
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Registra avances, compromisos o detalles acordados con el cliente..."
                className="w-full px-3 py-2 rounded-xl bg-[#1b3852] border border-[#2b5b84] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd343] leading-relaxed font-sans"
              />
            </div>

          </div>

          {/* SECTION 3: Activity Log Audit */}
          {activities.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#142332] border border-[#2b5b84] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-400 font-bold">
                <Activity className="w-4 h-4 text-sky-400" />
                <span>Historial de Auditoría / Cambios ({activities.length})</span>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {activities.map((act) => (
                  <div key={act.id} className="p-2.5 rounded-lg bg-[#1b3852] text-[11px] flex justify-between gap-2 border border-[#2b5b84]/50">
                    <span className="text-slate-200">{act.action}</span>
                    <span className="text-slate-400 font-mono-tech shrink-0">
                      {new Date(act.created_at).toLocaleDateString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Action CTAs */}
        <div className="pt-4 border-t border-[#2b5b84] flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => handleSave()}
            disabled={isSaving}
            className="w-full sm:flex-1 py-3 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Guardando en Supabase...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Guardar Cambios Comercial</span>
              </>
            )}
          </button>

          <button
            onClick={handleSendWhatsApp}
            className="w-full sm:w-auto px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contactar WhatsApp</span>
          </button>
        </div>

      </div>

    </div>
  );
};
