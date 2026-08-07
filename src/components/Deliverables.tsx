import Reveal from "@/components/Reveal";

/**
 * What you get. Styled as the contents page of the physical brief,
 * because that is what it is: outcomes, not a SKU list.
 */

const ITEMS = [
  {
    name: "Directional Brief",
    desc: "Where value is stuck and which changes carry leverage, in plain language a partner can read.",
  },
  {
    name: "Baseline & acceptance tests",
    desc: "Today's numbers and the exact conditions under which we will call a change an improvement.",
  },
  {
    name: "Priority Scorecard",
    desc: "Findings ranked by payoff against effort, with readiness called out for each.",
  },
  {
    name: "Process-first plan",
    desc: "The version of the fix that needs no new software. It ranks alongside every tool option.",
  },
  {
    name: "Optional tool map",
    desc: "Where a tool genuinely earns its place, which one, and what it must beat to stay.",
  },
  {
    name: "Retest loop",
    desc: "A scheduled second measurement against the baseline, reported whether or not it flatters us.",
  },
];

export default function Deliverables() {
  return (
    <section id="work" className="bg-paper-bright" aria-label="What you get">
      <div className="mx-auto w-full max-w-wrap px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-ember">What you get</p>
            <h2 className="font-display mt-4 max-w-[18ch] text-balance text-[1.9rem] font-medium leading-[1.12] text-ink sm:text-[2.5rem]">
              A brief you could act on without us.
            </h2>
            <p className="mt-5 max-w-[42ch] text-[1rem] leading-relaxed text-ink-mute">
              Every engagement produces artifacts that stand on their own.
              Implementation is optional and scoped separately, and the
              recommendations do not change if you never buy it.
            </p>
            <div className="mt-8 hidden max-w-[20rem] rotate-[-1deg] lg:block">
              <div className="bezel p-6 shadow-card">
                <p className="eyebrow text-ink-mute">On the cover</p>
                <p className="font-display mt-3 text-[1.3rem] font-medium leading-snug text-ink">
                  Directional Brief
                </p>
                <p className="ledger-num mt-1 text-[0.78rem] text-ink-mute">
                  Prepared for the owner. Twelve pages.
                </p>
                <div className="mt-4 space-y-1.5" aria-hidden="true">
                  <div className="h-1.5 w-11/12 rounded bg-ink/[0.08]" />
                  <div className="h-1.5 w-9/12 rounded bg-ink/[0.08]" />
                  <div className="h-1.5 w-10/12 rounded bg-ember/25" />
                  <div className="h-1.5 w-7/12 rounded bg-ink/[0.08]" />
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <ol className="divide-y divide-ink/[0.08] border-y border-ink/[0.08]">
              {ITEMS.map((item, i) => (
                <Reveal
                  key={item.name}
                  as="li"
                  delay={i * 70}
                  className="group flex gap-5 py-5"
                >
                  <span className="ledger-num pt-0.5 text-[0.8rem] text-ink-mute/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.15rem] font-medium text-ink transition-colors duration-300 group-hover:text-ember">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 max-w-[52ch] text-[0.9rem] leading-relaxed text-ink/70">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={200}>
              <p className="mt-6 border-l-2 border-ember/60 pl-4 text-[0.9rem] leading-relaxed text-ink-mute">
                No public price list here on purpose. Scope follows the
                diagnostic, not the other way around, and you will see the
                number before you commit to anything.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
