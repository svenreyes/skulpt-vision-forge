// src/components/Navbar.tsx
import React, { useState, useEffect } from "react";
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
        {/* Logo */}
        <div className="flex items-center gap-2 font-nersans-two text-[#3F4851] text-2xl">
          <span 
            className="font-bold text-[28px] leading-[130%] tracking-[-1.12px] text-[#ECF1F3]"
            style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(255, 255, 255, 0.7)'
            }}
          >
            SKULPT
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative font-subheading text-sm tracking-wider text-[#9EA5AD] hover:text-[#9EA5AD] transition-all duration-300 hover:blur-0 blur-[2px]"
            >
              {item.label}
            </a>
          ))}
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
