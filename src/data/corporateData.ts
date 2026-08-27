import type { LegalData, ServiceItem, CloudNode, MethodologyStep, AcademicFeature } from '../types';

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
  institutionalEmail: "triangelturbo@gmail.com",
  whatsapp1: "573207105618",
  whatsapp2: "573017304596",
  phone1Display: "+57 320 710 5618",
  phone2Display: "+57 301 730 4596"
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "agrotech-1",
    category: "ai",
    categoryLabel: "Agrotech & IA",
    title: "Agrotech, IoT & IA para Agricultura de Precisión",
    shortDesc: "Software inteligente para gestión y monitoreo de cultivos (plátano, café, cítricos, frutales) con sensores IoT y modelos predictivos de IA.",
    fullDesc: "Desarrollamos soluciones agrotech diseñadas para el campo colombiano. Integración con sensores de humedad de suelo, estaciones meteorológicas y pluviómetros. Algoritmos de IA para recomendaciones de riego, prevención de plagas/clima y trazabilidad de cosechas.",
    icon: "Sprout",
    features: [
      "Monitoreo inteligente de cultivos (plátano, café, cítricos y frutales)",
      "Integración IoT con sensores de suelo, humedad y pluviómetros",
      "Modelos predictivos de IA para sugerencias de riego y nutrición",
      "Alertas tempranas de prevención climática y fitosanitaria",
      "Trazabilidad de cosecha y paneles de rendimiento por hectárea"
    ],
    techBadges: ["Agrotech", "IoT Sensors", "AI Models", "Python", "React", "FastAPI"],
    recommendedFor: "Productores agrícolas, Fincas bananeras/cafeteras, Asociaciones y Agroindustrias"
  },
  {
    id: "soft-1",
    category: "software",
    categoryLabel: "Software Empresarial",
    title: "Desarrollo de Software Empresarial & Web Apps a la Medida",
    shortDesc: "Sistemas de gestión interna, inventarios, logística, tableros gerenciales (BI) y APIs RESTful en React, TypeScript y Node.js/Python.",
    fullDesc: "Creamos software corporativo robusto para optimizar operaciones críticas, automatizar flujos de trabajo empresariales y conectar sistemas legados mediante APIs escalables.",
    icon: "Code2",
    features: [
      "Frontend interactivo moderno con React & TypeScript",
      "Backend estructurado y REST APIs en Node.js / Python",
      "Módulos de gestión de inventarios, logística y facturación",
      "Tableros de control gerencial BI en tiempo real",
      "Diseño adaptativo con altos estándares de seguridad"
    ],
    techBadges: ["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "REST API"],
    recommendedFor: "Empresas, Pymes, Comercializadoras y Entidades Administrativas"
  },
  {
    id: "cloud-1",
    category: "cloud",
    categoryLabel: "Cloud AWS & DevOps",
    title: "Arquitectura Cloud AWS, DevOps & Monitoreo 24/7",
    shortDesc: "Despliegue de alta disponibilidad en Amazon Web Services (EC2 Auto Scaling, RDS PostgreSQL, S3, ALB) y monitoreo continuo.",
    fullDesc: "Diseñamos e implementamos infraestructura en la nube respaldada por AWS con 99.9% de disponibilidad, balanceo automático de carga y políticas de seguridad KMS.",
    icon: "Cloud",
    features: [
      "Clusters Amazon EC2 con Auto Scaling dinámico",
      "Bases de datos administradas RDS (PostgreSQL / MySQL) cifradas",
      "Almacenamiento Amazon S3 y distribución CDN CloudFront",
      "Balanceadores de carga Elastic Load Balancer (ALB)",
      "Monitoreo continuo 24/7 y optimización de costos AWS"
    ],
    techBadges: ["AWS EC2", "AWS RDS", "Amazon S3", "AWS ALB", "Route 53", "Docker"],
    recommendedFor: "Comités de Proyectos TI, Plataformas de Tráfico Masivo y Empresas"
  },
  {
    id: "edu-1",
    category: "software",
    categoryLabel: "Sector Educativo",
    title: "Simuladores Interactivos & Sector Educativo / Institucional",
    shortDesc: "Entornos web interactivos, simuladores de código, laboratorios virtuales y módulos académicos para universidades (UNAD) y sector público.",
    fullDesc: "Construimos laboratorios virtuales y plataformas de formación práctica para la Escuela de Ciencias Básicas, Tecnología e Ingeniería (ECBTI - UNAD), semilleros de investigación y entes gubernamentales.",
    icon: "GraduationCap",
    features: [
      "Simuladores web de conceptos de ingeniería y programación",
      "Visualizaciones 2D/3D interactivas en canvas ejecutable",
      "Módulos de trazabilidad para semilleros de investigación I+D+i",
      "Integrable en LMS mediante estándares LTI / Web Embed",
      "Soporte a picos masivos de estudiantes durante exámenes"
    ],
    techBadges: ["UNAD ECBTI", "Simuladores Web", "LTI Standard", "React", "Canvas 2D/3D"],
    recommendedFor: "Universidades (UNAD), Institutos Técnicos, Grupos I+D+i y Entidades Públicas"
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
    statsLabel: "Disponibilidad Garantizada",
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
