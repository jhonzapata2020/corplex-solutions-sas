-- ==============================================================================
-- CORPLEX SOLUTIONS S.A.S. — Script de Migración SQL para Fase 6: CMS de Contenido Web & Configuración Global
-- Ejecutar este archivo en el SQL Editor de Supabase (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. Tabla de Servicios Destacados (site_services)
CREATE TABLE IF NOT EXISTS public.site_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    icon_name VARCHAR(50) DEFAULT 'Cpu',
    badge VARCHAR(50) DEFAULT 'Popular',
    short_description TEXT NOT NULL,
    full_description TEXT,
    price_starting_at NUMERIC(14,2) DEFAULT 0.00,
    is_featured BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    display_order INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabla de Casos de Éxito / Portafolio (case_studies)
CREATE TABLE IF NOT EXISTS public.case_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'Automatización IA',
    summary TEXT NOT NULL,
    impact_metrics VARCHAR(255) DEFAULT '99% Eficiencia Operativa',
    image_url TEXT,
    is_published BOOLEAN DEFAULT true,
    display_order INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabla de Preguntas Frecuentes (site_faqs)
CREATE TABLE IF NOT EXISTS public.site_faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'General',
    is_active BOOLEAN DEFAULT true,
    display_order INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabla de Paquetes y Planes Corporativos (site_packages)
CREATE TABLE IF NOT EXISTS public.site_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    price_cop NUMERIC(14,2) NOT NULL DEFAULT 0.00,
    features TEXT[] DEFAULT '{}',
    badge_text VARCHAR(50),
    is_popular BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Tabla de Configuración Global del Sitio (site_settings)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'default',
    company_name VARCHAR(255) DEFAULT 'CORPLEX SOLUTIONS S.A.S.',
    nit_tax_id VARCHAR(50) DEFAULT '902061373-5',
    contact_email VARCHAR(255) DEFAULT 'contacto@corplex.co',
    contact_phone VARCHAR(50) DEFAULT '+57 310 892 4825',
    whatsapp_number VARCHAR(50) DEFAULT '573108924825',
    address TEXT DEFAULT 'Turbo, Urabá, Antioquia, Colombia',
    city_region VARCHAR(100) DEFAULT 'Turbo, Urabá',
    default_tax_rate NUMERIC(5,2) DEFAULT 19.00,
    enable_email_alerts BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Registro Semilla Inicial de Configuración
INSERT INTO public.site_settings (id, company_name, nit_tax_id, contact_email, contact_phone, whatsapp_number, address, city_region, default_tax_rate, enable_email_alerts)
VALUES ('default', 'CORPLEX SOLUTIONS S.A.S.', '902061373-5', 'contacto@corplex.co', '+57 310 892 4825', '573108924825', 'Turbo, Urabá, Antioquia, Colombia', 'Turbo, Urabá', 19.00, true)
ON CONFLICT (id) DO NOTHING;

-- 6. POLÍTICAS DE SEGURIDAD RLS (Row Level Security)
ALTER TABLE public.site_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- LECTURA PÚBLICA PARA RENDERING EN EL SITIO WEB
CREATE POLICY "Permitir lectura publica de servicios" ON public.site_services FOR SELECT USING (true);
CREATE POLICY "Permitir lectura publica de casos de exito" ON public.case_studies FOR SELECT USING (true);
CREATE POLICY "Permitir lectura publica de faqs" ON public.site_faqs FOR SELECT USING (true);
CREATE POLICY "Permitir lectura publica de paquetes" ON public.site_packages FOR SELECT USING (true);
CREATE POLICY "Permitir lectura publica de configuracion" ON public.site_settings FOR SELECT USING (true);

-- ESCRITURA RESTRINGIDA A USUARIOS AUTENTICADOS (ADMINISTRADORES)
CREATE POLICY "Permitir escritura de servicios a autenticados" ON public.site_services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Permitir escritura de casos de exito a autenticados" ON public.case_studies FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Permitir escritura de faqs a autenticados" ON public.site_faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Permitir escritura de paquetes a autenticados" ON public.site_packages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Permitir escritura de configuracion a autenticados" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
