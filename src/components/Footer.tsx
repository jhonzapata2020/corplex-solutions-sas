import React from 'react';
import { ShieldCheck, Mail, MapPin, Phone, ChevronRight } from 'lucide-react';
import { LEGAL_INFO } from '../data/corporateData';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111d28] border-t border-[#2b5b84] text-slate-300 py-16 relative overflow-hidden font-tech">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 3-Column Minimalist Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-[#2b5b84]">
          
          {/* Column 1: Official Logo & Legal Registration */}
          <div className="space-y-4">
            <Logo size="lg" />

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Empresa de ingeniería de software, arquitectura cloud AWS e innovación tecnológica con sede en Urabá, Colombia.
            </p>

            <div className="space-y-1.5 text-xs font-mono-tech text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 stroke-[1.75]" />
                <span className="font-bold text-white">NIT: {LEGAL_INFO.nit}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Matrícula Mercantil: {LEGAL_INFO.mercantileRegistration}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                <span>{LEGAL_INFO.chamberOfCommerce}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-mono-tech text-[#ffd343] font-bold uppercase tracking-wider mb-4">Navegación Institucional</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#inicio" className="hover:text-[#ffd343] transition-colors flex items-center gap-1.5 font-medium">
                  <ChevronRight className="w-3 h-3 text-slate-500 stroke-[1.75]" /> Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-[#ffd343] transition-colors flex items-center gap-1.5 font-medium">
                  <ChevronRight className="w-3 h-3 text-slate-500 stroke-[1.75]" /> Servicios Bento Grid
                </a>
              </li>
              <li>
                <a href="#soluciones" className="hover:text-[#ffd343] transition-colors flex items-center gap-1.5 font-medium">
                  <ChevronRight className="w-3 h-3 text-slate-500 stroke-[1.75]" /> Solución a la Medida
                </a>
              </li>
              <li>
                <a href="#arquitectura-cloud" className="hover:text-[#ffd343] transition-colors flex items-center gap-1.5 font-medium">
                  <ChevronRight className="w-3 h-3 text-slate-500 stroke-[1.75]" /> Arquitectura Cloud AWS
                </a>
              </li>
              <li>
                <a href="#metodologia" className="hover:text-[#ffd343] transition-colors flex items-center gap-1.5 font-medium">
                  <ChevronRight className="w-3 h-3 text-slate-500 stroke-[1.75]" /> Metodología por Fases
                </a>
              </li>
              <li>
                <a href="#cumplimiento" className="hover:text-[#ffd343] transition-colors flex items-center gap-1.5 font-medium">
                  <ChevronRight className="w-3 h-3 text-slate-500 stroke-[1.75]" /> Credencial Legal
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Sede & Judicial Notification Legal Disclaimer */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono-tech text-[#ffd343] font-bold uppercase tracking-wider mb-4">Sede & Notificaciones</h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 stroke-[1.75]" />
                <span>{LEGAL_INFO.address}, Turbo, Antioquia</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0 stroke-[1.75]" />
                <a href={`mailto:${LEGAL_INFO.institutionalEmail}`} className="hover:underline font-mono-tech text-[11px] text-[#ffd343] font-bold">
                  {LEGAL_INFO.institutionalEmail}
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 stroke-[1.75]" />
                <span className="font-mono-tech font-bold">{LEGAL_INFO.phone1Display}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#142332] border border-[#2b5b84] text-[10px] font-mono-tech text-slate-300 leading-relaxed">
              Autorizado para Notificaciones Judiciales y DIAN en Colombia: <strong className="text-[#ffd343]">{LEGAL_INFO.institutionalEmail}</strong>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-xs font-mono-tech text-slate-400">
          © {new Date().getFullYear()} CORPLEX SOLUTIONS S.A.S. • Todos los derechos reservados.
        </div>

      </div>
    </footer>
  );
};
