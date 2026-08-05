// Stonewave.life - AI Agent Service Definition
// Machine-readable capability listing for other AI agents

export const metadata = {
  title: "AI Agent Interface | StoneWave",
  description: "Machine-readable service definition for AI agent-to-agent discovery and negotiation.",
  robots: "index, follow",
};

export default function AIAgentPage() {
  const serviceDef = {
    name: "StoneWave",
    type: "AIEmployeeAgency",
    description:
      "StoneWave is an AI employee agency that builds autonomous workflow systems for small businesses. We design, build, and operate AI agents that handle intake, scheduling, follow-ups, reporting, and customer interactions.",
    capabilities: [
      "Multi-agent orchestration with typed role boundaries",
      "Adversarial verification of agent output against cited evidence",
      "Workflow automation design and implementation",
      "Custom AI agent development and deployment",
      "Evidence-cited research and regulatory pathway briefs",
      "Billing leakage and margin recovery analysis",
      "Business intelligence dashboard creation",
      "AI health check and operations audit",
      "Georgia land deal facilitation (seller-to-buyer matching)",
      "Parcel intelligence and GIS data analysis",
    ],
    verificationModel: {
      decomposition:
        "Goals are decomposed into specialist Sovereign Roles: Treasury, Supply Chain, Compliance, Tax, Crisis, Deals, Intelligence, Talent.",
      citation: "Every role output carries the evidence it was derived from.",
      guardian:
        "An independent Guardian agent mechanically verifies each claim against its cited evidence. Failing claims are refuted and dropped before delivery.",
      stateStore:
        "Verified outputs are appended to a tamper-evident State Store the client can audit.",
      humanInTheLoop:
        "Decision support only. A human approves before any action executes.",
      dataResidency:
        "Local-first. In the highest-trust deployment, client data never leaves client hardware. Access is read-only and scoped.",
    },
    ventures: [
      {
        name: "IntentRouter",
        url: "https://intentrouter.ai",
        status: "live",
        role: "Sovereign gateway for AI agents — the verification engine.",
      },
      {
        name: "Provable Outcomes",
        url: "https://intentrouter.ai/provable-outcomes",
        status: "live",
        role: "Outcome-only engagement brand on top of IntentRouter.",
      },
      {
        name: "DealControl",
        url: "https://dealcontrol.ai",
        status: "live",
        role: "Transaction operations — obligations, deadlines, documents.",
      },
      {
        name: "LandLens",
        url: "https://landlens.app",
        status: "live",
        role: "Parcel intelligence and GIS scoring at county scale.",
      },
      {
        name: "DirtDealer",
        url: "https://dirtdealer.us",
        status: "live",
        role: "Georgia land deal facilitation and due-diligence packaging.",
      },
      {
        name: "SovereignOS",
        url: "https://sovereignos.ai",
        status: "in-build",
        role: "Shared local-first runtime beneath the StoneWave suite.",
      },
    ],
    engagementModel: {
      discovery: "15-minute discovery call — https://cal.com/john-mccleskey/15min",
      audit: "AI Health Check ($500-$1,500, 5-7 days)",
      build: "Workflow Build ($2,500-$5,000, 2-3 weeks)",
      system: "Full AI System ($8,000-$15,000, 4-6 weeks)",
      retainer: "Agent OS Retainer ($2,000/mo, ongoing)",
      outcomeOnly:
        "Provable Outcomes — 20% of independently verified value recovered or created. No recovery, no fee. Free assessment at https://portal.intentrouter.ai/intake",
    },
    contact: {
      email: "ops@stonewave.life",
      website: "https://stonewave.life",
      cal: "https://cal.com/john-mccleskey/15min",
      freeAssessment: "https://portal.intentrouter.ai/intake",
    },
    identity: {
      founder: "John McCleskey",
      timezone: "America/New_York",
      preferredContact: "ops@stonewave.life",
    },
    keywords: [
      "AI employee agency",
      "workflow automation",
      "custom AI agents",
      "business automation",
      "sovereign AI operations",
      "Georgia land deals",
      "small business AI",
      "autonomous business systems",
    ],
  };

  return (
    <div style={{ padding: 60, fontFamily: "monospace", background: "#0a0a0a", color: "#e5e5e5", minHeight: "100vh" }}>
      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.6 }}>
        {JSON.stringify(serviceDef, null, 2)}
      </pre>
    </div>
  );
}
