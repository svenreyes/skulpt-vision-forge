import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

type Ctx = { trigger: (opts?: { before?: number; after?: number }) => Promise<void> };
const RouteBlurCtx = createContext<Ctx | null>(null);

export const useRouteBlur = () => {
  const ctx = useContext(RouteBlurCtx);
  if (!ctx) throw new Error("useRouteBlur must be used within RouteBlurProvider");
  return ctx;
};

/**
 * Provider that renders a blur overlay and exposes a `trigger` fn.
 * Call `trigger({ before, after })` to blur-out, then resolve so you can navigate,
 * and blur-in will auto-fade.
 */
export const RouteBlurProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [active, setActive] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const trigger = useCallback(async (opts?: { before?: number; after?: number }) => {
    const before = opts?.before ?? 220; // time to wait before navigating
    const after = opts?.after ?? 220;   // time to keep blur after navigation

    // Blur out
    setActive(true);
    await new Promise((r) => setTimeout(r, before));
    // Caller should navigate now
    // Blur in completes automatically
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setActive(false), after);
  }, []);

  const value = useMemo(() => ({ trigger }), [trigger]);

  return (
    <RouteBlurCtx.Provider value={value}>
      {children}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 z-[10001] transition-all duration-300 ${
          active ? "opacity-100 backdrop-blur-[10px]" : "opacity-0 backdrop-blur-0"
        }`}
        style={{ background: active ? "rgba(230, 235, 238, 0.28)" : "transparent" }}
      />
    </RouteBlurCtx.Provider>
  );
};
