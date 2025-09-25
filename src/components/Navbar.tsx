// src/components/Navbar.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRouteBlur } from "@/components/RouteBlurTransition";
import SKULPTLogo from "../assets/SKULPT-wordmark.svg";
import HamburgerIcon from "../assets/hamburger.svg";
import CloseIcon from "../assets/ex.svg";

type NavbarProps = { flat?: boolean };
export const Navbar: React.FC<NavbarProps> = ({ flat = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const navigate = useNavigate();
  const { trigger } = useRouteBlur();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  type NavItemTo = { label: string; to: string };
  type NavItemHref = { label: string; href: string };
  const navItems: Array<NavItemTo | NavItemHref> = [
    { label: "[skulpting]", to: "/skulpting" },
    { label: "[skulpted]", to: "/skulpted" },
    { label: "[next]", to: "/contact" }
  ];
  const ariaByTo: Record<string, string> = {
    "/skulpting": "About SKULPT",
    "/skulpted": "Portfolio: our work",
    "/contact": "Contact us",
  };

  return (
    <nav
      className={`
        fixed inset-x-0 top-0 z-50
        transition-all duration-500
        ${flat ? "bg-transparent" : isScrolled ? "bg-black/5 backdrop-blur-sm" : "bg-transparent"}
      `}
      style={{ height: "calc(4rem + env(safe-area-inset-top))" }}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 pt-6 lg:px-8">
        {/* Logo - Left (clickable to home) */}
        <div className="flex-1">
          <button
            onClick={async () => { await trigger({ before: 180, after: 180 }); navigate("/"); }}
            className="flex items-center gap-2 font-nersans-two text-[#3F4851] text-2xl"
            aria-label="Go to home"
          >
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
          </button>
        </div>

        {/* Center Navigation */}
        <div className="flex-1 flex justify-center">
          <div className="hidden lg:flex items-center space-x-8">
            {navItems
              .slice(0, 2)
              .map((item) => (
                'to' in item ? (
                  <button
                    key={item.to}
                    onClick={async () => { await trigger({ before: 180, after: 180 }); navigate(item.to); }}
                    className="relative font-subheading text-[0.99rem] tracking-wider text-[#9EA5AD] hover:text-[#9EA5AD] focus:text-[#9EA5AD] transition-all duration-300 hover:blur-0 focus:blur-0.2 blur-[1px]"
                    aria-label={`${item.label} — ${ariaByTo[item.to] || 'Navigate'}`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="relative font-subheading text-[0.99rem] tracking-wider text-[#9EA5AD] hover:text-[#9EA5AD] focus:text-[#9EA5AD] transition-all duration-300 hover:blur-0 focus:blur-0.2 blur-[1px]"
                    aria-label={`${item.label} — External link`}
                  >
                    {item.label}
                  </a>
                )
              ))}
          </div>
        </div>

        {/* Next Button - Right */}
        <div className="flex-1 flex justify-end">
          <div className="hidden lg:block">
            {('to' in navItems[2]) ? (
              <button
                onClick={async () => { await trigger({ before: 180, after: 180 }); navigate((navItems[2] as { to: string }).to); }}
                className="relative font-subheading text-[0.99rem] tracking-wider text-[#9EA5AD] hover:text-[#9EA5AD] focus:text-[#9EA5AD] transition-all duration-300 hover:blur-0 focus:blur-0.2 blur-[1px]"
                aria-label={`${navItems[2].label} — ${ariaByTo[(navItems[2] as { to: string }).to] || 'Navigate'}`}
              >
                {navItems[2].label}
              </button>
            ) : (
              <a
                href={(navItems[2] as { href: string }).href}
                className="relative font-subheading text-[0.99rem] tracking-wider text-[#9EA5AD] hover:text-[#9EA5AD] focus:text-[#9EA5AD] transition-all duration-300 hover:blur-0 focus:blur-0.2 blur-[1px]"
                aria-label={`${navItems[2].label} — External link`}
              >
                {navItems[2].label}
              </a>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobile(!mobile)}
          className="lg:hidden text-[#3F4851] p-2"
          aria-label="Toggle menu"
        >
          <img 
            src={mobile ? CloseIcon : HamburgerIcon} 
            alt={mobile ? "Close menu" : "Open menu"} 
            className="w-6 h-6" 
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobile && (
        <div className="lg:hidden absolute top-full left-0 w-full">
          <div className="p-6 space-y-3">
            {navItems.map((item) => (
              ('to' in item) ? (
                <button
                  key={item.to}
                  onClick={async () => { setMobile(false); await trigger({ before: 180, after: 180 }); navigate(item.to); }}
                  className="w-full text-left rounded-xl border border-white/30 bg-white/20 backdrop-blur-lg px-4 py-3"
                >
                  <span className="font-subheading text-[#9EA5AD]">{item.label}</span>
                </button>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobile(false)}
                  className="block w-full rounded-xl border border-white/30 bg-white/20 backdrop-blur-lg px-4 py-3"
                >
                  <span className="font-subheading text-[#9EA5AD]">{item.label}</span>
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
