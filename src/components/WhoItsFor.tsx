import Reveal from "@/components/Reveal";

const AUDIENCES = [
  {
    who: "Owner-operators",
    why: "You are the router, the closer, and the collections department. The diagnostic finds which hat to retire first.",
  },
  {
    who: "COOs and ops leads",
    why: "You inherited the workarounds. You need a ranked list you can defend in Monday's meeting, not a platform pitch.",
  },
  {
    who: "Brokers and deal-heavy pros",
    why: "Your margin lives in follow-through. Receipts and retests beat memory and good intentions.",
  },
  {
    who: "Finance-minded founders",
    why: "You will not sign off on vibes. Baseline, retest, delta. That is the whole argument.",
  },
];

export default function WhoItsFor() {
  return (
    <section className="bg-paper-bright" aria-label="Who it is for">
      <div className="mx-auto w-full max-w-wrap px-5 py-20 sm:px-8 lg:py-24">
        <Reveal>
          <p className="eyebrow text-ember-ink">Who it fits</p>
          <h2 className="font-display mt-4 max-w-[26ch] text-balance text-[1.9rem] font-medium leading-[1.12] text-ink sm:text-[2.5rem]">
            Built for people who must defend their decisions.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-x-14 gap-y-2 lg:grid-cols-2">
          {AUDIENCES.map((a, i) => (
            <Reveal
              key={a.who}
              delay={(i % 2) * 90}
              className="border-t border-ink/10 py-6"
            >
              <h3 className="font-display text-[1.2rem] font-medium text-ink">
                {a.who}
              </h3>
              <p className="mt-2 max-w-[52ch] text-[0.92rem] leading-relaxed text-ink/70">
                {a.why}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={180}>
          <p className="mt-8 max-w-[62ch] border-l-2 border-proof/60 pl-4 text-[0.92rem] leading-relaxed text-ink-mute">
            Skeptical of AI, or just tired of being sold to? Good. The
            diagnostic assumes nothing about what you should buy, and most
            first recommendations involve buying nothing.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
