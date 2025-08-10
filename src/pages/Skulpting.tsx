import React from "react";
import { Navbar } from "../components/Navbar";
import { CloudyBackground } from "../components/CloudyBackground";

const Skulpting: React.FC = () => {
  return (
    <div className="relative scale-[1] min-h-[100svh] w-full bg-[#E6EBEE] overflow-hidden">
      {/* Background clouds (bottom layer) */}
      <div className="absolute inset-0 z-0">
        <CloudyBackground zIndex={0} />
      </div>

      {/* Interactive Spline blob (middle layer) */}
      <div className="absolute inset-0 z-10 grid place-items-center">
      {/* Bigger canvas = bigger blob */}
      <div
        className="
          relative
          size-[min(175vw,175svh)] translate-x-[-26%]           /* xs */
          sm:size-[min(165vw,165svh)] scale-[2.75] sm:translate-x-[-4%]      /* sm */
          md:size-[160vmin] md:scale-[1.5] md:translate-x-0 md:translate-y-8   /* md desktop start */
          lg:size-[160vmin lg:scale-[2] lg:-translate-y-[23%] lg:-translate-x-36  /* lg and up */
          xl:size-[180vmin]                                      /* xl: even larger */
        "
      >
        <iframe
          src="https://my.spline.design/untitled-joeso1Tv4ZyNsbizJR3r5kQz/?ui=0"
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen"
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
