import React, { useEffect, useState } from "react";
import { CloudyBackground } from "./CloudyBackground";

// Target date: August 22, 2025 17:00 (local EDT -04:00)
const TARGET_TIMESTAMP = new Date("2025-08-22T17:00:00-04:00").getTime();

export const Hero2: React.FC = () => {
  // 1) Helper to calculate remaining time
  const calculateTimeLeft = () => {
    const now = Date.now();
    const difference = TARGET_TIMESTAMP - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      milliseconds: Math.floor(difference % 1000),
    };
  };

  // 2) Set up state & interval
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Use requestAnimationFrame for smoother millisecond updates
    let animationFrameId: number;
    let lastUpdate = 0;
    
    const update = (timestamp: number) => {
      if (timestamp - lastUpdate >= 16) { // ~60fps
        setTimeLeft(calculateTimeLeft());
        lastUpdate = timestamp;
      }
      animationFrameId = requestAnimationFrame(update);
    };
    
    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const { days, hours, minutes, seconds, milliseconds } = timeLeft;

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 w-full h-full z-0">
        <CloudyBackground />
      </div>
      <section
        id="stem"
        className="pt-[env(safe-area-inset-top)] px-6 py-16 pb-16 flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-[#E6EBEE]"
      >
        {/* GIF inside a soft-edge radial mask */}
        <div
          className="gif-feather relative w-[36rem] h-[55rem] lg:w-[64rem] lg:h-[57rem] overflow-hidden select-none"
          onContextMenu={(e) => e.preventDefault()}
        >
          <img
            src="/skulpt.gif"
            alt="Brand animation"
            className="w-full h-full object-cover blur-xl pointer-events-none"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>

        {/* “COMING SOON” text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-nersans-two text-white text-xl lg:text-3xl font-medium tracking-wider mb-4">
            COMING SOON
          </span>
          
          {/* Timer in glass container */}
          <div className="backdrop-blur-md bg-white/5 p-4 rounded-xl border border-white/10 shadow-xl">
            <div className="font-mono text-white text-lg lg:text-xl tracking-wider">
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-medium">{days}</span>
                <span>:</span>
                <span className="text-2xl font-medium ml-2">{hours.toString().padStart(2, '0')}</span>
                <span>:</span>
                <span className="text-2xl font-medium ml-2">{minutes.toString().padStart(2, '0')}</span>
                <span>:</span>
                <span className="text-2xl font-medium ml-2">{seconds.toString().padStart(2, '0')}</span>
                <span>:</span>
                <span className="text-2xl opacity-80 font-light ml-2">{milliseconds.toString().padStart(3, '0')}</span>
                <span className="text-lg opacity-80 font-light"></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
