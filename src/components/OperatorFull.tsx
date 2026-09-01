import Reveal from "@/components/Reveal";

/** Longer bio for the details tab. Main path uses Operator. */
export default function OperatorFull() {
  return (
    <section className="bg-paper" aria-label="How this practice started">
      <div className="mx-auto w-full max-w-wrap px-5 pb-16 sm:px-8">
        <Reveal>
          <h3 className="font-display max-w-[26ch] text-balance text-[1.6rem] font-medium leading-[1.15] text-ink sm:text-[1.9rem]">
            The method comes from having done the work.
          </h3>
        </Reveal>
        <div className="mt-6 max-w-[62ch] space-y-5">
          <Reveal>
            <p className="text-[0.98rem] leading-relaxed text-ink/80">
              John McCleskey trained as a builder at Auburn and spent the next
              decade inside owner-led companies and commercial construction,
              rising from project engineer to Director of Development and
              Construction at New Urban Development. He led projects from site
              selection through delivery, including twenty-eight Chick-fil-A
              locations across seven states, coordinating developers,
              municipalities, contractors, and franchise operators who rarely
              wanted the same thing at the same time. That work taught him a
              lesson that only comes from carrying the projects yourself: the
              expensive problems rarely show up in the meeting. They live in
              the handoffs, the retyping, and the follow-up nobody owned, and
              they have a price.
            </p>
          </Reveal>
          <Reveal delay={90}>
            <p className="text-[0.98rem] leading-relaxed text-ink/80">
              StoneWave is his answer to that pattern. The work starts by
              watching how a business actually moves, finding where the pain
              really lives, and building the smallest solution that addresses
              it. Then comes the part most recommendations skip: a baseline
              before anything changes and a retest after, reported whether or
              not it flatters us.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="text-[0.98rem] leading-relaxed text-ink/80">
              Software drafts, routes, and prepares; a person approves anything
              consequential. As the team grows, that is the piece that does not
              change.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
