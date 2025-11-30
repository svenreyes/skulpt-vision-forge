import { useEffect, useState } from "react";

interface BlurSlideshowProps {
  images: string[];
  intervalMs?: number;
  className?: string;
}

export function BlurSlideshow({
  images,
  intervalMs = 3000,
  className = "",
}: BlurSlideshowProps) {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    if (!images?.length) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images, intervalMs]);

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden border border-white/25 bg-white/25 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.20)] ${className}`}
      aria-live="polite"
    >
      {/* Layer images and fade/blur between them */}
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
              index === i ? "opacity-100 blur-0" : "opacity-0 blur-sm"
            }`}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
      <div className="relative w-full h-[240px] sm:h-[220px] md:h-[220px]" />
    </div>
  );
}

