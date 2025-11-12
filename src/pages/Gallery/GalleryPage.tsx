import { useState, useEffect } from "react";
import { Navbar, Footer, Seo } from "@components";

// Gallery images - all .png files from /public/gallary/
const galleryImages = [
  "skulpt-branding-agency-car-values-messaging.png",
  "skulpt-nyc-branding-agency-newspaper-news.png",
  "skulpt-stockholm-branding-agency-office-floor.png",
  "skulpt-Stockholm-branding-agency-office-people.png",
  "skulpt-stockholm-branding-parnter-office-presentation.png",
  "skulpt-stocklom-branding-agency-tea-bag.png",
  "skulpt-sweden-branding-agency-office-event.png",
  "skulpt-sweden-branding-agency-office-exterior.png",
  "skulpt-sweden-branding-agency-office-inside.png",
  "skulpt-sweden-branding-chess-pitch-portfolio.png",
  "skulpt-sweden-branding-flyer-misson-budget.png",
  "skulpt-sweden-branding-partner-office-interior.png",
  "skulpt-sweden-branding-pitch-deck-office-statue.png",
];

// Convert filename to readable alt text
const filenameToAlt = (filename: string): string => {
  return filename
    .replace(/\.png$/i, "")
    .replace(/skulpt-/gi, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/Stockholm/gi, "Stockholm")
    .replace(/Sweden/gi, "Sweden")
    .replace(/Nyc/gi, "NYC")
    .replace(/Agency/gi, "Agency")
    .replace(/Branding/gi, "Branding")
    .replace(/Office/gi, "Office");
};

// Lightbox Modal Component
interface LightboxProps {
  image: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

const Lightbox = ({ image, alt, isOpen, onClose }: LightboxProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing ${alt}`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl font-light hover:opacity-70 transition-opacity z-10"
        aria-label="Close lightbox"
      >
        ×
      </button>
      <img
        src={`/gallary/${image}`}
        alt={alt}
        className="max-w-full max-h-[90vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openLightbox = (image: string) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "";
  };

  // Handle ESC key to close lightbox
  useEffect(() => {
    if (!selectedImage) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
        document.body.style.overflow = "";
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedImage]);

  return (
    <>
      <Seo
        title="Our Studio & Work Gallery | SKULPT"
        description="A glimpse inside SKULPT — our creative studio in Stockholm where brand ideas take shape."
        path="/gallery"
        type="website"
      />
      <div className="min-h-screen bg-gradient-to-b from-[#E6EBEE] to-[#D1D9E0] text-[#3F4851] flex flex-col">
        <Navbar />

        <main className="flex-1 px-6 md:px-10 lg:px-20 py-16 md:py-24 mx-auto w-full max-w-7xl font-body">
          <h1 className="font-subheading pt-12 text-2xl sm:text-3xl md:text-4xl text-[#7A8289] tracking-tight mb-6">
            Our Studio & Work Gallery
          </h1>

          <p className="text-[#606A74] mb-12 max-w-3xl">
            A glimpse inside SKULPT — our creative studio in Stockholm where brand ideas take shape.
          </p>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((image) => {
              const alt = filenameToAlt(image);
              return (
                <div
                  key={image}
                  className="relative group cursor-pointer overflow-hidden rounded-lg bg-[#D1D9E0] aspect-square"
                  onClick={() => openLightbox(image)}
                >
                  <img
                    src={`/gallary/${image}`}
                    alt={alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-subheading transition-opacity duration-300">
                      Click to enlarge
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        <Footer />

        {/* Lightbox */}
        {selectedImage && (
          <Lightbox
            image={selectedImage}
            alt={filenameToAlt(selectedImage)}
            isOpen={!!selectedImage}
            onClose={closeLightbox}
          />
        )}
      </div>
    </>
  );
}

