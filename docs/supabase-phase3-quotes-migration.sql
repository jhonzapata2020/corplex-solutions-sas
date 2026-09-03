-- ==============================================================================
-- CORPLEX SOLUTIONS S.A.S. — Script de Migración SQL para Fase 3: Cotizaciones Formales
-- Ejecutar este archivo en el SQL Editor de Supabase (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. Secuencia Transaccional para Consecutivos de Cotizaciones
CREATE SEQUENCE IF NOT EXISTS public.quote_number_seq START WITH 1 INCREMENT BY 1;

-- Función PostgreSQL para Generar Consecutivos Inmutables (Ej: CPX-QT-2026-001)
CREATE OR REPLACE FUNCTION public.fn_generate_quote_number()
RETURNS TEXT AS $$
DECLARE
    current_year TEXT;
    next_val BIGINT;
BEGIN
    current_year := TO_CHAR(NOW(), 'YYYY');
    next_val := NEXTVAL('public.quote_number_seq');
    RETURN 'CPX-QT-' || current_year || '-' || LPAD(next_val::TEXT, 3, '0');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Tabla Principal de Cotizaciones (quotes)
CREATE TABLE IF NOT EXISTS public.quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    automation_lead_id UUID REFERENCES public.automation_leads(id) ON DELETE SET NULL,
    quote_number VARCHAR(50) NOT NULL UNIQUE DEFAULT public.fn_generate_quote_number(),
    version_number INT NOT NULL DEFAULT 1,
    parent_quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'draft',
    client_name VARCHAR(255) NOT NULL,
    client_company VARCHAR(255),
    client_email VARCHAR(255),
    client_phone VARCHAR(50),
    client_sector VARCHAR(120),
    tax_rate NUMERIC(5,2) NOT NULL DEFAULT 19.00,
    subtotal NUMERIC(14,2) NOT NULL DEFAULT 0.00,
    discount_total NUMERIC(14,2) NOT NULL DEFAULT 0.00,
    taxable_subtotal NUMERIC(14,2) NOT NULL DEFAULT 0.00,
    tax_amount NUMERIC(14,2) NOT NULL DEFAULT 0.00,
    total NUMERIC(14,2) NOT NULL DEFAULT 0.00,
    valid_until DATE NOT NULL DEFAULT (CURRENT_DATE + INTERVAL '30 days'),
    payment_terms TEXT DEFAULT '50% anticipado con la orden de compra, 50% al finalizar la entrega y pruebas de aceptación.',
    notes TEXT DEFAULT 'Cotización emitida por CORPLEX SOLUTIONS S.A.S. Sujeta a confirmación de alcance y disponibilidad de servicios.',
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    sent_at TIMESTAMPTZ,
    accepted_at TIMESTAMPTZ,
    rejected_at TIMESTAMPTZ,
    expired_at TIMESTAMPTZ,
    CONSTRAINT check_quote_status CHECK (status IN ('draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired', 'cancelled'))
);

-- Índices de Rendimiento para Quotes
CREATE INDEX IF NOT EXISTS idx_quotes_lead_id ON public.quotes(automation_lead_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON public.quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_number ON public.quotes(quote_number);

-- 3. Tabla de Conceptos / Servicios (quote_items)
CREATE TABLE IF NOT EXISTS public.quote_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
    concept VARCHAR(255) NOT NULL,
    description TEXT,
    quantity NUMERIC(10,2) NOT NULL DEFAULT 1.00,
    unit_price NUMERIC(14,2) NOT NULL DEFAULT 0.00,
    discount_percent NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    is_taxable BOOLEAN NOT NULL DEFAULT true,
    item_subtotal NUMERIC(14,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quote_items_quote ON public.quote_items(quote_id);

-- 4. Tabla de Auditoría e Historial de Estados (quote_status_history)
CREATE TABLE IF NOT EXISTS public.quote_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
    previous_status VARCHAR(20),
    new_status VARCHAR(20) NOT NULL,
    user_email VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quote_status_history_quote ON public.quote_status_history(quote_id);

-- 5. Trigger para Auditoría Automática de Estados y Sincronización con Lead
CREATE OR REPLACE FUNCTION public.fn_on_quote_status_change()
RETURNS TRIGGER AS $$
BEGIN
    -- Registrar en quote_status_history si cambió el estado
    IF (TG_OP = 'INSERT') OR (OLD.status IS DISTINCT FROM NEW.status) THEN
        INSERT INTO public.quote_status_history (
            quote_id,
            previous_status,
            new_status,
            user_email,
            notes,
            created_at
        ) VALUES (
            NEW.id,
            CASE WHEN TG_OP = 'INSERT' THEN NULL ELSE OLD.status END,
            NEW.status,
            COALESCE(auth.jwt() ->> 'email', 'sistema@corplex.co'),
            'Cambio de estado registrado automáticamente.',
            NOW()
        );

        -- Actualizar marca de fechas según estado
        IF NEW.status = 'sent' AND NEW.sent_at IS NULL THEN
            NEW.sent_at := NOW();
            -- Sincronizar estado del lead a proposal_sent si está vinculado
            IF NEW.automation_lead_id IS NOT NULL THEN
                UPDATE public.automation_leads
                SET status = 'proposal_sent', estimated_value = NEW.total
                WHERE id = NEW.automation_lead_id;
            END IF;
        ELSIF NEW.status = 'accepted' AND NEW.accepted_at IS NULL THEN
            NEW.accepted_at := NOW();
            IF NEW.automation_lead_id IS NOT NULL THEN
                UPDATE public.automation_leads
                SET status = 'won', estimated_value = NEW.total
                WHERE id = NEW.automation_lead_id;
            END IF;
        ELSIF NEW.status = 'rejected' AND NEW.rejected_at IS NULL THEN
            NEW.rejected_at := NOW();
        ELSIF NEW.status = 'expired' AND NEW.expired_at IS NULL THEN
            NEW.expired_at := NOW();
        END IF;
    END IF;

    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recrear Trigger de Estados sobre public.quotes
DROP TRIGGER IF EXISTS tr_on_quote_status_change ON public.quotes;
CREATE TRIGGER tr_on_quote_status_change
BEFORE INSERT OR UPDATE ON public.quotes
FOR EACH ROW
EXECUTE FUNCTION public.fn_on_quote_status_change();

-- 6. POLÍTICAS DE SEGURIDAD RLS (Row Level Security)

-- Habilitar RLS en quotes, quote_items y quote_status_history
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_status_history ENABLE ROW LEVEL SECURITY;

-- Políticas para QUOTES
DROP POLICY IF EXISTS "Permitir lectura de cotizaciones a usuarios autenticados" ON public.quotes;
CREATE POLICY "Permitir lectura de cotizaciones a usuarios autenticados"
ON public.quotes FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Permitir insercion de cotizaciones a usuarios autenticados" ON public.quotes;
CREATE POLICY "Permitir insercion de cotizaciones a usuarios autenticados"
ON public.quotes FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir edicion de cotizaciones a usuarios autenticados" ON public.quotes;
CREATE POLICY "Permitir edicion de cotizaciones a usuarios autenticados"
ON public.quotes FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Políticas para QUOTE_ITEMS
DROP POLICY IF EXISTS "Permitir lectura de items a usuarios autenticados" ON public.quote_items;
CREATE POLICY "Permitir lectura de items a usuarios autenticados"
ON public.quote_items FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Permitir insercion de items a usuarios autenticados" ON public.quote_items;
CREATE POLICY "Permitir insercion de items a usuarios autenticados"
ON public.quote_items FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir edicion de items a usuarios autenticados" ON public.quote_items;
CREATE POLICY "Permitir edicion de items a usuarios autenticados"
ON public.quote_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir borrado de items a usuarios autenticados" ON public.quote_items;
CREATE POLICY "Permitir borrado de items a usuarios autenticados"
ON public.quote_items FOR DELETE TO authenticated USING (true);

-- Políticas para QUOTE_STATUS_HISTORY
DROP POLICY IF EXISTS "Permitir lectura de historial de cotizaciones a autenticados" ON public.quote_status_history;
CREATE POLICY "Permitir lectura de historial de cotizaciones a autenticados"
ON public.quote_status_history FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Permitir insercion de historial a autenticados" ON public.quote_status_history;
CREATE POLICY "Permitir insercion de historial a autenticados"
ON public.quote_status_history FOR INSERT TO authenticated WITH CHECK (true);
