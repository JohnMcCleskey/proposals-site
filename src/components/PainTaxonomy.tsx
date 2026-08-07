import Reveal from "@/components/Reveal";

const PAINS = [
  {
    name: "The Human Router",
    story:
      "Every request lands on the one person who knows where things go. The business routes fine until they take a Friday off.",
    cost: "Their judgment is spent on sorting, not on decisions.",
  },
  {
    name: "Swivel-Chair Work",
    story:
      "The same order gets typed into the estimate, the job board, and the invoice. Three chances to mistype, none of them billable.",
    cost: "Hours a week of copying no customer ever pays for.",
  },
  {
    name: "The Invisible Leak",
    story:
      "Unbilled change orders, lapsed price escalators, discounts nobody remembers approving. Each one is small enough to ignore.",
    cost: "Margin leaves quietly, a percent at a time.",
  },
  {
    name: "The Frankenstack",
    story:
      "Nine subscriptions, four overlapping, one nobody can log into. Every new problem got a new tool instead of a decision.",
    cost: "You pay twice: the licenses, and the seams between them.",
  },
  {
    name: "The Mental Load",
    story:
      "The owner keeps the real schedule in their head because no system is trusted with it. Vacations become status-report relays.",
    cost: "The company's memory has a single point of failure.",
  },
  {
    name: "Document-to-Dollars",
    story:
      "The money is agreed in a PDF, then re-earned through resends, reminders, and signature chases. Closing happens twice.",
    cost: "The slowest mile is between the handshake and the bank.",
  },
];

export default function PainTaxonomy() {
  return (
    <section className="bg-paper" aria-label="Where value gets stuck">
      <div className="mx-auto w-full max-w-wrap px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <p className="eyebrow text-ember-ink">The patterns</p>
          <h2 className="font-display mt-4 max-w-[22ch] text-balance text-[1.9rem] font-medium leading-[1.12] text-ink sm:text-[2.5rem]">
            Where value gets stuck has names.
          </h2>
          <p className="mt-5 max-w-prose text-pretty text-[1rem] leading-relaxed text-ink-mute">
            Six patterns we keep finding inside owner-led companies. None of
            them are character flaws. All of them are routes that grew one
            workaround at a time. If one reads like your week, the diagnostic
            will find its edges.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-14 lg:grid-cols-2">
          {PAINS.map((p, i) => (
            <Reveal
              key={p.name}
              delay={(i % 2) * 90}
              className="group border-t border-ink/10 py-7"
            >
              <div className="flex items-baseline gap-5">
                <span className="ledger-num text-[0.78rem] text-ink-mute">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-[1.35rem] font-medium leading-tight text-ink transition-colors duration-300 group-hover:text-ember-ink">
                    {p.name}
                  </h3>
                  <p className="mt-2.5 max-w-[46ch] text-[0.95rem] leading-relaxed text-ink/75">
                    {p.story}
                  </p>
                  <p className="mt-3 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-ember-ink">
                    Cost: <span className="normal-case tracking-normal">{p.cost}</span>
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
