# CORPLEX SOLUTIONS S.A.S. — Plataforma Web Institucional & Embudo AI Automation

Bienvenido al repositorio oficial de la plataforma web corporativa de **CORPLEX SOLUTIONS S.A.S.** (NIT 902061373-5), empresa colombiana especializada en desarrollo de software a la medida, arquitectura Cloud AWS, soluciones agrotech, simuladores educativos e inteligencia artificial.

* **Sitio Web Oficial:** [https://corplex-solutions-sas.vercel.app/](https://corplex-solutions-sas.vercel.app/)
* **Repositorio GitHub:** [https://github.com/jhonzapata2020/corplex-solutions-sas](https://github.com/jhonzapata2020/corplex-solutions-sas)

---

## 🛠️ Stack Tecnológico

* **Core UI:** React 19, TypeScript 5.8
* **Build Tool & Bundler:** Vite 8
* **Styling & CSS:** Tailwind CSS v4, Vanilla CSS Utility Layers
* **Iconografía:** Lucide React Icons (`lucide-react`)
* **Despliegue Continuo:** Vercel

---

## 📁 Estructura del Proyecto

```text
web_corplex_solutions/
├── docs/
│   └── automation-leads-architecture.md   # Arquitectura futura del sistema de leads y DB
├── public/                                # Activos estáticos públicos
├── src/
│   ├── assets/                            # Imágenes, logotipos y recursos gráficos
│   ├── components/                        # Componentes UI de la plataforma
│   │   ├── AIAutomationSection.tsx        # Embudo principal de la unidad Corplex AI Automation
│   │   ├── AcademicCapabilities.tsx       # Módulo educativo UNAD / ECBTI
│   │   ├── CloudArchitecture.tsx          # Visualizador interactivo de arquitectura AWS
│   │   ├── ContactSection.tsx             # Sección de contacto e información institucional
│   │   ├── Footer.tsx                     # Pie de página institucional
│   │   ├── Hero.tsx                       # Banner principal interactivo estilo Python.org
│   │   ├── LegalCompliance.tsx            # Ficha técnica legal, NIT y registros
│   │   ├── Logo.tsx                       # Logotipo oficial vectorizado de Corplex
│   │   ├── Methodology.tsx                # Línea de tiempo de metodología de ingeniería
│   │   ├── Navbar.tsx                     # Navegación superior y barra de utilidades
│   │   ├── PrivacyModal.tsx               # Modal accesible para la política informativa de privacidad
│   │   ├── QuoteModal.tsx                 # Cotizador interactivo de proyectos
│   │   ├── ScrollToTop.tsx                # Botón flotante para subir
│   │   ├── ServicesGrid.tsx               # Catálogo de servicios en Bento Grid
│   │   └── SplashIntro.tsx                # Pantalla de carga / boot interactivo
│   ├── config/
│   │   └── env.ts                         # Configuración centralizada de entorno (sin secretos)
│   ├── data/
│   │   ├── aiAutomationData.ts            # Textos y datos de la unidad AI Automation
│   │   └── corporateData.ts               # Información legal, servicios corporativos y AWS
│   ├── services/
│   │   └── leadService.ts                 # Capa de servicio desacoplada para envío de leads
│   ├── types/
│   │   ├── index.ts                       # Tipos globales de la aplicación
│   │   └── lead.ts                        # Contrato de tipos de leads y esquema DB futuro
│   ├── App.tsx                            # Layout principal y ensamblaje de la aplicación
│   ├── index.css                          # Tokens CSS globales y clases de Tailwind
│   └── main.tsx                           # Punto de entrada de React DOM
├── index.html                             # Estructura HTML base y metadatos SEO
├── package.json                           # Dependencias y scripts de ejecución
├── tsconfig.json                          # Configuración del compilador TypeScript
└── vite.config.ts                         # Configuración de Vite
```

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos
* Node.js v18.0.0 o superior
* npm v9.0.0 o superior

### 1. Clonar el repositorio
```bash
git clone https://github.com/jhonzapata2020/corplex-solutions-sas.git
cd web_corplex_solutions
```

### 2. Instalar dependencias
```bash
npm ci
```

### 3. Ejecutar entorno de desarrollo local
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`.

### 4. Compilar para producción
```bash
npm run build
```
Los archivos optimizados para producción se generarán en la carpeta `dist/`.

---

## 🤖 Unidad Corplex AI Automation

**Corplex AI Automation** es la unidad comercial orientada a automatizar procesos repetitivos e integrar herramientas de software corporativo sin obligar a las empresas a reemplazar sus sistemas actuales.

### ¿Cómo funciona actualmente el formulario de captación?
1. El usuario completa el formulario de primer contacto (5 campos: Nombre, Empresa, Contacto, Sector y Proceso a mejorar).
2. El formulario invoca la función `submitAutomationLead` en `src/services/leadService.ts`.
3. El servicio procesa la solicitud mediante un **adaptador seguro de demostración cliente**:
   - Valida los parámetros requeridos.
   - Genera un ID de seguimiento controlado (ej: `DEMO-LEAD-XXXXXX`).
   - Devuelve un resultado estructurado con indicación clara de modo demostración (sin engañar al usuario ni simular persistencia en BD).
   - Preserva los datos diligenciados en el estado de React en caso de cualquier error para evitar pérdidas de información.
4. Opcionalmente, el usuario puede hacer clic en el botón de WhatsApp para enviar el mensaje pre-estructurado con sus datos hacia la línea directa corporativa.

---

## ⚡ Estado de Integraciones: Capacidades vs Conexiones Activas

Para mantener total transparencia comercial y técnica con los clientes:

* **Capacidades Comerciales Diseñables (Demostradas / Documentadas):**
  - Orquestación con Make, n8n y scripts en Python / FastAPI.
  - Conectores a software médico (HIS), plataformas educativas (LMS/Moodle) y CRM/ERP.
  - Agentes de lenguaje (LLMs) con modelos RAG (Retrieval-Augmented Generation).
  - Infraestructura Cloud elástica en Amazon Web Services (AWS Lambda, RDS PostgreSQL, CloudWatch).

* **Integraciones Realmente Conectadas en este Frontend:**
  - Enrutamiento directo a canal oficial de WhatsApp (`https://wa.me/573207105618`).
  - Capa de servicio de leads desacoplada (`leadService.ts`) lista para conectarse a `POST /api/leads/automation` cuando el backend sea desplegado.

---

## 🔮 Pasos Futuros para Conexión de Backend Completo

Para conectar una infraestructura completa de backend y persistencia real:

1. **Creación del Backend API / Serverless:**
   - Desplegar una API o función serverless (Node.js Express / FastAPI / Supabase Edge Function).
   - Configurar la variable `VITE_API_LEADS_URL` en las variables de entorno del frontend.

2. **Base de Datos de Leads (`automation_leads`):**
   - Ejecutar el script SQL documentado en [`docs/automation-leads-architecture.md`](file:///c:/Users/JhonZapata/Desktop/web_corplex_solutions/docs/automation-leads-architecture.md) para crear la tabla `automation_leads` en PostgreSQL o Supabase.

3. **Anti-Spam & Seguridad:**
   - Implementar validaciones server-side, sanitización de entradas, rate-limiting por IP y captcha invisible (Cloudflare Turnstile).

4. **Notificación & CRM:**
   - Conectar un webhook a Slack / Discord / Email SMTP para alertar al equipo comercial sobre cada nuevo lead recibido en tiempo real.
