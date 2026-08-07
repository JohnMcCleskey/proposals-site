"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Magnetic CTA. The label leans toward the cursor on hover; spring settles
 * it back on leave. Disabled under prefers-reduced-motion and on touch.
 */
export default function MagneticButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "paper";
  external?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.6 });

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      if (reduced || e.pointerType !== "mouse") return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
      y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
    },
    [reduced, x, y],
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.95rem] font-medium transition-colors duration-300 ease-swift select-none";
  const variants: Record<string, string> = {
    primary:
      "bg-ember text-ink hover:bg-ember-bright shadow-[0_2px_14px_rgba(215,113,37,0.35)]",
    ghost:
      "border border-ink/20 text-ink hover:border-ink/45 hover:bg-ink/[0.04]",
    paper:
      "border border-paper/25 text-paper hover:border-paper/55 hover:bg-paper/[0.06]",
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} ${variants[variant]} ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileTap={reduced ? undefined : { scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}
