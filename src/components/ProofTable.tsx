"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The proof ledger. action | baseline | projected | adopted | retest.
 * Delta bars draw in when the table scrolls into view. Includes one
 * deferred row on purpose: honesty about what was not adopted is part
 * of the proof discipline. All figures illustrative and labeled.
 */

type ProofRow = {
  action: string;
  baseline: string;
  projected: string;
  adopted: string;
  retest: string;
  delta: string | null;
  fill: number; // 0..1 achieved-vs-projected, drives the bar
  deferred?: boolean;
};

const ROWS: ProofRow[] = [
  {
    action: "Give quote follow-up one owner",
    baseline: "31% same-day",
    projected: "70%",
    adopted: "Week 1",
    retest: "74%",
    delta: "+43 pts",
    fill: 1,
  },
  {
    action: "Draft the invoice on delivery day",
    baseline: "38 days to cash",
    projected: "27 days",
    adopted: "Week 2",
    retest: "29 days",
    delta: "-9 days",
    fill: 0.82,
  },
  {
    action: "Intake form replaces the relay",
    baseline: "11.5 owner hrs/wk",
    projected: "6.0 hrs",
    adopted: "Week 1",
    retest: "7.2 hrs",
    delta: "-4.3 hrs",
    fill: 0.78,
  },
  {
    action: "Replace the CRM",
    baseline: "Not scored",
    projected: "Unclear payoff",
    adopted: "Deferred",
    retest: "Not scored",
    delta: null,
    fill: 0,
    deferred: true,
  },
];

export default function ProofTable() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="proof" className="bg-paper" aria-label="Proof">
      <div className="mx-auto w-full max-w-wrap px-5 py-20 sm:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow text-ember-ink">Proof</p>
            <h2 className="font-display mt-4 max-w-[24ch] text-balance text-[1.9rem] font-medium leading-[1.12] text-ink sm:text-[2.5rem]">
              The report is a ledger, not a slideshow.
            </h2>
          </div>
          <p className="eyebrow rounded-full border border-ink/15 px-3 py-1.5 text-ink-mute">
            Illustrative scenario
          </p>
        </div>

        <div ref={ref} className="bezel mt-10 overflow-hidden shadow-card">
          {/* header row */}
          <div className="hidden grid-cols-[2fr_1fr_0.7fr_0.7fr_1.4fr] gap-4 border-b border-ink/10 bg-paper px-6 py-3.5 md:grid">
            {["Action", "Baseline", "Projected", "Adopted", "Retest"].map(
              (h) => (
                <span
                  key={h}
                  className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-mute"
                >
                  {h}
                </span>
              ),
            )}
          </div>

          {ROWS.map((r, i) => (
            <div
              key={r.action}
              className={`border-b border-ink/[0.07] px-5 py-4 last:border-b-0 sm:px-6 sm:py-5 ${
                r.deferred ? "bg-paper/60" : ""
              }`}
              style={{
                transition: "opacity 0.7s, transform 0.7s",
                transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                transitionDelay: `${i * 110}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(18px)",
              }}
            >
              {/* desktop grid */}
              <div className="hidden grid-cols-[2fr_1fr_0.7fr_0.7fr_1.4fr] items-center gap-4 md:grid">
                <span className={`text-[0.95rem] font-medium ${r.deferred ? "text-ink-mute" : "text-ink"}`}>
                  {r.action}
                  {r.deferred && (
                    <span className="ml-2.5 rounded-md bg-ink/[0.06] px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-ink-mute">
                      Optional tool
                    </span>
                  )}
                </span>
                <span className="ledger-num text-[0.88rem] text-ink-mute">
                  {r.baseline}
                </span>
                <span className="ledger-num text-[0.88rem] text-ink/70">
                  {r.projected}
                </span>
                <span
                  className={`text-[0.85rem] ${r.deferred ? "font-mono text-[0.72rem] uppercase tracking-[0.08em] text-ink-mute" : "text-ink/70"}`}
                >
                  {r.adopted}
                </span>
                <span className="flex flex-wrap items-center gap-2">
                  <span
                    className={`ledger-num text-[0.92rem] font-semibold ${r.deferred ? "text-ink-mute/70" : "text-proof-deep"}`}
                  >
                    {r.retest}
                  </span>
                  {r.delta && (
                    <span className="rounded-md bg-proof-wash px-1.5 py-0.5 font-mono text-[0.66rem] font-semibold text-proof-deep">
                      {r.delta}
                    </span>
                  )}
                </span>
              </div>

              {/* mobile stack */}
              <div className="md:hidden">
                <div className="flex items-baseline justify-between gap-3">
                  <span className={`text-[0.95rem] font-medium ${r.deferred ? "text-ink-mute" : "text-ink"}`}>
                    {r.action}
                  </span>
                  {r.delta ? (
                    <span className="shrink-0 rounded-md bg-proof-wash px-1.5 py-0.5 font-mono text-[0.66rem] font-semibold text-proof-deep">
                      {r.delta}
                    </span>
                  ) : (
                    <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-ink-mute">
                      Deferred
                    </span>
                  )}
                </div>
                <div className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[0.8rem]">
                  <span className="text-ink-mute">
                    Baseline <span className="ledger-num text-ink/80">{r.baseline}</span>
                  </span>
                  <span className="text-ink-mute">
                    Projected <span className="ledger-num text-ink/80">{r.projected}</span>
                  </span>
                  <span className="text-ink-mute">
                    Adopted <span className="text-ink/80">{r.adopted}</span>
                  </span>
                  <span className="text-ink-mute">
                    Retest{" "}
                    <span className={`ledger-num font-semibold ${r.deferred ? "text-ink-mute" : "text-proof-deep"}`}>
                      {r.retest}
                    </span>
                  </span>
                </div>
              </div>

              {/* delta bar */}
              <div
                className="mt-3.5 h-[3px] w-full overflow-hidden rounded-full bg-ink/[0.07]"
                aria-hidden="true"
              >
                <div
                  className="delta-fill h-full rounded-full bg-proof"
                  style={{
                    ["--fill" as string]: inView ? r.fill : 0,
                    transitionDelay: `${300 + i * 140}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 max-w-[62ch] text-[0.88rem] leading-relaxed text-ink-mute">
          The deferred row stays in the report. Recommending against a purchase
          is a result too, and the retest never scores what was not adopted.
        </p>
      </div>
    </section>
  );
}
