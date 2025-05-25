
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const JoinMovement = () => {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="h-auto lg:h-screen flex items-center pt-10 lg:pt-0 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300/10 rounded-full blur-2xl" />
        <div className="absolute top-0 right-1/3 w-64 h-64 bg-blue-200/5 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '8s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full py-20">
        {/* Main Content */}
        <div className="text-center">
          {/* Headline */}
          <h1 className="text-4xl lg:text-6xl font-bold tracking-normal mb-6">
            Join the
            <br />
            <span className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 bg-clip-text text-transparent">
              Movement
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg lg:text-xl text-blue-200/80 mb-8 max-w-4xl mx-auto leading-relaxed">
            Ready to transform your startup into a premium brand without the premium price tag? 
            Let's sculpt something extraordinary together.
          </p>

          {/* Email Signup Form */}
          <div className="max-w-md mx-auto mb-10">
            <div 
              className="backdrop-blur-xl bg-blue-200/5 border border-blue-200/10 rounded-full p-2 hover:bg-blue-200/10 transition-all duration-500 flex"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent px-6 py-3 text-blue-50 placeholder-blue-200/60 focus:outline-none"
              />
              <button 
                className="px-6 py-3 bg-blue-50 text-black rounded-full font-semibold hover:bg-blue-100 transition-all duration-300 flex items-center gap-2"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="backdrop-blur-xl bg-blue-200/5 border border-blue-200/10 rounded-2xl p-6 hover:bg-blue-200/10 transition-all duration-500">
              <div className="text-3xl font-bold mb-2 text-blue-50">50+</div>
              <div className="text-blue-200/80">Brands Sculpted</div>
            </div>
            <div className="backdrop-blur-xl bg-blue-200/5 border border-blue-200/10 rounded-2xl p-6 hover:bg-blue-200/10 transition-all duration-500">
              <div className="text-3xl font-bold mb-2 text-blue-50">$200M+</div>
              <div className="text-blue-200/80">Raised by Partners</div>
            </div>
            <div className="backdrop-blur-xl bg-blue-200/5 border border-blue-200/10 rounded-2xl p-6 hover:bg-blue-200/10 transition-all duration-500">
              <div className="text-3xl font-bold mb-2 text-blue-50">95%</div>
              <div className="text-blue-200/80">Success Rate</div>
            </div>
          </div>

          {/* Alternative CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button className="px-6 py-3 bg-transparent border border-blue-200/30 rounded-full font-semibold text-base text-blue-100 hover:bg-blue-200/10 transition-all duration-300">
              Schedule a Call
            </button>
            <button className="px-6 py-3 bg-transparent border border-blue-200/30 rounded-full font-semibold text-base text-blue-100 hover:bg-blue-200/10 transition-all duration-300">
              Download Our Deck
            </button>
          </div>

          {/* Fine Print */}
          <p className="text-sm text-blue-300/70 max-w-2xl mx-auto">
            We're selective. We partner with startups that share our vision for exceptional design and 
            sustainable growth. Applications are reviewed weekly.
          </p>
        </div>
      </div>
    </section>
  );
};
