# StoneWave landing redesign: delivery notes

Companion notes for the 2026 rebuild of stonewave.life around the
Provable Outcomes method: Diagnose, Recommend, Prove.

For where this ships and how to verify it, see `docs/deploy.md`.

---

## 1. Assets still needed

The page ships complete without any of these; each one upgrades an
existing slot rather than filling a hole.

| Asset | Slot | Spec | Priority |
| --- | --- | --- | --- |
| Product film (15 to 20 s loop) | Storyboard section, above the pinned sequence or replacing beat 1 as a poster-first video | 16:9, 1080p min, H.264/AV1, sound off, captions burned or as VTT, poster frame exported separately for LCP | High |
| OG share image | `metadata.openGraph.images` | 1200 x 630 PNG, navy field, wordmark plus "Clarity before technology", under 300 KB | High |
| Founder headshot or workspace photo | Optional trust anchor near Guardrails or footer | Warm, natural light, no stock energy | Medium |
| Real retest figures from one anonymized engagement | Swap the "Illustrative scenario" ledger rows for labeled real deltas once a client signs off | Keep the same four-stage structure | Medium |
| Favicon dark-mode variant | `src/app/icon.svg` media query variant | Paper-on-ink already works on light tabs; optional inverse | Low |
| Short client voice quotes (2 to 3 lines) | Could slot between Proof and Deliverables | Only with named attribution; no anonymous praise walls | Low |

## 2. Product film: 15 to 20 second script and shot list

Working title: **The Receipt**. Sound off by default; every beat reads
without audio. Captions carry the voiceover verbatim.

| # | Time | Shot | On-screen text / caption | Notes |
| --- | --- | --- | --- | --- |
| 1 | 0.0 to 2.5 | Macro: a desk of paper chaos, sticky notes, a phone lighting up with "any update?" | "The week disappears into handoffs." | Real desk, shallow depth, warm paper tones. No actors' faces needed |
| 2 | 2.5 to 5.0 | Screen capture: the diagnostic, one plain question visible, cursor picks "One person's phone" | "Twelve minutes of plain questions." | Use the real provableoutcomes.ai/diagnostic UI, no mockups |
| 3 | 5.0 to 8.0 | Slow push on a printed Directional Brief, top finding circled in pencil | "Findings, ranked by leverage." | Physical artifact echoes the site's ledger aesthetic |
| 4 | 8.0 to 11.0 | Split: process-only fix on the left (a taped-up one-page checklist), tool option on the right, hand slides the checklist forward | "Process options rank alongside tools." | Independence beat; nothing branded on the tool side |
| 5 | 11.0 to 14.0 | Screen: draft email titled "Renewal, Hartley" waiting behind an Approve button; a human clicks Approve | "A person signs off. Every time." | The human gate, shown not claimed |
| 6 | 14.0 to 17.5 | The ledger table draws its retest column and green deltas fill in | "Baseline. Retest. Delta." plus small "Illustrative scenario" tag | Mirror the site's proof table motion exactly |
| 7 | 17.5 to 20.0 | Cut to calm: the owner closes the laptop in daylight, StoneWave wordmark, URL | "Know what to improve. Prove it moved. stonewave.life" | End card holds 1.5 s minimum |

Voiceover (optional, 38 words): "Work gets stuck in handoffs. A short
diagnostic finds where. You get findings ranked by leverage, options
that don't depend on buying anything, and a retest that shows what
actually moved. StoneWave. Clarity before technology."

Delivery: master 1080p, a 720p web loop under 4 MB for the hero slot,
and a poster JPEG of shot 6 for LCP. The scroll-pinned storyboard
remains in place as the always-available fallback and the
reduced-motion/no-JS path.

## 3. Visual rhyme with Provable Outcomes and DealControl

What carries across the family, and what stays distinct, so the pages
read as siblings rather than clones:

**Shared (the rhyme)**
- The Provable Outcomes palette is the source key: navy `#071b2d` as
  ink, warm paper `#f7f5ef`, ember orange `#d77125` reserved for the
  one primary action and moments of emphasis, proof green `#39734f`
  only ever on measured results. Green is never decoration.
- Mono uppercase eyebrows and tabular numerals for anything that reads
  as data: the ledger discipline both PO and DealControl trade on.
- Declarative short-sentence voice: "No purchase required." "Nothing
  sends itself."
- Human-gate imagery: drafts waiting behind Approve buttons.

**Distinct (why it is not a clone)**
- StoneWave alone uses the Fraunces editorial serif for display type.
  The products stay in sans; the operating company gets the
  letterpress voice, which positions it as the publisher of record for
  the family's standards.
- Paper-first body with ink bookends (hero, storyboard, final CTA).
  Product surfaces can run darker and denser; the company face stays
  airy, low-density, and calm.
- The double-bezel card and the Outcomes Ledger artifact are
  StoneWave-specific fixtures. Products show live data; the company
  face shows the method.

## 4. QA record

Verified during this build (production build plus Chromium screenshots
at 1440 x 900, 375 x 800, 375 x 667, 360 x 780):

- Wow in 5 seconds: ink hero with animated Outcomes Ledger and staged
  reveal lands in the first viewport, no scroll needed.
- One CTA intent sitewide: every primary button targets
  provableoutcomes.ai/diagnostic; booking a call is always secondary.
- Live links only: provableoutcomes.ai (+/diagnostic), dealcontrol.ai,
  intentrouter.ai, landlens.app, dirtdealer.us, stonewave.life,
  cal.com/john-mccleskey/15min, mailto:ops@stonewave.life. LandLens
  and DirtDealer passed independent liveness verification (active DNS
  on the owner's Vercel account, fresh search index, deployed
  backend); BookBuilder failed verification and stays off the page.
- Reduced motion: pinned storyboard degrades to a static stacked
  storyboard; ledger renders its final state without cycling; reveals
  and magnetic hover disable; a prose alternative of the whole arc is
  always present.
- Mobile: zero horizontal overflow at 360 px; the pinned story fits a
  667 px viewport with vignette and copy fully visible.
- Philosophy on the page: independence (Method lane note, Guardrails
  01), process-first (trust strip, Deliverables 04, Guardrails 02),
  human gate (storyboard beat 07, Guardrails 03 and 04), proof cycle
  (hero ledger, Proof table, Method 03). Every scenario figure carries
  an "Illustrative scenario" label, including a deliberately deferred
  "Replace the CRM" row to show a recommendation against buying.
- No em-dashes in UI copy, no hype vocabulary, no public pricing, no
  invented logos, metrics, or certifications.

## 5. Two sections added after launch

**`OwnerHours` (id `life`), between the proof ledger and Deliverables.**
Names what the week currently costs an owner and commits to counting
hours returned, without promising balance or converting an hour into
money or meaning. Two standing constraints on any edit: nothing in this
section may prescribe a fix, and nothing may add a figure. It sits one
screen below a ledger row that came in under its own projection, so a
promise here would read as a claim the page just disproved. The
concrete human detail lives in the present tense, describing the
current cost, never the future benefit.

**`WhenWeBuild` (id `build`), between Deliverables and the family
grid.** Makes the implementation lane explicit: connecting tools the
client already pays for, building a dashboard or portal, and hosting
the result including on their own domain. Every block carries the
condition that has to hold first, and the fourth block is the
process-only option that beats a build.

Position is load-bearing in both directions. Deliverables closes on
"implementation is optional and scoped separately, and the
recommendations do not change if you never buy it," which is the line
that licenses the build section, so the build section must never move
above it. The family grid immediately after is what makes the
capability credible, so those two stay adjacent.

The build section deliberately does not assert independence a third
time. Method 02 and Guardrail 01 already do that; a third assertion
next to a description of paid work would protest too much. It states
sequence instead. Method's three lanes keep equal billing and one line
each, since that equality is the argument; the only change there is a
small link inside the "We implement" card, which subordinates the new
section to an existing lane rather than letting it read as a fourth.
Neither section is in the nav: a nav entry for the build lane would
present implementation as a standing service line.

Six drafts, six adversarial judges, and one synthesis pass produced
this copy. The judges' most useful finding, present in almost every
draft, was unhedged promised outcomes ("the relay stops", "Saturday
stops being the day you rebuild the week"). On a page whose credibility
is baseline and retest, a flat causal promise is the one failure mode
that costs more than it wins.

## 6. Review record

Second review wave (five specialist reviewers over the code) surfaced
and fixed: pinned-stage clipping on short viewports (the pin now
engages only at 40rem viewport height and above, via GSAP matchMedia;
shorter viewports keep the static storyboard), scene crossfade curves
that dipped too low mid-transition, beat-counter drift against the
scrubbed timeline, crushed ledger cells and stepper labels at 360 px,
mobile menu overflow on short screens, an inherited canonical tag on
/ai, a Twitter card declared without an image (downgraded to summary
until the OG image ships), JSON-LD sameAs misuse (now Brand entries),
a leaked reveal timeout, and two unused dependencies.
