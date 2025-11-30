import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import logo3dGif from "@assets/logo3d.gif";

// Lazy load heavy pages (especially 3D scenes)
const HomePage = lazy(() => import("@pages/HomePage"));
const SkulptingPage = lazy(() => import("@pages/Skulpting/SkulptingPage"));
const SkulptedPage = lazy(() => import("@pages/Skulpted/SkulptedPage"));
const ContactPage = lazy(() => import("@pages/ContactPage"));
const PrivacyPage = lazy(() => import("@pages/PrivacyPage"));
const GalleryPage = lazy(() => import("@pages/GalleryPage"));
const FAQPage = lazy(() => import("@pages/FAQPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#E6EBEE] to-[#D1D9E0]">
      <img
        src={logo3dGif}
        alt="Loading"
        className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
      />
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skulpting" element={<SkulptingPage />} />
        <Route path="/skulpted" element={<SkulptedPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/faq" element={<FAQPage />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

