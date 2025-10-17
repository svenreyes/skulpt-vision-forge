import { Canvas } from "@react-three/fiber";
import { SmokeBackground } from "@/components/SmokeBackground";
import { Suspense, useState, useRef, useEffect } from "react";
import { SShape } from "@/components/SShape";
import { Navbar } from "@/components/Navbar";
import { Seo } from "@/components/Seo";



import { useToast } from "@/components/ui/use-toast";
import uncheckedUrl from "../assets/unchecked.svg";
import checkedUrl from "../assets/checked.svg";

const CHAR_LIMITS = {
  name: 100,
  email: 150,
  projectName: 150,
  projectLink: 500,
  whyNow: 1000,
};

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

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

  const [touched, setTouched] = useState<{ 
    name: boolean; 
    email: boolean; 
    projectName: boolean; 
    projectLink: boolean; 
    stage: boolean; 
    investmentLevel: boolean; 
    whyNow: boolean; 
    biggestChallenges: boolean; 
  }>({
    name: false,
    email: false,
    projectName: false,
    projectLink: false,
    stage: false,
    investmentLevel: false,
    whyNow: false,
    biggestChallenges: false,
  });

  const VALID_CHAR_REGEX = /^[a-zA-Z0-9 .,'-]+$/;
  const validateNameLike = (text: string): string | undefined => {
    if (!text) return "Required";
    if (!VALID_CHAR_REGEX.test(text)) return "Only letters, numbers, spaces, and .,'-";
    return undefined;
  };

  const [isChallengesOpen, setIsChallengesOpen] = useState(false);
  const challengesRef = useRef<HTMLDivElement>(null);
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  type FieldErrors = Partial<Record<
    'name' | 'email' | 'projectName' | 'projectLink' | 'stage' | 'investmentLevel' | 'whyNow' | 'biggestChallenges',
    string
  >>;
  const getErrors = (v: typeof values): FieldErrors => {
    const errs: FieldErrors = {};
    const nameErr = validateNameLike(v.name);
    if (nameErr) errs.name = nameErr;

    if (!v.email) errs.email = "Required"; else if (!validateEmail(v.email)) errs.email = "Enter a valid email address";

    const projectNameErr = validateNameLike(v.projectName);
    if (projectNameErr) errs.projectName = projectNameErr;

    if (!v.projectLink) errs.projectLink = "Required"; else {
      try { new URL(v.projectLink); } catch { errs.projectLink = "Enter a valid URL (e.g., https://example.com)"; }
    }

    if (!v.stage) errs.stage = "Required";
    if (!v.investmentLevel) errs.investmentLevel = "Required";
    if (!v.whyNow) errs.whyNow = "Required";
    if (v.biggestChallenges.length === 0) errs.biggestChallenges = "Select at least one challenge";
    return errs;
  };

  const [errors, setErrors] = useState<FieldErrors>({});
  useEffect(() => {
    setErrors(getErrors(values));
  }, [values]);

  const fieldInvalid = (field: keyof typeof touched): boolean => {
    return Boolean(touched[field] && errors[field]);
  };
  const fieldError = (field: keyof typeof touched): string | undefined => {
    return errors[field];
  };

  const [selectWidths, setSelectWidths] = useState<{ stage: string; investmentLevel: string }>({
    stage: "7ch",
    investmentLevel: "21ch",
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "biggestChallenges") {
      const checkbox = e.target as HTMLInputElement;
      setValues((prev) => {
        const set = new Set(prev.biggestChallenges);
        if (checkbox.checked) set.add(checkbox.value); else set.delete(checkbox.value);
        return { ...prev, biggestChallenges: Array.from(set) };
      });
      setTouched((prev) => ({ ...prev, biggestChallenges: true }));
      return;
    }

    let limitedValue = value;
    if (name in CHAR_LIMITS) {
      const limit = CHAR_LIMITS[name as keyof typeof CHAR_LIMITS];
      if (value.length > limit) {
        limitedValue = value.slice(0, limit);
        toast({
          title: "Character limit reached",
          description: `Maximum ${limit} characters allowed for this field.`,
          variant: "destructive",
        });
      }
    }

    if (name === "stage" || name === "investmentLevel") {
      const selectEl = e.target as HTMLSelectElement;
      const selectedText = selectEl.options[selectEl.selectedIndex]?.text || limitedValue;
      setSelectWidths((prev) => ({ ...prev, [name]: `${selectedText.length + 2}ch` }));
    }
    setValues((prev) => ({ ...prev, [name]: limitedValue }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const whyNowRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (challengesRef.current && !challengesRef.current.contains(event.target as Node)) {
        setIsChallengesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    if (timeSinceLastSubmit < 10000) { 
      toast({
        title: "Please wait",
        description: "You're submitting too quickly. Please wait a moment.",
        variant: "destructive",
      });
      return;
    }

    if (isSubmitting) {
      return;
    }

    const currentErrors = getErrors(values);
    const hasErrors = Object.keys(currentErrors).length > 0;
    if (hasErrors) {
      setErrors(currentErrors);
      setTouched({
        name: true,
        email: true,
        projectName: true,
        projectLink: true,
        stage: true,
        investmentLevel: true,
        whyNow: true,
        biggestChallenges: true,
      });
      return;
    }

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const nameValue = values.name.trim();
    const emailValue = values.email.trim();
    const projectNameValue = values.projectName.trim();
    const projectLinkValue = values.projectLink.trim();
    const stageValue = values.stage;
    const investmentLevelValue = values.investmentLevel;
    const whyNowValue = values.whyNow.trim();
    const biggestChallengesValues = values.biggestChallenges;


    setIsSubmitting(true);

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
        toast({ 
          title: "✓ Submission successful!", 
          description: "Thank you for reaching out! We'll review your information and get back to you soon.",
          duration: 5000,
        });
        form.reset();
        setValues({ name: "", email: "", projectName: "", projectLink: "", stage: "", investmentLevel: "", whyNow: "", biggestChallenges: [] });
        setLastSubmitTime(now);
        setIsChallengesOpen(false);
      } else {
        toast({
          title: "Submission failed",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Submission failed",
        description: "Unable to connect. Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
          px-6 pt-20 pb-24 md:pt-24 md:pb-20 text-[#9EA5AD]
          /* Desktop grid mimics reference */
          md:grid md:grid-cols-12 md:auto-rows-min md:gap-x-10
        "
      >
        {/* Email and copyright - bottom right */}
        <div className="fixed bottom-6 right-6 md:bottom-14 md:right-24 z-20 font-subheading text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] opacity-80 leading-tight space-y-0.5">
          <div>CONTACT@SKULPTBRAND.COM</div>
          <div>2025 / ALL RIGHTS RESERVED</div>
        </div>

        <div className="md:hidden px-4">
          <div className="text-left">
            <p className="font-subheading text-[12px] leading-tight whitespace-pre-line mb-6">
              {`Drop a note using the form below.
Tell us where you are on your journey
and what you're building.
We'll take it from there.`}
            </p>

            <form id="contactForm" onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-md">
              {/* NAME */}
              <div className="w-full">
                <div className="group inline-flex items-center max-w-full">
                  <span className={`${fieldInvalid('name') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>[</span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="NAME"
                    className="bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-sm tracking-wide inline-block"
                    value={values.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    maxLength={CHAR_LIMITS.name}
                    style={{ textTransform: "none", width: "120px", maxWidth: "100%" }}
                  />
                  <span className={`${fieldInvalid('name') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>]</span>
                </div>
                {fieldInvalid('name') && (
                  <p className="mt-0.5 text-xs text-red-400">{fieldError('name')}</p>
                )}
              </div>

              {/* EMAIL */}
              <div className="w-full">
                <div className="group inline-flex items-center max-w-full">
                  <span className={`${fieldInvalid('email') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>[</span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="EMAIL"
                    className="bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-sm tracking-wide inline-block"
                    value={values.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    maxLength={CHAR_LIMITS.email}
                    style={{ textTransform: "none", width: "140px", maxWidth: "100%" }}
                  />
                  <span className={`${fieldInvalid('email') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>]</span>
                </div>
                {fieldInvalid('email') && (
                  <p className="mt-0.5 text-xs text-red-400">{fieldError('email')}</p>
                )}
              </div>

              {/* PROJECT NAME */}
              <div className="w-full">
                <div className="group inline-flex items-center max-w-full">
                  <span className={`${fieldInvalid('projectName') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>[</span>
                  <input
                    id="projectName"
                    name="projectName"
                    type="text"
                    placeholder="PROJECT NAME"
                    className="bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-sm tracking-wide inline-block"
                    value={values.projectName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    maxLength={CHAR_LIMITS.projectName}
                    style={{ textTransform: "none", width: "160px", maxWidth: "100%" }}
                  />
                  <span className={`${fieldInvalid('projectName') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>]</span>
                </div>
                {fieldInvalid('projectName') && (
                  <p className="mt-0.5 text-xs text-red-400">{fieldError('projectName')}</p>
                )}
              </div>

              {/* PROJECT LINK */}
              <div className="w-full">
                <div className="group inline-flex items-center max-w-full">
                  <span className={`${fieldInvalid('projectLink') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>[</span>
                  <input
                    id="projectLink"
                    name="projectLink"
                    type="url"
                    placeholder="URL"
                    className="bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-sm tracking-wide inline-block"
                    value={values.projectLink}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    maxLength={CHAR_LIMITS.projectLink}
                    style={{ textTransform: "none", width: "100px", maxWidth: "100%" }}
                  />
                  <span className={`${fieldInvalid('projectLink') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>]</span>
                </div>
                {fieldInvalid('projectLink') && (
                  <p className="mt-0.5 text-xs text-red-400">{fieldError('projectLink')}</p>
                )}
              </div>

              {/* STAGE (select) */}
              <div className="w-full">
                <div className="group inline-flex items-center max-w-full">
                  <span className={`${fieldInvalid('stage') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>[</span>
                  <select
                    id="stage"
                    name="stage"
                    className="bg-transparent border-0 text-[#9EA5AD]/60 placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-sm tracking-wide inline-block whitespace-nowrap appearance-none font-normal"
                    value={values.stage}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    style={{ width: selectWidths.stage, fontWeight: 400 }}
                    required
                  >
                    <option value="" className="bg-black">STAGE</option>
                    <option value="idea" className="bg-black">Just an idea</option>
                    <option value="mvp" className="bg-black">MVP launched / early users</option>
                    <option value="funded" className="bg-black">Funded and growing / scaling</option>
                    <option value="pivoting" className="bg-black">Pivoting or repositioning</option>
                  </select>
                  <span className={`${fieldInvalid('stage') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>]</span>
                </div>
                {fieldInvalid('stage') && (
                  <p className="mt-0.5 text-xs text-red-400">{fieldError('stage')}</p>
                )}
              </div>

              {/* BIGGEST CHALLENGE (dropdown with checkboxes) */}
              <div className="w-full" ref={challengesRef}>
                <div className="group inline-flex items-center max-w-full">
                  <span className={`${fieldInvalid('biggestChallenges') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>[</span>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsChallengesOpen(!isChallengesOpen)}
                      onBlur={() => setTouched((prev) => ({ ...prev, biggestChallenges: true }))}
                      className="bg-transparent border-0 text-[#9EA5AD]/60 focus:outline-none px-1.5 text-sm tracking-wide inline-block whitespace-nowrap appearance-none cursor-pointer font-normal"
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
                  <span className={`${fieldInvalid('biggestChallenges') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>]</span>
                </div>
                {fieldInvalid('biggestChallenges') && (
                  <p className="mt-0.5 text-xs text-red-400">{fieldError('biggestChallenges')}</p>
                )}
              </div>

              {/* LEVEL OF INVESTMENT (select) */}
              <div className="w-full">
                <div className="group inline-flex items-center max-w-full">
                  <span className={`${fieldInvalid('investmentLevel') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>[</span>
                  <select
                    id="investmentLevel"
                    name="investmentLevel"
                    className="bg-transparent border-0 text-[#9EA5AD]/60 placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-sm tracking-wide inline-block whitespace-nowrap appearance-none font-normal"
                    value={values.investmentLevel}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    style={{ width: selectWidths.investmentLevel, fontWeight: 400 }}
                    required
                  >
                    <option value="" className="bg-black">LEVEL OF INVESTMENT</option>
                    <option value="high" className="bg-black">High: fully ready to invest</option>
                    <option value="moderate" className="bg-black">Moderate: committed but need more information</option>
                    <option value="light" className="bg-black">Light: comparing options before deciding</option>
                    <option value="later" className="bg-black">Later: Not ready to invest</option>
                  </select>
                  <span className={`${fieldInvalid('investmentLevel') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>]</span>
                </div>
                {fieldInvalid('investmentLevel') && (
                  <p className="mt-0.5 text-xs text-red-400">{fieldError('investmentLevel')}</p>
                )}
              </div>

              {/* WHY NOW? (glass text box, no brackets) */}
              <div className="w-full max-w-xs">
                <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-md px-3 py-3 min-h-[100px]">
                  <textarea
                    id="whyNow"
                    name="whyNow"
                    placeholder="WHY NOW?"
                    rows={5}
                    className="w-full h-full bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none text-xs tracking-wide resize-none leading-relaxed"
                    value={values.whyNow}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    maxLength={CHAR_LIMITS.whyNow}
                    style={{ textTransform: "none" }}
                  />
                </div>
                {fieldInvalid('whyNow') && (
                  <p className="mt-0.5 text-xs text-red-400">{fieldError('whyNow')}</p>
                )}
              </div>
              
              <div className="mt-4 mb-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative text-lg font-light text-[#B8C1CB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-[#A0A9B4]">{isSubmitting ? 'submitting...' : 'submit to see if we\'re a fit'}</span>
                  <span
                    className="block h-[1.5px] bg-[#B8C1CB] mt-1 w-full origin-left transform transition-transform duration-500 ease-out group-hover:translate-x-full group-hover:scale-x-0"
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
            mt-6
          "
        >

          <p className="font-subheading text-[15px] leading-tight max-w-[420px] mb-6">
            Drop a note using the form below. Tell us where you are on your journey and what you&apos;re
            building. We&apos;ll take it from there.
          </p>

          <form
            id="contactForm"
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 w-full max-w-[420px] text-left"
          >
            {/* NAME */}
            <div className="w-full">
              <div className="group inline-flex items-center max-w-full">
                <span className={`${fieldInvalid('name') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>[</span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="NAME"
                  className="bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-base tracking-wide inline-block"
                  value={values.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  maxLength={CHAR_LIMITS.name}
                  style={{ textTransform: "none", width: "130px", maxWidth: "100%" }}
                />
                <span className={`${fieldInvalid('name') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>]</span>
              </div>
              {fieldInvalid('name') && (
                <p className="mt-0.5 text-xs text-red-400">{fieldError('name')}</p>
              )}
            </div>

            {/* EMAIL */}
            <div className="w-full">
              <div className="group inline-flex items-center max-w-full">
                <span className={`${fieldInvalid('email') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>[</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="EMAIL"
                  className="bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-base tracking-wide inline-block"
                  value={values.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  maxLength={CHAR_LIMITS.email}
                  style={{ textTransform: "none", width: "150px", maxWidth: "100%" }}
                />
                <span className={`${fieldInvalid('email') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>]</span>
              </div>
              {fieldInvalid('email') && (
                <p className="mt-0.5 text-xs text-red-400">{fieldError('email')}</p>
              )}
            </div>

            {/* PROJECT NAME */}
            <div className="w-full">
              <div className="group inline-flex items-center max-w-full">
                <span className={`${fieldInvalid('projectName') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>[</span>
                <input
                  id="projectName"
                  name="projectName"
                  type="text"
                  placeholder="PROJECT NAME"
                  className="bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-base tracking-wide inline-block"
                  value={values.projectName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  maxLength={CHAR_LIMITS.projectName}
                  style={{ textTransform: "none", width: "180px", maxWidth: "100%" }}
                />
                <span className={`${fieldInvalid('projectName') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>]</span>
              </div>
              {fieldInvalid('projectName') && (
                <p className="mt-0.5 text-xs text-red-400">{fieldError('projectName')}</p>
              )}
            </div>

            {/* PROJECT LINK */}
            <div className="w-full">
              <div className="group inline-flex items-center max-w-full">
                <span className={`${fieldInvalid('projectLink') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>[</span>
                <input
                  id="projectLink"
                  name="projectLink"
                  type="url"
                  placeholder="URL"
                  className="bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-base tracking-wide inline-block"
                  value={values.projectLink}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  maxLength={CHAR_LIMITS.projectLink}
                  style={{ textTransform: "none", width: "120px", maxWidth: "100%" }}
                />
                <span className={`${fieldInvalid('projectLink') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>]</span>
              </div>
              {fieldInvalid('projectLink') && (
                <p className="mt-0.5 text-xs text-red-400">{fieldError('projectLink')}</p>
              )}
            </div>

            {/* STAGE (select) */}
            <div className="w-full">
              <div className="group inline-flex items-center max-w-full">
                <span className={`${fieldInvalid('stage') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>[</span>
                <select
                  id="stage"
                  name="stage"
                  className="bg-transparent border-0 text-[#9EA5AD]/60 placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-base tracking-wide inline-block whitespace-nowrap appearance-none font-normal"
                  value={values.stage}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  style={{ width: selectWidths.stage, fontWeight: 400 }}
                >
                  <option value="" className="bg-black">STAGE</option>
                  <option value="idea" className="bg-black">Just an idea</option>
                  <option value="mvp" className="bg-black">MVP launched / early users</option>
                  <option value="funded" className="bg-black">Funded and growing / scaling</option>
                  <option value="pivoting" className="bg-black">Pivoting or repositioning</option>
                </select>
                <span className={`${fieldInvalid('stage') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>]</span>
              </div>
              {fieldInvalid('stage') && (
                <p className="mt-0.5 text-xs text-red-400">{fieldError('stage')}</p>
              )}
            </div>

            {/* BIGGEST CHALLENGE (dropdown with checkboxes) */}
            <div className="w-full" ref={challengesRef}>
              <div className="group inline-flex items-center max-w-full">
                <span className={`${fieldInvalid('biggestChallenges') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>[</span>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsChallengesOpen(!isChallengesOpen)}
                    onBlur={() => setTouched((prev) => ({ ...prev, biggestChallenges: true }))}
                    className="bg-transparent border-0 text-[#9EA5AD]/60 focus:outline-none px-1.5 text-base tracking-wide inline-block whitespace-nowrap appearance-none cursor-pointer font-normal"
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
                <span className={`${fieldInvalid('biggestChallenges') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>]</span>
              </div>
              {fieldInvalid('biggestChallenges') && (
                <p className="mt-0.5 text-xs text-red-400">{fieldError('biggestChallenges')}</p>
              )}
            </div>

            {/* LEVEL OF INVESTMENT (select) */}
            <div className="w-full">
              <div className="group inline-flex items-center max-w-full">
                <span className={`${fieldInvalid('investmentLevel') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>[</span>
                <select
                  id="investmentLevel"
                  name="investmentLevel"
                  className="bg-transparent border-0 text-[#9EA5AD]/60 placeholder:text-[#9EA5AD]/60 focus:outline-none px-1.5 text-base tracking-wide inline-block whitespace-nowrap appearance-none font-normal"
                  value={values.investmentLevel}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  style={{ width: selectWidths.investmentLevel, fontWeight: 400 }}
                  required
                >
                  <option value="" className="bg-black">LEVEL OF INVESTMENT</option>
                  <option value="high" className="bg-black">High: fully ready to invest</option>
                  <option value="moderate" className="bg-black">Moderate: committed but need more information</option>
                  <option value="light" className="bg-black">Light: comparing options before deciding</option>
                  <option value="later" className="bg-black">Later: Not ready to invest</option>
                </select>
                <span className={`${fieldInvalid('investmentLevel') ? 'text-red-500' : 'text-[#9EA5AD]/90 group-hover:text-white'} transition-colors text-2xl`}>]</span>
              </div>
              {fieldInvalid('investmentLevel') && (
                <p className="mt-0.5 text-xs text-red-400">{fieldError('investmentLevel')}</p>
              )}
            </div>

            {/* WHY NOW? (glass text box, no brackets, last) */}
            <div className="w-full max-w-sm">
              <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-md px-4 py-4 min-h-[120px]">
                <textarea
                  id="whyNow"
                  name="whyNow"
                  placeholder="WHY NOW?"
                  rows={6}
                  className="w-full h-full bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none text-sm tracking-wide resize-none leading-relaxed"
                  value={values.whyNow}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  maxLength={CHAR_LIMITS.whyNow}
                  style={{ textTransform: "none" }}
                />
              </div>
              {fieldInvalid('whyNow') && (
                <p className="mt-0.5 text-xs text-red-400">{fieldError('whyNow')}</p>
              )}
            </div>
            
            <div className="mt-5 mb-8">
              <button
                type="submit"
                form="contactForm"
                disabled={isSubmitting}
                className="group relative text-xl font-light text-[#B8C1CB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-[#A0A9B4]">{isSubmitting ? 'submitting...' : 'submit to see if we\'re a fit'}</span>
                <span
                  className="block h-[1.5px] bg-[#B8C1CB] mt-1 w-full origin-left transform transition-transform duration-500 ease-out group-hover:translate-x-full group-hover:scale-x-0"
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
