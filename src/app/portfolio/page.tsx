import type { Metadata } from "next";
import PortfolioHome from "@/components/PortfolioHome";
import { portfolioCopy } from "@/lib/portfolio-content";

const t = portfolioCopy.en;

export const metadata: Metadata = {
  title: { absolute: t.meta.title },
  description: t.meta.description,
  alternates: { canonical: "/portfolio", languages: { en: "/portfolio", ar: "/ar/portfolio" } },
};

export default function Portfolio() {
  return <PortfolioHome t={t} />;
}
