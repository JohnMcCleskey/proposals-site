import Image from "next/image";
import Reveal from "@/components/Reveal";
import { LINKEDIN_PERSONAL_URL } from "@/lib/site";

export default function Operator() {
  return (
    <section id="operator" className="bg-paper" aria-label="John McCleskey">
      <div className="mx-auto w-full max-w-wrap px-5 py-16 sm:px-8 lg:py-20">
        <Reveal>
          <p className="eyebrow text-ember-ink">A person on the other side</p>
        </Reveal>

        <div className="mt-8 grid items-start gap-x-12 gap-y-8 lg:grid-cols-[180px_1fr]">
          <Reveal>
            <div className="max-w-[180px]">
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

          <div className="max-w-[58ch]">
            <Reveal>
              <p className="text-[1.02rem] leading-relaxed text-ink/80">
                John McCleskey spent a decade inside owner-led companies,
                including delivering twenty-eight Chick-fil-A locations, before
                starting StoneWave. He still starts by watching how the week
                actually moves, then puts the smallest help under it, and a
                person still approves anything that sends or spends.
              </p>
            </Reveal>
            <Reveal delay={90}>
              <a
                href={LINKEDIN_PERSONAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-[0.92rem] text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ember"
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
