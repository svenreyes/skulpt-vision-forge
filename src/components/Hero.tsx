
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-28">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 bg-blue-200/5 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 10,
            top: mousePosition.y / 10,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-300/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-200/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
        {/* Main Headline */}
        <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-normal text-center">
          We invest in your <br />
          <span className="text-blue-200">brand,</span> <br />
          <span className="text-blue-300">not your wallet</span>
        </h1>
        </div>

        {/* Subheadline */}
        <p className="text-xl lg:text-2xl text-blue-200/80 mb-12 max-w-3xl mx-auto leading-relaxed">
          SKULPT partners with visionary startups to craft premium brands through sweat equity. 
          Your vision, our expertise, shared success.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group px-8 py-4 bg-blue-50 text-black rounded-full font-semibold text-lg hover:bg-blue-100 transition-all duration-300 flex items-center gap-3 min-w-[200px]">
            Start Skulpting
            <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
          </button>
          <button className="px-8 py-4 bg-transparent border border-blue-200/30 rounded-full font-semibold text-lg text-blue-100 hover:bg-blue-200/10 transition-all duration-300 min-w-[200px]">
            View Our Work
          </button>
        </div>

        {/* Floating Glass Card */}
        <div className="mt-20 mx-auto max-w-2xl">
          <div className="backdrop-blur-xl bg-blue-200/5 border border-blue-200/10 rounded-2xl p-8 hover:bg-blue-200/10 transition-all duration-500">
            <p className="text-lg text-blue-100/90 leading-relaxed">
              "SKULPT transformed our startup vision into a brand that secured $2M in Series A funding. 
              Their equity partnership model made world-class branding accessible."
            </p>
            <div className="mt-4 text-sm text-blue-300/70">
              — Freya, Founder of SKULPT
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8">
        <div className="w-6 h-10 border-2 border-blue-200/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-200/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};
