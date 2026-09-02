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
 * Estados del ciclo de vida comercial de un lead
 */
export type AutomationLeadStatus = 
  | 'NEW'
  | 'QUALIFIED'
  | 'CONTACTED'
  | 'IN_PROGRESS'
  | 'CONVERTED'
  | 'ARCHIVED';

/**
 * Esquema de entidad para la tabla 'automation_leads' en Supabase
 */
export type AutomationLeadEntity = {
  id: string;
  full_name: string;
  company_name?: string;
  company?: string;
  contact_detail?: string;
  email?: string;
  phone?: string;
  sector?: string;
  bottleneck_description?: string;
  source: string;
  status: string;
  created_at?: string;
};
