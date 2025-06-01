// src/components/HowItWorks.tsx
import React from 'react'
import { Mail, Send, Instagram } from 'lucide-react'

export const HowItWorks = () => {
  return (
    <section className="relative w-full h-screen bg-[#E6EBEE] overflow-hidden flex items-center justify-center">

      {/* Main copy block */}
      <div className="relative max-w-3xl px-6 text-left">
        {/* Paragraph copy */}
        <p className="text-2xl text-[#CBD1D6] leading-relaxed">
          <span className="text-[#CBD1D6] font-semibold">SKULPT</span> is a branding studio for early-stage founders who
          would rather be understood than positioned.
          <br />
          Skulpting helps reconnect founders, team members, and audiences to a long-lasting brand built with intention.
        </p>

        {/* Co-founder names */}
        <div className="mt-8">
          <p className="text-base text-[#B0BDC5]">Freya Lindqvist, Co-Founder</p>
          <p className="text-base text-[#B0BDC5]">Lucia Jueguen, Co-Founder</p>
        </div>

        {/* “Let’s talk!” behind everything */}
        <div className="mt-20 relative">
          <h1 className="text-[6rem] font-bold text-gray-100 opacity-20 select-none">
            Let’s talk!
          </h1>

          {/* Icon row */}
          <div className="absolute inset-x-0 top-[55%] flex justify-center space-x-6">
            <Mail className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
            <Send className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
            <Instagram className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </section>
  )
}
