"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Wordmark from "@/components/Wordmark";
import { CAL_URL, DIAGNOSTIC_URL, NAV_ITEMS } from "@/lib/site";

export default function IslandNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Move focus into the menu; hand it back to the toggle on close.
    panelRef.current?.querySelector("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-paper"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
        <motion.nav
          aria-label="Primary"
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 180, damping: 24 }
          }
          className={`island flex w-full max-w-[58rem] items-center justify-between gap-2 rounded-full border px-3 py-2 transition-[background-color,border-color,box-shadow] duration-500 sm:px-4 ${
            scrolled
              ? "border-ink/10 bg-paper-bright/85 shadow-island"
              : "border-paper/15 bg-ink/35"
          }`}
        >
          <a
            href="/"
            className={`flex shrink-0 items-center gap-2.5 rounded-full py-1 pl-1.5 pr-2 font-display text-[1.05rem] font-semibold tracking-tight transition-colors duration-500 ${
              scrolled ? "text-ink" : "text-paper"
            }`}
          >
            <Wordmark size={24} onInk={!scrolled} />
            StoneWave
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-1.5 text-[0.88rem] transition-colors duration-300 ${
                  scrolled
                    ? "text-ink/70 hover:bg-ink/[0.06] hover:text-ink"
                    : "text-paper/75 hover:bg-paper/10 hover:text-paper"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden rounded-full px-3.5 py-1.5 text-[0.88rem] transition-colors duration-300 lg:block ${
                scrolled
                  ? "text-ink/70 hover:text-ink"
                  : "text-paper/75 hover:text-paper"
              }`}
            >
              Book a call
            </a>
            <a
              href={DIAGNOSTIC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-ember px-4 py-2 text-[0.88rem] font-medium text-ink transition-colors duration-300 hover:bg-ember-bright sm:block"
            >
              Start the diagnostic
            </a>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 md:hidden ${
                scrolled ? "text-ink hover:bg-ink/[0.06]" : "text-paper hover:bg-paper/10"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                {open ? (
                  <path
                    d="M4 4 L14 14 M14 4 L4 14"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M2.5 5.5 H15.5 M2.5 12.5 H15.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setOpen(false)}
          >
            <div className="island absolute inset-0 bg-ink/70" />
            <motion.div
              ref={panelRef}
              initial={reduced ? false : { y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className="absolute inset-x-3 top-[4.6rem] max-h-[calc(100svh-5.5rem)] overflow-y-auto overscroll-contain rounded-3xl border border-ink/10 bg-paper-bright p-3 shadow-lift"
              onClick={(e) => e.stopPropagation()}
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3.5 text-[1.05rem] font-medium text-ink hover:bg-ink/[0.05]"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-2 grid gap-2 border-t border-ink/10 pt-3">
                <a
                  href={DIAGNOSTIC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-ember px-4 py-3.5 text-center font-medium text-ink"
                >
                  Start the diagnostic
                </a>
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-ink/15 px-4 py-3.5 text-center font-medium text-ink"
                >
                  Book a 15 minute call
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
