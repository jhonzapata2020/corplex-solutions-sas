import React, { useEffect, useState } from 'react';
import { fetchSiteSettings, updateSiteSettings } from '../../services/cmsService';
import type { SiteSettingsEntity } from '../../types/lead';
import {
  Settings,
  Building2,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Percent,
  Bell,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettingsEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSiteSettings();
        if (isMounted) setSettings(data);
      } catch (err) {
        console.error('Error cargando configuración:', err);
        if (isMounted) setError('No se pudo cargar la configuración.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    void init();
    return () => { isMounted = false; };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings || saving) return;

    setSaving(true);
    setSaveSuccess(false);
    setError(null);

    const success = await updateSiteSettings(settings);

    setSaving(false);

    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      setError('Ocurrió un error al guardar la configuración en Supabase.');
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3 font-tech">
        <RefreshCw className="w-8 h-8 text-[#ffd343] animate-spin" />
        <span className="text-xs font-mono-tech text-slate-300">Cargando configuración global desde Supabase...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-tech max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
          <Settings className="w-7 h-7 text-[#ffd343]" />
          Configuración Global del Sistema
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Parámetros corporativos de CORPLEX SOLUTIONS S.A.S., tasa de IVA, datos de contacto y notificaciones
        </p>
      </div>

      {/* Toast Status Alerts */}
      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5 shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-bold">¡Configuración guardada con éxito en Supabase!</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5 shadow-lg">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Form */}
      {settings && (
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* SECTION 1: Legal & Corporate Datasheet */}
          <div className="p-6 rounded-3xl bg-[#1b3852] border border-[#2b5b84] space-y-4 shadow-xl">
            <h3 className="text-xs font-mono-tech text-[#ffd343] uppercase font-bold tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Identidad Legal & Datos Fiscales
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1.5 font-mono-tech">
                  Razón Social *
                </label>
                <input
                  type="text"
                  required
                  value={settings.company_name}
                  onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5 font-mono-tech">
                  NIT / Identificación Tributaria *
                </label>
                <input
                  type="text"
                  required
                  value={settings.nit_tax_id}
                  onChange={(e) => setSettings({ ...settings, nit_tax_id: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white font-mono-tech focus:outline-none focus:border-[#ffd343]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5 font-mono-tech flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                Dirección Física & Ubicación Institucional
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                placeholder="ej: Turbo, Urabá, Antioquia, Colombia"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
              />
            </div>
          </div>

          {/* SECTION 2: Contact Info */}
          <div className="p-6 rounded-3xl bg-[#1b3852] border border-[#2b5b84] space-y-4 shadow-xl">
            <h3 className="text-xs font-mono-tech text-sky-400 uppercase font-bold tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Canales Oficiales de Contacto
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1.5 font-mono-tech flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  Correo Corporativo
                </label>
                <input
                  type="email"
                  required
                  value={settings.contact_email}
                  onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white focus:outline-none focus:border-[#ffd343]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5 font-mono-tech flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  Teléfono Comercial
                </label>
                <input
                  type="text"
                  value={settings.contact_phone}
                  onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white font-mono-tech focus:outline-none focus:border-[#ffd343]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5 font-mono-tech flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  Número WhatsApp (Sin +)
                </label>
                <input
                  type="text"
                  value={settings.whatsapp_number}
                  onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white font-mono-tech focus:outline-none focus:border-[#ffd343]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: System Preferences */}
          <div className="p-6 rounded-3xl bg-[#1b3852] border border-[#2b5b84] space-y-4 shadow-xl">
            <h3 className="text-xs font-mono-tech text-purple-400 uppercase font-bold tracking-wider flex items-center gap-2">
              <Percent className="w-4 h-4" />
              Parámetros de Facturación & Alertas
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs items-center">
              <div>
                <label className="block text-slate-300 font-bold mb-1.5 font-mono-tech">
                  Tasa de IVA Predeterminada (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.default_tax_rate}
                  onChange={(e) => setSettings({ ...settings, default_tax_rate: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white font-mono-tech focus:outline-none focus:border-[#ffd343]"
                />
              </div>

              <div className="flex items-center gap-3 pt-4 sm:pt-0">
                <input
                  type="checkbox"
                  id="enable_alerts"
                  checked={settings.enable_email_alerts}
                  onChange={(e) => setSettings({ ...settings, enable_email_alerts: e.target.checked })}
                  className="w-4 h-4 rounded text-[#ffd343] focus:ring-0 bg-[#142332] border-[#2b5b84] cursor-pointer"
                />
                <label htmlFor="enable_alerts" className="text-xs text-slate-300 cursor-pointer flex items-center gap-1.5 font-bold">
                  <Bell className="w-4 h-4 text-[#ffd343]" />
                  <span>Activar alertas del centro de notificaciones</span>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3.5 rounded-2xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-extrabold text-xs inline-flex items-center gap-2 shadow-xl cursor-pointer transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Guardando Cambios...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Guardar Configuración Global</span>
                </>
              )}
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
