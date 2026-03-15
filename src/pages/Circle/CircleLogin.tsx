import { useState, type FormEvent } from "react";
import { CloudyBackground, Footer } from "@components";
import { API_ENDPOINTS } from "@/lib/constants";
import dropSvg from "@assets/drop.svg";

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

const inputClass =
  "w-full rounded-xl border border-white/40 bg-white/25 backdrop-blur-md px-5 py-3 font-subheading text-[13px] text-white/80 tracking-wide placeholder:text-white/70 focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors hover:bg-white/35";

interface CircleLoginProps {
  onLogin: () => void;
}

export default function CircleLogin({ onLogin }: CircleLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

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

    onLogin();
  };

  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <CloudyBackground zIndex={0} />
      </div>

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "min(80vw, 80vh)",
            height: "min(80vw, 80vh)",
            background: `radial-gradient(circle, #96A3AC 0%, rgba(150,163,172,0.7) 30%, rgba(150,163,172,0.35) 60%, transparent 100%)`,
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

      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
