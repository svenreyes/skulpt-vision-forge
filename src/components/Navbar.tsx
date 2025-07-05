// src/components/Navbar.tsx
import React, { useState, useEffect } from "react";
import SKULPTLogo from "../assets/SKULPT-wordmark.svg";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "[skulpting]", href: "#skulpting" },
    { label: "[skulpted]", href: "#skulpted" },
    { label: "[circle]", href: "#circle" },
    { label: "[next]", href: "#next" }
  ];

  return (
    <nav
      className={`
        fixed inset-x-0 top-0 z-50
        transition-all duration-500
        ${isScrolled ? "bg-black/5 backdrop-blur-sm" : "bg-transparent"}
      `}
      style={{ height: "calc(4rem + env(safe-area-inset-top))" }}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 lg:px-8">
        {/* Logo - Left */}
        <div className="flex-1">
          <div className="flex items-center gap-2 font-nersans-two text-[#3F4851] text-2xl">
            <div className="relative">
              <div 
                className="absolute inset-0"
                style={{
                  filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1)) drop-shadow(-2px -2px 4px rgba(255, 255, 255, 0.7))',
                }}
              >
                <img 
                  src={SKULPTLogo} 
                  alt="SKULPT" 
                  className="h-7 w-auto"
                  style={{
                    filter: 'brightness(0) invert(1)',
                    height: '28px',
                    width: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <img 
                src={SKULPTLogo} 
                alt="" 
                className="h-7 w-auto relative z-10"
                style={{
                  height: '28px',
                  width: 'auto',
                  objectFit: 'contain'
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Center Navigation */}
        <div className="flex-1 flex justify-center">
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.slice(0, 3).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative font-subheading text-sm tracking-wider text-[#9EA5AD] hover:text-[#3F4851] focus:text-[#3F4851] transition-all duration-300 hover:blur-0 focus:blur-0 blur-[1px]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Next Button - Right */}
        <div className="flex-1 flex justify-end">
          <div className="hidden lg:block">
            <a
              href={navItems[3].href}
              className="relative font-subheading text-sm tracking-wider text-[#9EA5AD] hover:text-[#3F4851] focus:text-[#3F4851] transition-all duration-300 hover:blur-0 focus:blur-0 blur-[1px]"
            >
              {navItems[3].label}
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobile(!mobile)}
          className="lg:hidden text-[#3F4851] p-2"
          aria-label="Toggle menu"
        >
          {mobile ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobile && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg">
          <div className="flex flex-col space-y-4 p-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobile(false)}
                className="font-subheading text-[#3F4851] hover:text-[#9EA5AD] transition-all duration-300 py-2 hover:blur-0 blur-[1px]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
