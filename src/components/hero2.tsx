import React from 'react';

export const Hero2 = () => {
  return (
    <section
      id="stem"
      className="pt-safe px-6 py-16 flex flex-col items-center justify-center min-h-[100dvh] bg-gradient-to-b from-[#050D1F] via-[#E6EBEE] to-black"
    >
      {/* SVG-based soft-edge mask */}
      <div className="relative w-[36rem] h-[36rem] lg:w-[64rem] lg:h-[64rem] lg:pb-64">
      <svg
          viewBox="0 0 320 320"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <radialGradient id="softEdgeMask" cx="50%" cy="50%" r="50%">
              <stop offset="75%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
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
              className="w-full h-full object-cover rounded-full"
            />
          </foreignObject>
        </svg>
      </div>

      {/* Caption */}
      <div className="mt-6 text-center text-blue-200/70">
        <p className="text-sm font-mono font-display">[SKULPT]</p>
        <p className="mt-2 text-lg font-subheading">
          to form, shape, or manipulate
        </p>
      </div>
    </section>
  );
};
