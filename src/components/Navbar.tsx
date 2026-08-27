import React, { useState, useEffect } from 'react';
import { Search, MessageCircle, Menu, X, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
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
    { label: 'CORPLEX', color: 'border-t-4 border-cyan-400', active: true, href: '#inicio' },
    { label: 'UNAD / ECBTI', color: 'border-t-4 border-emerald-400', active: false, href: '#enfoque-academico' },
    { label: 'Cloud AWS', color: 'border-t-4 border-sky-400', active: false, href: '#arquitectura-cloud' },
    { label: 'Agrotech & IA', color: 'border-t-4 border-amber-400', active: false, href: '#servicios' },
    { label: 'Ficha Legal', color: 'border-t-4 border-rose-400', active: false, href: '#cumplimiento' },
    { label: 'Contacto', color: 'border-t-4 border-teal-400', active: false, href: '#contacto' },
  ];

  return (
    <header className="w-full bg-[#111d28] font-tech text-slate-100 shadow-2xl relative z-40 border-b border-[#2b5b84]/50">
      
      {/* 1. Top Utility Header Bar */}
      <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto px-6 text-xs border-b border-[#2b5b84]/30">
        <div className="flex items-center font-mono-tech">
          {topTabs.map((tab, idx) => (
            <a
              key={idx}
              href={tab.href}
              className={`px-4 py-2.5 transition-colors flex items-center gap-1.5 ${tab.color} ${
                tab.active
                  ? 'bg-[#1b3852] text-cyan-300 font-bold shadow-inner'
                  : 'bg-[#111d28] text-slate-400 hover:text-white hover:bg-[#1b3852]/60'
              }`}
            >
              <span>{tab.label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono-tech text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            NIT {LEGAL_INFO.nit}
          </span>
          <span>Turbo, Urabá, Colombia</span>
        </div>
      </div>

      {/* 2. Main Brand & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Official Logo */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <Logo size="lg" />
        </a>

        {/* Action Controls & Search Box */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Quote Button (Refined Cyan Glass Pill) */}
          <button
            onClick={onOpenQuoteModal}
            className="px-4 py-2 rounded-full bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 hover:text-white border border-cyan-500/40 font-medium text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Heart className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Cotizar Proyecto</span>
          </button>

          {/* Search Box Input */}
          <div className="hidden sm:flex items-center bg-white rounded-md p-1 border border-slate-300 text-slate-900 shadow-inner">
            <Search className="w-4 h-4 text-slate-500 ml-2 mr-1" />
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
              className="bg-[#2b5b84] hover:bg-[#1e415e] text-white font-bold text-[11px] px-3 py-1 rounded"
            >
              IR
            </button>
          </div>

          {/* Direct Circular WhatsApp Button */}
          <a
            href="https://wa.me/573207105618"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 p-2 rounded-full transition-all shadow"
            title="Escríbenos por WhatsApp"
          >
            <MessageCircle className="w-4 h-4 stroke-[2]" />
          </a>

          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md bg-[#1b3852] text-slate-300 border border-[#2b5b84]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* 3. Main Navigation Tab Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3">
        <nav className="hidden md:flex items-center justify-around bg-python-nav-gradient rounded-xl px-2 py-1.5 border border-[#4b7da5]/40 text-xs font-medium shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeSection === link.id
                  ? 'bg-[#1b3852] text-cyan-300 font-bold shadow-inner border border-cyan-500/40'
                  : 'text-slate-200 hover:text-white hover:bg-[#1b3852]/50'
              }`}
            >
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1b3852] border-t border-[#2b5b84] p-4 font-tech">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between ${
                  activeSection === link.id
                    ? 'bg-[#2b5b84] text-cyan-300 font-bold'
                    : 'text-slate-300 hover:bg-[#111d28]'
                }`}
              >
                <span>{link.label}</span>
                {activeSection === link.id && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
              </a>
            ))}

            <div className="pt-3 border-t border-[#2b5b84] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-2.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium text-xs text-center"
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
