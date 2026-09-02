import { supabase } from '../lib/supabase';
import type { LeadFormData, AutomationLeadPayload, LeadSubmissionResult } from '../types/lead';

/**
 * Inserción directa de lead en la tabla 'automation_leads' de Supabase.
 * Diseñado con compatibilidad estricta para políticas RLS de solo INSERCIÓN
 * (evita requerir permisos de LECTURA/SELECT para usuarios anónimos).
 */
export async function submitLead(leadData: LeadFormData) {
  const companyName = leadData.companyName || leadData.company || 'Sin especificar';
  const emailVal = leadData.email || (leadData.contactDetail?.includes('@') ? leadData.contactDetail : '');
  const phoneVal = leadData.phone || (!leadData.contactDetail?.includes('@') ? leadData.contactDetail : '');
  const bottleneckDesc = leadData.bottleneckDescription || leadData.bottleneck || '';

  // Inserción limpia sin .select() para cumplir políticas de privacidad RLS (Insert Only para anon)
  const { error } = await supabase
    .from('automation_leads')
    .insert([
      {
        full_name: leadData.fullName,
        email: emailVal || leadData.contactDetail || '',
        phone: phoneVal || leadData.contactDetail || '',
        company_name: companyName,
        sector: leadData.sector || 'General',
        operation_volume: leadData.operationVolume || 'Estándar',
        bottleneck_description: bottleneckDesc,
        estimated_roi_hours: leadData.estimatedRoiHours || 0,
        selected_package: leadData.selectedPackage || 'Diagnóstico Inicial',
        source: 'web_corplex',
        status: 'pending'
      }
    ]);

  if (error) {
    console.error('Error insertando lead en Supabase:', error);
    throw error;
  }

  return { inserted: true };
}

/**
 * Servicio desacoplado de captación de leads de automatización
 */
export async function submitAutomationLead(
  payload: AutomationLeadPayload
): Promise<LeadSubmissionResult> {
  try {
    const nameTrimmed = payload.fullName?.trim() || '';
    const companyTrimmed = payload.company?.trim() || payload.companyName?.trim() || '';
    const contactTrimmed = payload.contactDetail?.trim() || payload.email?.trim() || payload.phone?.trim() || '';
    const bottleneckTrimmed = payload.bottleneck?.trim() || payload.bottleneckDescription?.trim() || '';

    // Sanitización y validaciones preliminares cliente
    if (!nameTrimmed || !companyTrimmed || !contactTrimmed || !bottleneckTrimmed) {
      return {
        success: false,
        message: 'No se pudo enviar la solicitud. Por favor verifica que los campos obligatorios estén diligenciados.',
        errorDetails: 'Campos obligatorios incompletos'
      };
    }

    if (bottleneckTrimmed.length < 5) {
      return {
        success: false,
        message: 'Por favor describe con un poco más de detalle el proceso a mejorar (mínimo 5 caracteres).',
        errorDetails: 'Descripción demasiado corta'
      };
    }

    await submitLead({
      fullName: nameTrimmed,
      companyName: companyTrimmed,
      company: companyTrimmed,
      contactDetail: contactTrimmed,
      email: payload.email,
      phone: payload.phone,
      sector: payload.sector,
      bottleneckDescription: bottleneckTrimmed,
      bottleneck: bottleneckTrimmed,
      selectedPackage: payload.selectedPackage,
      operationVolume: payload.operationVolume,
      estimatedRoiHours: payload.estimatedRoiHours
    });

    const leadId = `LEAD-${Date.now().toString().slice(-6)}`;

    return {
      success: true,
      leadId,
      message: '¡Solicitud registrada con éxito! Tu información fue guardada en nuestra base de datos.',
      timestamp: new Date().toISOString(),
      isDemonstrationMode: false
    };

  } catch (error) {
    console.error('Fallo en registro de lead en Supabase:', error);
    return {
      success: false,
      message: 'No se pudo completar el registro automático en la base de datos. Sin embargo, puedes continuar enviando tus datos por WhatsApp.',
      errorDetails: error instanceof Error ? error.message : 'Error en Supabase'
    };
  }
}
