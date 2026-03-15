import { useState, useEffect, useRef, lazy, Suspense } from "react";
import dropSvg from "@assets/drop.svg";
import arrowSvg from "@assets/arrow.svg";
import exSvg from "@assets/ex.svg";

const World = lazy(() =>
  import("@/components/ui/globe").then((m) => ({ default: m.World })),
);

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

function MemberCard({ idx }: { idx: number }) {
  return (
    <div
      className={`${GLASS} p-5 flex flex-col justify-between min-h-[34vh]`}
      style={GLASS_SHADOW}
    >
      <div className="space-y-3">
        <p className="font-subheading text-white/75 text-sm">Name</p>
        <p className="font-subheading text-white/75 text-sm">Location</p>
        <p className="font-subheading text-white/75 text-sm">Email</p>
        <p className="font-subheading text-white/75 text-sm">LinkedIn</p>
        <p className="font-subheading text-white/75 text-sm">
          Title and/or company
        </p>
      </div>
      <p className="font-subheading text-white/25 text-[9px] tracking-wide">
        Member {idx + 1}
      </p>
    </div>
  );
}

export default function CircleDashboard() {
  const [scrollLocked, setScrollLocked] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [activeAnnouncement, setActiveAnnouncement] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

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

      {/* Intro */}
      {!scrollLocked && (
        <header className="relative z-10 flex h-screen snap-start flex-col items-center justify-center px-6 text-center">
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

      {/* Screen 1 — stats */}
      <section
        ref={dashboardRef}
        className="relative z-10 h-screen snap-start grid grid-cols-1 lg:grid-cols-[300px_1fr_1fr] items-stretch gap-0 overflow-hidden px-4 sm:px-8 lg:px-10 pt-20 sm:pt-24 lg:pt-24 pb-10 sm:pb-12 lg:pb-14"
      >
        <div className="flex flex-col gap-5 py-2">
          <div
            className={`${GLASS} flex-1 min-h-[40vh] p-5 flex flex-col justify-between`}
            style={GLASS_SHADOW}
          >
            <div>
              <p className="font-subheading text-white/40 text-[9px] tracking-widest uppercase">Recent activity</p>
              <div className="mt-3 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="font-subheading text-white/70 text-xs">Brand onboarding</p>
                  <p className="font-subheading text-white/40 text-[10px]">2m ago</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-subheading text-white/70 text-xs">Asset delivery — Lumino</p>
                  <p className="font-subheading text-white/40 text-[10px]">18m ago</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-subheading text-white/70 text-xs">Advisory session booked</p>
                  <p className="font-subheading text-white/40 text-[10px]">1h ago</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-subheading text-white/70 text-xs">New partner — Aether Co.</p>
                  <p className="font-subheading text-white/40 text-[10px]">3h ago</p>
                </div>
              </div>
            </div>
            <p className="font-subheading text-white/30 text-[9px] tracking-wide">Live feed</p>
          </div>
          <div
            className={`${GLASS} flex-1 min-h-[40vh] p-5 flex flex-col justify-between`}
            style={GLASS_SHADOW}
          >
            <div>
              <p className="font-subheading text-white/40 text-[9px] tracking-widest uppercase">Upcoming</p>
              <div className="mt-3 space-y-3">
                <div>
                  <p className="font-subheading text-white/70 text-xs">Activation call — Veyra</p>
                  <p className="font-subheading text-white/35 text-[10px] mt-0.5">Tomorrow, 11:00 AM</p>
                </div>
                <div>
                  <p className="font-subheading text-white/70 text-xs">Brand review — Orun Studio</p>
                  <p className="font-subheading text-white/35 text-[10px] mt-0.5">Mar 8, 2:00 PM</p>
                </div>
                <div>
                  <p className="font-subheading text-white/70 text-xs">Circle monthly sync</p>
                  <p className="font-subheading text-white/35 text-[10px] mt-0.5">Mar 12, 4:00 PM</p>
                </div>
              </div>
            </div>
            <p className="font-subheading text-white/30 text-[9px] tracking-wide">3 events this week</p>
          </div>
        </div>

        <div />

        <div className="ml-auto flex w-full max-w-[21rem] min-h-[calc(100vh-16rem)] flex-col justify-between gap-10 py-4 pr-1 pl-4 lg:pl-0">
          <div>
            <p className="font-subheading text-white/40 text-[10px] tracking-widest uppercase">Total of transactions</p>
            <p className="font-subheading text-white/90 text-6xl tracking-tight mt-1">142</p>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="font-subheading text-white/40 text-[10px] tracking-widest uppercase">Fastest transaction</p>
              <p className="font-subheading text-white/90 text-3xl tracking-tight mt-1">9s</p>
            </div>
            <div>
              <p className="font-subheading text-white/40 text-[10px] tracking-widest uppercase">Retention</p>
              <p className="font-subheading text-white/90 text-3xl tracking-tight mt-1">94%</p>
            </div>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="font-subheading text-white/40 text-[10px] tracking-widest uppercase">Brand Partners</p>
              <p className="font-subheading text-white/90 text-4xl tracking-tight mt-1">1,032</p>
            </div>
            <div>
              <p className="font-subheading text-white/40 text-[10px] tracking-widest uppercase">Projects</p>
              <p className="font-subheading text-white/90 text-4xl tracking-tight mt-1">113</p>
            </div>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="font-subheading text-white/40 text-[10px] tracking-widest uppercase">Countries reached</p>
              <p className="font-subheading text-white/90 text-4xl tracking-tight mt-1">33</p>
            </div>
            <div>
              <p className="font-subheading text-white/40 text-[10px] tracking-widest uppercase">Top market</p>
              <p className="font-subheading text-white/80 text-lg tracking-wide mt-1">United States</p>
            </div>
          </div>
          <div>
            <p className="font-subheading text-white/40 text-[10px] tracking-widest uppercase">Assets delivered</p>
            <p className="font-subheading text-white/90 text-4xl tracking-tight mt-1">502,754</p>
          </div>
          <div className="flex items-end gap-6">
            <div>
              <p className="font-subheading text-white/40 text-[10px] tracking-widest uppercase">Circle Fee</p>
              <p className="font-subheading text-white/90 text-5xl tracking-tight mt-1">$0</p>
            </div>
            <p className="font-subheading text-white/40 text-xs tracking-wide pb-2">always $0 for partners</p>
          </div>
        </div>
      </section>

      {/* Screen 2 — announcements + member cards */}
      <section className="relative z-10 h-screen snap-start grid grid-cols-1 lg:grid-cols-[300px_1fr_1fr] items-stretch gap-0 overflow-hidden px-4 sm:px-8 lg:px-10 pt-20 sm:pt-24 lg:pt-24 pb-10 sm:pb-12 lg:pb-14">
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
                <img src={arrowSvg} alt="" className="w-3.5 h-3.5 rotate-180 opacity-60 invert" />
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
                      <img src={exSvg} alt="" className="w-3.5 h-3.5 opacity-50 invert" />
                    </button>
                  )}
                </div>
                <div className="space-y-5 flex-1">
                  {ANNOUNCEMENTS.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => {
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
                        <img src={dropSvg} alt="" className="w-2.5 h-2.5 rotate-180 opacity-50 invert" />
                        Collapse
                      </>
                    ) : (
                      <>
                        <img src={arrowSvg} alt="" className="w-2.5 h-2.5 opacity-50 invert" />
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

        <div />

        {/* Right — 2x2 member cards */}
        <div className="ml-auto flex w-full max-w-[21rem] py-2">
          <div className="grid grid-cols-2 grid-rows-2 gap-5 w-full">
            {[0, 1, 2, 3].map((i) => (
              <MemberCard key={i} idx={i} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
