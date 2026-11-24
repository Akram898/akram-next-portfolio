import type { Metadata } from "next";
import PortfolioHome from "@/components/PortfolioHome";
import { portfolioCopy } from "@/lib/portfolio-content";

const t = portfolioCopy.ar;

export const metadata: Metadata = {
  title: { absolute: t.meta.title },
  description: t.meta.description,
  alternates: { canonical: "/ar/portfolio", languages: { en: "/portfolio", ar: "/ar/portfolio" } },
  openGraph: { title: t.meta.title, description: t.meta.description, url: "/ar/portfolio", locale: "ar_EG" },
};

export default function ArabicPortfolio() {
  return <PortfolioHome t={t} />;
}
