import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer, CloudyBackground, SplineBlob, Seo } from "@components";
import { StrategyCircle, TeamSection, useMobileDetect } from "@features/skulpting";
import skulpting2Video from "@assets/videos/skulpting2.mp4";
import arrowUrl from "@assets/arrow.svg";

export default function SkulptingPage() {
  const [shouldLoadBlob, setShouldLoadBlob] = useState(false);
  const [shouldLoadVideos, setShouldLoadVideos] = useState(false);
  const blobRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const marqueeVideoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useMobileDetect();

  // Intersection Observer for lazy loading the Spline blob
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadBlob(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (blobRef.current) {
      observer.observe(blobRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Video time synchronization for marquee
  useEffect(() => {
    const v = marqueeVideoRef.current;
    if (!v) return;

    const setToThree = () => {
      try {
        if (v.currentTime < 2.9 || v.currentTime > 3.1) v.currentTime = 3;
      } catch {
        // Ignore errors setting currentTime
      }
    };

    const onLoadedMeta = () => setToThree();
    const onPlay = () => setToThree();
    const onTimeUpdate = () => {
      if (v.currentTime < 2.8) setToThree();
    };

    v.addEventListener("loadedmetadata", onLoadedMeta);
    v.addEventListener("play", onPlay);
    v.addEventListener("timeupdate", onTimeUpdate);
    if (v.readyState >= 1) setToThree();

    return () => {
      v.removeEventListener("loadedmetadata", onLoadedMeta);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [shouldLoadVideos]);

  // Intersection Observer for lazy loading videos
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideos(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Seo
        title="About SKULPT | Skulpting"
        description="Meet SKULPT: a strategy-first brand partner for early-stage founders. Learn our process across strategy, alignment, and expression."
        path="/skulpting"
        type="website"
      />
      <div className="relative scale-[1] min-h-screen w-full bg-[#E6EBEE] overflow-y-auto overflow-x-hidden">
        {/* Background clouds */}
        <div className="absolute inset-0 z-0 min-h-[300vh]">
          <CloudyBackground zIndex={0} height="300vh" />
        </div>

        {/* Navbar */}
        <div className="relative z-50">
          <Navbar />
        </div>

        {/* Hero section with blob */}
        <section className="relative min-h-screen">
          <div
            ref={blobRef}
            className="absolute inset-0 z-10 grid place-items-center"
          >
            <div
              className="relative size-[min(175vw,175svh)] translate-x-[-26%] sm:size-[min(165vw,165svh)] scale-[2.75] sm:translate-x-[-4%] md:size-[160vmin] md:scale-[1.5] md:translate-x-0 md:translate-y-8 lg:size-[160vmin] lg:scale-[2] lg:-translate-y-[23%] lg:-translate-x-36 xl:size-[180vmin]"
              style={{
                filter: shouldLoadBlob ? "blur(3px)" : "blur(0px)",
                transition: "filter 0.3s ease-in-out",
                willChange: "transform, filter",
              }}
            >
              {shouldLoadBlob ? (
                <SplineBlob
                  url="https://my.spline.design/untitled-joeso1Tv4ZyNsbizJR3r5kQz/?ui=0"
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#9EA5AD]/20 to-[#CBD1D6]/10 rounded-full animate-pulse" />
              )}
            </div>
          </div>

          <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center pointer-events-none select-none pt-16 md:pt-0">
            <h1 className="font-subheading text-[#9EA5AD] text-[28.2px] leading-[190%] tracking-[-0.8px] font-normal">
              What are we skulpting today?
            </h1>
          </div>
        </section>

        {/* Text boxes */}
        <section className="relative z-10 py-32 mx-auto max-w-4xl font-subheading text-left">
          <div className="flex flex-col items-center space-y-16">
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 flex justify-end cursor-pointer lg:ml-[400px] transition-all duration-300 ease-in-out hover:text-[#7A8289] text-[#B8C1CB]">
              <p className="lg:text-[24px] text-[20px] leading-[120%] tracking-[-0.8px] font-normal max-w-xl text-right">
                SKULPT is a brand partner for early-stage founders who
                <br />
                would rather be understood than positioned.
                <br />
                Skulpting helps reconnect founders, team members, and audiences to a
                long-lasting brand built with intention.
              </p>
            </div>

            <div className="py-32 lg:py-12 w-full px-4 sm:px-6 md:px-8 lg:px-10 flex lg:mr-[400px] flex-col items-start cursor-pointer transition-all duration-300 ease-in-out hover:text-[#7A8289] text-[#B8C1CB]">
              <p className="lg:text-[24px] text-[20px] leading-[120%] tracking-[-0.8px] font-normal lg:max-w-2xl text-left">
                Somewhere in between coffee chats, Post-it notes, and heart-to-heart
                conversations, we realized most startups are asking the wrong questions.
              </p>
              <br />
              <p className="lg:text-[24px] text-[20px] leading-[120%] tracking-[-0.8px] font-normal max-w-md">
                &ldquo;Do we need a better logo?&rdquo;
                <br />
                &ldquo;Maybe our website needs updating?&rdquo;
                <br />
                &ldquo;Should we change the color palette?&rdquo;
              </p>
              <br />
              <p className="lg:text-[24px] text-[20px] leading-[120%] tracking-[-0.8px] font-normal lg:max-w-2xl">
                It was clear to us that these questions wouldn't solve the numerous
                make-or-break crises that startups face.
              </p>
              <br />
              <p className="lg:text-[24px] text-[20px] leading-[120%] tracking-[-0.8px] font-normal max-w-md">
                But an aligned team can.
              </p>
            </div>
          </div>
        </section>

        {/* Video marquee */}
        <section className="relative z-10 w-full mx-0 px-0 py-0 sm:py-16 sm:mx-auto sm:max-w-6xl sm:px-4 lg:px-0">
          <div
            ref={videoRef}
            className="relative overflow-visible rounded-none sm:rounded-3xl"
          >
            <div
              className="relative h-[65vh] sm:h-auto py-12"
              style={{
                WebkitMaskImage: isMobile
                  ? "radial-gradient(ellipse 70% 55% at center, black 35%, rgba(0,0,0,0.8) 55%, transparent 95%)"
                  : "radial-gradient(ellipse 50% 50% at center, black 60%, transparent 100%)",
                maskImage: isMobile
                  ? "radial-gradient(ellipse 70% 55% at center, black 35%, rgba(0,0,0,0.8) 55%, transparent 95%)"
                  : "radial-gradient(ellipse 50% 50% at center, black 60%, transparent 100%)",
              }}
            >
              {shouldLoadVideos ? (
                <video
                  ref={marqueeVideoRef}
                  src={skulpting2Video}
                  className="w-full h-full object-cover opacity-80 transform-gpu"
                  style={{
                    filter: isMobile ? "blur(18px)" : "blur(8px)",
                    willChange: "transform",
                    transform: isMobile ? "scale(1.5)" : "scale(1.1)",
                  }}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-[#9EA5AD]/30 to-[#CBD1D6]/20 animate-pulse" />
              )}
              <div className="absolute inset-0 bg-[#9EA5AD] mix-blend-multiply opacity-20" />
            </div>

            {/* Scrolling text overlay */}
            <div
              className="absolute inset-0 flex items-center pointer-events-none"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              }}
            >
              <div className="marquee-scroll whitespace-nowrap font-subheading text-[#9EA5AD] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="mr-16">
                  Brand Identity Development&nbsp;&nbsp;&nbsp;Team
                  Alignment&nbsp;&nbsp;&nbsp;Visual Design
                  Development&nbsp;&nbsp;&nbsp;Brand Messaging&nbsp;&nbsp;&nbsp;Pitch
                  Deck
                </span>
                <span className="mr-16" aria-hidden="true">
                  Brand Identity Development&nbsp;&nbsp;&nbsp;Team
                  Alignment&nbsp;&nbsp;&nbsp;Visual Design
                  Development&nbsp;&nbsp;&nbsp;Brand Messaging&nbsp;&nbsp;&nbsp;Pitch
                  Deck
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Make it make Sense callout */}
        <section className="relative z-10 py-24 mx-auto max-w-6xl px-4 sm:px-6 md:px-0 flex justify-end">
          <Link
            to="/skulpted"
            className="font-body text-[#CBD1D6] text-2xl sm:text-3xl md:text-4xl lg:text-5xl inline-flex items-center gap-2 group select-none"
          >
            <span>
              Make it{" "}
              <em className="text-[#C1CFD4] font-subcursive">make</em>{" "}
              <span className="text-[#C1CFD4] font-subcursive">Sense</span>
            </span>
            <img
              src={arrowUrl}
              alt="arrow"
              className="inline-block w-5 h-5 -rotate-45 scale-150 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </section>

        {/* Strategy Circle */}
        <StrategyCircle isMobile={isMobile} shouldLoadVideos={shouldLoadVideos} />

        {/* Unity Vision */}
        <section className="relative z-10 py-48 flex items-center justify-center">
          <div className="relative w-full max-w-[720px] aspect-square flex items-center justify-center">
            <div
              className="absolute inset-0"
              style={{
                borderRadius: "490.079px",
                background: "rgba(193, 207, 212, 0.53)",
                filter: "blur(25px)",
              }}
            />
            <div className="relative z-10 px-6 text-center select-none">
              <p className="font-display text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
                WE'RE UNITED
                <br />
                BY A SINGULAR VISION
                <br />
                <span className="font-display italic text-white/80">to </span>{" "}
                <span className="font-bodycursive italic text-[#9EA5AD]">
                  create
                  <span className="font-display italic text-white/80">WITH </span>
                </span>{" "}
                <span className="font-bodycursive italic text-[#9EA5AD]">intention</span>
              </p>
            </div>
          </div>
        </section>

        {/* Team Clock Section */}
        <TeamSection isMobile={isMobile} />

        <Footer />
      </div>
    </>
  );
}

