"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import portrait from "@/assets/portrait.jpg";
import type { Copy } from "@/lib/site-content";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "../biz/icons";
import ThemeSwitch from "./ThemeSwitch";

export default function AxHeader({ t, page }: { t: Copy; page: "home" | "services" }) {
  const [solid, setSolid] = useState(false);
  const ar = t.locale === "ar";
  const home = ar ? "/ar" : "/";
  const services = ar ? "/ar/services" : "/services";

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* One root layout serves both languages; keep <html lang/dir> in step with the page. */
  useEffect(() => {
    const root = document.documentElement;
    const prev = { lang: root.lang, dir: root.dir };
    root.lang = t.locale;
    root.dir = t.dir;
    return () => {
      root.lang = prev.lang || "en";
      root.dir = prev.dir || "ltr";
    };
  }, [t.locale, t.dir]);

  return (
    <header className={`ax-header${solid ? " is-solid" : ""}${page === "home" ? " is-home" : ""}`}>
      {/* On the desktop home the person sits in the seam instead (CSS hides this there). */}
      <Link href={home} className="ax-brand" aria-label={t.ui.home}>
        <Image src={portrait} alt="" width={34} height={34} />
        <span>{t.ui.name}</span>
      </Link>
      <nav className="ax-nav" aria-label="Main">
        {page !== "home" && (
          <>
            <Link href={ar ? "/ar/portfolio" : "/portfolio"}>{t.ui.portfolio}</Link>
            <Link href={services} aria-current={page === "services" ? "page" : undefined}>{t.ui.services}</Link>
          </>
        )}
        <a
          className="ax-lang"
          href={page === "services" ? t.ui.switchServicesHref : t.ui.switchHref}
          hrefLang={t.ui.switchLang}
          lang={t.ui.switchLang}
        >
          {t.ui.switchLabel}
        </a>
        <ThemeSwitch toLight={t.ui.themeToLight} toDark={t.ui.themeToDark} />
        {page === "services" && (
          <a className="ax-wa-pill" href={whatsappLink(t.hero.whatsappText)} target="_blank" rel="noreferrer">
            <WhatsAppIcon className="ax-ico" />
            <span>{t.ui.whatsapp}</span>
          </a>
        )}
      </nav>
    </header>
  );
}
