import React from 'react';
import { Network, ShieldCheck, Mail, MapPin, Phone, ChevronRight } from 'lucide-react';
import { LEGAL_INFO } from '../data/corporateData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-gray-400 py-16 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 3-Column Minimalist Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-gray-800">
          
          {/* Column 1: Brand & Legal Registration */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-cyan-400 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-gray-950 rounded-[11px] flex items-center justify-center">
                  <Network className="w-4 h-4 text-sky-400 stroke-[1.75]" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                CORPLEX <span className="text-sky-400">SOLUTIONS</span> <span className="text-xs text-sky-400 font-mono">S.A.S.</span>
              </span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              Empresa de ingeniería de software, arquitectura cloud AWS e innovación tecnológica con sede en Urabá, Colombia.
            </p>

            <div className="space-y-1.5 text-xs font-mono text-gray-400 pt-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 stroke-[1.75]" />
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

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-mono text-white font-bold uppercase tracking-wider mb-4">Navegación Institucional</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#inicio" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-gray-600 stroke-[1.75]" /> Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-gray-600 stroke-[1.75]" /> Servicios Bento Grid
                </a>
              </li>
              <li>
                <a href="#enfoque-academico" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-gray-600 stroke-[1.75]" /> Sector Educativo (UNAD)
                </a>
              </li>
              <li>
                <a href="#arquitectura-cloud" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-gray-600 stroke-[1.75]" /> Arquitectura Cloud AWS
                </a>
              </li>
              <li>
                <a href="#metodologia" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-gray-600 stroke-[1.75]" /> Metodología por Fases
                </a>
              </li>
              <li>
                <a href="#cumplimiento" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-gray-600 stroke-[1.75]" /> Credencial Legal
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Sede & Judicial Notification Legal Disclaimer */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-white font-bold uppercase tracking-wider mb-4">Sede & Notificaciones</h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 stroke-[1.75]" />
                <span>{LEGAL_INFO.address}, Turbo, Antioquia</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0 stroke-[1.75]" />
                <a href={`mailto:${LEGAL_INFO.institutionalEmail}`} className="hover:underline font-mono text-[11px]">
                  {LEGAL_INFO.institutionalEmail}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0 stroke-[1.75]" />
                <span className="font-mono">{LEGAL_INFO.phone1Display}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gray-900 border border-gray-800 text-[10px] font-mono text-gray-400 leading-relaxed">
              Autorizado para Notificaciones Judiciales y DIAN en Colombia: <strong className="text-gray-200">{LEGAL_INFO.institutionalEmail}</strong>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-xs font-mono text-gray-500">
          © {new Date().getFullYear()} CORPLEX SOLUTIONS S.A.S. • Todos los derechos reservados.
        </div>

      </div>
    </footer>
  );
};
