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
  estimatedPipelineValue: number;
  recentLeads: AutomationLeadEntity[];
  upcomingFollowUps: AutomationLeadEntity[];
};
