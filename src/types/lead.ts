/**
 * Contrato de Tipos para la Gestión de Leads de Corplex AI Automation
 */

export type LeadFormData = {
  fullName: string;
  email?: string;
  phone?: string;
  contactDetail?: string;
  companyName?: string;
  company?: string;
  sector?: string;
  operationVolume?: string;
  bottleneckDescription?: string;
  bottleneck?: string;
  estimatedRoiHours?: number | string;
  selectedPackage?: string;
};

/**
 * Payload enviado desde el formulario de primer contacto
 */
export type AutomationLeadPayload = LeadFormData & {
  fullName: string;
  company?: string;
  contactDetail?: string;
  bottleneck?: string;
};

/**
 * Respuesta devuelta por el servicio de captación
 */
export type LeadSubmissionResult = {
  success: boolean;
  leadId?: string;
  message: string;
  timestamp?: string;
  isDemonstrationMode?: boolean;
  errorDetails?: string;
  data?: unknown;
};

/**
 * Valores técnicos de estados comerciales de un lead
 */
export type AdminLeadStatus = 
  | 'pending'
  | 'contacted'
  | 'qualified'
  | 'proposal_sent'
  | 'won'
  | 'lost';

/**
 * Etiquetas visuales en español para los estados
 */
export const LEAD_STATUS_LABELS: Record<AdminLeadStatus, { label: string; bgClass: string; textClass: string }> = {
  pending: { label: 'Pendiente', bgClass: 'bg-amber-500/20 border-amber-500/40', textClass: 'text-amber-400' },
  contacted: { label: 'Contactado', bgClass: 'bg-sky-500/20 border-sky-500/40', textClass: 'text-sky-400' },
  qualified: { label: 'Calificado', bgClass: 'bg-indigo-500/20 border-indigo-500/40', textClass: 'text-indigo-400' },
  proposal_sent: { label: 'Cotización enviada', bgClass: 'bg-purple-500/20 border-purple-500/40', textClass: 'text-purple-400' },
  won: { label: 'Ganado', bgClass: 'bg-emerald-500/20 border-emerald-500/40', textClass: 'text-emerald-400' },
  lost: { label: 'Perdido', bgClass: 'bg-rose-500/20 border-rose-500/40', textClass: 'text-rose-400' }
};

/**
 * Esquema de entidad completo para la tabla 'automation_leads' en Supabase
 */
export type AutomationLeadEntity = {
  id: string;
  full_name: string;
  company_name?: string;
  contact_detail?: string;
  email?: string;
  phone?: string;
  sector?: string;
  selected_package?: string;
  operation_volume?: string;
  bottleneck_description?: string;
  source: string;
  status: AdminLeadStatus | string;
  created_at: string;
  assigned_to?: string | null;
  notes?: string | null;
  estimated_value?: number | null;
  next_follow_up_at?: string | null;
  last_contacted_at?: string | null;
};

/**
 * Modelo de actividad para auditoría (lead_activity)
 */
export type LeadActivityItem = {
  id: string;
  automation_lead_id: string;
  user_id?: string;
  user_email?: string;
  action: string;
  previous_value?: Record<string, unknown> | null;
  new_value?: Record<string, unknown> | null;
  created_at: string;
};

/**
 * Métricas calculadas para el Dashboard CRM
 */
export type LeadDashboardMetrics = {
  totalLeads: number;
  pendingCount: number;
  contactedCount: number;
  qualifiedCount: number;
  proposalSentCount: number;
  wonCount: number;
  lostCount: number;
  overdueFollowUpsCount: number;
  estimatedPipelineValue: number;
  recentLeads: AutomationLeadEntity[];
  upcomingFollowUps: AutomationLeadEntity[];
};

/**
 * Modelo de Notificación Interna (notifications)
 */
export type NotificationEntity = {
  id: string;
  automation_lead_id?: string | null;
  user_id?: string | null;
  target_role: string;
  type: 'new_lead' | 'overdue_followup' | 'status_changed' | string;
  title: string;
  message: string;
  channel: 'system' | 'email' | 'whatsapp' | string;
  status: 'pending' | 'sent' | 'failed' | string;
  is_read: boolean;
  error_message?: string | null;
  created_at: string;
  sent_at?: string | null;
  automation_leads?: AutomationLeadEntity | null;
};

/**
 * Modelo de Tarea de Seguimiento Automático (follow_up_tasks)
 */
export type FollowUpTaskEntity = {
  id: string;
  automation_lead_id: string;
  task_type: string;
  assigned_to?: string | null;
  title: string;
  description?: string | null;
  due_date: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue' | 'cancelled';
  created_at: string;
  completed_at?: string | null;
  automation_leads?: AutomationLeadEntity | null;
};

/**
 * Estados de Cotización Comercial
 */
export type QuoteStatus = 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired' | 'cancelled';

/**
 * Modelo de Encabezado de Cotización (quotes)
 */
export type QuoteEntity = {
  id: string;
  automation_lead_id?: string | null;
  quote_number: string;
  version_number: number;
  parent_quote_id?: string | null;
  status: QuoteStatus;
  client_name: string;
  client_company?: string | null;
  client_email?: string | null;
  client_phone?: string | null;
  client_sector?: string | null;
  tax_rate: number;
  subtotal: number;
  discount_total: number;
  taxable_subtotal: number;
  tax_amount: number;
  total: number;
  valid_until: string;
  payment_terms?: string | null;
  notes?: string | null;
  created_by?: string | null;
  created_at: string;
  updated_at: string;
  sent_at?: string | null;
  accepted_at?: string | null;
  rejected_at?: string | null;
  expired_at?: string | null;
  items?: QuoteItemEntity[];
  automation_leads?: AutomationLeadEntity | null;
};

/**
 * Modelo de Ítem / Servicio de Cotización (quote_items)
 */
export type QuoteItemEntity = {
  id?: string;
  quote_id?: string;
  concept: string;
  description?: string | null;
  quantity: number;
  unit_price: number;
  discount_percent: number;
  is_taxable: boolean;
  item_subtotal: number;
  created_at?: string;
};

/**
 * Modelo de Auditoría e Historial de Estados (quote_status_history)
 */
export type QuoteStatusHistoryEntity = {
  id: string;
  quote_id: string;
  previous_status?: string | null;
  new_status: QuoteStatus;
  user_email?: string | null;
  notes?: string | null;
  created_at: string;
};

/**
 * Metadatos visuales de estados de cotizaciones en español
 */
export const QUOTE_STATUS_LABELS: Record<QuoteStatus, { label: string; bgClass: string; textClass: string }> = {
  draft: { label: 'Borrador', bgClass: 'bg-slate-500/20 border-slate-500/40', textClass: 'text-slate-300' },
  sent: { label: 'Cotización enviada', bgClass: 'bg-purple-500/20 border-purple-500/40', textClass: 'text-purple-300' },
  viewed: { label: 'Propuesta vista', bgClass: 'bg-sky-500/20 border-sky-500/40', textClass: 'text-sky-300' },
  accepted: { label: 'Aceptada (Ganada)', bgClass: 'bg-emerald-500/20 border-emerald-500/40', textClass: 'text-emerald-400' },
  rejected: { label: 'Rechazada', bgClass: 'bg-rose-500/20 border-rose-500/40', textClass: 'text-rose-400' },
  expired: { label: 'Vencida', bgClass: 'bg-amber-500/20 border-amber-500/40', textClass: 'text-amber-400' },
  cancelled: { label: 'Cancelada', bgClass: 'bg-slate-700/40 border-slate-600/50', textClass: 'text-slate-400' }
};

/**
 * Modelo de Cliente Corporativo (clients)
 */
export type ClientEntity = {
  id: string;
  automation_lead_id?: string | null;
  quote_id?: string | null;
  client_code: string;
  company_name: string;
  legal_name?: string | null;
  nit_tax_id?: string | null;
  address?: string | null;
  city?: string | null;
  sector?: string | null;
  status: 'active' | 'inactive' | 'archived';
  created_at: string;
  updated_at: string;
  contacts?: ClientContactEntity[];
  projects?: ProjectEntity[];
};

/**
 * Modelo de Persona de Contacto del Cliente (client_contacts)
 */
export type ClientContactEntity = {
  id: string;
  client_id: string;
  full_name: string;
  role_title: string;
  email?: string | null;
  phone?: string | null;
  is_primary: boolean;
  is_active: boolean;
  created_at: string;
};

/**
 * Estados de Proyectos de Ingeniería
 */
export type ProjectStatus = 'planning' | 'in_progress' | 'review' | 'completed' | 'paused' | 'cancelled';

/**
 * Modelo de Proyecto de Ingeniería (projects)
 */
export type ProjectEntity = {
  id: string;
  client_id: string;
  quote_id?: string | null;
  automation_lead_id?: string | null;
  project_code: string;
  name: string;
  description?: string | null;
  contract_value: number; // Valor Contratado Acordado ($ COP)
  start_date: string;
  target_delivery_date?: string | null;
  actual_delivery_date?: string | null;
  status: ProjectStatus;
  assigned_lead_engineer?: string | null;
  completion_percentage: number;
  created_at: string;
  updated_at: string;
  client?: ClientEntity | null;
  tasks?: ProjectTaskEntity[];
};

/**
 * Modelo de Tarea de Proyecto (project_tasks)
 */
export type ProjectTaskEntity = {
  id: string;
  project_id: string;
  title: string;
  description?: string | null;
  assigned_to?: string | null;
  due_date?: string | null;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  completed_at?: string | null;
  created_at: string;
};

/**
 * Bitácora de Actividad del Proyecto (project_activity)
 */
export type ProjectActivityEntity = {
  id: string;
  project_id: string;
  user_email?: string | null;
  previous_status?: string | null;
  new_status?: string | null;
  action: string;
  notes?: string | null;
  created_at: string;
};

/**
 * Metadatos visuales de estados de proyectos
 */
export const PROJECT_STATUS_LABELS: Record<ProjectStatus, { label: string; bgClass: string; textClass: string }> = {
  planning: { label: 'Planificación', bgClass: 'bg-sky-500/20 border-sky-500/40', textClass: 'text-sky-300' },
  in_progress: { label: 'En Ejecución', bgClass: 'bg-indigo-500/20 border-indigo-500/40', textClass: 'text-indigo-300' },
  review: { label: 'En Revisión / QA', bgClass: 'bg-[#ffd343]/20 border-[#ffd343]/40', textClass: 'text-[#ffd343]' },
  completed: { label: 'Entregado / Finalizado', bgClass: 'bg-emerald-500/20 border-emerald-500/40', textClass: 'text-emerald-400' },
  paused: { label: 'Pausado', bgClass: 'bg-amber-500/20 border-amber-500/40', textClass: 'text-amber-400' },
  cancelled: { label: 'Cancelado', bgClass: 'bg-rose-500/20 border-rose-500/40', textClass: 'text-rose-400' }
};

/**
 * Severidad de Ticket de Soporte TI
 */
export type TicketSeverity = 'critical' | 'high' | 'medium' | 'low';

/**
 * Estado de Ticket de Soporte TI
 */
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

/**
 * Modelo de Ticket de Soporte TI / Mesa de Ayuda (support_tickets)
 */
export type SupportTicketEntity = {
  id: string;
  client_id?: string | null;
  project_id?: string | null;
  ticket_code: string;
  title: string;
  description?: string | null;
  severity: TicketSeverity;
  status: TicketStatus;
  assigned_to?: string | null;
  total_hours_spent: number;
  created_at: string;
  updated_at: string;
  resolved_at?: string | null;
  client?: ClientEntity | null;
  project?: ProjectEntity | null;
  notes?: SupportTicketNoteEntity[];
};

/**
 * Modelo de Nota / Resolución de Ticket (support_ticket_notes)
 */
export type SupportTicketNoteEntity = {
  id: string;
  ticket_id: string;
  user_email?: string | null;
  note: string;
  hours_spent: number;
  created_at: string;
};

/**
 * Metadatos visuales de Severidad de Tickets
 */
export const TICKET_SEVERITY_LABELS: Record<TicketSeverity, { label: string; bgClass: string; textClass: string }> = {
  critical: { label: 'Crítica (SLA < 2h)', bgClass: 'bg-rose-500/20 border-rose-500/40', textClass: 'text-rose-400' },
  high: { label: 'Alta', bgClass: 'bg-amber-500/20 border-amber-500/40', textClass: 'text-amber-400' },
  medium: { label: 'Media', bgClass: 'bg-sky-500/20 border-sky-500/40', textClass: 'text-sky-300' },
  low: { label: 'Baja', bgClass: 'bg-slate-500/20 border-slate-500/40', textClass: 'text-slate-300' }
};

/**
 * Metadatos visuales de Estados de Tickets
 */
export const TICKET_STATUS_LABELS: Record<TicketStatus, { label: string; bgClass: string; textClass: string }> = {
  open: { label: 'Abierto', bgClass: 'bg-rose-500/20 border-rose-500/40', textClass: 'text-rose-400' },
  in_progress: { label: 'En Proceso', bgClass: 'bg-indigo-500/20 border-indigo-500/40', textClass: 'text-indigo-300' },
  resolved: { label: 'Resuelto', bgClass: 'bg-emerald-500/20 border-emerald-500/40', textClass: 'text-emerald-400' },
  closed: { label: 'Cerrado', bgClass: 'bg-slate-700/40 border-slate-600/50', textClass: 'text-slate-400' }
};
