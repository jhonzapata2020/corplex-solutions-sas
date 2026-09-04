import React, { useEffect, useState, useCallback } from 'react';
import {
  fetchSupportTickets,
  createSupportTicket,
  updateSupportTicketStatus,
  addSupportTicketNote,
  fetchTicketNotes
} from '../../services/supportTicketService';
import { fetchClients, fetchProjects } from '../../services/clientProjectService';
import type {
  SupportTicketEntity,
  SupportTicketNoteEntity,
  TicketSeverity,
  TicketStatus,
  ClientEntity,
  ProjectEntity
} from '../../types/lead';
import { TICKET_SEVERITY_LABELS, TICKET_STATUS_LABELS } from '../../types/lead';
import {
  LifeBuoy,
  AlertTriangle,
  Clock,
  CheckCircle2,
  RefreshCw,
  Search,
  Filter,
  Plus,
  X,
  Building2,
  FolderGit2,
  MessageSquare,
  Loader2,
  ShieldAlert
} from 'lucide-react';

export const AdminSupport: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicketEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Metrics state
  const [totalTickets, setTotalTickets] = useState(0);
  const [openCount, setOpenCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [criticalSlaCount, setCriticalSlaCount] = useState(0);

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [severityFilter, setSeverityFilter] = useState('ALL');

  // Client and Project dropdown options
  const [clientsList, setClientsList] = useState<ClientEntity[]>([]);
  const [projectsList, setProjectsList] = useState<ProjectEntity[]>([]);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicketEntity | null>(null);
  const [ticketNotes, setTicketNotes] = useState<SupportTicketNoteEntity[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(false);

  // Form states: Create Ticket
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newClientId, setNewClientId] = useState('');
  const [newProjectId, setNewProjectId] = useState('');
  const [newSeverity, setNewSeverity] = useState<TicketSeverity>('medium');
  const [newAssignedTo, setNewAssignedTo] = useState('@soporte_ti');
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);

  // Form states: Add Note
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteHours, setNewNoteHours] = useState<number | string>(1.0);
  const [isAddingNote, setIsAddingNote] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [ticketRes, clientRes, projectRes] = await Promise.all([
        fetchSupportTickets(),
        fetchClients(),
        fetchProjects()
      ]);

      setTickets(ticketRes.tickets);
      setTotalTickets(ticketRes.totalTickets);
      setOpenCount(ticketRes.openCount);
      setInProgressCount(ticketRes.inProgressCount);
      setResolvedCount(ticketRes.resolvedCount);
      setCriticalSlaCount(ticketRes.criticalSlaCount);

      setClientsList(clientRes.clients);
      setProjectsList(projectRes.projects);
    } catch (err) {
      console.error('Error cargando datos de mesa de ayuda:', err);
      setError('No se pudieron consultar los tickets desde Supabase.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      setLoading(true);
      setError(null);
      try {
        const [ticketRes, clientRes, projectRes] = await Promise.all([
          fetchSupportTickets(),
          fetchClients(),
          fetchProjects()
        ]);
        if (isMounted) {
          setTickets(ticketRes.tickets);
          setTotalTickets(ticketRes.totalTickets);
          setOpenCount(ticketRes.openCount);
          setInProgressCount(ticketRes.inProgressCount);
          setResolvedCount(ticketRes.resolvedCount);
          setCriticalSlaCount(ticketRes.criticalSlaCount);

          setClientsList(clientRes.clients);
          setProjectsList(projectRes.projects);
        }
      } catch (err) {
        console.error('Error cargando mesa de ayuda:', err);
        if (isMounted) setError('No se pudieron consultar tickets de soporte.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    void init();
    return () => { isMounted = false; };
  }, []);

  const handleOpenTicketDrawer = async (ticket: SupportTicketEntity) => {
    setSelectedTicket(ticket);
    setLoadingNotes(true);
    const notes = await fetchTicketNotes(ticket.id);
    setTicketNotes(notes);
    setLoadingNotes(false);
  };

  const handleCreateTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || isSubmittingTicket) return;

    setIsSubmittingTicket(true);
    const created = await createSupportTicket({
      title: newTitle.trim(),
      description: newDesc.trim() || null,
      clientId: newClientId || null,
      projectId: newProjectId || null,
      severity: newSeverity,
      assignedTo: newAssignedTo.trim() || '@soporte_ti'
    });

    setIsSubmittingTicket(false);

    if (created) {
      setIsCreateModalOpen(false);
      setNewTitle('');
      setNewDesc('');
      setNewClientId('');
      setNewProjectId('');
      setNewSeverity('medium');
      loadData();
    } else {
      alert('Ocurrió un error al registrar el ticket de soporte.');
    }
  };

  const handleStatusChange = async (ticketId: string, newStatus: TicketStatus) => {
    const success = await updateSupportTicketStatus(ticketId, newStatus);
    if (success) {
      loadData();
      if (selectedTicket?.id === ticketId) {
        setSelectedTicket(prev => prev ? { ...prev, status: newStatus } : null);
      }
    }
  };

  const handleAddNoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !newNoteText.trim() || isAddingNote) return;

    setIsAddingNote(true);
    const hours = Number(newNoteHours) || 0;
    const createdNote = await addSupportTicketNote(selectedTicket.id, newNoteText.trim(), hours);
    setIsAddingNote(false);

    if (createdNote) {
      setNewNoteText('');
      setNewNoteHours(1.0);
      const notes = await fetchTicketNotes(selectedTicket.id);
      setTicketNotes(notes);
      
      // Update local ticket hours
      const newTotalHours = selectedTicket.total_hours_spent + hours;
      setSelectedTicket(prev => prev ? { ...prev, total_hours_spent: newTotalHours } : null);
      loadData();
    }
  };

  const filteredTickets = tickets.filter(t => {
    if (statusFilter !== 'ALL' && t.status !== statusFilter) return false;
    if (severityFilter !== 'ALL' && t.severity !== severityFilter) return false;

    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      t.ticket_code.toLowerCase().includes(term) ||
      t.title.toLowerCase().includes(term) ||
      (t.client?.company_name && t.client.company_name.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-6 font-tech">
      
      {/* Header & Main CTAs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            <LifeBuoy className="w-7 h-7 text-[#ffd343]" />
            Soporte TI / Mesa de Ayuda
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Fase 5: Registro de incidentes, control de SLA, asignación de responsables y auditoría de horas dedicadas ({totalTickets} tickets)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-extrabold text-xs inline-flex items-center gap-2 cursor-pointer shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Ticket de Soporte</span>
          </button>

          <button
            onClick={loadData}
            className="p-2.5 rounded-xl bg-[#142332] hover:bg-[#2b5b84] text-slate-300 hover:text-white border border-[#2b5b84] transition-all cursor-pointer shadow-sm"
            title="Actualizar datos"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metrics KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Abiertos */}
        <div className="p-5 rounded-2xl bg-[#1b3852] border border-[#2b5b84] flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech text-slate-400 font-bold">TICKETS ABIERTOS</span>
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
              <LifeBuoy className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-rose-400">{openCount}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Pendientes de atención</span>
          </div>
        </div>

        {/* En Proceso */}
        <div className="p-5 rounded-2xl bg-[#1b3852] border border-[#2b5b84] flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech text-slate-400 font-bold">EN PROCESO</span>
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-300">{inProgressCount}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">En gestión técnica</span>
          </div>
        </div>

        {/* Resueltos */}
        <div className="p-5 rounded-2xl bg-[#1b3852] border border-[#2b5b84] flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech text-slate-400 font-bold">RESUELTOS</span>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{resolvedCount}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Atendidos y cerrados</span>
          </div>
        </div>

        {/* SLA Crítico (< 2h) */}
        <div className={`p-5 rounded-2xl border flex flex-col justify-between shadow-md transition-all ${
          criticalSlaCount > 0
            ? 'bg-rose-950/40 border-rose-500/60 shadow-rose-900/20'
            : 'bg-[#1b3852] border-[#2b5b84]'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech text-rose-300 font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
              SLA CRÍTICO (&lt; 2h)
            </span>
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-300">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-rose-300">{criticalSlaCount}</span>
            <span className="text-[11px] text-slate-300 block mt-0.5">Requieren respuesta prioritaria</span>
          </div>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#1b3852] border border-[#2b5b84] shadow-md font-tech">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por código (Ej: CPX-TCK-2026-001), asunto o cliente..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd343]"
            />
          </div>

          {/* Status Filter */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
              >
                <option value="ALL">Todos los Estados</option>
                <option value="open">Abierto</option>
                <option value="in_progress">En Proceso</option>
                <option value="resolved">Resuelto</option>
                <option value="closed">Cerrado</option>
              </select>
            </div>
          </div>

          {/* Severity Filter */}
          <div className="md:col-span-3">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
            >
              <option value="ALL">Todas las Severidades</option>
              <option value="critical">Crítica (SLA &lt; 2h)</option>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
          </div>

        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-[#1b3852] rounded-3xl border border-[#2b5b84] shadow-xl overflow-hidden">
        
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#ffd343] animate-spin" />
            <span className="text-xs font-mono-tech text-slate-300">Cargando mesa de ayuda desde Supabase...</span>
          </div>
        ) : error ? (
          <div className="py-12 text-center text-rose-300 text-xs space-y-3 p-6">
            <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto" />
            <p>{error}</p>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="py-16 text-center text-slate-300 text-xs space-y-3 p-6 max-w-lg mx-auto">
            <LifeBuoy className="w-10 h-10 text-[#ffd343] mx-auto mb-2" />
            <p className="font-bold text-white text-base">No hay tickets de soporte registrados</p>
            <p className="text-slate-400 leading-relaxed">
              Crea un nuevo ticket haciendo clic en el botón <strong>"Nuevo Ticket de Soporte"</strong> o vinculando requerimientos de tus clientes existentes.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-200">
              
              <thead className="bg-[#142332] text-[11px] font-mono-tech text-slate-400 border-b border-[#2b5b84] uppercase">
                <tr>
                  <th className="py-4 px-6 font-bold">Código / Fecha</th>
                  <th className="py-4 px-6 font-bold">Asunto / Incidencia</th>
                  <th className="py-4 px-6 font-bold">Cliente / Empresa</th>
                  <th className="py-4 px-6 font-bold">Proyecto</th>
                  <th className="py-4 px-6 font-bold">Severidad</th>
                  <th className="py-4 px-6 font-bold">Estado</th>
                  <th className="py-4 px-6 font-bold">Responsable</th>
                  <th className="py-4 px-6 font-bold">Horas</th>
                  <th className="py-4 px-6 font-bold text-right">Acción</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#2b5b84]/50">
                {filteredTickets.map((t) => {
                  const severityMeta = TICKET_SEVERITY_LABELS[t.severity] || TICKET_SEVERITY_LABELS.medium;
                  const statusMeta = TICKET_STATUS_LABELS[t.status] || TICKET_STATUS_LABELS.open;

                  return (
                    <tr key={t.id} className="hover:bg-[#142332]/60 transition-colors group">
                      
                      {/* Code */}
                      <td className="py-4 px-6 font-mono-tech">
                        <span className="font-extrabold text-[#ffd343] text-sm block">
                          {t.ticket_code}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {new Date(t.created_at).toLocaleDateString('es-CO')}
                        </span>
                      </td>

                      {/* Title */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-white max-w-xs group-hover:text-[#ffd343] transition-colors truncate">
                          {t.title}
                        </div>
                        {t.description && (
                          <div className="text-[11px] text-slate-400 truncate max-w-xs">{t.description}</div>
                        )}
                      </td>

                      {/* Client */}
                      <td className="py-4 px-6">
                        {t.client ? (
                          <div className="flex items-center gap-1.5 text-slate-200 font-bold">
                            <Building2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                            <span>{t.client.company_name}</span>
                          </div>
                        ) : (
                          <span className="text-slate-500 italic">Sin cliente</span>
                        )}
                      </td>

                      {/* Project */}
                      <td className="py-4 px-6">
                        {t.project ? (
                          <div className="flex items-center gap-1.5 text-slate-300 font-mono-tech text-[11px]">
                            <FolderGit2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                            <span>{t.project.project_code}</span>
                          </div>
                        ) : (
                          <span className="text-slate-500 italic">Sin proyecto</span>
                        )}
                      </td>

                      {/* Severity */}
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded text-[11px] font-mono-tech font-bold border inline-block ${severityMeta.bgClass} ${severityMeta.textClass}`}>
                          {severityMeta.label}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded text-[11px] font-mono-tech font-bold border inline-block ${statusMeta.bgClass} ${statusMeta.textClass}`}>
                          {statusMeta.label}
                        </span>
                      </td>

                      {/* Assigned to */}
                      <td className="py-4 px-6 font-mono-tech text-slate-300">
                        {t.assigned_to || '@soporte_ti'}
                      </td>

                      {/* Total Hours Spent */}
                      <td className="py-4 px-6 font-mono-tech font-extrabold text-[#ffd343]">
                        {Number(t.total_hours_spent).toFixed(1)}h
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleOpenTicketDrawer(t)}
                          className="px-3 py-1.5 rounded-xl bg-[#142332] hover:bg-[#ffd343] hover:text-[#111d28] text-slate-300 font-bold border border-[#2b5b84] transition-all cursor-pointer text-xs"
                        >
                          Gestionar
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

      {/* Modal de Creación de Ticket */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111d28]/85 backdrop-blur-md font-tech">
          <div className="bg-[#1b3852] border border-[#2b5b84] rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-[#2b5b84] pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <LifeBuoy className="w-5 h-5 text-[#ffd343]" />
                Registrar Nuevo Ticket de Soporte
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg bg-[#142332] text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicketSubmit} className="space-y-4 text-xs">
              
              {/* Asunto */}
              <div>
                <label className="block text-slate-300 font-bold mb-1 font-mono-tech">
                  Asunto / Incidencia *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="ej: Fallo en integración de API o actualización de servidor"
                  className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd343]"
                />
              </div>

              {/* Cliente y Proyecto */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1 font-mono-tech">
                    Cliente Vinculado
                  </label>
                  <select
                    value={newClientId}
                    onChange={(e) => setNewClientId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
                  >
                    <option value="">-- Sin Cliente --</option>
                    {clientsList.map(c => (
                      <option key={c.id} value={c.id}>{c.company_name} ({c.client_code})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1 font-mono-tech">
                    Proyecto Asociado
                  </label>
                  <select
                    value={newProjectId}
                    onChange={(e) => setNewProjectId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
                  >
                    <option value="">-- Sin Proyecto --</option>
                    {projectsList.map(p => (
                      <option key={p.id} value={p.id}>{p.project_code} - {p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Severidad y Responsable */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1 font-mono-tech">
                    Severidad / SLA *
                  </label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as TicketSeverity)}
                    className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
                  >
                    <option value="critical">Crítica (SLA &lt; 2h)</option>
                    <option value="high">Alta</option>
                    <option value="medium">Media</option>
                    <option value="low">Baja</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1 font-mono-tech">
                    Responsable Asignado
                  </label>
                  <input
                    type="text"
                    value={newAssignedTo}
                    onChange={(e) => setNewAssignedTo(e.target.value)}
                    placeholder="ej: @soporte_ti"
                    className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd343]"
                  />
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-slate-300 font-bold mb-1 font-mono-tech">
                  Descripción Detallada del Requerimiento
                </label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Detalla la situación reportada por el cliente..."
                  className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd343]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-[#2b5b84]">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#142332] text-slate-300 hover:text-white border border-[#2b5b84]"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isSubmittingTicket}
                  className="px-5 py-2 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-bold inline-flex items-center gap-1.5 shadow"
                >
                  {isSubmittingTicket ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <span>Crear Ticket</span>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Ticket Management Side Drawer */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 font-tech">
          <div className="w-full max-w-2xl bg-[#1b3852] border-l border-[#2b5b84] h-full overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl text-slate-100">
            
            {/* Drawer Header */}
            <div className="flex items-start justify-between border-b border-[#2b5b84] pb-4">
              <div>
                <span className="text-xs font-mono-tech text-[#ffd343] font-bold">
                  {selectedTicket.ticket_code} • Horas acumuladas: {Number(selectedTicket.total_hours_spent).toFixed(1)}h
                </span>
                <h2 className="text-xl font-bold text-white mt-1">
                  {selectedTicket.title}
                </h2>
                {selectedTicket.client && (
                  <div className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>{selectedTicket.client.company_name}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedTicket(null)}
                className="p-2 rounded-xl bg-[#142332] text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Change Controls */}
            <div className="p-4 rounded-2xl bg-[#142332] border border-[#2b5b84] space-y-3">
              <span className="text-xs font-mono-tech text-slate-400 font-bold uppercase block">Cambiar Estado del Ticket</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['open', 'in_progress', 'resolved', 'closed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedTicket.id, st as TicketStatus)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedTicket.status === st
                        ? 'bg-[#ffd343] text-[#111d28] border-[#ffd343] font-extrabold shadow'
                        : 'bg-[#1b3852] text-slate-300 border-[#2b5b84] hover:border-slate-400'
                    }`}
                  >
                    {TICKET_STATUS_LABELS[st as TicketStatus]?.label || st}
                  </button>
                ))}
              </div>
            </div>

            {/* Form: Add Resolution Note with Dedicated Hours */}
            <form onSubmit={handleAddNoteSubmit} className="p-4 rounded-2xl bg-[#142332] border border-[#ffd343]/30 space-y-3">
              <span className="text-xs font-mono-tech text-[#ffd343] font-bold uppercase block">
                Registrar Nota de Resolución & Horas Dedicadas (hours_spent)
              </span>

              <div>
                <textarea
                  rows={3}
                  required
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Escribe el reporte de avance, solución técnica o diagnóstico brindado al cliente..."
                  className="w-full px-3 py-2 rounded-xl bg-[#1b3852] border border-[#2b5b84] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd343]"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-mono-tech">Horas Dedicadas:</span>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={newNoteHours}
                    onChange={(e) => setNewNoteHours(e.target.value)}
                    className="w-20 px-2 py-1 rounded-lg bg-[#1b3852] border border-[#2b5b84] text-xs text-white font-mono-tech text-center focus:outline-none focus:border-[#ffd343]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isAddingNote || !newNoteText.trim()}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-bold text-xs inline-flex items-center justify-center gap-1.5 shadow disabled:opacity-50"
                >
                  {isAddingNote ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Registrando...</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4" />
                      <span>Agregar Nota</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Resolution Notes History */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono-tech text-slate-400 uppercase font-bold tracking-wider">
                Bitácora de Notas & Soluciones ({ticketNotes.length})
              </h3>

              {loadingNotes ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto text-[#ffd343] mb-1" />
                  Cargando notas...
                </div>
              ) : ticketNotes.length === 0 ? (
                <p className="text-xs text-slate-400 italic text-center py-4">No se han registrado notas aún para este ticket.</p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {ticketNotes.map((note) => (
                    <div key={note.id} className="p-3.5 rounded-xl bg-[#142332] border border-[#2b5b84] space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-[11px] font-mono-tech">
                        <span className="text-[#ffd343] font-bold">{note.user_email || 'Soporte TI'}</span>
                        <span className="text-slate-400">
                          {new Date(note.created_at).toLocaleDateString('es-CO', { hour: '2-digit', minute: '2-digit' })} • +{Number(note.hours_spent).toFixed(1)}h
                        </span>
                      </div>
                      <p className="text-slate-200 leading-relaxed font-sans">{note.note}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
