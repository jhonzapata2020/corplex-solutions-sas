import { supabase } from '../lib/supabase';
import type {
  SiteServiceEntity,
  CaseStudyEntity,
  SiteFAQEntity,
  SitePackageEntity,
  SiteSettingsEntity
} from '../types/lead';

/**
 * Consulta de Servicios Web
 */
export async function fetchSiteServices(): Promise<SiteServiceEntity[]> {
  try {
    const { data, error } = await supabase
      .from('site_services')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return [
        {
          id: 'svc-1',
          title: 'Automatización de Procesos con IA',
          slug: 'automatizacion-ia',
          icon_name: 'Bot',
          badge: 'Popular',
          short_description: 'Agentes de IA autónomos y flujos de automatización para reducir tiempos operativos.',
          price_starting_at: 1500000,
          is_featured: true,
          is_active: true,
          display_order: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'svc-2',
          title: 'Desarrollo de Software a la Medida',
          slug: 'desarrollo-software',
          icon_name: 'Code2',
          badge: 'Enterprise',
          short_description: 'Plataformas web interactivas, CRMs y sistemas de gestión de alto rendimiento.',
          price_starting_at: 2800000,
          is_featured: true,
          is_active: true,
          display_order: 2,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'svc-3',
          title: 'Arquitectura Cloud & AWS',
          slug: 'arquitectura-cloud',
          icon_name: 'Cloud',
          badge: 'High Availability',
          short_description: 'Infraestructura en la nube con alta disponibilidad, respaldo y seguridad.',
          price_starting_at: 2000000,
          is_featured: true,
          is_active: true,
          display_order: 3,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    }

    return data as SiteServiceEntity[];
  } catch {
    return [];
  }
}

/**
 * Crear o Actualizar Servicio Web
 */
export async function saveSiteService(
  service: Omit<SiteServiceEntity, 'id' | 'created_at' | 'updated_at'> & { id?: string }
): Promise<boolean> {
  try {
    const payload = {
      title: service.title.trim(),
      slug: service.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      icon_name: service.icon_name || 'Cpu',
      badge: service.badge || null,
      short_description: service.short_description.trim(),
      full_description: service.full_description?.trim() || null,
      price_starting_at: Number(service.price_starting_at) || 0,
      is_featured: service.is_featured,
      is_active: service.is_active,
      display_order: service.display_order || 1,
      updated_at: new Date().toISOString()
    };

    if (service.id && !service.id.startsWith('svc-')) {
      const { error } = await supabase.from('site_services').update(payload).eq('id', service.id);
      return !error;
    } else {
      const { error } = await supabase.from('site_services').insert([payload]);
      return !error;
    }
  } catch {
    return false;
  }
}

/**
 * Cambiar Estado Visibilidad de Servicio
 */
export async function toggleServiceStatus(id: string, isActive: boolean): Promise<boolean> {
  try {
    if (id.startsWith('svc-')) return true;
    const { error } = await supabase
      .from('site_services')
      .update({ is_active: isActive, updated_at: new Date().toISOString() })
      .eq('id', id);
    return !error;
  } catch {
    return false;
  }
}

/**
 * Consulta de Casos de Éxito / Portafolio
 */
export async function fetchCaseStudies(): Promise<CaseStudyEntity[]> {
  try {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return [
        {
          id: 'cs-1',
          title: 'Simuladores Educativos & Laboratorios Virtuales UNAD',
          client_name: 'Universidad Nacional Abierta y a Distancia (UNAD)',
          category: 'EdTech & Simuladores',
          summary: 'Plataforma interactiva de laboratorios docentes en tiempo real para prácticas de la Escuela de Ciencias Básicas, Tecnología e Ingeniería (ECBTI).',
          impact_metrics: '+5,000 Estudiantes beneficiados',
          metric_highlight: '99.9% Disponibilidad durante Exámenes Nacionales',
          project_url: 'https://simuladorunad.vercel.app/',
          technologies: ['React 19', 'Canvas 2D/3D', 'AWS Lambda', 'Node.js', 'LTI Standard'],
          is_published: true,
          display_order: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'cs-2',
          title: 'Automatización Comercial & Agente IA RAG',
          client_name: 'Red de Servicios Médicos & Salud',
          category: 'IA & Automatización',
          summary: 'Agente conversacional inteligente integrado con WhatsApp API para recepción, cualificación automática y agendamiento de pacientes.',
          impact_metrics: '-70% Tiempo de respuesta comercial',
          metric_highlight: 'ROI 4.2x en el primer trimestre de operación',
          project_url: 'https://corplex-solutions-sas.vercel.app/#ai-automation',
          technologies: ['Python', 'FastAPI', 'WhatsApp API', 'Make / n8n', 'PostgreSQL'],
          is_published: true,
          display_order: 2,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'cs-3',
          title: 'Arquitectura Cloud AWS High-Availability & DevOps',
          client_name: 'Grupo Logístico & Agroindustrial Urabá',
          category: 'Cloud AWS & SLA',
          summary: 'Migración de infraestructura local a AWS con EC2 Auto Scaling, RDS PostgreSQL cifrado y balanceo de carga para operaciones masivas.',
          impact_metrics: 'Zero-Downtime en operaciones críticas',
          metric_highlight: '< 15ms Latencia en consulta de inventarios',
          project_url: 'https://corplex-solutions-sas.vercel.app/#servicios',
          technologies: ['AWS EC2', 'RDS PostgreSQL', 'AWS ALB', 'Docker', 'Route 53'],
          is_published: true,
          display_order: 3,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    }

    return data as CaseStudyEntity[];
  } catch {
    return [];
  }
}

export const getCaseStudies = fetchCaseStudies;

/**
 * Crear o Actualizar Caso de Éxito
 */
export async function saveCaseStudy(
  caseStudy: Omit<CaseStudyEntity, 'created_at' | 'updated_at'> & { id?: string }
): Promise<boolean> {
  try {
    const payload = {
      title: caseStudy.title.trim(),
      client_name: caseStudy.client_name.trim(),
      category: caseStudy.category.trim(),
      summary: caseStudy.summary.trim(),
      impact_metrics: caseStudy.impact_metrics?.trim() || null,
      metric_highlight: caseStudy.metric_highlight?.trim() || null,
      project_url: caseStudy.project_url?.trim() || null,
      technologies: caseStudy.technologies || [],
      is_published: caseStudy.is_published,
      display_order: caseStudy.display_order || 1,
      updated_at: new Date().toISOString()
    };

    if (caseStudy.id && !caseStudy.id.startsWith('cs-')) {
      const { error } = await supabase.from('case_studies').update(payload).eq('id', caseStudy.id);
      return !error;
    } else {
      const { error } = await supabase.from('case_studies').insert([payload]);
      return !error;
    }
  } catch {
    return false;
  }
}

/**
 * Cambiar Estado de Publicación de Caso de Éxito
 */
export async function toggleCaseStudyStatus(id: string, isPublished: boolean): Promise<boolean> {
  try {
    if (id.startsWith('cs-')) return true;
    const { error } = await supabase
      .from('case_studies')
      .update({ is_published: isPublished, updated_at: new Date().toISOString() })
      .eq('id', id);
    return !error;
  } catch {
    return false;
  }
}

/**
 * Consulta de Configuración Global del Sitio
 */
export async function fetchSiteSettings(): Promise<SiteSettingsEntity> {
  const defaultSettings: SiteSettingsEntity = {
    id: 'default',
    company_name: 'CORPLEX SOLUTIONS S.A.S.',
    nit_tax_id: '902061373-5',
    contact_email: 'contacto@corplex.co',
    contact_phone: '+57 310 892 4825',
    whatsapp_number: '573108924825',
    address: 'Turbo, Urabá, Antioquia, Colombia',
    city_region: 'Turbo, Urabá',
    default_tax_rate: 19.00,
    enable_email_alerts: true,
    updated_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (error || !data) {
      return defaultSettings;
    }

    return {
      ...defaultSettings,
      ...(data as SiteSettingsEntity)
    };
  } catch {
    return defaultSettings;
  }
}

/**
 * Actualizar Configuración Global en Supabase
 */
export async function updateSiteSettings(settings: Partial<SiteSettingsEntity>): Promise<boolean> {
  try {
    const payload = {
      id: 'default',
      company_name: settings.company_name?.trim() || 'CORPLEX SOLUTIONS S.A.S.',
      nit_tax_id: settings.nit_tax_id?.trim() || '902061373-5',
      contact_email: settings.contact_email?.trim() || 'contacto@corplex.co',
      contact_phone: settings.contact_phone?.trim() || '+57 310 892 4825',
      whatsapp_number: settings.whatsapp_number?.trim() || '573108924825',
      address: settings.address?.trim() || 'Turbo, Urabá, Antioquia, Colombia',
      city_region: settings.city_region?.trim() || 'Turbo, Urabá',
      default_tax_rate: Number(settings.default_tax_rate) || 19.00,
      enable_email_alerts: settings.enable_email_alerts ?? true,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('site_settings')
      .upsert([payload]);

    return !error;
  } catch {
    return false;
  }
}

/**
 * Aliases de Exportación para consumo dinámico
 */
export const getFeaturedServices = fetchSiteServices;
export const fetchFeaturedServices = fetchSiteServices;

