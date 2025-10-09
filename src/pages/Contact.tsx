import { Canvas } from "@react-three/fiber";
import { SmokeBackground } from "@/components/SmokeBackground";
import { Suspense, useState, useRef, useEffect } from "react";
import { SShape } from "@/components/SShape";
import { Navbar } from "@/components/Navbar";
import { Seo } from "@/components/Seo";



import { useToast } from "@/components/ui/use-toast";
import uncheckedUrl from "../assets/unchecked.svg";
import checkedUrl from "../assets/checked.svg";

const Contact = () => {
  const { toast } = useToast();

  // Controlled values for auto-growing inputs
  const [values, setValues] = useState<{
    name: string;
    email: string;
    projectName: string;
    projectLink: string;
    stage: string;
    investmentLevel: string;
    whyNow: string;
    biggestChallenges: string[];
  }>(
    {
      name: "",
      email: "",
      projectName: "",
      projectLink: "",
      stage: "",
      investmentLevel: "",
      whyNow: "",
      biggestChallenges: [],
    }
  );

  // Dropdown state for biggest challenges
  const [isChallengesOpen, setIsChallengesOpen] = useState(false);
  const challengesRef = useRef<HTMLDivElement>(null);

  // Dynamic widths for select inputs
  const [selectWidths, setSelectWidths] = useState<{ stage: string; investmentLevel: string }>({
    stage: "7ch",
    investmentLevel: "21ch",
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Handle checkbox group for biggestChallenges
    if (name === "biggestChallenges") {
      const checkbox = e.target as HTMLInputElement;
      setValues((prev) => {
        const set = new Set(prev.biggestChallenges);
        if (checkbox.checked) set.add(checkbox.value); else set.delete(checkbox.value);
        return { ...prev, biggestChallenges: Array.from(set) };
      });
      return;
    }

    // Adjust width for select inputs based on visible text length
    if (name === "stage" || name === "investmentLevel") {
      const selectEl = e.target as HTMLSelectElement;
      const selectedText = selectEl.options[selectEl.selectedIndex]?.text || value;
      setSelectWidths((prev) => ({ ...prev, [name]: `${selectedText.length + 2}ch` }));
    }
    setValues((prev) => ({ ...prev, [name]: value }));

    // Dynamic width for mobile whyNow textarea
    if (name === "whyNow" && whyNowRef.current) {
      const ch = value.length + 1;
      if (ch < 32) {
        whyNowRef.current.style.width = `${ch}ch`;
      } else {
        whyNowRef.current.style.width = "100%";
      }
    }
  };

  const whyNowRef = useRef<HTMLTextAreaElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (challengesRef.current && !challengesRef.current.contains(event.target as Node)) {
        setIsChallengesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Ensure initial select widths match visible default labels on mount
  useEffect(() => {
    const stageDefault = 'STAGE';
    const investmentDefault = 'LEVEL OF INVESTMENT';
    setSelectWidths({ stage: `${stageDefault.length + 2}ch`, investmentLevel: `${investmentDefault.length + 2}ch` });
  }, []);

  const autoResize = (el: HTMLTextAreaElement) => {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const nameValue = formData.get("name") as string;
    const emailValue = formData.get("email") as string;
    const projectNameValue = formData.get("projectName") as string;
    const projectLinkValue = formData.get("projectLink") as string;
    const stageValue = formData.get("stage") as string;
    const investmentLevelValue = formData.get("investmentLevel") as string;
    const whyNowValue = formData.get("whyNow") as string;
    const biggestChallengesValues = formData.getAll("biggestChallenges") as string[];

    // Basic validation for required fields (including at least one challenge)
    if (!nameValue || !emailValue || !projectNameValue || !projectLinkValue || !stageValue || !investmentLevelValue || !whyNowValue || biggestChallengesValues.length === 0) {
      toast({
        title: "Missing required fields",
        description: "Please complete all fields and select at least one challenge.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("https://hook.us2.make.com/2bwc6n8rxrjij77cun2lnak6aej58nyx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameValue,
          email: emailValue,
          projectName: projectNameValue,
          projectLink: projectLinkValue,
          stage: stageValue,
          biggestChallenges: biggestChallengesValues,
          investmentLevel: investmentLevelValue,
          whyNow: whyNowValue,
          timestamp: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        toast({ title: "Thank you for reaching out!", description: "We'll get back to you soon." });
        form.reset();
        setValues({ name: "", email: "", projectName: "", projectLink: "", stage: "", investmentLevel: "", whyNow: "", biggestChallenges: [] });
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
          px-6 pr-12 pt-24 pb-0 md:pt-28 md:pb-0 text-[#9EA5AD]
          /* Desktop grid mimics reference */
          md:grid md:grid-cols-12 md:auto-rows-min md:gap-x-10
        "
      >
        <div className="w-full md:col-span-12">
          <div className="font-subheading pr-12 text-right text-[13px] opacity-80">
            <div>CONTACT@SKULPTBRAND.COM</div>
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

            <form id="contactForm" onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 w-full pb-0">
              {/* NAME and EMAIL side by side */}
              <div className="w-full flex gap-4">
                {/* NAME */}
                <div className="flex-1">
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
                      required
                      size={Math.max(4, 'NAME'.length, values.name.length || 0)}
                      style={{ textTransform: "none" }}
                    />
                    <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex-1">
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
              </div>

              {/* PROJECT NAME and URL side by side */}
              <div className="w-full flex gap-4">
                {/* PROJECT NAME */}
                <div className="flex-1">
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
                      required
                      size={Math.max(4, 'PROJECT NAME'.length, values.projectName.length || 0)}
                      style={{ textTransform: "none" }}
                    />
                    <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
                  </div>
                </div>

                {/* PROJECT LINK */}
                <div className="flex-1">
                  <div className="group inline-flex items-center max-w-full">
                    <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">[</span>
                    <input
                      id="projectLink"
                      name="projectLink"
                      type="url"
                      placeholder="URL"
                      className="bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-base tracking-wide inline-block w-auto max-w-[calc(100%-16px)]"
                      value={values.projectLink}
                      onChange={handleInputChange}
                      required
                      size={Math.max(10, 'WEBSITE'.length, values.projectLink.length || 0)}
                      style={{ textTransform: "none" }}
                    />
                    <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
                  </div>
                </div>
              </div>

              {/* STAGE and BIGGEST CHALLENGE side by side */}
              <div className="w-full flex gap-4">
                {/* STAGE (select) */}
                <div className="flex-1">
                  <div className="group inline-flex items-center max-w-full">
                    <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">[</span>
                    <select
                      id="stage"
                      name="stage"
                      className="bg-transparent border-0 text-[#9EA5AD]/60 placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-base tracking-wide inline-block whitespace-nowrap appearance-none font-normal"
                      value={values.stage}
                      onChange={handleInputChange}
                      style={{ width: selectWidths.stage, fontWeight: 400 }}
                      required
                    >
                      <option value="" className="bg-black">STAGE</option>
                      <option value="idea" className="bg-black">Just an idea</option>
                      <option value="mvp" className="bg-black">MVP launched / early users</option>
                      <option value="funded" className="bg-black">Funded and growing / scaling</option>
                      <option value="pivoting" className="bg-black">Pivoting or repositioning</option>
                    </select>
                    <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
                  </div>
                </div>

                {/* BIGGEST CHALLENGE (dropdown with checkboxes) */}
                <div className="flex-1" ref={challengesRef}>
                <div className="group inline-flex items-center max-w-full">
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">[</span>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsChallengesOpen(!isChallengesOpen)}
                      className="bg-transparent border-0 text-[#9EA5AD]/60 focus:outline-none px-1.5 text-base tracking-wide inline-block whitespace-nowrap appearance-none cursor-pointer font-normal"
                      style={{ fontWeight: 400 }}
                    >
                      {values.biggestChallenges.length === 0 ? 'BIGGEST CHALLENGE' : `${values.biggestChallenges.length} SELECTED`}
                    </button>
                    {isChallengesOpen && (
                      <div className="absolute top-full left-0 mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl z-50 min-w-[280px] p-3">
                        <div className="flex flex-col gap-2 text-sm">
                          <label className="inline-flex items-center gap-2 cursor-pointer select-none hover:bg-white/10 p-2 rounded">
                            <input className="sr-only" type="checkbox" name="biggestChallenges" value="fundraising" onChange={handleInputChange} checked={values.biggestChallenges.includes('fundraising')} />
                            <img src={values.biggestChallenges.includes('fundraising') ? checkedUrl : uncheckedUrl} alt="" className="h-5 w-5" />
                            <span className="text-[#9EA5AD]">trouble fundraising</span>
                          </label>
                          <label className="inline-flex items-center gap-2 cursor-pointer select-none hover:bg-white/10 p-2 rounded">
                            <input className="sr-only" type="checkbox" name="biggestChallenges" value="marketing" onChange={handleInputChange} checked={values.biggestChallenges.includes('marketing')} />
                            <img src={values.biggestChallenges.includes('marketing') ? checkedUrl : uncheckedUrl} alt="" className="h-5 w-5" />
                            <span className="text-[#9EA5AD]">marketing efforts not paying off</span>
                          </label>
                          <label className="inline-flex items-center gap-2 cursor-pointer select-none hover:bg-white/10 p-2 rounded">
                            <input className="sr-only" type="checkbox" name="biggestChallenges" value="audience" onChange={handleInputChange} checked={values.biggestChallenges.includes('audience')} />
                            <img src={values.biggestChallenges.includes('audience') ? checkedUrl : uncheckedUrl} alt="" className="h-5 w-5" />
                            <span className="text-[#9EA5AD]">not connecting with audience</span>
                          </label>
                          <label className="inline-flex items-center gap-2 cursor-pointer select-none hover:bg-white/10 p-2 rounded">
                            <input className="sr-only" type="checkbox" name="biggestChallenges" value="strategy" onChange={handleInputChange} checked={values.biggestChallenges.includes('strategy')} />
                            <img src={values.biggestChallenges.includes('strategy') ? checkedUrl : uncheckedUrl} alt="" className="h-5 w-5" />
                            <span className="text-[#9EA5AD]">no clear strategy- every decision feels new</span>
                          </label>
                          <label className="inline-flex items-center gap-2 cursor-pointer select-none hover:bg-white/10 p-2 rounded">
                            <input className="sr-only" type="checkbox" name="biggestChallenges" value="identity" onChange={handleInputChange} checked={values.biggestChallenges.includes('identity')} />
                            <img src={values.biggestChallenges.includes('identity') ? checkedUrl : uncheckedUrl} alt="" className="h-5 w-5" />
                            <span className="text-[#9EA5AD]">outgrown our identity</span>
                          </label>
                          <label className="inline-flex items-center gap-2 cursor-pointer select-none hover:bg-white/10 p-2 rounded">
                            <input className="sr-only" type="checkbox" name="biggestChallenges" value="alignment" onChange={handleInputChange} checked={values.biggestChallenges.includes('alignment')} />
                            <img src={values.biggestChallenges.includes('alignment') ? checkedUrl : uncheckedUrl} alt="" className="h-5 w-5" />
                            <span className="text-[#9EA5AD]">team misalignment</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
                </div>
                </div>
              </div>

              {/* LEVEL OF INVESTMENT (select) */}
              <div className="w-full">
                <div className="group inline-flex items-center max-w-full">
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">[</span>
                  <select
                    id="investmentLevel"
                    name="investmentLevel"
                    className="bg-transparent border-0 text-[#9EA5AD]/60 placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-base tracking-wide inline-block whitespace-nowrap appearance-none font-normal"
                    value={values.investmentLevel}
                    onChange={handleInputChange}
                    style={{ width: selectWidths.investmentLevel, fontWeight: 400 }}
                    required
                  >
                    <option value="" className="bg-black">LEVEL OF INVESTMENT</option>
                    <option value="high" className="bg-black">High: fully ready to invest</option>
                    <option value="moderate" className="bg-black">Moderate: committed but need more information</option>
                    <option value="light" className="bg-black">Light: comparing options before deciding</option>
                    <option value="later" className="bg-black">Later: Not ready to invest</option>
                  </select>
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
                </div>
              </div>

              {/* WHY NOW? (glass text box, no brackets) */}
              <div className="w-full">
                <div className="group pr-4 flex items-stretch max-w-full align-top">
                  <div className="flex-1 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-md px-4 py-4 min-h-[96px]">
                    <textarea
                      id="whyNow"
                      name="whyNow"
                      placeholder="WHY NOW?"
                      rows={4}
                      className="w-full h-full bg-transparent border-0 text-white placeholder:text-[#9EA5AD]/60 focus:outline-none text-base tracking-wide resize-none"
                      value={values.whyNow}
                      onChange={handleInputChange}
                      required
                      style={{ textTransform: "none" }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="group relative text-[22px] font-light text-[#B8C1CB] transition-colors"
                >
                  <span className="text-[#A0A9B4]">submit to see if we’re a fit</span>
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

          <p className="font-subheading mt-4 text-[16px] leading-tight max-w-[520px]">
            Drop a note using the form below. Tell us where you are on your journey and what you&apos;re
            building. We&apos;ll take it from there.
          </p>

          <form
            id="contactForm"
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col gap-4 w-full max-w-[520px] text-left pb-0"
          >
            {/* NAME and EMAIL side by side */}
            <div className="w-full flex gap-5">
              {/* NAME */}
              <div className="flex-1">
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
                    required
                    size={Math.max(Math.floor('NAME'.length * 1.3), (values.name?.length || 0) + 2)}
                    style={{ textTransform: "none" }}
                  />
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex-1">
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
            </div>

            {/* PROJECT NAME and URL side by side */}
            <div className="w-full flex gap-5">
              {/* PROJECT NAME */}
              <div className="flex-1">
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
                    required
                    size={Math.max(Math.floor('PROJECT NAME'.length * 1.3), (values.projectName?.length || 0) + 2)}
                    style={{ textTransform: "none" }}
                  />
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
                </div>
              </div>

              {/* PROJECT LINK */}
              <div className="flex-1">
                <div className="group inline-flex items-center max-w-full">
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">[</span>
                  <input
                    id="projectLink"
                    name="projectLink"
                    type="url"
                    placeholder="URL"
                    className="bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-lg lg:text-xl tracking-wide inline-block w-auto max-w-[calc(100%-16px)]"
                    value={values.projectLink}
                    onChange={handleInputChange}
                    required
                    size={Math.max(Math.floor('WEBSITE'.length * 1.0), (values.projectLink?.length || 0) + 2)}
                    style={{ textTransform: "none" }}
                  />
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
                </div>
              </div>
            </div>

            {/* STAGE and BIGGEST CHALLENGE side by side */}
            <div className="w-full flex gap-5">
              {/* STAGE (select) */}
              <div className="flex-1">
                <div className="group inline-flex items-center max-w-full">
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">[</span>
                  <select
                    id="stage"
                    name="stage"
                    className="bg-transparent border-0 text-[#9EA5AD]/60 placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-lg lg:text-xl tracking-wide inline-block whitespace-nowrap appearance-none font-normal"
                    value={values.stage}
                    onChange={handleInputChange}
                    style={{ width: selectWidths.stage, fontWeight: 400 }}
                  >
                    <option value="" className="bg-black">STAGE</option>
                    <option value="idea" className="bg-black">Just an idea</option>
                    <option value="mvp" className="bg-black">MVP launched / early users</option>
                    <option value="funded" className="bg-black">Funded and growing / scaling</option>
                    <option value="pivoting" className="bg-black">Pivoting or repositioning</option>
                  </select>
                  <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
                </div>
              </div>

              {/* BIGGEST CHALLENGE (dropdown with checkboxes) */}
              <div className="flex-1" ref={challengesRef}>
              <div className="group inline-flex items-center max-w-full">
                <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">[</span>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsChallengesOpen(!isChallengesOpen)}
                    className="bg-transparent border-0 text-[#9EA5AD]/60 focus:outline-none px-1.5 text-lg lg:text-xl tracking-wide inline-block whitespace-nowrap appearance-none cursor-pointer font-normal"
                    style={{ fontWeight: 400 }}
                  >
                    {values.biggestChallenges.length === 0 ? 'BIGGEST CHALLENGE' : `${values.biggestChallenges.length} SELECTED`}
                  </button>
                  {isChallengesOpen && (
                    <div className="absolute top-full left-0 mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl z-50 min-w-[320px] p-3">
                      <div className="flex flex-col gap-2 text-base">
                        <label className="inline-flex items-center gap-3 cursor-pointer select-none hover:bg-white/10 p-2 rounded">
                          <input className="sr-only" type="checkbox" name="biggestChallenges" value="fundraising" onChange={handleInputChange} checked={values.biggestChallenges.includes('fundraising')} />
                          <img src={values.biggestChallenges.includes('fundraising') ? checkedUrl : uncheckedUrl} alt="" className="h-5 w-5" />
                          <span className="text-[#9EA5AD]">trouble fundraising</span>
                        </label>
                        <label className="inline-flex items-center gap-3 cursor-pointer select-none hover:bg-white/10 p-2 rounded">
                          <input className="sr-only" type="checkbox" name="biggestChallenges" value="marketing" onChange={handleInputChange} checked={values.biggestChallenges.includes('marketing')} />
                          <img src={values.biggestChallenges.includes('marketing') ? checkedUrl : uncheckedUrl} alt="" className="h-5 w-5" />
                          <span className="text-[#9EA5AD]">marketing efforts not paying off</span>
                        </label>
                        <label className="inline-flex items-center gap-3 cursor-pointer select-none hover:bg-white/10 p-2 rounded">
                          <input className="sr-only" type="checkbox" name="biggestChallenges" value="audience" onChange={handleInputChange} checked={values.biggestChallenges.includes('audience')} />
                          <img src={values.biggestChallenges.includes('audience') ? checkedUrl : uncheckedUrl} alt="" className="h-5 w-5" />
                          <span className="text-[#9EA5AD]">not connecting with audience</span>
                        </label>
                        <label className="inline-flex items-center gap-3 cursor-pointer select-none hover:bg-white/10 p-2 rounded">
                          <input className="sr-only" type="checkbox" name="biggestChallenges" value="strategy" onChange={handleInputChange} checked={values.biggestChallenges.includes('strategy')} />
                          <img src={values.biggestChallenges.includes('strategy') ? checkedUrl : uncheckedUrl} alt="" className="h-5 w-5" />
                          <span className="text-[#9EA5AD]">no clear strategy- every decision feels new</span>
                        </label>
                        <label className="inline-flex items-center gap-3 cursor-pointer select-none hover:bg-white/10 p-2 rounded">
                          <input className="sr-only" type="checkbox" name="biggestChallenges" value="identity" onChange={handleInputChange} checked={values.biggestChallenges.includes('identity')} />
                          <img src={values.biggestChallenges.includes('identity') ? checkedUrl : uncheckedUrl} alt="" className="h-5 w-5" />
                          <span className="text-[#9EA5AD]">outgrown our identity</span>
                        </label>
                        <label className="inline-flex items-center gap-3 cursor-pointer select-none hover:bg-white/10 p-2 rounded">
                          <input className="sr-only" type="checkbox" name="biggestChallenges" value="alignment" onChange={handleInputChange} checked={values.biggestChallenges.includes('alignment')} />
                          <img src={values.biggestChallenges.includes('alignment') ? checkedUrl : uncheckedUrl} alt="" className="h-5 w-5" />
                          <span className="text-[#9EA5AD]">team misalignment</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
              </div>
              </div>
            </div>

            {/* LEVEL OF INVESTMENT (select) */}
            <div className="w-full">
              <div className="group inline-flex items-center max-w-full">
                <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">[</span>
                <select
                  id="investmentLevel"
                  name="investmentLevel"
                  className="bg-transparent border-0 text-[#9EA5AD]/60 placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-lg lg:text-xl tracking-wide inline-block whitespace-nowrap appearance-none font-normal"
                  value={values.investmentLevel}
                  onChange={handleInputChange}
                  style={{ width: selectWidths.investmentLevel, fontWeight: 400 }}
                  required
                >
                  <option value="" className="bg-black">LEVEL OF INVESTMENT</option>
                  <option value="high" className="bg-black">High: fully ready to invest</option>
                  <option value="moderate" className="bg-black">Moderate: committed but need more information</option>
                  <option value="light" className="bg-black">Light: comparing options before deciding</option>
                  <option value="later" className="bg-black">Later: Not ready to invest</option>
                </select>
                <span className="text-[#9EA5AD]/90 group-hover:text-white transition-colors text-2xl">]</span>
              </div>
            </div>

            {/* WHY NOW? (glass text box, no brackets, last) */}
            <div className="w-full">
              <div className="group block w-full">
                <div className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-md px-6 py-5 min-h-[140px]">
                  <textarea
                    id="whyNow"
                    name="whyNow"
                    placeholder="WHY NOW?"
                    rows={5}
                    className="w-full h-full bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none text-lg lg:text-xl tracking-wide resize-none"
                    value={values.whyNow}
                    onChange={handleInputChange}
                    required
                    style={{ textTransform: "none" }}
                  />
                </div>
              </div>
            </div>
            <div className="hidden md:block mt-8">
              <button
                type="submit"
                form="contactForm"
                className="group relative text-[28px] font-light text-[#B8C1CB] transition-colors"
              >
                <span className="text-[#A0A9B4]">submit to see if we’re a fit</span>
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
