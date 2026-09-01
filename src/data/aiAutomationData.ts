import type {
  AutomationVertical,
  AutomationHowStep,
  AutomationPackage,
  AutomationPhase,
  AutomationTrustPromise
} from '../types';

export const AUTOMATION_TRUST_PROMISES: AutomationTrustPromise[] = [
  {
    shortIndicator: 'Menos tareas manuales',
    title: 'Reduce el trabajo manual',
    description: 'Identificamos las tareas repetitivas de tu operación y diseñamos automatizaciones para que tu equipo dedique más tiempo a actividades de mayor valor.',
    iconName: 'Clock'
  },
  {
    shortIndicator: 'Integración con tus herramientas',
    title: 'Trabajamos con tus sistemas actuales',
    description: 'Integramos WhatsApp, formularios, CRM, ERP, correo electrónico, bases de datos y APIs existentes para evitar duplicar información y reducir la digitación.',
    iconName: 'Network'
  },
  {
    shortIndicator: 'Flujos automáticos y monitoreados',
    title: 'Automatización disponible cuando tu operación lo necesita',
    description: 'Configuramos flujos automáticos para recibir solicitudes, clasificar información, generar respuestas y activar tareas incluso fuera del horario laboral, con reglas y supervisión definidas.',
    iconName: 'Workflow'
  },
  {
    shortIndicator: 'Monitoreo y soporte según contrato',
    title: 'Arquitectura preparada para crecer',
    description: 'Desplegamos soluciones con monitoreo, control de accesos, respaldos y prácticas de seguridad adaptadas al volumen y la criticidad de cada operación.',
    iconName: 'ShieldCheck'
  },
  {
    shortIndicator: 'Respuestas ágiles',
    title: 'Respuestas más rápidas y procesos más ordenados',
    description: 'Diseñamos flujos para reducir tiempos de espera y transferir cada solicitud al sistema o persona adecuada.',
    iconName: 'Zap'
  }
];

export const AUTOMATION_HOW_IT_WORKS: AutomationHowStep[] = [
  {
    step: 1,
    phaseName: 'Entrada',
    title: 'Recibimos la solicitud',
    description: 'WhatsApp, formulario web, correo, webhook o sistema institucional.',
    icon: 'MessageSquare',
    details: [
      'Canales omnicanal: WhatsApp, formularios y correos',
      'Webhooks y APIs de integración bidireccional',
      'Recepción continua de solicitudes'
    ]
  },
  {
    step: 2,
    phaseName: 'Interpretación',
    title: 'La IA organiza la información',
    description: 'Clasifica la intención, extrae los datos necesarios y aplica las reglas definidas para tu operación.',
    icon: 'Cpu',
    details: [
      'Clasificación automática de intenciones y necesidades',
      'Extracción estructurada de datos relevantes',
      'Validación técnica bajo reglas de negocio definidas'
    ]
  },
  {
    step: 3,
    phaseName: 'Integración',
    title: 'Actualizamos tus sistemas',
    description: 'Enviamos la información validada a tu CRM, ERP, HIS, base de datos o herramienta de trabajo.',
    icon: 'Database',
    details: [
      'Sincronización inmediata con CRM, ERP o HIS',
      'Actualización de registros sin intervención manual',
      'Cero duplicación de digitación'
    ]
  },
  {
    step: 4,
    phaseName: 'Seguimiento',
    title: 'Registramos y monitoreamos el resultado',
    description: 'Programamos recordatorios, guardamos el historial y derivamos los casos que requieren revisión humana.',
    icon: 'Activity',
    details: [
      'Programación de avisos y recordatorios automáticos',
      'Trazabilidad e historial completo auditable',
      'Ruta de escalamiento claro hacia supervisión humana'
    ]
  }
];

export const AUTOMATION_VERTICALS: AutomationVertical[] = [
  {
    id: 'salud',
    title: 'Salud y Clínicas',
    subtitle: 'Agendamiento y seguimiento de pacientes',
    iconName: 'HeartPulse',
    badge: 'Salud & Sanidad',
    description: 'Automatiza la recepción de solicitudes, confirma citas, envía recordatorios y permite reprogramaciones, manteniendo una ruta de atención humana para los casos que lo requieran.',
    realProblem: 'Recepciones y líneas telefónicas colapsadas en horas pico, alto ausentismo de pacientes por falta de recordatorios oportunos y horas de digitación manual en la historia clínica.',
    implementedSolution: 'Recepción de solicitudes automatizada por WhatsApp, confirmación proactiva de citas con reprogramación instantánea y sincronización directa al software médico o HIS.',
    suggestedMetrics: 'Citas confirmadas, reprogramaciones, tiempo de respuesta y horas de digitación reducidas.',
    beforeAfterMetric: 'Reducción del ausentismo y menor tiempo en tareas de digitación manual.',
    features: [
      'Recepción de solicitudes y confirmación de citas',
      'Recordatorios automatizados con reprogramación',
      'Ruta de atención humana para casos especiales',
      'Sincronización con software médico / HIS',
      'Información pre-atención al paciente'
    ],
    metrics: 'Medición orientada a citas confirmadas y horas ahorradas',
    techStack: ['WhatsApp API', 'LLM Agents', 'FastAPI', 'AWS Lambda', 'Webhooks HIS']
  },
  {
    id: 'educacion',
    title: 'Educación Superior',
    subtitle: 'Atención y gestión de solicitudes académicas',
    iconName: 'GraduationCap',
    badge: 'Educación & Instituciones',
    description: 'Organiza preguntas frecuentes, orienta a estudiantes, deriva solicitudes y consolida información para los equipos administrativos y académicos.',
    realProblem: 'Lentitud en la respuesta a prospectos de matrícula en periodos críticos, colapso de canales con preguntas frecuentes repetitivas y demoras en la derivación de solicitudes.',
    implementedSolution: 'Asistente virtual de orientación a aspirantes 24/7, clasificación y respuesta a PQRS académicas frecuentes y escalamiento ordenado a personal administrativo.',
    suggestedMetrics: 'Solicitudes atendidas, tiempo de respuesta, derivaciones correctas y volumen de consultas resueltas.',
    beforeAfterMetric: 'Respuestas ágiles a prospectos y descongestión de canales institucionales.',
    features: [
      'Orientación 24/7 a aspirantes y estudiantes',
      'Resolución de preguntas frecuentes académicas',
      'Derivación ordenada a equipos administrativos',
      'Consolidación de consultas y PQRS frecuentes',
      'Integración con plataformas LMS y sistemas del campus'
    ],
    metrics: 'Medición orientada a velocidad de respuesta y consultas resueltas',
    techStack: ['RAG Vector Store', 'OpenAI / Claude APIs', 'LMS Webhooks', 'PostgreSQL', 'Redis Cache']
  },
  {
    id: 'agro',
    title: 'Agroindustria & Operaciones',
    subtitle: 'Alertas y seguimiento operativo',
    iconName: 'Sprout',
    badge: 'Agrotech & Operaciones',
    description: 'Integra datos de formularios, sensores o sistemas internos para generar alertas, reportes y tareas de seguimiento según reglas definidas por el equipo.',
    realProblem: 'Datos de campo recolectados manualmente en planillas de papel, falta de visibilidad en tiempo real para supervisores y reportes consolidados con días de retraso.',
    implementedSolution: 'Captura automatizada de datos operativos vía WhatsApp o sensores IoT, generación automática de alertas críticas y envío de reportes consolidados a supervisores.',
    suggestedMetrics: 'Alertas atendidas, tiempos de reacción, reportes generados y tareas completadas.',
    beforeAfterMetric: 'Monitoreo continuo y reportes operativos diarios listos al inicio de la jornada.',
    features: [
      'Captura e integración de datos operativos de campo',
      'Generación automática de alertas y tareas',
      'Consolidación de reportes diarios para supervisores',
      'Centralización de registros operacionales',
      'Monitoreo de variables y tableros de control'
    ],
    metrics: 'Medición orientada a tiempos de reacción y reportes completados',
    techStack: ['IoT MQTT Brokers', 'AWS S3 / RDS', 'Python Analytics', 'WhatsApp API', 'Power BI / Dash']
  }
];

export const AUTOMATION_PACKAGES: AutomationPackage[] = [
  {
    id: 'diagnostico',
    title: '1. Diagnóstico & Mapeo de Procesos',
    tagline: 'Auditoría de cuellos de botella y diseño del plan de automatización',
    badge: 'Fase 1 • Descubrimiento',
    timeframe: '1 a 2 semanas',
    scope: [
      'Mapeo exhaustivo de flujos operativos repetitivos y tareas manuales',
      'Auditoría de software actual, APIs disponibles y bases de datos',
      'Diseño del blueprint de arquitectura de automatización recomendada',
      'Matriz de priorización y proyección orientativa de ahorro'
    ],
    deliverable: 'Blueprint de Arquitectura Técnica + Roadmap Ejecutivo prioritario y plan de implementación',
    recommendedFor: 'Empresas e instituciones que buscan identificar dónde reducir tareas manuales con IA',
    highlightColor: 'border-slate-300 hover:border-sky-400'
  },
  {
    id: 'piloto',
    title: '2. Automatización Inicial (Piloto Rápido)',
    tagline: '1 a 2 flujos críticos automatizados y operando en producción',
    badge: 'Más Solicitado • Piloto Ágil',
    timeframe: 'Hasta 30 días calendario',
    scope: [
      'Implementación de 1 a 2 flujos críticos de mayor impacto operativo',
      'Integración con WhatsApp / Formularios / CRM / ERP actual',
      'Asistente de IA configurado con reglas y límites definidos',
      'Despliegue controlado con validaciones de seguridad y monitoreo'
    ],
    deliverable: 'Flujo en producción funcional + Tablero básico de control + Guía de uso para tu equipo',
    recommendedFor: 'Organizaciones que desean validar el impacto práctico de la automatización en plazo corto',
    isPopular: true,
    highlightColor: 'border-[#ffd343] bg-[#142332]/90 shadow-xl shadow-[#ffd343]/10'
  },
  {
    id: 'retainer',
    title: '3. Retainer de Automatización Mensual',
    tagline: 'Mantenimiento continuo, monitoreo y evolución progresiva de flujos',
    badge: 'Soporte & Escalamiento',
    timeframe: 'Suscripción Mensual',
    scope: [
      'Mantenimiento y monitoreo continuo de flujos automatizados activos',
      'Supervisión de salud de integraciones y alertas preventivas',
      'Ajuste periódico de reglas, modelos e interacciones',
      'Incorporación iterativa de nuevas tareas automatizadas'
    ],
    deliverable: 'Soporte técnico continuo + Reportes de desempeño y mantenimientos preventivos',
    recommendedFor: 'Empresas en crecimiento que integran la automatización como pilar operativo',
    highlightColor: 'border-[#2b5b84] hover:border-emerald-400'
  },
  {
    id: 'enterprise',
    title: '4. Plataforma / Agentes Enterprise',
    tagline: 'Arquitectura Cloud a medida, infraestructura dedicada y conectores custom',
    badge: 'Enterprise & Medida',
    timeframe: 'Según alcance del proyecto',
    scope: [
      'Arquitectura Cloud a medida en Amazon Web Services o Google Cloud',
      'Pipelines de datos dedicados en PostgreSQL / S3 / Data Warehousing',
      'Desarrollo de conectores API y microservicios personalizados',
      'Tableros gerenciales en tiempo real con monitoreo y control de acceso'
    ],
    deliverable: 'Solución empresarial a medida + Código versionado + Documentación de arquitectura',
    recommendedFor: 'Entidades públicas, universidades o grupos corporativos con alta complejidad técnica',
    highlightColor: 'border-[#2b5b84] hover:border-[#ffd343]'
  }
];

export const AUTOMATION_PHASES: AutomationPhase[] = [
  {
    number: '01',
    title: 'Diagnóstico & Calificación',
    subtitle: 'Evaluación del proceso y definición de metas',
    description: 'Analizamos cómo funciona hoy la operación, identificando tareas repetitivas y definiendo el alcance del proyecto.',
    highlights: [
      'Entrevistas con los responsables del proceso',
      'Identificación de herramientas de software implicadas',
      'Definición de las métricas principales de seguimiento'
    ],
    deliverable: 'Plan de trabajo & Definición de alcance',
    iconName: 'SearchCheck'
  },
  {
    number: '02',
    title: 'Piloto Funcional',
    subtitle: 'Implementación ágil en entorno controlado',
    description: 'Construimos e integramos la primera versión automatizada para validar su comportamiento con información real.',
    highlights: [
      'Configuración de flujos y conectores de integración',
      'Pruebas de validación y seguridad de datos',
      'Lanzamiento acompañado con el equipo responsable'
    ],
    deliverable: 'Flujo en Producción + Guía de Uso',
    iconName: 'Rocket'
  },
  {
    number: '03',
    title: 'Medición de Resultados',
    subtitle: 'Evaluación del cambio y optimización',
    description: 'Comparamos el desempeño del flujo automatizado con la operación previa para verificar mejoras.',
    highlights: [
      'Revisión de tiempo de respuesta y errores detectados',
      'Ajuste de reglas e interacciones según experiencia',
      'Evaluación del nivel de adopción por parte del equipo'
    ],
    deliverable: 'Informe de desempeño & Recomendaciones',
    iconName: 'TrendingUp'
  },
  {
    number: '04',
    title: 'Operación & Mejora Continua',
    subtitle: 'Soporte y evolución progresiva',
    description: 'Mantenemos la solución estable e incorporamos nuevas automatizaciones según las necesidades del negocio.',
    highlights: [
      'Monitoreo del estado de las integraciones',
      'Mantenimiento preventivo y actualizaciones',
      'Extensión del modelo a nuevos procesos'
    ],
    deliverable: 'Acompañamiento continuo & Soporte',
    iconName: 'ShieldCheck'
  }
];

export const AUTOMATION_SUMMARY_BANNER = {
  title: 'Automatización inteligente para tu operación',
  paragraph: 'Corplex Solutions conecta tus herramientas actuales y automatiza tareas repetitivas con IA, reglas de negocio y supervisión humana cuando sea necesario.',
  subparagraph: 'Diseñamos soluciones para atención al cliente, agendamiento, seguimiento comercial, gestión de solicitudes, reportes e integración de datos.',
  workMethod: '¿Cómo trabajamos? Primero entendemos tu proceso. Después proponemos un piloto de alcance definido, medimos el resultado y te ayudamos a operar y mejorar la solución.',
  expectation: '¿Qué puedes esperar? Menos digitación, mejor seguimiento, respuestas más ágiles y una operación más ordenada. El resultado depende de tus sistemas, datos, volumen y objetivos; por eso medimos cada caso de forma individual.',
  ctaNote: 'Primera orientación sin costo. Te contactaremos en un máximo de un día hábil.'
};
