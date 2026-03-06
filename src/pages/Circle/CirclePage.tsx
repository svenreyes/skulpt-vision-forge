import { useState, useEffect, lazy, Suspense, type FormEvent } from "react";
import { Navbar, Seo, CloudyBackground, Footer } from "@components";
import { API_ENDPOINTS } from "@/lib/constants";
import dropSvg from "@assets/drop.svg";

const World = lazy(() =>
  import("@/components/ui/globe").then((m) => ({ default: m.World })),
);

const CIRCLE_FAQ = [
  {
    question: "What is SKULPT Circle?",
    answer:
      "The exclusive hub for partners who have completed the Skulpting Process—with brand advisory, activation sessions, and curated resources.",
  },
  {
    question: "How do i join the Circle?",
    answer:
      "Complete the Skulpting Process and become a brand partner. The Circle is for founders who have finished that journey.",
  },
  {
    question: "Who is in the Circle?",
    answer:
      "Partners who have completed the Skulpting Process, plus the broader founder ecosystem: sweat-equity portfolio, accelerators, and creative communities globally.",
  },
];

const STEEL_BLUE = "#96A3AC";

const GLOBE_CONFIG = {
  pointSize: 4,
  globeColor: "#000000",
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.1,
  emissive: "#000000",
  emissiveIntensity: 0.05,
  shininess: 0.4,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#38bdf8",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

const ARC_COLORS = ["#06b6d4", "#3b82f6", "#6366f1"];
const randomColor = () => ARC_COLORS[Math.floor(Math.random() * ARC_COLORS.length)];

const SAMPLE_ARCS = [
  { order: 1, startLat: -19.885592, startLng: -43.951191, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.1, color: randomColor() },
  { order: 1, startLat: 28.6139, startLng: 77.209, endLat: 3.139, endLng: 101.6869, arcAlt: 0.2, color: randomColor() },
  { order: 1, startLat: -19.885592, startLng: -43.951191, endLat: -1.303396, endLng: 36.852443, arcAlt: 0.5, color: randomColor() },
  { order: 2, startLat: 1.3521, startLng: 103.8198, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.2, color: randomColor() },
  { order: 2, startLat: 51.5072, startLng: -0.1276, endLat: 3.139, endLng: 101.6869, arcAlt: 0.3, color: randomColor() },
  { order: 2, startLat: -15.785493, startLng: -47.909029, endLat: 36.162809, endLng: -115.119411, arcAlt: 0.3, color: randomColor() },
  { order: 3, startLat: -33.8688, startLng: 151.2093, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3, color: randomColor() },
  { order: 3, startLat: 21.3099, startLng: -157.8581, endLat: 40.7128, endLng: -74.006, arcAlt: 0.3, color: randomColor() },
  { order: 3, startLat: -6.2088, startLng: 106.8456, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: randomColor() },
  { order: 4, startLat: 11.986597, startLng: 8.571831, endLat: -15.595412, endLng: -56.05918, arcAlt: 0.5, color: randomColor() },
  { order: 4, startLat: -34.6037, startLng: -58.3816, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.7, color: randomColor() },
  { order: 4, startLat: 51.5072, startLng: -0.1276, endLat: 48.8566, endLng: -2.3522, arcAlt: 0.1, color: randomColor() },
  { order: 5, startLat: 14.5995, startLng: 120.9842, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: randomColor() },
  { order: 5, startLat: 1.3521, startLng: 103.8198, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.2, color: randomColor() },
  { order: 5, startLat: 34.0522, startLng: -118.2437, endLat: 48.8566, endLng: -2.3522, arcAlt: 0.2, color: randomColor() },
  { order: 6, startLat: -15.432563, startLng: 28.315853, endLat: 1.094136, endLng: -63.34546, arcAlt: 0.7, color: randomColor() },
  { order: 6, startLat: 37.5665, startLng: 126.978, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.1, color: randomColor() },
  { order: 6, startLat: 22.3193, startLng: 114.1694, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: randomColor() },
  { order: 7, startLat: -19.885592, startLng: -43.951191, endLat: -15.595412, endLng: -56.05918, arcAlt: 0.1, color: randomColor() },
  { order: 7, startLat: 48.8566, startLng: -2.3522, endLat: 52.52, endLng: 13.405, arcAlt: 0.1, color: randomColor() },
  { order: 7, startLat: 52.52, startLng: 13.405, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: randomColor() },
  { order: 8, startLat: -8.833221, startLng: 13.264837, endLat: -33.936138, endLng: 18.436529, arcAlt: 0.2, color: randomColor() },
  { order: 8, startLat: 49.2827, startLng: -123.1207, endLat: 52.3676, endLng: 4.9041, arcAlt: 0.2, color: randomColor() },
  { order: 8, startLat: 1.3521, startLng: 103.8198, endLat: 40.7128, endLng: -74.006, arcAlt: 0.5, color: randomColor() },
  { order: 9, startLat: 51.5072, startLng: -0.1276, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: randomColor() },
  { order: 9, startLat: 22.3193, startLng: 114.1694, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.7, color: randomColor() },
  { order: 9, startLat: 1.3521, startLng: 103.8198, endLat: -34.6037, endLng: -58.3816, arcAlt: 0.5, color: randomColor() },
  { order: 10, startLat: -22.9068, startLng: -43.1729, endLat: 28.6139, endLng: 77.209, arcAlt: 0.7, color: randomColor() },
  { order: 10, startLat: 34.0522, startLng: -118.2437, endLat: 31.2304, endLng: 121.4737, arcAlt: 0.3, color: randomColor() },
  { order: 10, startLat: -6.2088, startLng: 106.8456, endLat: 52.3676, endLng: 4.9041, arcAlt: 0.3, color: randomColor() },
  { order: 11, startLat: 41.9028, startLng: 12.4964, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: randomColor() },
  { order: 11, startLat: -6.2088, startLng: 106.8456, endLat: 31.2304, endLng: 121.4737, arcAlt: 0.2, color: randomColor() },
  { order: 11, startLat: 22.3193, startLng: 114.1694, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.2, color: randomColor() },
  { order: 12, startLat: 34.0522, startLng: -118.2437, endLat: 37.7749, endLng: -122.4194, arcAlt: 0.1, color: randomColor() },
  { order: 12, startLat: 35.6762, startLng: 139.6503, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.2, color: randomColor() },
  { order: 12, startLat: 22.3193, startLng: 114.1694, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.3, color: randomColor() },
  { order: 13, startLat: 52.52, startLng: 13.405, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3, color: randomColor() },
  { order: 13, startLat: 11.986597, startLng: 8.571831, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.3, color: randomColor() },
  { order: 13, startLat: -22.9068, startLng: -43.1729, endLat: -34.6037, endLng: -58.3816, arcAlt: 0.1, color: randomColor() },
  { order: 14, startLat: -33.936138, startLng: 18.436529, endLat: 21.395643, endLng: 39.883798, arcAlt: 0.3, color: randomColor() },
];

type Phase = "login" | "animating" | "greeting" | "landing";

export default function CirclePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("login");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await fetch(API_ENDPOINTS.CIRCLE_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email || "preview", password: password || "preview" }),
      });
    } catch {
      // Temporary: any login works for preview
    } finally {
      setLoading(false);
    }

    setPhase("animating");
  };

  useEffect(() => {
    if (phase === "animating") {
      const id = setTimeout(() => setPhase("greeting"), 1200);
      return () => clearTimeout(id);
    }
    if (phase === "greeting") {
      const id = setTimeout(() => setPhase("landing"), 2000);
      return () => clearTimeout(id);
    }
  }, [phase]);

  const isInside = phase === "greeting" || phase === "landing";

  const inputClass =
    "w-full rounded-xl border border-white/40 bg-white/25 backdrop-blur-md px-5 py-3 font-subheading text-[13px] text-white/80 tracking-wide placeholder:text-white/70 focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors hover:bg-white/35";

  return (
    <>
      <Seo
        title="Circle | SKULPT"
        description="Log in to Circle — SKULPT's private community for founders and creative leaders."
        path="/circle"
        type="website"
      />

      <style>{`
        @keyframes circle-expand {
          0%   { transform: scale(1); }
          100% { transform: scale(6); }
        }
        .circle-expanding {
          animation: circle-expand 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes greeting-in {
          0%   { opacity: 0; transform: translateY(20px); }
          30%  { opacity: 1; transform: translateY(0); }
          80%  { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .greeting-text {
          animation: greeting-in 2s ease-in-out forwards;
        }
        @keyframes fade-in-up {
          0%   { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>

      <div
        className="relative min-h-screen w-full overflow-x-hidden overflow-y-auto"
        style={{
          background: isInside ? STEEL_BLUE : "#EBE6F0",
          transition: phase === "animating" ? "background 1.2s ease-out" : "none",
        }}
      >
        {phase === "login" && (
          <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
            <CloudyBackground zIndex={0} />
          </div>
        )}

        <div className="relative z-50">
          <Navbar light={isInside} />
        </div>

        {/* Login screen */}
        {phase === "login" && (
          <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: "min(80vw, 80vh)",
                height: "min(80vw, 80vh)",
                background: `radial-gradient(circle, ${STEEL_BLUE} 0%, rgba(150,163,172,0.7) 30%, rgba(150,163,172,0.35) 60%, transparent 100%)`,
                filter: "blur(30px)",
              }}
            />

            <form
              onSubmit={handleSubmit}
              className="relative flex flex-col items-center gap-5 w-full max-w-[280px]"
            >
              <p className="font-subheading text-white/90 text-[15px] tracking-wide mb-2">
                Log in here
              </p>

              <label className="sr-only" htmlFor="circle-email">Email</label>
              <input
                id="circle-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email   ›"
                className={inputClass}
              />

              <label className="sr-only" htmlFor="circle-password">Password</label>
              <input
                id="circle-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password   ›"
                className={inputClass}
              />

              {error && (
                <p className="text-red-400/80 text-xs font-subheading">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-xl border border-white/40 bg-white/20 backdrop-blur-md px-5 py-3 font-subheading text-[13px] text-white/90 tracking-wide hover:bg-white/30 focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors disabled:opacity-60"
              >
                {loading ? "Logging in…" : "Log in →"}
              </button>
            </form>

            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 animate-bounce"
              aria-hidden
            >
              <span className="font-subheading text-[11px] text-[#9EA5AD] tracking-widest uppercase">
                Scroll
              </span>
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none" className="text-[#9EA5AD]">
                <path d="M2 2l8 8 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </section>
        )}

        {/* Circle expansion animation */}
        {phase === "animating" && (
          <section className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
            <div
              className="rounded-full circle-expanding"
              style={{
                width: "min(80vw, 80vh)",
                height: "min(80vw, 80vh)",
                background: STEEL_BLUE,
              }}
            />
          </section>
        )}

        {/* Greeting flash — fades in then out over 2s */}
        {phase === "greeting" && (
          <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
            <h1 className="font-subheading text-white/80 text-3xl sm:text-4xl md:text-5xl tracking-wide greeting-text">
              we've been expecting you
            </h1>
          </section>
        )}

        {/* Landing sub-page — the actual inside */}
        {phase === "landing" && (
          <article className="relative z-10" aria-label="SKULPT Circle Dashboard">
            {/* Fixed globe background with blur */}
            <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
              <div className="absolute inset-0" style={{ filter: "blur(5px)" }}>
                <Suspense fallback={null}>
                  <World data={SAMPLE_ARCS} globeConfig={GLOBE_CONFIG} />
                </Suspense>
              </div>
            </div>

            {/* Scrollable content over the globe */}
            <header className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
              <h1 className="font-subheading text-white/85 text-3xl sm:text-4xl md:text-5xl tracking-wide fade-in-up">
                Orbit around SKULPT Circle
              </h1>
              <p
                className="mt-4 font-subheading text-white/60 text-base sm:text-lg tracking-wide fade-in-up"
                style={{ animationDelay: "0.15s" }}
              >
                our exclusive founder ecosystem
              </p>
            </header>

            <div className="relative z-10 min-h-screen" />
          </article>
        )}

        {/* FAQ (pre-login only) */}
        {phase === "login" && (
          <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
            <h2 className="font-subheading text-[#9EA5AD] text-2xl sm:text-3xl tracking-wide mb-12">
              FAQ
            </h2>
            <ul className="w-full max-w-md space-y-14">
              {CIRCLE_FAQ.map(({ question, answer }, index) => (
                <li key={question} className="min-h-[5rem]">
                  <button
                    type="button"
                    onClick={() => setFaqOpenIndex((i) => (i === index ? null : index))}
                    className="w-full flex items-center justify-center gap-4 group focus:outline-none text-left"
                    aria-expanded={faqOpenIndex === index}
                    aria-controls={`circle-faq-answer-${index}`}
                  >
                    <p className="font-subheading text-[#9EA5AD] text-base sm:text-lg group-hover:text-[#7A828A] transition-colors flex-1 text-center">
                      {question}
                    </p>
                    <img
                      src={dropSvg}
                      alt=""
                      aria-hidden
                      className={`w-3 h-3 flex-shrink-0 object-contain opacity-70 transition-transform duration-300 ease-out ml-2 ${
                        faqOpenIndex === index ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  </button>
                  <div
                    id={`circle-faq-answer-${index}`}
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      faqOpenIndex === index ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="mt-3 font-subheading text-[#9EA5AD] text-sm sm:text-base text-center max-w-lg mx-auto leading-relaxed">
                      {answer}
                    </p>
                  </div>
                  <hr className="mt-4 mx-auto w-1/2 border-t border-[#D8DDE4]/80" />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Footer (pre-login only) */}
        {phase === "login" && (
          <div className="relative z-10">
            <Footer />
          </div>
        )}
      </div>
    </>
  );
}
