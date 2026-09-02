-- ==============================================================================
-- CORPLEX SOLUTIONS S.A.S. — Script de Migración SQL para Fase 2: Notificaciones & Tareas
-- Ejecutar este archivo en el SQL Editor de Supabase (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. Tabla de Notificaciones Internas (notifications)
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    automation_lead_id UUID REFERENCES public.automation_leads(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    target_role VARCHAR(50) DEFAULT 'admin',
    type VARCHAR(50) NOT NULL DEFAULT 'new_lead',
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    channel VARCHAR(50) NOT NULL DEFAULT 'system',
    status VARCHAR(20) NOT NULL DEFAULT 'sent',
    is_read BOOLEAN NOT NULL DEFAULT false,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    sent_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices de Rendimiento para Notificaciones
CREATE INDEX IF NOT EXISTS idx_notifications_target_role ON public.notifications(target_role);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);

-- 2. Tabla de Tareas de Seguimiento Automático (follow_up_tasks)
CREATE TABLE IF NOT EXISTS public.follow_up_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    automation_lead_id UUID REFERENCES public.automation_leads(id) ON DELETE CASCADE,
    task_type VARCHAR(50) NOT NULL DEFAULT 'initial_contact',
    assigned_to VARCHAR(120),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date TIMESTAMPTZ NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    CONSTRAINT unique_lead_task_type UNIQUE (automation_lead_id, task_type),
    CONSTRAINT check_task_status CHECK (status IN ('pending', 'in_progress', 'completed', 'overdue', 'cancelled'))
);

-- Índices de Rendimiento para Tareas
CREATE INDEX IF NOT EXISTS idx_follow_up_tasks_lead ON public.follow_up_tasks(automation_lead_id);
CREATE INDEX IF NOT EXISTS idx_follow_up_tasks_status ON public.follow_up_tasks(status);
CREATE INDEX IF NOT EXISTS idx_follow_up_tasks_due_date ON public.follow_up_tasks(due_date);

-- 3. Función y Trigger de Automatización para Nuevos Leads
CREATE OR REPLACE FUNCTION public.fn_on_new_lead_automation()
RETURNS TRIGGER AS $$
BEGIN
    -- A. Crear Notificación Global para el Rol Admin (user_id IS NULL, target_role = 'admin')
    INSERT INTO public.notifications (
        automation_lead_id,
        user_id,
        target_role,
        type,
        title,
        message,
        channel,
        status,
        is_read,
        created_at,
        sent_at
    ) VALUES (
        NEW.id,
        NULL,
        'admin',
        'new_lead',
        '¡Nueva Solicitud de Lead Recibida!',
        'El cliente ' || NEW.full_name || ' de la empresa ' || COALESCE(NEW.company_name, 'Sin especificar') || ' ha registrado una solicitud.',
        'system',
        'sent',
        false,
        NOW(),
        NOW()
    );

    -- B. Crear Tarea Inicial de Seguimiento Comercial (Vencimiento a 24 Horas, Sin Asignar)
    INSERT INTO public.follow_up_tasks (
        automation_lead_id,
        task_type,
        assigned_to,
        title,
        description,
        due_date,
        status,
        created_at
    ) VALUES (
        NEW.id,
        'initial_contact',
        NULL, -- Tarea inicial Sin Asignar para que cualquier admin la tome
        'Primer contacto comercial con ' || NEW.full_name,
        'Realizar primera llamada o mensaje de WhatsApp para diagnosticar la necesidad: ' || COALESCE(NEW.bottleneck_description, 'Sin descripción'),
        NOW() + INTERVAL '24 hours',
        'pending',
        NOW()
    )
    ON CONFLICT (automation_lead_id, task_type) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recrear Trigger de Automatización sobre public.automation_leads
DROP TRIGGER IF EXISTS tr_on_new_lead_automation ON public.automation_leads;
CREATE TRIGGER tr_on_new_lead_automation
AFTER INSERT ON public.automation_leads
FOR EACH ROW
EXECUTE FUNCTION public.fn_on_new_lead_automation();

-- 4. POLÍTICAS DE SEGURIDAD RLS (Row Level Security)

-- Habilitar RLS en notifications y follow_up_tasks
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follow_up_tasks ENABLE ROW LEVEL SECURITY;

-- Políticas para NOTIFICATIONS (Acceso restringido a usuarios autenticados)
DROP POLICY IF EXISTS "Permitir lectura de notificaciones a usuarios autenticados" ON public.notifications;
CREATE POLICY "Permitir lectura de notificaciones a usuarios autenticados"
ON public.notifications
FOR SELECT
TO authenticated
USING (user_id IS NULL OR target_role = 'admin' OR user_id = auth.uid());

DROP POLICY IF EXISTS "Permitir actualizacion de notificaciones a usuarios autenticados" ON public.notifications;
CREATE POLICY "Permitir actualizacion de notificaciones a usuarios autenticados"
ON public.notifications
FOR UPDATE
TO authenticated
USING (user_id IS NULL OR target_role = 'admin' OR user_id = auth.uid())
WITH CHECK (true);

-- Políticas para FOLLOW_UP_TASKS (Acceso restringido a usuarios autenticados)
DROP POLICY IF EXISTS "Permitir lectura de tareas a usuarios autenticados" ON public.follow_up_tasks;
CREATE POLICY "Permitir lectura de tareas a usuarios autenticados"
ON public.follow_up_tasks
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Permitir edicion de tareas a usuarios autenticados" ON public.follow_up_tasks;
CREATE POLICY "Permitir edicion de tareas a usuarios autenticados"
ON public.follow_up_tasks
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir insercion de tareas a usuarios autenticados" ON public.follow_up_tasks;
CREATE POLICY "Permitir insercion de tareas a usuarios autenticados"
ON public.follow_up_tasks
FOR INSERT
TO authenticated
WITH CHECK (true);
