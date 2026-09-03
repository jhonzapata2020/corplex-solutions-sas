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
