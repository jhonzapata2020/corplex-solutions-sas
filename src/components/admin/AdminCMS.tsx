import React, { useEffect, useState, useCallback } from 'react';
import {
  fetchSiteServices,
  saveSiteService,
  toggleServiceStatus,
  fetchCaseStudies
} from '../../services/cmsService';
import type { SiteServiceEntity, CaseStudyEntity } from '../../types/lead';
import {
  Globe,
  Plus,
  RefreshCw,
  Edit3,
  Check,
  Eye,
  EyeOff,
  Cpu,
  Building2,
  X,
  Loader2,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export const AdminCMS: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'services' | 'cases'>('services');

  const [services, setServices] = useState<SiteServiceEntity[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudyEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State: Create / Edit Service
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<SiteServiceEntity | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [badge, setBadge] = useState('Popular');
  const [shortDesc, setShortDesc] = useState('');
  const [price, setPrice] = useState<number | string>(1500000);
  const [isActive, setIsActive] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [svcList, caseList] = await Promise.all([
        fetchSiteServices(),
        fetchCaseStudies()
      ]);
      setServices(svcList);
      setCaseStudies(caseList);
    } catch (err) {
      console.error('Error cargando datos CMS:', err);
      setError('No se pudo cargar la información del CMS desde Supabase.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      setLoading(true);
      setError(null);
      try {
        const [svcList, caseList] = await Promise.all([
          fetchSiteServices(),
          fetchCaseStudies()
        ]);
        if (isMounted) {
          setServices(svcList);
          setCaseStudies(caseList);
        }
      } catch (err) {
        console.error('Error cargando CMS:', err);
        if (isMounted) setError('No se pudieron consultar los contenidos web.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    void init();
    return () => { isMounted = false; };
  }, []);

  const handleOpenCreateService = () => {
    setEditingService(null);
    setTitle('');
    setSlug('');
    setBadge('Popular');
    setShortDesc('');
    setPrice(1500000);
    setIsActive(true);
    setIsServiceModalOpen(true);
  };

  const handleOpenEditService = (svc: SiteServiceEntity) => {
    setEditingService(svc);
    setTitle(svc.title);
    setSlug(svc.slug);
    setBadge(svc.badge || '');
    setShortDesc(svc.short_description);
    setPrice(svc.price_starting_at || 0);
    setIsActive(svc.is_active);
    setIsServiceModalOpen(true);
  };

  const handleToggleService = async (svc: SiteServiceEntity) => {
    const nextState = !svc.is_active;
    const success = await toggleServiceStatus(svc.id, nextState);
    if (success) {
      setServices(prev => prev.map(s => s.id === svc.id ? { ...s, is_active: nextState } : s));
    }
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSaving) return;

    setIsSaving(true);
    const success = await saveSiteService({
      id: editingService?.id,
      title: title.trim(),
      slug: slug.trim() || title.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      badge: badge.trim() || null,
      short_description: shortDesc.trim(),
      price_starting_at: Number(price) || 0,
      is_featured: true,
      is_active: isActive,
      display_order: editingService?.display_order || services.length + 1
    });

    setIsSaving(false);

    if (success) {
      setIsServiceModalOpen(false);
      loadData();
    } else {
      alert('Error guardando servicio web en Supabase.');
    }
  };

  return (
    <div className="space-y-6 font-tech">
      
      {/* Header & Main CTAs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            <Globe className="w-7 h-7 text-[#ffd343]" />
            CMS de Contenido Web
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Fase 6: Administración dinámica de servicios públicos, portafolio, casos de éxito y ofertas corporativas
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenCreateService}
            className="px-5 py-2.5 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-extrabold text-xs inline-flex items-center gap-2 cursor-pointer shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Servicio</span>
          </button>

          <button
            onClick={loadData}
            className="p-2.5 rounded-xl bg-[#142332] hover:bg-[#2b5b84] text-slate-300 hover:text-white border border-[#2b5b84] transition-all cursor-pointer shadow-sm"
            title="Actualizar catálogo"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-[#2b5b84] gap-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('services')}
          className={`py-3 px-4 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'services'
              ? 'border-[#ffd343] text-[#ffd343] font-extrabold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Servicios Destacados ({services.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('cases')}
          className={`py-3 px-4 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'cases'
              ? 'border-[#ffd343] text-[#ffd343] font-extrabold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Casos de Éxito / Portafolio ({caseStudies.length})</span>
        </button>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3 bg-[#1b3852] rounded-3xl border border-[#2b5b84]">
          <RefreshCw className="w-8 h-8 text-[#ffd343] animate-spin" />
          <span className="text-xs font-mono-tech text-slate-300">Cargando catálogo CMS desde Supabase...</span>
        </div>
      ) : error ? (
        <div className="py-12 text-center text-rose-300 text-xs space-y-3 p-6 bg-[#1b3852] rounded-3xl border border-[#2b5b84]">
          <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
          <p>{error}</p>
        </div>
      ) : activeTab === 'services' ? (
        
        /* Services Tab Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((svc) => (
            <div
              key={svc.id}
              className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 transition-all ${
                svc.is_active
                  ? 'bg-[#1b3852] border-[#2b5b84] shadow-lg'
                  : 'bg-[#142332]/50 border-slate-700/50 opacity-60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {svc.badge && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono-tech font-extrabold bg-[#ffd343]/20 text-[#ffd343] border border-[#ffd343]/40">
                      {svc.badge}
                    </span>
                  )}
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold ${
                    svc.is_active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'
                  }`}>
                    {svc.is_active ? 'VISIBLE' : 'OCULTO'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-tight">
                  {svc.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{svc.short_description}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#2b5b84] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono-tech text-slate-400 uppercase block">Desde COP:</span>
                  <span className="text-sm font-extrabold text-[#ffd343] font-mono-tech">
                    ${Number(svc.price_starting_at).toLocaleString('es-CO')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleService(svc)}
                    className="p-2 rounded-xl bg-[#142332] hover:bg-[#2b5b84] text-slate-300 hover:text-white border border-[#2b5b84] transition-all cursor-pointer"
                    title={svc.is_active ? 'Ocultar en la web pública' : 'Mostrar en la web pública'}
                  >
                    {svc.is_active ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
                  </button>

                  <button
                    onClick={() => handleOpenEditService(svc)}
                    className="p-2 rounded-xl bg-[#142332] hover:bg-[#ffd343] hover:text-[#111d28] text-slate-300 transition-all border border-[#2b5b84] cursor-pointer"
                    title="Editar Servicio"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      ) : (

        /* Case Studies Tab Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {caseStudies.map((cs) => (
            <div key={cs.id} className="p-6 rounded-3xl bg-[#1b3852] border border-[#2b5b84] space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono-tech text-[#ffd343] font-bold">
                  {cs.category}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold bg-emerald-500/20 text-emerald-400">
                  PUBLICADO
                </span>
              </div>

              <h3 className="text-base font-bold text-white">{cs.title}</h3>
              <p className="text-xs text-slate-300 font-bold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-sky-400" />
                <span>{cs.client_name}</span>
              </p>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{cs.summary}</p>
              
              {cs.impact_metrics && (
                <div className="pt-2 border-t border-[#2b5b84] text-xs font-mono-tech text-emerald-400 font-bold">
                  Impacto: {cs.impact_metrics}
                </div>
              )}
            </div>
          ))}
        </div>

      )}

      {/* Modal Creación / Edición de Servicio */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111d28]/85 backdrop-blur-md font-tech">
          <div className="bg-[#1b3852] border border-[#2b5b84] rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-[#2b5b84] pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#ffd343]" />
                {editingService ? 'Editar Servicio Web' : 'Registrar Nuevo Servicio'}
              </h3>
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="p-1 rounded-lg bg-[#142332] text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4 text-xs">
              
              <div>
                <label className="block text-slate-300 font-bold mb-1 font-mono-tech">
                  Título del Servicio *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ej: Agentes de Inteligencia Artificial para Empresas"
                  className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1 font-mono-tech">
                    Distintivo / Badge
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="ej: Popular, Enterprise"
                    className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1 font-mono-tech">
                    Precio Inicial ($ COP)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white font-mono-tech focus:outline-none focus:border-[#ffd343]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 font-mono-tech">
                  Descripción Comercial Corta *
                </label>
                <textarea
                  rows={3}
                  required
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="Resumen ejecutivo del servicio para la web pública..."
                  className="w-full px-3 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-[#2b5b84]">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#142332] text-slate-300 hover:text-white border border-[#2b5b84]"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-bold inline-flex items-center gap-1.5 shadow"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <span>Guardar Servicio</span>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
