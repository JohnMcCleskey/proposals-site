import Reveal from "@/components/Reveal";

/**
 * Diagnose · Recommend · Prove. Three movements, three deliberately
 * different layouts: an interview artifact, a three-lane comparison,
 * and a closed measurement loop.
 */

export default function Method() {
  return (
    <section id="method" className="bg-paper-bright" aria-label="Method">
      <div className="mx-auto w-full max-w-wrap px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <p className="eyebrow text-ember-ink">Method</p>
          <h2 className="font-display mt-4 max-w-[24ch] text-balance text-[1.9rem] font-medium leading-[1.12] text-ink sm:text-[2.5rem]">
            Diagnose. Recommend. Prove.
          </h2>
          <p className="mt-5 max-w-prose text-[1rem] leading-relaxed text-ink-mute">
            The order is the product. Nothing gets prescribed before the
            diagnosis, and nothing gets claimed without the retest.
          </p>
        </Reveal>

        {/* 01 · Diagnose: interview → artifacts */}
        <Reveal className="mt-14">
          <div className="bezel grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
            <div>
              <p className="eyebrow flex items-center gap-2.5 text-ink-mute">
                <span className="ledger-num text-ember-ink">01</span> Diagnose
              </p>
              <h3 className="font-display mt-4 text-[1.5rem] font-medium leading-tight text-ink">
                Plain questions about how work actually moves.
              </h3>
              <p className="mt-3.5 max-w-[44ch] text-[0.95rem] leading-relaxed text-ink/75">
                Eight to twelve minutes, in private. Where does a new job land
                first, who chases the quote, when does the invoice go out. No
                jargon, no tool audit, nothing to buy at the end.
              </p>
            </div>
            <div className="grid content-center gap-3">
              {[
                {
                  k: "Directional Brief",
                  v: "Findings ranked by leverage, in plain language.",
                },
                {
                  k: "Baseline",
                  v: "Today's numbers, captured so the retest means something.",
                },
                {
                  k: "Readiness read",
                  v: "What can start now versus what needs an owner first.",
                },
              ].map((a) => (
                <div
                  key={a.k}
                  className="flex flex-col gap-1 rounded-xl border border-ink/10 bg-paper px-5 py-3.5 sm:flex-row sm:items-baseline sm:gap-4"
                >
                  <span className="shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ember-ink">
                    {a.k}
                  </span>
                  <span className="text-[0.88rem] text-ink/70">{a.v}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 02 · Recommend: three lanes, one spine */}
        <Reveal className="mt-8">
          <div className="bezel p-6 sm:p-9">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow flex items-center gap-2.5 text-ink-mute">
                  <span className="ledger-num text-ember-ink">02</span> Recommend
                </p>
                <h3 className="font-display mt-4 text-[1.5rem] font-medium leading-tight text-ink">
                  Three lanes, one honest ranking.
                </h3>
              </div>
              <p className="max-w-[34ch] border-l-2 border-ember/60 pl-3.5 text-[0.85rem] leading-relaxed text-ink-mute">
                The ranking never changes with the lane you pick. Our
                recommendations stay independent of what you buy.
              </p>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {[
                {
                  lane: "Do it yourselves",
                  note: "The playbook is written to be handed over. Most first findings are process-only.",
                  tag: "No spend",
                },
                {
                  lane: "We implement",
                  note: "Optional, scoped separately, priced separately. The brief stands on its own without it.",
                  tag: "Scoped apart",
                },
                {
                  lane: "Add a tool",
                  note: "Only where process alone stalls, and only after the process version was tried or priced.",
                  tag: "Last, not first",
                },
              ].map((l) => (
                <div
                  key={l.lane}
                  className="group rounded-2xl border border-ink/10 bg-paper p-5 transition-all duration-300 ease-swift hover:-translate-y-1 hover:shadow-card"
                >
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-mute">
                    {l.tag}
                  </span>
                  <h4 className="font-display mt-2.5 text-[1.15rem] font-medium text-ink">
                    {l.lane}
                  </h4>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-ink/70">
                    {l.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 03 · Prove: the loop */}
        <Reveal className="mt-8">
          <div className="bezel p-6 sm:p-9">
            <p className="eyebrow flex items-center gap-2.5 text-ink-mute">
              <span className="ledger-num text-ember-ink">03</span> Prove
            </p>
            <h3 className="font-display mt-4 text-[1.5rem] font-medium leading-tight text-ink">
              A closed loop, not a victory lap.
            </h3>

            <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {[
                { s: "Baseline", d: "Measure before anything changes." },
                { s: "Adopt", d: "Log the changes that actually stuck." },
                { s: "Retest", d: "Measure again, the same way." },
                { s: "Report", d: "The delta, on one page you can hand over." },
              ].map((step, i) => (
                <li key={step.s} className="relative rounded-2xl border border-ink/10 bg-paper p-5">
                  <span className="ledger-num text-[0.72rem] text-ink-mute">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display mt-1.5 text-[1.1rem] font-medium text-ink">
                    {step.s}
                  </p>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink/70">
                    {step.d}
                  </p>
                  {i < 3 && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-3 top-1/2 hidden -translate-y-1/2 translate-x-1/2 text-ink-mute/50 lg:block"
                    >
                      &rarr;
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-5 text-[0.85rem] text-ink-mute">
              If the retest shows nothing moved, the report says so. That is
              what makes the good reports worth keeping.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
