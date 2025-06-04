import React from 'react';

export const Hero2 = () => {
  return (
    <section
      id="stem"
      className="pt-[env(safe-area-inset-top)] px-6 py-16 pb-16 flex flex-col items-center justify-center min-h-screen bg-[#E6EBEE]"
    >
      {/* Soft‐edge mask + single blurred video */}
      <div className="logo-mask-feather relative w-[36rem] h-[36rem] lg:w-[64rem] lg:h-[57rem] overflow-hidden ">
        <svg viewBox="0 0 320 320" className="w-full h-full">
          <defs>
            <radialGradient id="softEdgeMask" cx="50%" cy="50%" r="50%">
              {/* Fully opaque (show) out to 40% */}
              <stop offset="75%" stopColor="white" />
              {/* Start fading between 40–80% */}
              <stop offset="85%" stopColor="black" stopOpacity="2.0" />
              {/* Fully masked at 100% */}
              <stop offset="90%" stopColor="black" stopOpacity="1" />
            </radialGradient>
            <mask id="edgeFade">
              <rect width="100%" height="100%" fill="url(#softEdgeMask)" />
            </mask>
          </defs>

          <foreignObject
            x="0"
            y="0"
            width="100%"
            height="100%"
            mask="url(#edgeFade)"
          >
            <video
              src="/Coming.mp4"
              autoPlay
              muted
              loop
              className="w-full h-full object-cover blur-md"
            />
          </foreignObject>
        </svg>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-nersans-two text-[#E6EBEE] text-lg lg:text-2xl tracking-normal">
            COMING&nbsp;SOON
          </span>
        </div>
    </section>
  );
};
