import { useState, useEffect, useRef } from "react";
import skulptVideo from "@assets/videos/skulpting.mp4";
import arrowUrl from "@assets/arrow.svg";
import exUrl from "@assets/ex.svg";
import { AxisType, axisCopy, axisOrder } from "../lib";

interface StrategyCircleProps {
  isMobile: boolean;
  shouldLoadVideos: boolean;
}

export function StrategyCircle({ isMobile, shouldLoadVideos }: StrategyCircleProps) {
  const [activeAxis, setActiveAxis] = useState<AxisType>("strategy");
  const [displayAxis, setDisplayAxis] = useState<AxisType>("strategy");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSwipeArrow, setShowSwipeArrow] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const circleRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      setShowSwipeArrow(false);
      const currentIndex = axisOrder.indexOf(activeAxis);

      if (diff > 0) {
        // Swiped left, go to next
        const nextIndex = (currentIndex + 1) % axisOrder.length;
        setActiveAxis(axisOrder[nextIndex]);
      } else {
        // Swiped right, go to previous
        const prevIndex = (currentIndex - 1 + axisOrder.length) % axisOrder.length;
        setActiveAxis(axisOrder[prevIndex]);
      }
    }
  };

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setDisplayAxis(activeAxis);
      setIsTransitioning(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [activeAxis]);

  return (
    <section className="relative z-10 lg:py-64 sm:py-16 mt-24 flex items-center justify-center px-4 sm:px-6">
      <div
        ref={circleRef}
        className="relative w-full max-w-[75vw] sm:max-w-[720px] aspect-square"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Outer circular blur effects */}
        <div className="absolute inset-0 overflow-visible flex items-center justify-center pointer-events-none">
          <div
            className="rounded-full w-full h-full"
            style={{
              transform: "scale(2.6,1.75)",
              WebkitMaskImage:
                "radial-gradient(ellipse 50% 50% at center, black 60%, transparent 100%)",
              maskImage:
                "radial-gradient(ellipse 50% 50% at center, black 60%, transparent 100%)",
              backgroundColor: "#8297A9",
              mixBlendMode: "multiply",
              opacity: 0.75,
              filter: "blur(140px)",
            }}
          />
        </div>

        {/* Video with radial fade */}
        <div className="absolute inset-0 overflow-visible flex items-center justify-center">
          <div
            className="rounded-full scale-[1.25] w-full h-full overflow-hidden"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 50% 50% at center, black 60%, transparent 100%)",
              maskImage:
                "radial-gradient(ellipse 50% 50% at center, black 60%, transparent 100%)",
            }}
          >
            {shouldLoadVideos ? (
              <video
                src={skulptVideo}
                className="w-full h-full object-cover opacity-85 scale-110 transform-gpu"
                style={{
                  filter: "blur(8px)",
                  willChange: "transform",
                }}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#9EA5AD]/30 to-[#CBD1D6]/20 animate-pulse rounded-full" />
            )}
            <div className="absolute inset-0 bg-[#9EA5AD] mix-blend-multiply opacity-25" />
          </div>
        </div>

        {/* Outer blurry glow */}
        <div className="absolute inset-0 rounded-full bg-[#9EA5AD]/30 blur-[140px] pointer-events-none" />

        {/* Circular outline split into 4 segments - desktop only */}
        {!isMobile && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            {(() => {
              const r = 49;
              const circumference = 2 * Math.PI * r;
              const dash = circumference / 4;
              return [
                { key: "strategy" as const, offset: dash * 2.5 },
                { key: "external" as const, offset: dash * 1.5 },
                { key: "alignment" as const, offset: dash * 0.5 },
                { key: "internal" as const, offset: dash * 3.5 },
              ].map(({ key, offset }) => (
                <circle
                  key={key}
                  cx="50"
                  cy="50"
                  r="49"
                  fill="none"
                  stroke="white"
                  strokeOpacity={activeAxis === key ? 1 : 0.35}
                  strokeWidth="1.2"
                  strokeDasharray={`${dash} ${circumference - dash}`}
                  strokeDashoffset={-offset}
                  style={{ transition: "stroke-opacity 0.2s ease" }}
                  strokeLinecap="round"
                />
              ));
            })()}
          </svg>
        )}

        {/* Desktop Axis labels */}
        {!isMobile && (
          <>
            <span
              onMouseEnter={() => setActiveAxis("strategy")}
              className="absolute -top-6 left-1/2 -translate-x-1/2 cursor-pointer text-xs tracking-widest font-subheading select-none"
              style={{
                color: activeAxis === "strategy" ? "#FFFFFF" : "rgba(255,255,255,0.6)",
              }}
            >
              STRATEGY
            </span>
            <span
              onMouseEnter={() => setActiveAxis("alignment")}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 cursor-pointer text-xs tracking-widest font-subheading select-none"
              style={{
                color: activeAxis === "alignment" ? "#FFFFFF" : "rgba(255,255,255,0.6)",
              }}
            >
              EXTERNAL
            </span>
            <span
              onMouseEnter={() => setActiveAxis("external")}
              className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full sm:-left-20 sm:translate-x-0 -rotate-90 cursor-pointer text-xs tracking-widest font-subheading select-none"
              style={{
                color: activeAxis === "external" ? "#FFFFFF" : "rgba(255,255,255,0.6)",
              }}
            >
              ALIGNMENT
            </span>
            <span
              onMouseEnter={() => setActiveAxis("internal")}
              className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-full sm:-right-20 sm:translate-x-0 rotate-90 cursor-pointer text-xs tracking-widest font-subheading select-none"
              style={{
                color: activeAxis === "internal" ? "#FFFFFF" : "rgba(255,255,255,0.6)",
              }}
            >
              INTERNAL
            </span>

            {/* Indicator dots */}
            {activeAxis !== "strategy" && (
              <span
                className="absolute left-1/2 translate-y-4 -translate-x-1/2 bg-white rounded-full"
                style={{ width: 8, height: 8, top: "calc(50% - 49% + 10px)" }}
              />
            )}
            {activeAxis !== "alignment" && (
              <span
                className="absolute left-1/2 -translate-y-6 -translate-x-1/2 bg-white rounded-full"
                style={{ width: 8, height: 8, top: "calc(50% + 49% - 10px)" }}
              />
            )}
            {activeAxis !== "external" && (
              <span
                className="absolute top-1/2 translate-x-4 -translate-y-1/2 bg-white rounded-full"
                style={{ width: 8, height: 8, left: "calc(50% - 49% + 10px)" }}
              />
            )}
            {activeAxis !== "internal" && (
              <span
                className="absolute top-1/2 -translate-x-6 -translate-y-1/2 bg-white rounded-full"
                style={{ width: 8, height: 8, left: "calc(50% + 49% - 10px)" }}
              />
            )}

            {/* Active indicator X */}
            <img
              src={exUrl}
              alt="x"
              className="absolute w-6 h-6 select-none pointer-events-none transition-all duration-700"
              style={{
                top:
                  activeAxis === "strategy"
                    ? "calc(50% - 49% + 48px)"
                    : activeAxis === "alignment"
                    ? "calc(50% + 49% - 48px)"
                    : "50%",
                left:
                  activeAxis === "external"
                    ? "calc(50% - 49% + 48px)"
                    : activeAxis === "internal"
                    ? "calc(50% + 49% - 48px)"
                    : "50%",
                transform: "translate(-50%,-50%)",
                filter: "brightness(0) invert(1)",
              }}
            />
          </>
        )}

        {/* Mobile Axis labels */}
        {isMobile && (
          <>
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-3">
              <div className="relative flex items-start justify-center gap-4">
                {axisOrder.map((axis) => {
                  const isActive = activeAxis === axis;
                  return (
                    <div
                      key={axis}
                      className="relative flex flex-col items-center"
                      style={{ minWidth: "70px" }}
                    >
                      <span
                        onClick={() => {
                          setActiveAxis(axis);
                          setShowSwipeArrow(false);
                        }}
                        className="text-[12px] tracking-[0.15em] font-subheading select-none transition-all duration-300 whitespace-nowrap cursor-pointer"
                        style={{
                          color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.6)",
                          fontWeight: isActive ? 700 : 500,
                        }}
                      >
                        {axis.toUpperCase()}
                      </span>
                    </div>
                  );
                })}
                <span
                  className="absolute bg-white rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: 5,
                    height: 5,
                    top: "20px",
                    left: `calc(${axisOrder.indexOf(activeAxis) * 25}% + 12.5%)`,
                    transform: "translateX(-50%)",
                  }}
                />
              </div>
            </div>

            {/* Swipe arrow indicator */}
            {showSwipeArrow && (
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 animate-pulse">
                <img
                  src={arrowUrl}
                  alt="swipe left"
                  className="w-5 h-5 rotate-180"
                  style={{ filter: "brightness(0) invert(1) opacity(0.5)" }}
                />
                <span className="text-[11px] text-white/50 font-subheading tracking-[0.2em]">
                  SWIPE
                </span>
                <img
                  src={arrowUrl}
                  alt="swipe right"
                  className="w-5 h-5"
                  style={{ filter: "brightness(0) invert(1) opacity(0.5)" }}
                />
              </div>
            )}
          </>
        )}

        {/* Centered description text */}
        <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-6 text-center select-none">
          <p
            className={`font-fkgrotes text-[17px] sm:text-base md:text-lg leading-[1.8] sm:leading-snug text-white/50 ${
              isMobile ? "max-w-[98%]" : "max-w-[65%]"
            } transition-all duration-300 ${
              isTransitioning ? "opacity-0 blur-sm" : "opacity-100"
            }`}
            dangerouslySetInnerHTML={{ __html: axisCopy[displayAxis] }}
          />
        </div>
      </div>
    </section>
  );
}

