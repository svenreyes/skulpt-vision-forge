import React from "react";
import InstagramIcon from "../assets/insta.svg";
import LinkIcon from "../assets/link.svg";
import MailIcon from "../assets/mail.svg";

export const Footer = () => (
  <footer className="relative z-20 bg-[#F0F3F7] pt-6 sm:pt-10 pb-12 px-4 sm:px-6 md:px-20 font-subheading select-none shadow-inner">
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-6 sm:space-y-0">
        {/* Mobile: Stacked links */}
        <nav className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-[#9EA5AD] w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <a 
              href="#privacy" 
              className="hover:text-[#3F4851] transition-colors duration-200 py-3 sm:py-0 text-center sm:text-left"
            >
              Privacy Policy
            </a>
            <a 
              href="#contact" 
              className="hover:text-[#3F4851] transition-colors duration-200 py-3 sm:py-0 text-center sm:text-left"
            >
              Contact Us
            </a>
          </div>
        </nav>

        {/* Icons - centered on mobile, right-aligned on larger screens */}
        <div className="flex justify-center sm:justify-start space-x-6 sm:space-x-8 w-full sm:w-auto">
          <a
            href="#instagram"
            aria-label="Instagram"
            className="hover:brightness-75 transition-all duration-200 p-3"
          >
            <img src={InstagramIcon} alt="Instagram" className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a
            href="#website"
            aria-label="Website"
            className="hover:brightness-75 transition-all duration-200 p-3"
          >
            <img src={LinkIcon} alt="Website" className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a
            href="mailto:hello@skulpt.com"
            aria-label="Email"
            className="hover:brightness-75 transition-all duration-200 p-3"
          >
            <img src={MailIcon} alt="Email" className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>
      </div>

      {/* divider */}
      <hr className="border-t border-[#D8DDE4] mt-6 sm:mt-8" />
    </div>
  </footer>
);
