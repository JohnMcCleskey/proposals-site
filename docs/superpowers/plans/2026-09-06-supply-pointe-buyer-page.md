# Supply Pointe Buyer Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dense Supply Pointe implementation-review page with one clear desk decision, an optional five-step workflow visual, expandable proof details, accurate measurement language, and a concrete Email + QuickBooks invoice-trigger option.

**Architecture:** Keep the existing Next.js route and bounded proposal chat. Move buyer-facing facts into a focused content module so page copy and deterministic chat answers use the same approved terms. Render the business flow as semantic HTML and CSS inside the page; use native `<details>` elements for optional depth, with no client-side diagram library.

**Tech Stack:** Next.js 15.5, React 18, TypeScript, CSS Modules, Vitest.

**Spec:** `/Users/OPS/crm/client_materials/supply-pointe/diagnostic/docs/superpowers/specs/2026-09-06-supply-pointe-hosted-desk-and-outcomes-design.md`

## Global Constraints

- Work only in `/Users/OPS/proposals-site`; preserve unrelated untracked Scotland Wright work.
- Do not deploy or change the public page until John reviews the complete diff and visual preview.
- Keep the route unlisted and `noindex`.
- One next decision: the $6,000 private live desk; $350 per month starts at the signed Activation Gate.
- The $1,500 diagnostic is completed work, not a deposit or credit.
- Call the selectable expansion the **Email + QuickBooks invoice-trigger option**; do not keep calling it “later.”
- The primary KPI ends at `Review completed / ready for Brian`, not Brian's later approval.
- Never claim measured time, cost, error reduction, or capacity until qualified baseline and retest windows exist.
- Customer invoice preparation follows a signed packing slip plus vendor invoice. Customer payment status gives Brian the green light to pay the vendor. The desk never pays the vendor.
- Use native semantic HTML, keyboard-accessible controls, and reduced-motion-safe CSS. No diagram dependency.
- Update the page source pack and deterministic chat answers in the same change; stale bounded chat is a release blocker.

## File Structure

- `src/lib/supply-pointe-working-content.ts`: approved commercial terms, five-step flow, expandable proof sections, measurement rows, and deterministic facts used by page and chat.
- `src/lib/supply-pointe-working-content.test.ts`: structural and truth-boundary tests for the approved content.
- `src/app/supply-pointe-working/page.tsx`: simplified server-rendered buyer page.
- `src/app/supply-pointe-discovery/proposal.module.css`: semantic flowchart, detail panels, and responsive treatment using the existing visual system.
- `src/lib/supply-pointe-working-chat.ts`: revised approved source pack and direct answers.
- `src/lib/supply-pointe-working-chat.test.ts`: deterministic answer and stale-language tests.

---

### Task 1: Approved content contract

**Files:**
- Create: `src/lib/supply-pointe-working-content.ts`
- Create: `src/lib/supply-pointe-working-content.test.ts`

**Interfaces:**
- Produces: `WORKING_SCOPE_VERSION`, `deskOffer`, `businessFlow`, `supportTerms`, `invoiceTriggerOption`, `measurementRows`, and `proofDetails`.
- Each `businessFlow` row has `{ id: string; title: string; summary: string; gate?: string }`.
- Each `proofDetails` row has `{ id: string; summary: string; body: readonly string[] }`.

- [ ] **Step 1: Write the failing content tests**

Create tests that import the new module and assert:

```ts
expect(WORKING_SCOPE_VERSION).toBe("2026-09-06");
expect(deskOffer.implementation).toBe("$6,000");
expect(deskOffer.monthly).toBe("$350 / month");
expect(deskOffer.monthlyStarts).toContain("signed Activation Gate");
expect(supportTerms).toContain("Up to two hours each month of desk fixes or rule tuning");
expect(businessFlow).toHaveLength(5);
expect(businessFlow.map((step) => step.title)).toEqual([
  "Customer PO arrives",
  "Brittany reviews one order record",
  "Vendor PO and packing slip stay separate",
  "Vendor proofs tee up the customer invoice",
  "Customer payment clears vendor payment",
]);
expect(invoiceTriggerOption.quickBooksCreateGate).toContain("Brian approves");
expect(invoiceTriggerOption.vendorPayment).toContain("never pays the vendor");
expect(measurementRows[0].endpoint).toBe("Review completed / ready for Brian");
```

Add a joined-text assertion that rejects `human-approved draft`, `50% deposit`, `later add-on`, `Google Analytics theater`, and any claim that the desk pays the vendor.

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- --run src/lib/supply-pointe-working-content.test.ts`

Expected: FAIL because `supply-pointe-working-content.ts` does not exist.

- [ ] **Step 3: Implement the content module**

Use `as const` data objects. Include these exact commercial facts:

```ts
export const WORKING_SCOPE_VERSION = "2026-09-06";

export const deskOffer = {
  implementation: "$6,000",
  payment: "50% on the signed Order Form; 50% at the signed Activation Gate.",
  monthly: "$350 / month",
  monthlyStarts: "Starts at the signed Activation Gate.",
  diagnostic: "The $1,500 diagnostic is paid and delivered. It is not a credit against the desk.",
} as const;
```

Set the five-step flow to the titles in Step 1. Step four must say that the signed packing slip confirms delivery, the vendor invoice records what Supply Pointe owes, and both are required before the customer invoice is proposed. Step five must say QuickBooks payment status is the green light for Brian to pay the vendor, while the desk does not move money.

`supportTerms` must list private hosting, monitoring and visible failures, backups and recovery, approved model usage inside a written band, up to two hours per month of fixes or rule tuning, next-business-day acknowledgment, and continuing private measurement.

`invoiceTriggerOption` must name approved-mailbox intake, document matching, Brian's create gate, idempotent QuickBooks creation, paid-status readback, and the vendor-payment prohibition.

- [ ] **Step 4: Run the test and verify GREEN**

Run: `npm test -- --run src/lib/supply-pointe-working-content.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/supply-pointe-working-content.ts src/lib/supply-pointe-working-content.test.ts
git commit -m "test: lock Supply Pointe buyer-page facts"
```

---

### Task 2: Simple first view and optional workflow visual

**Files:**
- Modify: `src/app/supply-pointe-working/page.tsx`
- Modify: `src/app/supply-pointe-discovery/proposal.module.css`
- Test: `src/lib/supply-pointe-working-content.test.ts`

**Interfaces:**
- Consumes the content exports from Task 1.
- Produces semantic page landmarks with `#workflow`, `#desk`, `#email-qbo`, `#measurement`, and `#activation-gate` anchors.

- [ ] **Step 1: Extend the failing structural test**

Read `page.tsx` as text in the content test and assert it imports `businessFlow`, renders `<ol`, uses `<details`, includes `id="workflow"`, and does not contain the old sections `List and founding`, `Two pieces (additive, not a menu)`, or `Further opportunities`.

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- --run src/lib/supply-pointe-working-content.test.ts`

Expected: FAIL because the old page still contains dense tables and no optional flow section.

- [ ] **Step 3: Rewrite the page hierarchy**

Keep the existing metadata, topline, sticky next-step panel, footer, and `WorkingChat`. Replace the body with:

1. Hero: one promise, one price, one sentence on human control.
2. `Where things stand`: prototype truth in no more than two short paragraphs.
3. `How one order moves`: the five-step ordered flow with an intro link/button labeled `See how the full order and payment flow works`.
4. `What the live desk includes`: base desk and the bounded $350 service terms.
5. `Email + QuickBooks invoice-trigger option`: real option, its concrete trigger chain, and separate-selection boundary.
6. `Measurement rides with the desk`: primary KPI, pending state, and first two included windows.
7. `Activation Gate`: concise checklist.
8. Native details for `Why these triggers matter`, `What QuickBooks can and cannot do`, `How the report earns a claim`, `Data and approval controls`, and `Full pricing context`.

Do not expose a checkout or acceptance button. Replace “Tuesday” with a date-neutral `Next decision` block because the page must not go stale.

- [ ] **Step 4: Add flowchart and details styles**

Add focused CSS classes:

```css
.flowList { list-style:none; display:grid; gap:0; margin:24px 0 0; padding:0; }
.flowStep { display:grid; grid-template-columns:44px minmax(0,1fr); gap:16px; position:relative; padding:0 0 26px; }
.flowStep:not(:last-child)::after { content:""; position:absolute; left:21px; top:42px; bottom:4px; border-left:1px solid rgba(7,27,45,.24); }
.flowNumber { display:grid; place-items:center; width:42px; height:42px; border:1px solid rgba(7,27,45,.22); border-radius:50%; background:var(--paper-bright); color:var(--ember); font-family:var(--font-geist-mono),monospace; }
.proofDetails { border-top:1px solid rgba(7,27,45,.16); }
.proofDetails details { border-bottom:1px solid rgba(7,27,45,.16); }
.proofDetails summary { cursor:pointer; padding:18px 34px 18px 0; font-weight:600; list-style:none; position:relative; }
.proofDetails summary::after { content:"+"; position:absolute; right:4px; }
.proofDetails details[open] summary::after { content:"−"; }
.proofBody { padding:0 0 18px; color:rgba(7,27,45,.76); }
```

Add `summary:focus-visible` to the existing focus ring selectors. Keep all content readable without JavaScript. On mobile, retain the vertical line and reduce the number column to 36px.

- [ ] **Step 5: Run tests and build**

Run:

```bash
npm test -- --run src/lib/supply-pointe-working-content.test.ts
npm run build
```

Expected: test PASS; Next build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/app/supply-pointe-working/page.tsx src/app/supply-pointe-discovery/proposal.module.css src/lib/supply-pointe-working-content.test.ts
git commit -m "feat: simplify Supply Pointe decision page with optional workflow proof"
```

---

### Task 3: Bring bounded proposal chat onto the approved story

**Files:**
- Modify: `src/lib/supply-pointe-working-chat.ts`
- Modify: `src/lib/supply-pointe-working-chat.test.ts`

**Interfaces:**
- Consumes approved facts from `supply-pointe-working-content.ts` where practical.
- Produces deterministic answers for pricing, workflow, email/QuickBooks triggers, measurement, human control, support, and out-of-scope questions.

- [ ] **Step 1: Write failing deterministic-answer tests**

Add assertions for:

```ts
expect(getDirectWorkingAnswer("When does the customer invoice get created?"))
  .toContain("signed packing slip and vendor invoice");
expect(getDirectWorkingAnswer("Can the desk pay the vendor?"))
  .toContain("does not pay the vendor");
expect(getDirectWorkingAnswer("What does the $350 include?"))
  .toContain("two hours");
expect(getDirectWorkingAnswer("Where does the timer stop?"))
  .toContain("ready for Brian");
```

Assert the system instruction does not contain `not built yet`, `Watching later`, `50% deposit`, or `human-approved draft`.

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- --run src/lib/supply-pointe-working-chat.test.ts`

Expected: FAIL on stale terms and missing trigger answers.

- [ ] **Step 3: Update source pack and direct answers**

Set `Scope version: 2026-09-06`. Replace the old tier narrative with one desk decision plus the selectable Email + QuickBooks invoice-trigger option. Add source headings for `Supply Pointe business flow`, `Email + QuickBooks invoice-trigger option`, `Monthly service`, and `Measurement contract`.

Update the primary KPI answer to `operator opens the order to Review completed / ready for Brian`. State that Brian's approval delay is separate.

Add deterministic regex routes for invoice creation, vendor payment, monthly support, and timer endpoint before the broad QuickBooks/human-control route.

- [ ] **Step 4: Run all chat tests**

Run: `npm test -- --run src/lib/supply-pointe-working-chat.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/supply-pointe-working-chat.ts src/lib/supply-pointe-working-chat.test.ts
git commit -m "fix: align Supply Pointe proposal guide with approved workflow"
```

---

### Task 4: Visual, accessibility, and truth review before publish approval

**Files:**
- Modify only if a verified defect appears in the files from Tasks 1–3.
- Create: `docs/reviews/supply-pointe-working-2026-09-06.md`

**Interfaces:**
- Produces a review artifact with exact URLs, screenshots, viewport sizes, test results, and unresolved findings.

- [ ] **Step 1: Start the site locally**

Run: `npm run dev` in a tracked background process. Verify `/supply-pointe-working` returns 200 before opening it.

- [ ] **Step 2: Inspect desktop and mobile**

Use a real browser at 1440×900 and 390×844. Check:

- the first viewport states the one decision without a second product pitch;
- the five steps read in the correct order;
- every `<details>` panel opens by mouse and keyboard;
- the sticky panel does not cover content;
- the flow remains legible at mobile width;
- no stale Tuesday date or repeated “later” language remains; and
- the page remains `noindex`.

Capture both screenshots to `docs/reviews/assets/`.

- [ ] **Step 3: Probe the bounded chat**

Ask one question for each deterministic lane and one out-of-scope question. Record the exact answers. Confirm each supported answer ends in a valid `Source:` marker and no answer expands scope.

- [ ] **Step 4: Run the release checks**

Run:

```bash
npm test
npm run build
```

Expected: all Vitest tests pass; build succeeds.

- [ ] **Step 5: Write the review artifact**

Record commit, test counts, build result, screenshot paths, chat probes, and any open issue. End with `Publish status: awaiting John's explicit approval`.

- [ ] **Step 6: Commit the review evidence**

```bash
git add docs/reviews
git commit -m "test: review Supply Pointe buyer page before publish"
```

Stop. Show John the complete diff and screenshots. Do not run a production deployment without his explicit approval.
