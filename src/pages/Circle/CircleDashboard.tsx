import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import dropSvg from "@assets/drop.svg";
import arrowSvg from "@assets/arrow.svg";
import exSvg from "@assets/ex.svg";
import type { CircleSyncResponse, CircleProfile } from "@/lib/circle";
import { listProfiles } from "@/lib/circle";
import CircleAdminPanel from "./CircleAdminPanel";

const World = lazy(() =>
  import("@/components/ui/globe").then((m) => ({ default: m.World })),
);

const GLOBE_CONFIG = {
  pointSize: 4,
  globeColor: "#6B7884",
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.1,
  emissive: "#4A5560",
  emissiveIntensity: 0.15,
  shininess: 0.5,
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

const GLASS =
  "rounded-2xl border border-white/40 bg-white/25 backdrop-blur-2xl backdrop-saturate-150";
const GLASS_SHADOW = { boxShadow: "inset 0 0 30px rgba(255,255,255,0.08)" };

const ANNOUNCEMENTS = [
  {
    label: "Get more branding help from SKULPT",
    detail:
      "Book a one-on-one brand advisory session with the SKULPT team. We'll audit your current identity, refine your positioning, and deliver actionable next steps — all within 48 hours.",
  },
  {
    label: "Our upcoming events",
    detail:
      "Circle members get first access to SKULPT-hosted workshops, founder dinners, and brand intensives. Check the calendar for upcoming dates and RSVP directly from here.",
  },
  {
    label: "Be showcased on our social media ecosystem",
    detail:
      "Submit your brand story for a feature across SKULPT's social channels. Selected partners receive a full creative package — photography direction, copy, and distribution strategy.",
  },
  {
    label: "Get access to Eufolio",
    detail:
      "Eufolio is SKULPT's proprietary portfolio builder for founders. Create a living brand book that evolves with your company — available exclusively to Circle members.",
  },
];

interface MemberCardProps {
  member: CircleProfile | null;
  idx: number;
}

function MemberCard({ member, idx }: MemberCardProps) {
  const isEmpty = !member;
  return (
    <div
      className={`${GLASS} p-4 flex flex-col justify-between min-h-[34vw] sm:min-h-[160px] transition-opacity duration-500 ${isEmpty ? "opacity-20" : "opacity-100"}`}
      style={GLASS_SHADOW}
    >
      <div className="space-y-2 flex-1 min-h-0 overflow-hidden">
        <p className="font-subheading text-white/90 text-sm leading-snug truncate">
          {member?.full_name ?? "—"}
        </p>
        {member?.title_company && (
          <p className="font-subheading text-white/60 text-[11px] leading-snug truncate">
            {member.title_company}
          </p>
        )}
        {member?.location && (
          <p className="font-subheading text-white/50 text-[11px] leading-snug truncate">
            {member.location}
          </p>
        )}
        {member?.email && (
          <p className="font-subheading text-white/45 text-[10px] leading-snug truncate">
            {member.email}
          </p>
        )}
        {member?.linkedin_url && (
          <a
            href={member.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-subheading text-white/40 text-[10px] leading-snug truncate hover:text-white/70 transition-colors"
          >
            LinkedIn ↗
          </a>
        )}
      </div>
      <p className="mt-3 font-subheading text-white/20 text-[9px] tracking-wide shrink-0">
        {member ? (member.role === "admin" ? "Admin" : "Member") : `Slot ${idx + 1}`}
      </p>
    </div>
  );
}

// Fills a page of 4 slots with real members or null placeholders.
function buildPage(members: CircleProfile[], page: number): (CircleProfile | null)[] {
  const start = page * 4;
  return [0, 1, 2, 3].map((i) => members[start + i] ?? null);
}

interface MemberGridProps {
  members: CircleProfile[];
}

function MemberGrid({ members }: MemberGridProps) {
  const totalPages = Math.max(1, Math.ceil(members.length / 4));
  const [page, setPage] = useState(0);

  // Touch swipe state
  const touchStartX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (dx < -40 && page < totalPages - 1) setPage((p) => p + 1);
    if (dx > 40 && page > 0) setPage((p) => p - 1);
  };

  // Desktop isolated wheel-scroll
  const desktopRef = useRef<HTMLDivElement>(null);
  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.deltaY > 30) setPage((p) => Math.min(p + 1, totalPages - 1));
    if (e.deltaY < -30) setPage((p) => Math.max(p - 1, 0));
  }, [totalPages]);

  useEffect(() => {
    const el = desktopRef.current;
    if (!el) return;
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [onWheel]);

  const slots = buildPage(members, page);

  return (
    <>
      {/* Mobile: touch-swipeable single pane */}
      <div
        className="lg:hidden w-full"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="grid grid-cols-2 gap-3 w-full">
          {slots.map((m, i) => (
            <MemberCard key={page * 4 + i} member={m} idx={page * 4 + i} />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === page ? "bg-white/70 w-3" : "bg-white/25"}`}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: wheel-scroll isolated */}
      <div
        ref={desktopRef}
        className="hidden lg:block w-full max-w-[21rem] ml-auto select-none cursor-default"
        style={{ touchAction: "none" }}
      >
        <div className="grid grid-cols-2 gap-5 w-full" style={{ gridTemplateRows: "1fr 1fr" }}>
          {slots.map((m, i) => (
            <MemberCard key={page * 4 + i} member={m} idx={page * 4 + i} />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === page ? "bg-white/70 w-3" : "bg-white/25"}`}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

const SHOWCASE_MAILTO = (() => {
  const to = "CONTACT@SKULPTBRAND.COM";
  const subject = encodeURIComponent("Priority: Showcase Request — Circle Member");
  const body = encodeURIComponent(
    `Hi SKULPT Team,\n\nI'm a Circle member and I'd love to be showcased across the SKULPT ecosystem.\n\nI believe my brand story is ready to be featured and I'd like to schedule a call to discuss the best way to bring it to your audience.\n\nPlease let me know your availability.\n\nBest,`,
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
})();

const BRANDING_HELP_MAILTO = (() => {
  const to = "CONTACT@SKULPTBRAND.COM";
  const subject = encodeURIComponent("Priority: Branding Help Request — Circle Member");
  const body = encodeURIComponent(
    `Hi SKULPT Team,\n\nI'm a Circle member and I'd like to get more branding help.\n\nI'd love to book a brand advisory session to review my current identity, refine my positioning, and identify next steps.\n\nPlease let me know your availability.\n\nBest,`,
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
})();

interface CircleDashboardProps {
  onSignOut?: () => void;
  profile?: CircleSyncResponse["profile"] | null;
}

export default function CircleDashboard({ onSignOut, profile }: CircleDashboardProps = {}) {
  const isAdmin = profile?.role === "admin";
  const [scrollLocked, setScrollLocked] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [activeAnnouncement, setActiveAnnouncement] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [members, setMembers] = useState<CircleProfile[]>([]);

  useEffect(() => {
    listProfiles()
      .then((all) => setMembers(all.filter((m) => !!m.accepted_at)))
      .catch(() => setMembers([]));
  }, []);

  useEffect(() => {
    const scrollId = setTimeout(() => {
      dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
      const lockId = setTimeout(() => setScrollLocked(true), 1000);
      return () => clearTimeout(lockId);
    }, 2000);
    return () => clearTimeout(scrollId);
  }, []);

  const handleBack = () => {
    setActiveAnnouncement(null);
    setExpanded(false);
  };

  return (
    <article
      className="relative z-10 h-screen overflow-y-auto snap-y snap-mandatory"
      aria-label="SKULPT Circle Dashboard"
    >
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{ filter: "blur(5px)" }}>
          <Suspense fallback={null}>
            <World data={SAMPLE_ARCS} globeConfig={GLOBE_CONFIG} />
          </Suspense>
        </div>
      </div>

      {/* Top bar — role pill + sign out */}
      <div className="fixed top-[72px] inset-x-0 z-30 flex items-center justify-between px-5 sm:px-8 py-2 pointer-events-none">
        {isAdmin && (
          <span className="pointer-events-auto inline-flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur px-3 py-1 font-subheading text-[10px] tracking-[0.18em] uppercase text-white/75">
            Admin
          </span>
        )}
        {!isAdmin && <span />}

        {onSignOut && (
          <button
            type="button"
            onClick={onSignOut}
            className="pointer-events-auto inline-flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur px-3 py-1 font-subheading text-[10px] tracking-[0.18em] uppercase text-white/60 hover:bg-white/20 hover:text-white/90 transition-all"
            aria-label="Sign out of Circle"
          >
            Sign out
          </button>
        )}
      </div>

      {/* Intro */}
      {!scrollLocked && (
        <header className="relative z-10 flex h-screen snap-start flex-col items-center justify-center px-6 pt-24 text-center">
          <h1 className="font-subheading text-white/85 text-3xl sm:text-4xl md:text-5xl tracking-wide orbit-intro">
            Orbit around SKULPT Circle
          </h1>
          <p
            className="mt-4 font-subheading text-white/60 text-base sm:text-lg tracking-wide orbit-intro"
            style={{ animationDelay: "0.15s" }}
          >
            our exclusive founder ecosystem
          </p>
        </header>
      )}

      {/* Dashboard — announcements + member cards */}
      <section ref={dashboardRef} className="relative z-10 min-h-screen snap-start flex flex-col lg:grid lg:grid-cols-[300px_1fr_auto] items-stretch gap-4 lg:gap-0 overflow-y-auto lg:overflow-hidden px-4 sm:px-6 lg:px-10 pt-28 sm:pt-32 lg:pt-32 pb-10 sm:pb-12 lg:pb-14">
        {/* Left — Dashboard announcements with expandable detail */}
        <div className="py-2 flex flex-col gap-3 transition-all duration-500">
          {/* Main dashboard container */}
          <div
            className={`${GLASS} p-5 flex flex-col transition-all duration-500 overflow-hidden ${
              activeAnnouncement !== null && expanded
                ? "h-14 min-h-0 shrink-0"
                : activeAnnouncement !== null
                  ? "flex-[2] min-h-0"
                  : "flex-1 min-h-0"
            }`}
            style={GLASS_SHADOW}
          >
            {activeAnnouncement !== null && expanded ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 font-subheading text-white/60 text-xs tracking-wide hover:text-white/90 transition-colors"
              >
                <img src={arrowSvg} alt="" className="w-3.5 h-3.5 rotate-180 brightness-0 invert" />
                Back to Dashboard
              </button>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-subheading text-white/80 text-lg tracking-wide">Dashboard</p>
                  {activeAnnouncement !== null && (
                    <button
                      onClick={handleBack}
                      className="hover:opacity-90 transition-opacity"
                      aria-label="Close detail panel"
                    >
                      <img src={exSvg} alt="" className="w-3.5 h-3.5 brightness-0 invert" />
                    </button>
                  )}
                </div>
                <div className="space-y-5 flex-1">
                  {ANNOUNCEMENTS.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (i === 0) {
                          window.location.href = BRANDING_HELP_MAILTO;
                          return;
                        }
                        if (i === 2) {
                          window.location.href = SHOWCASE_MAILTO;
                          return;
                        }
                        setActiveAnnouncement(i);
                        setExpanded(false);
                      }}
                      className={`block w-full text-left font-subheading text-sm tracking-wide transition-colors ${
                        activeAnnouncement === i
                          ? "text-white/90"
                          : "text-white/60 hover:text-white/80"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Detail panel — slides up when an announcement is active */}
          <div
            className={`${GLASS} p-5 flex flex-col transition-all duration-500 overflow-hidden ${
              activeAnnouncement !== null
                ? expanded
                  ? "flex-1 min-h-0 opacity-100"
                  : "flex-[1] min-h-0 opacity-100"
                : "h-0 min-h-0 p-0 border-0 opacity-0"
            }`}
            style={activeAnnouncement !== null ? GLASS_SHADOW : {}}
          >
            {activeAnnouncement !== null && (
              <>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-subheading text-white/40 text-[9px] tracking-widest uppercase">Details</p>
                  <button
                    onClick={() => setExpanded((e) => !e)}
                    className="font-subheading text-white/40 text-[10px] tracking-wide hover:text-white/70 transition-colors flex items-center gap-1.5"
                  >
                    {expanded ? (
                      <>
                        <img src={dropSvg} alt="" className="w-2.5 h-2.5 rotate-180 brightness-0 invert" />
                        Collapse
                      </>
                    ) : (
                      <>
                        <img src={dropSvg} alt="" className="w-2.5 h-2.5 brightness-0 invert" />
                        Expand
                      </>
                    )}
                  </button>
                </div>
                <p className="font-subheading text-white/70 text-sm leading-relaxed">
                  {ANNOUNCEMENTS[activeAnnouncement].detail}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Spacer col — desktop only */}
        <div className="hidden lg:block" />

        {/* Right — member grid */}
        <div className="w-full lg:py-2">
          <p className="font-subheading text-white/40 text-[9px] tracking-widest uppercase mb-3">
            Members
          </p>
          <MemberGrid members={members} />
        </div>
      </section>

      {isAdmin && <CircleAdminPanel />}
    </article>
  );
}
