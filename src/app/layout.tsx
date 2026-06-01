import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StoneWave — AI Solutions for Small Business",
  description:
    "We build AI systems that automate your workflows, eliminate busywork, and free you to focus on growth. AI employee agency, workflow automation, and custom agent development.",
  keywords: [
    "AI workflow automation agency",
    "custom AI agent development",
    "AI employee agency",
    "sovereign AI operations",
    "autonomous business systems",
    "AI health check for small business",
    "agentic AI implementation",
    "AI operations Georgia",
    "land sales AI",
    "property intelligence platform",
  ],
  authors: [{ name: "StoneWave" }],
  metadataBase: new URL("https://stonewave.life"),
  openGraph: {
    title: "StoneWave — AI Solutions for Small Business",
    description:
      "AI-powered workflow automation, custom agents, and business intelligence for small businesses across Georgia and beyond.",
    url: "https://stonewave.life",
    siteName: "StoneWave",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StoneWave — AI Solutions for Small Business",
    description:
      "Your business runs on autopilot. We build the AI systems.",
  },
  alternates: {
    canonical: "https://stonewave.life",
  },
  robots: {
    index: true,
    follow: true,
  },
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://stonewave.life/#organization",
                  name: "StoneWave",
                  url: "https://stonewave.life",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://stonewave.life/stonewave-logo.png",
                  },
                  sameAs: [],
                  description:
                    "AI employee agency that builds autonomous workflow systems for small businesses.",
                },
                {
                  "@type": "WebSite",
                  "@id": "https://stonewave.life/#website",
                  url: "https://stonewave.life",
                  name: "StoneWave",
                  publisher: {
                    "@id": "https://stonewave.life/#organization",
                  },
                },
                {
                  "@type": "Service",
                  name: "StoneWave AI Solutions",
                  provider: {
                    "@id": "https://stonewave.life/#organization",
                  },
                  description:
                    "AI workflow automation, custom agent development, and business intelligence for small businesses.",
                  areaServed: {
                    "@type": "State",
                    name: "Georgia",
                  },
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
                            "1-week audit of operations with 10-page roadmap.",
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
                            "One automated workflow end-to-end.",
                        },
                        price: "2500.00",
                        priceCurrency: "USD",
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Full AI System",
                          description:
                            "Multi-workflow AI system with dashboard and alerts.",
                        },
                        price: "8000.00",
                        priceCurrency: "USD",
                      },
                    ],
                  },
                },
                {
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "What does StoneWave build?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "StoneWave builds autonomous AI workflow systems for small businesses — from intake and scheduling to reporting and follow-ups.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How quickly can AI automation save me time?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Most clients see measurable time savings within 2-3 weeks of deployment. Our AI Health Check identifies specific opportunities in 5-7 days.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Do you work with businesses outside Georgia?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes. While we specialize in Georgia real estate and land markets, our AI systems work for any small business with repetitive workflows.",
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
