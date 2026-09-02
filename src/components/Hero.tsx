import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  onOpenQuoteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal: _onOpenQuoteModal }) => {
  const [activeSlide, setActiveSlide] = useState<number>(1);

  const slideTopics = [
    {
      id: 1,
      title: "Corplex AI Automation · Automatización con IA",
      description: "Diseñamos e implementamos soluciones de automatización con IA para reducir tareas repetitivas, conectar las herramientas que ya utilizas y mejorar la velocidad de respuesta de tu equipo sin cambiar tu software.",
      linkText: "Ir a Corplex AI Automation",
      href: "#ai-automation"
    },
    {
      id: 2,
      title: "Desarrollo de Software a la Medida",
      description: "La base de la innovación corporativa es el software limpio y modular. Diseñamos plataformas web en React, TypeScript y backend robusto en Python y Node.js.",
      linkText: "Más sobre Software & Web Apps",
      href: "#servicios"
    },
    {
      id: 3,
      title: "Infraestructura AWS & Auto-Scaling",
      description: "Despliegues elásticos en Amazon Web Services (EC2 Auto Scaling, RDS PostgreSQL cifrado y ALB) preparados para soportar picos masivos de tráfico con observabilidad 24/7.",
      linkText: "Más sobre Arquitectura Cloud AWS",
      href: "#arquitectura-cloud"
    },
    {
      id: 4,
      title: "Agrotech & IA para Agricultura de Precisión",
      description: "Software con telemetría IoT y modelos predictivos de IA para monitoreo de cultivos (plátano, café, cítricos), sensores de humedad de suelo y prevención climática.",
      linkText: "Más sobre Agrotech & IA",
      href: "#servicios"
    },
    {
      id: 5,
      title: "Simuladores Interactivos & UNAD",
      description: "Laboratorios virtuales gráficos y simuladores web docentes integrables vía LTI para la Escuela de Ciencias Básicas, Tecnología e Ingeniería (ECBTI - UNAD).",
      linkText: "Más sobre Sector Educativo",
      href: "#enfoque-academico"
    }
  ];

  const currentTopic = slideTopics.find(s => s.id === activeSlide) || slideTopics[0];

  return (
    <section id="inicio" className="bg-[#2b5b84] text-slate-100 font-tech py-12 md:py-16 border-b border-[#1b3852]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Python.org 2-Column Main Hero Card Container */}
        <div className="bg-[#1b3852] rounded-2xl border border-[#4b7da5]/50 shadow-2xl p-6 md:p-8 mb-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column (7 cols): Python Interactive Code Terminal Editor */}
            <div className="lg:col-span-7 bg-[#142332] rounded-xl p-5 border border-[#2b5b84] shadow-inner font-mono-tech text-xs leading-relaxed text-slate-200 flex flex-col justify-between">
              
              <div>
                {/* Terminal Header Bar */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2b5b84]/60 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                    <span className="ml-2 font-bold text-slate-300">corplex_ai_core.py — Python 3.12</span>
                  </div>
                  <span className="text-[#ffd343] font-bold">AI AGENT ENGINE :: ACTIVE</span>
                </div>

                {/* Interactive Code Snippet */}
                <div className="space-y-1.5 text-xs sm:text-sm">
                  <p className="text-slate-500"># CORPLEX SOLUTIONS S.A.S. - Mission Critical AI & Cloud Engine</p>
                  <p className="text-emerald-400 font-bold">
                    <span className="text-[#ffd343]">&gt;&gt;&gt; </span>from corplex.ai import AIAutomationEngine, AWSCloud
                  </p>
                  <p className="text-emerald-400 font-bold">
                    <span className="text-[#ffd343]">&gt;&gt;&gt; </span>agent = AIAutomationEngine(workflow="Omnichannel Ingestion", llm="GPT-4o RAG")
                  </p>
                  <p className="text-[#38bdf8]">
                    <span className="text-[#ffd343]">&gt;&gt;&gt; </span>agent.connect_systems(crm="Active", erp="Synced", whatsapp="Connected 24/7")
                  </p>
                  <p className="text-slate-300">
                    <span className="text-[#ffd343]">&gt;&gt;&gt; </span>agent.run_automation(status="Automated without manual typing")
                  </p>
                  <p className="text-[#ffd343] font-bold pt-1">
                    'Status: Active • Workflows Monitored • Systems Synchronized'
                  </p>
                </div>
              </div>

              {/* Terminal Bottom Status Bar */}
              <div className="pt-4 mt-4 border-t border-[#2b5b84]/60 flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Execution output verified
                </span>
                <a
                  href="#ai-automation"
                  className="text-[#ffd343] hover:underline font-bold cursor-pointer"
                >
                  Ver Diagnóstico IA →
                </a>
              </div>

            </div>

            {/* Right Column (5 cols): Featured Topic Box with Python.org Pagination Tabs 1 2 3 4 5 */}
            <div className="lg:col-span-5 flex flex-col justify-between p-2">
              
              <div>
                {/* Topic Gold Yellow Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-[#ffd343] mb-4">
                  {currentTopic.title}
                </h2>

                {/* Topic Description */}
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-6">
                  {currentTopic.description}
                </p>

                {/* Feature Highlight Link */}
                <a
                  href={currentTopic.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ffd343] hover:underline"
                >
                  <span>{currentTopic.linkText}</span>
                  <ChevronRight className="w-4 h-4 text-[#ffd343]" />
                </a>
              </div>

              {/* Python.org Style Slide Pagination Numbers (1 2 3 4 5) */}
              <div className="pt-8 flex items-center gap-2">
                {slideTopics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setActiveSlide(topic.id)}
                    className={`w-9 h-9 rounded-md text-xs font-bold font-mono-tech transition-all cursor-pointer ${
                      activeSlide === topic.id
                        ? 'bg-[#3775a9] text-[#ffd343] border border-[#ffd343]/60 shadow-md scale-105'
                        : 'bg-[#142332] text-slate-300 hover:bg-[#2b5b84] border border-[#2b5b84]'
                    }`}
                  >
                    {topic.id}
                  </button>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* Python.org Style Slogan Banner Bar */}
        <div className="text-center max-w-4xl mx-auto text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
          <span>
            CORPLEX SOLUTIONS S.A.S. es la empresa líder en ingeniería de software a la medida, agrotech e infraestructura cloud en Urabá y Colombia.{' '}
          </span>
          <a
            href="#cumplimiento"
            className="text-[#ffd343] hover:underline font-bold inline-flex items-center gap-1"
          >
            <span>&gt;&gt;&gt; Ver Ficha Legal</span>
          </a>
        </div>

      </div>

    </section>
  );
};
