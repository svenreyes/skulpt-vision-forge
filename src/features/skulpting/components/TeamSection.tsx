import { useMemo } from "react";
import { useStockholmTime } from "../hooks";
import { team } from "../lib";

interface TeamSectionProps {
  isMobile: boolean;
}

export function TeamSection({ isMobile }: TeamSectionProps) {
  const stockholmTime = useStockholmTime();

  const figures = useMemo(
    () =>
      team.map((m) => ({
        ...m,
        scale: +(0.95 + Math.random() * 0.3).toFixed(2),
        yOffset: Math.floor(-24 + Math.random() * 48),
        xOffset: Math.floor(-8 + Math.random() * 16),
      })),
    []
  );

  return (
    <section className="relative z-10 pb-0">
      <div
        className="w-screen px-0"
        style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
      >
        <div
          className="relative min-h-[75vh] sm:min-h-[120vh] overflow-visible sm:overflow-hidden sm:rounded-t-[799px]"
          style={{
            WebkitClipPath: isMobile
              ? "none"
              : 'path("M 0 50% A 50% 50% 0 0 1 100% 50% L 100% 100% L 0 100% Z")',
            clipPath: isMobile
              ? "none"
              : 'path("M 0 50% A 50% 50% 0 0 1 100% 50% L 100% 100% L 0 100% Z")',
            WebkitMaskImage: isMobile
              ? "radial-gradient(ellipse 100% 30% at 50% 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.9) 80%, black 100%), linear-gradient(180deg, transparent 0%, black 15%, black 100%)"
              : "radial-gradient(ellipse 50% 50% at center, black 70%, transparent 100%)",
            maskImage: isMobile
              ? "radial-gradient(ellipse 100% 30% at 50% 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.9) 80%, black 100%), linear-gradient(180deg, transparent 0%, black 15%, black 100%)"
              : "radial-gradient(ellipse 50% 50% at center, black 70%, transparent 100%)",
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
        >
          {/* Background blur effects */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: "#C1CFD4",
              opacity: 0.55,
              filter: "blur(28px)",
              WebkitMaskImage: isMobile
                ? "radial-gradient(ellipse 110% 75% at 50% 10%, black 75%, transparent 100%)"
                : "radial-gradient(ellipse 85% 65% at 50% 8%, black 62%, transparent 100%)",
              maskImage: isMobile
                ? "radial-gradient(ellipse 110% 75% at 50% 10%, black 75%, transparent 100%)"
                : "radial-gradient(ellipse 85% 65% at 50% 8%, black 62%, transparent 100%)",
            }}
          />
          <div
            className="absolute -top-[8vh] sm:-top-[6vh] -left-[30vw] sm:-left-[12vw] w-[160vw] sm:w-[120vw] h-[160vw] sm:h-[120vw] pointer-events-none z-0"
            style={{
              background: "#C1CFD4",
              opacity: 0.25,
              filter: "blur(36px)",
              WebkitMaskImage:
                "radial-gradient(closest-side, black 55%, transparent 100%)",
              maskImage: "radial-gradient(closest-side, black 55%, transparent 100%)",
            }}
          />

          {/* Clock display */}
          <div className="absolute inset-0 z-10 select-none pointer-events-none flex items-center justify-center">
            <div className="relative inline-block leading-none">
              <span
                className="font-body tracking-tight block text-center"
                style={{
                  fontSize: "24vw",
                  color: "#9EA5AD",
                  opacity: 0.38,
                  letterSpacing: "-0.02em",
                  filter: "blur(1px)",
                  lineHeight: 1,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {stockholmTime.toLocaleTimeString("en-GB", {
                  timeZone: "Europe/Stockholm",
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                <div
                  className="absolute top-1/2 left-full -translate-y-1/2 ml-2 sm:ml-4 flex flex-col items-start gap-1 sm:gap-96 text-[10px] sm:text-xs font-subheading tracking-widest text-[#9EA5AD] uppercase z-50"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                >
                  <span
                    style={{
                      position: "relative",
                      zIndex: 50,
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    {/AM/.test(
                      stockholmTime.toLocaleTimeString("en-US", {
                        timeZone: "Europe/Stockholm",
                        hour12: true,
                      })
                    )
                      ? "AM"
                      : "PM"}
                  </span>
                  <span style={{ position: "relative", zIndex: 50 }}>SWEDEN</span>
                </div>
              </span>
            </div>
          </div>

          {/* Team figures at bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-center px-6 pb-6 sm:px-8 sm:pb-16">
            <div className="flex items-end justify-between w-full max-w-5xl gap-2 sm:gap-4">
              {figures.map((p, i) => (
                <div
                  key={i}
                  className="relative flex-1 flex justify-center items-end h-[24vh] sm:h-[36vh]"
                  style={{
                    transform: `translateX(${p.xOffset}px) translateY(${p.yOffset}px) scale(${p.scale})`,
                    willChange: "filter, opacity, transform",
                  }}
                >
                  <span className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 opacity-0 text-[10px] sm:text-xs text-[#9EA5AD] font-eyebrow tracking-widest transition-opacity duration-500 ease-out">
                    {p.name}
                  </span>

                  <img
                    src={p.src}
                    alt={p.name}
                    className="h-full object-contain transition-[filter,opacity,transform] duration-700 ease-out grayscale blur-[3px] opacity-60 hover:grayscale-0 hover:blur-0 hover:opacity-100"
                    style={{
                      WebkitMaskImage:
                        "linear-gradient(to top, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                      maskImage:
                        "linear-gradient(to top, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                      willChange: "filter, opacity, transform",
                    }}
                    draggable={false}
                    onMouseEnter={(e) => {
                      const label = e.currentTarget.previousSibling as HTMLElement;
                      if (label) label.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      const label = e.currentTarget.previousSibling as HTMLElement;
                      if (label) label.style.opacity = "0";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

