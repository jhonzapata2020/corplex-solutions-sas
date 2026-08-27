import React, { useState } from 'react';
import { Code2, Cloud, Zap, Server, CheckCircle2, ArrowRight, Search, Terminal, Cpu, Layers } from 'lucide-react';
import { SERVICES_DATA } from '../data/corporateData';
import type { ServiceItem } from '../types';

interface ServicesGridProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectServiceForQuote }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Todos los Servicios', icon: Layers },
    { id: 'software', label: 'Desarrollo & Web Apps', icon: Code2 },
    { id: 'cloud', label: 'Cloud AWS & DevOps', icon: Cloud },
    { id: 'ai', label: 'Automatización e IA', icon: Zap },
    { id: 'infrastructure', label: 'Infraestructura & Soporte', icon: Server },
  ];

  const filteredServices = SERVICES_DATA.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.techBadges.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-6 h-6 text-sky-400" />;
      case 'Cloud': return <Cloud className="w-6 h-6 text-cyan-400" />;
      case 'Terminal': return <Terminal className="w-6 h-6 text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-sky-400" />;
      case 'Zap': return <Zap className="w-4 h-4 text-cyan-400" />;
      default: return <Server className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section id="servicios" className="py-24 relative bg-slate-950 border-t border-slate-800/80">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono font-semibold mb-4">
            <Code2 className="w-4 h-4 text-sky-400" />
            <span>LÍNEAS DE INGENIERÍA & SOLUCIONES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Catálogo de Servicios Tecnológicos
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Estructuramos y desplegamos soluciones digitales de alta precisión técnica, alineadas con clasificaciones CIIU autorizadas y mejores prácticas internacionales.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 w-full md:w-auto">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md shadow-sky-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar por tecnología o servicio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="glass-card rounded-2xl p-7 flex flex-col justify-between group hover:border-sky-500/40 relative overflow-hidden"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-sky-500/40 group-hover:bg-sky-500/10 transition-colors">
                    {getCategoryIcon(service.icon)}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {service.categoryLabel}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors leading-snug">
                  {service.title}
                </h3>

                <p className="text-slate-300 text-xs leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div>
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-slate-800/80">
                  {service.techBadges.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-sky-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Quote Button */}
                <button
                  onClick={() => onSelectServiceForQuote(service.title)}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-sky-500/20 text-sky-300 hover:text-white border border-slate-800 hover:border-sky-500/40 font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-2 group-hover:bg-sky-500 group-hover:text-white"
                >
                  <span>Cotizar este Servicio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 glass-card rounded-2xl">
            <p className="text-slate-400 text-sm">No se encontraron servicios que coincidan con la búsqueda "{searchQuery}".</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-4 text-xs text-sky-400 underline font-mono"
            >
              Restablecer filtros
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
