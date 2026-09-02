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
  const { data: leads, error } = await supabase
    .from('automation_leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error cargando leads para métricas CRM:', error);
    throw error;
  }

  const allLeads = (leads || []) as AutomationLeadEntity[];

  let pendingCount = 0;
  let contactedCount = 0;
  let qualifiedCount = 0;
  let proposalSentCount = 0;
  let wonCount = 0;
  let lostCount = 0;
  let estimatedPipelineValue = 0;

  allLeads.forEach((lead) => {
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
  });

  const recentLeads = allLeads.slice(0, 5);

  const upcomingFollowUps = allLeads
    .filter((lead) => lead.next_follow_up_at && (lead.status || '').toLowerCase() !== 'won' && (lead.status || '').toLowerCase() !== 'lost')
    .sort((a, b) => new Date(a.next_follow_up_at!).getTime() - new Date(b.next_follow_up_at!).getTime())
    .slice(0, 5);

  return {
    totalLeads: allLeads.length,
    pendingCount,
    contactedCount,
    qualifiedCount,
    proposalSentCount,
    wonCount,
    lostCount,
    estimatedPipelineValue,
    recentLeads,
    upcomingFollowUps
  };
}

export interface FetchAdminLeadsOptions {
  searchTerm?: string;
  statusFilter?: string;
  sectorFilter?: string;
  sortBy?: 'created_at' | 'next_follow_up_at' | 'estimated_value';
  sortAscending?: boolean;
  page?: number;
  pageSize?: number;
}

/**
 * Consulta de leads con filtros, ordenamiento y paginación
 */
export async function fetchAdminLeads(options: FetchAdminLeadsOptions = {}) {
  const {
    searchTerm = '',
    statusFilter = 'ALL',
    sectorFilter = 'ALL',
    sortBy = 'created_at',
    sortAscending = false,
    page = 1,
    pageSize = 15
  } = options;

  let query = supabase.from('automation_leads').select('*', { count: 'exact' });

  if (statusFilter !== 'ALL') {
    query = query.eq('status', statusFilter);
  }

  if (sectorFilter !== 'ALL') {
    query = query.eq('sector', sectorFilter);
  }

  if (searchTerm.trim().length > 0) {
    const term = `%${searchTerm.trim()}%`;
    query = query.or(`full_name.ilike.${term},company_name.ilike.${term},email.ilike.${term},phone.ilike.${term}`);
  }

  query = query.order(sortBy, { ascending: sortAscending });

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  query = query.range(from, to);

  const { data, count, error } = await query;

  if (error) {
    console.error('Error consultando tabla de leads:', error);
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
 * Actualización administrativa de un lead y registro de auditoría
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

  // Registrar auditoría en lead_activity si existe la tabla
  try {
    const session = (await supabase.auth.getSession()).data.session;
    await supabase.from('lead_activity').insert([
      {
        automation_lead_id: id,
        user_id: session?.user?.id,
        user_email: session?.user?.email,
        action: updates.status ? `Estado cambiado a ${updates.status}` : 'Lead actualizado',
        previous_value: previousLead ? { status: previousLead.status, notes: previousLead.notes, assigned_to: previousLead.assigned_to } : null,
        new_value: updates
      }
    ]);
  } catch (err) {
    // Audit logging es secundario, no bloquea la actualización principal
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
