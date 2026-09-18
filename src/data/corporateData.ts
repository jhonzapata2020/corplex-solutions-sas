import type { LegalData, ServiceItem, CloudNode, MethodologyStep, AcademicFeature, CommerceCard, CommercePackage } from '../types';

export const LEGAL_INFO: LegalData = {
  companyName: "CORPLEX SOLUTIONS S.A.S.",
  nit: "902061373-5",
  mercantileRegistration: "No. 128676",
  chamberOfCommerce: "Cámara de Comercio de Urabá",
  legalRep: "Jhon Rafael Zapata Lizcano",
  ciiuCodes: [
    { code: "J6201", description: "Desarrollo de sistemas informáticos (planificación, análisis, diseño, programación, pruebas)" },
    { code: "J6202", description: "Consultoría informática y actividades de administración de instalaciones informáticas" },
    { code: "G4651", description: "Comercio al por mayor de computadores, equipo periférico y programas de informática" },
    { code: "S9511", description: "Mantenimiento y reparación de computadores y equipo periférico" }
  ],
  niifCategory: "Grupo III - Microempresas (Contabilidad simplificada)",
  address: "CL 112 No. 13 - 23, Barrio Buenos Aires",
  city: "Turbo",
  department: "Antioquia",
  country: "Colombia",
  institutionalEmail: "contacto@corplexsolutions.co",
  whatsapp1: "573207105618",
  whatsapp2: "573017304596",
  phone1Display: "+57 320 710 5618",
  phone2Display: "+57 301 730 4596"
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "ai-automation-1",
    category: "ai",
    categoryLabel: "OFERTA PILAR 1 · IA & AUTOMATIZACIÓN",
    title: "Automatización de Atención & Cotización Comercial",
    shortDesc: "Agentes de IA conversacionales (RAG), integración con WhatsApp API, cualificación de leads y automatización de cotizaciones comerciales con ROI medible.",
    fullDesc: "Diseñamos e implementamos asistentes virtuales con IA entrenados con las reglas y catálogo de tu empresa. Capturan prospectos en tiempo real, cualifican necesidades, responden preguntas complejas e integran los datos directamente con tu CRM y WhatsApp corporativo sin intervención manual.",
    icon: "Bot",
    features: [
      "Agentes conversacionales RAG entrenados con tu catálogo de productos y servicios",
      "Integración directa con WhatsApp API corporativo y formularios web",
      "Cualificación automática de leads y captura estructurada de requerimientos",
      "Generación instantánea de cotizaciones estimadas y seguimiento automático",
      "Medición en tiempo real de tiempo ahorrado y retorno de inversión (ROI)"
    ],
    techBadges: ["Agentes IA RAG", "WhatsApp API", "Python / FastAPI", "Make / n8n", "Supabase DB"],
    recommendedFor: "Equipos comerciales, Clínicas, Instituciones educativas y Pymes con alto flujo de consultas"
  },
  {
    id: "soft-1",
    category: "software",
    categoryLabel: "OFERTA PILAR 2 · SOFTWARE A LA MEDIDA",
    title: "Desarrollo de Software Crítico a Medida",
    shortDesc: "Plataformas web de alto rendimiento, sistemas ERP/CRM corporativos, simuladores interactivos UNAD y aplicaciones empresariales a la medida.",
    fullDesc: "Construimos software corporativo modular en React 19 y TypeScript. Desde soluciones de gestión interna (ERP/CRM) e inventarios hasta simuladores web docentes y laboratorios virtuales para la UNAD / ECBTI con alto volumen de concurrencia.",
    icon: "Code2",
    features: [
      "Frontend interactivo moderno con React 19 y TypeScript 5.8",
      "Sistemas ERP/CRM modulares para inventarios, logística y operaciones",
      "Simuladores educativos y laboratorios virtuales interactivos para UNAD / ECBTI",
      "APIs RESTful seguras e integración con bases de datos relacionales PostgreSQL",
      "Paneles de control gerenciales e inteligencia de negocios (BI) en tiempo real"
    ],
    techBadges: ["React 19", "TypeScript", "Node.js / Python", "PostgreSQL", "Simuladores UNAD"],
    recommendedFor: "Empresas, Pymes, Universidades (UNAD), Agroindustrias y Sector Público"
  },
  {
    id: "cloud-1",
    category: "cloud",
    categoryLabel: "OFERTA PILAR 3 · CLOUD AWS & SOPORTE TI",
    title: "Cloud Architecture, Seguridad & Soporte TI Administrado (SLA)",
    shortDesc: "Infraestructura elástica en Amazon Web Services (EC2 Auto Scaling, RDS, ALB, S3), ciberseguridad, redes y Mesa de Ayuda TI con SLA garantizado.",
    fullDesc: "Desplegamos y respaldamos la infraestructura tecnológica de tu organización en Amazon Web Services con objetivo de disponibilidad de hasta 99.9%, sujeto a arquitectura y SLA contratado. Ofrecemos además servicio de Mesa de Ayuda TI administrada para resolución priorizada de incidentes y mantenimiento preventivo.",
    icon: "Cloud",
    features: [
      "Arquitectura Serverless y EC2 Auto Scaling con objetivo de disponibilidad de hasta 99.9% (sujeto a SLA)",
      "Bases de datos relacionales administradas RDS (PostgreSQL/MySQL) cifradas KMS",
      "Estructuración de redes corporativas LAN/WiFi, WAF y ciberseguridad",
      "Mantenimiento preventivo y correctivo de infraestructura tecnológica",
      "Mesa de Ayuda TI con soporte técnico priorizado bajo Acuerdos SLA (<2h en críticas)"
    ],
    techBadges: ["AWS EC2", "AWS RDS PostgreSQL", "AWS ALB & WAF", "Mesa de Ayuda SLA", "Ciberseguridad"],
    recommendedFor: "Comités TI, Empresas con tráfico masivo y Organizaciones que requieren soporte garantizado"
  },
  {
    id: "commerce-1",
    category: "commerce",
    categoryLabel: "OFERTA PILAR 4 · CORPLEX COMMERCE",
    title: "Corplex Commerce: Ventas Automáticas & Gestión de Pedidos",
    shortDesc: "Tiendas online profesionales, pasarelas de pago (Wompi, Mercado Pago), automatización por WhatsApp, inventario en tiempo real e integración CRM.",
    fullDesc: "Corplex Commerce es la solución integral para crear tiendas online, procesar pagos seguros, gestionar inventario por variantes/sedes, automatizar notificaciones de despacho y conectar el flujo completo con tu CRM y WhatsApp Business API.",
    icon: "ShoppingCart",
    features: [
      "Tienda online responsive con catálogo, carrito y checkout desacoplado seguro",
      "Integración de pasarelas de pago locales (Wompi, Mercado Pago API, PSE, Tarjetas)",
      "Procesamiento e idempotencia de pedidos con alertas automáticas a operaciones",
      "Ventas conversacionales y catálogo inteligente integrado con WhatsApp API",
      "Sincronización directa con CRM comercial para retención y carritos abandonados"
    ],
    techBadges: ["Ecommerce API", "Checkout Wompi/MercadoPago", "WhatsApp API", "Control Inventario", "CRM Recompra"],
    recommendedFor: "Tiendas de moda, alimentos, tecnología, ferreterías, agroindustrias y comercios B2B"
  }
];

export const COMMERCE_CARDS: CommerceCard[] = [
  {
    id: "card-store",
    title: "Tienda online para cualquier negocio",
    description: "Crea una tienda profesional con catálogo, carrito, checkout fluido y diseño adaptable a celulares.",
    idealFor: "Tiendas de ropa, alimentos empacados, tecnología, belleza, hogar y comercio especializado.",
    includes: [
      "Catálogo dinámico & variantes (talla, color, presentación)",
      "Carrito de compras intuitivo y checkout responsive",
      "SEO técnico optimizado por producto y categoría",
      "Dominio corporativo con certificado de seguridad HTTPS"
    ],
    ctaButtonText: "Crear mi tienda",
    iconName: "ShoppingBag",
    badge: "Core Ecommerce"
  },
  {
    id: "card-whatsapp",
    title: "Ventas automáticas por WhatsApp",
    description: "Permite que tus clientes consulten productos, reciban recomendaciones y avancen hacia el pedido desde WhatsApp.",
    idealFor: "Negocios con alto volumen de consultas y ventas conversacionales directas.",
    includes: [
      "Catálogo conversacional inteligente 24/7",
      "Consulta inmediata de disponibilidad y stock",
      "Generación automática de links de pago y pedidos",
      "Transferencia transparente a asesor cuando hay excepciones"
    ],
    ctaButtonText: "Automatizar ventas",
    iconName: "MessageCircle",
    badge: "WhatsApp API"
  },
  {
    id: "card-payments",
    title: "Pagos y pedidos online",
    description: "Recibe pagos seguros, genera el registro de pedidos y notifica automáticamente al cliente y a tu equipo.",
    idealFor: "Comercios que requieren cobranza automatizada sin almacenar datos sensibles de tarjetas.",
    includes: [
      "Integración oficial con Wompi y Mercado Pago API",
      "Confirmaciones de pago por webhooks validados",
      "Radicado y número de pedido único con estado logístico",
      "Notificaciones automáticas por correo y WhatsApp"
    ],
    ctaButtonText: "Activar pagos",
    iconName: "CreditCard",
    badge: "Pagos Seguros"
  },
  {
    id: "card-inventory",
    title: "Inventario y control de productos",
    description: "Controla existencias, variantes, reservas durante el checkout y alertas de stock desde un panel centralizado.",
    idealFor: "Negocios con múltiples sedes, bodegas o catálogos con alto número de variantes.",
    includes: [
      "Reserva temporal de stock durante la transacción",
      "Stock mínimo configurable con alertas tempranas",
      "Control detallado por variante (talla, color, SKU)",
      "Ajustes manuales e historial auditables"
    ],
    ctaButtonText: "Organizar inventario",
    iconName: "Package",
    badge: "Control de Stock"
  },
  {
    id: "card-crm",
    title: "CRM para clientes y recompra",
    description: "Convierte compradores ocasionales en clientes recurrentes con seguimiento, segmentación y campañas autorizadas.",
    idealFor: "Equipos comerciales y marketing enfocados en retención y valor de vida del cliente (LTV).",
    includes: [
      "Perfil unificado del comprador e historial de compras",
      "Seguimiento y recuperación de carritos abandonados",
      "Automatizaciones de recompra y venta cruzada (cross-selling)",
      "Segmentación por frecuencia y monto de consumo"
    ],
    ctaButtonText: "Conectar CRM",
    iconName: "Users",
    badge: "Fidelización CRM"
  },
  {
    id: "card-b2b",
    title: "Ecommerce B2B y pedidos empresariales",
    description: "Gestiona clientes mayoristas, listas de precios especiales, solicitudes de cotización y pedidos recurrentes.",
    idealFor: "Distribuidores, fabricantes, importadores y proveedores institucionales.",
    includes: [
      "Precios y condiciones comerciales por cliente/categoría",
      "Flujos de aprobación y asignaciones de crédito",
      "Solicitud de cotizaciones e integración empresarial",
      "Portal autoservicio corporativo para compras masivas"
    ],
    ctaButtonText: "Vender a empresas",
    iconName: "Building2",
    badge: "Portal Mayorista"
  }
];

export const COMMERCE_PACKAGES: CommercePackage[] = [
  {
    id: "pkg-start",
    name: "Commerce Start",
    tagline: "Esencial para iniciar ventas digitales organizadas",
    scope: "Tienda, catálogo, carrito, dominio corporativo, configuración inicial y capacitación.",
    targetClient: "Emprendedores y pequeños comercios que venden principalmente por redes sociales.",
    features: [
      "Catálogo de hasta 100 productos",
      "Carrito y checkout simplificado",
      "Notificación de pedido por email/WhatsApp",
      "Diseño responsive mobile-first",
      "Capacitación inicial operativa"
    ]
  },
  {
    id: "pkg-sell",
    name: "Commerce Sell",
    tagline: "Ventas y cobros automáticos sin fricción",
    scope: "Commerce Start + pasarela de pagos, gestión de pedidos, notificaciones y panel administrativo.",
    targetClient: "Tiendas que quieren vender y cobrar online de forma ordenada y automatizada.",
    features: [
      "Integración pasarela Wompi / Mercado Pago API",
      "Panel de gestión de pedidos e inventario",
      "Notificaciones de estado de compra al cliente",
      "Alertas de preparación al equipo interno",
      "Soporte técnico y respaldos periódicos"
    ],
    isPopular: true
  },
  {
    id: "pkg-growth",
    name: "Commerce Growth",
    tagline: "Escala comercial con CRM y carritos abandonados",
    scope: "Commerce Sell + CRM comercial, inventario avanzado, recuperación de carritos y analítica.",
    targetClient: "Negocios en crecimiento con volumen constante de pedidos y equipo comercial.",
    features: [
      "CRM de clientes y recuperación de carritos",
      "Control de inventario por sede/bodega",
      "Campañas automáticas de recompra",
      "Dashboard de conversión y métricas",
      "Asistente conversacional IA opcional"
    ]
  },
  {
    id: "pkg-b2b",
    name: "Commerce B2B",
    tagline: "Ventas mayoristas e institucionales simplificadas",
    scope: "Catálogo mayorista, precios diferenciados, aprobaciones de crédito y cotizaciones empresariales.",
    targetClient: "Distribuidores, fabricantes, importadores y proveedores institucionales.",
    features: [
      "Listas de precios personalizadas por cliente",
      "Flujo de aprobación y cotizaciones corporativas",
      "Condiciones comerciales y cupos de crédito",
      "Portal autoservicio corporativo B2B",
      "Integración con ERP o sistema contable"
    ]
  },
  {
    id: "pkg-omnichannel",
    name: "Commerce Omnichannel",
    tagline: "Integración total multi-canal y soporte prioritario",
    scope: "Tienda, WhatsApp API, tienda física, inventario multi-sede, logística y soporte SLA.",
    targetClient: "Empresas consolidadas con múltiples canales de venta y operación compleja.",
    features: [
      "Sincronización de inventario multi-sede en tiempo real",
      "WhatsApp Business API con asistentes IA",
      "Integración logística y pasarelas múltiples",
      "Soporte priorizado con SLA de respuesta (<2h)",
      "Desarrollos de módulos personalizados"
    ]
  }
];

export const ACADEMIC_FEATURES: AcademicFeature[] = [
  {
    id: "simulators",
    title: "Simuladores Web Interactivos y Laboratorios Virtuales",
    subtitle: "Articulación con ECBTI - UNAD & Programas de Ingeniería",
    badge: "Formación Práctica Interactiva",
    description: "Desarrollamos entornos gráficos interactivos para la simulación de conceptos de ingeniería, física, estructuras de datos, redes y matemáticas aplicadas. Permite a los estudiantes experimentar en tiempo real sin requerir instalaciones complejas.",
    highlights: [
      "Simulación de algoritmos, lógica de programación y estructuras de redes",
      "Visualizaciones matemáticas y físicas en canvas interactivo 2D/3D",
      "Retroalimentación en tiempo real e informes descargables de prácticas",
      "Integrables en plataformas LMS mediante estándares LTI / Web Embed"
    ],
    statsNumber: "100%",
    statsLabel: "Web Native & Sin Plugins Extra",
    icon: "GraduationCap",
    demoType: "simulator"
  },
  {
    id: "tracking",
    title: "Plataformas de Gestión de Semilleros & Convocatorias",
    subtitle: "Trazabilidad Académica y Proyectos de Investigación",
    badge: "Control Curricular & Métricas",
    description: "Sistemas web centralizados para el registro de semilleristas, control de entregables, evaluación de ponencias y seguimiento a proyectos de investigación formativa y aplicada.",
    highlights: [
      "Módulos de registro de estudiantes, tutores y líneas de investigación",
      "Carga de avances de proyectos con control de versiones y rúbricas",
      "Exportación de matrices institucionales para auditorías de acreditación",
      "Panel de control gerencial para líderes de semillero y decanaturas"
    ],
    statsNumber: "03x",
    statsLabel: "Mayor Eficiencia en Auditorías",
    icon: "Building2",
    demoType: "tracking"
  },
  {
    id: "concurrency",
    title: "Arquitectura Cloud para Picos Masivos de Evaluación",
    subtitle: "Garantía de Cero Caídas en Exámenes Nacionales & Matrículas",
    badge: "Alta Disponibilidad AWS",
    description: "Despliegues en AWS diseñados específicamente para soportar miles de estudiantes de forma simultánea rindiendo evaluaciones o realizando trámites de matrícula.",
    highlights: [
      "Auto Scaling Groups que incrementan servidores en segundos",
      "Réplicas de lectura en RDS PostgreSQL para balancear consultas",
      "Cache distribuido (Redis / ElastiCache) para respuestas sub-segundo",
      "Resistencia a picos de tráfico con monitoreo sintético en tiempo real"
    ],
    statsNumber: "99.9%",
    statsLabel: "Objetivo de Disponibilidad (SLA)",
    icon: "ShieldCheck",
    demoType: "concurrency"
  }
];

export const CLOUD_NODES: CloudNode[] = [
  {
    id: "dns-waf",
    name: "Route 53 + AWS WAF",
    serviceType: "Network & Security",
    iconName: "ShieldCheck",
    category: "security",
    description: "Enrutamiento DNS global ultra rápido combinado con Firewall de Aplicación Web para mitigar ataques DDoS y scraping nocivo.",
    metrics: "< 15ms Latencia Global",
    status: "Operational",
    details: [
      "Gestión DNS con Route 53 Health Checks",
      "Reglas WAF contra SQL Injection y XSS",
      "Protección DDoS con AWS Shield Standard"
    ]
  },
  {
    id: "alb",
    name: "Elastic Load Balancer (ALB)",
    serviceType: "Load Balancing",
    iconName: "Layers",
    category: "network",
    description: "Distribuidor inteligente de tráfico HTTP/HTTPS entre múltiples servidores con terminación SSL/TLS segura.",
    metrics: "10,000+ Req/sec capacity",
    status: "High Availability",
    details: [
      "Health Checks automáticos a instancias",
      "Terminación de certificados SSL de AWS Certificate Manager",
      "Distribución Multi-AZ (Multi Zona de Disponibilidad)"
    ]
  },
  {
    id: "ec2-cluster",
    name: "EC2 Auto-Scaling Group",
    serviceType: "Compute Power",
    iconName: "Cpu",
    category: "compute",
    description: "Cluster dinámico de servidores web que se escala automáticamente según la carga de CPU y solicitudes entrantes.",
    metrics: "Escalado dinámico 2-20 nodos",
    status: "Operational",
    details: [
      "Instancias t3/c6g de alto rendimiento",
      "Despliegues sin interrupción de servicio (Zero-downtime)",
      "Aislamiento en subredes privadas VPC"
    ]
  },
  {
    id: "rds-db",
    name: "Amazon RDS PostgreSQL",
    serviceType: "Managed Relational DB",
    iconName: "Database",
    category: "database",
    description: "Motor relacional primario con réplicas de lectura, backups automatizados y encriptación de datos en reposo KMS.",
    metrics: "Multi-AZ Storage / Encryption",
    status: "Encrypted",
    details: [
      "Réplica Multi-AZ para failover instantáneo",
      "Backups automáticos diarios con retención a 30 días",
      "Encriptación AES-256 en reposo"
    ]
  },
  {
    id: "s3-storage",
    name: "Amazon S3 + CloudFront CDN",
    serviceType: "Object Storage & CDN",
    iconName: "Cloud",
    category: "storage",
    description: "Almacenamiento persistente de archivos institucionales, reportes, imágenes e hipermedios distribuido a nivel global.",
    metrics: "99.999999999% Durabilidad",
    status: "Operational",
    details: [
      "Entrega ultra rápida vía CDN CloudFront",
      "Políticas de acceso restrictivas IAM y bucket privado",
      "Control de versiones de archivos para auditoría"
    ]
  }
];

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    number: "01",
    title: "Diagnóstico & Requerimientos",
    subtitle: "Fase de Alineación Institucional",
    description: "Levantamiento detallado de requerimientos funcionales, evaluación de factibilidad técnica y definición del alcance acordado con el cliente o comité técnico.",
    deliverables: ["Matriz de Requerimientos Funcionales", "Arquitectura Conceptual preliminar", "Plan de Proyecto y Cronograma de Hitos"],
    icon: "CheckCircle2",
    phaseCode: "REQ-PHASE"
  },
  {
    number: "02",
    title: "Prototipado & Diseño UI/UX",
    subtitle: "Modelado Visual e Interactivo",
    description: "Diseño de wireframes de alta fidelidad, prototipos navegables y definición de la arquitectura de base de datos relacional/no relacional.",
    deliverables: ["Prototipo Figma navegable", "Diagrama Entidad-Relación (ERD)", "Especificación de API REST"],
    icon: "Layers",
    phaseCode: "DESIGN-PHASE"
  },
  {
    number: "03",
    title: "Desarrollo Iterativo Ágil",
    subtitle: "Sprints bajo Scrum / Kanban",
    description: "Construcción modular por componentes en React/TypeScript y servicios backend estructurados con control riguroso de versiones en Git.",
    deliverables: ["Sprints quincenales funcionales", "Código fuente versionado en Repositorio Privado", "Demostraciones periódicas de avance"],
    icon: "Code2",
    phaseCode: "DEV-PHASE"
  },
  {
    number: "04",
    title: "QA, Pruebas & Seguridad",
    subtitle: "Validación Funcional y Estrés",
    description: "Ejecución de pruebas de usabilidad, simulación de cargas concurrentes y verificación de protocolos de seguridad en consulta de datos.",
    deliverables: ["Informe de Pruebas de Estrés", "Checklist de Seguridad y Permisos", "Certificación de Código Limpio"],
    icon: "ShieldCheck",
    phaseCode: "QA-PHASE"
  },
  {
    number: "05",
    title: "Despliegue Cloud AWS & Entrega",
    subtitle: "Puesta en Producción Controlada",
    description: "Orquestación de infraestructura en AWS, configuración de dominios, certificados SSL y transferencia formal de activos digitales.",
    deliverables: ["Entorno en Producción AWS 100% activo", "Manuales Técnicos de Usuario y Administrador", "Acta de Entrega y Paz y Salvo Técnico"],
    icon: "Cloud",
    phaseCode: "DEPLOY-PHASE"
  },
  {
    number: "06",
    title: "Soporte Continuo & SLA",
    subtitle: "Mantenimiento Evolutivo",
    description: "Monitoreo continuo de disponibilidad, parches de seguridad, optimizaciones de rendimiento y soporte técnico priorizado.",
    deliverables: ["Acuerdo de Nivel de Servicio (SLA)", "Monitoreo de Salud de Servidores 24/7", "Canal directo de Soporte WhatsApp/Ticket"],
    icon: "Zap",
    phaseCode: "SLA-PHASE"
  }
];
