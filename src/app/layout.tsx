import type { Metadata } from "next";
import { Archivo_Black, IBM_Plex_Mono, Manrope, Unbounded } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const display = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});

const accent = Unbounded({
  subsets: ["latin"],
  variable: "--font-accent",
  weight: ["500", "700", "900"],
});

const body = Manrope({
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
