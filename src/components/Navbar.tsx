import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, MessageCircle, Menu, X, Heart, Lock } from 'lucide-react';
import { LEGAL_INFO } from '../data/corporateData';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenQuoteModal: () => void;
  onOpenControlRoom?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal, onOpenControlRoom }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/servicios') {
      setActiveSection('servicios');
      return;
    }

    const handleScroll = () => {
      const sections = ['inicio', 'centro-operaciones', 'servicios', 'casos-exito', 'contacto'];
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
  }, [location.pathname]);

  const navLinks = [
    { href: location.pathname === '/' ? '#inicio' : '/', to: '/', label: 'Inicio', id: 'inicio', isRouter: location.pathname !== '/' },
    { href: '#centro-operaciones', to: '/#centro-operaciones', label: 'Control Room ⚡', id: 'centro-operaciones', badge: 'LIVE', isRouter: false },
    { href: '/servicios', to: '/servicios', label: 'Servicios', id: 'servicios', isRouter: true },
    { href: location.pathname === '/' ? '#casos-exito' : '/#casos-exito', to: '/#casos-exito', label: 'Portafolio', id: 'casos-exito', isRouter: location.pathname !== '/' },
    { href: location.pathname === '/' ? '#contacto' : '/#contacto', to: '/#contacto', label: 'Contacto', id: 'contacto', isRouter: location.pathname !== '/' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    if (link.id === 'centro-operaciones' && onOpenControlRoom) {
      e.preventDefault();
      onOpenControlRoom();
      return;
    }

    if (link.id === 'servicios' && location.pathname === '/servicios') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  };

  return (
    <header className="w-full bg-[#111d28] font-tech text-slate-100 shadow-2xl relative z-40 border-b border-[#2b5b84]/50">
      
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Corporate Brand Logo & Subtitle info */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <Logo size="lg" />
          </Link>
          <div className="hidden lg:flex flex-col text-[11px] font-mono-tech text-slate-400 border-l border-[#2b5b84]/60 pl-3">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              NIT {LEGAL_INFO.nit}
            </span>
            <span className="text-slate-400 text-[10px]">Turbo, Urabá, Colombia</span>
          </div>
        </div>

        {/* Action Controls & Search Box */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Quote Button */}
          <button
            onClick={onOpenQuoteModal}
            className="px-3.5 py-1.5 rounded-md bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Heart className="w-3.5 h-3.5 fill-current text-[#111d28]" />
            <span>Cotizar Proyecto</span>
          </button>

          {/* Search Box Input */}
          <div className="hidden sm:flex items-center bg-white rounded-md p-1 border border-slate-300 text-slate-900 shadow-inner">
            <Search className="w-4 h-4 text-slate-500 ml-2 mr-1" />
            <input
              type="text"
              placeholder="Buscar servicios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs text-slate-900 focus:outline-none w-28 md:w-36 px-1"
            />
            <button
              onClick={() => {
                if (location.pathname !== '/servicios') {
                  navigate('/servicios');
                } else {
                  const elem = document.getElementById('grid-servicios');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-[#2b5b84] hover:bg-[#1e415e] text-white font-bold text-[11px] px-2.5 py-0.5 rounded cursor-pointer"
            >
              IR
            </button>
          </div>

          {/* WhatsApp Direct Link */}
          <a
            href="https://wa.me/573207105618"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 p-2 rounded-full transition-all shadow"
            title="Escríbenos por WhatsApp"
          >
            <MessageCircle className="w-4 h-4 stroke-[2]" />
          </a>

          {/* Discrete Lock Icon for Admin Access */}
          <Link
            to="/admin/login"
            className="p-2 rounded-full bg-[#142332] hover:bg-[#1b3852] text-slate-400 hover:text-[#ffd343] border border-[#2b5b84] transition-all shadow-sm"
            title="Acceso Administrativo 🔒"
          >
            <Lock className="w-4 h-4" />
          </Link>

          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md bg-[#1b3852] text-slate-300 border border-[#2b5b84]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* 5 Strategic Main Navigation Links Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3">
        <nav className="hidden md:flex items-center justify-center gap-2 lg:gap-4 bg-python-nav-gradient rounded-xl px-4 py-1.5 border border-[#4b7da5]/40 text-xs font-medium shadow-lg">
          {navLinks.map((link) => {
            const linkClass = `px-4 py-1.5 rounded-lg transition-all flex items-center gap-2 font-bold ${
              activeSection === link.id
                ? 'bg-[#1b3852] text-[#ffd343] shadow-inner border border-[#ffd343]/40'
                : 'text-slate-200 hover:text-white hover:bg-[#1b3852]/60'
            }`;

            if (link.isRouter) {
              return (
                <Link
                  key={link.id}
                  to={link.to}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={linkClass}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-tech font-extrabold bg-emerald-500 text-slate-950 shadow-sm animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            }

            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className={linkClass}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-tech font-extrabold bg-emerald-500 text-slate-950 shadow-sm animate-pulse">
                    {link.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1b3852] border-t border-[#2b5b84] p-4 font-tech">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const mobileLinkClass = `px-3.5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between ${
                activeSection === link.id
                  ? 'bg-[#2b5b84] text-[#ffd343]'
                  : 'text-slate-300 hover:bg-[#111d28]'
              }`;

              const content = (
                <>
                  <div className="flex items-center gap-2">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-tech font-extrabold bg-emerald-500 text-slate-950">
                        {link.badge}
                      </span>
                    )}
                  </div>
                  {activeSection === link.id && <span className="w-1.5 h-1.5 rounded-full bg-[#ffd343]"></span>}
                </>
              );

              if (link.isRouter) {
                return (
                  <Link
                    key={link.id}
                    to={link.to}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleLinkClick(e, link);
                    }}
                    className={mobileLinkClass}
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleLinkClick(e, link);
                  }}
                  className={mobileLinkClass}
                >
                  {content}
                </a>
              );
            })}

            <div className="pt-3 border-t border-[#2b5b84] flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="flex-1 py-2.5 rounded-md bg-[#ffd343] text-[#111d28] font-bold text-xs text-center"
              >
                Cotizar Proyecto
              </button>

              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-md bg-[#142332] text-slate-300 text-xs font-bold border border-[#2b5b84] flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};
