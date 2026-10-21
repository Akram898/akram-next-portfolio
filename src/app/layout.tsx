import type { Metadata } from "next";
import { Archivo_Black, IBM_Plex_Mono, Manrope, Unbounded } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/site";
import portrait from "@/assets/portrait.jpg";
import "./globals.css";

const display = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});

const accent = Unbounded({
  subsets: ["latin"],
  variable: "--font-accent",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmedakram.com"),
  title: "Ahmed Akram | AI Solutions Engineer & Architect",
  description:
    "Ahmed Akram designs and ships applied AI systems, multi-agent platforms, MLOps pipelines, and enterprise architecture from Dubai.",
  keywords: [
    "AI Solutions Engineer",
    "AI Architect",
    "Multi-Agent Systems",
    "MLOps",
    "MCP",
    "LLM Orchestration",
    "Identity Architecture",
    "Dubai",
  ],
  authors: [{ name: "Ahmed Akram" }],
  openGraph: {
    title: "Ahmed Akram | AI Solutions Engineer & Architect",
    description:
      "Applied AI, multi-agent systems, and MLOps built on enterprise engineering.",
    url: "https://ahmedakram.com",
    siteName: "Ahmed Akram",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Akram | AI Solutions Engineer & Architect",
    description:
      "Applied AI, multi-agent systems, and MLOps built on enterprise engineering.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${accent.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <noscript><style>{`.site-nav-desktop { display: flex; flex-wrap: wrap; gap: 14px; } .site-header { display: flex; flex-wrap: wrap; gap: 20px; } .nav-toggle { display: none; } [data-reveal] { opacity: 1 !important; transform: none !important; }`}</style></noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": `${site.url}/#person`,
                name: site.name,
                url: site.url,
                jobTitle: site.role,
                image: `${site.url}${portrait.src}`,
                sameAs: [site.github, site.linkedin],
                homeLocation: { "@type": "Place", name: site.location },
              },
              {
                "@type": "WebSite",
                "@id": `${site.url}/#website`,
                url: site.url,
                name: site.name,
                inLanguage: "en",
                author: { "@id": `${site.url}/#person` },
              },
            ],
          }).replace(/</g, "\\u003c") }}
        />
        {children}
        {process.env.VERCEL === "1" && <Analytics />}
      </body>
    </html>
  );
}
