import React, { useState, useEffect } from 'react';
import { Network, Menu, X, ShieldCheck, ArrowRight, MessageSquareCode, MessageCircle } from 'lucide-react';
import { LEGAL_INFO } from '../data/corporateData';

interface NavbarProps {
  onOpenQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['inicio', 'servicios', 'enfoque-academico', 'arquitectura-cloud', 'metodologia', 'cumplimiento', 'contacto'];
      const scrollPosition = window.scrollY + 180;

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
    { href: '#enfoque-academico', label: 'Sector Educativo', id: 'enfoque-academico' },
    { href: '#arquitectura-cloud', label: 'Arquitectura Cloud', id: 'arquitectura-cloud' },
    { href: '#metodologia', label: 'Metodología', id: 'metodologia' },
    { href: '#cumplimiento', label: 'Ficha Legal', id: 'cumplimiento' },
    { href: '#contacto', label: 'Contacto', id: 'contacto' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-black/50 py-3' 
        : 'bg-transparent py-4 border-b border-slate-800/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          
          {/* Brand Logo & Institutional Status */}
          <a href="#inicio" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 via-cyan-400 to-emerald-400 p-[1px] shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Network className="w-4 h-4 text-sky-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-sky-300 transition-colors">
                  CORPLEX <span className="text-sky-400 font-bold">SOLUTIONS</span>
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  S.A.S.
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>NIT {LEGAL_INFO.nit}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">Urabá</span>
              </div>
            </div>
          </a>

          {/* Desktop Glass Capsule Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-full border border-slate-800/90 shadow-inner backdrop-blur-xl">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeSection === link.id
                    ? 'bg-gradient-to-r from-sky-500/20 to-cyan-500/20 text-sky-300 border border-sky-500/40 shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Streamlined Right Action Group */}
          <div className="hidden sm:flex items-center gap-3">
            {/* WhatsApp Quick Direct Link */}
            <a
              href={`https://wa.me/${LEGAL_INFO.whatsapp1}?text=${encodeURIComponent('Hola CORPLEX SOLUTIONS S.A.S., deseo consultar sobre servicios de software e ingeniería.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-emerald-950/40 text-emerald-400 border border-slate-800 hover:border-emerald-500/40 transition-all duration-200 group"
              title="Chat Directo WhatsApp (+57 3207105618)"
            >
              <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>

            {/* Primary Quote CTA Button */}
            <button
              onClick={onOpenQuoteModal}
              className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-xl text-white bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-600 hover:from-sky-400 hover:to-cyan-400 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 gap-2"
            >
              <MessageSquareCode className="w-4 h-4" />
              <span>Cotizar Proyecto</span>
            </button>
          </div>

          {/* Mobile Drawer Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenQuoteModal}
              className="sm:hidden text-xs px-3 py-1.5 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold"
            >
              Cotizar
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-4 pb-6 border-t border-slate-800 bg-slate-950/95 rounded-2xl p-4 backdrop-blur-2xl shadow-2xl animate-in slide-in-from-top-3 duration-200">
            <div className="flex flex-col space-y-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                    activeSection === link.id
                      ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {activeSection === link.id && <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>}
                </a>
              ))}

              <div className="pt-4 mt-2 border-t border-slate-800/80 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuoteModal();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25"
                >
                  <span>Cotizar Proyecto</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/${LEGAL_INFO.whatsapp1}?text=${encodeURIComponent('Hola CORPLEX SOLUTIONS S.A.S., me comunico desde la web.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-emerald-400 border border-emerald-500/30 font-mono text-xs text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp (+57 3207105618)</span>
                </a>

                <div className="text-center pt-2">
                  <span className="text-[11px] text-slate-400 font-mono">
                    NIT {LEGAL_INFO.nit} • Cámara de Comercio de Urabá
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
