/** Single source of truth for links and shared copy. */

export const DIAGNOSTIC_URL = "https://provableoutcomes.ai/diagnostic";
export const CAL_URL = "https://cal.com/john-mccleskey/15min";
export const CONTACT_EMAIL = "ops@stonewave.life";
export const LINKEDIN_PERSONAL_URL = "https://www.linkedin.com/in/john-mccleskey/";
export const LINKEDIN_COMPANY_URL = "https://www.linkedin.com/company/stonewave-life";

export const NAV_ITEMS = [
  { label: "Method", href: "#method" },
  { label: "Proof", href: "#proof" },
  { label: "Work", href: "#work" },
  { label: "Family", href: "#family" },
] as const;

export type FamilySurface = {
  name: string;
  url: string;
  host: string;
  role: string;
  line: string;
  detail: string;
  span: "wide" | "std";
  here?: boolean;
};

/**
 * Live family surfaces. Only URLs verified live belong here. LandLens and
 * DirtDealer passed verification (active DNS on the owner's Vercel account,
 * fresh search index, deployed backend). BookBuilder stays out until its
 * public site is verified reachable.
 */
export const FAMILY: FamilySurface[] = [
  {
    name: "Provable Outcomes",
    url: "https://provableoutcomes.ai",
    host: "provableoutcomes.ai",
    role: "The public door",
    line: "Know what to do next. Prove what changed.",
    detail:
      "The guided diagnostic lives here. A short private session that maps where value is stuck, then returns ranked recommendations you can act on with or without us.",
    span: "wide",
  },
  {
    name: "DealControl",
    url: "https://dealcontrol.ai",
    host: "dealcontrol.ai",
    role: "Deal operations",
    line: "Every obligation, receipt, and deadline in one weekly brief.",
    detail:
      "Deal ops for transaction-heavy teams. Receipts for what happened, a weekly brief for what needs attention, and a human decision on everything that matters.",
    span: "std",
  },
  {
    name: "IntentRouter",
    url: "https://intentrouter.ai",
    host: "intentrouter.ai",
    role: "The engineering stack",
    line: "Evidence-cited output, independently checked before delivery.",
    detail:
      "The engine room. Specialist roles produce cited work, an independent verification pass checks every claim, and a person approves before anything acts.",
    span: "std",
  },
  {
    name: "LandLens",
    url: "https://landlens.app",
    host: "landlens.app",
    role: "Parcel intelligence",
    line: "Whole counties scored on the criteria that kill land deals.",
    detail:
      "GIS scoring, zoning and overlay analysis, and opportunity detection at county scale, with the reasoning behind every score visible.",
    span: "std",
  },
  {
    name: "DirtDealer",
    url: "https://dirtdealer.us",
    host: "dirtdealer.us",
    role: "Land deals, delivered",
    line: "The market-facing side of LandLens, live in Georgia.",
    detail:
      "Parcel scoring, seller outreach, and due-diligence packaging in secondary markets. Every outbound message clears a human gate first.",
    span: "std",
  },
  {
    name: "StoneWave",
    url: "https://stonewave.life",
    host: "stonewave.life",
    role: "Operating company",
    line: "The trust layer behind the family. You are here.",
    detail:
      "StoneWave runs the companies above and holds the standard they answer to: diagnosis before prescriptions, independence in recommendations, proof before claims.",
    span: "wide",
    here: true,
  },
];
