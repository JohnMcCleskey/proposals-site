"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * The hero artifact: an interactive Outcomes Ledger. Four stages of the
 * proof cycle reveal in sequence. Baseline, projected, adopted, retest.
 * All figures are an illustrative scenario and labeled as such.
 */

const STAGES = [
  { full: "Baseline", short: "Base" },
  { full: "Projected", short: "Proj" },
  { full: "Adopted", short: "Adopt" },
  { full: "Retest", short: "Retest" },
] as const;

type Row = {
  metric: string;
  baseline: string;
  projected: string;
  adopted: string;
  retest: string;
  delta: string;
};

const ROWS: Row[] = [
  {
    metric: "Same-day quote follow-up",
    baseline: "31%",
    projected: "70%",
    adopted: "One owner, one queue",
    retest: "74%",
    delta: "+43 pts",
  },
  {
    metric: "Owner hours lost to handoffs, weekly",
    baseline: "11.5 h",
    projected: "6.0 h",
    adopted: "Intake form replaces relay",
    retest: "7.2 h",
    delta: "-4.3 h",
  },
  {
    metric: "Invoice to cash, days",
    baseline: "38",
    projected: "27",
    adopted: "Draft on delivery, not month-end",
    retest: "29",
    delta: "-9 days",
  },
];

const HOLD_MS = 2400;
const FULL_HOLD_MS = 6500;

export default function OutcomesLedger() {
  const reduced = useReducedMotion();
  // Starts at 0 on server and client alike (hydration-safe); the effect
  // jumps straight to the full ledger when motion is reduced.
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);
  // Once the visitor interacts deliberately (click or keyboard focus),
  // the cycle stays paused for good: WCAG 2.2.2 pause semantics.
  const settled = useRef(false);

  useEffect(() => {
    if (reduced) {
      setStage(3);
      return;
    }
    if (paused) return;
    timer.current = window.setTimeout(
      () => setStage((s) => (s + 1) % STAGES.length),
      stage === 3 ? FULL_HOLD_MS : HOLD_MS,
    );
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [stage, paused, reduced]);

  const active = (i: number) => i <= stage;

  return (
    <div
      className="bezel w-full max-w-[34rem] p-5 shadow-lift sm:p-6"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => {
        if (!settled.current) setPaused(false);
      }}
      onFocusCapture={() => {
        settled.current = true;
        setPaused(true);
      }}
    >
      {/* header */}
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow text-ink-mute">Outcomes ledger</p>
        <p className="eyebrow rounded-full bg-ink/[0.05] px-2.5 py-1 text-[0.6rem] text-ink-mute">
          Illustrative scenario
        </p>
      </div>

      {/* stage stepper */}
      <div
        role="group"
        aria-label="Proof cycle stage"
        className="mt-4 grid grid-cols-4 gap-1 rounded-full border border-ink/10 bg-paper p-1"
      >
        {STAGES.map((s, i) => (
          <button
            key={s.full}
            type="button"
            aria-pressed={stage === i}
            onClick={() => {
              settled.current = true;
              setPaused(true);
              setStage(i);
            }}
            className={`rounded-full px-1 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.04em] transition-colors duration-300 sm:text-[0.66rem] sm:tracking-[0.08em] ${
              stage === i
                ? "bg-ink text-paper"
                : "text-ink-mute hover:bg-ink/[0.06] hover:text-ink"
            }`}
          >
            <span className="sm:hidden">{s.short}</span>
            <span className="hidden sm:inline">{s.full}</span>
          </button>
        ))}
      </div>

      {/* rows */}
      <ul className="mt-4 space-y-3">
        {ROWS.map((row) => (
          <li key={row.metric} className="rounded-xl border border-ink/[0.09] bg-paper px-3.5 py-3">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[0.82rem] font-medium leading-snug text-ink">
                {row.metric}
              </p>
              <span
                className={`ledger-num shrink-0 rounded-md px-1.5 py-0.5 text-[0.72rem] font-semibold transition-all duration-500 ease-swift ${
                  stage >= 3
                    ? "bg-proof-wash text-proof-deep opacity-100"
                    : "translate-y-1 opacity-0"
                }`}
                aria-hidden={stage < 3}
              >
                {row.delta}
              </span>
            </div>
            <div className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-4 sm:gap-2">
              <Cell label="Base" value={row.baseline} on={active(0)} muted />
              <Cell label="Proj" value={row.projected} on={active(1)} />
              <Cell label="Adopted" value={row.adopted} on={active(2)} text />
              <Cell label="Retest" value={row.retest} on={active(3)} proof />
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-[0.74rem] leading-relaxed text-ink-mute">
        Projected is a hypothesis. Retest is what actually moved, measured
        against the same baseline.
      </p>
    </div>
  );
}

function Cell({
  label,
  value,
  on,
  muted = false,
  proof = false,
  text = false,
}: {
  label: string;
  value: string;
  on: boolean;
  muted?: boolean;
  proof?: boolean;
  text?: boolean;
}) {
  return (
    <div
      aria-hidden={!on}
      className={`min-w-0 transition-all duration-500 ease-swift ${
        on ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-[0.18]"
      }`}
    >
      <p className="font-mono text-[0.56rem] uppercase tracking-[0.1em] text-ink-mute">
        {label}
      </p>
      <p
        className={
          text
            ? "mt-0.5 text-[0.68rem] leading-tight text-ink/80"
            : `ledger-num mt-0.5 text-[0.95rem] font-semibold ${
                proof ? "text-proof-deep" : muted ? "text-ink-mute" : "text-ink"
              }`
        }
      >
        {value}
      </p>
    </div>
  );
}
