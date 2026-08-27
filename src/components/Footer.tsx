import React from 'react';
import { Network, ShieldCheck, Mail, MapPin, Phone, ExternalLink, ChevronRight } from 'lucide-react';
import { LEGAL_INFO } from '../data/corporateData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-16 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Legal Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Network className="w-5 h-5 text-sky-400" />
                </div>
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                CORPLEX <span className="text-sky-400">SOLUTIONS</span> <span className="text-xs text-sky-400 font-mono">S.A.S.</span>
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Empresa de ingeniería de software, arquitectura cloud AWS e innovación tecnológica con sede en Urabá, Antioquia. Aliado estratégico para instituciones educativas y empresas.
            </p>

            <div className="space-y-1.5 text-xs font-mono text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>NIT: {LEGAL_INFO.nit}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                <span>Matrícula Mercantil: {LEGAL_INFO.mercantileRegistration}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>{LEGAL_INFO.chamberOfCommerce}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-mono text-white font-bold uppercase tracking-wider mb-4">Navegación Rápida</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#inicio" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Catálogo de Servicios
                </a>
              </li>
              <li>
                <a href="#enfoque-academico" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Sector Educativo (UNAD)
                </a>
              </li>
              <li>
                <a href="#arquitectura-cloud" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Arquitectura Cloud AWS
                </a>
              </li>
              <li>
                <a href="#metodologia" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Metodología Ágil
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & CIIU Codes */}
          <div>
            <h4 className="text-xs font-mono text-white font-bold uppercase tracking-wider mb-4">Clasificación CIIU</h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li className="p-2 rounded bg-slate-900 border border-slate-800">
                <strong className="text-sky-400">J6201:</strong> Desarrollo de Sistemas
              </li>
              <li className="p-2 rounded bg-slate-900 border border-slate-800">
                <strong className="text-sky-400">J6202:</strong> Consultoría Informática
              </li>
              <li className="p-2 rounded bg-slate-900 border border-slate-800">
                <strong className="text-sky-400">G4651:</strong> Comercio Equipos/Software
              </li>
              <li className="p-2 rounded bg-slate-900 border border-slate-800">
                <strong className="text-sky-400">S9511:</strong> Mantenimiento TI
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Headquarters */}
          <div>
            <h4 className="text-xs font-mono text-white font-bold uppercase tracking-wider mb-4">Sede Institucional</h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{LEGAL_INFO.address}, Turbo, Antioquia</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`mailto:${LEGAL_INFO.institutionalEmail}`} className="hover:underline font-mono text-[11px]">
                  {LEGAL_INFO.institutionalEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-mono">{LEGAL_INFO.phone1Display}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} CORPLEX SOLUTIONS S.A.S. • Todos los derechos reservados.
          </div>
          <div className="text-[11px]">
            Autorizado para Notificaciones Judiciales Electrónicas | Razón Social Registrada en Colombia.
          </div>
        </div>

      </div>
    </footer>
  );
};
