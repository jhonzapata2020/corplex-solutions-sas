import { supabase } from '../lib/supabase';
import type {
  ClientEntity,
  ProjectEntity,
  ProjectTaskEntity,
  ProjectActivityEntity,
  ProjectStatus,
  QuoteEntity,
  AutomationLeadEntity
} from '../types/lead';

/**
 * Conversión Idempotente: Transforma una Cotización Aceptada o Lead Ganado en Cliente y Proyecto sin re-digitar datos.
 */
export async function convertQuoteOrLeadToClient(params: {
  quote?: QuoteEntity | null;
  lead?: AutomationLeadEntity | null;
  nitTaxId?: string;
  legalName?: string;
  leadEngineer?: string;
}): Promise<{ client: ClientEntity; project: ProjectEntity }> {
  const { quote, lead, nitTaxId, legalName, leadEngineer } = params;

  const companyName = quote?.client_company || lead?.company_name || quote?.client_name || lead?.full_name || 'Cliente Corplex';
  const primaryContactName = quote?.client_name || lead?.full_name || 'Contacto Principal';
  const primaryContactEmail = quote?.client_email || lead?.email || null;
  const primaryContactPhone = quote?.client_phone || lead?.phone || lead?.contact_detail || null;
  const sector = quote?.client_sector || lead?.sector || 'General';
  const contractValue = quote?.total ? Number(quote.total) : (lead?.estimated_value ? Number(lead.estimated_value) : 0);

  const quoteId = quote?.id || null;
  const leadId = lead?.id || quote?.automation_lead_id || null;

  // 1. Verificación Idempotente de Cliente Existente por quote_id, lead_id o nit
  let existingClient: ClientEntity | null = null;

  if (quoteId) {
    const { data } = await supabase.from('clients').select('*, client_contacts(*)').eq('quote_id', quoteId).maybeSingle();
    if (data) existingClient = data as ClientEntity;
  }

  if (!existingClient && leadId) {
    const { data } = await supabase.from('clients').select('*, client_contacts(*)').eq('automation_lead_id', leadId).maybeSingle();
    if (data) existingClient = data as ClientEntity;
  }

  if (!existingClient && nitTaxId && nitTaxId.trim().length > 0) {
    const { data } = await supabase.from('clients').select('*, client_contacts(*)').eq('nit_tax_id', nitTaxId.trim()).maybeSingle();
    if (data) existingClient = data as ClientEntity;
  }

  let finalClient: ClientEntity;

  // 2. Crear Cliente si no existe previamente
  if (existingClient) {
    finalClient = existingClient;
  } else {
    const { data: createdClient, error: clientErr } = await supabase
      .from('clients')
      .insert([
        {
          automation_lead_id: leadId,
          quote_id: quoteId,
          company_name: companyName,
          legal_name: legalName || companyName,
          nit_tax_id: nitTaxId || null,
          sector: sector,
          status: 'active'
        }
      ])
      .select('*')
      .single();

    if (clientErr || !createdClient) {
      console.error('Error creando cliente:', clientErr);
      throw clientErr || new Error('No se pudo crear la ficha del cliente.');
    }

    finalClient = createdClient as ClientEntity;

    // Crear contacto principal
    await supabase.from('client_contacts').insert([
      {
        client_id: finalClient.id,
        full_name: primaryContactName,
        role_title: 'Contacto Principal',
        email: primaryContactEmail,
        phone: primaryContactPhone,
        is_primary: true,
        is_active: true
      }
    ]);
  }

  // 3. Verificación Idempotente de Proyecto Existente por quote_id o lead_id
  let existingProject: ProjectEntity | null = null;

  if (quoteId) {
    const { data } = await supabase.from('projects').select('*').eq('quote_id', quoteId).maybeSingle();
    if (data) existingProject = data as ProjectEntity;
  }

  if (!existingProject && leadId) {
    const { data } = await supabase.from('projects').select('*').eq('automation_lead_id', leadId).maybeSingle();
    if (data) existingProject = data as ProjectEntity;
  }

  let finalProject: ProjectEntity;

  if (existingProject) {
    finalProject = existingProject;
  } else {
    const projectName = `Proyecto de Automatización & Software para ${companyName}`;
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 45); // 45 días por defecto

    const { data: createdProject, error: projErr } = await supabase
      .from('projects')
      .insert([
        {
          client_id: finalClient.id,
          quote_id: quoteId,
          automation_lead_id: leadId,
          name: projectName,
          description: `Ejecución de solución tecnológica contratada por ${companyName}.`,
          contract_value: contractValue,
          start_date: new Date().toISOString().split('T')[0],
          target_delivery_date: targetDate.toISOString().split('T')[0],
          status: 'planning',
          assigned_lead_engineer: leadEngineer || '@lead_engineer',
          completion_percentage: 0
        }
      ])
      .select('*')
      .single();

    if (projErr || !createdProject) {
      console.error('Error creando proyecto:', projErr);
      throw projErr || new Error('No se pudo crear el proyecto.');
    }

    finalProject = createdProject as ProjectEntity;

    // 4. Crear Tareas Iniciales de Proyecto
    const initialTasks = [
      {
        project_id: finalProject.id,
        title: 'Levantamiento de Requerimientos y Arquitectura',
        description: 'Reunión de alineación con el cliente para validar alcance y diagramas de arquitectura.',
        assigned_to: leadEngineer || '@lead_engineer',
        status: 'in_progress',
        priority: 'high'
      },
      {
        project_id: finalProject.id,
        title: 'Desarrollo de Componentes e Integración',
        description: 'Construcción del código fuente, flujos e integración de APIs.',
        assigned_to: leadEngineer || '@lead_engineer',
        status: 'pending',
        priority: 'high'
      },
      {
        project_id: finalProject.id,
        title: 'Pruebas QA, Despliegue y Acta de Entrega',
        description: 'Ejecución de pruebas de aceptación y capacitación al equipo del cliente.',
        assigned_to: leadEngineer || '@lead_engineer',
        status: 'pending',
        priority: 'medium'
      }
    ];

    await supabase.from('project_tasks').insert(initialTasks);
  }

  return { client: finalClient, project: finalProject };
}

/**
 * Consulta de clientes corporativos con contactos y proyectos vinculados
 */
export async function fetchClients(): Promise<{
  clients: ClientEntity[];
  totalClients: number;
  activeClientsCount: number;
}> {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*, client_contacts(*), projects(*)')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Advertencia consultando clientes (comprobar RLS / migración Fase 4):', error);
      return { clients: [], totalClients: 0, activeClientsCount: 0 };
    }

    const clients = (data || []) as ClientEntity[];
    const activeClientsCount = clients.filter(c => c.status === 'active').length;

    return {
      clients,
      totalClients: clients.length,
      activeClientsCount
    };
  } catch {
    return { clients: [], totalClients: 0, activeClientsCount: 0 };
  }
}

/**
 * Consulta de proyectos de ingeniería con tareas y actividades
 */
export async function fetchProjects(): Promise<{
  projects: ProjectEntity[];
  totalProjects: number;
  inProgressCount: number;
  completedCount: number;
  totalContractedValue: number;
}> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*, clients(*), project_tasks(*)')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Advertencia consultando proyectos (comprobar RLS / migración Fase 4):', error);
      return {
        projects: [],
        totalProjects: 0,
        inProgressCount: 0,
        completedCount: 0,
        totalContractedValue: 0
      };
    }

    const projects = (data || []) as ProjectEntity[];
    let inProgressCount = 0;
    let completedCount = 0;
    let totalContractedValue = 0;

    projects.forEach(p => {
      totalContractedValue += Number(p.contract_value) || 0;
      if (p.status === 'in_progress' || p.status === 'planning') {
        inProgressCount++;
      } else if (p.status === 'completed') {
        completedCount++;
      }
    });

    return {
      projects,
      totalProjects: projects.length,
      inProgressCount,
      completedCount,
      totalContractedValue
    };
  } catch {
    return {
      projects: [],
      totalProjects: 0,
      inProgressCount: 0,
      completedCount: 0,
      totalContractedValue: 0
    };
  }
}

/**
 * Consulta directa de tareas de un proyecto
 */
export async function fetchProjectTasks(projectId: string): Promise<ProjectTaskEntity[]> {
  try {
    const { data, error } = await supabase
      .from('project_tasks')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });

    if (error) return [];
    return (data || []) as ProjectTaskEntity[];
  } catch {
    return [];
  }
}

/**
 * Actualizar estado y porcentaje de avance de un proyecto
 */
export async function updateProjectStatus(
  projectId: string,
  newStatus: ProjectStatus,
  percentage: number,
  notes?: string
): Promise<ProjectEntity | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .update({
        status: newStatus,
        completion_percentage: percentage,
        updated_at: new Date().toISOString()
      })
      .eq('id', projectId)
      .select('*, clients(*), project_tasks(*)')
      .single();

    if (error || !data) {
      console.error('Error actualizando estado de proyecto:', error);
      return null;
    }

    // Registrar bitácora
    try {
      const session = (await supabase.auth.getSession()).data.session;
      await supabase.from('project_activity').insert([
        {
          project_id: projectId,
          user_email: session?.user?.email,
          new_status: newStatus,
          action: `Estado de proyecto actualizado a ${newStatus} (${percentage}%)`,
          notes: notes || null
        }
      ]);
    } catch {
      // Ignorar fallo de auditoría secundaria
    }

    return data as ProjectEntity;
  } catch {
    return null;
  }
}

/**
 * Crear tarea técnica en un proyecto y recalcular avance %
 */
export async function createProjectTask(
  projectId: string,
  task: Omit<ProjectTaskEntity, 'id' | 'project_id' | 'created_at'>
): Promise<ProjectTaskEntity | null> {
  try {
    const { data, error } = await supabase
      .from('project_tasks')
      .insert([{ ...task, project_id: projectId }])
      .select('*')
      .single();

    if (error || !data) return null;

    // Recalcular % de avance
    await recalculateProjectProgress(projectId);

    return data as ProjectTaskEntity;
  } catch {
    return null;
  }
}

/**
 * Actualizar estado de una tarea técnica de proyecto y recalcular avance %
 */
export async function updateProjectTaskStatus(
  taskId: string,
  projectId: string,
  newStatus: 'pending' | 'in_progress' | 'completed' | 'blocked'
): Promise<boolean> {
  try {
    const payload: Record<string, unknown> = { status: newStatus };
    if (newStatus === 'completed') {
      payload.completed_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('project_tasks')
      .update(payload)
      .eq('id', taskId);

    if (error) return false;

    await recalculateProjectProgress(projectId);
    return true;
  } catch {
    return false;
  }
}

/**
 * Recalcular el porcentaje de avance (%) de un proyecto basado en tareas completadas
 */
async function recalculateProjectProgress(projectId: string): Promise<void> {
  try {
    const { data: tasks } = await supabase
      .from('project_tasks')
      .select('status')
      .eq('project_id', projectId);

    if (tasks && tasks.length > 0) {
      const completedCount = tasks.filter(t => t.status === 'completed').length;
      const percentage = Math.round((completedCount / tasks.length) * 100);

      const statusUpdate: Record<string, unknown> = {
        completion_percentage: percentage
      };

      if (percentage === 100) {
        statusUpdate.status = 'completed';
        statusUpdate.actual_delivery_date = new Date().toISOString().split('T')[0];
      }

      await supabase.from('projects').update(statusUpdate).eq('id', projectId);
    }
  } catch {
    // Continuar si falla el cálculo automático
  }
}

/**
 * Consulta de bitácora de auditoría para un proyecto
 */
export async function fetchProjectActivity(projectId: string): Promise<ProjectActivityEntity[]> {
  try {
    const { data, error } = await supabase
      .from('project_activity')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) return [];
    return (data || []) as ProjectActivityEntity[];
  } catch {
    return [];
  }
}
