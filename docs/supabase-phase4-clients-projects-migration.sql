-- ==============================================================================
-- CORPLEX SOLUTIONS S.A.S. — Script de Migración SQL para Fase 4: Clientes & Proyectos
-- Ejecutar este archivo en el SQL Editor de Supabase (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. Secuencias Transaccionales para Consecutivos Inmutables
CREATE SEQUENCE IF NOT EXISTS public.client_code_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS public.project_code_seq START WITH 1 INCREMENT BY 1;

-- Funciones Generadoras de Consecutivos Transaccionales
CREATE OR REPLACE FUNCTION public.fn_generate_client_code()
RETURNS TEXT AS $$
BEGIN
    RETURN 'CPX-CLI-' || LPAD(NEXTVAL('public.client_code_seq')::TEXT, 3, '0');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.fn_generate_project_code()
RETURNS TEXT AS $$
DECLARE
    current_year TEXT;
BEGIN
    current_year := TO_CHAR(NOW(), 'YYYY');
    RETURN 'CPX-PRJ-' || current_year || '-' || LPAD(NEXTVAL('public.project_code_seq')::TEXT, 3, '0');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Tabla de Clientes Corporativos (clients) - Restricción UNIQUE para Conversión Idempotente
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    automation_lead_id UUID UNIQUE REFERENCES public.automation_leads(id) ON DELETE SET NULL,
    quote_id UUID UNIQUE REFERENCES public.quotes(id) ON DELETE SET NULL,
    client_code VARCHAR(50) NOT NULL UNIQUE DEFAULT public.fn_generate_client_code(),
    company_name VARCHAR(255) NOT NULL,
    legal_name VARCHAR(255),
    nit_tax_id VARCHAR(50), -- Opcional: Soporta empresas en formalización (Pendiente de NIT)
    address TEXT DEFAULT 'Urabá, Antioquia',
    city VARCHAR(100) DEFAULT 'Turbo, Urabá',
    sector VARCHAR(120) DEFAULT 'General',
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_client_status CHECK (status IN ('active', 'inactive', 'archived'))
);

CREATE INDEX IF NOT EXISTS idx_clients_company ON public.clients(company_name);
CREATE INDEX IF NOT EXISTS idx_clients_nit ON public.clients(nit_tax_id);

-- 3. Tabla de Contactos del Cliente (client_contacts) - Permite Varios Responsables por Empresa
CREATE TABLE IF NOT EXISTS public.client_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    role_title VARCHAR(100) DEFAULT 'Contacto Principal', -- Ej: Administrativo, Financiero, Técnico, Rep. Legal
    email VARCHAR(255),
    phone VARCHAR(50),
    is_primary BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_contacts_client ON public.client_contacts(client_id);

-- 4. Tabla de Proyectos de Ingeniería (projects) - Restricción UNIQUE para Conversión Idempotente
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    quote_id UUID UNIQUE REFERENCES public.quotes(id) ON DELETE SET NULL,
    automation_lead_id UUID UNIQUE REFERENCES public.automation_leads(id) ON DELETE SET NULL,
    project_code VARCHAR(50) NOT NULL UNIQUE DEFAULT public.fn_generate_project_code(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    contract_value NUMERIC(14,2) NOT NULL DEFAULT 0.00, -- Valor Contratado Acordado ($ COP)
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    target_delivery_date DATE,
    actual_delivery_date DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'planning',
    assigned_lead_engineer VARCHAR(120),
    completion_percentage INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_project_status CHECK (status IN ('planning', 'in_progress', 'review', 'completed', 'paused', 'cancelled')),
    CONSTRAINT check_completion_range CHECK (completion_percentage BETWEEN 0 AND 100)
);

CREATE INDEX IF NOT EXISTS idx_projects_client ON public.projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);

-- 5. Tabla de Tareas del Proyecto (project_tasks)
CREATE TABLE IF NOT EXISTS public.project_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    assigned_to VARCHAR(120),
    due_date TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    priority VARCHAR(20) NOT NULL DEFAULT 'medium',
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_task_status CHECK (status IN ('pending', 'in_progress', 'completed', 'blocked')),
    CONSTRAINT check_task_priority CHECK (priority IN ('low', 'medium', 'high', 'urgent'))
);

CREATE INDEX IF NOT EXISTS idx_project_tasks_project ON public.project_tasks(project_id);

-- 6. Tabla de Bitácora y Auditoría de Proyectos (project_activity)
CREATE TABLE IF NOT EXISTS public.project_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    user_email VARCHAR(255),
    previous_status VARCHAR(20),
    new_status VARCHAR(20),
    action VARCHAR(255) NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_activity_project ON public.project_activity(project_id);

-- 7. Trigger de Auditoría Automática para Cambios de Estado en Proyectos
CREATE OR REPLACE FUNCTION public.fn_on_project_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') OR (OLD.status IS DISTINCT FROM NEW.status) THEN
        INSERT INTO public.project_activity (
            project_id,
            user_email,
            previous_status,
            new_status,
            action,
            notes,
            created_at
        ) VALUES (
            NEW.id,
            COALESCE(auth.jwt() ->> 'email', 'sistema@corplex.co'),
            CASE WHEN TG_OP = 'INSERT' THEN NULL ELSE OLD.status END,
            NEW.status,
            CASE WHEN TG_OP = 'INSERT' THEN 'Proyecto iniciado' ELSE 'Estado del proyecto actualizado' END,
            'Avance registrado al ' || NEW.completion_percentage || '%.',
            NOW()
        );

        IF NEW.status = 'completed' AND NEW.actual_delivery_date IS NULL THEN
            NEW.actual_delivery_date := CURRENT_DATE;
            NEW.completion_percentage := 100;
        END IF;
    END IF;

    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS tr_on_project_status_change ON public.projects;
CREATE TRIGGER tr_on_project_status_change
BEFORE INSERT OR UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.fn_on_project_status_change();

-- 8. POLÍTICAS DE SEGURIDAD RLS (Row Level Security)
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_activity ENABLE ROW LEVEL SECURITY;

-- CLIENTS RLS
DROP POLICY IF EXISTS "Permitir lectura de clientes a usuarios autenticados" ON public.clients;
CREATE POLICY "Permitir lectura de clientes a usuarios autenticados" ON public.clients FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Permitir insercion de clientes a usuarios autenticados" ON public.clients;
CREATE POLICY "Permitir insercion de clientes a usuarios autenticados" ON public.clients FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir edicion de clientes a usuarios autenticados" ON public.clients;
CREATE POLICY "Permitir edicion de clientes a usuarios autenticados" ON public.clients FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- CLIENT_CONTACTS RLS
DROP POLICY IF EXISTS "Permitir lectura de contactos a usuarios autenticados" ON public.client_contacts;
CREATE POLICY "Permitir lectura de contactos a usuarios autenticados" ON public.client_contacts FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Permitir insercion de contactos a usuarios autenticados" ON public.client_contacts;
CREATE POLICY "Permitir insercion de contactos a usuarios autenticados" ON public.client_contacts FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir edicion de contactos a usuarios autenticados" ON public.client_contacts;
CREATE POLICY "Permitir edicion de contactos a usuarios autenticados" ON public.client_contacts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- PROJECTS RLS
DROP POLICY IF EXISTS "Permitir lectura de proyectos a usuarios autenticados" ON public.projects;
CREATE POLICY "Permitir lectura de proyectos a usuarios autenticados" ON public.projects FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Permitir insercion de proyectos a usuarios autenticados" ON public.projects;
CREATE POLICY "Permitir insercion de proyectos a usuarios autenticados" ON public.projects FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir edicion de proyectos a usuarios autenticados" ON public.projects;
CREATE POLICY "Permitir edicion de proyectos a usuarios autenticados" ON public.projects FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- PROJECT_TASKS RLS
DROP POLICY IF EXISTS "Permitir lectura de tareas de proyecto a usuarios autenticados" ON public.project_tasks;
CREATE POLICY "Permitir lectura de tareas de proyecto a usuarios autenticados" ON public.project_tasks FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Permitir insercion de tareas de proyecto a usuarios autenticados" ON public.project_tasks;
CREATE POLICY "Permitir insercion de tareas de proyecto a usuarios autenticados" ON public.project_tasks FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir edicion de tareas de proyecto a usuarios autenticados" ON public.project_tasks;
CREATE POLICY "Permitir edicion de tareas de proyecto a usuarios autenticados" ON public.project_tasks FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- PROJECT_ACTIVITY RLS
DROP POLICY IF EXISTS "Permitir lectura de bitacora de proyectos a usuarios autenticados" ON public.project_activity;
CREATE POLICY "Permitir lectura de bitacora de proyectos a usuarios autenticados" ON public.project_activity FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Permitir insercion de bitacora de proyectos a usuarios autenticados" ON public.project_activity;
CREATE POLICY "Permitir insercion de bitacora de proyectos a usuarios autenticados" ON public.project_activity FOR INSERT TO authenticated WITH CHECK (true);
