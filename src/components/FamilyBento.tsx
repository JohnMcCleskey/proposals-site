import Reveal from "@/components/Reveal";
import { FAMILY } from "@/lib/site";

/**
 * The live family. Real links only. Surfaces we could not verify as
 * live stay out of this grid by policy.
 */

export default function FamilyBento() {
  return (
    <section id="family" className="bg-paper" aria-label="The StoneWave family">
      <div className="mx-auto w-full max-w-wrap px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <p className="eyebrow text-ember">Built and running</p>
          <h2 className="font-display mt-4 max-w-[24ch] text-balance text-[1.9rem] font-medium leading-[1.12] text-ink sm:text-[2.5rem]">
            One family. Every link goes somewhere real.
          </h2>
          <p className="mt-5 max-w-prose text-[1rem] leading-relaxed text-ink-mute">
            StoneWave operates the method and the software it runs on. No logo
            wall, no case studies with the names filed off. Click through and
            judge the family yourself.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {FAMILY.map((f, i) => (
            <Reveal
              key={f.name}
              delay={i * 80}
              className={f.span === "wide" ? "md:col-span-2" : ""}
            >
              <a
                href={f.here ? "#top" : f.url}
                target={f.here ? undefined : "_blank"}
                rel={f.here ? undefined : "noopener noreferrer"}
                className={`bezel group block h-full p-6 transition-all duration-300 ease-swift hover:-translate-y-1 hover:shadow-lift sm:p-8 ${
                  f.here ? "bg-paper" : ""
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div className="flex items-baseline gap-3.5">
                    <h3 className="font-display text-[1.4rem] font-medium text-ink">
                      {f.name}
                    </h3>
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-mute">
                      {f.role}
                    </span>
                  </div>
                  <span className="ledger-num flex items-center gap-1.5 text-[0.78rem] text-ink-mute transition-colors duration-300 group-hover:text-ember">
                    {f.host}
                    {!f.here && (
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-300 ease-swift group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      >
                        &#8599;
                      </span>
                    )}
                  </span>
                </div>
                <p
                  className={`font-display mt-4 text-pretty font-medium leading-snug text-ink/85 ${
                    f.span === "wide" ? "text-[1.25rem] sm:text-[1.45rem]" : "text-[1.1rem]"
                  }`}
                >
                  {f.line}
                </p>
                <p className="mt-3 max-w-[68ch] text-[0.9rem] leading-relaxed text-ink/65">
                  {f.detail}
                </p>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <p className="mt-5 text-[0.82rem] text-ink-mute">
            Other tools are in build behind these. They join this grid when
            their public doors are open, not before.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
