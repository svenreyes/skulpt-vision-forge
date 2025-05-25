
import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { Portfolio } from '../components/Portfolio';
import { JoinMovement } from '../components/JoinMovement';
import { Footer } from '../components/Footer';

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = ['hero', 'how-it-works', 'portfolio', 'join-movement'];

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        setCurrentSection(prev => prev + 1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        setCurrentSection(prev => prev - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSection, sections.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-blue-50 overflow-hidden">
      <Navbar />
      
      {/* Horizontal Scrolling Container */}
      <div 
        className="flex h-screen transition-transform duration-1000 ease-out"
        style={{ 
          transform: `translateX(-${currentSection * 100}vw)`,
          width: `${sections.length * 100}vw`
        }}
      >
        {/* Hero Section */}
        <div id="hero" className="w-screen h-screen flex-shrink-0">
          <Hero />
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="w-screen h-screen flex-shrink-0 overflow-y-auto">
          <HowItWorks />
        </div>

        {/* Portfolio Section */}
        <div id="portfolio" className="w-screen h-screen flex-shrink-0 overflow-y-auto">
          <Portfolio />
        </div>

        {/* Join Movement Section */}
        <div id="join-movement" className="w-screen h-screen flex-shrink-0 overflow-y-auto">
          <JoinMovement />
          <Footer />
        </div>
      </div>

      {/* Section Indicators */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex space-x-3">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSection 
                ? 'bg-blue-200 scale-125' 
                : 'bg-blue-200/30 hover:bg-blue-200/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
