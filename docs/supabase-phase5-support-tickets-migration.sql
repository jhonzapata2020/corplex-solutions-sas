-- ==============================================================================
-- CORPLEX SOLUTIONS S.A.S. — Script de Migración SQL para Fase 5: Soporte TI & Mesa de Ayuda
-- Ejecutar este archivo en el SQL Editor de Supabase (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. Secuencia Transaccional para Consecutivos Inmutables de Tickets
CREATE SEQUENCE IF NOT EXISTS public.ticket_code_seq START WITH 1 INCREMENT BY 1;

-- Función Generadora del Consecutivo CPX-TCK-2026-001
CREATE OR REPLACE FUNCTION public.fn_generate_ticket_code()
RETURNS TEXT AS $$
DECLARE
    current_year TEXT;
BEGIN
    current_year := TO_CHAR(NOW(), 'YYYY');
    RETURN 'CPX-TCK-' || current_year || '-' || LPAD(NEXTVAL('public.ticket_code_seq')::TEXT, 3, '0');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Tabla Principal de Tickets de Soporte (support_tickets)
CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    ticket_code VARCHAR(50) NOT NULL UNIQUE DEFAULT public.fn_generate_ticket_code(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    severity VARCHAR(20) NOT NULL DEFAULT 'medium',
    status VARCHAR(20) NOT NULL DEFAULT 'open',
    assigned_to VARCHAR(120) DEFAULT '@soporte_ti',
    total_hours_spent NUMERIC(6,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    CONSTRAINT check_ticket_severity CHECK (severity IN ('critical', 'high', 'medium', 'low')),
    CONSTRAINT check_ticket_status CHECK (status IN ('open', 'in_progress', 'resolved', 'closed'))
);

CREATE INDEX IF NOT EXISTS idx_tickets_client ON public.support_tickets(client_id);
CREATE INDEX IF NOT EXISTS idx_tickets_project ON public.support_tickets(project_id);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON public.support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_severity ON public.support_tickets(severity);

-- 3. Tabla de Notas de Resolución y Horas Dedicadas (support_ticket_notes)
CREATE TABLE IF NOT EXISTS public.support_ticket_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
    user_email VARCHAR(255),
    note TEXT NOT NULL,
    hours_spent NUMERIC(6,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ticket_notes_ticket ON public.support_ticket_notes(ticket_id);

-- 4. Trigger para Actualizar timestamps y Acumular Horas Automáticamente
CREATE OR REPLACE FUNCTION public.fn_on_ticket_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status IN ('resolved', 'closed') AND OLD.status NOT IN ('resolved', 'closed') THEN
        NEW.resolved_at := NOW();
    END IF;

    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS tr_on_ticket_status_change ON public.support_tickets;
CREATE TRIGGER tr_on_ticket_status_change
BEFORE UPDATE ON public.support_tickets
FOR EACH ROW
EXECUTE FUNCTION public.fn_on_ticket_status_change();

-- 5. POLÍTICAS DE SEGURIDAD RLS (Row Level Security)
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_ticket_notes ENABLE ROW LEVEL SECURITY;

-- SUPPORT_TICKETS RLS
DROP POLICY IF EXISTS "Permitir lectura de tickets a usuarios autenticados" ON public.support_tickets;
CREATE POLICY "Permitir lectura de tickets a usuarios autenticados" ON public.support_tickets FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Permitir insercion de tickets a usuarios autenticados" ON public.support_tickets;
CREATE POLICY "Permitir insercion de tickets a usuarios autenticados" ON public.support_tickets FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir edicion de tickets a usuarios autenticados" ON public.support_tickets;
CREATE POLICY "Permitir edicion de tickets a usuarios autenticados" ON public.support_tickets FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- SUPPORT_TICKET_NOTES RLS
DROP POLICY IF EXISTS "Permitir lectura de notas de tickets a usuarios autenticados" ON public.support_ticket_notes;
CREATE POLICY "Permitir lectura de notas de tickets a usuarios autenticados" ON public.support_ticket_notes FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Permitir insercion de notas de tickets a usuarios autenticados" ON public.support_ticket_notes;
CREATE POLICY "Permitir insercion de notas de tickets a usuarios autenticados" ON public.support_ticket_notes FOR INSERT TO authenticated WITH CHECK (true);
