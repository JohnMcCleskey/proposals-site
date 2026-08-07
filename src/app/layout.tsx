import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import "./globals.css";

const SITE = "https://stonewave.life";

/* Fraunces variable, vendored from @fontsource-variable/fraunces.
   Carries opsz / SOFT / WONK axes for the editorial display voice. */
const fraunces = localFont({
  src: [
    { path: "../fonts/fraunces-var.woff2", style: "normal" },
    { path: "../fonts/fraunces-var-italic.woff2", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
});

const FAMILY_URLS = [
  "https://provableoutcomes.ai",
  "https://dealcontrol.ai",
  "https://intentrouter.ai",
];

export const metadata: Metadata = {
  title: "StoneWave. Clarity before technology.",
  description:
    "StoneWave helps owner-led companies fine-tune how they run. We diagnose where value is stuck, recommend the smallest high-leverage changes, and prove what improved with a baseline and a retest.",
  keywords: [
    "business diagnostic",
    "operations improvement",
    "owner-led companies",
    "process optimization",
    "tool-agnostic consulting",
    "provable outcomes",
    "baseline and retest",
    "operator advisory",
  ],
  authors: [{ name: "StoneWave" }],
  metadataBase: new URL(SITE),
  openGraph: {
    title: "StoneWave. Clarity before technology.",
    description:
      "Know what to improve. Prove it moved. Diagnosis first, recommendations independent of what you buy, and a retest against baseline.",
    url: SITE,
    siteName: "StoneWave",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StoneWave. Clarity before technology.",
    description:
      "We diagnose where value is stuck, recommend the smallest high-leverage changes, and prove what improved.",
  },
  alternates: { canonical: SITE },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#071b2d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable}`}
    >
      <head>
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
                  sameAs: FAMILY_URLS,
                  description:
                    "StoneWave helps owner-led companies fine-tune how they run: diagnosis first, independent recommendations, and a proof cycle of baseline, adopt, retest, report.",
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
                  "@type": "Service",
                  name: "Provable Outcomes diagnostic",
                  serviceType: "Business operations diagnostic",
                  provider: { "@id": `${SITE}/#organization` },
                  url: "https://provableoutcomes.ai/diagnostic",
                  description:
                    "A short guided diagnostic that maps where value is stuck, then returns ranked recommendations. Process-only options rank alongside optional tools. Implementation is optional and separately scoped.",
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
