import React, { useEffect, useRef, useState } from "react";
import { CloudyBackground } from "../components/CloudyBackground";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import arrowUrl from "../assets/arrow.svg";
import { useNavigate } from "react-router-dom";
import { useRouteBlur } from "../components/RouteBlurTransition";

const Index = () => {
  const questions = [
    "Who are you?",
    "Where would you go for dinner?",
    "Who do you aspire to be?",
    "What's your story?",
    "Who do you care about?",
    "What part of you do people not understand?",
  ];

  /* ------------------------------ refs & state ------------------------------ */
  const containerRef = useRef<HTMLDivElement | null>(null);
  const questionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const taglineRef = useRef<HTMLElement | null>(null);

  const [focusedIdx, setFocusedIdx] = useState(0);
  const [stackedMode, setStackedMode] = useState(false);
  const [freezeScroll, setFreezeScroll] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  /* ---------------------------- Snap‑focus logic --------------------------- */
  useEffect(() => {
    if (stackedMode) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = questionRefs.current.findIndex((r) => r === entry.target);
            if (idx !== -1) setFocusedIdx(idx);
          }
        });
      },
      { threshold: 0.5 }
    );

    questionRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [stackedMode]);

  /* ---------------- Convert to stacked mode exactly on tagline -------------- */
  useEffect(() => {
    if (!taglineRef.current || stackedMode) return;
    const container = containerRef.current!;

    const tagObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !stackedMode) {
            const targetTop = taglineRef.current!.offsetTop;
            container.scrollTo({ top: targetTop, behavior: "auto" });
            setFreezeScroll(true);

            setTimeout(() => {
              setStackedMode(true);
              setFreezeScroll(false);
            }, 300);
          }
        });
      },
      { threshold: 0.6 }
    );

    tagObserver.observe(taglineRef.current);
    return () => tagObserver.disconnect();
  }, [stackedMode]);

  /* ------------------------ Global smooth scroll feel ------------------------ */
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  // Mark interaction once the user scrolls or clicks
  useEffect(() => {
    const onWheel = () => setHasInteracted(true);
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " ", "Enter"].includes(e.key)) setHasInteracted(true);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel as any);
      window.removeEventListener("keydown", onKey);
    };
  }, []);


  const baseLi =
    "text-[28.2px] leading-[120%] tracking-[-0.8px] font-normal text-[#9EA5AD] transition-all duration-300 ease-in-out";

  const navigate = useNavigate();
  const { trigger } = useRouteBlur();

  // Helper: advance to next question on click when in snap mode
  const advanceToNext = () => {
    if (stackedMode) return;
    const next = Math.min(focusedIdx + 1, questions.length - 1);
    const el = questionRefs.current[next];
    const container = containerRef.current;
    if (el && container) {
      container.scrollTo({ top: el.offsetTop, behavior: "smooth" });
      setHasInteracted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{ overflowY: freezeScroll ? "hidden" : "auto" }}
      className={`h-screen bg-gradient-to-b from-[#E6EBEE] to-[#D1D9E0] relative flex flex-col pt-8 ${
        stackedMode ? "" : "snap-y snap-mandatory"
      }`}
    >

      <CloudyBackground />

      <header>
        <Navbar />
      </header>


      <main
        className={`w-full ${stackedMode ? 'pt-52' : 'pt-32'} pb-16 px-6 mx-auto max-w-4xl font-subheading relative z-10 text-center`}
        role="main"
        onClick={advanceToNext}
      >
        {/* Accessible site heading for SEO and semantics */}
        <h1 className="sr-only">SKULPT | Why Now?</h1>
        <ul className="flex flex-col items-center w-full">
          {questions.map((q, i) => {
            const inFocus = focusedIdx === i && !stackedMode;
            const focusClasses = inFocus
              ? "opacity-100 scale-105 z-10"
              : "opacity-40 scale-95 blur-sm z-0";
            const stackedClasses =
              "py-6 cursor-pointer blur-sm opacity-40 hover:blur-none hover:opacity-100";

            return (
              <li
                key={q}
                ref={(el) => (questionRefs.current[i] = el)}
                className={`${baseLi} ${stackedMode ? stackedClasses : focusClasses} ${
                  stackedMode ? "" : "snap-start flex items-center justify-center h-screen"
                }`}
                style={!stackedMode ? { scrollSnapAlign: "center" } : undefined}
              >
                {q}
              </li>
            );
          })}
        </ul>
      </main>


      <section
        ref={taglineRef}
        className="snap-start text-center py-32 z-10 select-none min-h-screen flex items-center justify-center"
      >
        <h2 className="group text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-body text-[#CBD1D6] transition-colors">
          Why <span className="italic text-[#C1CFD4] font-subheading ">Now?</span>{" "}
          <button
            aria-label="Go to skulpting"
            onClick={async () => {
              await trigger({ before: 200, after: 200 });
              navigate("/skulpting");
            }}
            className="align-middle inline-flex items-center justify-center ml-1 transition-opacity"
          >
            <img src={arrowUrl} alt="arrow" className="inline-block w-5 h-5 -rotate-45 scale-150 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </h2>
      </section>

      {/* Scroll affordance: visible only on first screen before interaction */}
      {!stackedMode && !hasInteracted && focusedIdx === 0 && (
        <div className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#9EA5AD]">
          <span className="text-xs sm:text-sm font-body tracking-wide">Scroll to explore</span>
        </div>
      )}

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Index;
