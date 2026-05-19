import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { CloudyBackground, Footer, Navbar, Seo } from "@components";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

type Phase = "exchanging" | "ready" | "saving" | "done" | "error" | "expired";

// Hard ceiling for the token exchange. If Supabase / network hangs we surface
// an actionable error instead of leaving the user on the loading screen.
const EXCHANGE_TIMEOUT_MS = 12_000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), ms);
    promise
      .then((v) => {
        clearTimeout(timer);
        resolve(v);
      })
      .catch((e) => {
        clearTimeout(timer);
        reject(e);
      });
  });
}

const EXPIRED_PATTERNS = [
  "invalid",
  "expired",
  "otp_expired",
  "access_denied",
  "not found",
];

function looksExpired(message: string | null | undefined): boolean {
  if (!message) return false;
  const lower = message.toLowerCase();
  return EXPIRED_PATTERNS.some((p) => lower.includes(p));
}

const inputClass =
  "w-full rounded-xl border border-white/40 bg-white/25 backdrop-blur-md px-5 py-3 font-subheading text-[13px] text-white/85 tracking-wide placeholder:text-white/55 focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors hover:bg-white/35";

/**
 * Lands here from the Supabase invite email. The invite link includes either:
 *   - a `?code=...` PKCE code (newer Supabase auth) — exchange for a session
 *   - a `#access_token=...&refresh_token=...&type=invite` hash (legacy) — set
 *     the session directly
 * Once we have a session, the user picks a password and fills in their profile.
 */
export default function CircleAcceptInvite() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("exchanging");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [titleCompany, setTitleCompany] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function exchange() {
      if (!isSupabaseConfigured) {
        if (!cancelled) {
          setPhase("error");
          setErrorMsg("Authentication is not configured. Please contact SKULPT.");
        }
        return;
      }

      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      const hash = window.location.hash.startsWith("#")
        ? new URLSearchParams(window.location.hash.slice(1))
        : null;
      const hashAccessToken = hash?.get("access_token");
      const hashRefreshToken = hash?.get("refresh_token");
      const hashError = hash?.get("error_description") ?? url.searchParams.get("error_description");

      if (hashError) {
        if (!cancelled) {
          const decoded = decodeURIComponent(hashError);
          setPhase(looksExpired(decoded) ? "expired" : "error");
          setErrorMsg(decoded);
        }
        return;
      }

      try {
        if (code) {
          const { error } = await withTimeout(
            supabase.auth.exchangeCodeForSession(code),
            EXCHANGE_TIMEOUT_MS,
          );
          if (error) throw error;
        } else if (hashAccessToken && hashRefreshToken) {
          const { error } = await withTimeout(
            supabase.auth.setSession({
              access_token: hashAccessToken,
              refresh_token: hashRefreshToken,
            }),
            EXCHANGE_TIMEOUT_MS,
          );
          if (error) throw error;
        } else {
          // Possibly a resumed session (user clicked the link, set their stuff,
          // then came back). Fall through and rely on the active session.
          const { data } = await withTimeout(
            supabase.auth.getSession(),
            EXCHANGE_TIMEOUT_MS,
          );
          if (!data.session) {
            throw new Error("This invite link is invalid or has expired.");
          }
        }

        // Strip token params from the URL so refreshes don't try to re-exchange.
        window.history.replaceState({}, document.title, window.location.pathname);

        const { data } = await supabase.auth.getUser();
        const meta = data.user?.user_metadata as { full_name?: string } | undefined;
        if (meta?.full_name && !cancelled) setFullName(meta.full_name);

        if (!cancelled) setPhase("ready");
      } catch (err) {
        if (cancelled) return;
        const message =
          err instanceof Error
            ? err.message === "timeout"
              ? "Verifying took too long. Check your connection and try the link again."
              : err.message
            : "Couldn't verify this invite link. Try requesting a new invite.";
        setPhase(looksExpired(message) ? "expired" : "error");
        setErrorMsg(message);
      }
    }

    exchange();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password.length < 10) {
      setErrorMsg("Password must be at least 10 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords don't match.");
      return;
    }
    if (!fullName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    setPhase("saving");

    const { error: passwordError } = await supabase.auth.updateUser({ password });
    if (passwordError) {
      setPhase("ready");
      setErrorMsg(passwordError.message);
      return;
    }

    const { data: userData } = await supabase.auth.getUser();
    const uid = userData.user?.id;
    if (!uid) {
      setPhase("error");
      setErrorMsg("Session expired. Try the invite link again.");
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim(),
        location: location.trim() || null,
        linkedin_url: linkedin.trim() || null,
        title_company: titleCompany.trim() || null,
        accepted_at: new Date().toISOString(),
      })
      .eq("id", uid);

    if (profileError) {
      setPhase("ready");
      setErrorMsg(profileError.message);
      return;
    }

    setPhase("done");
    setTimeout(() => navigate("/circle", { replace: true }), 800);
  };

  return (
    <>
      <Seo
        title="Accept your Circle invite | SKULPT"
        description="Complete your SKULPT Circle profile."
        path="/circle/accept-invite"
        type="website"
      />

      <div
        className="relative w-full min-h-screen overflow-x-hidden"
        style={{ background: "#CDD5DB" }}
      >
        <div className="relative z-50">
          <Navbar />
        </div>

        <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
          <CloudyBackground zIndex={0} />
        </div>

        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24">
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "min(80vw, 80vh)",
              height: "min(80vw, 80vh)",
              background: `radial-gradient(circle, #96A3AC 0%, rgba(150,163,172,0.7) 30%, rgba(150,163,172,0.35) 60%, transparent 100%)`,
              filter: "blur(30px)",
            }}
          />

          {phase === "exchanging" && (
            <p className="relative font-subheading text-white/80 text-sm tracking-widest uppercase opacity-80">
              Verifying your invite…
            </p>
          )}

          {phase === "expired" && (
            <div className="relative flex flex-col items-center gap-4 max-w-md text-center">
              <p className="font-subheading text-white/90 text-2xl tracking-wide">
                This invite has expired
              </p>
              <p className="font-subheading text-white/70 text-sm leading-relaxed">
                Invite links are single-use and time-limited. If you've already
                set your password, just sign in. Otherwise, ask a SKULPT admin
                to send you a fresh invite.
              </p>
              <div className="flex items-center gap-5 mt-2">
                <a
                  href="/circle"
                  className="font-subheading text-white/85 text-xs tracking-[0.18em] uppercase underline hover:text-white"
                >
                  Sign in
                </a>
                <a
                  href="mailto:contact@skulptbrand.com?subject=Circle%20invite%20expired"
                  className="font-subheading text-white/60 text-xs tracking-[0.18em] uppercase underline hover:text-white"
                >
                  Request a new invite
                </a>
              </div>
            </div>
          )}

          {phase === "error" && (
            <div className="relative flex flex-col items-center gap-4 max-w-md text-center">
              <p className="font-subheading text-white/90 text-2xl tracking-wide">
                Something's off
              </p>
              <p className="font-subheading text-white/70 text-sm leading-relaxed">
                {errorMsg ?? "We couldn't verify this invite link."}
              </p>
              <a
                href="/circle"
                className="mt-2 font-subheading text-white/80 text-xs tracking-[0.18em] uppercase underline hover:text-white"
              >
                Back to Circle
              </a>
            </div>
          )}

          {(phase === "ready" || phase === "saving") && (
            <form
              onSubmit={handleSubmit}
              className="relative flex flex-col items-stretch gap-4 w-full max-w-[340px]"
            >
              <div className="text-center mb-2">
                <p className="font-subheading text-white/85 text-xl tracking-wide">
                  Welcome to Circle
                </p>
                <p className="font-subheading text-white/60 text-[11px] tracking-wide mt-1">
                  Set your password and complete your profile
                </p>
              </div>

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full name"
                className={inputClass}
                autoComplete="name"
                required
                maxLength={120}
              />

              <input
                type="text"
                value={titleCompany}
                onChange={(e) => setTitleCompany(e.target.value)}
                placeholder="Title and/or company"
                className={inputClass}
                maxLength={200}
              />

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className={inputClass}
                maxLength={120}
              />

              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="LinkedIn URL"
                className={inputClass}
                maxLength={300}
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password"
                className={inputClass}
                autoComplete="new-password"
                required
                minLength={10}
              />

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className={inputClass}
                autoComplete="new-password"
                required
                minLength={10}
              />

              {errorMsg && (
                <p className="text-red-300/90 text-xs font-subheading text-center">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={phase === "saving"}
                className="mt-2 w-full rounded-xl border border-white/40 bg-white/20 backdrop-blur-md px-5 py-3 font-subheading text-[13px] text-white/90 tracking-wide hover:bg-white/30 focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors disabled:opacity-60"
              >
                {phase === "saving" ? "Saving…" : "Enter the Circle →"}
              </button>
            </form>
          )}

          {phase === "done" && (
            <p className="relative font-subheading text-white/90 text-2xl tracking-wide">
              You're in.
            </p>
          )}
        </section>

        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </>
  );
}
