
import React from 'react';

export const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Apply & Connect",
      description: "Submit your startup for review. We evaluate potential, vision, and cultural fit through our comprehensive vetting process."
    },
    {
      number: "02", 
      title: "Equity Partnership",
      description: "We agree on equity terms that reflect the value we'll bring. No upfront costs, just shared success and aligned incentives."
    },
    {
      number: "03",
      title: "Brand Sculpting",
      description: "Our team crafts your complete brand identity—from strategy and design to digital presence and marketing systems."
    },
    {
      number: "04",
      title: "Launch & Scale",
      description: "Go to market with a premium brand that attracts customers, investors, and top talent. We continue supporting your growth."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gray-500/10 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            How Skulpting
            <br />
            <span className="text-gray-500">Works</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our proven process transforms ambitious startups into premium brands through strategic equity partnerships.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="group relative"
            >
              {/* Glass Card */}
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10 hover:bg-white/10 transition-all duration-500 h-full">
                {/* Step Number */}
                <div className="text-6xl lg:text-7xl font-bold text-gray-700 mb-4 group-hover:text-gray-600 transition-colors duration-300">
                  {step.number}
                </div>
                
                {/* Step Title */}
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-gray-200 transition-colors duration-300">
                  {step.title}
                </h3>
                
                {/* Step Description */}
                <p className="text-lg text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {step.description}
                </p>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-white to-gray-400 group-hover:w-full transition-all duration-500" />
              </div>

              {/* Connection Line for Desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-white/30 to-transparent transform -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300">
            Ready to Start Your Journey?
          </button>
        </div>
      </div>
    </section>
  );
};
