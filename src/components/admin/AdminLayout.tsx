import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchNotifications } from '../../services/notificationService';
import { Logo } from '../Logo';
import {
  LayoutDashboard,
  Users,
  Bell,
  FileText,
  Building2,
  FolderGit2,
  LifeBuoy,
  Globe,
  Settings,
  LogOut,
  Menu,
  X,
  UserCheck,
  ChevronRight
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const checkNotifications = async () => {
      try {
        const res = await fetchNotifications();
        if (isMounted) setUnreadNotificationsCount(res.unreadCount);
      } catch {
        // Silencioso si aún no está creada la tabla
      }
    };
    void checkNotifications();

    // Consultar cada 30 segundos
    const interval = setInterval(() => {
      void checkNotifications();
    }, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  const navItems = [
    { label: 'Resumen / Inicio', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Leads & Oportunidades', path: '/admin/leads', icon: Users },
    { label: 'Notificaciones & Tareas', path: '/admin/notifications', icon: Bell, badgeCount: unreadNotificationsCount },
    { label: 'Cotizaciones Formales', path: '/admin/quotes', icon: FileText },
    { label: 'Clientes Corporativos', path: '/admin/clients', icon: Building2 },
    { label: 'Proyectos de Ingeniería', path: '/admin/projects', icon: FolderGit2 },
    { label: 'Soporte TI', path: '/admin/tickets', icon: LifeBuoy, badge: 'Fase 5' },
    { label: 'Contenido Web', path: '/admin/cms', icon: Globe, badge: 'Fase 6' },
    { label: 'Configuración', path: '/admin/settings', icon: Settings }
  ];

  const getBreadcrumbTitle = () => {
    if (location.pathname === '/admin/leads') return 'Gestión de Leads';
    if (location.pathname === '/admin/notifications') return 'Centro de Notificaciones & Tareas';
    if (location.pathname === '/admin/quotes') return 'Módulo de Cotizaciones Formales';
    if (location.pathname === '/admin/clients') return 'Clientes Corporativos';
    if (location.pathname === '/admin/projects') return 'Control de Proyectos de Ingeniería';
    if (location.pathname === '/admin/settings') return 'Configuración del Sistema';
    return 'Dashboard General';
  };

  return (
    <div className="min-h-screen bg-[#111d28] text-slate-100 font-tech flex flex-col md:flex-row antialiased selection:bg-[#ffd343] selection:text-black">
      
      {/* Mobile Top Navbar Header */}
      <div className="md:hidden bg-[#1b3852] border-b border-[#2b5b84] p-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <Logo size="sm" showText={true} />
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/notifications')}
            className="relative p-2 rounded-xl bg-[#142332] text-slate-300 border border-[#2b5b84]"
          >
            <Bell className="w-5 h-5 text-[#ffd343]" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-mono-tech font-extrabold flex items-center justify-center animate-pulse">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-[#142332] text-slate-300 hover:text-white border border-[#2b5b84]"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop & Mobile Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 bottom-0 z-40 w-64 bg-[#1b3852] border-r border-[#2b5b84] flex flex-col justify-between transition-transform duration-300 shadow-2xl h-screen ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Sidebar Header Logo */}
          <div className="p-6 border-b border-[#2b5b84]">
            <Logo size="md" showText={true} />
            <div className="mt-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-mono-tech text-[#ffd343] font-bold">
                PANEL DE CONTROL CRM
              </span>
            </div>
          </div>

          {/* Navigation Items List */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-220px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isFuturePhase = Boolean(item.badge);

              if (isFuturePhase) {
                return (
                  <div
                    key={item.path}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-500 cursor-not-allowed select-none bg-[#142332]/40 border border-transparent opacity-60"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-slate-500" />
                      <span>{item.label}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#1b3852] text-[10px] font-mono-tech text-slate-400 border border-[#2b5b84]">
                      {item.badge}
                    </span>
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#ffd343] text-[#111d28] shadow-md font-extrabold'
                        : 'text-slate-300 hover:bg-[#142332] hover:text-white border border-transparent hover:border-[#2b5b84]'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  
                  {item.badgeCount !== undefined && item.badgeCount > 0 ? (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-mono-tech font-extrabold animate-pulse">
                      {item.badgeCount}
                    </span>
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom User & SignOut */}
        <div className="p-4 border-t border-[#2b5b84] bg-[#142332]/60">
          <div className="flex items-center gap-3 mb-3 p-2 rounded-xl bg-[#1b3852] border border-[#2b5b84]">
            <div className="p-2 rounded-lg bg-[#ffd343] text-[#111d28]">
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-white block truncate">
                {user?.email || 'Administrador Corplex'}
              </span>
              <span className="text-[10px] font-mono-tech text-emerald-400 font-bold block">
                Sesión Supabase Auth
              </span>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Area Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Desktop Topbar Header */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-[#1b3852] border-b border-[#2b5b84] shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-400">
            <span>Admin</span>
            <span>/</span>
            <span className="text-[#ffd343] font-bold">{getBreadcrumbTitle()}</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => navigate('/admin/notifications')}
              className="relative p-2 rounded-xl bg-[#142332] hover:bg-[#2b5b84] text-slate-300 hover:text-white border border-[#2b5b84] transition-all cursor-pointer flex items-center gap-2"
              title="Notificaciones en vivo"
            >
              <Bell className="w-4 h-4 text-[#ffd343]" />
              <span className="font-bold">Alertas</span>
              {unreadNotificationsCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-mono-tech font-extrabold animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            <span className="px-3 py-1 rounded-full bg-[#142332] border border-[#2b5b84] text-slate-300 font-mono-tech">
              Servidor: <strong className="text-emerald-400 font-bold">Supabase PostgreSQL</strong>
            </span>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#142332] hover:bg-[#2b5b84] text-slate-300 hover:text-white border border-[#2b5b84] font-bold transition-all"
            >
              Ver Sitio Público ↗
            </a>
          </div>
        </header>

        {/* Main Route Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};
