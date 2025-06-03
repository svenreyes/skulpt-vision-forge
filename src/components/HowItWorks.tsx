// src/components/HowItWorks.tsx
import React from 'react'
import { Mail, Linkedin, Instagram } from 'lucide-react'

export const HowItWorks = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#E6EBEE] overflow-hidden flex items-center justify-center py-12 sm:py-0">

      {/* Main copy block */}
      <div className="relative max-w-3xl px-4 sm:px-6 text-left">
        {/* Paragraph copy */}
        <p className="text-2xl sm:text-3xl md:text-4xl text-[#C1CFD4] leading-relaxed font-subheading">
          <span className="text-[#C1CFD4] font-nersans-two">SKULPT</span> is a branding studio for early-stage founders who
          would rather be understood than positioned.
          <br className="hidden sm:block" />
          <span className="block mt-2 sm:mt-0">Skulpting helps reconnect founders, team members, and audiences to a long-lasting brand built with intention.</span>
        </p>

        {/* Co-founder names */}
        <div className="mt-6 sm:mt-8 font-body">
          <p className="text-sm sm:text-base text-[#CBD1D6]">
            <a
              href="https://www.linkedin.com/in/freya-lindqvist"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Freya Lindqvist, Co-Founder
            </a>
          </p>
          <p className="text-sm sm:text-base text-[#CBD1D6] mt-1">
            <a
              href="https://www.linkedin.com/in/lucia-jueguen"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Lucia Jueguen, Co-Founder
            </a>
          </p>
        </div>

        {/* "Let's talk!" behind everything */}
        <div className="mt-12 sm:mt-20 relative">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[6rem] font-body text-[#CBD1D6] opacity-20 select-none">
            Let's talk!
          </h1>

          {/* Icon row */}
          <div className="absolute inset-x-0 top-[55%] flex justify-center space-x-4 sm:space-x-6">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
            <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </section>
  )
}
