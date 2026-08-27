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
import { SplashIntro } from './components/SplashIntro';
import { ScrollToTop } from './components/ScrollToTop';

export function App() {
  const [isEntered, setIsEntered] = useState<boolean>(() => {
    return sessionStorage.getItem('corplex_entered') === 'true';
  });

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | undefined>(undefined);

  const handleEnter = () => {
    sessionStorage.setItem('corplex_entered', 'true');
    setIsEntered(true);
  };

  const handleOpenQuoteModal = (serviceTitle?: string) => {
    setSelectedServiceTitle(serviceTitle);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedServiceTitle(undefined);
  };

  return (
    <div className="min-h-screen bg-[#1b3852] text-slate-100 selection:bg-[#ffd343] selection:text-black font-sans antialiased">
      
      {/* Interactive System Boot Splash Screen */}
      <SplashIntro
        isOpen={!isEntered}
        onEnter={handleEnter}
      />

      {/* Main Platform (Navbar & Body revealed upon entry) */}
      {isEntered && (
        <div className="animate-in fade-in duration-700">
          {/* Python.org Style Header & Navigation */}
          <Navbar onOpenQuoteModal={() => handleOpenQuoteModal()} />

          {/* Main Content Sections */}
          <main>
            {/* Hero Section Python.org Style */}
            <Hero onOpenQuoteModal={() => handleOpenQuoteModal()} />

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

            {/* Contact Form & Direct Channels */}
            <ContactSection />
          </main>

          {/* Footer Python.org Style */}
          <Footer />

          {/* Floating Scroll-To-Top Button */}
          <ScrollToTop />
        </div>
      )}

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
