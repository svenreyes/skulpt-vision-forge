import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { CloudyBackground } from "../components/CloudyBackground";
import { SplineBlob } from "../components/SplineBlob";
import skulptVideo from "@/assets/videos/skulpting.mp4";
import skulpting2Video from "@/assets/videos/skulpting2.mp4";
import arrowUrl from "../assets/arrow.svg";
import exUrl from "../assets/ex.svg";

// Team member images
import anaisaImg from "@/assets/skulpting/anaisa 1.png";
import freyaImg from "@/assets/skulpting/freya 1.png";
import jaclynImg from "@/assets/skulpting/jaclyn 1.png";
import leaImg from "@/assets/skulpting/lea 1.png";
import luciaImg from "@/assets/skulpting/lucia 1.png";
import svenImg from "@/assets/skulpting/sven 1.png";
import { Footer } from "@/components/Footer";


const Skulpting: React.FC = () => {
  const [activeAxis, setActiveAxis] = useState<'strategy' | 'alignment' | 'external' | 'internal'>('strategy');
  const [displayAxis, setDisplayAxis] = useState<'strategy' | 'alignment' | 'external' | 'internal'>('strategy');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [stockholmTime, setStockholmTime] = useState(new Date());
  const [shouldLoadBlob, setShouldLoadBlob] = useState(false);
  const [shouldLoadVideos, setShouldLoadVideos] = useState(false);
  const blobRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const marqueeVideoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    if (mq.addEventListener) {
      mq.addEventListener('change', onChange);
    } else {
      // @ts-ignore
      mq.addListener(onChange);
    }
    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', onChange);
      } else {
        // @ts-ignore
        mq.removeListener(onChange);
      }
    };
  }, []);
  const team = [
    { name: 'ANAISA ACHARYA', src: anaisaImg },
    { name: 'JACLYN PHAM', src: jaclynImg },
    { name: 'FREYA LINDSVIST', src: freyaImg },
    { name: 'LEA KIENLE', src: leaImg },
    { name: 'SVEN REYES', src: svenImg },
    { name: 'LUCIA JUEGUEN', src: luciaImg },
  ];

  // Stable per-mount randomness for height/scale/offset variety
  const figures = useMemo(
    () =>
      team.map((m) => ({
        ...m,
        scale: +(0.95 + Math.random() * 0.30).toFixed(2),
        yOffset: Math.floor(-24 + Math.random() * 48),
        xOffset: Math.floor(-8 + Math.random() * 16),
      })),
    []
  );

  const axisCopy: Record<'strategy' | 'alignment' | 'external' | 'internal', string> = {
    strategy:
      "We begin at the root. <span class='font-semibold text-white'>Who are you, really?</span><br />Asking the questions most founders skip; we surface your values, story, and belief system to set the foundation your brand stand on",
    internal:
      "Through guided, immersive workshops, we <span class='font-bold text-white'> shape how you show up,</span> and ensure your clients, community, investors, and mom get it.<br />Internal branding is our differential step and SKULPT's expertise",
    alignment:
      "From tone to visual identity, we translate strategy into tangible elements the world can see and feel. Nothing is arbitrary.<br />Every decision is <span class='font-bold text-white'>grounded in your truth</span>",
    external:
      "We bring your company into complete focus. This is where <span class='font-bold text-white'> alignment happens </span>, connecting purpose with people. Voice with vision. We work deep, intentional, and focused on longevity and growth",
  };

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setDisplayAxis(activeAxis);
      setIsTransitioning(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [activeAxis]);

  // Update Stockholm time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setStockholmTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for lazy loading the Spline blob
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadBlob(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (blobRef.current) {
      observer.observe(blobRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Start marquee video at 3s and keep looping from there
  useEffect(() => {
    const v = marqueeVideoRef.current;
    if (!v) return;

    const setToThree = () => {
      try {
        if (v.currentTime < 2.9 || v.currentTime > 3.1) v.currentTime = 3;
      } catch {}
    };

    const onLoadedMeta = () => setToThree();
    const onPlay = () => setToThree();
    // With loop enabled, 'ended' won't fire. Use timeupdate guard to snap to 3s.
    const onTimeUpdate = () => {
      if (v.currentTime < 2.8) setToThree();
    };

    v.addEventListener('loadedmetadata', onLoadedMeta);
    v.addEventListener('play', onPlay);
    v.addEventListener('timeupdate', onTimeUpdate);
    // If metadata already loaded
    if (v.readyState >= 1) setToThree();

    return () => {
      v.removeEventListener('loadedmetadata', onLoadedMeta);
      v.removeEventListener('play', onPlay);
      v.removeEventListener('timeupdate', onTimeUpdate);
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
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative scale-[1] min-h-screen w-full bg-[#E6EBEE] overflow-y-auto overflow-x-hidden">
      {/* Background clouds (bottom layer) - extends full height */}
      <div className="absolute inset-0 z-0 min-h-[300vh]">
        <CloudyBackground zIndex={0} height="300vh" />
      </div>

      {/* Navbar (top UI layer) */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* First section with blob and center text */}
      <section className="relative min-h-screen">
        {/* Interactive Spline blob (middle layer) */}
        <div ref={blobRef} className="absolute inset-0 z-10 grid place-items-center">
          {/* Bigger canvas = bigger blob */}
          <div
            className="
              relative
              size-[min(175vw,175svh)] translate-x-[-26%]           /* xs */
              sm:size-[min(165vw,165svh)] scale-[2.75] sm:translate-x-[-4%]      /* sm */
              md:size-[160vmin] md:scale-[1.5] md:translate-x-0 md:translate-y-8   /* md desktop start */
              lg:size-[160vmin] lg:scale-[2] lg:-translate-y-[23%] lg:-translate-x-36  /* lg and up */
              xl:size-[180vmin]                                      /* xl: even larger */
            "
            style={{
              filter: shouldLoadBlob ? 'blur(3px)' : 'blur(0px)',
              transition: 'filter 0.3s ease-in-out',
              willChange: 'transform, filter'
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

        {/* Center text (let pointer events pass through) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center pointer-events-none select-none pt-16 md:pt-0">
          <h1 className="font-subheading text-[#9EA5AD] text-[24px] leading-[190%] tracking-[-0.8px] font-normal">
            What are we skulpting today?
          </h1>
          </div>
      </section>

      {/* Text boxes section */}
      <section className="relative z-10 py-32 mx-auto max-w-4xl font-subheading text-left">
        <div className="flex flex-col items-center space-y-16">
          {/* First text box */}
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 flex justify-end cursor-pointer lg:ml-[400px] transition-all duration-300 ease-in-out hover:text-[#7A8289] text-[#B8C1CB]">
            <p className="lg:text-[24px] text-[20px] leading-[120%] tracking-[-0.8px] font-normal max-w-xl text-right">
              SKULPT is a branding studio for early-stage founders who<br />
              would rather be understood than positioned.<br />
              Skulpting helps reconnect founders, team members, and audiences to a long-lasting brand built with intention.
            </p>
          </div>

          {/* Second text box */}
          <div className="py-32 lg:py-12 w-full px-4 sm:px-6 md:px-8 lg:px-10 flex lg:mr-[400px] flex-col items-start cursor-pointer transition-all duration-300 ease-in-out hover:text-[#7A8289] text-[#B8C1CB]">
            <p className="lg:text-[24px] text-[20px] leading-[120%] tracking-[-0.8px] font-normal lg:max-w-2xl text-left">
              Somewhere in between coffee chats, Post-it notes, and heart-to-heart conversations, we realized most startups are asking the wrong questions.
            </p>
            <br />
            <p className="lg:text-[24px] text-[20px] leading-[120%] tracking-[-0.8px] font-normal max-w-md">
              &ldquo;Do we need a better logo?&rdquo;<br />
              &ldquo;Maybe our website needs updating?&rdquo;<br />
              &ldquo;Should we change the color palette?&rdquo;
            </p>
            <br />
            <p className="lg:text-[24px] text-[20px] leading-[120%] tracking-[-0.8px] font-normal lg:max-w-2xl">
              It was clear to us that these questions wouldn't solve the numerous make-or-break crises that startups face.
            </p>
            <br />
            <p className="lg:text-[24px] text-[20px] leading-[120%] tracking-[-0.8px] font-normal max-w-md">
              But an aligned team can.
            </p>
          </div>
        </div>
      </section>

      {/* Video marquee section */}
      <section className="relative z-10 w-full mx-0 px-0 py-0 sm:py-16 sm:mx-auto sm:max-w-6xl sm:px-4 lg:px-0">
        <div ref={videoRef} className="relative overflow-hidden rounded-none sm:rounded-3xl">
          <div
            className="relative h-[60vh] sm:h-auto"
            style={{
              WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at center, black 60%, transparent 100%)',
              maskImage: 'radial-gradient(ellipse 50% 50% at center, black 60%, transparent 100%)',
            }}
          >
            {shouldLoadVideos ? (
              <video
                ref={marqueeVideoRef}
                src={skulpting2Video}
                className="w-full h-full object-cover opacity-80 scale-125 sm:scale-110 transform-gpu"
                style={{ 
                  filter: 'blur(8px)',
                  willChange: 'transform'
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
          {/* Overlay scrolling text */}
          <div
            className="absolute inset-0 flex items-center pointer-events-none"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            }}
          >
            <div
              className="marquee-scroll whitespace-nowrap font-subheading text-[#9EA5AD] text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            >
              <span className="mr-16">Brand Identity Development&nbsp;&nbsp;&nbsp;Team Alignment&nbsp;&nbsp;&nbsp;Visual Design Development&nbsp;&nbsp;&nbsp;Brand Messaging&nbsp;&nbsp;&nbsp;Pitch Deck</span>
              <span className="mr-16" aria-hidden="true">Brand Identity Development&nbsp;&nbsp;&nbsp;Team Alignment&nbsp;&nbsp;&nbsp;Visual Design Development&nbsp;&nbsp;&nbsp;Brand Messaging&nbsp;&nbsp;&nbsp;Pitch Deck</span>
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
            Make it <em className="text-[#C1CFD4] font-subcursive">make</em> <span className="text-[#C1CFD4] font-subcursive">Sense</span>
          </span>
          <img
            src={arrowUrl}
            alt="arrow"
            className="inline-block w-5 h-5 -rotate-45 scale-150 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>
      </section>

      {/* Strategy Circle Section */}
      <section className="relative z-10 lg:py-64 sm:py-16 mt-24 flex items-center justify-center px-4 sm:px-6">
        <div className="relative w-full max-w-[75vw] sm:max-w-[720px] aspect-square">
          {/* Layer stack: blue glow (largest) -> video (larger) -> outline */}
          {/* Larger blue glow with blurry edges */}
          <div
            className="absolute inset-0 overflow-visible flex items-center justify-center pointer-events-none"
          >
            <div
              className="rounded-full w-full h-full"
              style={{
                transform: 'scale(2.6,1.75)',
                WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at center, black 60%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 50% 50% at center, black 60%, transparent 100%)',
                backgroundColor: '#8297A9',
                mixBlendMode: 'multiply',
                opacity: 0.75,
                filter: 'blur(140px)'
              }}
            />
          </div>

          {/* Larger video with radial fade */}
          <div
            className="absolute inset-0 overflow-visible flex items-center justify-center"
          >
            <div
              className="rounded-full scale-[1.25] w-full h-full overflow-hidden"
              style={{
                WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at center, black 60%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 50% 50% at center, black 60%, transparent 100%)',
              }}
            >
              {shouldLoadVideos ? (
                <video
                  src={skulptVideo}
                  className="w-full h-full object-cover opacity-85 scale-110 transform-gpu"
                  style={{ 
                    filter: 'blur(8px)',
                    willChange: 'transform'
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

          {/* Circular outline split into 4 individually hover-able segments */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            {(() => {
              // Draw four equal arc segments (one per quadrant) without wrapping across the seam.
              // Use math so the visible dash length is exactly a quarter of the circumference.
              const r = 49;
              const circumference = 2 * Math.PI * r; // ~308
              const dash = circumference / 4;        // ~77
              // Center each segment on a cardinal direction by starting each dash halfway before it.
              return ([
                { key: 'strategy',  offset: dash * 2.5 }, // TOP label was highlighting bottom; swap so strategy controls top
                { key: 'external',  offset: dash * 1.5 }, // left (180°)
                { key: 'alignment', offset: dash * 0.5 }, // bottom label was highlighting top; swap so alignment controls bottom
                { key: 'internal',  offset: dash * 3.5 }, // right (0°/360°)
              ] as const).map(({ key, offset }) => (
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
                style={{ transition: 'stroke-opacity 0.2s ease' }}
                strokeLinecap="round"
              />
            ))
            })()}
          </svg>

          {/* Axis labels */}
          <span
            onMouseEnter={() => setActiveAxis('strategy')}
            className="absolute -top-6 left-1/2 -translate-x-1/2 cursor-pointer text-xs tracking-widest font-subheading select-none"
            style={{ color: activeAxis === 'strategy' ? '#FFFFFF' : 'rgba(255,255,255,0.6)' }}
          >
            STRATEGY
          </span>
          <span
            onMouseEnter={() => setActiveAxis('alignment')}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 cursor-pointer text-xs tracking-widest font-subheading select-none"
            style={{ color: activeAxis === 'alignment' ? '#FFFFFF' : 'rgba(255,255,255,0.6)' }}
          >
            ALIGNMENT
          </span>
          <span
            onMouseEnter={() => setActiveAxis('external')}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full sm:-left-20 sm:translate-x-0 -rotate-90 cursor-pointer text-xs tracking-widest font-subheading select-none"
            style={{ color: activeAxis === 'external' ? '#FFFFFF' : 'rgba(255,255,255,0.6)' }}
          >
            EXTERNAL
          </span>
          <span
            onMouseEnter={() => setActiveAxis('internal')}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-full sm:-right-20 sm:translate-x-0 rotate-90 cursor-pointer text-xs tracking-widest font-subheading select-none"
            style={{ color: activeAxis === 'internal' ? '#FFFFFF' : 'rgba(255,255,255,0.6)' }}
          >
            INTERNAL
          </span>

          {/* Dots (hidden when ex icon overlaps) */}
          {activeAxis !== 'strategy' && (
            <span
              className="absolute left-1/2 translate-y-4 -translate-x-1/2 bg-white rounded-full"
              style={{ width: 8, height: 8, top: 'calc(50% - 49% + 10px)' }}
            />
          )}
          {activeAxis !== 'alignment' && (
            <span
              className="absolute left-1/2 -translate-y-6 -translate-x-1/2 bg-white rounded-full"
              style={{ width: 8, height: 8, top: 'calc(50% + 49% - 10px)' }}
            />
          )}
          {activeAxis !== 'external' && (
            <span
              className="absolute top-1/2 translate-x-4 -translate-y-1/2 bg-white rounded-full"
              style={{ width: 8, height: 8, left: 'calc(50% - 49% + 10px)' }}
            />
          )}
          {activeAxis !== 'internal' && (
            <span
              className="absolute top-1/2 -translate-x-6 -translate-y-1/2 bg-white rounded-full"
              style={{ width: 8, height: 8, left: 'calc(50% + 49% - 10px)' }}
            />
          )}

          {/* X icon at top center */}
          <img
            src={exUrl}
            alt="x"
            className="absolute w-6 h-6 select-none pointer-events-none transition-all duration-700"
            style={{
              // Position relative to the true circle edge using its radius (49%).
              // Extra spacing so the ex sits further under the hovered label.
              top:
                activeAxis === 'strategy'
                  ? 'calc(50% - 49% + 48px)'
                  : activeAxis === 'alignment'
                  ? 'calc(50% + 49% - 48px)'
                  : '50%',
              left:
                activeAxis === 'external'
                  ? 'calc(50% - 49% + 48px)'
                  : activeAxis === 'internal'
                  ? 'calc(50% + 49% - 48px)'
                  : '50%',
              transform: 'translate(-50%,-50%)',
              // Force white regardless of source SVG color
              filter: 'brightness(0) invert(1)',
            }}
          />

          {/* Centered paragraph */}
          <div className="absolute inset-0 flex items-center justify-center px-8 text-center select-none">
            <p className={`font-fkgrotes text-sm sm:text-base md:text-lg leading-snug text-white/50 max-w-[65%] transition-all duration-300 ${isTransitioning ? 'opacity-0 blur-sm' : 'opacity-100'}`} dangerouslySetInnerHTML={{ __html: axisCopy[displayAxis] }} />
          </div>
        </div>
      </section>

      {/* Unity Vision Section */}
      <section className="relative z-10 py-48 flex items-center justify-center">
        <div className="relative w-full max-w-[720px] aspect-square flex items-center justify-center">
          <div
            className="absolute inset-0"
            style={{
              borderRadius: '490.079px',
              background: 'rgba(193, 207, 212, 0.53)',
              filter: 'blur(25px)',
            }}
          />
          <div className="relative z-10 px-6 text-center select-none">
            <p className="font-display text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
              WE'RE UNITED<br />
              BY A SINGULAR VISION<br />
              <span className="font-display italic text-white/80">to </span> <span className="font-bodycursive italic text-[#9EA5AD]">create<span className="font-display italic text-white/80">WITH </span></span> <span className="font-bodycursive italic text-[#9EA5AD]">intention</span>
            </p>
          </div>
        </div>
      </section>

      {/* Team Clock Section */}
      <section className="relative z-10 pb-0">
        <div
          className="w-screen px-0"
          style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}
        >
          <div
            className="relative min-h-[95vh] sm:min-h-[120vh] overflow-hidden rounded-t-[799px]"
            style={{
              WebkitClipPath: 'path("M 0 50% A 50% 50% 0 0 1 100% 50% L 100% 100% L 0 100% Z")',
              clipPath: 'path("M 0 50% A 50% 50% 0 0 1 100% 50% L 100% 100% L 0 100% Z")',
              WebkitMaskImage: isMobile
                ? 'radial-gradient(ellipse 120% 80% at center, black 85%, transparent 100%)'
                : 'radial-gradient(ellipse 50% 50% at center, black 70%, transparent 100%)',
              maskImage: isMobile
                ? 'radial-gradient(ellipse 120% 80% at center, black 85%, transparent 100%)'
                : 'radial-gradient(ellipse 50% 50% at center, black 70%, transparent 100%)',
            }}
          >
          {/* Soft “dome” — NOT a half circle, no white bg */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: "#C1CFD4",
              opacity: 0.55,
              filter: "blur(28px)",
              WebkitMaskImage: isMobile
                ? 'radial-gradient(ellipse 110% 75% at 50% 10%, black 75%, transparent 100%)'
                : 'radial-gradient(ellipse 85% 65% at 50% 8%, black 62%, transparent 100%)',
              maskImage: isMobile
                ? 'radial-gradient(ellipse 110% 75% at 50% 10%, black 75%, transparent 100%)'
                : 'radial-gradient(ellipse 85% 65% at 50% 8%, black 62%, transparent 100%)',
            }}
          />
          {/* Optional subtle secondary bounce to match the reference vignette */}
          <div
            className="absolute -top-[8vh] sm:-top-[6vh] -left-[30vw] sm:-left-[12vw] w-[160vw] sm:w-[120vw] h-[160vw] sm:h-[120vw] pointer-events-none z-0"
            style={{
              background: "#C1CFD4",
              opacity: 0.25,
              filter: "blur(36px)",
              WebkitMaskImage:
                "radial-gradient(closest-side, black 55%, transparent 100%)",
              maskImage:
                "radial-gradient(closest-side, black 55%, transparent 100%)",
            }}
          />

          {/* Time + labels (labels hug the right edge of the digits) */}
          <div className="absolute inset-0 z-10 select-none pointer-events-none flex items-center justify-center">
            <div className="relative inline-block leading-none">
              <span
                className="font-body tracking-tight block text-center"
                style={{
                  fontSize: "24vw",
                  // bump back up on larger screens via media query in tailwind is tricky inline,
                  // so we keep mobile smaller and overall layout tighter
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
                {/* AM/PM top, SWEDEN bottom – stacked just to the right of the digits */}
                <div className="absolute top-1/2 left-full -translate-y-1/2 ml-2 sm:ml-4 flex flex-col items-start gap-1 sm:gap-96 text-[10px] sm:text-xs font-subheading tracking-widest text-[#9EA5AD] uppercase z-50" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                  <span style={{ position: 'relative', zIndex: 50, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                    {/AM/.test(
                      stockholmTime.toLocaleTimeString("en-US", {
                        timeZone: "Europe/Stockholm",
                        hour12: true,
                      })
                    )
                      ? "AM"
                      : "PM"}
                  </span>
                  <span style={{ position: 'relative', zIndex: 50 }}>SWEDEN</span>
                </div>
              </span>
            </div>
          </div>

          {/* Team figures — blurred by default; focus + name on hover */}
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
                  {/* Name above figure */}
                  <span className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 opacity-0 text-[10px] sm:text-xs text-[#9EA5AD] font-eyebrow tracking-widest transition-opacity duration-500 ease-out">
                    {p.name}
                  </span>

                  {/* Image: blur → sharp on hover */}
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
                      const label = (e.currentTarget.previousSibling as HTMLElement);
                      if (label) label.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      const label = (e.currentTarget.previousSibling as HTMLElement);
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

      <Footer />
    </div>
  );
};

export default Skulpting;
