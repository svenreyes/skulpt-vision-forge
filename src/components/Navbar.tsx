// src/components/Navbar.tsx
import React, { useState, useEffect, useRef } from "react";
import { useSwipeable } from 'react-swipeable';
import logo from "../assets/skulptlogo.png";
import hamburgerIcon from "../assets/hamburger.svg";
import closeIcon from "../assets/ex.svg";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      const howItWorks = document.getElementById('how-it-works');
      if (howItWorks) {
        howItWorks.scrollIntoView({ behavior: 'smooth' });
        setMobile(false);
      }
    }
  };

  const navItems = ["[ about ]"];

  return (
    <nav
      className={`
        fixed inset-x-0 top-0 z-50
         transition-all duration-500
        ${isScrolled ? "bg-black/10 border-b border-blue-200/20" : "bg-transparent"}
      `}
      /* height = 4 rem + notch (safe-area) */
      style={{ height: "calc(4rem + env(safe-area-inset-top))" }}
    >
      <div
        className={`
          max-w-7xl mx-auto h-full flex items-center justify-between
          safe-px                        /* ← uses the helper from 2-B */
        `}
      >
        {/* ─── logo ─── */}
        <div className="flex items-center font-nersans-two text-blue-50 text-2xl">
          <img src={logo} alt="Logo" className="h-6 lg:h-10" />
          <span className="ml-2">SKULPT</span>
        </div>

        {/* ─── desktop nav ─── */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((label) => (
            <a
              key={label}
              href="#how-it-works"
              className="relative text-sm font-subheading font-medium
                         text-blue-200/60 blur-sm opacity-90
                         hover:text-blue-50 hover:blur-none hover:opacity-100
                         transition-all duration-300"
            >
              {label}
              <span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200
                           transition-all duration-300 group-hover:w-full"
              />
            </a>
          ))}

          {/* primary CTA */}
          <a
            href="#how-it-works"
            className="px-6 py-2 rounded-full bg-[#CBD1D6] border border-[#CBD1D6]
                       text-sm font-nersans-two font-medium text-[#E6EBEE]
                       backdrop-blur-sm transition-all duration-300
                       hover:bg-[#B0BDC5] hover:border-[#B0BDC5]"
          >
            MAKE IT MAKE SENSE
          </a>
        </div>

        {/* ─── burger ─── */}
        <button
          onClick={() => setMobile(!mobile)}
          className="lg:hidden text-blue-50 p-2"
          aria-label={mobile ? "Close menu" : "Open menu"}
        >
          <img 
            src={mobile ? closeIcon : hamburgerIcon} 
            alt="" 
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* Mobile menu with swipe functionality */}
      {mobile && (
        <div 
          ref={mobileMenuRef}
          className="lg:hidden absolute top-full left-0 w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="space-y-4 p-6">
            <a
              href="#how-it-works"
              onClick={() => setMobile(false)}
              className="group relative block w-full"
            >
              <div className="relative">
                {/* Glass overlay */}
                <div className="absolute inset-0">
                  {/* Background layer that changes color on active */}
                  <div className="absolute inset-0 bg-[#9EA5AD] opacity-0 group-active:opacity-100 transition-opacity duration-300 rounded-xl" />
                  
                  {/* Glass effect layer */}
                  <div 
                    className="absolute inset-0 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl transition-all duration-300"
                    style={{
                      background: 'radial-gradient(at 100% 0%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0) 100%)',
                      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.18)'
                    }}
                  >
                    {/* Animated gradient border */}
                    <div 
                      className="absolute inset-0 rounded-2xl p-px"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        animation: 'shimmer 8s linear infinite',
                        backgroundSize: '200% 200%'
                      }}
                    />
                  </div>
                </div>
                
                {/* Button content */}
                <div className="relative z-10 p-4 text-center">
                  <span className="font-nersans-two text-[#9EA5AD] group-hover:text-[#9EA5AD] group-active:text-white transition-colors duration-300 text-sm font-medium">
                    MAKE IT MAKE SENSE
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
