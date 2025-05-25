import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const Portfolio = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      name: "NeuralFlow",
      category: "AI Platform",
      description:
        "Brand strategy and visual identity for an AI-powered workflow automation platform",
      metrics: "$2M Series A • 10x user growth",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    },
    {
      name: "EcoVault",
      category: "Fintech",
      description:
        "Complete rebrand for sustainable investment platform targeting Gen Z investors",
      metrics: "50K+ users • Featured in TechCrunch",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
    },
    {
      name: "Mindful",
      category: "Wellness Tech",
      description:
        "Brand identity and digital experience for mental health platform",
      metrics: "1M+ downloads • Apple Design Award",
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
    },
    {
      name: "CodeFlow",
      category: "Developer Tools",
      description:
        "Visual identity and product design for collaborative coding platform",
      metrics: "100K+ developers • $5M valuation",
      image:
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop",
    },
  ];

  return (
    <section className="w-full h-auto lg:h-screen flex items-center py-20 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden md:block absolute top-0 right-1/4 w-72 h-72 bg-blue-200/5 rounded-full blur-3xl" />
        <div className="hidden md:block absolute bottom-1/3 left-0 w-64 h-64 bg-blue-300/10 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-normal mb-4 text-blue-50 font-display">
            Our<br />
            <span className="text-blue-300/70 font-display">Portfolio</span>
          </h2>
          <p className="text-base sm:text-lg text-blue-200/80 max-w-2xl mx-auto">
            Brands we've sculpted from vision to venture-backed success stories.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <div
              key={project.name}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              onMouseEnter={() => setHoveredProject(idx)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Image */}
              <div className="aspect-[7/3] bg-gray-800 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="text-sm font-medium text-blue-200/80 mb-1">
                  {project.category}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-blue-50 group-hover:text-blue-100 transition-colors duration-300">
                  {project.name}
                </h3>
                <p className="text-sm sm:text-base text-blue-200/80 mb-3 leading-relaxed">
                  {project.description}
                </p>
                <div className="text-xs text-blue-300/70 mb-3">
                  {project.metrics}
                </div>
                <div
                  className={`flex items-center gap-2 text-blue-100 font-medium text-sm transition-all duration-300 ${
                    hoveredProject === idx
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-4 opacity-0"
                  }`}
                >
                  View Case Study
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Glass Effect on Hover */}
              <div
                className={`absolute inset-0 backdrop-blur-sm bg-blue-200/5 transition-opacity duration-500 ${
                  hoveredProject === idx ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button className="inline-flex items-center gap-3 px-6 py-3 bg-transparent border border-blue-200/30 rounded-full font-semibold text-base text-blue-100 hover:bg-blue-200/10 transition duration-300">
            View All Projects
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
