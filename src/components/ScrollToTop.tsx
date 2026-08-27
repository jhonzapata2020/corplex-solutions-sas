import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
      <button
        onClick={scrollToTop}
        className={`p-3.5 rounded-full bg-[#111d28]/90 hover:bg-[#1b3852] text-[#ffd343] border border-[#ffd343]/60 shadow-2xl shadow-black/80 transition-all duration-300 transform active:scale-90 flex items-center justify-center group cursor-pointer backdrop-blur-md ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90 pointer-events-none'
        }`}
        title="Volver arriba"
        aria-label="Volver arriba"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform stroke-[2.5]" />
      </button>
    </div>
  );
};
