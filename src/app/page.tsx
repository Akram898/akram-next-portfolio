import type { Metadata } from "next";
import SplitHome from "@/components/ax/SplitHome";
import { copy } from "@/lib/site-content";
import "@/components/ax/ax.css";

const t = copy.en;

export const metadata: Metadata = {
  title: { absolute: t.home.title },
  description: t.home.description,
  alternates: { canonical: "/", languages: { en: "/", ar: "/ar" } },
  openGraph: { title: t.home.title, description: t.home.description, url: "/", locale: "en_US" },
};

export default function Home() {
  return <SplitHome t={t} />;
}
