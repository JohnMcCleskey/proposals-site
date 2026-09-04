import type { Metadata } from "next";
import WorkingChat from "./WorkingChat";
import styles from "../supply-pointe-discovery/proposal.module.css";

export const metadata: Metadata = {
  title: "Supply Pointe hosted desk | StoneWave",
  robots: { index: false, follow: false },
};

const install = [
  "Named users for Brian and your admin (the shared sample code does not go live).",
  "The review desk on your orders: intake, source beside draft, mill PO and packing slip packets.",
  "Human review forever. Nothing emails a customer or vendor. Nothing writes QuickBooks until you say so at the Activation Gate.",
  "Model-assisted fill-from-source with confirms, on your accounts once live — or the desk runs manual-only if you prefer.",
];

const host = [
  "Private hosted desk, not a public app store listing.",
  "Backups and a dated restore drill before live customer files.",
  "Security headers and the known sample-desk holes closed before the Gate (edits across restart, approval trail, XSS).",
  "Monthly all-in: hosting and model usage inside the fee. No surprise pass-through. Volume band in the Order Form.",
];

const maintain = [
  "Fixes, monitoring, and incremental rule improvements inside the monthly.",
  "Cancel any time on 30 days' notice after the Gate.",
  "Inbox watching is a named later add-on, not bundled into the first live desk.",
  "Vendor POD / bills as an invoice trigger is in that later watching path — it is not on the sample desk today.",
];

const measure = [
  {
    name: "Minutes per order",
    how: "Stopwatch on your current path (Day 0), then desk timestamps from open to Review completed.",
    now: "Pending — collect on or before Tuesday.",
  },
  {
    name: "Fields re-keyed",
    how: "Count on two normal orders now; same count on the desk.",
    now: "Pending.",
  },
  {
    name: "Corrections to proposed lines",
    how: "Confirms vs edits once model-assist is live.",
    now: "Not started until live orders.",
  },
  {
    name: "Late billing surprises",
    how: "30-day incident log after the Gate. The 40-day anecdote is not a rate.",
    now: "Anecdote only.",
  },
];

export default function SupplyPointeWorkingPage() {
  return (
    <main className={styles.page}>
      <div className={styles.topline}>
        <span>StoneWave</span>
        <span>Private client review</span>
      </div>

      <section className={styles.hero}>
        <p className={styles.meta}>Private review for Brian Haverkos · Supply Pointe</p>
        <h1 className="font-display">What we would install, host, and keep running.</h1>
        <p className={styles.lede}>
          The $1,500 diagnostic is paid. The sample desk is already in your admin&apos;s hands
          on sample data. This page is the next decision: a hosted review-first order desk
          that StoneWave installs, hosts, and maintains — with you still approving anything
          that commits the company.
        </p>
        <div className={styles.heroFooter}>
          <div>
            <span>Founding rate (this shop already has a prototype)</span>
            <strong>$6,000 instead of $7,500 list</strong>
          </div>
          <a href="#discount">See the credit</a>
        </div>
      </section>

      <div className={styles.contentGrid}>
        <article className={styles.proposal}>
          <section>
            <h2>Where things stand</h2>
            <p>
              Six surfaces exist as a working prototype: intake, interpretation, PO draft,
              packing slip, audit/approve, ledger view. Hosted sample desk. Nothing sends.
              Nothing writes QuickBooks. Sample book, not your live customer list.
            </p>
            <p>
              Your admin&apos;s first pass: the ledger plus email plus QuickBooks feeling
              connected is the point. Vendor POD / bills as the invoice trigger is a later
              step, not a sample-desk feature.
            </p>
            <p>
              <a href="https://www.stonewave.life/supply-pointe-discovery">
                Original paid discovery proposal
              </a>
              {" · "}
              sample desk stays on the private link you already have (not repeated here).
            </p>
          </section>

          <section>
            <h2>Install</h2>
            <ul>
              {install.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Host</h2>
            <ul>
              {host.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Maintain</h2>
            <ul>
              {maintain.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="discount">
            <h2>Why the founding rate</h2>
            <p>
              This desk was prototyped on your materials in the $1,500 diagnostic. The
              founding numbers credit that work. They are not a public coupon.
            </p>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th>Piece</th>
                    <th>List</th>
                    <th>Founding</th>
                    <th>Credit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Desk, live on real orders</td>
                    <td>$7,500</td>
                    <td>$6,000</td>
                    <td>$1,500 — the diagnostic already built the prototype</td>
                  </tr>
                  <tr>
                    <td>Inbox watching (later)</td>
                    <td>$12,000</td>
                    <td>$7,500</td>
                    <td>$4,500 if you add it after the desk is comfortable</td>
                  </tr>
                  <tr>
                    <td>Both</td>
                    <td>~$19,500</td>
                    <td>$13,500</td>
                    <td>Expected landing is still the $6,000 desk first</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2>Proposed tools we would use to host this</h2>
            <ul>
              <li>
                <strong>Railway</strong> — the long-running order desk (same class as the
                sample host you already used).
              </li>
              <li>
                <strong>Vercel / stonewave.life</strong> — this private review page only.
              </li>
              <li>
                <strong>Models</strong> — Claude as the trust path, with OpenAI and Ollama
                cloud as fallbacks, on Supply Pointe-owned keys after you approve processors
                in writing.
              </li>
              <li>
                <strong>QuickBooks</strong> — create only after you approve, and only after
                the Activation Gate.
              </li>
              <li>
                <strong>Your email</strong> — stays yours. Watching is the later add-on.
              </li>
            </ul>
            <p>
              We do not inherit a vendor&apos;s SOC 2. Cloud encryption is not StoneWave
              bank-grade. The Gate is the honesty check before live customer files.
            </p>
          </section>

          <section id="paths">
            <h2>Two pieces (additive, not a menu)</h2>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th>Piece</th>
                    <th>Founding</th>
                    <th>Monthly all-in</th>
                    <th>Includes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>The desk, live on real orders</td>
                    <td>$6,000</td>
                    <td>$350</td>
                    <td>Hosted private desk, two users, packets, human review, model-assist with confirms when you want it. Payments stay in QuickBooks.</td>
                  </tr>
                  <tr>
                    <td>Inbox watching — later add-on</td>
                    <td>$7,500</td>
                    <td>+$200</td>
                    <td>Watching + QuickBooks create only after Brian approves. POD/bills trigger lives here. Not built on the sample desk.</td>
                  </tr>
                  <tr>
                    <td>Both</td>
                    <td>$13,500</td>
                    <td>$550</td>
                    <td>Expected landing is the $6,000 desk first. Watching after that flow is comfortable.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              50% deposit / 50% at a signed Activation Gate. Monthly starts at the Gate.
              This page is a preference to refine on Tuesday — not a contract and not a
              charge.
            </p>
          </section>

          <section>
            <h2>Activation Gate (before live customer orders)</h2>
            <ul>
              <li>Named users instead of a shared sample code</li>
              <li>Approval trail (who / when / snapshot)</li>
              <li>Edits survive restart</li>
              <li>Backup + restore drill dated</li>
              <li>Known security holes closed</li>
              <li>Your written yes on data classes and model processors</li>
            </ul>
          </section>

          <section>
            <h2>Provable Outcomes — measurement, not a widget</h2>
            <p>
              If we host the desk, measurement rides along as the spine — not a second
              product you log time into every week. Default KPI: minutes from a messy
              order opened to a human-approved draft.
            </p>
            <p>
              Formula, when both numbers exist: (baseline minutes − desk minutes) ×
              approved volume in the window. Until Day 0 baseline is on file, the
              dashboard shows <strong>pending</strong>. We will not invent hours saved.
            </p>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th>Measure</th>
                    <th>How</th>
                    <th>Now</th>
                  </tr>
                </thead>
                <tbody>
                  {measure.map((row) => (
                    <tr key={row.name}>
                      <td>{row.name}</td>
                      <td>{row.how}</td>
                      <td>{row.now}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              After the Gate, the hosted desk can show a private measurement tab:
              orders touched, drafts approved, still waiting, and — only after
              baseline — minutes. No Google Analytics theater. No industry averages.
            </p>
          </section>

          <section>
            <h2>Further opportunities (hypotheses, not results)</h2>
            <p>
              Once the order KPI is live, the same measurement tab can surface
              <em> ideas</em> — not promises. Each idea needs its own baseline
              before any extra-value number is shown. Until then the line stays
              &quot;not measured.&quot;
            </p>
            <ul>
              <li>
                Inbox watching / vendor POD as invoice trigger — named add-on,
                not in the $6,000 desk.
              </li>
              <li>
                Extra users or locations — more seats on the same engine, not a
                second product.
              </li>
              <li>
                New market capabilities (customer acquisition, meeting
                scheduling, outbound) — only if you name that pain after the
                order desk is boring. Separately scoped. This chat will say so
                rather than invent a projection.
              </li>
            </ul>
            <p>
              Use the question button on this page to ask those &quot;could this
              also…&quot; questions. Answers stay inside this review. John
              confirms anything that would change scope or price.
            </p>
          </section>

          <section className={styles.note}>
            <h2>Tuesday</h2>
            <p>
              Walk the sample desk honestly. Put real timings next to the current path
              if we have them. Leave with one clear next step on the $6,000 desk
              versus waiting. Nothing is charged from a link on that call.
            </p>
          </section>
        </article>

        <aside className={styles.paymentPanel} aria-label="Next step">
          <p className={styles.panelLabel}>Not a checkout</p>
          <p className={styles.price}>
            $6,000 <span>founding · $7,500 list · then $350 / mo all-in</span>
          </p>
          <p>
            Review this page. Tuesday we pick a path. Stripe stays off until you write
            yes on a record.
          </p>
          <p className={styles.formNote}>
            Unlisted URL · noindex · scope 2026-09-04 · matches the Sep 3 terms sheet
          </p>
        </aside>
      </div>

      <footer className={styles.footer}>
        Prepared by StoneWave · Private · Do not index · Scope version 2026-09-04
      </footer>
      <WorkingChat />
    </main>
  );
}
