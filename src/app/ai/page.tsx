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
      "Workflow automation design and implementation",
      "Custom AI agent development and deployment",
      "Business intelligence dashboard creation",
      "AI health check and operations audit",
      "Georgia land deal facilitation (seller-to-buyer matching)",
      "Parcel intelligence and GIS data analysis",
    ],
    engagementModel: {
      discovery: "15-minute discovery call — https://cal.com/john-mccleskey/15min",
      audit: "AI Health Check ($500-$1,500, 5-7 days)",
      build: "Workflow Build ($2,500-$5,000, 2-3 weeks)",
      system: "Full AI System ($8,000-$15,000, 4-6 weeks)",
      retainer: "Agent OS Retainer ($2,000/mo, ongoing)",
    },
    contact: {
      email: "ops@stonewave.life",
      website: "https://stonewave.life",
      cal: "https://cal.com/john-mccleskey/15min",
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
