import { supabase } from '../lib/supabase';
import type {
  SupportTicketEntity,
  SupportTicketNoteEntity,
  TicketStatus,
  TicketSeverity
} from '../types/lead';

/**
 * Consulta de tickets de soporte TI con clientes, proyectos y notas vinculadas
 */
export async function fetchSupportTickets(): Promise<{
  tickets: SupportTicketEntity[];
  totalTickets: number;
  openCount: number;
  inProgressCount: number;
  resolvedCount: number;
  criticalSlaCount: number;
}> {
  try {
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*, clients(*), projects(*), support_ticket_notes(*)')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Advertencia consultando tickets (comprobar RLS / migración Fase 5):', error);
      return {
        tickets: [],
        totalTickets: 0,
        openCount: 0,
        inProgressCount: 0,
        resolvedCount: 0,
        criticalSlaCount: 0
      };
    }

    const tickets = (data || []) as SupportTicketEntity[];
    let openCount = 0;
    let inProgressCount = 0;
    let resolvedCount = 0;
    let criticalSlaCount = 0;

    tickets.forEach(t => {
      if (t.status === 'open') {
        openCount++;
      } else if (t.status === 'in_progress') {
        inProgressCount++;
      } else if (t.status === 'resolved' || t.status === 'closed') {
        resolvedCount++;
      }

      // Tickets con SLA Crítico (< 2h o Severidad Crítica)
      if (t.severity === 'critical' && t.status !== 'resolved' && t.status !== 'closed') {
        criticalSlaCount++;
      }
    });

    return {
      tickets,
      totalTickets: tickets.length,
      openCount,
      inProgressCount,
      resolvedCount,
      criticalSlaCount
    };
  } catch {
    return {
      tickets: [],
      totalTickets: 0,
      openCount: 0,
      inProgressCount: 0,
      resolvedCount: 0,
      criticalSlaCount: 0
    };
  }
}

/**
 * Registro de nuevo ticket de soporte TI
 */
export async function createSupportTicket(params: {
  clientId?: string | null;
  projectId?: string | null;
  title: string;
  description?: string | null;
  severity: TicketSeverity;
  assignedTo?: string | null;
}): Promise<SupportTicketEntity | null> {
  try {
    const { data, error } = await supabase
      .from('support_tickets')
      .insert([
        {
          client_id: params.clientId || null,
          project_id: params.projectId || null,
          title: params.title.trim(),
          description: params.description?.trim() || null,
          severity: params.severity,
          status: 'open',
          assigned_to: params.assignedTo?.trim() || '@soporte_ti',
          total_hours_spent: 0.0
        }
      ])
      .select('*, clients(*), projects(*)')
      .single();

    if (error || !data) {
      console.error('Error creando ticket:', error);
      return null;
    }

    return data as SupportTicketEntity;
  } catch {
    return null;
  }
}

/**
 * Actualizar estado de un ticket de soporte TI
 */
export async function updateSupportTicketStatus(
  ticketId: string,
  newStatus: TicketStatus
): Promise<boolean> {
  try {
    const payload: Record<string, unknown> = {
      status: newStatus,
      updated_at: new Date().toISOString()
    };

    if (newStatus === 'resolved' || newStatus === 'closed') {
      payload.resolved_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('support_tickets')
      .update(payload)
      .eq('id', ticketId);

    return !error;
  } catch {
    return false;
  }
}

/**
 * Agregar nota de resolución e incrementar horas dedicadas (hours_spent)
 */
export async function addSupportTicketNote(
  ticketId: string,
  noteText: string,
  hoursSpent: number
): Promise<SupportTicketNoteEntity | null> {
  try {
    const session = (await supabase.auth.getSession()).data.session;
    const userEmail = session?.user?.email || 'soporte@corplex.co';

    // 1. Insertar nota
    const { data: createdNote, error: noteErr } = await supabase
      .from('support_ticket_notes')
      .insert([
        {
          ticket_id: ticketId,
          user_email: userEmail,
          note: noteText.trim(),
          hours_spent: hoursSpent || 0.0
        }
      ])
      .select('*')
      .single();

    if (noteErr || !createdNote) {
      console.error('Error guardando nota de soporte:', noteErr);
      return null;
    }

    // 2. Recalcular horas totales acumuladas en el ticket
    const { data: allNotes } = await supabase
      .from('support_ticket_notes')
      .select('hours_spent')
      .eq('ticket_id', ticketId);

    if (allNotes) {
      const sumHours = allNotes.reduce((acc, curr) => acc + (Number(curr.hours_spent) || 0), 0);
      await supabase
        .from('support_tickets')
        .update({ total_hours_spent: sumHours, updated_at: new Date().toISOString() })
        .eq('id', ticketId);
    }

    return createdNote as SupportTicketNoteEntity;
  } catch {
    return null;
  }
}

/**
 * Consulta de notas de un ticket
 */
export async function fetchTicketNotes(ticketId: string): Promise<SupportTicketNoteEntity[]> {
  try {
    const { data, error } = await supabase
      .from('support_ticket_notes')
      .select('*')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: false });

    if (error) return [];
    return (data || []) as SupportTicketNoteEntity[];
  } catch {
    return [];
  }
}
