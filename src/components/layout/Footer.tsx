import React from "react";
import { Link } from "react-router-dom";
import InstagramIcon from "@assets/insta.svg";
import LinkedInIcon from "@assets/linkedin.svg";
import TikTokIcon from "@assets/tiktok.svg";

type FooterProps = {
  compact?: boolean;
  /** When true, on mobile (below sm) render the nav links side-by-side instead of stacked. */
  mobileRowNav?: boolean;
};

export const Footer: React.FC<FooterProps> = ({ compact = false, mobileRowNav = false }) => (
  <footer
    className={
      `relative bg-[#F0F3F7] font-subheading select-none shadow-inner ` +
      (compact ? "pt-2 sm:pt-3 pb-3 px-4 sm:px-6 md:px-8" : "pt-6 sm:pt-10 pb-12 px-4 sm:px-6 md:px-20")
    }
  >
    <div className={compact ? "max-w-7xl mx-auto space-y-3 sm:space-y-4" : "max-w-7xl mx-auto space-y-6 sm:space-y-8"}>
      <div className={compact ? "flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0" : "flex flex-col sm:flex-row items-center justify-between space-y-6 sm:space-y-0"}>
        {/* Mobile: Stacked links */}
        <nav className={(mobileRowNav
            ? "flex flex-row justify-center items-center gap-8 "
            : "flex flex-col items-center space-y-2 ") +
            "sm:flex-row sm:space-y-0 sm:space-x-6 text-md text-[#9EA5AD] w-full sm:w-auto"}>
          <div className={(mobileRowNav
              ? "flex flex-row justify-center items-center gap-8 "
              : "flex flex-col items-center space-y-2 ") +
              "sm:flex-row sm:space-y-0 sm:space-x-6"}>
            <Link
              to="/privacy"
              className="hover:text-[#3F4851] transition-colors duration-200 py-2 sm:py-0 text-center sm:text-left"
            >
              Privacy Policy
            </Link>
            <Link
              to="/gallery"
              className="hover:text-[#3F4851] transition-colors duration-200 py-2 sm:py-0 text-center sm:text-left"
            >
              Gallery
            </Link>
            <Link
              to="/faq"
              className="hover:text-[#3F4851] transition-colors duration-200 py-2 sm:py-0 text-center sm:text-left"
            >
              FAQ
            </Link>
            <a
              href="mailto:contact@skulptbrand.com"
              className="hover:text-[#3F4851] transition-colors duration-200 py-2 sm:py-0 text-center sm:text-left"
            >
              Contact Us
            </a>
          </div>
        </nav>

        {/* Icons - centered on mobile, right-aligned on larger screens */}
        <div className="flex justify-center sm:justify-start space-x-6 sm:space-x-8 w-full sm:w-auto">
          <a
            href="https://www.instagram.com/skulptbrand?igsh=a3hrMW15YmRnN2Yw"
            aria-label="Instagram"
            className={compact ? "hover:brightness-75 transition-all duration-200 p-2" : "hover:brightness-75 transition-all duration-200 p-3"}
          >
            <img src={InstagramIcon} alt="Instagram" className={compact ? "w-5 h-5" : "w-5 h-5 sm:w-6 sm:h-6"} />
          </a>
          <a
            href="https://www.linkedin.com/company/skulptbrand/posts/?feedView=all"
            aria-label="LinkedIn"
            className={compact ? "hover:brightness-75 transition-all duration-200 p-2" : "hover:brightness-75 transition-all duration-200 p-3"}
          >
            <img src={LinkedInIcon} alt="LinkedIn" className={compact ? "w-5 h-5" : "w-5 h-5 sm:w-6 sm:h-6"} />
          </a>
          <a
            href="https://www.tiktok.com/@skulptbrand?_t=ZT-90OWN13MioX&_r=1"
            aria-label="TikTok"
            target="_blank"
            rel="noopener noreferrer"
            className={compact ? "hover:brightness-75 transition-all duration-200 p-2" : "hover:brightness-75 transition-all duration-200 p-3"}
          >
            <img src={TikTokIcon} alt="TikTok" className={compact ? "w-5 h-5" : "w-5 h-5 sm:w-6 sm:h-6"} />
          </a>
        </div>
      </div>

      {/* divider */}
      <hr className={compact ? "border-t border-[#D8DDE4] mt-3" : "border-t border-[#D8DDE4] mt-6 sm:mt-8"} />
    </div>
  </footer>
);
