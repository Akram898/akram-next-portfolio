import type { Metadata } from "next";
import SplitHome from "@/components/ax/SplitHome";
import { copy } from "@/lib/site-content";
import "@/components/ax/ax.css";

const t = copy.ar;

export const metadata: Metadata = {
  title: { absolute: t.home.title },
  description: t.home.description,
  alternates: { canonical: "/ar", languages: { en: "/", ar: "/ar" } },
  openGraph: { title: t.home.title, description: t.home.description, url: "/ar", locale: "ar_EG" },
};

export default function ArabicHome() {
  return <SplitHome t={t} />;
}
