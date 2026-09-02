import { supabase } from '../lib/supabase';
import type { NotificationEntity, FollowUpTaskEntity } from '../types/lead';

/**
 * Consulta de notificaciones internas del sistema para usuarios administrativos
 */
export async function fetchNotifications(): Promise<{
  notifications: NotificationEntity[];
  unreadCount: number;
}> {
  try {
    const session = (await supabase.auth.getSession()).data.session;
    const userId = session?.user?.id;

    let query = supabase
      .from('notifications')
      .select('*, automation_leads(*)')
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.or(`user_id.is.null,target_role.eq.admin,user_id.eq.${userId}`);
    } else {
      query = query.or('user_id.is.null,target_role.eq.admin');
    }

    const { data, error } = await query;

    if (error) {
      console.warn('Advertencia consultando notificaciones (comprobar RLS / migración Fase 2):', error);
      return { notifications: [], unreadCount: 0 };
    }

    const notifications = (data || []) as NotificationEntity[];
    const unreadCount = notifications.filter(n => !n.is_read).length;

    return { notifications, unreadCount };
  } catch (err) {
    console.warn('Excepción al obtener notificaciones:', err);
    return { notifications: [], unreadCount: 0 };
  }
}

/**
 * Marcar una notificación específica como leída
 */
export async function markNotificationAsRead(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);

    if (error) {
      console.error('Error al marcar notificación como leída:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Excepción marcando notificación:', err);
    return false;
  }
}

/**
 * Marcar todas las notificaciones como leídas
 */
export async function markAllNotificationsAsRead(): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('is_read', false);

    if (error) {
      console.error('Error al marcar todas las notificaciones como leídas:', error);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Consulta de tareas de seguimiento automático
 */
export async function fetchFollowUpTasks(): Promise<{
  tasks: FollowUpTaskEntity[];
  pendingCount: number;
  overdueCount: number;
}> {
  try {
    const { data, error } = await supabase
      .from('follow_up_tasks')
      .select('*, automation_leads(*)')
      .order('due_date', { ascending: true });

    if (error) {
      console.warn('Advertencia consultando tareas (comprobar RLS / migración Fase 2):', error);
      return { tasks: [], pendingCount: 0, overdueCount: 0 };
    }

    const tasks = (data || []) as FollowUpTaskEntity[];
    const today = new Date();

    let pendingCount = 0;
    let overdueCount = 0;

    tasks.forEach(t => {
      if (t.status === 'pending' || t.status === 'in_progress') {
        pendingCount++;
        if (new Date(t.due_date) < today) {
          overdueCount++;
        }
      }
    });

    return { tasks, pendingCount, overdueCount };
  } catch {
    return { tasks: [], pendingCount: 0, overdueCount: 0 };
  }
}

/**
 * Actualización de estado o asignación de una tarea de seguimiento
 */
export async function updateTaskStatus(
  id: string,
  updates: {
    status?: 'pending' | 'in_progress' | 'completed' | 'overdue' | 'cancelled';
    assigned_to?: string | null;
  }
): Promise<FollowUpTaskEntity | null> {
  try {
    const payload: Record<string, unknown> = { ...updates };
    if (updates.status === 'completed') {
      payload.completed_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('follow_up_tasks')
      .update(payload)
      .eq('id', id)
      .select('*, automation_leads(*)')
      .single();

    if (error) {
      console.error('Error actualizando estado de tarea:', error);
      return null;
    }

    return data as FollowUpTaskEntity;
  } catch (err) {
    console.error('Excepción actualizando tarea:', err);
    return null;
  }
}
