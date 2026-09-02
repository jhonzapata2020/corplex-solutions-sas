/**
 * Configuración de Variables de Entorno (Frontend Client-Side)
 * 
 * IMPORTANTE DE SEGURIDAD:
 * Este archivo NO debe contener claves privadas, tokens de API de IA (OpenAI/Claude),
 * credenciales de bases de datos, llaves secretas de WhatsApp ni tokens de CRM.
 * Todas las llaves privadas deben residir únicamente en el backend o funciones serverless.
 */

export const env = {
  /**
   * Nombre oficial de la empresa
   */
  COMPANY_NAME: import.meta.env.VITE_COMPANY_NAME || 'CORPLEX SOLUTIONS S.A.S.',

  /**
   * URL base del endpoint de backend para envío de leads.
   * Si está vacía o no definida, el servicio utilizará el adaptador temporal de demostración.
   * Ejemplo de producción futura: "https://api.corplex.co/api/leads/automation"
   */
  API_LEADS_URL: import.meta.env.VITE_API_LEADS_URL || '',

  /**
   * Bandera para forzar el modo demostración cliente en entornos de pruebas/staging.
   */
  USE_MOCK_LEADS: import.meta.env.VITE_USE_MOCK_LEADS !== 'false',

  /**
   * Entorno de ejecución (development | staging | production)
   */
  NODE_ENV: import.meta.env.MODE || 'development'
} as const;
