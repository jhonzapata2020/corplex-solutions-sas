import React, { useEffect, useState, useCallback } from 'react';
import { fetchQuotes, changeQuoteStatus, duplicateQuote, fetchQuoteStatusHistory } from '../../services/quoteService';
import { convertQuoteOrLeadToClient } from '../../services/clientProjectService';
import type { QuoteEntity, QuoteStatus, QuoteStatusHistoryEntity } from '../../types/lead';
import { QUOTE_STATUS_LABELS } from '../../types/lead';
import { AdminQuoteModal } from './AdminQuoteModal';
import { AdminQuotePreviewModal } from './AdminQuotePreviewModal';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Search,
  Filter,
  RefreshCw,
  Plus,
  Eye,
  Edit,
  Copy,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  Calendar,
  AlertCircle,
  History,
  FolderGit2
} from 'lucide-react';

export const AdminQuotes: React.FC = () => {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState<QuoteEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Metrics State
  const [totalQuotedValue, setTotalQuotedValue] = useState(0);
  const [acceptedTotalValue, setAcceptedTotalValue] = useState(0);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [sentCount, setSentCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);

  // Modals State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState<QuoteEntity | null>(null);
  const [previewQuote, setPreviewQuote] = useState<QuoteEntity | null>(null);

  // Status History Modal State
  const [historyQuote, setHistoryQuote] = useState<QuoteEntity | null>(null);
  const [historyList, setHistoryList] = useState<QuoteStatusHistoryEntity[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const loadQuotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchQuotes({
        statusFilter,
        searchTerm
      });
      setQuotes(res.quotes);
      setTotalQuotedValue(res.totalQuotedValue);
      setAcceptedTotalValue(res.acceptedTotalValue);
      setAcceptedCount(res.acceptedCount);
      setSentCount(res.sentCount);
      setDraftCount(res.draftCount);
    } catch (err) {
      console.error('Error cargando cotizaciones:', err);
      setError('No se pudieron consultar las cotizaciones desde Supabase.');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchTerm]);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchQuotes({
          statusFilter,
          searchTerm
        });
        if (isMounted) {
          setQuotes(res.quotes);
          setTotalQuotedValue(res.totalQuotedValue);
          setAcceptedTotalValue(res.acceptedTotalValue);
          setAcceptedCount(res.acceptedCount);
          setSentCount(res.sentCount);
          setDraftCount(res.draftCount);
        }
      } catch (err) {
        console.error('Error cargando datos de cotizaciones:', err);
        if (isMounted) setError('No se pudieron consultar cotizaciones.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    void init();
    return () => { isMounted = false; };
  }, [statusFilter, searchTerm]);

  const handleChangeStatus = async (quote: QuoteEntity, newStatus: QuoteStatus) => {
    try {
      await changeQuoteStatus(quote.id, newStatus, `Estado actualizado manualmente a ${newStatus}`);
      loadQuotes();
    } catch (err) {
      console.error('Error cambiando estado:', err);
      alert('No se pudo cambiar el estado de la cotización.');
    }
  };

  const handleConvertToClientAndProject = async (quote: QuoteEntity) => {
    try {
      const { client, project } = await convertQuoteOrLeadToClient({ quote });
      alert(`¡Conversión Exitosa!\nCliente: ${client.company_name} (${client.client_code})\nProyecto: ${project.name} (${project.project_code})`);
      navigate('/admin/projects');
    } catch (err) {
      console.error('Error en conversión:', err);
      alert('No se pudo completar la conversión en cliente/proyecto.');
    }
  };

  const handleDuplicate = async (quote: QuoteEntity) => {
    try {
      const newQuote = await duplicateQuote(quote);
      alert(`Cotización duplicada con éxito como ${newQuote.quote_number} (v${newQuote.version_number}).`);
      loadQuotes();
    } catch (err) {
      console.error('Error duplicando cotización:', err);
      alert('No se pudo duplicar la cotización.');
    }
  };

  const handleOpenHistory = async (quote: QuoteEntity) => {
    setHistoryQuote(quote);
    setLoadingHistory(true);
    const list = await fetchQuoteStatusHistory(quote.id);
    setHistoryList(list);
    setLoadingHistory(false);
  };

  return (
    <div className="space-y-6 font-tech">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Módulo de Cotizaciones Formales
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Fase 3: Elaboración de propuestas comerciales, consecutivos transaccionales y PDF descargable ({quotes.length} registradas)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-extrabold text-xs inline-flex items-center gap-2 cursor-pointer shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Cotización</span>
          </button>

          <button
            onClick={loadQuotes}
            className="p-2.5 rounded-xl bg-[#142332] hover:bg-[#2b5b84] text-slate-300 hover:text-white border border-[#2b5b84] transition-all cursor-pointer shadow-sm"
            title="Actualizar tabla"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Cotizado */}
        <div className="p-5 rounded-2xl bg-[#1b3852] border border-[#2b5b84] flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech text-slate-400 font-bold">TOTAL COTIZADO</span>
            <div className="p-2 rounded-xl bg-[#142332] text-sky-400">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              ${totalQuotedValue.toLocaleString('es-CO')}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Monto bruto acumulado</span>
          </div>
        </div>

        {/* Cotizaciones Aceptadas */}
        <div className="p-5 rounded-2xl bg-[#1b3852] border border-[#2b5b84] flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech text-slate-400 font-bold">ACEPTADAS (GANADAS)</span>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
              ${acceptedTotalValue.toLocaleString('es-CO')}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">{acceptedCount} propuestas aprobadas</span>
          </div>
        </div>

        {/* En Evaluación / Enviadas */}
        <div className="p-5 rounded-2xl bg-[#1b3852] border border-[#2b5b84] flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech text-slate-400 font-bold">EN EVALUACIÓN</span>
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-purple-300">{sentCount}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Propuestas en poder del cliente</span>
          </div>
        </div>

        {/* Borradores */}
        <div className="p-5 rounded-2xl bg-[#1b3852] border border-[#2b5b84] flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech text-slate-400 font-bold">BORRADORES</span>
            <div className="p-2 rounded-xl bg-slate-500/20 text-slate-400">
              <Edit className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-300">{draftCount}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Cotizaciones en preparación</span>
          </div>
        </div>

      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-[#1b3852] border border-[#2b5b84] shadow-md font-tech">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Input */}
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por consecutivo (Ej: CPX-QT-2026-001), cliente, empresa o correo..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd343]"
            />
          </div>

          {/* Status Filter */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
              >
                <option value="ALL">Todos los Estados</option>
                <option value="draft">Borrador</option>
                <option value="sent">Cotización enviada</option>
                <option value="viewed">Propuesta vista</option>
                <option value="accepted">Aceptada (Ganada)</option>
                <option value="rejected">Rechazada</option>
                <option value="expired">Vencida</option>
                <option value="cancelled">Cancelada</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Main Quotes Table & Mobile Cards */}
      <div className="bg-[#1b3852] rounded-3xl border border-[#2b5b84] shadow-xl overflow-hidden">
        
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#ffd343] animate-spin" />
            <span className="text-xs font-mono-tech text-slate-300">Cargando cotizaciones desde Supabase...</span>
          </div>
        ) : error ? (
          <div className="py-12 text-center text-rose-300 text-xs space-y-3 p-6">
            <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
            <p className="font-bold text-sm text-white">Error devuelto por Supabase</p>
            <p className="font-mono-tech bg-[#142332] p-3 rounded-xl border border-rose-500/30 max-w-md mx-auto text-rose-200">
              {error}
            </p>
          </div>
        ) : quotes.length === 0 ? (
          <div className="py-16 text-center text-slate-300 text-xs space-y-3 p-6 max-w-lg mx-auto">
            <FileText className="w-10 h-10 text-[#ffd343] mx-auto mb-2" />
            <p className="font-bold text-white text-base">No hay cotizaciones registradas</p>
            <p className="text-slate-400 leading-relaxed">
              Crea tu primera cotización comercial haciendo clic en el botón <strong>"Crear Cotización"</strong> o desde el detalle de un lead en <code className="text-[#ffd343]">/admin/leads</code>.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-200">
              
              <thead className="bg-[#142332] text-[11px] font-mono-tech text-slate-400 border-b border-[#2b5b84] uppercase">
                <tr>
                  <th className="py-4 px-6 font-bold">Consecutivo / Versión</th>
                  <th className="py-4 px-6 font-bold">Cliente / Empresa</th>
                  <th className="py-4 px-6 font-bold">Estado</th>
                  <th className="py-4 px-6 font-bold">Válida Hasta</th>
                  <th className="py-4 px-6 font-bold">IVA (%)</th>
                  <th className="py-4 px-6 font-bold">Total COP</th>
                  <th className="py-4 px-6 font-bold text-right">Acciones</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#2b5b84]/50">
                {quotes.map((quote) => {
                  const statusMeta = QUOTE_STATUS_LABELS[quote.status] || QUOTE_STATUS_LABELS.draft;
                  const isDraft = quote.status === 'draft';
                  const isAccepted = quote.status === 'accepted';

                  return (
                    <tr
                      key={quote.id}
                      className="hover:bg-[#142332]/60 transition-colors group"
                    >
                      {/* Consecutivo & Version */}
                      <td className="py-4 px-6 font-mono-tech">
                        <span className="font-extrabold text-[#ffd343] block text-sm">
                          {quote.quote_number}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          Versión: <strong>v{quote.version_number}</strong>
                        </span>
                      </td>

                      {/* Client Name & Company */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-white group-hover:text-[#ffd343] transition-colors">
                          {quote.client_name}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                          <Building2 className="w-3 h-3 text-slate-500" />
                          <span>{quote.client_company || 'Sin empresa'}</span>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded text-[11px] font-mono-tech font-bold border inline-block ${statusMeta.bgClass} ${statusMeta.textClass}`}>
                          {statusMeta.label}
                        </span>
                      </td>

                      {/* Valid Until */}
                      <td className="py-4 px-6 font-mono-tech text-slate-300 text-[11px]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{new Date(quote.valid_until).toLocaleDateString('es-CO')}</span>
                        </div>
                      </td>

                      {/* Tax Rate */}
                      <td className="py-4 px-6 font-mono-tech text-slate-300">
                        {quote.tax_rate > 0 ? `${quote.tax_rate}%` : <span className="text-emerald-400 font-bold">Exento</span>}
                      </td>

                      {/* Total COP */}
                      <td className="py-4 px-6 font-mono-tech font-extrabold text-[#ffd343] text-sm">
                        ${Number(quote.total).toLocaleString('es-CO')}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right space-x-1.5">
                        {/* View PDF */}
                        <button
                          onClick={() => setPreviewQuote(quote)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#142332] hover:bg-[#ffd343] hover:text-[#111d28] text-slate-300 font-bold border border-[#2b5b84] inline-flex items-center gap-1 transition-all cursor-pointer text-[11px]"
                          title="Ver / Imprimir Propuesta PDF"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </button>

                        {/* Convert to Client & Project */}
                        {isAccepted && (
                          <button
                            onClick={() => handleConvertToClientAndProject(quote)}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-500 text-[#111d28] font-extrabold border border-emerald-400 inline-flex items-center gap-1 transition-all cursor-pointer text-[11px] shadow"
                            title="Convertir Cotización Aceptada en Cliente & Proyecto"
                          >
                            <FolderGit2 className="w-3.5 h-3.5" />
                            <span>Crear Proyecto</span>
                          </button>
                        )}

                        {/* Edit Draft */}
                        {isDraft && (
                          <button
                            onClick={() => setEditingQuote(quote)}
                            className="px-2.5 py-1.5 rounded-lg bg-[#142332] hover:bg-sky-500 hover:text-white text-slate-300 font-bold border border-[#2b5b84] inline-flex items-center gap-1 transition-all cursor-pointer text-[11px]"
                            title="Editar Borrador"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Editar</span>
                          </button>
                        )}

                        {/* Change Status Options */}
                        {isDraft && (
                          <button
                            onClick={() => handleChangeStatus(quote, 'sent')}
                            className="px-2.5 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500 text-purple-300 hover:text-white font-bold border border-purple-500/40 inline-flex items-center gap-1 transition-all cursor-pointer text-[11px]"
                            title="Marcar como Enviada"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Enviar</span>
                          </button>
                        )}

                        {quote.status === 'sent' && (
                          <button
                            onClick={() => handleChangeStatus(quote, 'accepted')}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white font-bold border border-emerald-500/40 inline-flex items-center gap-1 transition-all cursor-pointer text-[11px]"
                            title="Marcar como Aceptada / Ganada"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Aceptar</span>
                          </button>
                        )}

                        {/* Duplicate */}
                        <button
                          onClick={() => handleDuplicate(quote)}
                          className="px-2 rounded-lg bg-[#142332] hover:bg-[#2b5b84] text-slate-300 hover:text-white border border-[#2b5b84] p-1.5 transition-all cursor-pointer text-[11px]"
                          title="Duplicar como Nueva Versión"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        {/* History */}
                        <button
                          onClick={() => handleOpenHistory(quote)}
                          className="px-2 rounded-lg bg-[#142332] hover:bg-[#2b5b84] text-slate-400 hover:text-white border border-[#2b5b84] p-1.5 transition-all cursor-pointer text-[11px]"
                          title="Ver Bitácora de Auditoría"
                        >
                          <History className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        )}

      </div>

      {/* Create / Edit Quote Modal */}
      {(isCreateModalOpen || editingQuote) && (
        <AdminQuoteModal
          quote={editingQuote}
          onClose={() => {
            setIsCreateModalOpen(false);
            setEditingQuote(null);
          }}
          onSuccess={() => {
            setIsCreateModalOpen(false);
            setEditingQuote(null);
            loadQuotes();
          }}
        />
      )}

      {/* PDF Proposal Preview Modal */}
      {previewQuote && (
        <AdminQuotePreviewModal
          quote={previewQuote}
          onClose={() => setPreviewQuote(null)}
        />
      )}

      {/* Audit History Drawer Modal */}
      {historyQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111d28]/80 backdrop-blur-md">
          <div className="bg-[#1b3852] border border-[#2b5b84] rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#2b5b84] pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <History className="w-4 h-4 text-[#ffd343]" />
                Bitácora de Auditoría — {historyQuote.quote_number}
              </h3>
              <button
                onClick={() => setHistoryQuote(null)}
                className="p-1 rounded-lg bg-[#142332] text-slate-400 hover:text-white"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {loadingHistory ? (
              <div className="py-8 text-center text-xs text-slate-300">
                <RefreshCw className="w-5 h-5 animate-spin mx-auto text-[#ffd343] mb-2" />
                Cargando historial...
              </div>
            ) : historyList.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                No hay registros previos de auditoría.
              </div>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {historyList.map(h => (
                  <div key={h.id} className="p-3 rounded-xl bg-[#142332] border border-[#2b5b84] space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#ffd343]">Estado: {h.new_status}</span>
                      <span className="text-[10px] text-slate-400 font-mono-tech">
                        {new Date(h.created_at).toLocaleDateString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300">Por: {h.user_email || 'Sistema'}</p>
                    {h.notes && <p className="text-[11px] text-slate-400 italic">"{h.notes}"</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
