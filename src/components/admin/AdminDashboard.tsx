import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLeadMetrics } from '../../services/adminLeadService';
import type { LeadDashboardMetrics, AutomationLeadEntity } from '../../types/lead';
import { LEAD_STATUS_LABELS } from '../../types/lead';
import { AdminLeadDetailDrawer } from './AdminLeadDetailDrawer';
import {
  Users,
  Clock,
  FileText,
  Trophy,
  DollarSign,
  AlertTriangle,
  RefreshCw,
  ArrowRight,
  Calendar,
  Building2,
  ChevronRight
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<LeadDashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Selected lead for detail drawer
  const [selectedLead, setSelectedLead] = useState<AutomationLeadEntity | null>(null);

  const navigate = useNavigate();

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLeadMetrics();
      setMetrics(data);
    } catch (err) {
      console.error('Fallo al cargar métricas del dashboard:', err);
      setError('No se pudo cargar la información desde Supabase. Verifica tus permisos o conexión.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const initData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchLeadMetrics();
        if (isMounted) setMetrics(data);
      } catch (err) {
        console.error('Fallo al cargar métricas del dashboard:', err);
        if (isMounted) setError('No se pudo cargar la información desde Supabase. Verifica tus permisos o conexión.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    void initData();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <RefreshCw className="w-8 h-8 text-[#ffd343] animate-spin" />
        <span className="text-xs font-mono-tech text-slate-300">Consultando métricas en tiempo real de Supabase...</span>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="p-8 rounded-3xl bg-[#1b3852] border border-rose-500/30 text-slate-100 text-center space-y-4">
        <AlertTriangle className="w-10 h-10 text-rose-400 mx-auto" />
        <h2 className="text-lg font-bold">No se pudieron cargar los datos</h2>
        <p className="text-xs text-slate-300 max-w-md mx-auto">{error}</p>
        <button
          onClick={loadDashboardData}
          className="px-6 py-2.5 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-bold text-xs inline-flex items-center gap-2 cursor-pointer shadow-md"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reintentar Consulta</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Resumen Operativo Comercial
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Métricas calculadas en tiempo real a partir de la tabla <code className="text-[#ffd343] bg-[#142332] px-1.5 py-0.5 rounded font-mono-tech">automation_leads</code>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadDashboardData}
            className="p-2.5 rounded-xl bg-[#142332] hover:bg-[#2b5b84] text-slate-300 hover:text-white border border-[#2b5b84] transition-all cursor-pointer shadow-sm"
            title="Actualizar métricas"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/admin/leads')}
            className="px-5 py-2.5 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-bold text-xs inline-flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <span>Ver Tabla de Leads</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Alert Banner for Pending Leads */}
      {metrics.pendingCount > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-300 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-bold block text-white text-sm">
                ¡Tienes {metrics.pendingCount} solicitud{metrics.pendingCount > 1 ? 'es' : ''} pendiente{metrics.pendingCount > 1 ? 's' : ''} de atención!
              </span>
              <span>Revisa y asigna responsable a las nuevas solicitudes recibidas desde el formulario web.</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/admin/leads')}
            className="px-4 py-2 rounded-xl bg-amber-400 text-[#111d28] font-bold text-xs shrink-0 cursor-pointer hover:bg-amber-300 shadow"
          >
            Atender Ahora
          </button>
        </div>
      )}

      {/* Alert Banner for Overdue Follow-ups */}
      {metrics.overdueFollowUpsCount > 0 && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/40 text-rose-300 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-bold block text-white text-sm">
                ¡Atención! Tienes {metrics.overdueFollowUpsCount} fecha{metrics.overdueFollowUpsCount > 1 ? 's' : ''} de seguimiento vencida{metrics.overdueFollowUpsCount > 1 ? 's' : ''}!
              </span>
              <span>Revisa los compromisos de contacto que requerían atención previa.</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/admin/leads')}
            className="px-4 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs shrink-0 cursor-pointer hover:bg-rose-600 shadow"
          >
            Ver Seguimientos Vencidos
          </button>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Leads */}
        <div className="p-5 rounded-2xl bg-[#1b3852] border border-[#2b5b84] flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech text-slate-400 font-bold">TOTAL LEADS</span>
            <div className="p-2 rounded-xl bg-[#142332] text-sky-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-white">{metrics.totalLeads}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Solicitudes registradas</span>
          </div>
        </div>

        {/* Pendientes */}
        <div className="p-5 rounded-2xl bg-[#1b3852] border border-[#2b5b84] flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech text-slate-400 font-bold">PENDIENTES</span>
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-amber-400">{metrics.pendingCount}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Requieren primera respuesta</span>
          </div>
        </div>

        {/* Cotizaciones Enviadas */}
        <div className="p-5 rounded-2xl bg-[#1b3852] border border-[#2b5b84] flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech text-slate-400 font-bold">COTIZACIÓN ENVIADA</span>
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-purple-400">{metrics.proposalSentCount}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Propuestas en evaluación</span>
          </div>
        </div>

        {/* Pipeline Estimado */}
        <div className="p-5 rounded-2xl bg-[#1b3852] border border-[#ffd343]/40 flex flex-col justify-between shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#ffd343]/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech text-[#ffd343] font-bold">PIPELINE ESTIMADO</span>
            <div className="p-2 rounded-xl bg-[#ffd343]/20 text-[#ffd343]">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#ffd343]">
              ${metrics.estimatedPipelineValue.toLocaleString('es-CO')}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Valor acumulado activo</span>
          </div>
        </div>

      </div>

      {/* Secondary Status Counts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-[#142332] border border-[#2b5b84] flex items-center justify-between text-xs">
          <span className="text-slate-400">Contactados:</span>
          <span className="font-bold text-sky-400 font-mono-tech">{metrics.contactedCount}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#142332] border border-[#2b5b84] flex items-center justify-between text-xs">
          <span className="text-slate-400">Calificados:</span>
          <span className="font-bold text-indigo-400 font-mono-tech">{metrics.qualifiedCount}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#142332] border border-emerald-500/30 flex items-center justify-between text-xs">
          <span className="text-slate-400">Ganados (Clientes):</span>
          <span className="font-bold text-emerald-400 font-mono-tech flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5" />
            {metrics.wonCount}
          </span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#142332] border border-rose-500/30 flex items-center justify-between text-xs">
          <span className="text-slate-400">Perdidos:</span>
          <span className="font-bold text-rose-400 font-mono-tech">{metrics.lostCount}</span>
        </div>
      </div>

      {/* 2-Column Main Workspace Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 Cols): Recent 5 Leads */}
        <div className="lg:col-span-8 bg-[#1b3852] rounded-3xl border border-[#2b5b84] p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-[#2b5b84] pb-4">
            <div className="flex items-center gap-2.5">
              <Users className="w-5 h-5 text-[#ffd343]" />
              <h2 className="text-base font-bold text-white">Últimas Solicitudes Recibidas</h2>
            </div>
            <button
              onClick={() => navigate('/admin/leads')}
              className="text-xs text-[#ffd343] hover:underline font-bold font-mono-tech"
            >
              Ver todos ({metrics.totalLeads}) →
            </button>
          </div>

          {metrics.recentLeads.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-300 space-y-3 bg-[#142332] p-6 rounded-2xl border border-[#2b5b84]">
              <div className="font-bold text-[#ffd343] text-sm">No se encontraron leads visibles</div>
              <p className="max-w-md mx-auto leading-relaxed text-slate-400">
                Si tu tabla <code className="text-white font-mono-tech">public.automation_leads</code> ya contiene solicitudes pero el panel indica 0, ejecuta el script de migración SQL <code className="text-[#ffd343] font-mono-tech">docs/supabase-admin-crm-migration.sql</code> en el SQL Editor de Supabase para otorgar permisos RLS de lectura a tu usuario autenticado.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {metrics.recentLeads.map((lead) => {
                const statusMeta = LEAD_STATUS_LABELS[lead.status as keyof typeof LEAD_STATUS_LABELS] || LEAD_STATUS_LABELS.pending;
                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="p-4 rounded-2xl bg-[#142332] border border-[#2b5b84] hover:border-[#ffd343]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white group-hover:text-[#ffd343] transition-colors">
                          {lead.full_name}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold border ${statusMeta.bgClass} ${statusMeta.textClass}`}>
                          {statusMeta.label}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1 text-slate-300">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          {lead.company_name || 'Sin empresa'}
                        </span>
                        <span>•</span>
                        <span>{lead.sector || 'General'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 text-xs border-t sm:border-t-0 pt-2 sm:pt-0 border-[#2b5b84]">
                      <span className="text-slate-400 font-mono-tech">
                        {new Date(lead.created_at).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#ffd343]" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column (4 Cols): Upcoming Follow-ups */}
        <div className="lg:col-span-4 bg-[#1b3852] rounded-3xl border border-[#2b5b84] p-6 shadow-xl space-y-5">
          <div className="flex items-center gap-2.5 border-b border-[#2b5b84] pb-4">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">Próximos Seguimientos</h2>
          </div>

          {metrics.upcomingFollowUps.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400 leading-relaxed">
              No hay fechas de seguimiento agendadas en los leads activos.
            </div>
          ) : (
            <div className="space-y-3">
              {metrics.upcomingFollowUps.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="p-3.5 rounded-xl bg-[#142332] border border-[#2b5b84] hover:border-emerald-500/50 transition-all space-y-1.5 cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{lead.full_name}</span>
                    <span className="text-emerald-400 font-mono-tech font-bold text-[11px] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(lead.next_follow_up_at!).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{lead.company_name || 'Sin empresa'}</span>
                    <span className="text-slate-300 font-mono-tech">
                      {lead.assigned_to ? `@${lead.assigned_to}` : 'Sin asignar'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Side Drawer Detail View */}
      {selectedLead && (
        <AdminLeadDetailDrawer
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={loadDashboardData}
        />
      )}

    </div>
  );
};
