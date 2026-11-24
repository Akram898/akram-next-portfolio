import type { Metadata } from "next";
import ServicesPage from "@/components/ax/ServicesPage";
import { copy } from "@/lib/site-content";

const t = copy.ar;

export const metadata: Metadata = {
  title: { absolute: t.servicesMeta.title },
  description: t.servicesMeta.description,
  alternates: { canonical: "/ar/services", languages: { en: "/services", ar: "/ar/services" } },
  openGraph: { title: t.servicesMeta.title, description: t.servicesMeta.description, url: "/ar/services", locale: "ar_EG" },
};

export default function ArabicServices() {
  return <ServicesPage t={t} />;
}
