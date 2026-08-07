"use client";

import { useEffect, useRef } from "react";

/**
 * Adds .rv-in when the element enters the viewport. Pure transform/opacity,
 * runs once, respects prefers-reduced-motion (CSS side shows content
 * immediately, so the observer is skipped entirely).
 */
export function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("rv-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const t = window.setTimeout(
              () => el.classList.add("rv-in"),
              delay,
            );
            io.disconnect();
            return () => window.clearTimeout(t);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return ref;
}
