import React, { useState } from 'react';
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

export function App() {
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
        {/* Python.org Style Header & Navigation */}
        <Navbar onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* Main Content Sections */}
        <main>
          {/* Hero Section Python.org Style */}
          <Hero onOpenQuoteModal={() => handleOpenQuoteModal()} />

          {/* Flagship Commercial Unit: Corplex AI Automation */}
          <AIAutomationSection onOpenQuoteModal={(title) => handleOpenQuoteModal(title)} />

          {/* Educational & UNAD Section */}
          <AcademicCapabilities />

          {/* Services & Solutions Catalog Bento Grid */}
          <ServicesGrid onSelectServiceForQuote={(title) => handleOpenQuoteModal(title)} />

          {/* AWS Cloud Architecture Visualizer */}
          <CloudArchitecture />

          {/* Engineering Methodology Timeline */}
          <Methodology />

          {/* Legal Transparency & Compliance Datasheet */}
          <LegalCompliance />

          {/* Contact Form & Direct Channels (Python PSF Banner Style) */}
          <ContactSection />
        </main>

        {/* Footer Python.org Style */}
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

export default App;
