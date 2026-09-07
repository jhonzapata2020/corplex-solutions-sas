import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { QuoteModal } from '../components/QuoteModal';
import { ScrollToTop } from '../components/ScrollToTop';
import { AgentOperationsCenter } from '../components/AgentOperationsCenter';

export const ControlRoomPage: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOpenQuoteModal = (title?: string) => {
    setSelectedServiceTitle(title);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedServiceTitle(undefined);
  };

  return (
    <div className="min-h-screen bg-[#070e17] text-slate-100 font-tech selection:bg-[#ffd343] selection:text-black flex flex-col">
      {/* Navigation Header */}
      <Navbar onOpenQuoteModal={() => handleOpenQuoteModal()} />

      {/* Direct Workstation Execution Layout */}
      <main className="flex-1 bg-[#070e17]">
        <AgentOperationsCenter
          isPage={true}
          onOpenQuoteModal={handleOpenQuoteModal}
        />
      </main>

      {/* Footer Component */}
      <Footer />

      {/* Floating Scroll-To-Top Button */}
      <ScrollToTop />

      {/* Interactive Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuoteModal}
        preSelectedService={selectedServiceTitle}
      />
    </div>
  );
};

export default ControlRoomPage;
