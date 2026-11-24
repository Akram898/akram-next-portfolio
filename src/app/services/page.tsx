import type { Metadata } from "next";
import ServicesPage from "@/components/ax/ServicesPage";
import { copy } from "@/lib/site-content";

const t = copy.en;

export const metadata: Metadata = {
  title: { absolute: t.servicesMeta.title },
  description: t.servicesMeta.description,
  alternates: { canonical: "/services", languages: { en: "/services", ar: "/ar/services" } },
  openGraph: { title: t.servicesMeta.title, description: t.servicesMeta.description, url: "/services", locale: "en_US" },
};

export default function Services() {
  return <ServicesPage t={t} />;
}
