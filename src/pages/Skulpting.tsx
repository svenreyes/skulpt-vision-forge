import React from "react";
import { Navbar } from "../components/Navbar";
import { CloudyBackground } from "../components/CloudyBackground";

const Skulpting: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#E6EBEE] overflow-hidden">
      {/* Background clouds (bottom layer) */}
      <div className="absolute inset-0 z-0">
        <CloudyBackground zIndex={0} />
      </div>

      {/* Interactive Spline blob (middle layer) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="relative w-full h-full md:scale-[1.35] md:translate-x-28 md:translate-y-48 lg:scale-[1.5] lg:translate-x-44 lg:translate-y-72">
          <iframe
            src="https://my.spline.design/untitled-joeso1Tv4ZyNsbizJR3r5kQz/"
            className="
              absolute left-1/2 top-1/2 translate-x-[-58%] -translate-y-1/2
              w-[290vmin] h-[150vmin]
              sm:translate-x-[-54%] sm:w-[160vmin] sm:h-[160vmin]
              md:static md:w-full md:h-full md:transform-none
            "
            frameBorder="0"
          />
        </div>
      </div>

      {/* Navbar (top UI layer) */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Center text (let pointer events pass through) */}
      <main className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center pointer-events-none select-none">
        <h1 className="font-subheading text-[#9EA5AD] text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          What are we skulpting today?
        </h1>
      </main>
    </div>
  );
};

export default Skulpting;
