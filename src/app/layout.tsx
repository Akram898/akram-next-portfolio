import type { Metadata } from "next";
import { Alexandria, Archivo_Black, Cairo, IBM_Plex_Mono, Manrope, Readex_Pro, Unbounded } from "next/font/google";
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

// Arabic sections of bilingual guides (wrapped in dir="rtl" lang="ar"); no other page uses it.
const arabic = Cairo({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "700", "800"],
  display: "swap",
});

// Business homepage (/ and /ar): both families cover Arabic and Latin, so the two
// languages read as one brand. Alexandria is by Egyptian type designer Mohamed Gaber.
const bizDisplay = Alexandria({
  subsets: ["latin", "arabic"],
  variable: "--font-biz-display",
  display: "swap",
});

const bizBody = Readex_Pro({
  subsets: ["latin", "arabic"],
  variable: "--font-biz-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: "400",
});

const themeInit = `try{if(localStorage.getItem("theme")==="light")document.documentElement.setAttribute("data-theme","light")}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmedakram.com"),
  title: "Ahmed Akram | AI engineer, portfolio and services",
  description:
    "Ahmed Akram, AI engineer in Dubai. Portfolio, and services for businesses: websites, Facebook and Instagram ads, AI ads, AI assistants, automation and hosting.",
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
    title: "Ahmed Akram | AI engineer, portfolio and services",
    description:
      "Portfolio, and services for businesses: websites, ads, AI and automation. In English and Arabic.",
    url: "https://ahmedakram.com",
    siteName: "Ahmed Akram",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Akram | AI engineer, portfolio and services",
    description:
      "Portfolio, and services for businesses: websites, ads, AI and automation. In English and Arabic.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      /* globals.css smooth-scrolls anchors; this tells Next to switch that off during
         route changes, otherwise a new page glides down to its footer instead of
         opening at the top. */
      data-scroll-behavior="smooth"
      className={`${display.variable} ${accent.variable} ${body.variable} ${mono.variable} ${arabic.variable} ${bizDisplay.variable} ${bizBody.variable}`}
    >
      <head>
        {/* Apply the saved theme before first paint (no flash). Dark is the default. */}
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
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
                sameAs: [site.github, site.linkedin, site.instagram, site.instagramAr, site.facebook, site.youtube].filter(Boolean),
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
