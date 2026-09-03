import React, { useEffect, useState, useCallback } from 'react';
import { fetchClients } from '../../services/clientProjectService';
import type { ClientEntity } from '../../types/lead';
import {
  Building2,
  Search,
  RefreshCw,
  AlertCircle,
  X,
  FileCheck2
} from 'lucide-react';

export const AdminClients: React.FC = () => {
  const [clients, setClients] = useState<ClientEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [totalClients, setTotalClients] = useState(0);
  const [activeClientsCount, setActiveClientsCount] = useState(0);

  const [selectedClient, setSelectedClient] = useState<ClientEntity | null>(null);

  const loadClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchClients();
      setClients(res.clients);
      setTotalClients(res.totalClients);
      setActiveClientsCount(res.activeClientsCount);
    } catch (err) {
      console.error('Error cargando clientes:', err);
      setError('No se pudieron consultar los clientes desde Supabase.');
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
        const res = await fetchClients();
        if (isMounted) {
          setClients(res.clients);
          setTotalClients(res.totalClients);
          setActiveClientsCount(res.activeClientsCount);
        }
      } catch (err) {
        console.error('Error cargando clientes:', err);
        if (isMounted) setError('No se pudieron consultar clientes.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    void init();
    return () => { isMounted = false; };
  }, []);

  const filteredClients = clients.filter(c => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      c.company_name.toLowerCase().includes(term) ||
      c.client_code.toLowerCase().includes(term) ||
      (c.nit_tax_id && c.nit_tax_id.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-6 font-tech">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Gestión de Clientes Corporativos
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Fase 4: Directorio de clientes, ficha legal, contactos y proyectos vinculados ({totalClients} registrados)
          </p>
        </div>

        <button
          onClick={loadClients}
          className="p-2.5 rounded-xl bg-[#142332] hover:bg-[#2b5b84] text-slate-300 hover:text-white border border-[#2b5b84] transition-all cursor-pointer shadow-sm self-start sm:self-auto flex items-center gap-2 text-xs font-bold"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Actualizar Lista</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl bg-[#1b3852] border border-[#2b5b84] shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs font-mono-tech text-slate-400 font-bold block">TOTAL CLIENTES</span>
            <span className="text-3xl font-extrabold text-white mt-1 block">{totalClients}</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#142332] text-sky-400">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#1b3852] border border-[#2b5b84] shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs font-mono-tech text-slate-400 font-bold block">CLIENTES ACTIVOS</span>
            <span className="text-3xl font-extrabold text-emerald-400 mt-1 block">{activeClientsCount}</span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
            <FileCheck2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#1b3852] border border-[#2b5b84] shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs font-mono-tech text-slate-400 font-bold block">UBICACIÓN PRINCIPAL</span>
            <span className="text-sm font-extrabold text-[#ffd343] mt-1 block">Turbo, Urabá, Antioquia</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#ffd343]/20 text-[#ffd343]">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-[#1b3852] border border-[#2b5b84] shadow-md font-tech">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar por código (Ej: CPX-CLI-001), empresa o NIT..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd343]"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-[#1b3852] rounded-3xl border border-[#2b5b84] shadow-xl overflow-hidden">
        
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#ffd343] animate-spin" />
            <span className="text-xs font-mono-tech text-slate-300">Cargando directorio de clientes desde Supabase...</span>
          </div>
        ) : error ? (
          <div className="py-12 text-center text-rose-300 text-xs space-y-3 p-6">
            <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
            <p>{error}</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="py-16 text-center text-slate-300 text-xs space-y-3 p-6 max-w-lg mx-auto">
            <Building2 className="w-10 h-10 text-[#ffd343] mx-auto mb-2" />
            <p className="font-bold text-white text-base">No hay clientes registrados aún</p>
            <p className="text-slate-400 leading-relaxed">
              Los clientes se crean automáticamente al marcar una cotización como <strong>Aceptada (Ganada)</strong> en <code className="text-[#ffd343]">/admin/quotes</code> o un lead como <strong>Ganado</strong> en <code className="text-[#ffd343]">/admin/leads</code>.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-200">
              
              <thead className="bg-[#142332] text-[11px] font-mono-tech text-slate-400 border-b border-[#2b5b84] uppercase">
                <tr>
                  <th className="py-4 px-6 font-bold">Código / Fecha</th>
                  <th className="py-4 px-6 font-bold">Empresa / Razón Social</th>
                  <th className="py-4 px-6 font-bold">NIT / Identificación</th>
                  <th className="py-4 px-6 font-bold">Contacto Principal</th>
                  <th className="py-4 px-6 font-bold">Sector</th>
                  <th className="py-4 px-6 font-bold">Estado</th>
                  <th className="py-4 px-6 font-bold text-right">Acción</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#2b5b84]/50">
                {filteredClients.map((client) => {
                  const primaryContact = client.contacts?.find(c => c.is_primary) || client.contacts?.[0];

                  return (
                    <tr key={client.id} className="hover:bg-[#142332]/60 transition-colors group">
                      
                      <td className="py-4 px-6 font-mono-tech">
                        <span className="font-extrabold text-[#ffd343] text-sm block">
                          {client.client_code}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {new Date(client.created_at).toLocaleDateString('es-CO')}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-bold text-white group-hover:text-[#ffd343] transition-colors">
                          {client.company_name}
                        </div>
                        {client.legal_name && (
                          <div className="text-[11px] text-slate-400">{client.legal_name}</div>
                        )}
                      </td>

                      <td className="py-4 px-6 font-mono-tech">
                        {client.nit_tax_id ? (
                          <span className="text-slate-200 font-bold">{client.nit_tax_id}</span>
                        ) : (
                          <span className="text-amber-400 italic text-[11px]">Pendiente de NIT</span>
                        )}
                      </td>

                      <td className="py-4 px-6">
                        {primaryContact ? (
                          <div>
                            <div className="font-bold text-slate-200">{primaryContact.full_name}</div>
                            <div className="text-[11px] text-slate-400">{primaryContact.email || primaryContact.phone}</div>
                          </div>
                        ) : (
                          <span className="text-slate-500 italic">Sin contacto</span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-slate-300">
                        {client.sector || 'General'}
                      </td>

                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded text-[11px] font-mono-tech font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          ACTIVO
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => setSelectedClient(client)}
                          className="px-3 py-1.5 rounded-xl bg-[#142332] hover:bg-[#ffd343] hover:text-[#111d28] text-slate-300 font-bold border border-[#2b5b84] transition-all cursor-pointer"
                        >
                          Ver Ficha
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        )}

      </div>

      {/* Client Detail Drawer */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 font-tech">
          <div className="w-full max-w-xl bg-[#1b3852] border-l border-[#2b5b84] h-full overflow-y-auto p-6 space-y-6 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between border-b border-[#2b5b84] pb-4">
              <div>
                <span className="text-xs font-mono-tech text-[#ffd343] font-bold">
                  {selectedClient.client_code}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">
                  {selectedClient.company_name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-2 rounded-xl bg-[#142332] text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Legal Information */}
            <div className="p-4 rounded-2xl bg-[#142332] border border-[#2b5b84] space-y-2 text-xs">
              <span className="font-bold text-slate-400 uppercase font-mono-tech block">Ficha Legal & Fiscal</span>
              <p>Razón Social: <strong className="text-white">{selectedClient.legal_name || selectedClient.company_name}</strong></p>
              <p>NIT / Identificación: <strong className="text-[#ffd343] font-mono-tech">{selectedClient.nit_tax_id || 'Pendiente de NIT'}</strong></p>
              <p>Ciudad / Ubicación: <strong className="text-white">{selectedClient.city || 'Turbo, Urabá'}</strong></p>
              <p>Sector Económico: <strong className="text-white">{selectedClient.sector || 'General'}</strong></p>
            </div>

            {/* Contacts List */}
            <div className="p-4 rounded-2xl bg-[#142332] border border-[#2b5b84] space-y-3 text-xs">
              <span className="font-bold text-slate-400 uppercase font-mono-tech block">Personas de Contacto</span>
              {selectedClient.contacts && selectedClient.contacts.length > 0 ? (
                selectedClient.contacts.map(contact => (
                  <div key={contact.id} className="p-3 rounded-xl bg-[#1b3852] border border-[#2b5b84] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{contact.full_name}</span>
                      <span className="text-[10px] font-mono-tech text-[#ffd343]">{contact.role_title}</span>
                    </div>
                    {contact.email && <div className="text-slate-300">{contact.email}</div>}
                    {contact.phone && <div className="text-slate-400 font-mono-tech">{contact.phone}</div>}
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic">No hay contactos adicionales registrados.</p>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
