import Reveal from "@/components/Reveal";

const GUARDRAILS = [
  {
    rule: "Recommendations stay independent",
    detail:
      "The ranking in your brief does not change based on what you buy from us, or whether you buy anything at all.",
  },
  {
    rule: "Process before purchases",
    detail:
      "Every finding ships with a process-only option. Tools have to beat the free version to make the list.",
  },
  {
    rule: "A human approves consequential actions",
    detail:
      "Drafts wait for sign-off. Nothing sends outbound, spends money, or commits you without a person deciding it should.",
  },
  {
    rule: "No autonomous purchases, ever",
    detail:
      "No system we recommend or run buys anything on your behalf. That is a hard line, not a setting.",
  },
  {
    rule: "Directional, not a final investment case",
    detail:
      "Projections in a brief are hypotheses to test against baseline, not numbers to take to your bank.",
  },
  {
    rule: "Decision support, not licensed advice",
    detail:
      "We inform decisions about how you run. Legal, tax, and investment calls belong with your licensed advisors.",
  },
];

export default function Guardrails() {
  return (
    <section className="bg-paper" aria-label="Guardrails">
      <div className="mx-auto w-full max-w-wrap px-5 py-20 sm:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-ember">Guardrails</p>
            <h2 className="font-display mt-4 max-w-[16ch] text-balance text-[1.9rem] font-medium leading-[1.12] text-ink sm:text-[2.4rem]">
              The lines we hold, in writing.
            </h2>
            <p className="mt-5 max-w-[38ch] text-[0.95rem] leading-relaxed text-ink-mute">
              Trust should not require a leap. These are the constraints the
              whole family operates under, and you are welcome to hold us to
              them.
            </p>
          </Reveal>

          <ol className="divide-y divide-ink/[0.08] border-y border-ink/[0.08]">
            {GUARDRAILS.map((g, i) => (
              <Reveal key={g.rule} as="li" delay={i * 60} className="flex gap-5 py-5">
                <span className="ledger-num pt-0.5 text-[0.78rem] text-ink-mute/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[1.02rem] font-semibold text-ink">
                    {g.rule}
                  </h3>
                  <p className="mt-1 max-w-[58ch] text-[0.88rem] leading-relaxed text-ink/70">
                    {g.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
