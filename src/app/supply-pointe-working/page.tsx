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
  "Human review forever. Nothing emails a customer or vendor.",
  "QuickBooks read: your customer and vendor records (bill-to, ship-to, tax) inform the desk after you approve the connection. Prefill is still a proposal Brittany confirms.",
  "QuickBooks write: nothing creates a PO, bill, invoice, or payment in QuickBooks until you say so at the Activation Gate.",
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
  "Optional Basecamp notify: after Review completed, a to-do on Brian's phone with order context and a link back to the desk. +$50 / month when your Basecamp project is connected. Completing the to-do does not send email or write QuickBooks.",
  "Inbox watching is a named later add-on, not bundled into the first live desk.",
  "Vendor POD / bills as an invoice trigger is in that later watching path. It is not on the sample desk today.",
];

const measure = [
  {
    name: "Minutes per order",
    how: "Stopwatch on your current path (Day 0), then desk timestamps from open to Review completed.",
    now: "Pending — we will not invent hours saved.",
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
            <span>This shop — live desk</span>
            <strong>$6,000 · then $350 / month all-in</strong>
          </div>
          <a href="#discount">List vs founding</a>
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
            <h2>List and founding</h2>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th>Piece</th>
                    <th>List</th>
                    <th>Founding</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Desk, live on real orders</td>
                    <td>$7,500</td>
                    <td>$6,000</td>
                  </tr>
                  <tr>
                    <td>Inbox watching (later)</td>
                    <td>$12,000</td>
                    <td>$7,500</td>
                  </tr>
                  <tr>
                    <td>Both</td>
                    <td>$19,500</td>
                    <td>$13,500</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Founding rate because the prototype already exists on your materials. The
              diagnostic is paid and delivered; it isn&apos;t a credit.
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
                    <td>Hosted private desk, two users, packets, human review, QuickBooks read for customer/vendor/tax, model-assist with confirms when you want it. Payments stay in QuickBooks.</td>
                  </tr>
                  <tr>
                    <td>Inbox watching — later add-on</td>
                    <td>$7,500</td>
                    <td>+$200</td>
                    <td>Inbox watching later. QuickBooks create-after-approve is a Gate item on the live desk, not this add-on. POD/bills trigger lives here. Not built on the sample desk.</td>
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
              Optional Basecamp notify is +$50 / month when connected, not part of the
              $3,000 deposit. This page is for you to review before Wednesday 11:00.
              It is not a contract and not a charge.
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
                Another shop is another desk and another Order Form — separate
                books, inbox, and Gate. Not a split of this $6,000.
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
            <h2>Wednesday 11:00</h2>
            <p>
              Fifteen minutes on this page: the $6,000 desk, QuickBooks read vs write,
              and whether you want the Basecamp ping. Inbox watching stays later.
              Nothing is charged from a link on that call. Stripe stays off until you
              write yes.
            </p>
          </section>
        </article>

        <aside className={styles.paymentPanel} aria-label="Next step">
          <p className={styles.panelLabel}>Not a checkout</p>
          <p className={styles.price}>
            $6,000 <span>this shop · then $350 / mo all-in</span>
          </p>
          <p>
            Review this page before Wednesday 11:00. Stripe stays off until you write
            yes on a record.
          </p>
          <p className={styles.formNote}>
            Unlisted URL · noindex · scope 2026-09-08 · matches the locked terms sheet
          </p>
        </aside>
      </div>

      <footer className={styles.footer}>
        Prepared by StoneWave · Private · Do not index · Scope version 2026-09-08
      </footer>
      <WorkingChat />
    </main>
  );
}
