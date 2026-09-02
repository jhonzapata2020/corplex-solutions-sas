/**
 * Contrato de Tipos para la Gestión de Leads de Corplex AI Automation
 */

/**
 * Payload enviado desde el formulario de primer contacto
 */
export type AutomationLeadPayload = {
  fullName: string;
  company: string;
  contactDetail: string;
  bottleneck: string;
  sector?: string;
  selectedPackage?: string;
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
};

/**
 * Estados del ciclo de vida comercial de un lead (para backend futuro)
 */
export type AutomationLeadStatus = 
  | 'NEW'          // Recibido y pendiente de revisión
  | 'QUALIFIED'    // Calificado por equipo comercial
  | 'CONTACTED'    // Sesión de diagnóstico coordinada
  | 'IN_PROGRESS'  // Cotización / Piloto en evaluación
  | 'CONVERTED'    // Proyecto contratado
  | 'ARCHIVED';    // No calificado o descartado

/**
 * Esquema de entidad para la futura tabla 'automation_leads' en PostgreSQL/Supabase
 */
export type AutomationLeadEntity = {
  id: string;
  fullName: string;
  company: string;
  contactDetail: string;
  sector: string;
  bottleneck: string;
  source: 'WEB_FORM' | 'WHATSAPP_DIRECT' | 'MANUAL_ENTRY';
  status: AutomationLeadStatus;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  notes?: string;
};
