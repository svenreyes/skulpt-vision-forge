import { Canvas } from "@react-three/fiber";
import { SmokeBackground } from "@/components/SmokeBackground";
import { Suspense, useState } from "react";
import { SShape } from "@/components/SShape";
import { Navbar } from "@/components/Navbar";
import arrowUrl from "@/assets/arrow.svg";

import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();

  // Controlled values for auto-growing inputs
  const [values, setValues] = useState<{ name: string; email: string; message: string }>({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const nameValue = formData.get("name");
    const emailValue = formData.get("email");
    const messageValue = formData.get("message");

    try {
      const response = await fetch("https://hook.us2.make.com/2bwc6n8rxrjij77cun2lnak6aej58nyx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameValue,
          email: emailValue,
          message: messageValue,
          timestamp: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        toast({ title: "Thank you for reaching out!", description: "We'll get back to you soon." });
        form.reset();
        setValues({ name: "", email: "", message: "" });
      } else {
        toast({
          title: "Submission failed",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden text-white font-body">
      {/* Three.js background */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
      >
        <ambientLight intensity={0.4} />
        <SmokeBackground />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <SShape />
        </Suspense>
      </Canvas>

      {/* Navbar */}
      <div className="absolute inset-x-0 top-0 z-20">
        <Navbar />
      </div>

      {/* Main layout */}
      <div
        className="
          relative z-10 w-full min-h-screen
          px-6 pt-24 pb-44 md:pt-28 md:pb-0 text-[#9EA5AD]
          /* Desktop grid mimics reference */
          md:grid md:grid-cols-12 md:auto-rows-min md:gap-x-10
        "
      >
        {/* ====== ROW 1: Names / contact (mobile unchanged) ====== */}
        <div className="w-full md:col-span-12">
          {/* Mobile names (unchanged) */}
          <div className="font-subheading flex w-full justify-start items-start gap-3 text-[12px] md:hidden whitespace-nowrap">
            <div className="flex flex-col leading-tight">
              <div className="uppercase">FREYA LINDEQVIST</div>
              <div className="opacity-80">CO-FOUNDER</div>
            </div>
            <div className="flex flex-col items-start leading-tight">
              <div className="uppercase">LUICA JUEGUEN</div>
              <div className="opacity-80">CO-FOUNDER</div>
            </div>
          </div>

          {/* Desktop: three blocks across top */}
          <div className="font-subheading hidden md:grid md:grid-cols-12 md:items-start md:text-[13px]">
            {/* Left name */}
            <div className="col-span-4 flex flex-col gap-0">
              <div>FREYA LINDEQVIST</div>
              <div className="opacity-80">CO-FOUNDER</div>
            </div>

            {/* Middle name */}
            <div className="col-span-4 flex flex-col gap-0">
              <div>LUICA JUEGUEN</div>
              <div className="opacity-80">CO-FOUNDER</div>
            </div>

            {/* Right contact */}
            <div className="font-subheading col-span-4 flex flex-col gap-0 text-right max-w-[320px] ml-auto">
              <div>STOCKHOLM, SWEDEN</div>
              <div>CONTACT@SKULPT.COM</div>
              <div className="mt-2">2025 SKULPT / ALL RIGHTS RESERVED</div>
            </div>
          </div>
        </div>

        {/* ====== ROW 2: Body + form ====== */}
        {/* Mobile contact info (shifted right, text-left) */}
        <div className="md:hidden mt-8 pl-24">
          <div className="font-subheading space-y-3 text-[14px]">
            <div>STOCKHOLM, SWEDEN</div>
            <div>CONTACT@SKULPT.COM</div>
            <div className="pt-2">2025 SKULPT / ALL RIGHTS RESERVED</div>
          </div>
        </div>

        {/* Mobile body (shifted right, text-left) */}
        <div className="md:hidden pl-24">
          <div className=" text-left">
            <p className="font-subheading text-[12px] leading-tight whitespace-pre-line">
              {`Drop a note using the form below.
Tell us where you are on your journey
and what you're building.
We'll take it from there.`}
            </p>

            <form id="contactForm" onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 w-full">
              {[
                { id: "name", type: "text", placeholder: "NAME" },
                { id: "email", type: "email", placeholder: "EMAIL", required: true },
                { id: "message", type: "text", placeholder: "MESSAGE" },
              ].map((field) => (
                <div key={field.id} className="w-full">
                  <div className="inline-flex items-center max-w-full">
                    <span className="text-[#9EA5AD]/90 text-2xl mr-1">[</span>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      required={(field as any).required}
                      placeholder={field.placeholder}
                      className="bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none py-2 px-1.5 text-base tracking-wide inline-block w-auto max-w-[calc(100%-16px)]"
                      value={(values as any)[field.id] ?? ""}
                      onChange={handleInputChange}
                      size={Math.max(
                        4,
                        (field.placeholder?.length || 0),
                        ((values as any)[field.id]?.length || 0)
                      )}
                      style={{ textTransform: "none" }}
                    />
                    <span className="text-[#9EA5AD]/90 text-2xl ml-1">]</span>
                  </div>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Desktop body: right column block like the reference */}
        <section
          className="
            hidden md:block
            md:col-start-8 md:col-span-5
            lg:col-start-8 lg:col-span-5
            xl:col-start-8 xl:col-span-5
            mt-10
          "
        >

          {/* Small copy above fields */}
          <p className="font-subheading mt-6 text-[16px] leading-tight max-w-[520px]">
            Drop a note using the form below. Tell us where you are on your journey and what you&apos;re
            building. We&apos;ll take it from there.
          </p>

          {/* Form — left aligned fields with brackets */}
          <form
            id="contactForm"
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-5 w-full max-w-[520px] text-left"
          >
            {[
              { id: "name", type: "text", placeholder: "NAME" },
              { id: "email", type: "email", placeholder: "EMAIL", required: true },
              { id: "message", type: "text", placeholder: "MESSAGE" },
            ].map((field) => (
              <div key={field.id} className="w-full">
                <div className="inline-flex items-center max-w-full">
                  <span className="text-[#9EA5AD]/90 text-2xl mr-1">[</span>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    required={(field as any).required}
                    placeholder={field.placeholder}
                    className="
                      bg-transparent border-0 text-[#9EA5AD]
                      placeholder:text-[#9EA5AD]/60
                      focus:outline-none py-2 px-1.5
                      text-lg lg:text-xl tracking-wide
                      inline-block w-auto max-w-[calc(100%-16px)]
                    "
                    value={(values as any)[field.id] ?? ""}
                    onChange={handleInputChange}
                    size={Math.max(
                      Math.floor(field.placeholder?.length * 1.3) || 0,
                      ((values as any)[field.id]?.length || 0) + 2
                    )}
                    style={{ textTransform: "none" }}
                  />
                  <span className="text-[#9EA5AD]/90 text-2xl ml-1">]</span>
                </div>
              </div>
            ))}
          </form>
        </section>

        {/* ====== ROW 3: Bottom brand ====== */}
        {/* Mobile bottom: fixed at bottom, CTA right, SKULPT centered */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 w-full">
          <div className="w-[min(92vw,480px)] mx-auto">
            <div className="flex justify-end pb-2">
              <button
                type="submit"
                form="contactForm"
                className="text-[36px] font-light text-[#B8C1CB] decoration-[#B8C1CB]/70 hover:decoration-[#B8C1CB] transition-colors"
              >
                Let&apos;s <span className="underline underline-offset-4 pr-2 italic text-[#A0A9B4] ">Connect</span>{" "}
                <img src={arrowUrl} alt="arrow" className="inline-block w-5 h-5 mb-2 mr-14 -rotate-45  scale-[1.5]" />
              </button>
            </div>
            <div className="w-full flex justify-center pb-4">
              <span
                className="text-[#9EA5AD] text-[56px] font-nersans-two tracking-tight leading-none select-none"
                style={{ letterSpacing: "-0.03em" }}
              >
                SKULPT
              </span>
            </div>
          </div>
        </div>

        {/* Desktop bottom: big centered SKULPT with CTA above - positioned at very bottom */}
        <div className="hidden md:flex flex-col fixed bottom-0 left-0 right-0">
          <div className="w-full max-w-[720px] md:max-w-[820px] mx-auto px-6 flex justify-end pr-[24px]">
            <button
              type="submit"
              form="contactForm"
              className="text-[40px] font-light text-[#B8C1CB] underline underline-offset-4 decoration-[#B8C1CB]/70 hover:decoration-[#B8C1CB] transition-colors"
            >
              Let's <span className="italic text-[#A0A9B4] pr-4">Connect</span>{' '}
              <img src={arrowUrl} alt="arrow" className="inline-block w-5 h-5 mb-1 -rotate-45 scale-[2.5]" />
            </button>
          </div>
          
          <div className="w-full flex justify-center">
            <span
              className="text-[#9EA5AD] text-[120px] md:text-[160px] lg:text-[200px] font-nersans-two tracking-tight leading-none select-none"
              style={{ letterSpacing: '-0.03em' }}
            >
              SKULPT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
