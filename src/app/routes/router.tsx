import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy load heavy pages (especially 3D scenes)
const HomePage = lazy(() => import("@pages/Home/HomePage"));
const SkulptingPage = lazy(() => import("@pages/Skulpting/SkulptingPage"));
const SkulptedPage = lazy(() => import("@pages/Skulpted/SkulptedPage"));
const ContactPage = lazy(() => import("@pages/Contact/ContactPage"));
const PrivacyPage = lazy(() => import("@pages/Privacy/PrivacyPage"));
const NotFoundPage = lazy(() => import("@pages/NotFound/NotFoundPage"));

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#E6EBEE] to-[#D1D9E0]">
      <div className="text-[#9EA5AD] font-body text-lg">Loading...</div>
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
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

