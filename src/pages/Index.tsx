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
    "Who do you want to be?",
    "What's your story?",
    "If my answer had to be yes, what would it be?",
    "Have you ever been understood?",
    "What version of yourself do people not see?",
    "Why now?",
  ];

  /* ------------------------------ refs & state ------------------------------ */
  const containerRef = useRef<HTMLDivElement | null>(null);
  const questionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const taglineRef = useRef<HTMLElement | null>(null);

  const [focusedIdx, setFocusedIdx] = useState(0);
  const [stackedMode, setStackedMode] = useState(false); // snap/focus vs stacked/hover
  const [freezeScroll, setFreezeScroll] = useState(false); // temporarily lock scroll

  /* ---------------------------- Snap‑focus logic --------------------------- */
  useEffect(() => {
    if (stackedMode) return; // disabled once stacked mode begins

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
            // 1. Hard‑stop any momentum and align viewport to tagline top
            const targetTop = taglineRef.current!.offsetTop;
            container.scrollTo({ top: targetTop, behavior: "auto" });
            setFreezeScroll(true);

            // 2. After short delay (no momentum), enable stacked mode & re‑allow scroll
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

  /* -------------------------------------------------------------------------- */

  const baseLi =
    "text-[24px] leading-[120%] tracking-[-0.8px] font-normal text-[#9EA5AD] transition-all duration-300 ease-in-out";

  const navigate = useNavigate();
  const { trigger } = useRouteBlur();

  return (
    <div
      ref={containerRef}
      style={{ overflowY: freezeScroll ? "hidden" : "auto" }}
      className={`h-screen bg-gradient-to-b from-[#E6EBEE] to-[#D1D9E0] relative flex flex-col pt-8 ${
        stackedMode ? "" : "snap-y snap-mandatory"
      }`}
    >
      {/* Moving background */}
      <CloudyBackground />

      <Navbar />

      {/* Questions list */}
      <main className={`w-full ${stackedMode ? 'pt-52' : 'pt-32'} pb-16 px-6 mx-auto max-w-4xl font-subheading relative z-10 text-center`}>
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

      {/* Tagline */}
      <section
        ref={taglineRef}
        className="snap-start text-center py-32 z-10 select-none min-h-screen flex items-center justify-center"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#B8C1CB]">
          Taking Branding <span className="italic text-[#A0A9B4]">Personally</span>{" "}
          <button
            aria-label="Go to skulpting"
            onClick={async () => {
              await trigger({ before: 200, after: 200 });
              navigate("/skulpting");
            }}
            className="align-middle inline-flex items-center justify-center ml-1 hover:opacity-80 transition-opacity"
          >
            <img src={arrowUrl} alt="arrow" className="inline-block w-5 h-5 mb-1 -rotate-45 scale-150" />
          </button>
        </h2>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
