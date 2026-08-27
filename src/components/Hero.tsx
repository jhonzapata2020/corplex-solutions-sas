import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  onOpenQuoteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  const [activeSlide, setActiveSlide] = useState<number>(1);

  const slideTopics = [
    {
      id: 1,
      title: "Desarrollo de Software a la Medida",
      description: "La base de la innovación corporativa es el software limpio y modular. Diseñamos plataformas web en React, TypeScript y backend robusto en Python y Node.js.",
      linkText: "Más sobre Software & Web Apps",
      href: "#servicios"
    },
    {
      id: 2,
      title: "Infraestructura AWS & Auto-Scaling",
      description: "Despliegues elásticos en Amazon Web Services (EC2 Auto Scaling, RDS PostgreSQL cifrado y ALB) preparados para soportar picos masivos de tráfico con 99.9% uptime.",
      linkText: "Más sobre Arquitectura Cloud AWS",
      href: "#arquitectura-cloud"
    },
    {
      id: 3,
      title: "Agrotech & IA para Agricultura de Precisión",
      description: "Software con telemetría IoT y modelos predictivos de IA para monitoreo de cultivos (plátano, café, cítricos), sensores de humedad de suelo y prevención climática.",
      linkText: "Más sobre Agrotech & IA",
      href: "#servicios"
    },
    {
      id: 4,
      title: "Simuladores Interactivos & UNAD",
      description: "Laboratorios virtuales gráficos y simuladores web docentes integrables vía LTI para la Escuela de Ciencias Básicas, Tecnología e Ingeniería (ECBTI - UNAD).",
      linkText: "Más sobre Sector Educativo",
      href: "#enfoque-academico"
    },
    {
      id: 5,
      title: "Respaldo Legal & Credencial Corporativa",
      description: "Empresa legalmente constituida con Matrícula Mercantil No. 128676 en la Cámara de Comercio de Urabá y clasificación CIIU J6201 / J6202.",
      linkText: "Ver Ficha Legal & NIT 902061373-5",
      href: "#cumplimiento"
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
                    <span className="ml-2 font-bold text-slate-300">corplex_core.py — Python 3.12</span>
                  </div>
                  <span className="text-cyan-400 font-bold">AWS Cluster :: ONLINE</span>
                </div>

                {/* Interactive Code Snippet */}
                <div className="space-y-1.5 text-xs sm:text-sm">
                  <p className="text-slate-500"># CORPLEX SOLUTIONS S.A.S. - Mission Critical Architecture</p>
                  <p className="text-emerald-400 font-bold">
                    <span className="text-cyan-400">&gt;&gt;&gt; </span>from corplex.cloud import AWSInfrastructure, AgrotechAI
                  </p>
                  <p className="text-emerald-400 font-bold">
                    <span className="text-cyan-400">&gt;&gt;&gt; </span>app = AWSInfrastructure(region="sa-east-1", auto_scaling=True)
                  </p>
                  <p className="text-[#38bdf8]">
                    <span className="text-cyan-400">&gt;&gt;&gt; </span>app.deploy_cluster(nodes=5, db="RDS PostgreSQL KMS")
                  </p>
                  <p className="text-slate-300">
                    <span className="text-cyan-400">&gt;&gt;&gt; </span>agrotech = AgrotechAI(crop="Plátano Urabá", sensors="IoT Soil Moisture")
                  </p>
                  <p className="text-slate-300">
                    <span className="text-cyan-400">&gt;&gt;&gt; </span>agrotech.predict_irrigation()
                  </p>
                  <p className="text-cyan-300 font-bold pt-1">
                    'Status: Optimal • 99.9% Uptime Active • Latency &lt; 20ms'
                  </p>
                </div>
              </div>

              {/* Terminal Bottom Status Bar */}
              <div className="pt-4 mt-4 border-t border-[#2b5b84]/60 flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Execution output verified
                </span>
                <button
                  onClick={onOpenQuoteModal}
                  className="text-cyan-400 hover:underline font-bold cursor-pointer"
                >
                  Ejecutar Proyecto →
                </button>
              </div>

            </div>

            {/* Right Column (5 cols): Featured Topic Box */}
            <div className="lg:col-span-5 flex flex-col justify-between p-2">
              
              <div>
                {/* Topic Title in Titanium White */}
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
                  {currentTopic.title}
                </h2>

                {/* Topic Description */}
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-6">
                  {currentTopic.description}
                </p>

                {/* Feature Highlight Link */}
                <a
                  href={currentTopic.href}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-300 hover:text-white transition-colors"
                >
                  <span>{currentTopic.linkText}</span>
                  <ChevronRight className="w-4 h-4 text-cyan-400" />
                </a>
              </div>

              {/* Refined Slide Pagination Numbers (1 2 3 4 5) */}
              <div className="pt-8 flex items-center gap-2">
                {slideTopics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setActiveSlide(topic.id)}
                    className={`w-9 h-9 rounded-md text-xs font-bold font-mono-tech transition-all cursor-pointer ${
                      activeSlide === topic.id
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/80 shadow-sm scale-105'
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
            className="text-cyan-400 hover:underline font-bold inline-flex items-center gap-1"
          >
            <span>&gt;&gt;&gt; Ver Ficha Legal</span>
          </a>
        </div>

      </div>

    </section>
  );
};
