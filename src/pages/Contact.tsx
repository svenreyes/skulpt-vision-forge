import { Canvas } from "@react-three/fiber";
import { SmokeBackground } from "@/components/SmokeBackground";
import { Suspense, useState, useRef } from "react";
import { SShape } from "@/components/SShape";
import { Navbar } from "@/components/Navbar";
import { Seo } from "@/components/Seo";



import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();

  // Controlled values for auto-growing inputs
  const [values, setValues] = useState<{
    name: string;
    email: string;
    projectName: string;
    stage: string;
    what: string;
    message: string;
  }>(
    {
      name: "",
      email: "",
      projectName: "",
      stage: "",
      what: "",
      message: "",
    }
  );

  // Dynamic widths for select inputs
  const [selectWidths, setSelectWidths] = useState<{ stage: string; what: string }>({
    stage: "6ch",
    what: "25ch",
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Adjust width for select inputs based on visible text length
    if (name === "stage" || name === "what") {
      const selectEl = e.target as HTMLSelectElement;
      const selectedText = selectEl.options[selectEl.selectedIndex]?.text || value;
      setSelectWidths((prev) => ({ ...prev, [name]: `${selectedText.length + 2}ch` }));
    }
    setValues((prev) => ({ ...prev, [name]: value }));

    // Dynamic width for mobile message textarea
    if (name === "message" && messageRef.current) {
      const ch = value.length + 1;
      if (ch < 32) {
        messageRef.current.style.width = `${ch}ch`;
      } else {
        messageRef.current.style.width = "100%";
      }
    }
  };

  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const autoResize = (el: HTMLTextAreaElement) => {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const nameValue = formData.get("name");
    const emailValue = formData.get("email");
    const projectNameValue = formData.get("projectName");
    const stageValue = formData.get("stage");
    const whatValue = formData.get("what");
    const messageValue = formData.get("message");

    try {
      const response = await fetch("https://hook.us2.make.com/2bwc6n8rxrjij77cun2lnak6aej58nyx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameValue,
          email: emailValue,
          projectName: projectNameValue,
          stage: stageValue,
          what: whatValue,
          message: messageValue,
          timestamp: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        toast({ title: "Thank you for reaching out!", description: "We'll get back to you soon." });
        form.reset();
        setValues({ name: "", email: "", projectName: "", stage: "", what: "", message: "" });
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
      <div
        className="
          relative z-10 w-full min-h-screen
          px-6 pt-24 pb-44 md:pt-28 md:pb-0 text-[#9EA5AD]
          /* Desktop grid mimics reference */
          md:grid md:grid-cols-12 md:auto-rows-min md:gap-x-10
        "
      >
        <div className="w-full md:col-span-12">
          <div className="font-subheading pr-12 text-right text-[13px] opacity-80">
            <div>CONTACT@SKULPT.COM</div>
            <div>2025 / ALL RIGHTS RESERVED</div>
          </div>
        </div>


        <div className="md:hidden pl-6">
          <div className=" text-left">
            <p className="font-subheading text-[12px] leading-tight whitespace-pre-line">
              {`Drop a note using the form below.
Tell us where you are on your journey
and what you're building.
We'll take it from there.`}
            </p>

            <form id="contactForm" onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 w-full">
              {/* NAME */}
              <div className="w-full">
                <div className="group inline-flex items-center max-w-full">
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">[</span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="NAME"
                    className="bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-base tracking-wide inline-block w-auto max-w-[calc(100%-16px)]"
                    value={values.name}
                    onChange={handleInputChange}
                    size={Math.max(4, 'NAME'.length, values.name.length || 0)}
                    style={{ textTransform: "none" }}
                  />
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
                </div>
              </div>

              {/* EMAIL */}
              <div className="w-full">
                <div className="group inline-flex items-center max-w-full">
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">[</span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="EMAIL"
                    className="bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-base tracking-wide inline-block w-auto max-w-[calc(100%-16px)]"
                    value={values.email}
                    onChange={handleInputChange}
                    size={Math.max(4, 'EMAIL'.length, values.email.length || 0)}
                    style={{ textTransform: "none" }}
                  />
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
                </div>
              </div>

              {/* PROJECT NAME */}
              <div className="w-full">
                <div className="group inline-flex items-center max-w-full">
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">[</span>
                  <input
                    id="projectName"
                    name="projectName"
                    type="text"
                    placeholder="PROJECT NAME"
                    className="bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-base tracking-wide inline-block w-auto max-w-[calc(100%-16px)]"
                    value={values.projectName}
                    onChange={handleInputChange}
                    size={Math.max(4, 'PROJECT NAME'.length, values.projectName.length || 0)}
                    style={{ textTransform: "none" }}
                  />
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
                </div>
              </div>

              {/* STAGE (select) */}
              <div className="w-full">
                <div className="group inline-flex items-center max-w-full">
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">[</span>
                  <select
                    id="stage"
                    name="stage"
                    className="bg-transparent border-0 text-[#9EA5AD] focus:outline-none px-1.5 text-base tracking-wide inline-block whitespace-nowrap appearance-none"
                    value={values.stage}
                    onChange={handleInputChange}
                    style={{ width: selectWidths.what }}
                  >
                    <option value="" className="bg-black">STAGE</option>
                    <option value="idea" className="bg-black">I only have an idea</option>
                    <option value="mvp" className="bg-black">I have an MVP</option>
                    <option value="vc" className="bg-black">I have worked with accelerators/VCs before</option>
                    <option value="customers" className="bg-black">I have regular customers</option>
                  </select>
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
                </div>
              </div>

              {/* WHAT ARE YOU LOOKING FOR (select) */}
              <div className="w-full">
                <div className="group inline-flex items-center max-w-full">
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">[</span>
                  <select
                    id="what"
                    name="what"
                    className="bg-transparent border-0 text-[#9EA5AD] focus:outline-none px-1.5 text-base tracking-wide inline-block whitespace-nowrap appearance-none"
                    value={values.what}
                    onChange={handleInputChange}
                    style={{ width: selectWidths.what }}
                  >
                    <option value="" className="bg-black">PRIMARY NEEDED</option>
                    <option value="alignment" className="bg-black">Team/founder alignment</option>
                    <option value="messaging" className="bg-black">Messaging</option>
                    <option value="pitching" className="bg-black">Pitching</option>
                    <option value="rebranding" className="bg-black">Rebranding</option>
                    <option value="everything" className="bg-black">Everything</option>
                  </select>
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
                </div>
              </div>

              {/* MESSAGE*/}
              <div className="w-full">
                <div className="group flex flex-wrap items-start max-w-full align-top">
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl leading-[1.2]">[</span>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="MESSAGE"
                    rows={2}
                    maxLength={1000}
                    className="bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-base tracking-wide inline-block w-[calc(100%-16px)] max-w-[calc(100%-16px)] resize-none overflow-hidden leading-snug"
                    value={values.message}
                    onChange={handleInputChange}
                    ref={messageRef}
                    onInput={(e) => autoResize(e.currentTarget)}
                    style={{ textTransform: "none" }}
                  />
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl leading-[1.2]">]</span>
                </div>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="group relative text-[22px] font-light text-[#B8C1CB] transition-colors"
                >
                  <span className="text-[#A0A9B4]">Send</span>
                  <span
                    className="block h-[2px] bg-[#B8C1CB] mt-1 w-full origin-left transform transition-transform duration-500 ease-out group-hover:translate-x-full group-hover:scale-x-0"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>

        <section
          className="
            hidden md:block
            md:col-start-8 md:col-span-5
            lg:col-start-8 lg:col-span-5
            xl:col-start-8 xl:col-span-5
            mt-10
          "
        >

          <p className="font-subheading mt-6 text-[16px] leading-tight max-w-[520px]">
            Drop a note using the form below. Tell us where you are on your journey and what you&apos;re
            building. We&apos;ll take it from there.
          </p>

          <form
            id="contactForm"
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-5 w-full max-w-[520px] text-left"
          >
            {/* NAME */}
            <div className="w-full">
              <div className="group inline-flex items-center max-w-full">
                <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">[</span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="NAME"
                  className="bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-lg lg:text-xl tracking-wide inline-block w-auto max-w-[calc(100%-16px)]"
                  value={values.name}
                  onChange={handleInputChange}
                  size={Math.max(Math.floor('NAME'.length * 1.3), (values.name?.length || 0) + 2)}
                  style={{ textTransform: "none" }}
                />
                <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
              </div>
            </div>

            {/* EMAIL */}
            <div className="w-full">
              <div className="group inline-flex items-center max-w-full">
                <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">[</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="EMAIL"
                  className="bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-lg lg:text-xl tracking-wide inline-block w-auto max-w-[calc(100%-16px)]"
                  value={values.email}
                  onChange={handleInputChange}
                  size={Math.max(Math.floor('EMAIL'.length * 1.3), (values.email?.length || 0) + 2)}
                  style={{ textTransform: "none" }}
                />
                <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
              </div>
            </div>

            {/* PROJECT NAME */}
            <div className="w-full">
              <div className="group inline-flex items-center max-w-full">
                <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">[</span>
                <input
                  id="projectName"
                  name="projectName"
                  type="text"
                  placeholder="PROJECT NAME"
                  className="bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-lg lg:text-xl tracking-wide inline-block w-auto max-w-[calc(100%-16px)]"
                  value={values.projectName}
                  onChange={handleInputChange}
                  size={Math.max(Math.floor('PROJECT NAME'.length * 1.3), (values.projectName?.length || 0) + 2)}
                  style={{ textTransform: "none" }}
                />
                <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
              </div>
            </div>

            {/* STAGE (select) */}
            <div className="w-full">
              <div className="group inline-flex items-center max-w-full">
                <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">[</span>
                <select
                  id="stage"
                  name="stage"
                  className="bg-transparent border-0 text-[#9EA5AD] focus:outline-none px-1.5 text-lg lg:text-xl tracking-wide inline-block whitespace-nowrap appearance-none"
                  value={values.stage}
                  onChange={handleInputChange}
                  style={{ width: selectWidths.stage }}
                >
                  <option value="" className="bg-black">STAGE</option>
                  <option value="idea" className="bg-black">I only have an idea</option>
                  <option value="mvp" className="bg-black">I have an MVP</option>
                  <option value="vc" className="bg-black">I have worked with accelerators/VCs before</option>
                  <option value="customers" className="bg-black">I have regular customers</option>
                </select>
                <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
              </div>
            </div>

            {/* WHAT ARE YOU LOOKING FOR (select) */}
            <div className="w-full">
              <div className="group inline-flex items-center max-w-full">
                <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">[</span>
                <select
                  id="what"
                  name="what"
                  className="bg-transparent border-0 text-[#9EA5AD] focus:outline-none px-1.5 text-lg lg:text-xl tracking-wide inline-block whitespace-nowrap appearance-none"
                  value={values.what}
                  onChange={handleInputChange}
                  style={{ width: selectWidths.what }}
                >
                  <option value="" className="bg-black">PRIMARY NEEDED</option>
                  <option value="alignment" className="bg-black">Team/founder alignment</option>
                  <option value="messaging" className="bg-black">Messaging</option>
                  <option value="pitching" className="bg-black">Pitching</option>
                  <option value="rebranding" className="bg-black">Rebranding</option>
                  <option value="everything" className="bg-black">Everything</option>
                </select>
                <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
              </div>
            </div>

            {/* MESSAGE (last) */}
            <div className="w-full">
              <div className="group inline-flex items-center max-w-full">
                <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">[</span>
                <input
                  id="message"
                  name="message"
                  type="text"
                  placeholder="MESSAGE"
                  className="bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-lg lg:text-xl tracking-wide inline-block w-auto max-w-[calc(100%-16px)]"
                  value={values.message}
                  onChange={handleInputChange}
                  size={Math.max(Math.floor('MESSAGE'.length * 1.3), (values.message?.length || 0) + 2)}
                  style={{ textTransform: "none" }}
                />
                <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
              </div>
            </div>
            <div className="hidden md:block mt-8">
              <button
                type="submit"
                form="contactForm"
                className="group relative text-[28px] font-light text-[#B8C1CB] transition-colors"
              >
                <span className="text-[#A0A9B4]">Send</span>
                <span
                  className="block h-[2px] bg-[#B8C1CB] w-full origin-left transform transition-transform duration-500 ease-out group-hover:translate-x-full group-hover:scale-x-0"
                  aria-hidden="true"
                />
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
    </>
  );
};

export default Contact;
