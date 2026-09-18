import React, { useState } from 'react';
import {
  ShoppingCart,
  ShoppingBag,
  MessageCircle,
  CreditCard,
  Package,
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Sparkles
} from 'lucide-react';
import { COMMERCE_CARDS, COMMERCE_PACKAGES } from '../data/corporateData';
import type { CommercePackage } from '../types';

interface CommerceSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const CommerceSection: React.FC<CommerceSectionProps> = ({ onSelectServiceForQuote }) => {
  const [selectedPkgId, setSelectedPkgId] = useState<string>('pkg-sell');

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6" />;
      case 'MessageCircle': return <MessageCircle className="w-6 h-6" />;
      case 'CreditCard': return <CreditCard className="w-6 h-6" />;
      case 'Package': return <Package className="w-6 h-6" />;
      case 'Users': return <Users className="w-6 h-6" />;
      case 'Building2': return <Building2 className="w-6 h-6" />;
      default: return <ShoppingCart className="w-6 h-6" />;
    }
  };

  const selectedPackage: CommercePackage =
    COMMERCE_PACKAGES.find(p => p.id === selectedPkgId) || COMMERCE_PACKAGES[1];

  return (
    <section id="commerce" className="py-20 relative bg-[#09111a] font-tech text-slate-100 border-t border-[#2b5b84]/50 overflow-hidden">
      
      {/* Background Ambient Lights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#142332] border border-amber-400/50 text-[#ffd343] text-xs font-mono-tech font-bold mb-4 shadow-lg">
            <ShoppingCart className="w-4 h-4 text-[#ffd343]" />
            <span>NUEVA LÍNEA DE PRODUCTO · CORPLEX COMMERCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Vende en línea. Automatiza tus pedidos. Conoce mejor a tus clientes.
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
            No solo construimos tu tienda. Conectamos el catálogo, el pago, el pedido, el cliente y el seguimiento comercial en un solo sistema integrado y resiliente.
          </p>
        </div>

        {/* Oracle-Style 6 Product Cards Grid */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Layers className="w-6 h-6 text-amber-400" />
                 Catálogo de Soluciones Corplex Commerce
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Módulos desacoplados inspirados en arquitectura empresarial para escalar tu canal comercial.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {COMMERCE_CARDS.map((card) => (
              <div
                key={card.id}
                className="bg-[#142332] rounded-2xl p-6 border border-[#2b5b84] hover:border-amber-400/60 transition-all duration-300 shadow-xl flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Card Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono-tech font-bold bg-amber-400/15 text-[#ffd343] border border-amber-400/40">
                      {card.badge || 'Commerce Module'}
                    </span>
                    <div className="p-2.5 rounded-xl bg-[#1b3852] text-amber-400 border border-[#2b5b84]">
                      {getIconComponent(card.iconName)}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {card.description}
                  </p>

                  {/* Ideal Target */}
                  <div className="p-3 rounded-xl bg-[#0d1722] border border-[#2b5b84]/60 mb-4 text-[11px]">
                    <span className="text-amber-400 font-bold block mb-0.5">Ideal para:</span>
                    <span className="text-slate-300 leading-snug">{card.idealFor}</span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] font-mono-tech text-slate-400 uppercase font-bold block">
                      Incluye:
                    </span>
                    {card.includes.map((inc, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  onClick={() => onSelectServiceForQuote(`Corplex Commerce: ${card.title}`)}
                  className="w-full py-2.5 rounded-xl bg-[#1b3852] hover:bg-amber-400 hover:text-[#111d28] text-amber-300 font-bold text-xs flex items-center justify-center gap-2 border border-amber-400/40 transition-all cursor-pointer shadow-md group/btn"
                >
                  <span>{card.ctaButtonText}</span>
                  <ArrowRight className="w-4 h-4 text-current group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Architecture & Order Flow */}
        <div className="bg-[#142332] rounded-3xl p-6 sm:p-10 border border-[#2b5b84] mb-20 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono-tech text-amber-400 font-bold uppercase tracking-wider block mb-2">
              ARQUITECTURA DE DATOS DESACOPLADA & IDEMPOTENTE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Flujo de Venta Automático y Procesamiento de Pedidos
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              El backend centraliza la fuente de verdad. Las pasarelas de pago externas confirman transacciones mediante webhooks validados por firmas criptográficas y lógica idempotente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            <div className="bg-[#0d1722] p-4 rounded-xl border border-[#2b5b84] text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto font-mono-tech font-bold text-xs">
                01
              </div>
              <h4 className="text-xs font-bold text-white">Captura de Carrito</h4>
              <p className="text-[11px] text-slate-400 leading-snug">
                El usuario explora catálogo en Web o WhatsApp y completa el checkout.
              </p>
            </div>

            <div className="bg-[#0d1722] p-4 rounded-xl border border-[#2b5b84] text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center mx-auto font-mono-tech font-bold text-xs">
                02
              </div>
              <h4 className="text-xs font-bold text-white">Cobro Seguro API</h4>
              <p className="text-[11px] text-slate-400 leading-snug">
                Pasarela (Wompi/Mercado Pago) procesa la transacción con tokenización.
              </p>
            </div>

            <div className="bg-[#0d1722] p-4 rounded-xl border border-[#2b5b84] text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center mx-auto font-mono-tech font-bold text-xs">
                03
              </div>
              <h4 className="text-xs font-bold text-white">Webhook Idempotente</h4>
              <p className="text-[11px] text-slate-400 leading-snug">
                El backend confirma pago, descuenta stock y genera el número de pedido.
              </p>
            </div>

            <div className="bg-[#0d1722] p-4 rounded-xl border border-[#2b5b84] text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-purple-400/20 text-purple-400 flex items-center justify-center mx-auto font-mono-tech font-bold text-xs">
                04
              </div>
              <h4 className="text-xs font-bold text-white">Notificación & CRM</h4>
              <p className="text-[11px] text-slate-400 leading-snug">
                Cliente recibe comprobante por email/WhatsApp y el comprador ingresa al CRM.
              </p>
            </div>
          </div>
        </div>

        {/* Commercial Packages Selector & Calculator */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono-tech text-amber-400 font-bold uppercase tracking-wider block mb-2">
              MODELO DE ADOPCIÓN MODULAR
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Paquetes Comerciales Corplex Commerce
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Escala tu solución desde una tienda en línea esencial hasta una operación omnicanal enterprise.
            </p>
          </div>

          {/* Package Selector Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {COMMERCE_PACKAGES.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedPkgId(pkg.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono-tech font-bold transition-all cursor-pointer ${
                  selectedPkgId === pkg.id
                    ? 'bg-amber-400 text-[#111d28] shadow-lg scale-105'
                    : 'bg-[#142332] text-slate-300 hover:bg-[#1b3852] border border-[#2b5b84]'
                }`}
              >
                {pkg.name}
              </button>
            ))}
          </div>

          {/* Active Package Showcase Box */}
          <div className="bg-[#142332] rounded-3xl p-6 sm:p-10 border-2 border-amber-400/60 shadow-2xl max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#2b5b84]">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-2xl font-bold text-white">{selectedPackage.name}</h4>
                  {selectedPackage.isPopular && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech font-extrabold bg-emerald-500 text-slate-950">
                      MÁS RECOMENDADO
                    </span>
                  )}
                </div>
                <p className="text-xs font-mono-tech text-amber-400">{selectedPackage.tagline}</p>
              </div>

              <button
                onClick={() => onSelectServiceForQuote(`Paquete Corplex Commerce: ${selectedPackage.name}`)}
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#111d28] font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <span>Cotizar {selectedPackage.name}</span>
                <ArrowRight className="w-4 h-4 text-[#111d28]" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-xs">
              <div>
                <span className="text-amber-400 font-bold block mb-1 font-mono-tech">Alcance de Implementación:</span>
                <p className="text-slate-300 leading-relaxed mb-4">{selectedPackage.scope}</p>

                <span className="text-cyan-400 font-bold block mb-1 font-mono-tech">Cliente Ideal:</span>
                <p className="text-slate-300 leading-relaxed">{selectedPackage.targetClient}</p>
              </div>

              <div>
                <span className="text-slate-400 font-bold block mb-3 font-mono-tech uppercase">Funcionalidades Incluidas:</span>
                <div className="space-y-2">
                  {selectedPackage.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
