"use client";

import { motion, useReducedMotion } from "motion/react";
import MagneticButton from "@/components/MagneticButton";
import OutcomesLedger from "@/components/OutcomesLedger";
import { DIAGNOSTIC_URL } from "@/lib/site";

const TRUST_TICKS = [
  "Process-first",
  "Tool-agnostic",
  "Human-approved",
  "Baseline + retest",
];

export default function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.85,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <section className="ink-surface relative flex min-h-[100dvh] flex-col justify-end overflow-hidden">
      {/* faint ledger grid, decor only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(247,245,239,0.5) 1px, transparent 1px)",
          backgroundSize: "100% 56px",
          maskImage: "linear-gradient(to bottom, transparent, black 22%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 22%)",
        }}
      />

      <div className="relative mx-auto my-auto grid w-full max-w-wrap items-center gap-12 px-5 pb-14 pt-28 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pb-14 lg:pt-32">
        <div>
          <motion.p
            {...rise(0.05)}
            className="eyebrow flex items-center gap-2.5 text-ember"
          >
            <span className="h-px w-8 bg-ember/70" aria-hidden="true" />
            Clarity before technology
          </motion.p>

          <motion.h1
            {...rise(0.16)}
            className="font-display mt-6 text-[2.5rem] font-medium leading-[1.06] text-paper sm:text-[3.1rem] lg:text-[3.15rem]"
          >
            Know what to improve.
            <br />
            <em className="display-wonk text-ember">Prove</em> it moved.
          </motion.h1>

          <motion.p
            {...rise(0.28)}
            className="mt-6 max-w-[26rem] text-pretty text-[1.05rem] leading-relaxed text-paper/70"
          >
            We find where value is stuck in owner-led companies, recommend the
            smallest high-leverage changes, and measure what improved.
          </motion.p>

          <motion.div
            {...rise(0.4)}
            className="mt-9 flex flex-wrap items-center gap-3.5"
          >
            <MagneticButton href={DIAGNOSTIC_URL} external variant="primary">
              Start the diagnostic
              <span aria-hidden="true" className="transition-transform duration-300 ease-swift group-hover:translate-x-0.5">
                &rarr;
              </span>
            </MagneticButton>
            <MagneticButton href="#story" variant="paper">
              See the proof story
            </MagneticButton>
          </motion.div>

          <motion.p {...rise(0.5)} className="mt-5 text-[0.82rem] text-paper/45">
            8 to 12 minutes. Private. No purchase required.
          </motion.p>
        </div>

        <motion.div
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, y: 34, rotate: 0.6 },
                animate: { opacity: 1, y: 0, rotate: 0 },
                transition: {
                  duration: 1,
                  delay: 0.35,
                  ease: [0.22, 1, 0.36, 1] as const,
                },
              })}
          className="flex justify-center lg:justify-end"
        >
          <OutcomesLedger />
        </motion.div>
      </div>

      {/* trust strip */}
      <div className="relative border-t border-paper/10">
        <div className="mx-auto flex w-full max-w-wrap flex-wrap items-center justify-center px-5 py-4 sm:justify-between sm:px-8">
          <p className="eyebrow hidden text-paper/40 sm:block">
            How we work
          </p>
          <ul className="flex flex-wrap items-center justify-center">
            {TRUST_TICKS.map((t) => (
              <li
                key={t}
                className="tick-sep font-mono text-[0.72rem] uppercase tracking-[0.14em] text-paper/60 [&::before]:text-paper/30"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
