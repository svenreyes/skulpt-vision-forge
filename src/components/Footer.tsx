
import React from 'react';

export const Footer = () => {
  const footerSections = [
    {
      title: "Services",
      links: ["Brand Strategy", "Visual Identity", "Digital Design", "Marketing Systems"]
    },
    {
      title: "Company", 
      links: ["About", "Team", "Careers", "Press"]
    },
    {
      title: "Resources",
      links: ["Case Studies", "Blog", "Founder Guide", "Brand Toolkit"]
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Equity Terms", "Contact"]
    }
  ];

  return (
    <footer className="relative border-t border-blue-200/10">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-200/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        {/* Top Section */}
        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="text-3xl font-bold tracking-tight mb-4 text-blue-50">
              SKULPT
            </div>
            <p className="text-blue-200/80 text-sm leading-relaxed">
              Sculpting the future of startup branding through strategic equity partnerships.
            </p>
          </div>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-blue-100 mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-blue-200/80 hover:text-blue-100 transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center pt-8 border-t border-blue-200/10">
          <div className="text-sm text-blue-300/70 mb-4 lg:mb-0">
            © 2024 SKULPT. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            {['Twitter', 'LinkedIn', 'Instagram', 'Dribbble'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm text-blue-200/80 hover:text-blue-100 transition-colors duration-300"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
