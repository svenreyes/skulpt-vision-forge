import { useEffect, RefObject } from "react";

export function useHorizontalScroll(scrollerRef: RefObject<HTMLDivElement>) {
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const isDesktop = window.matchMedia("(min-width: 640px)").matches;
    if (!isDesktop) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const maxScrollLeft = el.scrollWidth - el.clientWidth;
        const prev = el.scrollLeft;
        const next = Math.min(maxScrollLeft, Math.max(0, prev + e.deltaY));
        if (next !== prev) {
          el.scrollLeft = next;
          e.preventDefault();
        }
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [scrollerRef]);
}

export function useHorizontalTouchScroll(scrollerRef: RefObject<HTMLDivElement>) {
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const isDesktop = window.matchMedia("(min-width: 640px)").matches;
    if (!isDesktop) return;

    let startX = 0;
    let startY = 0;
    let startScrollLeft = 0;
    let isDragging = false;

    const onTouchStart = (e: TouchEvent) => {
      if (!e.touches.length) return;
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      startScrollLeft = el.scrollLeft;
      isDragging = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      if (!e.touches.length) return;
      const t = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      const useVertical = Math.abs(dy) > Math.abs(dx);
      const delta = useVertical ? dy : dx;
      el.scrollLeft = startScrollLeft - delta;
      e.preventDefault();
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);
    
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [scrollerRef]);
}

export function useFooterWheelScroll(
  footerRef: RefObject<HTMLDivElement>,
  scrollerRef: RefObject<HTMLDivElement>
) {
  useEffect(() => {
    const footerEl = footerRef.current;
    const scrollerEl = scrollerRef.current;
    if (!footerEl || !scrollerEl) return;
    const isDesktop = window.matchMedia("(min-width: 640px)").matches;
    if (!isDesktop) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
        const maxScrollLeft = scrollerEl.scrollWidth - scrollerEl.clientWidth;
        const prev = scrollerEl.scrollLeft;
        const next = Math.min(maxScrollLeft, Math.max(0, prev + e.deltaY));
        if (next !== prev) {
          scrollerEl.scrollLeft = next;
          e.preventDefault();
        }
      }
    };

    footerEl.addEventListener("wheel", onWheel, { passive: false });
    return () => footerEl.removeEventListener("wheel", onWheel);
  }, [footerRef, scrollerRef]);
}

