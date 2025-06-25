import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { SShape } from "@/components/SShape";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Basic demo – surface a toast. Integrate API / email service as needed.
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out – we‘ll get back to you soon.",
    });
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden text-white font-nersans-two">
      {/* Three.js background */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <SShape />
        </Suspense>
      </Canvas>

      {/* Contact form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-lg space-y-8 p-6 animate-in fade-in slide-in-from-bottom-6 duration-700"
      >
        <h1 className="mb-4 text-center text-4xl font-bold tracking-wide">
          Let’s Connect
        </h1>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Name
            </label>
            <Input id="name" name="name" required placeholder="Your name" className="bg-transparent border-0 border-b-2 border-white/70 focus:border-white focus:ring-0 rounded-none placeholder:text-white/60" />
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
              className="bg-transparent border-0 border-b-2 border-white/70 focus:border-white focus:ring-0 rounded-none placeholder:text-white/60"
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
              className="bg-transparent border-0 border-b-2 border-white/70 focus:border-white focus:ring-0 rounded-none placeholder:text-white/60"
            />
          </div>
        </div>
        <Button type="submit" className="w-full border border-white/70 bg-transparent py-2 hover:bg-white/10 transition">
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default Contact;
