import React from "react";
import { Navbar } from "../components/Navbar";
import { CloudyBackground } from "../components/CloudyBackground";
import skulptVideo from "@/assets/videos/skulpting.mp4";

const Skulpting: React.FC = () => {
  return (
    <div className="relative scale-[1] min-h-screen w-full bg-[#E6EBEE] overflow-y-auto">
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
          <div className="w-full px-4 sm:px-6 md:px-0 flex justify-end cursor-pointer lg:ml-[400px] transition-all duration-300 ease-in-out hover:text-[#7A8289] text-[#B8C1CB]">
            <p className="lg:text-[24px] text-[20px] leading-[120%] tracking-[-0.8px] font-normal max-w-xl text-right">
              SKULPT is a branding studio for early-stage founders who<br />
              would rather be understood than positioned.<br />
              Skulpting helps reconnect founders, team members, and audiences to a long-lasting brand built with intention.
            </p>
          </div>

          {/* Second text box */}
          <div className="py-32 lg:py-12 w-full px-4 sm:px-6 md:px-0 flex lg:mr-[400px] flex-col items-start cursor-pointer transition-all duration-300 ease-in-out hover:text-[#7A8289] text-[#B8C1CB]">
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

    </div>
  );
};

export default Skulpting;
