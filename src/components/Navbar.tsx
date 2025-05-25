import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['How it Works', 'Portfolio', 'About', 'Contact'];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'backdrop-blur-md bg-black/10 border-b border-blue-200/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
            <div className="text-2xl lg:text-3xl font-bold tracking-normal text-blue-50 font-nersans-two">
            <img src="./skulptlogo.png" alt="Logo" className="h-8 lg:h-10 inline-block mr-2" />
            SKULPT
            </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="relative group text-sm font-medium text-blue-200/60 blur-sm opacity-90 hover:text-blue-50 hover:blur-none hover:opacity-100 transition-all duration-300 font-nersans-two"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <button className="px-6 py-2 bg-blue-200/10 backdrop-blur-sm border border-blue-200/20 rounded-full text-sm font-medium text-blue-100 hover:bg-blue-200/20 transition-all duration-300 font-nersans-two">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-blue-100"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full backdrop-blur-xl bg-black/90 border-b border-blue-200/10">
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="block text-sm font-medium text-blue-200 hover:text-blue-50 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className="w-full px-6 py-2 bg-blue-200/10 backdrop-blur-sm border border-blue-200/20 rounded-full text-sm font-medium text-blue-100 hover:bg-blue-200/20 transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
