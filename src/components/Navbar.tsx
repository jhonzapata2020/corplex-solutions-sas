import React, { useState, useEffect } from 'react';
import { Search, MessageCircle, Menu, X, ShieldCheck, Heart } from 'lucide-react';
import { LEGAL_INFO } from '../data/corporateData';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'servicios', 'soluciones', 'enfoque-academico', 'arquitectura-cloud', 'metodologia', 'cumplimiento', 'contacto'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#inicio', label: 'Inicio', id: 'inicio' },
    { href: '#servicios', label: 'Servicios', id: 'servicios' },
    { href: '#soluciones', label: 'Soluciones', id: 'soluciones' },
    { href: '#enfoque-academico', label: 'Sector Educativo', id: 'enfoque-academico' },
    { href: '#arquitectura-cloud', label: 'Arquitectura Cloud', id: 'arquitectura-cloud' },
    { href: '#metodologia', label: 'Metodología', id: 'metodologia' },
    { href: '#cumplimiento', label: 'Ficha Legal', id: 'cumplimiento' },
    { href: '#contacto', label: 'Contacto', id: 'contacto' }
  ];

  const topTabs = [
    { label: 'CORPLEX', color: 'border-t-2 border-cyan-600', active: true, href: '#inicio' },
    { label: 'UNAD / ECBTI', color: 'border-t-2 border-emerald-600', active: false, href: '#enfoque-academico' },
    { label: 'Cloud AWS', color: 'border-t-2 border-sky-600', active: false, href: '#arquitectura-cloud' },
    { label: 'Agrotech & IA', color: 'border-t-2 border-amber-600', active: false, href: '#servicios' },
    { label: 'Ficha Legal', color: 'border-t-2 border-rose-600', active: false, href: '#cumplimiento' },
    { label: 'Contacto', color: 'border-t-2 border-teal-600', active: false, href: '#contacto' },
  ];

  return (
    <header className="w-full bg-white font-tech text-slate-800 shadow-sm relative z-40 border-b border-slate-200/80">
      
      {/* 1. Top Utility Header Bar */}
      <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto px-6 text-xs bg-slate-50 border-b border-slate-200">
        <div className="flex items-center font-mono-tech">
          {topTabs.map((tab, idx) => (
            <a
              key={idx}
              href={tab.href}
              className={`px-4 py-2 transition-colors flex items-center gap-1.5 ${tab.color} ${
                tab.active
                  ? 'bg-white text-cyan-700 font-bold border-b-0'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{tab.label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono-tech text-slate-500">
          <span className="flex items-center gap-1 text-emerald-600 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            NIT {LEGAL_INFO.nit}
          </span>
          <span>Turbo, Urabá, Colombia</span>
        </div>
      </div>

      {/* 2. Main Brand Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Official Logo */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <Logo size="lg" />
        </a>

        {/* Action Controls & Search Box */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Quote Button */}
          <button
            onClick={onOpenQuoteModal}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Heart className="w-3.5 h-3.5 fill-current text-white" />
            <span>Cotizar Proyecto</span>
          </button>

          {/* Search Input Box */}
          <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-1 border border-slate-300 text-slate-900">
            <Search className="w-4 h-4 text-slate-400 ml-2 mr-1" />
            <input
              type="text"
              placeholder="Buscar servicios, cloud..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs text-slate-900 focus:outline-none w-36 md:w-44 px-1"
            />
            <button
              onClick={() => {
                if (searchQuery.trim()) {
                  const elem = document.getElementById('servicios');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-[11px] px-3 py-1 rounded-md"
            >
              IR
            </button>
          </div>

          {/* Direct Circular WhatsApp Button */}
          <a
            href="https://wa.me/573207105618"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 p-2 rounded-full transition-all shadow-sm"
            title="Escríbenos por WhatsApp"
          >
            <MessageCircle className="w-4 h-4 stroke-[2]" />
          </a>

          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md bg-slate-100 text-slate-700 border border-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* 3. Main Navigation Tab Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3">
        <nav className="hidden md:flex items-center justify-around bg-slate-900 text-white rounded-xl px-2 py-1.5 border border-slate-800 text-xs font-medium shadow-sm">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeSection === link.id
                  ? 'bg-cyan-600 text-white font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 p-4 font-tech">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between ${
                  activeSection === link.id
                    ? 'bg-cyan-50 text-cyan-700 font-bold border border-cyan-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{link.label}</span>
                {activeSection === link.id && <span className="w-1.5 h-1.5 rounded-full bg-cyan-600"></span>}
              </a>
            ))}

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-2.5 rounded-lg bg-cyan-600 text-white font-bold text-xs text-center shadow-sm"
              >
                Cotizar Proyecto
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};
