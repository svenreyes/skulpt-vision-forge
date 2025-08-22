import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import ridelinkImg from "@/assets/images/ridelink.png";
import ridelink2Img from "@/assets/images/ridelink2.png";
import ridelinkPfp from "@/assets/images/ridelinkpfp.png";
import yourrideImg from "@/assets/images/yourride.png";
import thefutureImg from "@/assets/images/thefuture.png";
import process1Img from "@/assets/images/process1.png";
import process2Img from "@/assets/images/process2.png";
import process3Img from "@/assets/images/process3.png";
import pitchdeckImg from "@/assets/images/pitchdeck.png";
import playbookImg from "@/assets/images/playbook.png";
import arrowSvg from "@/assets/arrow.svg";
import workshopNotebookImg from "@/assets/images/workshop_notebook.png";
import brandguidelinesImg from "@/assets/images/brandguidelines.png";

// Simple blur-transition slideshow used in Panels 5 and 6
function BlurSlideshow({
  images,
  intervalMs = 3000,
  className = "",
}: {
  images: string[];
  intervalMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!images?.length) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images, intervalMs]);

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden border border-white/25 bg-white/25 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.20)] ${className}`}
      aria-live="polite"
    >
      {/* Layer images and fade/blur between them */}
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
              index === i ? "opacity-100 blur-0" : "opacity-0 blur-sm"
            }`}
            loading="lazy"
            decoding="async"
          />)
        )}
      </div>
      {/* Reserve height (taller on mobile only) */}
      <div className="relative w-full h-[240px] sm:h-[220px] md:h-[220px]" />
    </div>
  );
}

const Skulpted: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // Free scrolling: only intercept vertical->horizontal when it actually scrolls horizontally
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const maxScrollLeft = el.scrollWidth - el.clientWidth;
        const prev = el.scrollLeft;
        const next = Math.min(maxScrollLeft, Math.max(0, prev + e.deltaY));
        if (next !== prev) {
          el.scrollLeft = next;
          e.preventDefault();
        }
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Touch gestures: map vertical swipes to horizontal scroll to enforce horizontal-only navigation
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let startScrollLeft = 0;
    let isDragging = false;

    const onTouchStart = (e: TouchEvent) => {
      if (!e.touches.length) return;
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      startScrollLeft = el.scrollLeft;
      isDragging = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      if (!e.touches.length) return;
      const t = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      const useVertical = Math.abs(dy) > Math.abs(dx);
      const delta = useVertical ? dy : dx; // vertical attempts are translated to horizontal delta
      el.scrollLeft = startScrollLeft - delta;
      e.preventDefault(); // prevent page vertical scroll
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  // Measure footer height and expose as CSS var for layout calculations
  useEffect(() => {
    const updateFooterHeight = () => {
      const h = footerRef.current?.offsetHeight || 0;
      if (rootRef.current) rootRef.current.style.setProperty("--footer-h", `${h}px`);
    };
    updateFooterHeight();
    window.addEventListener("resize", updateFooterHeight);
    return () => window.removeEventListener("resize", updateFooterHeight);
  }, []);

  // Forward wheel events on the fixed footer to horizontal scroll
  useEffect(() => {
    const footerEl = footerRef.current;
    const scrollerEl = scrollerRef.current;
    if (!footerEl || !scrollerEl) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
        const maxScrollLeft = scrollerEl.scrollWidth - scrollerEl.clientWidth;
        const prev = scrollerEl.scrollLeft;
        const next = Math.min(maxScrollLeft, Math.max(0, prev + e.deltaY));
        if (next !== prev) {
          scrollerEl.scrollLeft = next;
          e.preventDefault();
        }
      }
    };
    footerEl.addEventListener("wheel", onWheel, { passive: false });
    return () => footerEl.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div ref={rootRef} className="relative min-h-screen w-full bg-[#E6EBEE] overflow-hidden">
      {/* Subtle soft vignettes to match the screenshot */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-10 -left-10 w-[60vw] h-[60vw] rounded-full"
          style={{ background: "#FFFFFF", opacity: 0.4, filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-[15vh] right-[-10vw] w-[70vw] h-[30vw] rounded-full"
          style={{ background: "#C1CFD4", opacity: 0.35, filter: "blur(80px)" }}
        />
      </div>

      {/* Navbar */}
      <div className="relative z-50">
        <Navbar flat />
      </div>

      {/* Content */}
      <div ref={scrollerRef} className=" relative z-10 overflow-x-auto overflow-y-hidden touch-pan-x overscroll-x-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className=" inline-flex pl-6 sm:pl-0">
          {/* Panel 1 */}
          <main className="w-screen mr-6 sm:mr-0">
            <div className="mx-auto max-w-[1126px] px-6 pt-[calc(4rem_+_env(safe-area-inset-top))]">
              <div className="min-h-[calc(100vh_-_4rem_-_env(safe-area-inset-top))] sm:min-h-[calc(100vh_-_4rem_-_env(safe-area-inset-top)_-_var(--footer-h,56px))] flex flex-col justify-center py-8 sm:py-12 items-center">
                {/* Lead heading */}
                <section className="mb-8 sm:mb-4 select-none w-full sm:w-[78vw] md:w-[60vw] lg:w-[52vw]">
                  <h1 className="font-body text-[clamp(18px,5vw,30px)] leading-[150%] tracking-[-0.6px] font-[300] text-[#CBD1D6]">
                    Grounded in <span className="font-[400] text-[#B0BDC5]">innovation and impact</span>,
                    <br className="hidden sm:block" /> we partner with <span className="font-[400] text-[#B0BDC5]">next-gen entrepreneurs </span>
                    <br className="hidden sm:block" />
                    with ideas <span className="block sm:inline">to elevate the collective</span>
                  </h1>
                </section>

                {/* Hero image card */}
                <section className="pt-12 sm:pt-6 md:pt-6 mb-3">
                  <div className="relative w-full sm:w-[78vw] md:w-[60vw] lg:w-[52vw] h-[40vh] sm:h-auto min-h-[280px] overflow-hidden rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.20)] border border-white/20 bg-white/20 backdrop-blur-md">
                    <img
                      src={ridelinkImg}
                      alt="RIDELINK showcase"
                      className="block w-full h-full object-cover object-left"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </section>

                {/* Title + description */}
                <section className="mb-2 w-full sm:w-[78vw] md:w-[60vw] lg:w-[52vw]">
                  <h1 className="text-[23px] leading-[35px] font-display text-md text-[#9EA5AD]">RIDELINK</h1>
                  <p className="mt-1 font-body text-lg text-[#B8C1CB]">
                    University ridesharing, reimagined from the inside out.
                  </p>
                </section>

                {/* Boxed tags row */}
                <section className="mb-4">
                </section>

                {/* Large empty glass input-like card (reduced height on small screens) */}
              </div>
            </div>
          </main>
 

          {/* Panel 2 */}
          <main className=" w-screen mr-6 sm:mr-0">
            <div className=" mx-auto max-w-[1126px] px-6 pt-[calc(4rem_+_env(safe-area-inset-top))]">
              <section className="min-h-[calc(100vh_-_4rem_-_env(safe-area-inset-top))] sm:min-h-[calc(100vh_-_4rem_-_env(safe-area-inset-top)_-_var(--footer-h,56px))] grid content-center grid-cols-1 lg:grid-cols-[420px_1fr] gap-5 sm:gap-8">
              {/* Left text column */}
              <div>
                <p className=" font-subheading text-[12px] sm:text-[14px] leading-[16.8px] font-semibold text-[#B0BDC5] uppercase">Technology</p>
                <h3 className="mt-2 font-display text-[24px] sm:text-[32px] md:text-[40px] text-[#9EA5AD] tracking-[-0.02em]">RIDE-LINK</h3>
                <p className="mt-3 sm:mt-4 font-body text-[15px] sm:text-[17px] leading-relaxed text-[#9EA5AD]">
                  Ride-Link is a ride-sharing platform for college students, connecting them with affordable,
                  accessible, and reliable transportation. By fostering a trusted community network, Ride-Link makes
                  student travel seamless, secure, and community driven.
                </p>
                <p className="mt-3 sm:mt-4 font-body text-[15px] sm:text-[17px] leading-relaxed text-[#9EA5AD]">
                  As Ride-Link branding partner, SKULPT helped the start-up find internal alignment through workshops,
                  delivering brand assets, styleguide and pitch-ready decks for fundraising.
                </p>

                <div className="mt-6">
                  <p className="font-subheading text-[10px] tracking-[0.14em] uppercase text-[#9EA5AD]">Key Deliverables</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      "Brand Positioning",
                      "Branding Design",
                      "Tone of Voice",
                      "Creative Workshops",
                      "Styleguide",
                      "Pitch Deck",
                    ].map((item) => (
                      <span
                        key={item}
                        className="inline-flex px-3 py-[6px] rounded-[3.484px] bg-[#CBD1D6] text-[10px] text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right image/card column */}
              <div className="pb-8 flex items-center justify-center">
                <div className="w-full h-[100%] sm:h-[300px] md:h-[380px] rounded-[28px] border border-[#C9D0D4]/50 bg-[#ECEAE8] flex items-center justify-center">
                  <img
                    src={ridelink2Img}
                    alt="Ridelink mark"
                    className="rounded-[inherit] w-full object-contain"
                    style={{ maxWidth: "100%" }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              </section>
            </div>
          </main>

          {/* Panel 3 */}
          <main className=" w-screen mr-6 sm:mr-0">
            <div className="mx-auto max-w-[1126px] px-12 pt-[calc(4rem_+_env(safe-area-inset-top))]">
              <section className="pb-16 min-h-[calc(100vh_-_4rem_-_env(safe-area-inset-top))] sm:min-h-[calc(100vh_-_4rem_-_env(safe-area-inset-top)_-_var(--footer-h,56px))] flex flex-col justify-center">
                {/* Header */}
                <div className="mb-0">
                  <h2 className=" pt-4 font-subcursive italic text-[28px] sm:text-[36px] leading-tight text-[#B8C1CB]">
                    Riley Link<span className="not-italic font-body text-[#CBD1D6]">, 21</span>
                  </h2>
                  <p className="mt-2 font-body text-[14px] sm:text-[24px] md:text-[28px] text-[#B0BDC5]">
                    University of North Carolina at Chapel Hill<span className="opacity-60"> .</span>
                  </p>
                </div>

                {/* Content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8">
                  {/* Left avatar */}
                  <div className="p-4 flex items-start justify-center lg:justify-start">
                    <div className="rounded-full bg-white/90 border border-white/40 w-[120px] h-[120px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] overflow-hidden flex items-center justify-center">
                      <img
                        src={ridelinkPfp}
                        alt="Riley Link"
                        className="w-full h-full object-contain p-5 sm:p-8 md:p-10"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>

                  {/* Right text */}
                  <div className="max-w-[640px]">
                    <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[150px_1fr] gap-x-4 gap-y-2 mb-6">
                      <span className="font-eyebrow uppercase text-[8px] tracking-[0.14em] text-[#CBD1D6]">Key Personality Traits</span>
                      <span className="font-subheading text-[10px] sm:text-[13px] md:text-sm text-[#808890]">Charismatic, Innovative, Empathetic, Curious, Dependable.</span>
                      <span className="font-eyebrow uppercase text-[8px] tracking-[0.14em] text-[#CBD1D6]">Core Values</span>
                      <span className="font-subheading text-[10px] sm:text-[13px] md:text-sm text-[#808890]">Compassion, Reliability, Trust</span>
                    </div>

                    <p className="font-subheading text-[13px] sm:text-[15px] md:text-[16px] leading-5 text-[#9EA5AD]">
                      Riley is a natural networker—one of those friends who seems to get along with everyone and always knows someone in a group. He is also an entrepreneur at heart. Riley is always looking for ways to simplify and innovate, whether it’s coming up with a new system to organize his homework or creating a beta product for a self-charging toothbrush. He is the type of person who seizes opportunities as soon as he spots them and loves seeing his ideas come to life through hard work and creative thinking.
                    </p>
                    <p className="mt-4 font-subheading text-[13px] sm:text-[15px] md:text-[16px] leading-5 text-[#9EA5AD]">
                      Riley is also dependable and deeply values his relationships. If you’re ever in a sticky situation, whether he has class at 8 a.m. the next morning or not, Riley will always be there to help a friend in need. He’s a helping hand and a shoulder to lean on, drawing energy from supporting others and seeing them succeed.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </main>

          {/* Panel 4 */}
          <main className="w-screen mr-6 sm:mr-0">
            <div className="mx-auto max-w-[1126px] px-6 pt-[calc(4rem_+_env(safe-area-inset-top))]">
              {/* Align toward top to match screenshot */}
              <section className="min-h-[calc(100vh_-_4rem_-_env(safe-area-inset-top))] sm:min-h-[calc(100vh_-_4rem_-_env(safe-area-inset-top)_-_var(--footer-h,56px))] grid content-start">
                <div className="mt-4 sm:mt-10">
                  {/* Large headline */}
                  <h2 className=" pt-10 sm:pt-20 font-subcursive italic text-[30px] sm:text-[48px] md:text-[64px] leading-[1.08] tracking-[-0.02em] text-[#B8C1CB]">
                    University Ridesharing,
                  </h2>
                  <p className="mt-1 font-body text-[24px] sm:text-[40px] md:text-[52px] leading-[1.05] font-[300] tracking-[-0.01em] text-[#CBD1D6]">
                    reimagine from the inside out.
                  </p>

                  {/* Eyebrow line */}
                  <p className="mt-6 sm:mt-10 font-display uppercase text-[16px] sm:text-[24px] tracking-[-0.018em] text-[#B0BDC5]" style={{ letterSpacing: '-1.086px' }}>
                    YOUR RIDE<span className="text-[#CBD1D6]">, YOUR WAY.</span>
                  </p>

                  {/* Body copy */}
                  <div className="mt-3 sm:mt-4 max-w-[640px]">
                    <p className="font-subheading text-[16px] sm:text-[18px] leading-[1.7] text-[#B0BDC5]">
                      Ride-Link set out to solve one of the biggest problems for college students: getting
                      home during university holidays. The idea: that students could ride share through an
                      app—cutting costs, reducing environmental impact, and building a stronger campus community.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </main>

          {/* Panel 5 */}
          <main className="w-screen mr-6 sm:mr-0">
            <div className="mx-auto max-w-[1226px] px-6 pt-[calc(4rem_+_env(safe-area-inset-top))]">
              <section className="min-h-[calc(100vh_-_4rem_-_env(safe-area-inset-top))] sm:min-h-[calc(100vh_-_4rem_-_env(safe-area-inset-top)_-_var(--footer-h,56px))] grid content-start grid-cols-1 lg:grid-cols-[1fr_460px] gap-6 sm:gap-8 mt-6 sm:mt-14">
                {/* Left text column */}
                <div className=" max-w-[720px]">
                  <h2 className=" pt-28 sm:pt-16 font-subcursive italic text-[28px] sm:text-[44px] md:text-[58px] leading-[1.08] tracking-[-0.02em] text-[#B8C1CB]">
                    On the skulpting process,
                  </h2>
                  <p className="pb-6 sm:pb-12 mt-1 font-body text-[22px] sm:text-[32px] md:text-[44px] leading-[1.05] font-[300] tracking-[-0.01em] text-[#CBD1D6]">
                    reimagine from the inside out.
                  </p>

                  <p className="mt-4 sm:mt-8 font-subheading text-[15px] sm:text-[18px] leading-[1.7] text-[#B0BDC5] max-w-[560px]">
                    Skulpting Ride-Link was especially meaningful to us because as college students at the time, we
                    knew firsthand the problem it aimed to solve. That personal connection to Ride-Link’s mission
                    made the skulpting process even more rewarding.
                  </p>

                  {/* Quote */}
                  <div className="pt-6 sm:pt-12 mt-6 sm:mt-10 flex items-start gap-4">
                    <div className="w-[45px] h-[45px] flex-shrink-0 rounded-full bg-white/90 border border-white/40 overflow-hidden flex items-center justify-center">
                      <img
                        src={ridelinkPfp}
                        alt="Ride-Link"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div>
                      <p className="font-subheading text-[13px] sm:text-[15px] leading-5 text-[#9EA5AD]">
                        “I was positively surprised by how quickly you guys pulled the deliverables together. I didn’t
                        know you picked up on all that information that I threw at you in like one or two meetings, but
                        you did.”
                      </p>
                      <p className="mt-2 text-[14px] font-subheading text-[#B0BDC5]">Shuban Gouru, Founder, Ride-Link</p>
                    </div>
                  </div>
                </div>

                {/* Right image slideshow (auto cycles every 3s with blur transition) */}
              <div className="lg:pl-4">
                <div className="w-full max-w-[480px] lg:max-w-[420px] ml-auto">
                  {/* Mobile: slideshow */}
                  <div className="lg:hidden">
                    <BlurSlideshow images={[yourrideImg, thefutureImg, ridelinkImg]} />
                  </div>
                  {/* Desktop: stacked images */}
                  <div
                    className="hidden lg:flex lg:flex-col lg:gap-6"
                    style={{
                      height:
                        "calc(100vh - 4rem - env(safe-area-inset-top) - var(--footer-h,56px) - 80px)",
                    }}
                  >
                    {[yourrideImg, thefutureImg, ridelinkImg].map((src, i) => (
                      <div
                        key={i}
                        className="flex-1 min-h-0 rounded-3xl overflow-hidden border border-white/25 bg-white/25 backdrop-blur-md"
                      >
                        <img
                          src={src}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              </section>
            </div>
          </main>

          {/* Panel 6 */}
          <main className="w-screen mr-6 sm:mr-0">
            <div className="mx-auto max-w-[1226px] px-6 pt-[calc(4rem_+_env(safe-area-inset-top))]">
              <section className="min-h-[calc(100vh_-_4rem_-_env(safe-area-inset-top))] sm:min-h-[calc(100vh_-_4rem_-_env(safe-area-inset-top)_-_var(--footer-h,56px))] grid content-start grid-cols-1 lg:grid-cols-[1fr_460px] gap-6 sm:gap-8 mt-6 sm:mt-14">
                {/* Left text column */}
                <div className=" max-w-[720px]">
                  <h2 className=" pt-28 sm:pt-16 font-subcursive italic text-[28px] sm:text-[44px] md:text-[58px] leading-[1.08] tracking-[-0.02em] text-[#B8C1CB]">
                    After the skulpting process,
                  </h2>
                  <p className="pb-6 sm:pb-12 mt-1 font-body text-[22px] sm:text-[32px] md:text-[44px] leading-[1.05] font-[300] tracking-[-0.01em] text-[#CBD1D6]">
                    a partnership were born.
                  </p>

                  <p className="mt-4 sm:mt-8 font-subheading text-[15px] sm:text-[18px] leading-[1.7] text-[#B0BDC5] max-w-[560px]">
                    After Skulpting, the transformation of Ride-Link was deep and meant to last for generations of
                    college students needing to use its services.
                  </p>

                  {/* Quote */}
                  <div className="pt-6 sm:pt-12 mt-6 sm:mt-10 flex items-start gap-4">
                    <div className="w-[45px] h-[45px] flex-shrink-0 rounded-full bg-white/90 border border-white/40 overflow-hidden flex items-center justify-center">
                      <img
                        src={ridelinkPfp}
                        alt="Ride-Link"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div>
                      <p className="font-subheading text-[13px] sm:text-[15px] leading-5 text-[#9EA5AD]">
                        “Riley was perfect. That one persona embodied the tone, the voice, the values—everything of
                        this organization. I didn’t even know you needed something like that.”
                      </p>
                      <p className="mt-2 text-[14px] font-subheading text-[#B0BDC5]">Shuban Gouru, Founder, Ride-Link</p>
                    </div>
                  </div>
                </div>

                {/* Right image slideshow (auto cycles every 3s with blur transition) */}
              <div className="lg:pl-4">
                <div className="pt-8 lg:pt-0 lg:mt-0 w-full max-w-[480px] lg:max-w-[420px] ml-auto">
                  {/* Mobile: slideshow */}
                  <div className="lg:hidden">
                    <BlurSlideshow images={[process1Img, process2Img, process3Img]} />
                  </div>
                  {/* Desktop: stacked images */}
                  <div
                    className="hidden lg:flex lg:flex-col lg:gap-6"
                    style={{
                      height:
                        "calc(100vh - 4rem - env(safe-area-inset-top) - var(--footer-h,56px) - 80px)",
                    }}
                  >
                    {[process1Img, process2Img, process3Img].map((src, i) => (
                      <div
                        key={i}
                        className="flex-1 min-h-0 rounded-3xl overflow-hidden border border-white/25 bg-white/25 backdrop-blur-md"
                      >
                        <img
                          src={src}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              </section>
            </div>
          </main>

          {/* Mobile: Stacked Books Panel */}
          <main className="w-screen sm:hidden">
            <div className="mx-auto max-w-[1126px] px-6 pt-[calc(4rem_+_env(safe-area-inset-top))]">
              <section className="min-h-[calc(100vh_-_4rem_-_env(safe-area-inset-top))] flex flex-col justify-center py-8">
                <div className="space-y-6">
                  <img
                    src={pitchdeckImg}
                    alt="Pitch Deck"
                    className="w-full max-w-[280px] mx-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    src={playbookImg}
                    alt="Playbook"
                    className="w-full max-w-[280px] mx-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    src={workshopNotebookImg}
                    alt="Workshop Notebook"
                    className="w-full max-w-[280px] mx-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    src={brandguidelinesImg}
                    alt="Brand Guidelines"
                    className="w-full max-w-[280px] mx-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                
                {/* Let's Connect underneath */}
                <div className="mt-12 text-center">
                  <Link
                    to="/contact"
                    className="text-[22px] group inline-flex items-center gap-2 text-[#B0BDC5] hover:text-[#9EA5AD] transition-colors"
                  >
                    <span className="font-subheading">Let's</span>
                    <span className="font-subcursive text-[#C1CFD4] italic">Connect</span>
                    <img
                      src={arrowSvg}
                      className="-rotate-45 w-6 h-6 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      alt="→"
                    />
                  </Link>
                </div>
              </section>
            </div>
          </main>

          {/* Desktop: Individual Book Panels */}
          {/* Panel 7 - Pitch Deck */}
          <main className="hidden sm:block w-[90vw] sm:w-[85vw]">
            <div className="mx-auto max-w-[1126px] px-6 pt-[calc(4rem_+_env(safe-area-inset-top))]">
              <section className="relative min-h-[calc(100vh_-_4rem_-_env(safe-area-inset-top)_-_var(--footer-h,56px))] grid content-center">
                <div className="flex items-center justify-center w-full h-full">
                  <img
                    src={pitchdeckImg}
                    alt="Pitch Deck"
                    className="max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] w-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </section>
            </div>
          </main>

          {/* Panel 8 - Playbook */}
          <main className="hidden sm:block w-[90vw] sm:w-[85vw]">
            <div className="mx-auto max-w-[1126px] px-6 pt-[calc(4rem_+_env(safe-area-inset-top))]">
              <section className="relative min-h-[calc(100vh_-_4rem_-_env(safe-area-inset-top)_-_var(--footer-h,56px))] grid content-center">
                <div className="flex items-center justify-center w-full h-full">
                  <img
                    src={playbookImg}
                    alt="Playbook"
                    className="max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] w-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </section>
            </div>
          </main>

          {/* Panel 9 - Workshop Notebook */}
          <main className="hidden sm:block w-[90vw] sm:w-[85vw]">
            <div className="mx-auto max-w-[1126px] px-6 pt-[calc(4rem_+_env(safe-area-inset-top))]">
              <section className="relative min-h-[calc(100vh_-_4rem_-_env(safe-area-inset-top)_-_var(--footer-h,56px))] grid content-center">
                <div className="flex items-center justify-center w-full h-full">
                  <img
                    src={workshopNotebookImg}
                    alt="Workshop Notebook"
                    className="max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] w-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </section>
            </div>
          </main>

          {/* Panel 10 - Brand Guidelines with Let's Connect */}
          <main className="hidden sm:block w-[110vw] sm:w-[85vw] pr-[20vw]">
            <div className="mx-auto max-w-[1126px] px-6 pt-[calc(4rem_+_env(safe-area-inset-top))]">
              <section className="relative min-h-[calc(100vh_-_4rem_-_env(safe-area-inset-top)_-_var(--footer-h,56px))] grid content-center">
                <div className="flex items-center justify-center w-full h-full">
                  <img
                    src={brandguidelinesImg}
                    alt="Brand Guidelines"
                    className="max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] w-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Bottom-right call to action */}
                <div className="absolute bottom-[calc(var(--footer-h,56px)+16px)] left-[6vw] sm:left-[50vw]">
                  <Link
                    to="/contact"
                    className="text-[22px] sm:text-[36px] md:text-[44px] group inline-flex items-center gap-2 text-[#B0BDC5] hover:text-[#9EA5AD] transition-colors"
                  >
                    <span className="font-subheading">Let's</span>
                    <span className="font-subcursive text-[#C1CFD4] italic">Connect</span>
                    <img
                      src={arrowSvg}
                      className="-rotate-45 w-6 h-6 md:w-8 md:h-8 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      alt="→"
                    />
                  </Link>
                </div>
              </section>
            </div>
          </main>

        </div>
      </div>

      {/* Sticky Footer (compact) - hidden on mobile */}
      <div ref={footerRef} className="hidden sm:block fixed inset-x-0 bottom-0 z-40">
        <Footer compact mobileRowNav />
      </div>
    </div>
  );
};

export default Skulpted;
