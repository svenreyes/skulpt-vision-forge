import { useState, useEffect } from "react";
import { Navbar, Footer, Seo } from "@components";

// Gallery images - all .png files from /public/gallery/
const galleryImages = [
  {
    filename: "skulpt-branding-agency-car-values-messaging.png",
    alt: "SKULPT brand values and messaging materials at our Stockholm branding agency",
    caption: "Brand Values & Messaging",
  },
  {
    filename: "skulpt-nyc-branding-agency-newspaper-news.png",
    alt: "SKULPT branding agency featured in newspaper coverage",
    caption: "Press & Media Coverage",
  },
  {
    filename: "skulpt-stockholm-branding-agency-office-floor.png",
    alt: "SKULPT Stockholm branding agency office floor interior design",
    caption: "Studio Floor Space",
  },
  {
    filename: "skulpt-Stockholm-branding-agency-office-people.png",
    alt: "SKULPT team collaborating at our Stockholm branding agency office",
    caption: "Team Collaboration",
  },
  {
    filename: "skulpt-stockholm-branding-parnter-office-presentation.png",
    alt: "SKULPT brand strategy presentation at Stockholm branding agency office",
    caption: "Brand Strategy Presentation",
  },
  {
    filename: "skulpt-stocklom-branding-agency-tea-bag.png",
    alt: "SKULPT Stockholm branding agency creative workspace detail",
    caption: "Studio Details",
  },
  {
    filename: "skulpt-sweden-branding-agency-office-event.png",
    alt: "SKULPT Sweden branding agency hosting creative event in Stockholm",
    caption: "Studio Events",
  },
  {
    filename: "skulpt-sweden-branding-agency-office-exterior.png",
    alt: "SKULPT Sweden branding agency office exterior in Stockholm",
    caption: "Studio Exterior",
  },
  {
    filename: "skulpt-sweden-branding-agency-office-inside.png",
    alt: "SKULPT Sweden branding agency office interior workspace in Stockholm",
    caption: "Creative Workspace",
  },
  {
    filename: "skulpt-sweden-branding-chess-pitch-portfolio.png",
    alt: "SKULPT branding portfolio showcasing brand strategy and pitch deck work",
    caption: "Portfolio & Strategy Work",
  },
  {
    filename: "skulpt-sweden-branding-flyer-misson-budget.png",
    alt: "SKULPT brand mission and budget planning materials at Sweden branding agency",
    caption: "Mission & Planning",
  },
  {
    filename: "skulpt-sweden-branding-partner-office-interior.png",
    alt: "SKULPT Sweden brand partner office interior design in Stockholm",
    caption: "Partner Office Interior",
  },
  {
    filename: "skulpt-sweden-branding-pitch-deck-office-statue.png",
    alt: "SKULPT pitch deck design and brand development materials at Stockholm office",
    caption: "Pitch Deck Development",
  },
];

// Lightbox Modal Component
interface LightboxProps {
  image: { filename: string; alt: string; caption: string };
  isOpen: boolean;
  onClose: () => void;
}

const Lightbox = ({ image, isOpen, onClose }: LightboxProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing ${image.alt}`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl font-light hover:opacity-70 transition-opacity z-10"
        aria-label="Close lightbox"
      >
        ×
      </button>
      <figure className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={`/gallery/${image.filename}`}
          alt={image.alt}
          className="max-w-full max-h-[80vh] object-contain"
        />
        <figcaption className="text-white text-center mt-4 text-sm font-subheading">
          {image.caption}
        </figcaption>
      </figure>
    </div>
  );
};

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<{ filename: string; alt: string; caption: string } | null>(null);

  const openLightbox = (image: { filename: string; alt: string; caption: string }) => {
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

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "SKULPT Studio & Work Gallery",
    description: "A glimpse inside SKULPT — our branding partner in Stockholm where brand ideas take shape.",
    publisher: {
      "@type": "Organization",
      name: "SKULPT",
      url: "https://skulptbrand.com",
      logo: "https://skulptbrand.com/skulptlogo.svg",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Stockholm",
        addressCountry: "Sweden",
      },
    },
    image: galleryImages.map((img) => ({
      "@type": "ImageObject",
      contentUrl: `https://skulptbrand.com/gallery/${img.filename}`,
      description: img.alt,
      name: img.caption,
    })),
  };

  return (
    <>
      <Seo
        title="Our Studio & Work Gallery | SKULPT"
        description="A glimpse inside SKULPT — our branding partner in Stockholm where brand ideas take shape."
        path="/gallery"
        type="website"
      />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#E6EBEE] to-[#D1D9E0] text-[#3F4851] flex flex-col">
        <Navbar />

        <main className="flex-1 px-6 md:px-10 lg:px-20 py-16 md:py-24 mx-auto w-full max-w-7xl font-body">
          <h1 className="font-subheading pt-12 text-2xl sm:text-3xl md:text-4xl text-[#7A8289] tracking-tight mb-6">
            Our Studio & Work Gallery
          </h1>

          <p className="text-[#606A74] mb-12 max-w-3xl">
            A glimpse inside SKULPT — our branding partner in Stockholm where brand ideas take shape.
          </p>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((image) => (
              <figure
                key={image.filename}
                className="relative group cursor-pointer overflow-hidden rounded-lg bg-[#D1D9E0] aspect-square"
                onClick={() => openLightbox(image)}
              >
                <img
                  src={`/gallery/${image.filename}`}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex flex-col items-center justify-center p-4">
                  <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-subheading transition-opacity duration-300 text-center">
                    {image.caption}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 text-white/70 text-xs mt-2 transition-opacity duration-300">
                    Click to enlarge
                  </span>
                </div>
                <figcaption className="sr-only">{image.caption}</figcaption>
              </figure>
            ))}
          </div>
        </main>

        <Footer />

        {/* Lightbox */}
        {selectedImage && (
          <Lightbox
            image={selectedImage}
            isOpen={!!selectedImage}
            onClose={closeLightbox}
          />
        )}
      </div>
    </>
  );
}

