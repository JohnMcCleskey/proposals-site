"use client";

import { useEffect, useState } from "react";
import LandSubmissionForm from "@/components/LandSubmissionForm";
import SovereignMesh from "@/components/SovereignMesh";
import VerificationDemo from "@/components/VerificationDemo";
import VentureGrid from "@/components/VentureGrid";
import Reveal from "@/components/Reveal";
import Wordmark from "@/components/Wordmark";
import { VENTURES } from "@/lib/ventures";

const CAL = "https://cal.com/john-mccleskey/15min";
const INTAKE = "https://portal.intentrouter.ai/intake";

/* ─────────────────────────────────────────── rotating hero sub-line */
const ROTATIONS = [
  "cites its evidence",
  "gets checked by a second agent",
  "gets dropped when it fails",
  "lands in an append-only log",
];

function Rotator() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % ROTATIONS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="rotator">
      {ROTATIONS.map((r, n) => (
        <span key={r} className={`rotator-item ${n === i ? "is-in" : ""}`}>
          {r}
        </span>
      ))}
      {/* Reserves the width of the longest phrase so the line never reflows. */}
      <span className="rotator-ghost" aria-hidden="true">
        {ROTATIONS.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>
    </span>
  );
}

/* ─────────────────────────────────────────── service cards */
function ServiceCard({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="service-card" delay={index * 70}>
      <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="card-title">{title}</h3>
      <p className="card-body">{children}</p>
    </Reveal>
  );
}

/* ─────────────────────────────────────────── pricing */
function PricingCard({
  name,
  price,
  tagline,
  features,
  cta,
  href,
  accent,
  index,
}: {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  cta: string;
  href: string;
  accent?: boolean;
  index: number;
}) {
  return (
    <Reveal
      className={`pricing-card ${accent ? "pricing-accent" : ""}`}
      delay={index * 80}
    >
      {accent && <div className="pricing-badge">Skin in the game</div>}
      <div className="pricing-name">{name}</div>
      <div className="pricing-price">{price}</div>
      <div className="pricing-tagline">{tagline}</div>
      <ul className="pricing-features">
        {features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn-lg btn-block ${accent ? "btn-primary" : "btn-secondary"}`}
      >
        {cta}
      </a>
    </Reveal>
  );
}

/* ─────────────────────────────────────────── page */
export default function HomePage() {
  const [showLandForm, setShowLandForm] = useState(false);

  useEffect(() => {
    if (!showLandForm) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowLandForm(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [showLandForm]);

  const liveVentures = VENTURES.filter((v) => v.status === "live");

  return (
    <>
      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="nav-brand">
            <Wordmark />
            <span>StoneWave</span>
          </a>

          <div className="nav-links">
            <a href="#proof">Watch it work</a>
            <a href="#ventures">Ventures</a>
            <a href="#trust">How we prove it</a>
            <a href="#pricing">Pricing</a>
          </div>

          <a
            href={CAL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-sm"
          >
            Book a Call
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <SovereignMesh />
        <div className="hero-fade" />

        <div className="hero-content">
          <div className="eyebrow">
            <span className="pulse-dot" />
            Sovereign AI operations · Built and running
          </div>

          <h1 className="hero-heading">
            We don&apos;t ask you to
            <br />
            trust the output.
            <br />
            <span className="gradient-text">We make it prove itself.</span>
          </h1>

          <p className="hero-sub">
            StoneWave builds AI systems where every claim <Rotator />.
            Then we run those systems as real businesses — so you can go look at
            them before you pay us a dollar.
          </p>

          <div className="hero-actions">
            <a
              href="#proof"
              className="btn-primary btn-lg"
            >
              Watch the pipeline run ↓
            </a>
            <a
              href={CAL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-lg"
            >
              Book 15 minutes
            </a>
          </div>

          <p className="hero-fineprint">
            No pitch deck. We&apos;ll open the machine and show you the wiring.
          </p>
        </div>
      </section>

      {/* ── LIVE VENTURE TICKER ── */}
      <div className="ticker" aria-label="Live StoneWave ventures">
        <div className="ticker-track">
          {[0, 1].map((dup) => (
            <div className="ticker-run" key={dup} aria-hidden={dup === 1}>
              <span className="ticker-lead">Running in production</span>
              {liveVentures.map((v) => (
                <a
                  key={`${dup}-${v.slug}`}
                  className="ticker-item"
                  href={v.url ?? "#ventures"}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={dup === 1 ? -1 : 0}
                >
                  <i className="ticker-dot" />
                  {v.name}
                  <span className="ticker-host">
                    {v.url?.replace(/^https?:\/\//, "")}
                  </span>
                </a>
              ))}
              <span className="ticker-item ticker-soon">
                <i className="ticker-dot is-soon" />
                SovereignOS
                <span className="ticker-host">shipping next</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── THE DEMO ── */}
      <section className="section" id="proof">
        <Reveal>
          <div className="eyebrow centered">Watch it work</div>
          <h2 className="section-heading">
            Most AI demos hide the failures.
            <br />
            This one ships them.
          </h2>
          <p className="section-sub">
            Pick a goal and run it. You&apos;ll watch it split into specialist
            roles, cite sources, get audited by an independent Guardian agent —
            and you&apos;ll watch a claim get thrown out mid-run. That refusal is
            the product.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <VerificationDemo />
        </Reveal>
      </section>

      <div className="divider" />

      {/* ── VENTURES ── */}
      <section className="section" id="ventures">
        <Reveal>
          <div className="eyebrow centered">The portfolio</div>
          <h2 className="section-heading">
            Every system we sell, we run on ourselves first.
          </h2>
          <p className="section-sub">
            These aren&apos;t case studies with the names redacted. They&apos;re
            our own companies, on our own money, running the exact stack we
            would build for you. Click any of them.
          </p>
        </Reveal>
        <VentureGrid />
      </section>

      <div className="divider" />

      {/* ── TRUST / CREDIBILITY MECHANISM ── */}
      <section className="section trust-section" id="trust">
        <Reveal>
          <div className="eyebrow centered">How we prove it</div>
          <h2 className="section-heading">
            Credibility isn&apos;t a logo wall. It&apos;s a mechanism.
          </h2>
          <p className="section-sub">
            Anybody can claim accuracy. These are the structural commitments that
            make it expensive for us to be wrong.
          </p>
        </Reveal>

        <div className="trust-grid">
          {[
            {
              k: "Outcome-only pricing",
              v: "20% of independently verified value recovered or created. No recovery, no fee. If the analysis is wrong, we are the ones who eat it.",
            },
            {
              k: "Adversarial verification",
              v: "An independent Guardian agent checks every claim against the cited evidence. Claims that fail never reach your brief — you see them marked refuted instead.",
            },
            {
              k: "Local-first by default",
              v: "In the highest-trust deployment, your data never leaves your hardware. The system runs where the data already lives.",
            },
            {
              k: "Read-only scope",
              v: "We take access to the specific data and nothing else. No admin credentials, no write access, no irreversible actions.",
            },
            {
              k: "A human always approves",
              v: "This is decision support, not an autonomous agent with your bank login. Nothing executes until a person signs off.",
            },
            {
              k: "Tamper-evident log",
              v: "Verified outputs are appended to a State Store you can audit. Every finding traces back to the row, clause, or record it came from.",
            },
          ].map((item, i) => (
            <Reveal key={item.k} className="trust-item" delay={i * 60}>
              <span className="trust-rule" />
              <h3>{item.k}</h3>
              <p>{item.v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── WHAT WE BUILD ── */}
      <section className="section" id="build">
        <Reveal>
          <div className="eyebrow centered">What we build for clients</div>
          <h2 className="section-heading">
            The same machinery, pointed at your operation.
          </h2>
        </Reveal>
        <div className="card-grid">
          <ServiceCard index={0} title="Multi-agent workflows">
            Intake, scheduling, follow-up, reporting — decomposed into roles that
            hand off to each other and escalate to a human at the edges they
            aren&apos;t allowed to cross.
          </ServiceCard>
          <ServiceCard index={1} title="Verified research & briefs">
            Cited answers to questions that actually matter — regulatory
            pathways, standards mapping, competitive intelligence — with the
            uncertainty labeled instead of smoothed over.
          </ServiceCard>
          <ServiceCard index={2} title="Data & margin recovery">
            Billing leakage, contract drift, unapplied escalators, logistics
            waste. We find the money, prove it line by line, and show you how to
            collect it.
          </ServiceCard>
          <ServiceCard index={3} title="Purpose-built internal tools">
            Lead scoring, deal tracking, parcel intelligence, production
            pipelines. If your business runs on a spreadsheet nobody trusts, we
            replace it with something that shows its work.
          </ServiceCard>
        </div>
      </section>

      <div className="divider" />

      {/* ── PRICING ── */}
      <section className="section" id="pricing">
        <Reveal>
          <div className="eyebrow centered">Pricing</div>
          <h2 className="section-heading">Two ways in. Both of them honest.</h2>
          <p className="section-sub">
            Fixed-scope builds when you know what you want. Outcome-only when you
            want us to carry the risk.
          </p>
        </Reveal>

        <div className="pricing-grid">
          <PricingCard
            index={0}
            name="AI Health Check"
            price="$500 – $1,500"
            tagline="One week. A roadmap you could hand to someone else."
            features={[
              "Full operations audit",
              "Specific tool recommendations",
              "ROI projection per workflow",
              "Free if we can't find 3+ hrs/week",
            ]}
            cta="Book a Health Check →"
            href={CAL}
          />
          <PricingCard
            index={1}
            name="Workflow Build"
            price="$2,500 – $15,000"
            tagline="One workflow, or a whole system, end to end."
            features={[
              "Multi-agent design with role boundaries",
              "Integration with your existing stack",
              "Testing, handoff, and team training",
              "30 days of free tuning post-launch",
            ]}
            cta="Scope a Build →"
            href={CAL}
          />
          <PricingCard
            index={2}
            name="Provable Outcomes"
            price="20% of verified value"
            tagline="No recovery, no fee. We take the risk."
            features={[
              "Free assessment before anything is scoped",
              "Read-only access to the specific data",
              "Guardian-verified, fully cited brief",
              "You pay only on independently verified value",
            ]}
            cta="Start a Free Assessment →"
            href={INTAKE}
            accent
          />
        </div>
      </section>

      <div className="divider" />

      {/* ── PROCESS ── */}
      <section className="section">
        <Reveal>
          <div className="eyebrow centered">The engagement</div>
          <h2 className="section-heading">Four steps. You can stop at any of them.</h2>
        </Reveal>
        <div className="steps">
          {[
            {
              num: "01",
              title: "Free assessment",
              body: "State a goal. We return the roles we'd deploy, the data scope required, and what a verified outcome would look like. No cost, no commitment.",
            },
            {
              num: "02",
              title: "Scoped access",
              body: "You approve the scope. Read-only, on the specific data, and it can run entirely inside your environment.",
            },
            {
              num: "03",
              title: "Verified brief",
              body: "Findings plus cited evidence plus what we couldn't prove. Every claim links back to its source so you can audit us.",
            },
            {
              num: "04",
              title: "You decide",
              body: "A human approves before anything executes. On outcome-only work, you pay only against value that has been independently verified.",
            },
          ].map((s, i) => (
            <Reveal key={s.num} className="step" delay={i * 80}>
              <div className="step-num">{s.num}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-body">{s.body}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── GEORGIA LAND ── */}
      <section className="section geo-section" id="land">
        <Reveal className="geo-inner">
          <div className="eyebrow centered">DirtDealer · Georgia Land Network</div>
          <h2 className="section-heading">
            We are actively ingesting land across Georgia.
          </h2>
          <p className="section-sub">
            Concentrated in secondary and smaller markets where competition is
            thin. LandLens scores the parcel, DirtDealer packages the deal, and a
            human makes the call — the same three-layer pattern we build for
            clients, pointed at our own business.
          </p>
          <div className="stat-bar">
            {[
              ["GA-wide", "Coverage"],
              ["Secondary", "Markets"],
              ["24h", "Response time"],
              ["Direct", "Buyer matching"],
            ].map(([value, label]) => (
              <div className="stat-item" key={label}>
                <div className="stat-value">{value}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
          <div className="geo-actions">
            <button
              type="button"
              onClick={() => setShowLandForm(true)}
              className="btn-primary btn-lg"
            >
              Have land to sell? Submit it →
            </button>
            <a
              href="https://dirtdealer.us"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-lg"
            >
              Visit DirtDealer ↗
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── LAND SUBMISSION MODAL ── */}
      {showLandForm && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Submit your land"
          onClick={() => setShowLandForm(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <LandSubmissionForm onClose={() => setShowLandForm(false)} />
          </div>
        </div>
      )}

      <div className="divider" />

      {/* ── ABOUT ── */}
      <section className="section about-section">
        <Reveal>
          <div className="eyebrow centered">About StoneWave</div>
          <h2 className="section-heading">Built by operators, not consultants.</h2>
          <p className="section-sub">
            StoneWave builds and runs AI-powered businesses. We don&apos;t advise
            from the outside — we ship the systems, run them against our own
            revenue, and bring what survives to client work. The ventures above
            are the résumé. If it doesn&apos;t hold up under a Guardian pass, we
            don&apos;t ship it, and we don&apos;t sell it.
          </p>
        </Reveal>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="footer-cta">
        <Reveal>
          <h2>Bring us something you think AI can&apos;t do.</h2>
          <p>
            Fifteen minutes. We&apos;ll tell you honestly whether it&apos;s worth
            building — including when the answer is no.
          </p>
          <div className="hero-actions centered">
            <a
              href={CAL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-lg"
            >
              Book Your Free Call →
            </a>
            <a
              href={INTAKE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-lg"
            >
              Free Assessment
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-col">
            <strong>StoneWave</strong>
            <p>Sovereign AI operations. Built, run, and proven in production.</p>
            <a href="mailto:ops@stonewave.life">ops@stonewave.life</a>
          </div>
          <div className="footer-col">
            <strong>Ventures</strong>
            {VENTURES.map((v) =>
              v.url && v.status === "live" ? (
                <a
                  key={v.slug}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {v.name} ↗
                </a>
              ) : (
                <span key={v.slug} className="footer-soon">
                  {v.name} · soon
                </span>
              )
            )}
          </div>
          <div className="footer-col">
            <strong>Start</strong>
            <a href={CAL} target="_blank" rel="noopener noreferrer">
              Book a call ↗
            </a>
            <a href={INTAKE} target="_blank" rel="noopener noreferrer">
              Free assessment ↗
            </a>
            <a href="/ai">Agent interface</a>
          </div>
        </div>
        <p className="footer-legal">
          © {new Date().getFullYear()} StoneWave. Decision support, not licensed
          legal, tax, or financial advice.
        </p>
      </footer>
    </>
  );
}
