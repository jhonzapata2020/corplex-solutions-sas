import { supabase } from '../lib/supabase';
import type { LeadFormData, AutomationLeadPayload, LeadSubmissionResult } from '../types/lead';

/**
 * Inserción directa de lead en la tabla 'automation_leads' de Supabase
 */
export async function submitLead(leadData: LeadFormData) {
  const companyName = leadData.companyName || leadData.company || 'Sin especificar';
  const emailVal = leadData.email || (leadData.contactDetail?.includes('@') ? leadData.contactDetail : '');
  const phoneVal = leadData.phone || (!leadData.contactDetail?.includes('@') ? leadData.contactDetail : '');
  const bottleneckDesc = leadData.bottleneckDescription || leadData.bottleneck || '';

  const { data, error } = await supabase
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
    ])
    .select()
    .single();

  if (error) {
    console.error('Error insertando lead en Supabase:', error);
    throw error;
  }

  return data;
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

    if (!nameTrimmed || !companyTrimmed || !contactTrimmed || !bottleneckTrimmed) {
      return {
        success: false,
        message: 'No se pudo enviar la solicitud. Por favor verifica que los campos obligatorios estén diligenciados.',
        errorDetails: 'Campos obligatorios incompletos'
      };
    }

    const insertedData = await submitLead({
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

    const leadId = insertedData?.id ? String(insertedData.id) : `LEAD-${Date.now().toString().slice(-6)}`;

    return {
      success: true,
      leadId,
      message: '¡Recibimos tu solicitud exitosamente! Tu información fue registrada en el sistema de Corplex Solutions.',
      timestamp: new Date().toISOString(),
      isDemonstrationMode: false,
      data: insertedData
    };

  } catch (error) {
    console.error('Fallo en registro de lead en Supabase:', error);
    return {
      success: false,
      message: 'Ocurrió un error al registrar la solicitud en la base de datos. Puedes continuar enviando tus datos directamente por WhatsApp.',
      errorDetails: error instanceof Error ? error.message : 'Error en Supabase'
    };
  }
}
