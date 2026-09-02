import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../Logo';
import { Lock, Mail, AlertCircle, ArrowRight, Loader2, Info } from 'lucide-react';
import { LEGAL_INFO } from '../../data/corporateData';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const { error } = await signIn(email.trim(), password);

    setIsSubmitting(false);

    if (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage(
        error.message === 'Invalid login credentials'
          ? 'Credenciales inválidas. Verifica tu correo y contraseña.'
          : error.message || 'No se pudo iniciar sesión. Verifica tu conexión e intenta nuevamente.'
      );
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#111d28] text-slate-100 flex flex-col items-center justify-center p-4 font-tech">
      <div className="w-full max-w-md">
        
        {/* Header Logo */}
        <div className="flex flex-col items-center mb-8">
          <Logo size="lg" showText={true} />
          <span className="text-xs font-mono-tech text-[#ffd343] mt-3 font-bold">
            PANEL ADMINISTRATIVO CRM :: ACCESO SECURE
          </span>
        </div>

        {/* Card Form */}
        <div className="bg-[#1b3852] rounded-3xl border border-[#2b5b84] p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="border-b border-[#2b5b84] pb-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#ffd343] text-[#111d28]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Iniciar Sesión</h1>
              <p className="text-xs text-slate-300">Acceso restringido para personal autorizado</p>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-mono-tech text-slate-300 font-bold mb-1.5">
                Correo Electrónico *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@corplex.co"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd343]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-xs font-mono-tech text-slate-300 font-bold mb-1.5">
                Contraseña *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#142332] border border-[#2b5b84] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd343]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-[#ffd343] hover:bg-[#ffc520] text-[#111d28] font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verificando credenciales...</span>
                </>
              ) : (
                <>
                  <span>Ingresar al CRM</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Info Notice */}
          <div className="pt-4 border-t border-[#2b5b84] flex items-start gap-2.5 text-[11px] text-slate-300 leading-relaxed">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <span>
              Este panel está protegido mediante <strong>Supabase Auth</strong> y políticas RLS. El acceso requiere una cuenta registrada en el proyecto Supabase de {LEGAL_INFO.companyName}.
            </span>
          </div>

        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-xs text-slate-400 hover:text-[#ffd343] transition-colors font-mono-tech">
            ← Volver a la plataforma pública
          </a>
        </div>

      </div>
    </div>
  );
};
