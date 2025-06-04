// src/components/Navbar.tsx
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobile, setMobile]   = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <div className="flex items-center gap-2 font-nersans-two text-blue-50 text-2xl">
          <img src="/skulptlogo.png" alt="Logo" className="h-6 lg:h-10" />
          SKULPT
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
        >
          {mobile ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ─── mobile drawer (optional, unchanged) ─── */}
      {mobile && (
        <div className="lg:hidden absolute top-full left-0 w-full
                        backdrop-blur-xl border-b border-[#CBD1D6]">
          <div className="space-y-4 p-6">

            <a
              href="#how-it-works"
              onClick={() => setMobile(false)}
              className="block w-full text-center px-6 py-2 rounded-full
                         bg-[#CBD1D6] border border-[#CBD1D6]
                         text-sm font-nersans-two text-[#E6EBEE]
                         backdrop-blur-sm hover:bg-blue-200/20
                         transition-all duration-300"
            >
              MAKE IT MAKE SENSE
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
