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
    id: "soft-1",
    category: "software",
    categoryLabel: "Desarrollo & Web Apps",
    title: "Plataformas Web a la Medida & Portales Interactivos",
    shortDesc: "Diseño y desarrollo de sistemas web escalables, simuladores interactivos y portales institucionales en React & TypeScript.",
    fullDesc: "Creamos software robusto enfocado en experiencia de usuario fluida, arquitectura limpia de componentes, optimización de velocidad de carga y total adaptabilidad a procesos institucionales o empresariales.",
    icon: "Code2",
    features: [
      "Frontend interactivo con React & TypeScript",
      "Backend estructurado y REST APIs en Node.js / Python",
      "Simuladores web y entornos de prueba interactivos",
      "Diseño adaptativo (Mobile First) con animaciones fluidas",
      "Panel de administración a la medida"
    ],
    techBadges: ["React", "TypeScript", "Node.js", "Python", "Tailwind CSS", "REST API"],
    recommendedFor: "Instituciones de Educación Superior, Entidades Públicas y Empresas"
  },
  {
    id: "soft-2",
    category: "software",
    categoryLabel: "Desarrollo & Web Apps",
    title: "Modernización & Refactorización de Código",
    shortDesc: "Migración de plataformas legacy a arquitecturas modernas con código limpio, patrones ágiles y estándares de seguridad.",
    fullDesc: "Auditamos, optimizamos y reestructuramos bases de código heredadas para garantizar mantenibilidad a largo plazo, eliminar deuda técnica y acelerar el tiempo de respuesta.",
    icon: "Terminal",
    features: [
      "Auditoría técnica de código fuente y rendimiento",
      "Refactorización hacia arquitecturas basadas en componentes",
      "Optimización de consumo de memoria y tiempo de render",
      "Implementación de TypeScript para tipado estricto",
      "Pruebas unitarias e integración continua"
    ],
    techBadges: ["Refactoring", "TypeScript", "Clean Code", "Jest", "Git"],
    recommendedFor: "Plataformas web consolidadas que requieren actualización tecnológica"
  },
  {
    id: "cloud-1",
    category: "cloud",
    categoryLabel: "Cloud AWS & DevOps",
    title: "Arquitectura Cloud AWS Escalable & Alta Disponibilidad",
    shortDesc: "Despliegue y orquestación de infraestructura en Amazon Web Services (AWS) con balanceo de carga y aislamiento VPC.",
    fullDesc: "Diseñamos entornos de nube diseñados para soportar picos masivos de tráfico en matrículas, evaluaciones o lanzamientos comerciales con 99.9% de disponibilidad.",
    icon: "Cloud",
    features: [
      "Instancias Amazon EC2 con Auto Scaling",
      "Bases de datos administradas RDS (PostgreSQL / MySQL)",
      "Almacenamiento seguro Amazon S3 y distribuciones CloudFront CDN",
      "VPC privadas, subredes, Security Groups y WAF",
      "Balanceadores de Carga Elastic Load Balancer (ALB)"
    ],
    techBadges: ["AWS EC2", "AWS RDS", "Amazon S3", "AWS ALB", "Route 53", "VPC"],
    recommendedFor: "Comités de Proyectos TI y Compras Institucionales"
  },
  {
    id: "cloud-2",
    category: "cloud",
    categoryLabel: "Cloud AWS & DevOps",
    title: "Pipelines CI/CD & Monitoreo 24/7",
    shortDesc: "Automatización de despliegues continuos, integración Git y supervisión de salud de servidores en tiempo real.",
    fullDesc: "Implementamos flujos automáticos para que cada actualización de software pase por pruebas de calidad y se despliegue sin interrumpir la operación de los usuarios.",
    icon: "Cpu",
    features: [
      "Integración y Despliegue Continuos con GitHub Actions",
      "Monitoreo de métricas CPU, RAM e I/O con CloudWatch",
      "Certificados SSL/TLS automatizados y gestión DNS",
      "Estrategias de Backup automatizadas con rotación",
      "Planes de recuperación ante desastres (Disaster Recovery)"
    ],
    techBadges: ["GitHub Actions", "Docker", "AWS CloudWatch", "Nginx", "SSL"],
    recommendedFor: "Equipos de desarrollo y proyectos institucionales en evolución"
  },
  {
    id: "ai-1",
    category: "ai",
    categoryLabel: "Automatización & IA",
    title: "Agentes Inteligentes & Automatización de Procesos",
    shortDesc: "Soluciones de procesamiento inteligente de datos, asistentes conversacionales y automatización de tareas repetitivas.",
    fullDesc: "Integramos capacidades de inteligencia artificial aplicada y automatización mediante flujos que reducen tiempos de respuesta administrativa y análisis documental.",
    icon: "Zap",
    features: [
      "Integración de LLMs para asistencia técnica e institucional",
      "Tableros de control e indicadores gerenciales en tiempo real",
      "Extracción y estructuración automática de documentos PDF/Excel",
      "Integración con APIs institucionales y bots de atención",
      "Automatización de notificaciones y recordatorios"
    ],
    techBadges: ["Python", "OpenAI / Claude API", "FastAPI", "Pandas", "Webhooks"],
    recommendedFor: "Semilleros de investigación, áreas de planeación y servicio al cliente"
  },
  {
    id: "infra-1",
    category: "infrastructure",
    categoryLabel: "Infraestructura & Soporte",
    title: "Soporte Especializado TI & Mantenimiento Preventivo",
    shortDesc: "Gestión integral de parque informático, mantenimiento físico/lógico, diagnóstico de hardware y cableado estructurado.",
    fullDesc: "Ofrecemos cobertura presencial y remota para asegurar el funcionamiento óptimo de redes corporativas, servidores locales, estaciones de trabajo y periféricos (CIIU S9511 / G4651).",
    icon: "Server",
    features: [
      "Mantenimiento preventivo y correctivo de hardware (CIIU S9511)",
      "Estructuración de redes LAN / WiFi de alta velocidad",
      "Configuración de firewalls y seguridad de red local",
      "Asesoría y suministro de licencias y equipamiento TI (CIIU G4651)",
      "SLA de atención prioritaria para emergencias técnicas"
    ],
    techBadges: ["Redes LAN/WiFi", "Hardware Diagnostic", "Firewalls", "SLA Priority", "Windows/Linux Server"],
    recommendedFor: "Sedes administrativas, colegios, laboratorios y Pymes en Urabá"
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
