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
  AlertCircle
} from 'lucide-react';

export const AdminLeads: React.FC = () => {
  const [leads, setLeads] = useState<AutomationLeadEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Pagination State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sectorFilter, setSectorFilter] = useState('ALL');
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
      setError('No se pudieron consultar los leads desde Supabase.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter, sectorFilter, sortBy, page]);

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
        if (isMounted) setError('No se pudieron consultar los leads desde Supabase.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    void getLeads();
    return () => { isMounted = false; };
  }, [searchTerm, statusFilter, sectorFilter, sortBy, page]);

  return (
    <div className="space-y-6">
      
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Gestión de Leads & Oportunidades
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Consulta, filtrado y seguimiento comercial de las solicitudes recibidas ({totalCount} registrados)
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

      {/* Filters & Search Control Bar */}
      <div className="p-4 rounded-2xl bg-[#1b3852] border border-[#2b5b84] space-y-3 shadow-md font-tech">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              placeholder="Buscar por nombre, empresa, correo o teléfono..."
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
                <option value="pending">Pendientes (por responder)</option>
                <option value="contacted">Contactados</option>
                <option value="qualified">Calificados</option>
                <option value="proposal_sent">Cotización enviada</option>
                <option value="won">Ganados (Clientes)</option>
                <option value="lost">Perdidos / Descartados</option>
              </select>
            </div>
          </div>

          {/* Sector Filter */}
          <div className="md:col-span-2">
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
      </div>

      {/* Main Table Content */}
      <div className="bg-[#1b3852] rounded-3xl border border-[#2b5b84] shadow-xl overflow-hidden">
        
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#ffd343] animate-spin" />
            <span className="text-xs font-mono-tech text-slate-300">Cargando registros desde Supabase...</span>
          </div>
        ) : error ? (
          <div className="py-12 text-center text-rose-300 text-xs space-y-3">
            <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
            <p>{error}</p>
            <button
              onClick={loadLeads}
              className="px-4 py-2 rounded-xl bg-[#ffd343] text-[#111d28] font-bold text-xs cursor-pointer"
            >
              Reintentar
            </button>
          </div>
        ) : leads.length === 0 ? (
          <div className="py-16 text-center text-slate-300 text-xs space-y-3 p-6 max-w-lg mx-auto">
            <Users className="w-10 h-10 text-[#ffd343] mx-auto mb-2" />
            <p className="font-bold text-white text-base">No hay leads visibles</p>
            <p className="text-slate-400 leading-relaxed">
              Si tu tabla <code className="text-white font-mono-tech">public.automation_leads</code> ya tiene datos pero no aparecen aquí, ejecuta el script <code className="text-[#ffd343] font-mono-tech">docs/supabase-admin-crm-migration.sql</code> en el SQL Editor de tu panel de Supabase para habilitar las políticas de lectura RLS para el rol <code className="text-emerald-400 font-mono-tech">authenticated</code>.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
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
                  return (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="hover:bg-[#142332]/60 transition-colors cursor-pointer group"
                    >
                      {/* Date */}
                      <td className="py-4 px-6 font-mono-tech text-slate-400 text-[11px]">
                        <div>{new Date(lead.created_at).toLocaleDateString('es-CO')}</div>
                        <div className="text-slate-500 font-normal">ID: {lead.id.slice(0, 6)}</div>
                      </td>

                      {/* Name & Company */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-white group-hover:text-[#ffd343] transition-colors">
                          {lead.full_name}
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

                      {/* Assigned To */}
                      <td className="py-4 px-6 font-mono-tech text-slate-300">
                        {lead.assigned_to ? `@${lead.assigned_to}` : <span className="text-slate-500 italic">Sin asignar</span>}
                        {lead.next_follow_up_at && (
                          <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
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
