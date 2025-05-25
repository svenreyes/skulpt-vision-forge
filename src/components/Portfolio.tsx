
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const Portfolio = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      name: "NeuralFlow",
      category: "AI Platform",
      description: "Brand strategy and visual identity for an AI-powered workflow automation platform",
      metrics: "$2M Series A • 10x user growth",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop"
    },
    {
      name: "EcoVault", 
      category: "Fintech",
      description: "Complete rebrand for sustainable investment platform targeting Gen Z investors",
      metrics: "50K+ users • Featured in TechCrunch",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop"
    },
    {
      name: "Mindful",
      category: "Wellness Tech",
      description: "Brand identity and digital experience for mental health platform",
      metrics: "1M+ downloads • Apple Design Award",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop"
    },
    {
      name: "CodeFlow",
      category: "Developer Tools", 
      description: "Visual identity and product design for collaborative coding platform",
      metrics: "100K+ developers • $5M valuation",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop"
    }
  ];

  return (
    <section className="h-screen flex items-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-blue-300/10 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-20">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-blue-50">
            Our
            <br />
            <span className="text-blue-300/70">Portfolio</span>
          </h2>
          <p className="text-lg text-blue-200/80 max-w-3xl mx-auto">
            Brands we've sculpted from vision to venture-backed success stories.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="aspect-[4/3] overflow-hidden bg-gray-800">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                {/* Category */}
                <div className="text-sm font-medium text-blue-200/80 mb-1 opacity-80">
                  {project.category}
                </div>

                {/* Project Name */}
                <h3 className="text-2xl font-bold mb-2 text-blue-50 group-hover:text-blue-100 transition-colors duration-300">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="text-blue-200/80 mb-3 leading-relaxed text-sm">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="text-xs text-blue-300/70 mb-3">
                  {project.metrics}
                </div>

                {/* View Project Link */}
                <div className={`flex items-center gap-2 text-blue-100 font-medium transition-all duration-300 text-sm ${
                  hoveredProject === index ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}>
                  View Case Study
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Glass Effect on Hover */}
              <div className={`absolute inset-0 backdrop-blur-sm bg-blue-200/5 transition-all duration-500 ${
                hoveredProject === index ? 'opacity-100' : 'opacity-0'
              }`} />
            </div>
          ))}
        </div>

        {/* View All Projects */}
        <div className="text-center mt-8">
          <button className="group px-6 py-3 bg-transparent border border-blue-200/30 rounded-full font-semibold text-base text-blue-100 hover:bg-blue-200/10 transition-all duration-300 flex items-center gap-3 mx-auto">
            View All Projects
            <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
