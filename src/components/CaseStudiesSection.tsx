import React, { useEffect, useState } from 'react';
import { fetchCaseStudies } from '../services/cmsService';
import type { CaseStudyEntity } from '../types/lead';
import {
  Building2,
  TrendingUp,
  CheckCircle2,
  ExternalLink,
  FolderGit2,
  RefreshCw
} from 'lucide-react';

export const CaseStudiesSection: React.FC = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudyEntity[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallbacks garantizados en caso de desconexión de red o base de datos vacía
  const defaultFallbackCases: CaseStudyEntity[] = [
    {
      id: 'fallback-unad',
      title: 'Simuladores Educativos & Laboratorios Virtuales UNAD',
      client_name: 'Universidad Nacional Abierta y a Distancia (UNAD)',
      category: 'EdTech & Simuladores',
      summary: 'Plataforma interactiva de laboratorios docentes en tiempo real para prácticas de la Escuela de Ciencias Básicas, Tecnología e Ingeniería (ECBTI).',
      impact_metrics: '+5,000 Estudiantes beneficiados',
      metric_highlight: '99.9% Disponibilidad durante Exámenes Nacionales',
      project_url: 'https://corplex-solutions-sas.vercel.app/#academico',
      technologies: ['React 19', 'Canvas 2D/3D', 'AWS Lambda', 'Node.js', 'LTI Standard'],
      is_published: true,
      display_order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'fallback-samp',
      title: 'Plataforma SAMP — Sistema de Administración & Gestión',
      client_name: 'Gruslin Tech / Clientes Corporativos',
      category: 'Software Empresarial & ERP',
      summary: 'Plataforma web integral para la administración, gestión de procesos y control operacional centralizado.',
      impact_metrics: 'Operación continua 24/7 centralizada',
      metric_highlight: 'Optimizaciones de procesos en tiempo real',
      project_url: 'https://samp.gruslin.tech',
      technologies: ['React', 'TypeScript', 'REST APIs', 'Node.js', 'PostgreSQL'],
      is_published: true,
      display_order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'fallback-ai',
      title: 'Automatización Comercial & Agente IA RAG',
      client_name: 'Red de Servicios Médicos & Salud',
      category: 'IA & Automatización',
      summary: 'Agente conversacional inteligente integrado con WhatsApp API para recepción, cualificación automática y agendamiento de pacientes.',
      impact_metrics: '-70% Tiempo de respuesta comercial',
      metric_highlight: 'ROI 4.2x en el primer trimestre de operación',
      project_url: 'https://corplex-solutions-sas.vercel.app/#ai-automation',
      technologies: ['Python', 'FastAPI', 'WhatsApp API', 'Make / n8n', 'PostgreSQL'],
      is_published: true,
      display_order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  useEffect(() => {
    let isMounted = true;

    const loadCases = async () => {
      try {
        const data = await fetchCaseStudies();
        if (isMounted) {
          const published = data
            .filter(c => c.is_published !== false)
            .sort((a, b) => (a.display_order || 1) - (b.display_order || 1));

          if (published.length > 0) {
            setCaseStudies(published);
          } else {
            setCaseStudies(defaultFallbackCases);
          }
        }
      } catch {
        if (isMounted) {
          setCaseStudies(defaultFallbackCases);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void loadCases();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="casos-exito" className="py-20 relative bg-[#111d28] font-tech text-slate-100 border-t border-[#2b5b84]/50 overflow-hidden">
      <div id="portafolio" className="absolute -top-24"></div>
      
      {/* Visual Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#ffd343]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#142332] border border-[#ffd343]/50 text-[#ffd343] text-xs font-mono-tech font-bold mb-4 shadow-md">
            <FolderGit2 className="w-4 h-4 text-[#ffd343]" />
            <span>PORTAFOLIO EN VIVO & CASOS DE ÉXITO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Proyectos Desplegados & Resultados Reales
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Plataformas en producción construidas para universidades, empresas y la industria con impacto medible y alta disponibilidad.
          </p>
        </div>

        {/* Dynamic Case Studies Cards Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3 bg-[#142332] rounded-3xl border border-[#2b5b84]">
            <RefreshCw className="w-8 h-8 text-[#ffd343] animate-spin" />
            <span className="text-xs font-mono-tech text-slate-300">Cargando portafolio desde Supabase...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {caseStudies.map((cs) => (
              <div
                key={cs.id}
                className="bg-[#142332] rounded-3xl p-6 sm:p-8 border border-[#2b5b84] hover:border-[#ffd343]/60 transition-all duration-300 shadow-xl flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Category Header Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-mono-tech font-bold bg-[#ffd343]/15 text-[#ffd343] border border-[#ffd343]/40">
                      {cs.category}
                    </span>
                    <span className="text-[10px] font-mono-tech text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      EN PRODUCCIÓN
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-[#ffd343] transition-colors">
                    {cs.title}
                  </h3>

                  {/* Client / Institution */}
                  <div className="flex items-center gap-2 text-xs text-sky-300 font-mono-tech font-bold mb-4">
                    <Building2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>{cs.client_name}</span>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {cs.summary}
                  </p>

                  {/* Key Metric Highlight Container */}
                  {(cs.metric_highlight || cs.impact_metrics) && (
                    <div className="p-4 rounded-2xl bg-[#1b3852] border border-[#ffd343]/40 space-y-1.5 mb-6">
                      <div className="flex items-center gap-2 text-xs text-[#ffd343] font-mono-tech font-bold uppercase">
                        <TrendingUp className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>Métrica Clave / ROI</span>
                      </div>

                      {cs.metric_highlight && (
                        <div className="text-xs font-extrabold text-cyan-300 font-mono-tech">
                          {cs.metric_highlight}
                        </div>
                      )}

                      {cs.impact_metrics && (
                        <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{cs.impact_metrics}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tech Stack Badges */}
                  {cs.technologies && cs.technologies.length > 0 && (
                    <div className="space-y-2 mb-6">
                      <span className="text-[10px] font-mono-tech text-slate-400 uppercase font-bold block">
                        Stack Tecnológico:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cs.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded bg-[#1b3852] text-slate-200 text-xs font-mono-tech border border-[#4b7da5]/40 font-bold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Action Button */}
                {cs.project_url && (
                  <a
                    href={cs.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span>Visitar Proyecto</span>
                    <ExternalLink className="w-4 h-4 text-[#111d28]" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
