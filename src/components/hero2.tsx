import React from "react";

export const Hero2 = () => (
  <section
    id="stem"
    className="pt-[env(safe-area-inset-top)] px-6 py-16 pb-16 flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-[#E6EBEE]"
  >
    {/* GIF inside a soft-edge radial mask */}
    <div className="gif-feather relative w-[36rem] h-[55rem] lg:w-[64rem] lg:h-[57rem] overflow-hidden">
      <img
        src="/skulpt.gif"          /* ←-- your animated GIF */
        alt="Brand animation"
        className="w-full h-full object-cover blur-xl" /* blur *inside* */
      />
    </div>

    {/* “COMING SOON” overlay */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <span className="font-nersans-two text-[#E6EBEE] text-lg lg:text-2xl tracking-normal">
        COMING&nbsp;SOON
      </span>
    </div>
  </section>
);
