// src/components/HowItWorks.tsx
import React from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import { CloudyBackground } from './CloudyBackground';

export const HowItWorks = () => {
  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 w-full h-full z-0">
        <CloudyBackground />
      </div>
      <section className="relative w-full h-full bg-[#E6EBEE]/80 overflow-hidden flex items-center justify-center">

      <div className="relative max-w-3xl px-6 text-center">
        {/* Main copy block */}
        <p className="text-xl md:text-3xl text-[#C1CFD4] leading-relaxed font-subheading">
          <span className="font-nersans-two font-bold">SKULPT</span> is a branding studio for early-stage startups who
          would rather be understood than positioned.
          <br />
          Skulpting helps reconnect founders, team members, and audiences to a long-lasting brand built with intention.
        </p>

        <div className="mt-20 relative">
          <h1 className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 text-[4rem] md:text-[6rem] font-body text-[#CBD1D6] opacity-20 select-none">
            In Alignment
          </h1>

          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-center space-x-6">
            <a href="mailto:contact@skulptbrand.com">
              <Mail className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/company/skulptbrand/about/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
            </a>
            <a
              href="https://www.instagram.com/skulptbrand/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};
