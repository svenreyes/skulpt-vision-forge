// components/Footer.jsx
import React from "react";
import { Instagram, Link as LinkIcon, Mail } from "lucide-react";

export const Footer = () => (
  <footer
    /* solid fill + high z-index keeps CloudyBackground out */
    className="relative z-20 bg-[#F0F3F7] py-10 px-20 font-subheading select-none shadow-inner"
  >
    <div className="max-w-7xl mx-auto space-y-8">
      {/* top row */}
      <div className="flex items-center justify-between">
        {/* left links */}
        <nav className="flex space-x-10 text-sm text-[#9EA5AD]">
          <a href="#privacy" className="hover:text-[#3F4851]">
            Privacy Policy
          </a>
          <a href="#contact" className="hover:text-[#3F4851]">
            Contact&nbsp;Us
          </a>
        </nav>

        {/* right icons */}
        <div className="flex space-x-8 text-[#9EA5AD]">
          <a
            href="#instagram"
            aria-label="Instagram"
            className="hover:text-[#3F4851]"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="#website"
            aria-label="Website"
            className="hover:text-[#3F4851]"
          >
            <LinkIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:hello@skulpt.com"
            aria-label="Email"
            className="hover:text-[#3F4851]"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* divider */}
      <hr className="border-t border-[#D8DDE4]" />
    </div>
  </footer>
);
