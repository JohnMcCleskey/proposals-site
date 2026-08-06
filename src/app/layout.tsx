import type { Metadata } from "next";
import "./globals.css";

const SITE = "https://stonewave.life";

const VENTURE_URLS = [
  "https://intentrouter.ai",
  "https://intentrouter.ai/provable-outcomes",
  "https://dealcontrol.ai",
  "https://landlens.app",
  "https://dirtdealer.us",
  "https://sovereignos.ai",
];

export const metadata: Metadata = {
  title: "StoneWave — AI systems that prove their own work",
  description:
    "StoneWave builds multi-agent AI systems where every claim is evidence-cited and independently verified before it reaches you — then runs them as real businesses: IntentRouter, DealControl, LandLens, DirtDealer.",
  keywords: [
    "verified AI agents",
    "multi-agent orchestration",
    "AI workflow automation agency",
    "custom AI agent development",
    "sovereign AI operations",
    "outcome-based AI pricing",
    "local-first AI deployment",
    "evidence-cited AI research",
    "AI health check for small business",
    "parcel intelligence platform",
    "Georgia land deals",
  ],
  authors: [{ name: "StoneWave" }],
  metadataBase: new URL(SITE),
  openGraph: {
    title: "StoneWave — AI systems that prove their own work",
    description:
      "Every claim cited. Every claim checked by an independent Guardian agent. Refusals shipped, not hidden. Go look at the ventures we run on it.",
    url: SITE,
    siteName: "StoneWave",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StoneWave — AI systems that prove their own work",
    description:
      "We don't ask you to trust the output. We make it prove itself.",
  },
  alternates: { canonical: SITE },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#07080a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE}/#organization`,
                  name: "StoneWave",
                  url: SITE,
                  email: "ops@stonewave.life",
                  logo: {
                    "@type": "ImageObject",
                    url: `${SITE}/stonewave-logo.svg`,
                  },
                  sameAs: VENTURE_URLS,
                  description:
                    "StoneWave builds and operates verified multi-agent AI systems. Every claim is evidence-cited and independently checked by a Guardian agent before delivery.",
                  founder: { "@type": "Person", name: "John McCleskey" },
                  areaServed: { "@type": "Country", name: "United States" },
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE}/#website`,
                  url: SITE,
                  name: "StoneWave",
                  publisher: { "@id": `${SITE}/#organization` },
                },
                {
                  "@type": "ItemList",
                  name: "StoneWave ventures",
                  itemListElement: [
                    {
                      name: "IntentRouter",
                      url: "https://intentrouter.ai",
                      description:
                        "Sovereign gateway for AI agents. Decomposes goals into specialist Sovereign Roles; a Guardian agent verifies every claim against cited evidence.",
                    },
                    {
                      name: "Provable Outcomes",
                      url: "https://intentrouter.ai/provable-outcomes",
                      description:
                        "Outcome-only engagements: 20% of independently verified value recovered or created. No recovery, no fee.",
                    },
                    {
                      name: "DealControl",
                      url: "https://dealcontrol.ai",
                      description:
                        "Transaction operations platform tracking deal obligations, deadlines, and documents.",
                    },
                    {
                      name: "LandLens",
                      url: "https://landlens.app",
                      description:
                        "Parcel intelligence platform: GIS scoring, zoning and overlay analysis, development opportunity detection.",
                    },
                    {
                      name: "DirtDealer",
                      url: "https://dirtdealer.us",
                      description:
                        "Georgia land deal facilitation — automated parcel scoring, seller outreach, and due-diligence packaging.",
                    },
                    {
                      name: "SovereignOS",
                      url: "https://sovereignos.ai",
                      description:
                        "The shared local-first runtime underneath the StoneWave suite: role registry, Guardian verification, and tamper-evident State Store.",
                    },
                  ].map((v, i) => ({
                    "@type": "ListItem",
                    position: i + 1,
                    item: {
                      "@type": "SoftwareApplication",
                      name: v.name,
                      url: v.url,
                      applicationCategory: "BusinessApplication",
                      operatingSystem: "Web",
                      description: v.description,
                      provider: { "@id": `${SITE}/#organization` },
                    },
                  })),
                },
                {
                  "@type": "Service",
                  name: "StoneWave AI Solutions",
                  provider: { "@id": `${SITE}/#organization` },
                  description:
                    "Multi-agent workflow automation, verified research briefs, margin recovery, and purpose-built internal tools.",
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "AI Services",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "AI Health Check",
                          description:
                            "One-week operations audit producing a roadmap. Free if we cannot identify at least 3 hours per week of automatable work.",
                        },
                        price: "500.00",
                        priceCurrency: "USD",
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Workflow Build",
                          description:
                            "Multi-agent workflow or full system, designed, integrated, and handed off with 30 days of free tuning.",
                        },
                        price: "2500.00",
                        priceCurrency: "USD",
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Provable Outcomes",
                          description:
                            "Outcome-only engagement priced at 20% of independently verified value recovered or created.",
                        },
                        priceSpecification: {
                          "@type": "PriceSpecification",
                          description:
                            "20% of independently verified value recovered or created. No recovery, no fee.",
                          priceCurrency: "USD",
                        },
                      },
                    ],
                  },
                },
                {
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "How does StoneWave verify AI output?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Each specialist role produces evidence-cited output, and an independent Guardian agent mechanically checks every claim against that evidence. Claims that fail are refuted and dropped rather than delivered. Verified outputs are appended to a tamper-evident State Store you can audit.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What does StoneWave charge?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Fixed-scope work runs from $500 for an AI Health Check to $15,000 for a full multi-workflow system. Provable Outcomes engagements are outcome-only: 20% of independently verified value recovered or created, with no fee if nothing is recovered.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Does our data leave our systems?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Not in the highest-trust deployment. The stack is local-first and can run entirely inside your environment. Access is read-only and scoped to the specific data required — no admin credentials, no write access, and a human approves before anything executes.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What has StoneWave actually built?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "IntentRouter and Provable Outcomes (intentrouter.ai), DealControl (dealcontrol.ai), LandLens (landlens.app), and DirtDealer (dirtdealer.us) are live and operated by StoneWave. SovereignOS, the shared runtime beneath them, is in build.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
