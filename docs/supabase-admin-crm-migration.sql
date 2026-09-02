-- ==============================================================================
-- CORPLEX SOLUTIONS S.A.S. — Script de Migración SQL para CRM Administrativo
-- Ejecutar este archivo en el SQL Editor de Supabase (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. Extensión de Columnas Comerciales en public.automation_leads
ALTER TABLE public.automation_leads
  ADD COLUMN IF NOT EXISTS assigned_to VARCHAR(120),
  ADD COLUMN IF NOT EXISTS notes TEXT,
  ADD COLUMN IF NOT EXISTS estimated_value NUMERIC(12,2) DEFAULT 0.00,
  ADD COLUMN IF NOT EXISTS next_follow_up_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_contacted_at TIMESTAMPTZ;

-- 2. Asegurar restricción de estados comerciales permitidos (pending, contacted, qualified, proposal_sent, won, lost)
ALTER TABLE public.automation_leads
  DROP CONSTRAINT IF EXISTS check_lead_status;

ALTER TABLE public.automation_leads
  ADD CONSTRAINT check_lead_status
  CHECK (status IN ('pending', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost'));

-- 3. Crear Índices de Rendimiento para Búsquedas y Métricas
CREATE INDEX IF NOT EXISTS idx_automation_leads_status ON public.automation_leads(status);
CREATE INDEX IF NOT EXISTS idx_automation_leads_created_at ON public.automation_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_automation_leads_next_follow_up ON public.automation_leads(next_follow_up_at);

-- 4. Tabla de Auditoría e Historial de Actividad (lead_activity)
CREATE TABLE IF NOT EXISTS public.lead_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    automation_lead_id UUID REFERENCES public.automation_leads(id) ON DELETE CASCADE,
    user_id UUID,
    user_email VARCHAR(150),
    action TEXT NOT NULL,
    previous_value JSONB,
    new_value JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_activity_lead_id ON public.lead_activity(automation_lead_id);

-- 5. POLÍTICAS DE SEGURIDAD RLS (Row Level Security)

-- Habilitar RLS en automation_leads y lead_activity
ALTER TABLE public.automation_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_activity ENABLE ROW LEVEL SECURITY;

-- Política 1: Inserción Pública (Público Anónimo puede enviar solicitudes desde la web)
DROP POLICY IF EXISTS "Permitir insercion publica de leads" ON public.automation_leads;
CREATE POLICY "Permitir insercion publica de leads"
ON public.automation_leads
FOR INSERT
TO anon
WITH CHECK (true);

-- Política 2: Acceso Administrativo Completo para Usuarios Autenticados (Supabase Auth)
DROP POLICY IF EXISTS "Permitir lectura completa a usuarios autenticados" ON public.automation_leads;
CREATE POLICY "Permitir lectura completa a usuarios autenticados"
ON public.automation_leads
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Permitir edicion completa a usuarios autenticados" ON public.automation_leads;
CREATE POLICY "Permitir edicion completa a usuarios autenticados"
ON public.automation_leads
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Políticas RLS para lead_activity (Solo usuarios autenticados pueden ver e insertar logs)
DROP POLICY IF EXISTS "Permitir lectura de actividad a autenticados" ON public.lead_activity;
CREATE POLICY "Permitir lectura de actividad a autenticados"
ON public.lead_activity
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Permitir insercion de actividad a autenticados" ON public.lead_activity;
CREATE POLICY "Permitir insercion de actividad a autenticados"
ON public.lead_activity
FOR INSERT
TO authenticated
WITH CHECK (true);
