
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 10,
            top: mousePosition.y / 10,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gray-500/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
        {/* Main Headline */}
        <div className="mb-8">
          <h1 className="text-6xl lg:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            We invest in your
          </h1>
          <h1 className="text-6xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">brand,</span>
          </h1>
          <h1 className="text-6xl lg:text-8xl font-bold tracking-tight">
            <span className="text-gray-500">not your wallet</span>
          </h1>
        </div>

        {/* Subheadline */}
        <p className="text-xl lg:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          SKULPT partners with visionary startups to craft premium brands through sweat equity. 
          Your vision, our expertise, shared success.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-gray-200 transition-all duration-300 flex items-center gap-3 min-w-[200px]">
            Start Skulpting
            <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
          </button>
          <button className="px-8 py-4 bg-transparent border border-white/30 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 min-w-[200px]">
            View Our Work
          </button>
        </div>

        {/* Floating Glass Card */}
        <div className="mt-20 mx-auto max-w-2xl">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500">
            <p className="text-lg text-gray-300 leading-relaxed">
              "SKULPT transformed our startup vision into a brand that secured $2M in Series A funding. 
              Their equity partnership model made world-class branding accessible."
            </p>
            <div className="mt-4 text-sm text-gray-500">
              — Sarah Chen, Founder of NeuralFlow
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};
