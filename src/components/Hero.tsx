import MagneticButton from "@/components/MagneticButton";
import { DIAGNOSTIC_URL } from "@/lib/site";

const AIMS = [
  "Same information stops getting typed into another form, another tool, another inbox",
  "Repeatable admin continues without you having to kick it off",
  "More of the week on decisions, trust, and relationships",
  "New tools earn their place only after the work is clear",
];

/**
 * Server-rendered hero. Entrances are pure CSS keyframes: they run
 * without JavaScript, and the global reduced-motion rule collapses
 * them to their final state instantly.
 */
export default function Hero() {
  const d = (delay: number) => ({ ["--d" as string]: `${delay}s` });

  return (
    <section className="ink-surface relative flex min-h-[100dvh] flex-col justify-end overflow-hidden">
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

      <div className="relative mx-auto my-auto w-full max-w-wrap px-5 pb-14 pt-28 sm:px-8 lg:pb-16 lg:pt-32">
        <p
          className="rise eyebrow flex items-center gap-2.5 text-ember"
          style={d(0.05)}
        >
          <span className="h-px w-8 bg-ember/70" aria-hidden="true" />
          Less drain. More of you left for the work that actually matters.
        </p>

        <h1
          className="rise font-display mt-6 max-w-[18ch] text-[2.4rem] font-medium leading-[1.08] text-paper sm:text-[3.05rem] lg:text-[3.2rem]"
          style={d(0.16)}
        >
          Your mental capacity is still the bottleneck.
        </h1>

        <p
          className="rise mt-6 max-w-[36rem] text-pretty text-[1.05rem] leading-relaxed text-paper/75"
          style={d(0.28)}
        >
          The work only moves forward when you take the time to push it, and
          only when you remember to. That is not a character flaw. It is a
          company that still lives in one head.
        </p>

        <p
          className="rise mt-5 max-w-[36rem] text-pretty text-[1.02rem] leading-relaxed text-paper/65"
          style={d(0.36)}
        >
          We find the work that repeats, teach it to a system, and leave your
          capacity for the decisions. Drafts, sends, and spend still wait for a
          person.
        </p>

        <ul
          className="rise mt-8 max-w-[38rem] space-y-2.5 text-[0.95rem] leading-relaxed text-paper/70"
          style={d(0.44)}
        >
          {AIMS.map((aim) => (
            <li key={aim} className="flex gap-3">
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ember/80"
                aria-hidden="true"
              />
              <span>{aim}</span>
            </li>
          ))}
        </ul>

        <div
          className="rise mt-10 flex flex-wrap items-center gap-3.5"
          style={d(0.52)}
        >
          <MagneticButton href={DIAGNOSTIC_URL} external variant="primary">
            Take the diagnostic
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-swift group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </MagneticButton>
          <MagneticButton href="#story" variant="paper">
            See how the week can change
          </MagneticButton>
        </div>

        <p className="rise mt-5 text-[0.82rem] text-paper/60" style={d(0.58)}>
          8 to 12 minutes. Private. Nothing to buy at the end.
        </p>
      </div>

      <div className="relative border-t border-paper/10">
        <div className="mx-auto flex w-full max-w-wrap flex-wrap items-center justify-center gap-x-6 gap-y-1.5 px-5 py-4 sm:px-8">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-paper/55">
            You still decide
          </p>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-paper/55">
            Diagnose. Recommend. Prove.
          </p>
        </div>
      </div>
    </section>
  );
}
