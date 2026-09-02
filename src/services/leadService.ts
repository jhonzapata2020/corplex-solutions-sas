import { env } from '../config/env';
import type { AutomationLeadPayload, LeadSubmissionResult } from '../types/lead';

/**
 * Servicio desacoplado de captación de leads de automatización.
 * 
 * Permite procesar las solicitudes del formulario frontend. Cuando se configure
 * una URL en env.API_LEADS_URL, enviará una petición HTTP POST real a la API.
 * Mientras tanto, funciona mediante un adaptador temporal que valida los datos
 * y devuelve un resultado controlado indicando modo demostración (sin simular persistencia en BD).
 */
export async function submitAutomationLead(
  payload: AutomationLeadPayload
): Promise<LeadSubmissionResult> {
  
  // 1. Validación de campos obligatorios cliente
  const nameTrimmed = payload.fullName?.trim() || '';
  const companyTrimmed = payload.company?.trim() || '';
  const contactTrimmed = payload.contactDetail?.trim() || '';
  const bottleneckTrimmed = payload.bottleneck?.trim() || '';

  if (!nameTrimmed || !companyTrimmed || !contactTrimmed || !bottleneckTrimmed) {
    return {
      success: false,
      message: 'No se pudo enviar la solicitud. Por favor verifica que los campos obligatorios estén diligenciados.',
      errorDetails: 'Campos obligatorios incompletos'
    };
  }

  // 2. Si existe un endpoint real configurado en las variables de entorno, enviamos HTTP POST
  if (env.API_LEADS_URL && !env.USE_MOCK_LEADS) {
    try {
      const response = await fetch(env.API_LEADS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: nameTrimmed,
          company: companyTrimmed,
          contactDetail: contactTrimmed,
          sector: payload.sector || 'General',
          bottleneck: bottleneckTrimmed,
          selectedPackage: payload.selectedPackage || 'Diagnóstico Inicial'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          message: errorData.message || 'Ocurrió un error al procesar tu solicitud en el servidor. Por favor reintenta o escríbenos a WhatsApp.',
          errorDetails: `HTTP ${response.status}`
        };
      }

      const data = await response.json();
      return {
        success: true,
        leadId: data.leadId || data.id,
        message: data.message || 'Recibimos tu solicitud. Revisaremos la información y te contactaremos en un máximo de un día hábil.',
        timestamp: new Date().toISOString(),
        isDemonstrationMode: false
      };

    } catch (error) {
      return {
        success: false,
        message: 'No pudimos conectar con el servidor de registros. Verifica tu conexión a internet o contáctanos por WhatsApp.',
        errorDetails: error instanceof Error ? error.message : 'Error de red'
      };
    }
  }

  // 3. Adaptador temporal de demostración (Sin simular persistencia en Base de Datos)
  // Simula latencia de red de 400ms para validar estado de carga en UI
  await new Promise(resolve => setTimeout(resolve, 400));

  const generatedId = `DEMO-LEAD-${Date.now().toString().slice(-6)}`;

  return {
    success: true,
    leadId: generatedId,
    message: 'Solicitud procesada en modo demostración. Tu información está lista para ser coordinada con nuestro equipo técnico o enviada por WhatsApp.',
    timestamp: new Date().toISOString(),
    isDemonstrationMode: true
  };
}
