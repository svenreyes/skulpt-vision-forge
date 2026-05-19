import { useState, useEffect, useCallback } from "react";
import { Navbar, Seo } from "@components";
import { supabase } from "@/lib/supabase";
import { syncProfile, type CircleSyncResponse } from "@/lib/circle";
import CircleLogin from "./CircleLogin";
import CircleDashboard from "./CircleDashboard";
import logo3dGif from "@assets/logo3d.gif";

const STEEL_BLUE = "#96A3AC";

type Phase =
  | "checking"
  | "login"
  | "animating"
  | "greeting"
  | "landing";

type SessionProfile = CircleSyncResponse["profile"];

export default function CirclePage() {
  const [phase, setPhase] = useState<Phase>("checking");
  const [profile, setProfile] = useState<SessionProfile | null>(null);

  // Profile sync runs in the background — it must NEVER block the UI from
  // rendering. If it fails or hangs, the dashboard still loads, the user just
  // misses admin features until the next successful sync.
  const loadProfile = useCallback(async () => {
    try {
      const { profile: loaded } = await syncProfile();
      setProfile(loaded);
    } catch (err) {
      console.error("[circle] profile sync failed", err);
    }
  }, []);

  // Resume an existing session so members don't need to sign in on every reload.
  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (data.session) {
        // Show the dashboard immediately. Sync profile in the background so the
        // UI never hangs waiting on the API (cold starts, network, etc.).
        setPhase("landing");
        void loadProfile();
      } else {
        setPhase("login");
      }
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!active) return;
        if (event === "SIGNED_OUT" || !session) {
          setProfile(null);
          setPhase("login");
        } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          void loadProfile();
        }
      }
    );

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, [loadProfile]);

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setPhase("login");
  };

  const handleLogin = () => {
    void loadProfile();
    setPhase("animating");
  };

  const isInside = phase === "greeting" || phase === "landing";

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
        @keyframes orbit-intro {
          0%   { opacity: 0; transform: translateY(100vh); }
          60%  { opacity: 1; }
          100% { opacity: 1; transform: translateY(0); }
        }
        .orbit-intro {
          animation: orbit-intro 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      <div
        className={`relative w-full overflow-x-hidden ${phase === "landing" ? "h-screen overflow-hidden" : "min-h-screen overflow-y-auto"}`}
        style={{
          background: isInside ? STEEL_BLUE : "#CDD5DB",
          transition: phase === "animating" ? "background 1.2s ease-out" : "none",
        }}
      >
        <div className="relative z-50">
          <Navbar light={isInside} />
        </div>

        {phase === "checking" && (
          <section className="relative z-10 flex min-h-screen items-center justify-center">
            <img
              src={logo3dGif}
              alt="Loading"
              className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
            />
          </section>
        )}

        {phase === "login" && <CircleLogin onLogin={handleLogin} />}

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

        {phase === "greeting" && (
          <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
            <h1 className="font-subheading text-white/80 text-3xl sm:text-4xl md:text-5xl tracking-wide greeting-text">
              we've been expecting you
            </h1>
          </section>
        )}

        {phase === "landing" && (
          <CircleDashboard onSignOut={handleSignOut} profile={profile} />
        )}
      </div>
    </>
  );
}
