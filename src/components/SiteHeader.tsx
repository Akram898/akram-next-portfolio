"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { portfolioCopy, type PortfolioCopy } from "@/lib/portfolio-content";

/* `nav` is passed only by the bilingual portfolio pages; it adds the language switch.
   Other pages (lab, guides, architecture) use the English labels without a switch. */
export default function SiteHeader({ nav }: { nav?: PortfolioCopy["nav"] }) {
  const t = nav ?? portfolioCopy.en.nav;
  const NAV_LINKS = t.links;
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const viewport = window.matchMedia("(min-width: 761px)");
    const closeOnDesktop = () => { if (viewport.matches) setOpen(false); };
    viewport.addEventListener("change", closeOnDesktop);
    return () => viewport.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!open) { dialog.close(); return; }
    // Native dialog supplies focus containment, Escape, and focus restoration.
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  const isActive = (href: string) => !href.includes("#") &&
    (href === "/" || href === "/ar" ? pathname === href : pathname.startsWith(href));

  /* The Arabic portfolio shares the English root layout; keep <html lang/dir> in step. */
  useEffect(() => {
    if (!nav) return;
    const root = document.documentElement;
    const lang = nav.switchLang === "en" ? "ar" : "en";
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    return () => {
      root.lang = "en";
      root.dir = "ltr";
    };
  }, [nav]);


  return (
    <header className="site-header">
      <Link className="brand" href={t.home}>
        <span aria-hidden>AA</span><b>{nav?.switchLang === "en" ? "أحمد أكرم" : "Ahmed Akram"}</b>
      </Link>
      <nav aria-label="Main navigation" className="site-nav-desktop">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? "page" : undefined}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="header-end">
        {nav && (
          <a className="header-lang" href={nav.switchHref} hrefLang={nav.switchLang} lang={nav.switchLang}>
            {nav.switchLabel}
          </a>
        )}
        <Link className="header-contact" href={t.talkHref}>{t.talk} <span aria-hidden>&darr;</span></Link>
      </div>
      <button type="button" className="nav-toggle" aria-expanded={open} aria-controls="mobile-nav"
        aria-label={t.menu} onClick={() => setOpen(true)}>
        <span /><span /><span />
      </button>
      <dialog ref={dialogRef} id="mobile-nav" className="mobile-nav" data-open={open}
        aria-label="Site navigation" onClose={() => setOpen(false)}>
        <button type="button" className="mobile-nav-close" onClick={() => setOpen(false)} autoFocus>
          {t.close} <span aria-hidden>&times;</span>
        </button>
        <nav aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>
        {nav && (
          <a className="mobile-nav-lang" href={nav.switchHref} hrefLang={nav.switchLang} lang={nav.switchLang}>
            {nav.switchLabel}
          </a>
        )}
        <Link className="mobile-nav-cta" href={t.talkHref} onClick={() => setOpen(false)}>
          {t.talk} <span aria-hidden>&darr;</span>
        </Link>
      </dialog>
    </header>
  );
}
