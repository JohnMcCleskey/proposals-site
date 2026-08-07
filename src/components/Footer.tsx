import Wordmark from "@/components/Wordmark";
import { CAL_URL, CONTACT_EMAIL, DIAGNOSTIC_URL, FAMILY } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper" aria-label="Footer">
      <div className="mx-auto w-full max-w-wrap px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2.5 font-display text-[1.15rem] font-semibold text-ink">
              <Wordmark size={24} />
              StoneWave
            </p>
            <p className="mt-3 max-w-[30ch] text-[0.9rem] leading-relaxed text-ink-mute">
              Systemic optimization for owner-led companies. Clarity before
              technology.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-block text-[0.9rem] text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ember"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <nav aria-label="Family">
            <p className="eyebrow text-ink-mute">The family</p>
            <ul className="mt-4 space-y-2.5">
              {FAMILY.filter((f) => !f.here).map((f) => (
                <li key={f.name}>
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-[0.92rem] text-ink/75 transition-colors hover:text-ink"
                  >
                    {f.name}{" "}
                    <span className="ledger-num text-[0.75rem] text-ink-mute transition-colors group-hover:text-ember-ink">
                      {f.host} &#8599;
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Start">
            <p className="eyebrow text-ink-mute">Start</p>
            <ul className="mt-4 space-y-2.5 text-[0.92rem]">
              <li>
                <a
                  href={DIAGNOSTIC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink/75 transition-colors hover:text-ink"
                >
                  Start the diagnostic &#8599;
                </a>
              </li>
              <li>
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink/75 transition-colors hover:text-ink"
                >
                  Book a 15 minute call &#8599;
                </a>
              </li>
              <li>
                <a href="/ai" className="text-ink/75 transition-colors hover:text-ink">
                  Agent interface
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-6">
          <p className="text-[0.8rem] text-ink-mute">
            &copy; {new Date().getFullYear()} StoneWave. Decision support, not
            licensed legal, tax, or financial advice.
          </p>
          <p className="eyebrow text-ink-mute/80">Clarity before technology</p>
        </div>
      </div>
    </footer>
  );
}
