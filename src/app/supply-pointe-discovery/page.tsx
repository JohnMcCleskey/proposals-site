import type { Metadata } from "next";
import CheckoutAcceptance from "./CheckoutAcceptance";
import ProposalChat from "./ProposalChat";
import styles from "./proposal.module.css";

export const metadata: Metadata = {
  title: "Supply Pointe Paid Discovery | StoneWave",
  robots: { index: false, follow: false },
};

const included = [
  "A workflow map for source intake, context, interpretation, validation, review queue, and initial outputs.",
  "Testing against real representative source materials supplied by Supply Pointe.",
  "A working prototype that reads customer emails or PDFs and relevant customer, supplier, pricing, and ledger data.",
  "A structured order draft that preserves the original source for comparison and flags ambiguity rather than silently guessing.",
  "Validation checks for customer or vendor identity, item and quantity, pricing, PO numbering, addresses, and conflicting fields.",
  "A review queue where Brittany reviews the source and proposed output together, corrects exceptions, and approves. Brian retains final approval where required.",
  "Purchase-order and packing-slip drafts as the initial outputs.",
  "A validated workflow, acceptance criteria, and firm implementation scope.",
];

const materialsRequested = [
  "The recorded franchisee walkthrough video referenced during the call.",
  "Relevant customer, supplier, pricing, and ledger Google Sheets, or a representative export.",
  "Five to ten varied order examples, including informal requests, formal POs, shorthand, and an edge case.",
  "Current purchase-order and packing-slip templates with expected field definitions.",
  "Representative QuickBooks screenshots or sandbox/read-only access sufficient to map target records.",
  "A short review session with Brian and, if useful, Brittany to verify workflow and approval logic.",
];

const unknowns = [
  "Which system stays the long-term system of record between the ledger and QuickBooks.",
  "Which fields can be prepared reliably on your real order variations, and where exceptions remain.",
  "Whether the review surface makes errors easier to catch than today's process.",
];

export default async function SupplyPointeDiscoveryPage({
  searchParams,
}: {
  searchParams?: Promise<{ payment?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const cancelled = resolvedSearchParams?.payment === "cancelled";

  return (
    <main className={styles.page}>
      <div className={styles.topline}>
        <span>StoneWave</span>
        <span>Private client proposal</span>
      </div>

      <section className={styles.hero}>
        <p className={styles.meta}>Private proposal for Brian Haverkos · Supply Pointe</p>
        <h1 className="font-display">A working diagnostic for how orders actually move through your shop.</h1>
        <p className={styles.lede}>
          Over 7–10 business days, StoneWave builds and tests a working version of the order flow:
          take in a customer request, pull out the customer, quantities, pricing, and ship-to details,
          then prepare a draft purchase order and packing slip for review. Brittany stays in control
          throughout. Nothing goes to a customer automatically, and this diagnostic does not touch
          QuickBooks or the live inbox.
        </p>
        <div className={styles.heroFooter}>
          <div>
            <span>One-time investment</span>
            <strong>$1,500 USD</strong>
          </div>
          <a href="#supply-pointe-pay">Review the $1,500 diagnostic</a>
        </div>
      </section>

      {cancelled ? (
        <p className={styles.cancelled} role="status">
          Payment was not completed. The proposal remains available for review.
        </p>
      ) : null}

      <div className={styles.contentGrid}>
        <article className={styles.proposal}>
          <section>
            <h2>Purpose</h2>
            <p>
              StoneWave will create and test a working diagnostic for Supply Pointe&apos;s current
              order-processing workflow. The diagnostic is intended to establish whether the workflow
              can be made reliably assistive and review-first before a production build is funded.
            </p>
          </section>

          <section>
            <h2>Included in the paid diagnostic</h2>
            <ul>
              {included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Materials requested after payment</h2>
            <ul>
              {materialsRequested.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Timing and commercial path</h2>
            <p>The paid discovery investment is $1,500 and is expected to take 7–10 business days.</p>
            <p>
              The diagnostic is not a promise that every order can be automated; it tests difficult
              customer-specific variations and defines the smallest production build worth funding.
            </p>
            <p>
              A narrow production MVP is considered only after the diagnostic and is estimated at
              $4,000–$7,500, with final scope set after the diagnostic.
            </p>
            <p>
              Ongoing support is usage plus a 20% service markup for monitoring, model usage,
              maintenance, fixes, and incremental rule improvements.
            </p>
          </section>

          <section>
            <h2>What we do not know yet</h2>
            <ul>
              {unknowns.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Explicit boundaries</h2>
            <p>The proposal does not commit to a live QuickBooks connection during the diagnostic.</p>
            <p>Later possibilities are evaluated only after the diagnostic.</p>
            <p>No commitment is made beyond the written scope or the diagnostic&apos;s validated findings.</p>
          </section>

          <section className={styles.note}>
            <h2>After payment</h2>
            <p>
              Payment starts the 7–10 business days. You get a private upload path. Send the working
              Google Sheets, the walkthrough video, representative order examples, and your invoice and
              PO templates. We map it, show a review-first prototype, and return a bounded
              recommendation for the next release.
            </p>
            <p>This phase does not write to live QuickBooks or send customer messages.</p>
          </section>
        </article>

        <aside className={styles.paymentPanel} id="supply-pointe-pay" aria-label="Accept scope and pay">
          <p className={styles.panelLabel}>Review the $1,500 diagnostic</p>
          <p className={styles.price}>
            $1,500 <span>USD · 7–10 business days</span>
          </p>
          <p>Customer, quantity, pricing, and ship-to drafts. Human review throughout. No live QuickBooks write.</p>
          <CheckoutAcceptance />
          <ProposalChat />
        </aside>
      </div>

      <div className={styles.bottomCta}>
        <p>One working diagnostic. You keep the evidence either way.</p>
        <a className={styles.bottomCtaButton} href="#supply-pointe-pay">
          Back to the $1,500 diagnostic
        </a>
      </div>

      <footer className={styles.footer}>Prepared by StoneWave · Scope version 2026-08-14</footer>
    </main>
  );
}
