
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const JoinMovement = () => {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="join-the-movement" className="py-24 lg:py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gray-500/10 rounded-full blur-2xl" />
        <div className="absolute top-0 right-1/3 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '8s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Main Content */}
        <div className="text-center">
          {/* Headline */}
          <h2 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8">
            Join the
            <br />
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Movement
            </span>
          </h2>

          {/* Subheadline */}
          <p className="text-xl lg:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            Ready to transform your startup into a premium brand without the premium price tag? 
            Let's sculpt something extraordinary together.
          </p>

          {/* Email Signup Form */}
          <div className="max-w-md mx-auto mb-16">
            <div 
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full p-2 hover:bg-white/10 transition-all duration-500 flex"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent px-6 py-3 text-white placeholder-gray-400 focus:outline-none"
              />
              <button 
                className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
              >
                Apply Now
                <ArrowRight 
                  size={18} 
                  className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
                />
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-gray-400">Brands Sculpted</div>
            </div>
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500">
              <div className="text-4xl font-bold mb-2">$200M+</div>
              <div className="text-gray-400">Raised by Partners</div>
            </div>
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
          </div>

          {/* Alternative CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="px-8 py-4 bg-transparent border border-white/30 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300">
              Schedule a Call
            </button>
            <button className="px-8 py-4 bg-transparent border border-white/30 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300">
              Download Our Deck
            </button>
          </div>

          {/* Fine Print */}
          <p className="text-sm text-gray-500 mt-12 max-w-2xl mx-auto">
            We're selective. We partner with startups that share our vision for exceptional design and 
            sustainable growth. Applications are reviewed weekly.
          </p>
        </div>
      </div>
    </section>
  );
};
