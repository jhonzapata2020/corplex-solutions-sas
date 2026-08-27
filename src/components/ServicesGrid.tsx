import React, { useState } from 'react';
import { Sprout, Code2, Cloud, GraduationCap, CheckCircle2, ArrowRight, Zap, Database, Layers, ShieldCheck, Activity, Sparkles, Cpu, Radio, Waves } from 'lucide-react';
import { SERVICES_DATA } from '../data/corporateData';

interface ServicesGridProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectServiceForQuote }) => {
  const [agrotechCrop, setAgrotechCrop] = useState<'platano' | 'cafe' | 'citricos'>('platano');

  return (
    <section id="servicios" className="py-24 relative bg-gray-950 border-t border-gray-800/80">
      
      {/* Ambient Diffuse Lights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 stroke-[1.75]" />
            <span>SOLUCIONES & LÍNEAS DE ESPECIALIZACIÓN MULTISECTORIAL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Catálogo Bento de Ingeniería & Tecnología
          </h2>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Plataformas de alta ingeniería estructuradas para el sector agrícola de precisión, empresas, nube AWS y universidades.
          </p>
        </div>

        {/* Bento Grid Layout - 4 Core Specialization Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1 (2x2): Agrotech, IoT & IA para Agricultura de Precisión */}
          <div id="agrotech" className="glass-smoked-card p-8 rounded-3xl border border-emerald-500/30 hover:border-emerald-500/60 flex flex-col justify-between group relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400">
                  <Sprout className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
                  Agrotech & IoT // Innovación Campo
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                1. Agrotech, IoT & IA para Agricultura de Precisión
              </h3>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                Software inteligente para gestión y monitoreo de cultivos (plátano, café, cítricos y frutales). Integración con sensores de suelo, estaciones meteorológicas y algoritmos predictivos de IA para sugerencias de riego y trazabilidad de cosecha.
              </p>

              {/* Interactive Agro-Crop Selector Demo */}
              <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 mb-6 font-mono text-xs">
                <div className="flex gap-2 mb-3 border-b border-gray-800 pb-2">
                  <button
                    onClick={() => setAgrotechCrop('platano')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      agrotechCrop === 'platano' ? 'bg-emerald-400 text-black' : 'text-white hover:text-emerald-300'
                    }`}
                  >
                    🌱 Cultivo Plátano / Banano
                  </button>
                  <button
                    onClick={() => setAgrotechCrop('cafe')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      agrotechCrop === 'cafe' ? 'bg-amber-400 text-black' : 'text-white hover:text-amber-300'
                    }`}
                  >
                    ☕ Cultivo Café
                  </button>
                  <button
                    onClick={() => setAgrotechCrop('citricos')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      agrotechCrop === 'citricos' ? 'bg-orange-400 text-black' : 'text-white hover:text-orange-300'
                    }`}
                  >
                    🍊 Cítricos & Frutales
                  </button>
                </div>

                {agrotechCrop === 'platano' && (
                  <div className="space-y-2 text-gray-200">
                    <div className="text-emerald-300 font-bold flex items-center gap-2">
                      <Radio className="w-3.5 h-3.5 text-emerald-400 stroke-[1.75]" />
                      <span>Monitoreo Sigatoka & Humedad Suelo Urabá</span>
                    </div>
                    <div className="text-[11px] text-gray-300 leading-relaxed">
                      Telemetría en tiempo real con sensores de volumen de agua en zona radicular. Alertas tempranas preventivas.
                    </div>
                  </div>
                )}

                {agrotechCrop === 'cafe' && (
                  <div className="space-y-2 text-gray-200">
                    <div className="text-amber-300 font-bold flex items-center gap-2">
                      <Waves className="w-3.5 h-3.5 text-amber-400 stroke-[1.75]" />
                      <span>Predicción Climatológica & Trazabilidad de Cosecha</span>
                    </div>
                    <div className="text-[11px] text-gray-300 leading-relaxed">
                      Algoritmos de IA para estimación de curva de maduración y control microbiológico post-cosecha.
                    </div>
                  </div>
                )}

                {agrotechCrop === 'citricos' && (
                  <div className="space-y-2 text-gray-200">
                    <div className="text-orange-300 font-bold flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-orange-400 stroke-[1.75]" />
                      <span>Riego Automatizado por Pluviómetros IoT</span>
                    </div>
                    <div className="text-[11px] text-gray-300 leading-relaxed">
                      Optimización del recurso hídrico basada en déficit de evapotranspiración diaria.
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => onSelectServiceForQuote('Agrotech, IoT & IA para Agricultura de Precisión')}
              className="w-full py-3.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Cotizar Solución Agrotech e IoT</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>

          {/* Card 2: Desarrollo de Software Empresarial & Web Apps a la Medida */}
          <div className="glass-smoked-card p-8 rounded-3xl border border-cyan-500/30 hover:border-cyan-500/60 flex flex-col justify-between group relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3.5 rounded-2xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-400">
                  <Code2 className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold">
                  CIIU J6201 // Enterprise Software
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                2. Software Empresarial & Web Apps a la Medida
              </h3>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                Construcción de sistemas de gestión interna, inventarios, logística, paneles de control gerencial (BI) y APIs RESTful. Desarrollado con frontend en React/TypeScript y backend en Python/Node.js.
              </p>

              <div className="grid grid-cols-2 gap-3 p-4 bg-gray-950 rounded-2xl border border-gray-800 mb-6 font-mono text-xs">
                <div className="p-2.5 rounded-xl bg-gray-900 border border-gray-800">
                  <span className="text-cyan-300 font-bold block mb-1">React & TypeScript</span>
                  <span className="text-gray-400 text-[11px]">Interfaces rápidas y tipadas</span>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-900 border border-gray-800">
                  <span className="text-sky-300 font-bold block mb-1">Python & Node.js</span>
                  <span className="text-gray-400 text-[11px]">APIs REST & microservicios</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectServiceForQuote('Desarrollo de Software Empresarial & Web Apps a la Medida')}
              className="w-full py-3.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Cotizar Software Empresarial</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>

          {/* Card 3: Arquitectura Cloud, DevOps & AWS */}
          <div className="glass-smoked-card p-8 rounded-3xl border border-sky-500/30 hover:border-sky-500/60 flex flex-col justify-between group relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3.5 rounded-2xl bg-sky-500/15 border border-sky-500/40 text-sky-400">
                  <Cloud className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30 font-bold">
                  CIIU J6202 // Cloud AWS
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                3. Arquitectura Cloud, DevOps & AWS
              </h3>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                Despliegue de alta disponibilidad en Amazon Web Services (EC2 Auto Scaling, RDS PostgreSQL, S3, ALB). Monitoreo continuo 24/7 y optimización de infraestructura.
              </p>

              <div className="grid grid-cols-3 gap-2 p-3 bg-gray-950 rounded-2xl border border-gray-800 mb-6 font-mono text-[11px]">
                <div className="p-2 rounded-lg bg-gray-900 text-center border border-gray-800">
                  <span className="text-cyan-300 block font-bold">AWS ALB</span>
                  <span className="text-gray-400">Load Balancer</span>
                </div>
                <div className="p-2 rounded-lg bg-gray-900 text-center border border-gray-800">
                  <span className="text-sky-300 block font-bold">EC2 Auto</span>
                  <span className="text-gray-400">Scaling</span>
                </div>
                <div className="p-2 rounded-lg bg-gray-900 text-center border border-gray-800">
                  <span className="text-emerald-300 block font-bold">RDS DB</span>
                  <span className="text-gray-400">PostgreSQL</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectServiceForQuote('Arquitectura Cloud, DevOps & AWS')}
              className="w-full py-3.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/40 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Cotizar Arquitectura AWS</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>

          {/* Card 4: Simuladores Interactivos & Sector Educativo / Institucional */}
          <div className="glass-smoked-card p-8 rounded-3xl border border-amber-500/30 hover:border-amber-500/60 flex flex-col justify-between group relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-400">
                  <GraduationCap className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
                  Sector Educativo // UNAD ECBTI
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                4. Simuladores Interactivos & Sector Educativo
              </h3>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                Entornos web interactivos, simuladores gráficos de código, laboratorios virtuales y módulos académicos para universidades (como UNAD), semilleros I+D y entidades públicas.
              </p>

              <div className="p-3.5 rounded-2xl bg-gray-950 border border-gray-800 text-xs font-mono text-amber-300 flex items-center justify-between mb-6">
                <span>Resistencia Evaluaciones:</span>
                <span className="font-bold text-emerald-400">5,000+ Concurrencia</span>
              </div>
            </div>

            <button
              onClick={() => onSelectServiceForQuote('Simuladores Interactivos & Sector Educativo / Institucional')}
              className="w-full py-3.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Cotizar Proyecto Educativo / UNAD</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
