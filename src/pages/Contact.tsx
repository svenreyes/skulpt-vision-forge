import { Canvas } from "@react-three/fiber";
import { SmokeBackground } from "@/components/SmokeBackground";
import { Suspense } from "react";
import { SShape } from "@/components/SShape";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const nameValue = formData.get('name');
    const emailValue = formData.get('email');
    const messageValue = formData.get('message');

    try {
      const response = await fetch('https://hook.us2.make.com/2bwc6n8rxrjij77cun2lnak6aej58nyx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameValue,
          email: emailValue,
          message: messageValue,
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden text-white font-nersans-two">
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

      {/* Contact form */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="relative">
          {/* Glass overlay */}
          <div 
            className="absolute inset-0 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl"
            style={{
              background: 'radial-gradient(at 100% 0%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0) 100%)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.18)'
            }}
          >
            {/* Animated gradient border */}
            <div 
              className="absolute inset-0 rounded-2xl p-px"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                animation: 'shimmer 8s linear infinite',
                backgroundSize: '200% 200%'
              }}
            />
          </div>
          
          {/* Form content */}
          <form
            onSubmit={handleSubmit}
            className="relative z-10 space-y-8 p-8 animate-in fade-in slide-in-from-bottom-6 duration-700"
          >
        <h1 className="mb-4 text-center text-4xl font-bold tracking-wide">
          Let's Connect
        </h1>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Name
            </label>
            <Input id="name" name="name" required placeholder="Your name" className="bg-transparent border-0 border-b-2 border-white/70 focus:border-white focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none placeholder:text-white/60 outline-none" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="bg-transparent border-0 border-b-2 border-white/70 focus:border-white focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none placeholder:text-white/60 outline-none"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Tell us a bit about your project…"
              className="bg-transparent border-0 border-b-2 border-white/70 focus:border-white focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none placeholder:text-white/60 outline-none"
            />
          </div>
        </div>
            <Button type="submit" className="w-full border border-white/70 bg-transparent py-2 hover:bg-white/10 transition">
              Send Message
            </Button>
          </form>
        </div>
      </div>
      
      {/* Animation styles */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
