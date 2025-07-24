import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { HowItWorks } from "../components/HowItWorks";
import { Hero2 } from "../components/hero2";

const Index = () => {
  const sections = ["hero2", "how-it-works"];
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndY(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (isScrolling) return;
    const threshold = 50;
    // If swipe distance exceeds threshold in either direction, advance to next section (toggle)
    if (Math.abs(touchEndY - touchStartY) > threshold) {
      setIsScrolling(true);
      setCurrentSection((prev) => (prev + 1) % sections.length);
      setTimeout(() => setIsScrolling(false), 800);
    }
  };

  // 1) On scroll wheel, move between panels
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;
      setIsScrolling(true);

      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        setCurrentSection((prev) => prev + 1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        setCurrentSection((prev) => prev - 1);
      }

      setTimeout(() => setIsScrolling(false), 800);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentSection, sections.length, isScrolling]);

  // 2) Whenever “currentSection” changes, update the URL hash:
  //    - If we’re on section 0 (“hero2”), remove the hash.
  //    - If we’re on section 1 (“how-it-works”), set the hash to “#how-it-works”.
  useEffect(() => {
    if (currentSection === 0) {
      history.replaceState(null, "", window.location.pathname);
    } else if (currentSection === 1) {
      history.replaceState(null, "", "#how-it-works");
    }
  }, [currentSection]);

  // 3) Watch for manual hash changes (e.g. user clicks the nav link or pastes a URL with "#how-it-works"):
  //    - If the hash becomes "#how-it-works", switch to panel 1.
  //    - If the hash is anything else (or cleared), switch back to panel 0.
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "how-it-works") {
        setCurrentSection(1);
      } else {
        setCurrentSection(0);
      }
    };

    window.addEventListener("hashchange", onHashChange);
    // Also check on mount:
    onHashChange();

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  // 4) Map each index to its component
  const sectionComponents = [
    <Hero2 key="hero2" />,
    <HowItWorks key="how-it-works" />,
  ];

  // 5) Render each “panel” stacked on top of each other.
  const renderSection = (index: number) => {
    const isActive = index === currentSection;
    return (
      <div
        key={index}
        className={`absolute inset-0 w-screen h-screen overflow-hidden transition-all duration-1000 ease-out ${
          isActive
            ? "opacity-100 blur-none z-20"
            : "opacity-0 blur-md z-10 pointer-events-none"
        }`}
      >
        <div className={`w-full h-full ${index === 0 ? 'overflow-hidden' : 'overflow-y-auto'}`}>
          {sectionComponents[index]}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-blue-50 overflow-hidden"
         onTouchStart={handleTouchStart}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}>
      <Navbar />

      {/* Stack both panels (Hero2, HowItWorks) */}
      <div className="relative h-screen">
        {sections.map((_, index) => renderSection(index))}
      </div>

      {/* Navigation Dots */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex space-x-3">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSection
                ? "bg-[#9EA5AD] scale-125"
                : "bg-[#CBD1D6] hover:bg-blue-200/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
