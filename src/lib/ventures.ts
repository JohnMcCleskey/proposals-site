export type VentureStatus = "live" | "soon";

export type Venture = {
  slug: string;
  name: string;
  category: string;
  url: string | null;
  status: VentureStatus;
  oneLiner: string;
  body: string;
  /** The specific machinery this venture proves we can build. */
  proof: string[];
  accent: "brass" | "verify" | "slate";
};

export const VENTURES: Venture[] = [
  {
    slug: "intentrouter",
    name: "IntentRouter",
    category: "Sovereign agent gateway",
    url: "https://intentrouter.ai",
    status: "live",
    oneLiner: "Plain-English goal in. Guardian-verified, evidence-cited brief out.",
    body:
      "Decomposes a high-level goal into specialist sub-tasks routed to Sovereign Roles — Treasury, Supply Chain, Compliance, Tax, Crisis, Deals, Intelligence, Talent. Every role cites its evidence. An independent Guardian agent mechanically verifies each claim before it is allowed into the State Store.",
    proof: [
      "Multi-agent orchestration with typed role boundaries",
      "Adversarial verification pass on every claim",
      "Tamper-evident append-only state log",
    ],
    accent: "verify",
  },
  {
    slug: "provable-outcomes",
    name: "Provable Outcomes",
    category: "Outcome-only engagements",
    url: "https://intentrouter.ai/provable-outcomes",
    status: "live",
    oneLiner: "20% of independently verified value recovered. No recovery, no fee.",
    body:
      "The human-facing brand on top of IntentRouter. Read-only scope on the specific data, findings delivered as a cited brief you can audit line by line, and an invoice that only exists if the value did. We take the model risk, not you.",
    proof: [
      "Pricing mechanically tied to verified output",
      "Read-only data scope — no admin credentials",
      "Every finding traceable back to its source",
    ],
    accent: "brass",
  },
  {
    slug: "dealcontrol",
    name: "DealControl",
    category: "Transaction operations",
    url: "https://dealcontrol.ai",
    status: "live",
    oneLiner: "Every deal, every deadline, every document — under one agent.",
    body:
      "Deal-stage automation that tracks obligations, chases the missing document, and keeps a running state of what is actually blocking close. Built for operators who lose margin to follow-up, not to pricing.",
    proof: [
      "Long-running stateful workflows",
      "Deadline and obligation extraction from documents",
      "Automated multi-party follow-up",
    ],
    accent: "slate",
  },
  {
    slug: "landlens",
    name: "LandLens",
    category: "Parcel intelligence · GIS",
    url: "https://landlens.app",
    status: "live",
    oneLiner: "Scores thousands of parcels on the criteria that actually kill deals.",
    body:
      "GIS ingestion, zoning and overlay analysis, access and utility checks, and development-opportunity detection — run across whole counties instead of one parcel at a time.",
    proof: [
      "Geospatial data pipelines at county scale",
      "Multi-factor scoring models with explainable output",
      "Analyst-grade output without the analyst hours",
    ],
    accent: "slate",
  },
  {
    slug: "dirtdealer",
    name: "DirtDealer",
    category: "Land deal facilitation",
    url: "https://dirtdealer.us",
    status: "live",
    oneLiner: "Motivated sellers matched to qualified buyers, packaged automatically.",
    body:
      "The market-facing side of LandLens. Automated parcel scoring, seller outreach, and due-diligence packaging across Georgia — concentrated in secondary and smaller markets where competition is thin.",
    proof: [
      "Automated outreach with human approval gates",
      "Due-diligence packet generation",
      "Live in a real market, not a demo environment",
    ],
    accent: "brass",
  },
  {
    slug: "sovereignos",
    name: "SovereignOS",
    category: "The suite these run on",
    url: "https://sovereignos.ai",
    status: "soon",
    oneLiner: "The substrate underneath all of it. Landing page in progress.",
    body:
      "The shared runtime our ventures are built on: role registry, Guardian verification, State Store, and local-first deployment so client data can stay on client hardware. Each venture above is a production load test of it.",
    proof: [
      "Local-first — data need never leave your hardware",
      "One verification layer shared across every product",
      "Human approval required before any action executes",
    ],
    accent: "verify",
  },
];
