"use client";

/**
 * The showpiece: a walkthrough of the IntentRouter pipeline running on
 * sample data. Everything on screen is illustrative — the goals, the
 * evidence, the figures — but the *shape* is the real product: decompose,
 * cite, verify adversarially, drop what fails, seal what survives.
 *
 * The refuted claim is deliberate. A demo where the machine is always right
 * is a demo nobody should believe.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Verdict = "pending" | "verified" | "refuted";

type Claim = {
  role: string;
  text: string;
  evidence: string;
  verdict: Exclude<Verdict, "pending">;
  /** Why the Guardian ruled the way it did. */
  ruling: string;
};

type Scenario = {
  id: string;
  chip: string;
  goal: string;
  scope: string;
  roles: string[];
  claims: Claim[];
  outcome: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "billing",
    chip: "Recover billing leakage",
    goal: "Find money we are losing in our billing and tell me how to get it back.",
    scope: "Read-only: 14 months of invoice + contract exports. No write access.",
    roles: ["Treasury", "Compliance", "Deals"],
    claims: [
      {
        role: "Treasury",
        text: "312 invoices billed below the contracted rate card.",
        evidence: "invoices_2025.csv rows 1,004–1,316 × msa_v4.pdf §4.2",
        verdict: "verified",
        ruling: "Rate on each cited row is strictly below the §4.2 schedule.",
      },
      {
        role: "Compliance",
        text: "Annual CPI escalator was never applied after renewal.",
        evidence: "msa_v4.pdf §9.1 × invoice history 2025-04 → 2026-07",
        verdict: "verified",
        ruling: "Escalator clause present; no rate change observed post-renewal.",
      },
      {
        role: "Deals",
        text: "Two accounts are silently out of contract entirely.",
        evidence: "crm_accounts.csv × signed_agreements/",
        verdict: "refuted",
        ruling:
          "Both agreements exist as countersigned PDFs — the CRM field is stale, not the contract. Claim dropped before it reached the brief.",
      },
      {
        role: "Treasury",
        text: "Recoverable within the standard lookback window, net of credits.",
        evidence: "reconciliation worksheet, derived from the two verified findings",
        verdict: "verified",
        ruling: "Arithmetic re-derived independently from cited source rows.",
      },
    ],
    outcome:
      "3 verified findings, 1 refuted and discarded. The brief ships with the 3 — each one clickable back to its source row.",
  },
  {
    id: "parcels",
    chip: "Score a county of parcels",
    goal: "Which parcels in this county are actually developable this year?",
    scope: "Read-only: county GIS export, zoning overlays, utility service maps.",
    roles: ["Intelligence", "Compliance", "Deals"],
    claims: [
      {
        role: "Intelligence",
        text: "4,180 parcels pass acreage, slope, and road-frontage screens.",
        evidence: "county_parcels.gpkg × USGS 3DEP slope raster",
        verdict: "verified",
        ruling: "Screen re-run on the cited layers; count reproduces exactly.",
      },
      {
        role: "Compliance",
        text: "1,344 of those sit inside overlays that block the intended use.",
        evidence: "zoning_overlays.shp × county ordinance §7 (2026 revision)",
        verdict: "verified",
        ruling: "Overlay intersection confirmed geometrically, parcel by parcel.",
      },
      {
        role: "Intelligence",
        text: "Remaining set has confirmed sewer access at the parcel line.",
        evidence: "utility_service.shp",
        verdict: "refuted",
        ruling:
          "Layer encodes service *district*, not service *line*. Cannot support a parcel-level claim. Downgraded to 'unknown — requires field check.'",
      },
      {
        role: "Deals",
        text: "412 parcels clear every screen and have an identifiable owner of record.",
        evidence: "filtered set × tax_assessor_owners.csv",
        verdict: "verified",
        ruling: "Join key coverage checked; no orphaned or duplicate owner rows.",
      },
    ],
    outcome:
      "412 actionable parcels, one honest 'we don't know yet.' The unknown is on the front page of the brief, not buried.",
  },
  {
    id: "pathway",
    chip: "Map a regulatory pathway",
    goal: "What is the fastest defensible regulatory path to market for this device?",
    scope: "Read-only: product spec, predicate research, public regulatory corpus.",
    roles: ["Compliance", "Intelligence", "Crisis"],
    claims: [
      {
        role: "Compliance",
        text: "Two viable predicate devices share the intended-use statement.",
        evidence: "510(k) database records K23xxxx, K24xxxx",
        verdict: "verified",
        ruling: "Intended-use language compared token by token against the spec.",
      },
      {
        role: "Intelligence",
        text: "One predicate carries a design-control deficiency in its history.",
        evidence: "public inspection record, cited by date",
        verdict: "verified",
        ruling: "Record retrieved and quoted; deficiency text matches the claim.",
      },
      {
        role: "Crisis",
        text: "Choosing that predicate would add review time.",
        evidence: "analyst inference",
        verdict: "refuted",
        ruling:
          "No cited source. Plausible, widely believed, and unsupported — so it does not ship as a finding. It ships as a flagged open question.",
      },
      {
        role: "Compliance",
        text: "Cleaner predicate supports the pathway without a new clinical study.",
        evidence: "guidance document §5 × product spec §2.3",
        verdict: "verified",
        ruling: "Each spec element mapped to a guidance criterion; all satisfied.",
      },
    ],
    outcome:
      "A cited pathway plus an explicit list of what remains unproven. Decision support — a human still signs.",
  },
];

/** FNV-1a. Real digest of the real text on screen, not a random string. */
function digest(input: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  const a = h.toString(16).padStart(8, "0");
  let g = 0x811c9dc5 ^ h;
  for (let i = input.length - 1; i >= 0; i -= 1) {
    g ^= input.charCodeAt(i);
    g = Math.imul(g, 0x01000193) >>> 0;
  }
  return `${a}${g.toString(16).padStart(8, "0")}`;
}

type Stage =
  | { kind: "idle" }
  | { kind: "parsing" }
  | { kind: "routing"; rolesShown: number }
  | { kind: "claiming"; claimsShown: number }
  | { kind: "verifying"; index: number }
  | { kind: "sealed" };

export default function VerificationDemo() {
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);
  const [stage, setStage] = useState<Stage>({ kind: "idle" });
  const [verdicts, setVerdicts] = useState<Verdict[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const scenario = useMemo(
    () => SCENARIOS.find((s) => s.id === scenarioId) ?? SCENARIOS[0],
    [scenarioId]
  );

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const run = useCallback(
    (s: Scenario) => {
      clearTimers();
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      setVerdicts(s.claims.map(() => "pending"));

      if (reduced) {
        setStage({ kind: "sealed" });
        setVerdicts(s.claims.map((c) => c.verdict));
        return;
      }

      const at = (ms: number, fn: () => void) => {
        timers.current.push(setTimeout(fn, ms));
      };

      let t = 0;
      setStage({ kind: "parsing" });

      t += 700;
      s.roles.forEach((_, i) => {
        at(t + i * 260, () =>
          setStage({ kind: "routing", rolesShown: i + 1 })
        );
      });
      t += s.roles.length * 260 + 350;

      s.claims.forEach((_, i) => {
        at(t + i * 420, () =>
          setStage({ kind: "claiming", claimsShown: i + 1 })
        );
      });
      t += s.claims.length * 420 + 400;

      s.claims.forEach((claim, i) => {
        at(t + i * 640, () => {
          setStage({ kind: "verifying", index: i });
          setVerdicts((prev) => {
            const next = [...prev];
            next[i] = claim.verdict;
            return next;
          });
        });
      });
      t += s.claims.length * 640 + 500;

      at(t, () => setStage({ kind: "sealed" }));
    },
    [clearTimers]
  );

  const running = stage.kind !== "idle" && stage.kind !== "sealed";

  const rolesShown =
    stage.kind === "idle"
      ? 0
      : stage.kind === "parsing"
      ? 0
      : stage.kind === "routing"
      ? stage.rolesShown
      : scenario.roles.length;

  const claimsShown =
    stage.kind === "claiming"
      ? stage.claimsShown
      : stage.kind === "verifying" || stage.kind === "sealed"
      ? scenario.claims.length
      : 0;

  const verifiedClaims = scenario.claims.filter((c, i) =>
    stage.kind === "sealed" ? c.verdict === "verified" : verdicts[i] === "verified"
  );

  const sealHash = digest(
    scenario.goal + verifiedClaims.map((c) => c.text + c.evidence).join("|")
  );

  return (
    <div className="demo">
      <div className="demo-chrome">
        <span className="demo-dot" />
        <span className="demo-dot" />
        <span className="demo-dot" />
        <span className="demo-chrome-label">
          intentrouter · pipeline walkthrough
        </span>
        <span className={`demo-live ${running ? "is-running" : ""}`}>
          {running ? "RUNNING" : stage.kind === "sealed" ? "SEALED" : "IDLE"}
        </span>
      </div>

      <div className="demo-body">
        <div className="demo-goalbar">
          <span className="demo-label">Pick a goal</span>
          <div className="demo-chips">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`demo-chip ${s.id === scenarioId ? "is-active" : ""}`}
                onClick={() => {
                  clearTimers();
                  setScenarioId(s.id);
                  setStage({ kind: "idle" });
                  setVerdicts([]);
                }}
              >
                {s.chip}
              </button>
            ))}
          </div>
        </div>

        <div className="demo-prompt">
          <span className="demo-caret">›</span>
          <span>{scenario.goal}</span>
        </div>

        <button
          type="button"
          className="btn-primary demo-run"
          onClick={() => run(scenario)}
          disabled={running}
        >
          {running
            ? "Running…"
            : stage.kind === "sealed"
            ? "Run it again ↻"
            : "Run the pipeline →"}
        </button>

        {stage.kind !== "idle" && (
          <div className="demo-stream">
            <Line active label="scope" tone="muted">
              {scenario.scope}
            </Line>

            {rolesShown > 0 && (
              <div className="demo-roles">
                <span className="demo-label">Sovereign Roles engaged</span>
                <div className="demo-role-pills">
                  {scenario.roles.slice(0, rolesShown).map((r) => (
                    <span key={r} className="demo-role-pill">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {claimsShown > 0 && (
              <div className="demo-claims">
                <span className="demo-label">
                  Claims · each one must survive the Guardian
                </span>
                {scenario.claims.slice(0, claimsShown).map((claim, i) => {
                  const v = verdicts[i] ?? "pending";
                  return (
                    <div key={claim.text} className={`demo-claim v-${v}`}>
                      <div className="demo-claim-head">
                        <span className="demo-claim-role">{claim.role}</span>
                        <span className={`demo-verdict v-${v}`}>
                          {v === "pending"
                            ? "⋯ awaiting verification"
                            : v === "verified"
                            ? "✓ verified"
                            : "✕ refuted — dropped"}
                        </span>
                      </div>
                      <p className="demo-claim-text">{claim.text}</p>
                      <p className="demo-evidence">
                        <span>evidence</span> {claim.evidence}
                      </p>
                      {v !== "pending" && (
                        <p className="demo-ruling">
                          <span>guardian</span> {claim.ruling}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {stage.kind === "sealed" && (
              <div className="demo-seal">
                <div className="demo-seal-row">
                  <span className="demo-label">State Store · append-only</span>
                  <code className="demo-hash">{sealHash}</code>
                </div>
                <p className="demo-outcome">{scenario.outcome}</p>
                <a
                  className="btn-primary"
                  href="https://portal.intentrouter.ai/intake"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Run this on your own data — free assessment →
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="demo-disclaimer">
        Illustrative walkthrough on sample data. The goals, evidence and figures
        above are examples — the decomposition, citation, adversarial
        verification and append-only seal are how the production pipeline
        actually behaves, refusals included.
      </p>
    </div>
  );
}

function Line({
  label,
  children,
  tone,
  active,
}: {
  label: string;
  children: React.ReactNode;
  tone?: "muted";
  active?: boolean;
}) {
  return (
    <div className={`demo-line ${tone ?? ""} ${active ? "is-active" : ""}`}>
      <span className="demo-label">{label}</span>
      <span>{children}</span>
    </div>
  );
}
