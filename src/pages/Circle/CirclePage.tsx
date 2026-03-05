import { useState, type FormEvent } from "react";
import { Navbar, Seo, CloudyBackground } from "@components";
import { API_ENDPOINTS } from "@/lib/constants";

export default function CirclePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(API_ENDPOINTS.CIRCLE_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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

      <div
        className="relative min-h-screen w-full overflow-hidden"
        style={{ background: "#EBE6F0" }}
      >
        <div className="absolute inset-0 z-0">
          <CloudyBackground zIndex={0} />
        </div>

        <div className="relative z-50">
          <Navbar />
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          {/* Soft blurred circle backdrop */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "min(80vw, 80vh)",
              height: "min(80vw, 80vh)",
              background:
                "radial-gradient(circle, rgba(200,185,170,0.35) 0%, rgba(160,145,185,0.6) 18%, rgba(120,105,175,0.8) 55%, rgba(140,125,185,0.55) 50%, rgba(170,160,205,0.3) 65%, rgba(200,195,225,0.12) 80%, transparent 100%)",
              filter: "blur(20px)",
            }}
          />

          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col items-center gap-5 w-full max-w-[280px]"
          >
            <p
              className="font-subheading text-white/90 text-[15px] tracking-wide mb-2"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.15), 0 0px 8px rgba(255,255,255,0.25)" }}
            >
              Log in here
            </p>

            <label className="sr-only" htmlFor="circle-email">
              Email
            </label>
            <input
              id="circle-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email   ›"
              className={inputClass}
            />

            <label className="sr-only" htmlFor="circle-password">
              Password
            </label>
            <input
              id="circle-password"
              type="password"
              required
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
              className="mt-1 font-subheading text-[12px] text-white/50 tracking-wide hover:text-white/80 transition-colors focus:outline-none focus:text-white/80"
            >
              {loading ? "Logging in…" : "Log in →"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
