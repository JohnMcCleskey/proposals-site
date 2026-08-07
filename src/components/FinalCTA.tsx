"use client";

import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import { CAL_URL, DIAGNOSTIC_URL } from "@/lib/site";

export default function FinalCTA() {
  return (
    <section className="ink-surface relative overflow-hidden" aria-label="Start">
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
      <div className="relative mx-auto w-full max-w-wrap px-5 py-24 text-center sm:px-8 lg:py-32">
        <Reveal>
          <p className="eyebrow text-ember">Start here</p>
          <h2 className="font-display mx-auto mt-5 max-w-[20ch] text-balance text-[2.1rem] font-medium leading-[1.1] text-paper sm:text-[3rem]">
            Find where improvement is actually worth the investment.
          </h2>
          <p className="mx-auto mt-6 max-w-[44ch] text-pretty text-[1rem] leading-relaxed text-paper/65">
            Eight to twelve minutes of plain questions. You get the ranked
            findings either way, and nothing is pitched inside.
          </p>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href={DIAGNOSTIC_URL} external variant="primary">
              Start the diagnostic
              <span aria-hidden="true" className="transition-transform duration-300 ease-swift group-hover:translate-x-0.5">
                &rarr;
              </span>
            </MagneticButton>
            <MagneticButton href={CAL_URL} external variant="paper">
              Book a 15 minute call
            </MagneticButton>
          </div>
          <p className="mt-6 text-[0.82rem] text-paper/40">
            Prefer email? <a className="underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper/70" href="mailto:ops@stonewave.life">ops@stonewave.life</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
