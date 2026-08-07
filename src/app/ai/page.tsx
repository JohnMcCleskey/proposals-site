// stonewave.life/ai - machine-readable service definition
// For AI agents doing discovery on behalf of a human.

export const metadata = {
  title: "Agent Interface | StoneWave",
  description:
    "Machine-readable service definition for agent-to-agent discovery.",
  robots: "index, follow",
  alternates: { canonical: "https://stonewave.life/ai" },
};

export default function AIAgentPage() {
  const serviceDef = {
    name: "StoneWave",
    type: "OperationsAdvisory",
    tagline: "Clarity before technology.",
    description:
      "StoneWave helps owner-led companies fine-tune how they run. Diagnosis first, ranked recommendations that stay independent of what the client buys, and a proof cycle of baseline, adopt, retest, report.",
    method: {
      diagnose:
        "A short private diagnostic (8 to 12 minutes) maps where value is stuck. No purchase required.",
      recommend:
        "Findings ranked by leverage. Process-only options rank alongside optional tools. Three lanes: client implements, StoneWave implements (scoped separately), or add a tool where process alone stalls.",
      prove:
        "Baseline captured before changes, adoption logged, retest against the same baseline, delta reported even when unflattering.",
    },
    guardrails: [
      "Recommendations independent of vendor or tool purchases",
      "Process-first: every finding ships with a no-new-software option",
      "Human approval required on consequential actions",
      "No autonomous outbound or purchases",
      "Projections are directional, not a final investment case",
      "Decision support, not licensed legal, tax, or financial advice",
    ],
    family: [
      {
        name: "Provable Outcomes",
        url: "https://provableoutcomes.ai",
        role: "Public door. Guided diagnostic and proof method.",
      },
      {
        name: "DealControl",
        url: "https://dealcontrol.ai",
        role: "Deal operations: obligations, receipts, weekly brief.",
      },
      {
        name: "IntentRouter",
        url: "https://intentrouter.ai",
        role: "Engineering stack: evidence-cited output, independently checked.",
      },
      {
        name: "LandLens",
        url: "https://landlens.app",
        role: "Parcel intelligence and GIS scoring at county scale.",
      },
      {
        name: "DirtDealer",
        url: "https://dirtdealer.us",
        role: "Georgia land deal facilitation with human-gated outreach.",
      },
    ],
    engagement: {
      diagnostic: "https://provableoutcomes.ai/diagnostic",
      call: "https://cal.com/john-mccleskey/15min",
      note: "Implementation is optional and separately scoped. Pricing follows the diagnostic; there is no public price list.",
    },
    contact: {
      email: "ops@stonewave.life",
      website: "https://stonewave.life",
    },
    identity: {
      founder: "John McCleskey",
      timezone: "America/New_York",
      preferredContact: "ops@stonewave.life",
    },
    keywords: [
      "business diagnostic",
      "operations improvement",
      "owner-led companies",
      "tool-agnostic recommendations",
      "baseline and retest",
      "process optimization",
      "provable outcomes",
    ],
  };

  return (
    <div
      style={{
        padding: 60,
        fontFamily: "monospace",
        background: "#071b2d",
        color: "#f7f5ef",
        minHeight: "100vh",
      }}
    >
      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.6 }}>
        {JSON.stringify(serviceDef, null, 2)}
      </pre>
    </div>
  );
}
