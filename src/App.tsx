// src/App.tsx
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { NoiseCanvas } from "@/components/NoiseCanvas";
import Skulpting from "./pages/Skulpting";
import Skulpted from "./pages/Skulpted";
import { RouteBlurProvider } from "@/components/RouteBlurTransition";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const queryClient = new QueryClient();

// Fires GA4 page_view on every route change in a SPA
const GtagRouteTracker = () => {
  const location = useLocation();
  React.useEffect(() => {
    const gtag = (window as any).gtag as undefined | ((...args: any[]) => void);
    if (typeof gtag === "function") {
      gtag('config', 'G-TVLXLC445H', {
        page_path: location.pathname + location.search + location.hash,
      });
    }
  }, [location.pathname, location.search, location.hash]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      {/* Hide Sonner notifications for now (was showing a small widget bottom-right) */}
      <div className="hidden">
        <Sonner />
      </div>
      <BrowserRouter>
        {/* Track SPA route changes for GA4 */}
        <GtagRouteTracker />
        <RouteBlurProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/skulpting" element={<Skulpting />} />
          <Route path="/skulpted" element={<Skulpted />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </RouteBlurProvider>
      </BrowserRouter>

      {/* Grain overlay: sits on top of every page without blocking clicks */}
      <NoiseCanvas />
      {/* ─────────────────────────────────────────────────────────────── */}
      {/* Vercel Analytics & Speed Insights */}
      <Analytics />
      <SpeedInsights />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
