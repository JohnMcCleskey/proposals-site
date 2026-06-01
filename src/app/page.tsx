"use client";

import { useEffect, useRef, useState } from "react";
import LandSubmissionForm from "@/components/LandSubmissionForm";

/* ────────────────────────────── animations via IntersectionObserver */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("reveal-hidden");
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible");
          el.classList.remove("reveal-hidden");
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ────────────────────────────── stats */
function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="stat-item">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* ────────────────────────────── service cards */
function ServiceCard({
  emoji,
  title,
  children,
}: {
  emoji: string;
  title: string;
  children: React.ReactNode;
}) {
  const ref = useReveal();
  return (
    <div ref={ref} className="service-card">
      <div className="card-emoji">{emoji}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-body">{children}</p>
    </div>
  );
}

/* ────────────────────────────── pricing */
function PricingCard({
  name,
  price,
  tagline,
  features,
  cta,
  accent,
}: {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  cta: string;
  accent?: boolean;
}) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`pricing-card ${accent ? "pricing-accent" : ""}`}>
      {accent && <div className="pricing-badge">Most Popular</div>}
      <div className="pricing-name">{name}</div>
      <div className="pricing-price">{price}</div>
      <div className="pricing-tagline">{tagline}</div>
      <ul className="pricing-features">
        {features.map((f, i) => (
          <li key={i}>✓ {f}</li>
        ))}
      </ul>
      <a
        href="https://cal.com/john-mccleskey/15min"
        target="_blank"
        rel="noopener noreferrer"
        className={`btn-lg ${accent ? "btn-primary" : "btn-secondary"}`}
        style={{ width: "100%", display: "block", textAlign: "center" }}
      >
        {cta}
      </a>
    </div>
  );
}

/* ────────────────────────────── main page */
export default function HomePage() {
  const [showLandForm, setShowLandForm] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="nav-brand">
            <img
              src="/stonewave-logo.png"
              alt="StoneWave"
              width={36}
              height={36}
              style={{ borderRadius: 6 }}
            />
            <span>StoneWave</span>
          </a>
          <a
            href="https://cal.com/john-mccleskey/15min"
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
        <div className="hero-video-wrap">
          <video
            ref={videoRef}
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-poster.jpg"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" />
        </div>

        <div className="hero-content">
          <div className="eyebrow">AI Solutions for Small Business</div>
          <h1 className="hero-heading">
            Your business runs on
            <br />
            <span className="gradient-text">autopilot.</span>
          </h1>
          <p className="hero-sub">
            We build AI systems that automate your workflows, eliminate busywork,
            and free you to focus on growth.
          </p>
          <a
            href="https://cal.com/john-mccleskey/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-lg"
          >
            Book a Free Discovery Call →
          </a>
          <p style={{ fontSize: 13, color: "#444", marginTop: 16 }>
            15 minutes. No pitch. Just answers.
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* ── GEOGRAPHY ── */}
      <section className="section geo-section">
        <div ref={useReveal()} className="geo-inner">
          <div className="eyebrow" style={{ textAlign: "center" }>
            Georgia Land Network
          </div>
          <h2 className="section-heading">
            We are actively ingesting land across Georgia
          </h2>
          <p className="section-sub">
            Focusing on secondary and smaller markets where competition is low and
            opportunity is high. We connect sellers directly with qualified buyers in
            our network — no listing fees, no middlemen.
          </p>
          <div className="stat-bar">
            <AnimatedStat value="GA-wide" label="Coverage" />
            <AnimatedStat value="Secondary" label="Markets" />
            <AnimatedStat value="24h" label="Response time" />
            <AnimatedStat value="Direct" label="Buyer matching" />
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── WHAT WE BUILD ── */}
      <section className="section">
        <div className="eyebrow" style={{ textAlign: "center" }>
          What We Build
        </div>
        <h2 className="section-heading">AI that works while you don&apos;t.</h2>
        <div className="card-grid">
          <ServiceCard emoji="⚡" title="Workflow Automation">
            Replace repetitive tasks with AI agents that handle intake, scheduling,
            follow-ups, and reporting — around the clock.
          </ServiceCard>
          <ServiceCard emoji="📊" title="Data Intelligence">
            Turn messy spreadsheets and scattered data into dashboards, scoring
            systems, and automated alerts that drive decisions.
          </ServiceCard>
          <ServiceCard emoji="💬" title="AI Assistants">
            Custom AI assistants trained on your business — answering questions,
            drafting communications, and handling customer interactions.
          </ServiceCard>
          <ServiceCard emoji="🛠" title="Custom Tools">
            Purpose-built software for your exact needs — lead scoring, deal
            tracking, production pipelines, or whatever your business runs on.
          </ServiceCard>
        </div>
      </section>

      <div className="divider" />

      {/* ── PRODUCTS ── */}
      <section className="section">
        <div className="eyebrow" style={{ textAlign: "center" }>
          Built &amp; Running
        </div>
        <h2 className="section-heading">Real systems. Real results.</h2>
        <div className="card-grid two-col">
          {/* DIRTDEALER → inline land submission */}
          <div className="card">
            <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2, color: "#C5A55A", marginBottom: 16 }>
              Real Estate
            </div>
            <h3 className="card-title" style={{ fontSize: 20 }>DirtDealer</h3>
            <p className="card-body">
              AI-powered land deal facilitation — automated parcel scoring, seller
              outreach, and due diligence packaging. We connect motivated sellers
              with qualified buyers in our network.
            </p>
            <button
              onClick={() => setShowLandForm(true)}
              className="btn-primary"
              style={{ marginTop: 20 }}
            >
              Have land to sell? Submit here →
            </button>
          </div>

          {/* LANDLENS */}
          <div className="card">
            <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2, color: "#2D3A4E", marginBottom: 16 }>
              GIS &amp; Analytics
            </div>
            <h3 className="card-title" style={{ fontSize: 20 }>LandLens</h3>
            <p className="card-body">
              Parcel intelligence platform — GIS data scoring, zoning analysis, and
              development opportunity detection across thousands of properties.
            </p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── LAND SUBMISSION MODAL ── */}
      {showLandForm && (
        <div className="modal-backdrop" onClick={() => setShowLandForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <LandSubmissionForm onClose={() => setShowLandForm(false)} />
          </div>
        </div>
      )}

      {/* ── PRICING ── */}
      <section className="section">
        <div className="eyebrow" style={{ textAlign: "center" }>Pricing</div>
        <h2 className="section-heading">Clear pricing. Real deliverables.</h2>
        <div className="pricing-grid">
          <PricingCard
            name="AI Health Check"
            price="$500 – $1,500"
            tagline="1-week audit → 10-page roadmap"
            features={[
              "Full operations audit",
              "Specific tool recommendations",
              "ROI projection per workflow",
              "48-hour results summary",
            ]}
            cta="Book a Health Check →"
          />
          <PricingCard
            name="Workflow Build"
            price="$2,500 – $5,000"
            tagline="One workflow, end-to-end"
            features={[
              "Custom AI agent design",
              "Integration with your stack",
              "Testing + handoff training",
              "30 days free tuning",
            ]}
            cta="Start a Workflow →"
          />
          <PricingCard
            name="Full System"
            price="$8,000 – $15,000"
            tagline="Multi-workflow AI system"
            features={[
              "Dashboard + alerts",
              "Multiple automated workflows",
              "Ongoing optimization",
              "Priority Slack support",
            ]}
            cta="Build My System →"
            accent
          />
        </div>
      </section>

      <div className="divider" />

      {/* ── PROCESS ── */}
      <section className="section">
        <div className="eyebrow" style={{ textAlign: "center" }>Our Process</div>
        <h2 className="section-heading">Discover → Build → Deploy → Optimize</h2>
        <div className="steps">
          {[
            { num: "01", title: "Discover", body: "We audit your operations and identify the highest-leverage automation opportunities." },
            { num: "02", title: "Build", body: "We design and build your AI system — custom agents, workflows, and dashboards." },
            { num: "03", title: "Deploy", body: "We integrate with your tools, train your team, and launch with safeguards." },
            { num: "04", title: "Optimize", body: "We monitor, tune, and improve — every system gets better with time." },
          ].map((s) => (
            <div key={s.num} className="step">
              <div className="step-num">{s.num}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-body">{s.body}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── GUARANTEE ── */}
      <section ref={useReveal()} className="section guarantee-section">
        <div className="eyebrow" style={{ textAlign: "center", color: "#C5A55A" }>
          Our Guarantee
        </div>
        <h2 className="section-heading" style={{ color: "#fff" }>
          If we don&apos;t find 3+ hours of weekly savings, your Health Check is free.
        </h2>
        <div className="guarantee-grid">
          <div className="guarantee-item">
            <div className="guarantee-icon">🔍</div>
            <strong>Health Check Promise</strong>
            <p>If we cannot identify at least 3 hours per week of automatable work, your audit is completely free.</p>
          </div>
          <div className="guarantee-item">
            <div className="guarantee-icon">🛠</div>
            <strong>30 Days Free Tuning</strong>
            <p>Every build includes 30 days of post-launch tuning and bug fixes at no charge.</p>
          </div>
          <div className="guarantee-item">
            <div className="guarantee-icon">📅</div>
            <strong>No Long-Term Contracts</strong>
            <p>Cancel anytime. We earn your business every month — or you walk away.</p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── ABOUT ── */}
      <section className="section" style={{ textAlign: "center" }>
        <div className="eyebrow">About StoneWave</div>
        <h2 className="section-heading">Built by operators, not consultants.</h2>
        <p
          style={{
            fontSize: 17,
            color: "#777",
            maxWidth: 640,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          StoneWave builds and runs AI-powered businesses. We don&apos;t just advise —
          we build the systems ourselves, use them daily, and bring that hands-on
          experience to every client engagement. If it doesn&apos;t save you real time and
          real money, we don&apos;t ship it.
        </p>
      </section>

      <div className="divider" />

      {/* ── FOOTER CTA ── */}
      <section className="footer-cta">
        <h2>Ready to see what AI can do for your business?</h2>
        <p>Let&apos;s talk. 15 minutes, no strings attached.</p>
        <a
          href="https://cal.com/john-mccleskey/15min"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary btn-lg"
        >
          Book Your Free Call →
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} StoneWave. All rights reserved.</p>
      </footer>
    </>
  );
}
