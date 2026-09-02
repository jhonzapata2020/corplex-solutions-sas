# Arquitectura del Sistema de Leads: Corplex AI Automation

Este documento define la arquitectura recomendada para la recepción, validación, almacenamiento y seguimiento comercial de los leads generados a través de la plataforma web de **CORPLEX SOLUTIONS S.A.S.**.

---

## 1. Diagrama de Flujo de Arquitectura

```
[ Formulario Web / WhatsApp ]
           │
           ▼
[ Endpoint Seguro (API Gateway) ]
           │
           ▼
[ Validación & Anti-Spam (Server-Side) ]
           │
           ▼
[ Base de Datos de Leads (PostgreSQL / Supabase) ]
           │
     ┌─────┴────────────────────────┐
     ▼                              ▼
[ Clasificación Opcional IA ]  [ Notificación Comercial (Slack/Mail/WhatsApp) ]
     │                              │
     └──────────────┬───────────────┘
                    ▼
          [ CRM & Seguimiento ]
```

---

## 2. Especificación de Datos del Formulario

### A. Datos Recibidos desde Frontend
| Campo | Tipo | Obligatorio | Descripción |
| :--- | :--- | :--- | :--- |
| `fullName` | String | Sí | Nombre completo de la persona de contacto. |
| `company` | String | Sí | Nombre de la empresa o institución solicitante. |
| `contactDetail` | String | Sí | Correo electrónico o número telefónico de WhatsApp. |
| `bottleneck` | String | Sí | Descripción del proceso manual o cuello de botella a mejorar. |
| `sector` | String | No | Sector de la organización (Salud, Educación, Agro, etc.). |
| `selectedPackage` | String | No | Plan o modalidad orientativa de interés. |

### B. Endpoint Futuro Recomendado
* **Método HTTP:** `POST`
* **Ruta de API:** `/api/leads/automation`
* **Headers:** `Content-Type: application/json`

#### Ejemplo de Payload JSON (Request):
```json
{
  "fullName": "Ing. Carlos Ramírez",
  "company": "Clínica San Rafael",
  "contactDetail": "carlos.ramirez@clinica.co",
  "sector": "Salud y Clínicas",
  "bottleneck": "Recepciones saturadas agendando citas por WhatsApp y digitando manualmente en el HIS.",
  "selectedPackage": "2. Automatización Inicial (Piloto Rápido)"
}
```

#### Ejemplo de Respuesta del Servidor (201 Created):
```json
{
  "success": true,
  "leadId": "LEAD-2026-08912",
  "message": "Solicitud recibida exitosamente. Nuestro equipo técnico evaluará tu caso en un máximo de un día hábil.",
  "timestamp": "2026-09-01T20:15:00Z"
}
```

---

## 3. Modelo de Datos Futuro (`automation_leads`)

Se propone la siguiente estructura relacional para la tabla `automation_leads` en PostgreSQL o Supabase:

```sql
CREATE TABLE automation_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(120) NOT NULL,
    company VARCHAR(150) NOT NULL,
    contact_detail VARCHAR(200) NOT NULL,
    sector VARCHAR(100) DEFAULT 'General',
    bottleneck TEXT NOT NULL,
    source VARCHAR(50) DEFAULT 'WEB_FORM',
    status VARCHAR(30) DEFAULT 'NEW',
    priority VARCHAR(20) DEFAULT 'MEDIUM',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    assigned_to VARCHAR(100),
    notes TEXT
);

-- Índices recomendados para búsquedas eficientes
CREATE INDEX idx_automation_leads_status ON automation_leads(status);
CREATE INDEX idx_automation_leads_created_at ON automation_leads(created_at DESC);
```

### Estados del Ciclo de Vida del Lead (`status`):
* `NEW`: Lead recién ingresado, pendiente de revisión inicial.
* `QUALIFIED`: Evaluado técnicamente con factibilidad confirmada.
* `CONTACTED`: Conversación inicial o sesión de diagnóstico agendada.
* `IN_PROGRESS`: Cotización o propuesta de piloto en negociación.
* `CONVERTED`: Proyecto de automatización contratado.
* `ARCHIVED`: Descartado por falta de contacto o no calificado.

---

## 4. Validaciones Requeridas en Servidor (Server-Side)

Cuando se construya el endpoint backend, deberán ejecutarse obligatoriamente las siguientes validaciones:

1. **Sanitización e Inyección:**
   - Limpieza de etiquetas HTML y caracteres especiales para evitar XSS (Cross-Site Scripting).
   - Parámetros parametrizados en consultas SQL para prevenir SQL Injection.

2. **Validación Sintáctica de Contacto:**
   - Verificación de formato válido de correo electrónico (`^[^\s@]+@[^\s@]+\.[^\s@]+$`) o patrón numérico internacional de WhatsApp (`^\+?[1-9]\d{7,14}$`).

3. **Restricciones de Longitud de Campos:**
   - `full_name`: entre 2 y 120 caracteres.
   - `company`: entre 2 y 150 caracteres.
   - `bottleneck`: mínimo 10 caracteres, máximo 2,000 caracteres.

4. **Protección Anti-Spam & Rate Limiting:**
   - Implementación de campo trampa oculto (*Honeypot*) en el formulario.
   - Rate limiting por dirección IP (ej: máximo 5 solicitudes por hora por cliente IP).
   - Integración opcional con servicio de desafío invisible (Cloudflare Turnstile / reCAPTCHA v3).

---

## 5. Protección de Datos Personales (Ley 1581 de Colombia)

* **Cifrado en Tránsito:** Todo el tráfico entre frontend y backend debe transmitirse obligatoriamente sobre HTTPS / TLS 1.3.
* **Cifrado en Reposo:** La base de datos debe contar con cifrado AES-256 en disco.
* **Control de Accesos:** Acceso a los registros restringido exclusivamente al personal comercial autorizado mediante autenticación basada en roles (RBAC).
* **Atención de Derechos de Titular:** Canal habilitado para atención de peticiones de actualización o supresión de datos vía `triangelturbo@gmail.com`.

---

## 6. Estado Actual de la Implementación (Frontend Mode)

* **Implementado en Frontend:**
  - Capa de servicio desacoplada (`src/services/leadService.ts`).
  - Configuración centralizada sin claves privadas (`src/config/env.ts`).
  - Contrato de tipos (`src/types/lead.ts`).
  - Adaptador temporal seguro para pruebas que valida datos localmente y devuelve respuesta controlada en modo demostración.
  - Manejo de estados asíncronos (`isSubmitting`), preservación de datos ante fallos en la UI y modal de política de privacidad informativa (`PrivacyModal.tsx`).

* **Pendiente por Construir en Backend (Fase Futura):**
  - Creación de la base de datos PostgreSQL / Supabase y ejecución de la migración `automation_leads`.
  - Desarrollo de la función serverless o API Node.js/FastAPI para `POST /api/leads/automation`.
  - Integración de notificaciones automáticas (Slack Webhook / Email SMTP).
  - Integración oficial con WhatsApp Business Cloud API para envío masivo o CRM.
