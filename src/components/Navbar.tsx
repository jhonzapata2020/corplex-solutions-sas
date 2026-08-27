import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, MessageSquareCode, MessageCircle } from 'lucide-react';
import { LEGAL_INFO } from '../data/corporateData';
import { Logo } from './Logo';

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
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Floating Glass Island Nav Pill */}
        <div className={`w-full flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-gray-950/85 backdrop-blur-2xl border border-gray-800/80 shadow-2xl shadow-black/90' 
            : 'bg-gray-950/60 backdrop-blur-xl border border-gray-800/60 shadow-xl'
        }`}>
          
          {/* Official Logo */}
          <a href="#inicio" className="group">
            <Logo size="md" />
          </a>

          {/* Central Floating Menu */}
          <nav className="hidden xl:flex items-center gap-1 bg-gray-900/80 px-2.5 py-1 rounded-full border border-gray-800 shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  activeSection === link.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {activeSection === link.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400"></span>
                )}
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Action Group: Perimeter Glow CTA Button & Direct WhatsApp */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={`https://wa.me/${LEGAL_INFO.whatsapp1}?text=${encodeURIComponent('Hola CORPLEX SOLUTIONS S.A.S., me comunico desde la plataforma.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-900 hover:bg-emerald-950/50 text-emerald-400 border border-gray-800 hover:border-emerald-500/40 transition-all duration-200 group"
              title="Chat Directo WhatsApp (+57 320 710 5618)"
            >
              <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform stroke-[1.75]" />
            </a>

            <button
              onClick={onOpenQuoteModal}
              className="glow-pill-button px-4 py-2 text-xs font-bold rounded-full text-white shadow-lg flex items-center gap-2"
            >
              <MessageSquareCode className="w-3.5 h-3.5 stroke-[1.75]" />
              <span>Cotizar Proyecto / WhatsApp</span>
            </button>
          </div>

          {/* Mobile Drawer Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenQuoteModal}
              className="sm:hidden text-[11px] px-3 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold"
            >
              Cotizar
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-gray-900 text-gray-300 hover:text-white border border-gray-800"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 stroke-[1.75]" /> : <Menu className="w-5 h-5 stroke-[1.75]" />}
            </button>
          </div>

        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden mt-2 max-w-7xl mx-auto px-4 sm:px-6 pointer-events-auto">
          <div className="bg-gray-950/95 backdrop-blur-2xl rounded-3xl p-5 border border-gray-800 shadow-2xl animate-in slide-in-from-top-3 duration-200">
            <div className="flex flex-col space-y-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-medium transition-colors flex items-center justify-between ${
                    activeSection === link.id
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold'
                      : 'text-gray-300 hover:bg-gray-900 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {activeSection === link.id && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
                </a>
              ))}

              <div className="pt-4 mt-2 border-t border-gray-800/80 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuoteModal();
                  }}
                  className="w-full py-3 rounded-full glow-pill-button text-white font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <span>Cotizar Proyecto / WhatsApp</span>
                  <ArrowRight className="w-4 h-4 stroke-[1.75]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
