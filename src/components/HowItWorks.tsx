
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
    <section className="pt-[env(safe-area-inset-top)] w-full h-auto lg:h-screen flex items-center pt-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-200/5 rounded-full blur-3xl transform -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300/10 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-20">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-normal mb-4 text-blue-50 font-nersans-two">
            How Skulpting
            <br />
            <span className="text-blue-300/70">Works</span>
          </h2>
          <p className="text-lg text-blue-200/80 max-w-3xl mx-auto">
            Our proven process transforms ambitious startups into premium brands through strategic equity partnerships.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="group relative"
            >
              {/* Glass Card */}
              <div className="backdrop-blur-xl bg-blue-200/5 border border-blue-200/10 rounded-2xl p-6 lg:p-8 hover:bg-blue-200/10 transition-all duration-500 h-full">
                {/* Step Number */}
                <div className="text-4xl lg:text-3xl font-bold text-blue-400/30 mb-3 group-hover:text-blue-300/50 transition-colors duration-300">
                  {step.number}
                </div>
                
                {/* Step Title */}
                <h3 className="text-xl lg:text-2xl font-bold mb-3 text-blue-50 group-hover:text-blue-100 transition-colors duration-300">
                  {step.title}
                </h3>
                
                {/* Step Description */}
                <p className="text-base text-blue-200/80 leading-relaxed group-hover:text-blue-100/90 transition-colors duration-300">
                  {step.description}
                </p>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-200 to-blue-300 group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-blue-200/10 backdrop-blur-sm border border-blue-200/20 rounded-full font-semibold text-base text-blue-100 hover:bg-blue-200/20 transition-all duration-300">
            Ready to Start Your Journey?
          </button>
        </div>
      </div>
    </section>
  );
};
