import Image from "next/image";
import Reveal from "@/components/Reveal";
import { LINKEDIN_PERSONAL_URL } from "@/lib/site";

export default function Operator() {
  return (
    <section className="bg-paper" aria-label="The operator">
      <div className="mx-auto w-full max-w-wrap px-5 py-20 sm:px-8 lg:py-24">
        <Reveal>
          <p className="eyebrow text-ember-ink">The operator</p>
          <h2 className="font-display mt-4 max-w-[26ch] text-balance text-[1.9rem] font-medium leading-[1.12] text-ink sm:text-[2.5rem]">
            The method comes from having done the work.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-x-14 gap-y-8 lg:grid-cols-[220px_1fr]">
          <Reveal>
            <div className="max-w-[220px]">
              <Image
                src="/john-mccleskey.webp"
                alt="John McCleskey, founder of StoneWave"
                width={800}
                height={681}
                className="w-full rounded-md border border-ink/10 object-cover"
              />
              <p className="mt-3 text-[0.9rem] font-medium text-ink">
                John McCleskey
              </p>
              <p className="mt-0.5 text-[0.8rem] text-ink-mute">
                Founder &amp; managing member
              </p>
            </div>
          </Reveal>

          <div className="max-w-[62ch] space-y-6">
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
                That same standard runs through every company in the family
                above. Software drafts, routes, and prepares; a person approves
                anything consequential. As the team grows, that is the piece
                that does not change.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <a
                href={LINKEDIN_PERSONAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[0.92rem] text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ember"
              >
                Connect on LinkedIn &#8599;
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
