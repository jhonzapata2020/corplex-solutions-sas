import { supabase } from '../lib/supabase';
import type {
  AutomationLeadEntity,
  LeadDashboardMetrics,
  LeadActivityItem,
  AdminLeadStatus
} from '../types/lead';

/**
 * Consulta de métricas en tiempo real desde Supabase para el Dashboard CRM
 */
export async function fetchLeadMetrics(): Promise<LeadDashboardMetrics> {
  let leadsData: AutomationLeadEntity[] = [];

  // Intento 1: Consulta ordenada por fecha de creación
  let { data: leads, error } = await supabase
    .from('automation_leads')
    .select('*')
    .order('created_at', { ascending: false });

  // Intento 2 Fallback: Consulta simple sin orden por si el esquema varía
  if (error || !leads) {
    console.warn('Reintentando consulta de leads sin ordenamiento:', error);
    const retry = await supabase.from('automation_leads').select('*');
    if (retry.error) {
      console.error('Error definitivo consultando automation_leads:', retry.error);
      throw retry.error;
    }
    leadsData = (retry.data || []) as AutomationLeadEntity[];
  } else {
    leadsData = leads as AutomationLeadEntity[];
  }

  let pendingCount = 0;
  let contactedCount = 0;
  let qualifiedCount = 0;
  let proposalSentCount = 0;
  let wonCount = 0;
  let lostCount = 0;
  let overdueFollowUpsCount = 0;
  let estimatedPipelineValue = 0;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  leadsData.forEach((lead) => {
    const status = (lead.status || 'pending').toLowerCase();

    if (status === 'pending') pendingCount++;
    else if (status === 'contacted') contactedCount++;
    else if (status === 'qualified') qualifiedCount++;
    else if (status === 'proposal_sent') proposalSentCount++;
    else if (status === 'won') wonCount++;
    else if (status === 'lost') lostCount++;

    // Sumar al pipeline estimado los negocios activos (excluyendo lost)
    if (status !== 'lost' && lead.estimated_value) {
      estimatedPipelineValue += Number(lead.estimated_value) || 0;
    }

    // Calcular seguimientos vencidos (fecha pasada y estado no finalizado)
    if (lead.next_follow_up_at && status !== 'won' && status !== 'lost') {
      const followUpDate = new Date(lead.next_follow_up_at);
      if (followUpDate < todayStart) {
        overdueFollowUpsCount++;
      }
    }
  });

  const recentLeads = leadsData.slice(0, 5);

  const upcomingFollowUps = leadsData
    .filter((lead) => lead.next_follow_up_at && (lead.status || '').toLowerCase() !== 'won' && (lead.status || '').toLowerCase() !== 'lost')
    .sort((a, b) => new Date(a.next_follow_up_at!).getTime() - new Date(b.next_follow_up_at!).getTime())
    .slice(0, 5);

  return {
    totalLeads: leadsData.length,
    pendingCount,
    contactedCount,
    qualifiedCount,
    proposalSentCount,
    wonCount,
    lostCount,
    overdueFollowUpsCount,
    estimatedPipelineValue,
    recentLeads,
    upcomingFollowUps
  };
}

export interface FetchAdminLeadsOptions {
  searchTerm?: string;
  statusFilter?: string;
  sectorFilter?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: 'created_at' | 'next_follow_up_at' | 'estimated_value';
  sortAscending?: boolean;
  page?: number;
  pageSize?: number;
}

/**
 * Consulta de leads con filtros por fecha, sector, estado, ordenamiento y paginación
 */
export async function fetchAdminLeads(options: FetchAdminLeadsOptions = {}) {
  const {
    searchTerm = '',
    statusFilter = 'ALL',
    sectorFilter = 'ALL',
    startDate = '',
    endDate = '',
    sortBy = 'created_at',
    sortAscending = false,
    page = 1,
    pageSize = 10
  } = options;

  let query = supabase.from('automation_leads').select('*', { count: 'exact' });

  if (statusFilter !== 'ALL') {
    query = query.eq('status', statusFilter);
  }

  if (sectorFilter !== 'ALL') {
    query = query.eq('sector', sectorFilter);
  }

  if (startDate) {
    query = query.gte('created_at', `${startDate}T00:00:00.000Z`);
  }

  if (endDate) {
    query = query.lte('created_at', `${endDate}T23:59:59.999Z`);
  }

  if (searchTerm.trim().length > 0) {
    const term = `%${searchTerm.trim()}%`;
    query = query.or(`full_name.ilike.${term},company_name.ilike.${term},email.ilike.${term},phone.ilike.${term}`);
  }

  try {
    query = query.order(sortBy, { ascending: sortAscending });
  } catch {
    // Continuar si la columna no permite ordenamiento directo
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  query = query.range(from, to);

  const { data, count, error } = await query;

  if (error) {
    console.error('Error consultando tabla de leads desde Supabase:', error);
    throw error;
  }

  return {
    leads: (data || []) as AutomationLeadEntity[],
    totalCount: count || 0,
    page,
    pageSize,
    totalPages: Math.ceil((count || 0) / pageSize)
  };
}

/**
 * Actualización administrativa de un lead y registro de auditoría en lead_activity
 */
export async function updateAdminLead(
  id: string,
  updates: {
    status?: AdminLeadStatus | string;
    assigned_to?: string | null;
    notes?: string | null;
    estimated_value?: number | null;
    next_follow_up_at?: string | null;
    last_contacted_at?: string | null;
  },
  previousLead?: AutomationLeadEntity
) {
  const { data, error } = await supabase
    .from('automation_leads')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error actualizando lead en Supabase:', error);
    throw error;
  }

  // Registrar auditoría en lead_activity
  try {
    const session = (await supabase.auth.getSession()).data.session;
    let actionText = 'Lead actualizado';
    if (updates.status && previousLead?.status !== updates.status) {
      actionText = `Estado cambiado de "${previousLead?.status || 'pending'}" a "${updates.status}"`;
    } else if (updates.estimated_value !== undefined && previousLead?.estimated_value !== updates.estimated_value) {
      actionText = `Valor estimado actualizado a $${Number(updates.estimated_value).toLocaleString('es-CO')}`;
    } else if (updates.assigned_to !== undefined) {
      actionText = `Responsable asignado a @${updates.assigned_to || 'Sin asignar'}`;
    } else if (updates.notes) {
      actionText = 'Nota comercial agregada';
    }

    await supabase.from('lead_activity').insert([
      {
        automation_lead_id: id,
        user_id: session?.user?.id,
        user_email: session?.user?.email,
        action: actionText,
        previous_value: previousLead ? { status: previousLead.status, notes: previousLead.notes, assigned_to: previousLead.assigned_to, estimated_value: previousLead.estimated_value } : null,
        new_value: updates
      }
    ]);
  } catch (err) {
    console.warn('Nota: No se pudo escribir log de auditoría en lead_activity:', err);
  }

  return data as AutomationLeadEntity;
}

/**
 * Consulta de historial de actividad para un lead específico
 */
export async function fetchLeadActivity(leadId: string): Promise<LeadActivityItem[]> {
  try {
    const { data, error } = await supabase
      .from('lead_activity')
      .select('*')
      .eq('automation_lead_id', leadId)
      .order('created_at', { ascending: false });

    if (error) return [];
    return (data || []) as LeadActivityItem[];
  } catch {
    return [];
  }
}
