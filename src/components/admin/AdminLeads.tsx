import React, { useEffect, useState, useCallback } from 'react';
import { fetchAdminLeads } from '../../services/adminLeadService';
import type { AutomationLeadEntity, AdminLeadStatus } from '../../types/lead';
import { LEAD_STATUS_LABELS } from '../../types/lead';
import { AdminLeadDetailDrawer } from './AdminLeadDetailDrawer';
import {
  Users,
  Search,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Eye,
  Building2,
  Calendar,
  AlertCircle,
  AlertTriangle,
  X
} from 'lucide-react';

export const AdminLeads: React.FC = () => {
  const [leads, setLeads] = useState<AutomationLeadEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Pagination State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sectorFilter, setSectorFilter] = useState('ALL');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortBy, setSortBy] = useState<'created_at' | 'next_follow_up_at' | 'estimated_value'>('created_at');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Selected Lead for Detail Drawer
  const [selectedLead, setSelectedLead] = useState<AutomationLeadEntity | null>(null);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminLeads({
        searchTerm,
        statusFilter,
        sectorFilter,
        startDate,
        endDate,
        sortBy,
        sortAscending: false,
        page,
        pageSize: 10
      });
      setLeads(res.leads);
      setTotalCount(res.totalCount);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error('Error cargando leads:', err);
      const msg = err instanceof Error ? err.message : 'No se pudieron consultar los leads desde Supabase.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter, sectorFilter, startDate, endDate, sortBy, page]);

  useEffect(() => {
    let isMounted = true;
    const getLeads = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchAdminLeads({
          searchTerm,
          statusFilter,
          sectorFilter,
          startDate,
          endDate,
          sortBy,
          sortAscending: false,
          page,
          pageSize: 10
        });
        if (isMounted) {
          setLeads(res.leads);
          setTotalCount(res.totalCount);
          setTotalPages(res.totalPages || 1);
        }
      } catch (err) {
        console.error('Error cargando leads:', err);
        const msg = err instanceof Error ? err.message : 'No se pudieron consultar los leads desde Supabase.';
        if (isMounted) setError(msg);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    void getLeads();
    return () => { isMounted = false; };
  }, [searchTerm, statusFilter, sectorFilter, startDate, endDate, sortBy, page]);

  const clearDateFilters = () => {
    setStartDate('');
    setEndDate('');
    setPage(1);
  };

  // Calcular seguimientos vencidos
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const overdueLeads = leads.filter(lead => {
    const status = (lead.status || '').toLowerCase();
    return lead.next_follow_up_at && new Date(lead.next_follow_up_at) < todayStart && status !== 'won' && status !== 'lost';
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Gestión de Leads & Oportunidades
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Consulta, filtrado por fecha/sector, seguimiento comercial y detalle completo ({totalCount} registrados)
          </p>
        </div>

        <button
          onClick={loadLeads}
          className="p-2.5 rounded-xl bg-[#142332] hover:bg-[#2b5b84] text-slate-300 hover:text-white border border-[#2b5b84] transition-all cursor-pointer shadow-sm self-start sm:self-auto flex items-center gap-2 text-xs font-bold"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Actualizar Tabla</span>
        </button>
      </div>

      {/* Overdue Follow-ups Alert Banner */}
      {overdueLeads.length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/40 text-rose-300 flex items-center justify-between gap-4 text-xs font-tech">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 shrink-0">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-bold block text-white text-sm">
                ¡Atención! Tienes {overdueLeads.length} seguimiento(s) vencido(s) en la lista actual
              </span>
              <span>Revisa la fecha de compromiso de atención de las oportunidades destacadas.</span>
            </div>
          </div>
          <button
            onClick={() => setSortBy('next_follow_up_at')}
            className="px-3.5 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs shrink-0 cursor-pointer hover:bg-rose-600 shadow"
          >
            Ordenar por Seguimiento
          </button>
        </div>
      )}

      {/* Filters & Search Control Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#1b3852] border border-[#2b5b84] space-y-4 shadow-md font-tech">
        
        {/* Row 1: Search, Status, Sector, Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Input */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              placeholder="Buscar cliente, empresa, email..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd343]"
            />
          </div>

          {/* Status Filter */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
              >
                <option value="ALL">Todos los Estados</option>
                <option value="pending">Pendiente (por responder)</option>
                <option value="contacted">Contactado</option>
                <option value="qualified">Calificado</option>
                <option value="proposal_sent">Cotización enviada</option>
                <option value="won">Ganado (Cliente)</option>
                <option value="lost">Perdido / Descartado</option>
              </select>
            </div>
          </div>

          {/* Sector Filter */}
          <div className="md:col-span-3">
            <select
              value={sectorFilter}
              onChange={(e) => {
                setSectorFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
            >
              <option value="ALL">Todos los Sectores</option>
              <option value="Salud y Clínicas">Salud y Clínicas</option>
              <option value="Educación y Universidades">Educación y Universidades</option>
              <option value="Agroindustria & Operaciones">Agroindustria</option>
              <option value="Comercio & Servicios">Comercio & Servicios</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
            >
              <option value="created_at">Ordenar por Fecha</option>
              <option value="next_follow_up_at">Próximo Seguimiento</option>
              <option value="estimated_value">Valor Estimado ($)</option>
            </select>
          </div>

        </div>

        {/* Row 2: Date Range Filters */}
        <div className="pt-3 border-t border-[#2b5b84]/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-slate-300 font-mono-tech flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#ffd343]" />
              Filtro por Rango de Fecha:
            </span>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">Desde:</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setPage(1);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">Hasta:</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setPage(1);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
              />
            </div>

            {(startDate || endDate) && (
              <button
                onClick={clearDateFilters}
                className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <X className="w-3 h-3" />
                <span>Limpiar Fechas</span>
              </button>
            )}
          </div>

          <div className="text-[11px] font-mono-tech text-slate-400">
            Mostrando <strong className="text-white">{leads.length}</strong> de <strong className="text-[#ffd343]">{totalCount}</strong> solicitudes
          </div>
        </div>

      </div>

      {/* Main Table & Mobile Cards Content */}
      <div className="bg-[#1b3852] rounded-3xl border border-[#2b5b84] shadow-xl overflow-hidden">
        
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#ffd343] animate-spin" />
            <span className="text-xs font-mono-tech text-slate-300">Consultando registros en tiempo real desde Supabase...</span>
          </div>
        ) : error ? (
          <div className="py-12 text-center text-rose-300 text-xs space-y-3 p-6">
            <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
            <p className="font-bold text-sm text-white">Error devuelto por Supabase</p>
            <p className="font-mono-tech bg-[#142332] p-3 rounded-xl border border-rose-500/30 max-w-md mx-auto text-rose-200">
              {error}
            </p>
            <button
              onClick={loadLeads}
              className="px-5 py-2.5 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-bold text-xs inline-flex items-center gap-2 cursor-pointer shadow"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reintentar Consulta</span>
            </button>
          </div>
        ) : leads.length === 0 ? (
          <div className="py-16 text-center text-slate-300 text-xs space-y-3 p-6 max-w-lg mx-auto">
            <Users className="w-10 h-10 text-[#ffd343] mx-auto mb-2" />
            <p className="font-bold text-white text-base">No se encontraron solicitudes</p>
            <p className="text-slate-400 leading-relaxed">
              No hay leads que coincidan con los filtros seleccionados (Búsqueda: "{searchTerm}", Estado: {statusFilter}, Sector: {sectorFilter}).
            </p>
            {(searchTerm || statusFilter !== 'ALL' || sectorFilter !== 'ALL' || startDate || endDate) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('ALL');
                  setSectorFilter('ALL');
                  setStartDate('');
                  setEndDate('');
                  setPage(1);
                }}
                className="px-4 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-[#ffd343] font-bold text-xs cursor-pointer hover:bg-[#2b5b84]"
              >
                Limpiar Todos los Filtros
              </button>
            )}
          </div>
        ) : (
          <>
            {/* 1. Mobile Cards View (< md screens) */}
            <div className="block md:hidden divide-y divide-[#2b5b84]/50">
              {leads.map((lead) => {
                const statusMeta = LEAD_STATUS_LABELS[lead.status as AdminLeadStatus] || LEAD_STATUS_LABELS.pending;
                const isOverdue = lead.next_follow_up_at && 
                  new Date(lead.next_follow_up_at) < todayStart && 
                  (lead.status || '').toLowerCase() !== 'won' && 
                  (lead.status || '').toLowerCase() !== 'lost';

                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`p-4 space-y-3 cursor-pointer transition-colors ${
                      isOverdue ? 'bg-rose-500/10' : 'hover:bg-[#142332]/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-bold text-sm text-white block">{lead.full_name}</span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-slate-500" />
                          {lead.company_name || 'Sin empresa'}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold border shrink-0 ${statusMeta.bgClass} ${statusMeta.textClass}`}>
                        {statusMeta.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-300 pt-1 border-t border-[#2b5b84]/40">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Contacto:</span>
                        <span>{lead.email || lead.phone || 'Sin datos'}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block text-[10px]">Valor Est. ($):</span>
                        <span className="font-mono-tech font-bold text-[#ffd343]">
                          {lead.estimated_value ? `$${Number(lead.estimated_value).toLocaleString('es-CO')}` : '-'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-slate-400 font-mono-tech">
                        {new Date(lead.created_at).toLocaleDateString('es-CO')}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLead(lead);
                        }}
                        className="px-3 py-1 rounded-lg bg-[#ffd343] text-[#111d28] font-bold text-xs inline-flex items-center gap-1 shadow"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver Detalle</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 2. Desktop Table View (>= md screens) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-200">
                
                <thead className="bg-[#142332] text-[11px] font-mono-tech text-slate-400 border-b border-[#2b5b84] uppercase">
                  <tr>
                    <th className="py-4 px-6 font-bold">Fecha / ID</th>
                    <th className="py-4 px-6 font-bold">Cliente / Empresa</th>
                    <th className="py-4 px-6 font-bold">Contacto</th>
                    <th className="py-4 px-6 font-bold">Sector / Plan</th>
                    <th className="py-4 px-6 font-bold">Estado</th>
                    <th className="py-4 px-6 font-bold">Responsable</th>
                    <th className="py-4 px-6 font-bold">Valor Est.</th>
                    <th className="py-4 px-[#1b3852] font-bold text-right px-6">Acción</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#2b5b84]/50">
                  {leads.map((lead) => {
                    const statusMeta = LEAD_STATUS_LABELS[lead.status as AdminLeadStatus] || LEAD_STATUS_LABELS.pending;
                    
                    const isOverdue = lead.next_follow_up_at && 
                      new Date(lead.next_follow_up_at) < todayStart && 
                      (lead.status || '').toLowerCase() !== 'won' && 
                      (lead.status || '').toLowerCase() !== 'lost';

                    return (
                      <tr
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className={`hover:bg-[#142332]/60 transition-colors cursor-pointer group ${
                          isOverdue ? 'bg-rose-500/5' : ''
                        }`}
                      >
                        {/* Date */}
                        <td className="py-4 px-6 font-mono-tech text-slate-400 text-[11px]">
                          <div>{new Date(lead.created_at).toLocaleDateString('es-CO')}</div>
                          <div className="text-slate-500 font-normal">ID: {lead.id.slice(0, 6)}</div>
                        </td>

                        {/* Name & Company */}
                        <td className="py-4 px-6">
                          <div className="font-bold text-white group-hover:text-[#ffd343] transition-colors flex items-center gap-2">
                            <span>{lead.full_name}</span>
                            {isOverdue && (
                              <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[9px] font-mono-tech font-bold" title="Seguimiento Vencido">
                                ¡VENCIDO!
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                            <Building2 className="w-3 h-3 text-slate-500" />
                            <span>{lead.company_name || 'Sin empresa'}</span>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="py-4 px-6 text-slate-300">
                          <div>{lead.email || lead.contact_detail}</div>
                          {lead.phone && <div className="text-[11px] text-slate-400">{lead.phone}</div>}
                        </td>

                        {/* Sector */}
                        <td className="py-4 px-6">
                          <div className="text-slate-200">{lead.sector || 'General'}</div>
                          <div className="text-[11px] text-[#ffd343] font-mono-tech">{lead.selected_package || 'Piloto'}</div>
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-6">
                          <span className={`px-2.5 py-1 rounded text-[11px] font-mono-tech font-bold border inline-block ${statusMeta.bgClass} ${statusMeta.textClass}`}>
                            {statusMeta.label}
                          </span>
                        </td>

                        {/* Assigned To & Next Follow Up */}
                        <td className="py-4 px-6 font-mono-tech text-slate-300">
                          {lead.assigned_to ? `@${lead.assigned_to}` : <span className="text-slate-500 italic">Sin asignar</span>}
                          {lead.next_follow_up_at && (
                            <div className={`text-[10px] flex items-center gap-1 mt-0.5 font-bold ${
                              isOverdue ? 'text-rose-400' : 'text-emerald-400'
                            }`}>
                              <Calendar className="w-2.5 h-2.5" />
                              {new Date(lead.next_follow_up_at).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}
                            </div>
                          )}
                        </td>

                        {/* Estimated Value */}
                        <td className="py-4 px-6 font-mono-tech font-bold text-[#ffd343]">
                          {lead.estimated_value ? `$${Number(lead.estimated_value).toLocaleString('es-CO')}` : '-'}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLead(lead);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-[#142332] hover:bg-[#ffd343] hover:text-[#111d28] text-slate-300 font-bold border border-[#2b5b84] inline-flex items-center gap-1 transition-all cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Ver</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
          </>
        )}

        {/* Pagination Footer */}
        {!loading && totalPages > 1 && (
          <div className="p-4 bg-[#142332] border-t border-[#2b5b84] flex items-center justify-between text-xs font-mono-tech text-slate-400">
            <span>Página {page} de {totalPages} ({totalCount} leads totales)</span>
            
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                className="p-2 rounded-xl bg-[#1b3852] border border-[#2b5b84] text-slate-300 hover:text-white disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                className="p-2 rounded-xl bg-[#1b3852] border border-[#2b5b84] text-slate-300 hover:text-white disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Side Drawer Detail View */}
      {selectedLead && (
        <AdminLeadDetailDrawer
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={loadLeads}
        />
      )}

    </div>
  );
};
