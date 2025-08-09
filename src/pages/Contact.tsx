import { Canvas } from "@react-three/fiber";
import { SmokeBackground } from "@/components/SmokeBackground";
import { Suspense } from "react";
import { SShape } from "@/components/SShape";
import { Navbar } from "@/components/Navbar";
import arrowUrl from "@/assets/arrow.svg";



import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const nameValue = formData.get('name');
    const emailValue = formData.get('email');
    const lookingForValue = formData.get('lookingFor');

    try {
      const response = await fetch('https://hook.us2.make.com/2bwc6n8rxrjij77cun2lnak6aej58nyx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameValue,
          email: emailValue,
          message: lookingForValue,
          timestamp: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        toast({
          title: "Thank you for reaching out!",
          description: "We'll get back to you soon.",
        });
        form.reset();
      } else {
        toast({
          title: "Submission failed",
          description: "Please try again later.",
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: 'destructive',
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
        {/* Smokey animated background */}
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

      {/* Main layout (add top padding to clear Navbar) */}
      <div className="relative z-10 w-full h-full min-h-screen flex flex-col justify-between text-xs tracking-wider px-6 py-6 pt-24 md:pt-28 text-[#9EA5AD]">
        {/* Top Row */}
        <div className="flex w-full justify-between items-start text-[#9EA5AD] text-[13px] font-body">
          <div className="flex flex-col gap-0">
            <div>FREYA LINDEQVIST</div>
            <div className="opacity-80">CO-FOUNDER</div>
          </div>
          <div className="flex flex-col gap-0">
            <div>LUICA JUEGUEN</div>
            <div className="opacity-80">CO-FOUNDER</div>
          </div>
          <div className="flex flex-col gap-0 text-right max-w-[260px] text-[#9EA5AD]">
            <div>STOCKHOLM, SWEDEN</div>
            <div>CONTACT@SKULPT.COM</div>
            <div className="mt-2">2025 SKULPT / ALL RIGHTS RESERVED</div>
          </div>
          {/* Removed CLOSE link */}
        </div>

        {/* Middle Section - only the form on the right */}
        <div className="flex-1 flex flex-row items-center justify-end w-full pt-12 pb-8">
          {/* Contact Form */}
          <div className="flex flex-col items-end text-right gap-4 min-w-[340px]">
            <p className="text-[13px] font-body leading-tight text-[#9EA5AD] text-left normal-case whitespace-pre-line max-w-[360px]">
              {`Drop a note using the form below.
Tell us where you are on your journey
and what you're building.
We'll take it from there.`}
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-[400px] relative">
              {[
                { id: 'name', type: 'text', placeholder: 'NAME' },
                { id: 'email', type: 'email', placeholder: 'EMAIL', required: true },
                { id: 'lookingFor', type: 'text', placeholder: 'WHAT YOU\'RE LOOKING FOR' },
              ].map((field) => (
                <div key={field.id} className="relative w-full">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[#9EA5AD]/90 text-2xl">[</span>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                    className="bg-transparent border-0 text-[#9EA5AD] placeholder:text-[#9EA5AD]/60 focus:outline-none py-2 px-8 text-lg font-body tracking-wide w-full"
                    style={{ textTransform: 'none' }}
                  />
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#9EA5AD]/90 text-2xl">]</span>
                </div>
              ))}
              <button type="submit" className="mt-4 text-left text-[#9EA5AD] hover:underline">SEND MESSAGE</button>
            </form>
          </div>
        </div>

        {/* Footer CTA line */}
        <div className="w-full flex flex-col items-center justify-end gap-6 mt-auto">
          <h3 className="text-base text-[20px] sm:text-[40px] md:text-[60px] lg:text-[90px] font-light text-[#B8C1CB]">
            Let's <span className=" pr-4 italic text-[#A0A9B4]">Connect</span >{' '}
            <img src={arrowUrl} alt="arrow" className="inline-block w-5 h-5 mb-1 -rotate-45 scale-[2.5]" />
          </h3>

          {/* Footer - SKULPT */}
          <div className="w-full flex justify-center items-end">
          <span className="text-[#9EA5AD] text-[60px] sm:text-[90px] md:text-[120px] lg:text-[140px] font-nersans-two tracking-tight leading-none select-none" style={{letterSpacing:'-0.03em'}}>
            SKULPT
          </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
