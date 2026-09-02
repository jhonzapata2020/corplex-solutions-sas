import React, { useEffect, useState, useCallback } from 'react';
import { fetchNotifications, markNotificationAsRead, markAllNotificationsAsRead, fetchFollowUpTasks, updateTaskStatus } from '../../services/notificationService';
import type { NotificationEntity, FollowUpTaskEntity, AutomationLeadEntity } from '../../types/lead';
import { AdminLeadDetailDrawer } from './AdminLeadDetailDrawer';
import {
  Bell,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  UserCheck,
  Calendar,
  Building2,
  ChevronRight
} from 'lucide-react';

export const AdminNotifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'tasks'>('notifications');

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationEntity[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Tasks State
  const [tasks, setTasks] = useState<FollowUpTaskEntity[]>([]);
  const [pendingTasksCount, setPendingTasksCount] = useState(0);
  const [overdueTasksCount, setOverdueTasksCount] = useState(0);

  // General Loading & Error State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Selected Lead for Detail Drawer
  const [selectedLead, setSelectedLead] = useState<AutomationLeadEntity | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const notifRes = await fetchNotifications();
      setNotifications(notifRes.notifications);
      setUnreadCount(notifRes.unreadCount);

      const taskRes = await fetchFollowUpTasks();
      setTasks(taskRes.tasks);
      setPendingTasksCount(taskRes.pendingCount);
      setOverdueTasksCount(taskRes.overdueCount);
    } catch (err) {
      console.error('Error cargando notificaciones y tareas:', err);
      setError('No se pudieron consultar las notificaciones desde Supabase.');
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
        const notifRes = await fetchNotifications();
        const taskRes = await fetchFollowUpTasks();
        if (isMounted) {
          setNotifications(notifRes.notifications);
          setUnreadCount(notifRes.unreadCount);
          setTasks(taskRes.tasks);
          setPendingTasksCount(taskRes.pendingCount);
          setOverdueTasksCount(taskRes.overdueCount);
        }
      } catch (err) {
        console.error('Error cargando datos de notificaciones:', err);
        if (isMounted) setError('No se pudieron consultar notificaciones.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    void init();
    return () => { isMounted = false; };
  }, []);

  const handleNotificationClick = async (notif: NotificationEntity) => {
    if (!notif.is_read) {
      await markNotificationAsRead(notif.id);
      setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, is_read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    }

    if (notif.automation_leads) {
      setSelectedLead(notif.automation_leads);
    }
  };

  const handleMarkAllRead = async () => {
    await markAllNotificationsAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    setUnreadCount(0);
  };

  const handleToggleTaskStatus = async (task: FollowUpTaskEntity) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    const updated = await updateTaskStatus(task.id, { status: newStatus });
    if (updated) {
      setTasks(prev => prev.map(t => t.id === task.id ? updated : t));
      loadData();
    }
  };

  const handleClaimTask = async (task: FollowUpTaskEntity, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = await updateTaskStatus(task.id, { assigned_to: 'mi_usuario' });
    if (updated) {
      setTasks(prev => prev.map(t => t.id === task.id ? updated : t));
    }
  };

  return (
    <div className="space-y-6 font-tech">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Centro de Notificaciones & Tareas
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Fase 2: Notificaciones automáticas de nuevos leads y tareas de seguimiento a 24 horas
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === 'notifications' && unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="px-3.5 py-2 rounded-xl bg-[#142332] hover:bg-[#2b5b84] text-[#ffd343] border border-[#2b5b84] text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              Marcar Todas Como Leídas
            </button>
          )}
          <button
            onClick={loadData}
            className="p-2.5 rounded-xl bg-[#142332] hover:bg-[#2b5b84] text-slate-300 hover:text-white border border-[#2b5b84] transition-all cursor-pointer shadow-sm"
            title="Actualizar notificaciones"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#1b3852] border border-[#2b5b84] max-w-md">
        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'notifications'
              ? 'bg-[#ffd343] text-[#111d28] shadow-md font-extrabold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notificaciones ({notifications.length})</span>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-mono-tech font-extrabold animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'tasks'
              ? 'bg-[#ffd343] text-[#111d28] shadow-md font-extrabold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Tareas ({tasks.length})</span>
          {pendingTasksCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-[#111d28] text-[10px] font-mono-tech font-extrabold">
              {pendingTasksCount}
            </span>
          )}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="bg-[#1b3852] rounded-3xl border border-[#2b5b84] p-6 shadow-xl space-y-4">
        
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#ffd343] animate-spin" />
            <span className="text-xs font-mono-tech text-slate-300">Cargando notificaciones desde Supabase...</span>
          </div>
        ) : error ? (
          <div className="py-12 text-center text-rose-300 text-xs space-y-3">
            <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto" />
            <p>{error}</p>
            <button
              onClick={loadData}
              className="px-4 py-2 rounded-xl bg-[#ffd343] text-[#111d28] font-bold text-xs cursor-pointer"
            >
              Reintentar
            </button>
          </div>
        ) : activeTab === 'notifications' ? (
          
          /* TAB 1: NOTIFICATIONS LIST */
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-xs space-y-3 max-w-md mx-auto">
                <Bell className="w-10 h-10 text-slate-500 mx-auto" />
                <p className="font-bold text-white text-base">No hay notificaciones registradas</p>
                <p className="leading-relaxed">
                  Si tu tabla <code className="text-white font-mono-tech">public.notifications</code> no tiene entradas, ejecuta el script de automatización <code className="text-[#ffd343] font-mono-tech">docs/supabase-phase2-notifications-migration.sql</code> en el SQL Editor de Supabase.
                </p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 group ${
                    !notif.is_read
                      ? 'bg-[#142332] border-[#ffd343]/60 shadow-md'
                      : 'bg-[#142332]/50 border-[#2b5b84]/50 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                      notif.status === 'failed'
                        ? 'bg-rose-500/20 text-rose-400'
                        : !notif.is_read
                          ? 'bg-[#ffd343]/20 text-[#ffd343]'
                          : 'bg-[#2b5b84]/30 text-slate-400'
                    }`}>
                      <Bell className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white group-hover:text-[#ffd343] transition-colors">
                          {notif.title}
                        </span>
                        {!notif.is_read && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono-tech font-extrabold bg-rose-500 text-white animate-pulse">
                            NUEVA
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono-tech font-bold bg-[#1b3852] text-slate-300 border border-[#2b5b84]">
                          Canal: {notif.channel || 'system'}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono-tech font-bold border ${
                          notif.status === 'sent' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                          notif.status === 'pending' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                          'bg-rose-500/20 text-rose-400 border-rose-500/40'
                        }`}>
                          Estado: {notif.status}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {notif.message}
                      </p>

                      {notif.automation_leads && (
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                          <span className="flex items-center gap-1 text-slate-300 font-bold">
                            <Building2 className="w-3 h-3 text-slate-400" />
                            {notif.automation_leads.company_name || 'Sin empresa'}
                          </span>
                          <span>•</span>
                          <span>Sector: {notif.automation_leads.sector || 'General'}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-[11px] font-mono-tech text-slate-400">
                      {new Date(notif.created_at).toLocaleDateString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#ffd343]" />
                  </div>
                </div>
              ))
            )}
          </div>

        ) : (

          /* TAB 2: FOLLOW-UP TASKS LIST */
          <div className="space-y-3">
            {overdueTasksCount > 0 && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-between gap-3 font-tech">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Tienes <strong>{overdueTasksCount}</strong> tarea(s) de seguimiento vencida(s).</span>
                </div>
              </div>
            )}

            {tasks.length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-xs space-y-3 max-w-md mx-auto">
                <Clock className="w-10 h-10 text-slate-500 mx-auto" />
                <p className="font-bold text-white text-base">No hay tareas de seguimiento registradas</p>
                <p className="leading-relaxed">
                  Las tareas de contacto inicial a 24 horas se generarán automáticamente al recibir un lead público si el trigger de Supabase está activo.
                </p>
              </div>
            ) : (
              tasks.map((task) => {
                const isTaskCompleted = task.status === 'completed';
                const isOverdue = new Date(task.due_date) < new Date() && !isTaskCompleted;

                return (
                  <div
                    key={task.id}
                    onClick={() => {
                      if (task.automation_leads) setSelectedLead(task.automation_leads);
                    }}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group ${
                      isTaskCompleted
                        ? 'bg-[#142332]/40 border-[#2b5b84]/30 opacity-75'
                        : isOverdue
                          ? 'bg-rose-500/10 border-rose-500/50'
                          : 'bg-[#142332] border-[#2b5b84] hover:border-[#ffd343]/50'
                    }`}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleTaskStatus(task);
                          }}
                          className={`p-1.5 rounded-lg border cursor-pointer transition-colors ${
                            isTaskCompleted
                              ? 'bg-emerald-500 text-[#111d28] border-emerald-400'
                              : 'bg-[#1b3852] text-slate-400 hover:text-white border-[#2b5b84]'
                          }`}
                          title={isTaskCompleted ? 'Marcar como pendiente' : 'Marcar como completada'}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>

                        <span className={`font-bold text-sm ${isTaskCompleted ? 'line-through text-slate-400' : 'text-white group-hover:text-[#ffd343]'}`}>
                          {task.title}
                        </span>

                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold border ${
                          isTaskCompleted
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                            : isOverdue
                              ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                              : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        }`}>
                          {isTaskCompleted ? 'COMPLETADA' : isOverdue ? '¡VENCIDA!' : 'PENDIENTE'}
                        </span>
                      </div>

                      {task.description && (
                        <p className="text-xs text-slate-300 leading-relaxed font-sans italic pl-8">
                          "{task.description}"
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pl-8 pt-1">
                        <span className="flex items-center gap-1 font-mono-tech text-emerald-400 font-bold">
                          <Calendar className="w-3.5 h-3.5" />
                          Vence: {new Date(task.due_date).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span>•</span>
                        <span className="font-mono-tech text-slate-300">
                          {task.assigned_to ? `@${task.assigned_to}` : <span className="text-amber-400 font-bold">Sin asignar</span>}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#2b5b84]">
                      {!task.assigned_to && !isTaskCompleted && (
                        <button
                          onClick={(e) => handleClaimTask(task, e)}
                          className="px-3 py-1.5 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-bold text-xs inline-flex items-center gap-1 shadow cursor-pointer"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Tomar Tarea</span>
                        </button>
                      )}

                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#ffd343]" />
                    </div>
                  </div>
                );
              })
            )}
          </div>

        )}

      </div>

      {/* Side Drawer Detail View */}
      {selectedLead && (
        <AdminLeadDetailDrawer
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={loadData}
        />
      )}

    </div>
  );
};
