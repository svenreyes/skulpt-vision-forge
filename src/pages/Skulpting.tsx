import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { CloudyBackground } from "../components/CloudyBackground";
import skulptVideo from "@/assets/videos/skulpting.mp4";
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
        <div className="absolute inset-0 z-10 grid place-items-center">
          {/* Bigger canvas = bigger blob */}
          <div
            className="
              relative
              size-[min(175vw,175svh)] translate-x-[-26%]           /* xs */
              sm:size-[min(165vw,165svh)] scale-[2.75] sm:translate-x-[-4%]      /* sm */
              md:size-[160vmin] md:scale-[1.5] md:translate-x-0 md:translate-y-8   /* md desktop start */
              lg:size-[160vmin lg:scale-[2] lg:-translate-y-[23%] lg:-translate-x-36  /* lg and up */
              xl:size-[180vmin]                                      /* xl: even larger */
              blur-[3px]
            "
          >
            <iframe
              src="https://my.spline.design/untitled-joeso1Tv4ZyNsbizJR3r5kQz/?ui=0"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen"
              frameBorder="0"
            />
          </div>
        </div>

        {/* Center text (let pointer events pass through) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center pointer-events-none select-none pt-16 md:pt-0">
          <h1 className="font-subheading text-[#9EA5AD] text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
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
      <section className="relative z-10 py-16 mx-auto max-w-6xl px-4 sm:px-6 md:px-0">
        <div className="relative rounded-3xl overflow-hidden">
          <div
            className="relative"
            style={{
              WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at center, black 60%, transparent 100%)',
              maskImage: 'radial-gradient(ellipse 50% 50% at center, black 60%, transparent 100%)',
            }}
          >
            <video
              src={skulptVideo}
              className="w-full h-auto object-cover opacity-80 blur-md scale-110 transform-gpu"
              autoPlay
              muted
              loop
              playsInline
            />
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
            <div className="slide-right-animation whitespace-nowrap font-subheading text-[#9EA5AD] text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              Brand Identity Development&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Team Alignment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Visual Design Development&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Brand Messaging&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pitch Deck&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Brand Identity Development&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Team Alignment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </div>
      </section>

      {/* Make it make Sense callout */}
      <section className="relative z-10 py-24 mx-auto max-w-6xl px-4 sm:px-6 md:px-0 flex justify-end">
        <a
          href="/contact"
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
        </a>
      </section>

      {/* Strategy Circle Section */}
      <section className="relative z-10 py-64 mt-24 flex items-center justify-center px-4 sm:px-6">
        <div className="relative w-full max-w-[720px] aspect-square">
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
              <video
                src={skulptVideo}
                className="w-full h-full object-cover opacity-85 blur-md scale-110 transform-gpu"
                autoPlay
                muted
                loop
                playsInline
              />
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
            className="absolute -top-6 left-1/2 -translate-x-1/2 cursor-pointer text-sm tracking-widest font-subheading select-none"
            style={{ color: activeAxis === 'strategy' ? '#FFFFFF' : 'rgba(255,255,255,0.6)' }}
          >
            STRATEGY
          </span>
          <span
            onMouseEnter={() => setActiveAxis('alignment')}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 cursor-pointer text-sm tracking-widest font-subheading select-none"
            style={{ color: activeAxis === 'alignment' ? '#FFFFFF' : 'rgba(255,255,255,0.6)' }}
          >
            ALIGNMENT
          </span>
          <span
            onMouseEnter={() => setActiveAxis('external')}
            className="absolute -left-20 top-1/2 -translate-y-1/2 -rotate-90 cursor-pointer text-sm tracking-widest font-subheading select-none"
            style={{ color: activeAxis === 'external' ? '#FFFFFF' : 'rgba(255,255,255,0.6)' }}
          >
            EXTERNAL
          </span>
          <span
            onMouseEnter={() => setActiveAxis('internal')}
            className="absolute top-[60%] -translate-y-9 -right-8 rotate-90 origin-right cursor-pointer text-sm tracking-widest font-subheading select-none"
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
            <p className={`font-fkgrotes text-lg sm:text-xl md:text-2xl leading-snug text-white/50 max-w-lg transition-all duration-300 ${isTransitioning ? 'opacity-0 blur-sm' : 'opacity-100'}`} dangerouslySetInnerHTML={{ __html: axisCopy[displayAxis] }} />
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

      {/* Team Clock Section - Matching Screenshot Exactly */}
      <section className="relative z-10 pb-0">
        <div className="relative min-h-[100vh] overflow-hidden">
          
          {/* Half-circle top with blur and specific color */}
          <div 
            className="absolute inset-0"
            style={{
              background: '#C1CFD4',
              opacity: 0.8,
              filter: 'blur(2px)',
              clipPath: 'ellipse(100% 60px at 50% 0%)',
            }}
          />
          
          {/* Main white background */}
          <div className="absolute inset-0 bg-white" style={{ marginTop: '60px' }} />

          {/* Huge ghosted time background with body font and specific color */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
            <div
              className="font-body leading-none tracking-tight text-center"
              style={{
                fontSize: '35vw',
                color: '#9EA5AD',
                opacity: 0.4,
                letterSpacing: '-0.02em',
                filter: 'blur(1px)',
              }}
            >
              {stockholmTime.toLocaleTimeString('en-GB', {
                timeZone: 'Europe/Stockholm',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>

          {/* Right-side labels */}
          <div className="absolute right-8 md:right-12 top-[30%] text-xs font-subheading tracking-widest text-[#9EA5AD] uppercase select-none opacity-70">
            {/AM/.test(stockholmTime.toLocaleTimeString('en-US', {
              timeZone: 'Europe/Stockholm',
              hour12: true,
            })) ? 'AM' : 'PM'}
          </div>
          <div className="absolute right-8 md:right-12 top-[65%] text-xs font-subheading tracking-widest text-[#9EA5AD] uppercase select-none opacity-70">
            SWEDEN
          </div>

          {/* Team figures row at bottom - like grass strands with varied positions */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center px-8 pb-16">
            <div className="flex items-end justify-between w-full max-w-5xl gap-4">
              {[
                { src: anaisaImg, scale: 0.9, yOffset: 8, xOffset: -2 },
                { src: jaclynImg, scale: 0.85, yOffset: -4, xOffset: 3 },
                { src: freyaImg, scale: 1.0, yOffset: 12, xOffset: -1 },
                { src: leaImg, scale: 1.1, yOffset: -2, xOffset: 2 },
                { src: svenImg, scale: 0.95, yOffset: 6, xOffset: -3 },
                { src: luciaImg, scale: 0.88, yOffset: -8, xOffset: 1 },
              ].map((person, i) => (
                <div
                  key={i}
                  className="flex-1 flex justify-center"
                  style={{
                    transform: `scale(${person.scale}) translateY(${person.yOffset}px) translateX(${person.xOffset}px)`,
                    height: '32vh',
                  }}
                >
                  <img
                    src={person.src}
                    alt={`Team member ${i + 1}`}
                    className="h-full object-contain"
                    style={{
                      filter: 'grayscale(1) blur(0.8px)',
                      opacity: 0.65,
                      WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                      maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                    }}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Skulpting;
