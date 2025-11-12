import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Toaster } from "@components/ui/toaster";
import { Toaster as Sonner } from "@components/ui/sonner";
import { TooltipProvider } from "@components/ui/tooltip";
import { QueryProvider } from "@app/providers";
import { AppRoutes } from "@app/routes";
import { RouteBlurProvider } from "@components";
import { NoiseCanvas } from "@components/three";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Fires GA4 page_view on every route change in a SPA
const GtagRouteTracker = () => {
  const location = useLocation();
  React.useEffect(() => {
    const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === "function") {
      gtag("config", "G-TVLXLC445H", {
        page_path: location.pathname + location.search + location.hash,
      });
    }
  }, [location.pathname, location.search, location.hash]);
  return null;
};

const App = () => (
  <QueryProvider>
    <TooltipProvider>
      <Toaster />
      {/* Hide Sonner notifications for now */}
      <div className="hidden">
        <Sonner />
      </div>
      <BrowserRouter>
        <GtagRouteTracker />
        <RouteBlurProvider>
          <AppRoutes />
        </RouteBlurProvider>
      </BrowserRouter>

      {/* Grain overlay: sits on top of every page without blocking clicks */}
      <NoiseCanvas />

      {/* Vercel Analytics & Speed Insights */}
      <Analytics />
      <SpeedInsights />
    </TooltipProvider>
  </QueryProvider>
);

export default App;
