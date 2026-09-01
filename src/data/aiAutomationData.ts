import type { AutomationVertical, AutomationHowStep, AutomationPackage, AutomationPhase } from '../types';

export const AUTOMATION_HOW_IT_WORKS: AutomationHowStep[] = [
  {
    step: 1,
    title: 'Auditoría de Procesos',
    description: 'Mapeo de flujos repetitivos, cuellos de botella y cálculo de horas hombre desperdiciadas.',
    icon: 'SearchCheck',
    details: [
      'Entrevistas técnicas con los líderes operativos del proceso',
      'Mapeo de volumen de transacciones y costo por tarea manual',
      'Matriz de priorización de automatización por impacto y esfuerzo'
    ]
  },
  {
    step: 2,
    title: 'Arquitectura e Integración',
    description: 'Conexión vía Webhooks, APIs y herramientas (Make / n8n / Python) a CRM, ERP, WhatsApp y bases de datos sin reemplazar el software actual.',
    icon: 'Network',
    details: [
      'Orquestación visual ágil con Make (Integromat) o n8n',
      'Desarrollo de conectores a medida en Python / Node.js',
      'Webhooks bidireccionales cifrados con protocolos SSL/TLS'
    ]
  },
  {
    step: 3,
    title: 'Agentes y Modelos de IA',
    description: 'Implementación de agentes de lenguaje (LLMs) con guardrails, RAG/Bases Vectoriales y reglas de negocio propias.',
    icon: 'Cpu',
    details: [
      'Agentes de lenguaje con Retrieval-Augmented Generation (RAG)',
      'Extracción estructurada JSON a partir de PDFs, audio y chat',
      'Guardrails y validaciones de seguridad sin alucinaciones'
    ]
  },
  {
    step: 4,
    title: 'Despliegue y Monitoreo',
    description: 'Puesta en producción con observabilidad en AWS CloudWatch, tableros en tiempo real y soporte SLA.',
    icon: 'Activity',
    details: [
      'Dashboard gerencial de ejecuciones, tiempos ahorrados y errores',
      'Monitoreo sintético y alertas automáticas de salud por WhatsApp/Slack',
      'Soporte continuo 24/7 y optimización evolutiva en AWS'
    ]
  }
];

export const AUTOMATION_VERTICALS: AutomationVertical[] = [
  {
    id: 'salud',
    title: 'Salud y Clínicas',
    subtitle: 'Gestión asistencial y canal de pacientes 24/7 sin fricción',
    iconName: 'HeartPulse',
    badge: 'Salud & Sanidad',
    description: 'Transformamos la gestión asistencial automatizando la atención inicial, agendamiento de citas especializadas y sincronización con historias clínicas.',
    realProblem: 'Agendas de citas colapsadas, llamadas perdidas en horas pico, ausentismo del 35% al 45% por falta de recordatorios oportunos y recepción dedicando 4 horas diarias a digitación manual en el sistema médico.',
    implementedSolution: 'Bot WhatsApp 24/7 con triaje asistido, agendamiento autónomo integrado directamente al software médico (HIS), recordatorios interactivos con reprogramación en 1-clic y liberación de cupos en tiempo real.',
    beforeAfterMetric: 'Reducción del 60% en inasistencias y 0h de digitación manual.',
    features: [
      'Agendamiento autónomo por WhatsApp Business API 24/7',
      'Confirmaciones automatizadas con reprogramación en 1-clic',
      'Triaje asistido por IA según especialidad médica',
      'Sincronización API con software HIS / Historias Clínicas',
      'Envío de recomendaciones pre-examen e instrucciones'
    ],
    metrics: '-60% Ausentismo en Consultas • Operación 24/7',
    techStack: ['WhatsApp API', 'LLM Agents', 'FastAPI', 'AWS Lambda', 'Webhooks HIS']
  },
  {
    id: 'educacion',
    title: 'Educación Superior',
    subtitle: 'Captación de admisiones, atención estudiantil y retención',
    iconName: 'GraduationCap',
    badge: 'Educación & UNAD',
    description: 'Automatizamos el embudo de admisiones y la atención estudiantil con asistentes de lenguaje entrenados con el reglamento y catálogo académico institucional.',
    realProblem: 'Pérdida de prospectos de matrícula por tardanzas de hasta 48h en responder admisiones, filas físicas para trámites académicos simples y docentes colapsados respondiendo repetidamente las mismas PQRS.',
    implementedSolution: 'Asistente omnicanal de admisiones 24/7 con RAG, atención automatizada de PQRS académicas frecuentes, expedición rápida de trámites e integración con Moodle/Blackboard para alertas de retención.',
    beforeAfterMetric: 'Atención inmediata en <10 segundos y +40% de conversión en matrículas.',
    features: [
      'Asistente de admisiones y matrículas 24/7 omnicanal',
      'Resolución instantánea de preguntas frecuentes con RAG',
      'Alertas tempranas de deserción e inactividad en campus',
      'Calificación automática de prospectos hacia asesores humanos',
      'Integración con plataformas LMS (Moodle, Blackboard, LTI)'
    ],
    metrics: 'Atención en <10s • +40% Conversión en Matrículas',
    techStack: ['RAG Vector Store', 'OpenAI / Claude APIs', 'LMS Webhooks', 'PostgreSQL', 'Redis Cache']
  },
  {
    id: 'agro',
    title: 'Agroindustria & Operaciones',
    subtitle: 'Telemetría IoT, reportes operativos automatizados y alertas de campo',
    iconName: 'Sprout',
    badge: 'Agrotech & Operaciones',
    description: 'Automatizamos la captura de datos de campo, consolidando planillas de cosecha e insumos en alertas preventivas e informes ejecutivos diarios.',
    realProblem: 'Reportes de campo dispersos en planillas físicas de papel o chats de WhatsApp, retrasos de 24h en consolidados gerenciales y alertas tardías de variables climáticas e insumos.',
    implementedSolution: 'Consolidación automática de datos IoT, bot de captura en campo por notas de voz/chat para supervisores, reportes diarios automáticos en PDF a las 6:00 AM y tableros BI en AWS.',
    beforeAfterMetric: '+90% de visibilidad operativa en tiempo real y cero planillas físicas.',
    features: [
      'Procesamiento automático de datos IoT de campo',
      'Reportes operativos diarios automatizados vía WhatsApp/Email',
      'Alertas críticas de temperatura, humedad y variables fitosanitarias',
      'Centralización de bitácoras de cosecha, agroquímicos y costos',
      'Dashboards gerenciales en tiempo real en la nube AWS'
    ],
    metrics: '+90% Visibilidad en Tiempo Real • Cero planillas en papel',
    techStack: ['IoT MQTT Brokers', 'AWS S3 / RDS', 'Python Analytics', 'WhatsApp API', 'Power BI / Dash']
  }
];

export const AUTOMATION_PACKAGES: AutomationPackage[] = [
  {
    id: 'diagnostico',
    title: '1. Diagnóstico & Mapeo de Procesos',
    tagline: 'Auditoría profunda de cuellos de botella y blueprint de automatización',
    badge: 'Fase 1 • Descubrimiento',
    timeframe: '1 a 2 semanas',
    scope: [
      'Mapeo exhaustivo de flujos operativos repetitivos y tareas manuales',
      'Auditoría de software actual, APIs disponibles y bases de datos',
      'Diseño del blueprint de arquitectura de automatización recomendada',
      'Matriz de retorno de inversión (ROI) estimado y proyección de ahorro de horas'
    ],
    deliverable: 'Blueprint de Arquitectura Técnica + Roadmap Ejecutivo prioritario y cálculo de ROI',
    recommendedFor: 'Empresas y Pymes que buscan identificar con precisión dónde ahorrar tiempo y costos con IA',
    highlightColor: 'border-slate-300 hover:border-sky-400'
  },
  {
    id: 'piloto',
    title: '2. Automatización Inicial (Piloto Rápido)',
    tagline: '1 a 2 flujos críticos automatizados y operando en producción en <30 días',
    badge: 'Más Popular • Piloto <30 Días',
    timeframe: '< 30 días calendario',
    scope: [
      'Implementación llave en mano de 1 a 2 flujos críticos de alto impacto',
      'Integración con WhatsApp Business API / Make / n8n / Python script / CRM',
      'Agente de lenguaje / IA entrenado con tus manuales y reglas de negocio',
      'Despliegue en producción en AWS con pruebas rigurosas de seguridad'
    ],
    deliverable: 'Sistema en producción 100% funcional + Dashboard de control + Capacitación a tu equipo',
    recommendedFor: 'Clínicas, Instituciones y Pymes que exigen validar resultados tangibles en tiempo récord',
    isPopular: true,
    highlightColor: 'border-[#ffd343] bg-[#142332]/90 shadow-xl shadow-[#ffd343]/10'
  },
  {
    id: 'retainer',
    title: '3. Retainer de Automatización Mensual',
    tagline: 'Mantenimiento continuo, optimización de modelos e inclusión iterativa de flujos',
    badge: 'Mantenimiento & Escalamiento',
    timeframe: 'Suscripción Mensual',
    scope: [
      'Soporte, mantenimiento y monitoreo continuo de múltiples flujos automatizados',
      'Observabilidad 24/7 en AWS CloudWatch con alertas de fallos en tiempo real',
      'Ajuste y re-entrenamiento periódico de prompts y modelos de IA',
      'Incorporación continua de nuevos flujos operacionales mes a mes'
    ],
    deliverable: 'SLA de respuesta garantizado + Reporte mensual de ejecuciones y nuevas automatizaciones',
    recommendedFor: 'Organizaciones en crecimiento que convierten la automatización en una capacidad estratégica',
    highlightColor: 'border-[#2b5b84] hover:border-emerald-400'
  },
  {
    id: 'enterprise',
    title: '4. Plataforma / Agentes Enterprise',
    tagline: 'Arquitectura Cloud a medida, infraestructura dedicada (AWS/GCP) y conectores custom',
    badge: 'Enterprise & Medida',
    timeframe: 'Según alcance del proyecto',
    scope: [
      'Arquitectura Cloud multi-servicio a medida en Amazon Web Services o Google Cloud',
      'Pipelines de datos en PostgreSQL / Redis / S3 / Data Warehousing masivo',
      'Desarrollo de microservicios y conectores API personalizados con Docker',
      'Tableros BI gerenciales en tiempo real con observabilidad ejecutiva'
    ],
    deliverable: 'Plataforma empresarial propietaria + Código fuente versionado + Documentación técnica',
    recommendedFor: 'Grandes entidades públicas, universidades o grupos corporativos con alta complejidad',
    highlightColor: 'border-[#2b5b84] hover:border-[#ffd343]'
  }
];

export const AUTOMATION_PHASES: AutomationPhase[] = [
  {
    number: '01',
    title: 'Diagnóstico & Calificación',
    subtitle: 'Evaluación de procesos y métricas base',
    description: 'Levantamos la radiografía operacional del negocio, identificando tareas repetitivas de alto costo temporal y definiendo KPIs claros de éxito.',
    highlights: [
      'Entrevistas técnicas con líderes de proceso',
      'Identificación de integraciones requeridas (CRM, ERP, HIS, LMS)',
      'Definición del indicador clave (ej: tiempo de respuesta, costo por lead, horas/hombre)'
    ],
    deliverable: 'Matriz de factibilidad & Plan de proyecto',
    iconName: 'SearchCheck'
  },
  {
    number: '02',
    title: 'Piloto Funcional en <30 Días',
    subtitle: 'Despliegue ágil en entorno controlado',
    description: 'Construimos e integramos la primera versión del sistema automatizado en un sprint rápido, validando su comportamiento con datos reales.',
    highlights: [
      'Desarrollo de agentes IA y conectores API',
      'Pruebas de estrés y seguridad de datos',
      'Lanzamiento controlado en producción con grupo piloto'
    ],
    deliverable: 'Solución en Producción + Capacitación',
    iconName: 'Rocket'
  },
  {
    number: '03',
    title: 'Medición de Impacto',
    subtitle: 'Auditoría de rendimiento e ROI',
    description: 'Comparamos las métricas operativas obtenidas durante la fase piloto versus la operación manual previa para cuantificar el ahorro real.',
    highlights: [
      'Tablero de analítica de interacciones y ejecuciones',
      'Comparativa de tasa de error, tiempos de ciclo y conversión',
      'Ajuste fino de prompts y reglas operativas'
    ],
    deliverable: 'Reporte ejecutivo de impacto y ahorro',
    iconName: 'TrendingUp'
  },
  {
    number: '04',
    title: 'Operación & Escalamiento',
    subtitle: 'Evolución y soporte continuo',
    description: 'Extendemos la automatización a nuevas áreas de la empresa bajo esquemas de observabilidad en la nube de AWS y soporte SLA garantizado.',
    highlights: [
      'Monitoreo continuo de salud y costo de APIs en AWS',
      'Mantenimiento evolutivo de integraciones',
      'Incorporación iterativa de nuevos procesos corporativos'
    ],
    deliverable: 'SLA Activo & Operación 24/7',
    iconName: 'ShieldCheck'
  }
];

export const OPERATION_VOLUMES: string[] = [
  '<100 ops/mes',
  '100 - 1.000 ops/mes',
  '>1.000 ops/mes'
];
