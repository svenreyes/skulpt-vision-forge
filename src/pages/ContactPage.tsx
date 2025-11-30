import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Seo, Navbar, SmokeBackground, SShape } from "@components";
import { ContactForm } from "@features/contact";

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact us | Next"
        description="Get in touch with SKULPT. Tell us where you are on your journey and what you're building - we'll take it from there."
        path="/contact"
        type="website"
      />
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden text-white font-body">
        {/* Three.js background */}
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            filter: "blur(1.5px)",
          }}
        >
          <ambientLight intensity={0.7} />
          <hemisphereLight args={[0xbfd4ff, 0xf0e6da, 0.35]} />
          <SmokeBackground />
          <directionalLight position={[5, 5, 5]} intensity={1.3} />
          <directionalLight position={[-3, 2, -1]} intensity={0.6} />
          <Suspense fallback={null}>
            <SShape position={[0, 0, 0]} positionMd={[-3.5, 0, 0]} />
          </Suspense>
        </Canvas>

        {/* Navbar */}
        <div className="absolute inset-x-0 top-0 z-20">
          <Navbar />
        </div>

        {/* Main layout */}
        <div className="relative z-10 w-full min-h-screen px-6 pt-20 pb-24 md:pt-24 md:pb-20 text-[#9EA5AD] md:grid md:grid-cols-12 md:auto-rows-min md:gap-x-10">
          {/* Email and copyright - bottom right */}
          <div className="fixed bottom-6 right-6 md:bottom-14 md:right-24 z-20 font-subheading text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] opacity-80 leading-tight space-y-0.5">
            <div>CONTACT@SKULPTBRAND.COM</div>
            <div>2025 / ALL RIGHTS RESERVED</div>
          </div>

          {/* Mobile form */}
          <div className="md:hidden px-4">
            <div className="text-left">
              <p className="font-subheading text-[12px] leading-tight whitespace-pre-line mb-6">
                {`Drop a note using the form below.
Tell us where you are on your journey
and what you're building.
We'll take it from there.`}
              </p>
              <ContactForm isMobile />
            </div>
          </div>

          {/* Desktop form */}
          <section className="hidden md:block md:col-start-8 md:col-span-5 lg:col-start-8 lg:col-span-5 xl:col-start-8 xl:col-span-5 mt-6">
            <p className="font-subheading text-[15px] leading-tight max-w-[420px] mb-6">
              Drop a note using the form below. Tell us where you are on your journey
              and what you&apos;re building. We&apos;ll take it from there.
            </p>
            <ContactForm />
          </section>
        </div>
      </div>
    </>
  );
}

