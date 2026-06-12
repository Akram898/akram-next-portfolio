import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Public_Sans,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
});

const body = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmedakram.com"),
  title: "Ahmed Akram — AI Solutions Engineer & Architect",
  description:
    "Applied AI, multi-agent systems, and MLOps pipelines — built on enterprise identity and API platforms serving millions of users. Based in Dubai.",
  keywords: [
    "AI Solutions Engineer",
    "AI Architect",
    "Multi-Agent Systems",
    "MLOps",
    "MCP",
    "LLM Orchestration",
    "Identity Architecture",
    "OAuth OIDC",
    "Dubai",
  ],
  authors: [{ name: "Ahmed Akram" }],
  openGraph: {
    title: "Ahmed Akram — AI Solutions Engineer & Architect",
    description:
      "Applied AI · Multi-Agent Systems · MLOps — on enterprise foundations serving millions of users.",
    url: "https://ahmedakram.com",
    siteName: "Ahmed Akram",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Akram — AI Solutions Engineer & Architect",
    description:
      "Applied AI · Multi-Agent Systems · MLOps — on enterprise foundations serving millions of users.",
  },
  robots: { index: true, follow: true },
};

/* Runs before paint: resolves the persisted theme (light/dark/system)
   so neither mode ever flashes. */
const themeInit = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
