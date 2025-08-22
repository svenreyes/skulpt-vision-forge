import React, { useEffect, useRef } from "react";

/**
 * Loads the Spline web component once and renders an interactive scene.
 * Using the web component avoids iframe sandboxing issues and ensures
 * cursor/touch events are delivered reliably.
 */
export const SplineBlob: React.FC<{ url: string; className?: string }> = ({ url, className }) => {
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const id = "spline-viewer-script";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.type = "module";
      s.src = "https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js";
      document.head.appendChild(s);
    }
  }, []);

  const isSplineCode = url.endsWith(".splinecode") || url.includes("scene.splinecode");

  if (!isSplineCode) {
    // Fallback to iframe for share-page URLs
    return (
      <iframe
        title="Spline Scene"
        src={url}
        className={className}
        style={{ width: "100%", height: "100%", border: 0, display: "block" }}
        allow="autoplay; fullscreen; xr-spatial-tracking"
      />
    );
  }

  return (
    <spline-viewer
      style={{ width: "100%", height: "100%", display: "block", touchAction: "none" }}
      className={className}
      loading-anim="false"
      events="true"
      url={url}
    />
  );
};
