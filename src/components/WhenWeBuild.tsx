import Reveal from "@/components/Reveal";

/**
 * The build lane, expanded.
 *
 * This section is licensed by the line that closes Deliverables:
 * implementation is optional, scoped separately, and the
 * recommendations do not change if you never buy it. It must never
 * move above that line, and FamilyBento must stay directly after it,
 * since the live products are what make the capability credible.
 *
 * It asserts independence by stating sequence rather than by claiming
 * virtue a third time. Every block carries the condition that has to
 * hold before the work is on the table, and the last one is the option
 * that beats a build.
 */

const BLOCKS = [
  {
    label: "Connect what you already own",
    body: "Most of this work is connecting tools you already pay for, not replacing them. Sometimes the tangle itself is the finding, and the fix is wiring two systems together so the same job stops getting typed in three places.",
    only:
      "the same record is keyed into two systems, both systems are staying, and the manual version was tried and did not hold.",
  },
  {
    label: "Build the dashboard or the portal",
    body: "Sometimes the numbers exist and no screen shows the whole picture, and the only door for a customer is an inbox. That is when we build the view. An internal dashboard for your team, or a portal your customers, crews, or subs log into.",
    only:
      "a named person needs it weekly, the spreadsheet version came first, and nothing off the shelf fit the job.",
  },
  {
    label: "Host it where you want it",
    body: "On your domain, inside the site you already have, or on infrastructure we run for you. The accounts and the data stay in your name. The exit is written down before the first line of code, and leaving does not require our permission.",
    only:
      "you have decided where it should live, and you can take it back without calling us.",
  },
  {
    label: "The option that beats a build",
    body: "Most findings never get this far. Every finding keeps a process-only option, ranked next to the build. If connecting two tools you already own beats anything we could construct, the brief says so and hands you the steps.",
    only: "nothing. This one is always on the list.",
  },
];

export default function WhenWeBuild() {
  return (
    <section id="build" className="bg-paper-bright" aria-label="When we build">
      <div className="mx-auto w-full max-w-wrap px-5 py-20 sm:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-ember-ink">When we build</p>
            <h2 className="font-display mt-4 max-w-[18ch] text-balance text-[1.9rem] font-medium leading-[1.12] text-ink sm:text-[2.4rem]">
              We build. The diagnosis decides when.
            </h2>
            <p className="mt-5 max-w-[40ch] text-[0.95rem] leading-relaxed text-ink-mute">
              Some findings have no process-only fix that holds. When the
              checklist gets tried and the problem comes back, a build joins the
              ranked options. It still has to clear a bar, and the bar is set
              during the diagnosis, before anyone talks about scope.
            </p>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {BLOCKS.map((b, i) => (
              <Reveal
                key={b.label}
                delay={(i % 2) * 80}
                className="rounded-2xl border border-ink/10 bg-paper p-5"
              >
                <h3 className="font-display text-[1.15rem] font-medium leading-snug text-ink">
                  {b.label}
                </h3>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-ink/70">
                  {b.body}
                </p>
                <p className="mt-3.5 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-ember-ink">
                  Only if:{" "}
                  <span className="normal-case tracking-normal">{b.only}</span>
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={160}>
          <p className="mt-10 max-w-[70ch] border-l-2 border-ember/60 pl-4 text-[0.95rem] leading-relaxed text-ink-mute">
            A build gets scoped after the brief exists, not before, and the
            ranking does not move once that conversation starts. If a build
            cannot beat the process-only option on the scorecard, it does not
            get built. Anything a build would send or spend still waits for a
            person to approve it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
