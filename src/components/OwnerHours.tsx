import Reveal from "@/components/Reveal";

/**
 * The hours section. Sits directly under the proof ledger, where owner
 * hours are already a row.
 *
 * Two standing constraints on any edit here: nothing in this section
 * may prescribe a fix, and nothing may add a figure. It runs one screen
 * below a ledger row that came in under its own projection, so a
 * promise here would read as a claim the page just disproved. The
 * concrete detail lives in the present tense, describing what the week
 * currently costs, never what it will cost later.
 */

const BLOCKS = [
  {
    label: "What the week is actually costing",
    body: "The diagnostic asks where the week goes, and the answer usually has a shape. The Friday spent closing what the other four days left open. The phone that stays on through dinner because you are the only route to an answer. The week away that runs as a status relay.",
  },
  {
    label: "In the baseline, next to the money",
    body: "Owner hours get written down before anything changes, alongside margin and days to cash, because you cannot retest what you never counted. The retest asks the same questions the same way. If the hours did not move, that line prints in the same plain type as the margin line.",
  },
  {
    label: "Where they go is not our column",
    body: "We will not convert an hour into money, or into meaning. If hours do come back, some owners put every one of them straight back into the business, and that is a legitimate answer. It is not one we grade.",
  },
  {
    label: "Time back is not autopilot",
    body: "Consequential things still wait for a person, and that person is often you. The gate does not move. What can change is how much of the week goes to relaying instead of deciding.",
  },
];

export default function OwnerHours() {
  return (
    <section id="life" className="bg-paper-bright" aria-label="The hours">
      <div className="mx-auto w-full max-w-wrap px-5 py-20 sm:px-8 lg:py-24">
        <Reveal>
          <p className="eyebrow text-ember-ink">The hours</p>
          <h2 className="font-display mt-4 max-w-[24ch] text-balance text-[1.9rem] font-medium leading-[1.12] text-ink sm:text-[2.5rem]">
            Hours are the part we can count.
          </h2>
          <p className="mt-5 max-w-prose text-pretty text-[1rem] leading-relaxed text-ink-mute">
            Balance is a worn word. Most owners stopped believing it somewhere
            around the second hire, and they were right to. Hours are narrower,
            and narrow things can be counted. The ledger above counts hours. It
            does not say what they are for.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-14 lg:grid-cols-2">
          {BLOCKS.map((b, i) => (
            <Reveal
              key={b.label}
              delay={(i % 2) * 90}
              className="border-t border-ink/10 py-7"
            >
              <h3 className="font-display text-[1.2rem] font-medium leading-tight text-ink">
                {b.label}
              </h3>
              <p className="mt-2.5 max-w-[48ch] text-[0.95rem] leading-relaxed text-ink/75">
                {b.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={180}>
          <p className="mt-9 max-w-[64ch] border-l-2 border-proof/60 pl-4 text-[0.95rem] leading-relaxed text-ink-mute">
            We do not promise balance, and we do not measure it. We measure
            hours, against your own baseline, reported the same way as
            everything else. Most owners already know exactly what they want
            those hours for. That part was never ours to design.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
