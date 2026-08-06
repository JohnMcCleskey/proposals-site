"use client";

import { useEffect, useRef } from "react";

/**
 * Fades an element in the first time it enters the viewport.
 * `delay` staggers siblings so grids arrive as a wave rather than a slab.
 * Elements start visible in markup and are hidden from JS, so anything
 * rendered without JS (or before hydration) still reads normally.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.style.transitionDelay = `${delay}ms`;
    el.classList.add("reveal-hidden");

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("reveal-visible");
        el.classList.remove("reveal-hidden");
        obs.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return ref;
}
