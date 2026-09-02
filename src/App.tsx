import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AIAutomationSection } from './components/AIAutomationSection';
import { AcademicCapabilities } from './components/AcademicCapabilities';
import { ServicesGrid } from './components/ServicesGrid';
import { CloudArchitecture } from './components/CloudArchitecture';
import { Methodology } from './components/Methodology';
import { LegalCompliance } from './components/LegalCompliance';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { ScrollToTop } from './components/ScrollToTop';

// Admin CRM Module Imports
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLeads } from './components/admin/AdminLeads';
import { AdminNotifications } from './components/admin/AdminNotifications';

function PublicSite() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | undefined>(undefined);

  const handleOpenQuoteModal = (serviceTitle?: string) => {
    setSelectedServiceTitle(serviceTitle);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedServiceTitle(undefined);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#ffd343] selection:text-black font-sans antialiased">
      {/* Main Platform (Direct Load) */}
      <div className="animate-in fade-in duration-700">
        {/* Header & Navigation */}
        <Navbar onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* Main Content Sections */}
        <main>
          {/* Hero Section */}
          <Hero onOpenQuoteModal={() => handleOpenQuoteModal()} />

          {/* Flagship Commercial Unit: Corplex AI Automation */}
          <AIAutomationSection onOpenQuoteModal={(title) => handleOpenQuoteModal(title)} />

          {/* Educational & UNAD Section */}
          <AcademicCapabilities />

          {/* Services Catalog Bento Grid */}
          <ServicesGrid onSelectServiceForQuote={(title) => handleOpenQuoteModal(title)} />

          {/* AWS Cloud Architecture Visualizer */}
          <CloudArchitecture />

          {/* Engineering Methodology Timeline */}
          <Methodology />

          {/* Legal Transparency Datasheet */}
          <LegalCompliance />

          {/* Contact Form */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Scroll-To-Top Button */}
        <ScrollToTop />
      </div>

      {/* Interactive Quote Modal */}
      <QuoteModal
        key={selectedServiceTitle || 'default-quote-modal'}
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuoteModal}
        preSelectedService={selectedServiceTitle}
      />
    </div>
  );
}

export function App() {
  return (
    <Routes>
      {/* Ruta Pública Principal (Sitio Institucional) */}
      <Route path="/" element={<PublicSite />} />

      {/* Acceso Administrativo (Login) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Rutas Administrativas Protegidas */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="leads" element={<AdminLeads />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>

      {/* Fallback a la web pública */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
