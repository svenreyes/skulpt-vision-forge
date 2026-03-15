import { useState, useEffect, useRef, lazy, Suspense } from "react";

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

export default function CircleDashboard() {
  const [scrollLocked, setScrollLocked] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollId = setTimeout(() => {
      dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
      const lockId = setTimeout(() => setScrollLocked(true), 1000);
      return () => clearTimeout(lockId);
    }, 2000);
    return () => clearTimeout(scrollId);
  }, []);

  return (
    <article className="relative z-10" aria-label="SKULPT Circle Dashboard">
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{ filter: "blur(5px)" }}>
          <Suspense fallback={null}>
            <World data={SAMPLE_ARCS} globeConfig={GLOBE_CONFIG} />
          </Suspense>
        </div>
      </div>

      {!scrollLocked && (
        <header className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
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

      <section
        ref={dashboardRef}
        className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-[230px_1fr_1fr] items-stretch gap-0 overflow-hidden px-4 sm:px-8 lg:px-10 py-24 sm:py-28 lg:py-32"
      >
        <div className="flex flex-col gap-5 py-2">
          <div className="flex-1 rounded-2xl border border-white/35 bg-white/18 backdrop-blur-xl min-h-[34vh]" />
          <div className="flex-1 rounded-2xl border border-white/35 bg-white/18 backdrop-blur-xl min-h-[34vh]" />
        </div>

        <div />

        <div className="ml-auto flex w-full max-w-[32rem] min-h-[calc(100vh-16rem)] flex-col justify-between gap-10 py-4 pr-1 sm:pr-2 lg:pr-0 pl-4 lg:pl-0">
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
    </article>
  );
}
