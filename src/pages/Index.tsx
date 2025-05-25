
import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { Portfolio } from '../components/Portfolio';
import { JoinMovement } from '../components/JoinMovement';
import { Footer } from '../components/Footer';
import { Hero2 } from '../components/hero2';

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = ['hero', 'how-it-works', 'portfolio', 'join-movement', 'hero2'];
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;
      
      setIsScrolling(true);
      
      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        setCurrentSection(prev => prev + 1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        setCurrentSection(prev => prev - 1);
      }
      
      setTimeout(() => setIsScrolling(false), 1000);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSection, sections.length, isScrolling]);

  const renderSection = (index: number) => {
    const isActive = index === currentSection;
    const sectionComponents = [
      <Hero2 />,
      <Hero />,
      <HowItWorks />,
      <Portfolio />,
      <>
        <JoinMovement />
      </>,
    ];

    return (
      <div
        key={index}
        className={`absolute inset-0 w-screen h-screen overflow-hidden transition-all duration-1000 ease-out ${
          isActive 
            ? 'opacity-100 blur-none z-20' 
            : 'opacity-0 blur-md z-10 pointer-events-none'
        }`}
      >
        <div className="w-full h-full overflow-y-auto">
          {sectionComponents[index]}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-blue-50 overflow-hidden">
      <Navbar />
      
      {/* Stacked Sections with Blur Transitions */}
      <div className="relative h-screen">
        {sections.map((_, index) => renderSection(index))}
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
