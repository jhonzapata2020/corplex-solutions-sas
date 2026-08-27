import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AcademicCapabilities } from './components/AcademicCapabilities';
import { ServicesGrid } from './components/ServicesGrid';
import { CloudArchitecture } from './components/CloudArchitecture';
import { Methodology } from './components/Methodology';
import { LegalCompliance } from './components/LegalCompliance';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';

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
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-white font-sans antialiased">
      
      {/* Fixed Navbar */}
      <Navbar onOpenQuoteModal={() => handleOpenQuoteModal()} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* Educational & UNAD Section */}
        <AcademicCapabilities />

        {/* Services & Solutions Catalog */}
        <ServicesGrid onSelectServiceForQuote={(title) => handleOpenQuoteModal(title)} />

        {/* AWS Cloud Architecture Visualizer */}
        <CloudArchitecture />

        {/* Engineering Methodology Timeline */}
        <Methodology />

        {/* Legal Transparency & Compliance Datasheet */}
        <LegalCompliance />

        {/* Contact Form & Direct Channels */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuoteModal}
        preSelectedService={selectedServiceTitle}
      />

    </div>
  );
}

export default App;
