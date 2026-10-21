"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/architecture", label: "Architecture" },
  { href: "/lab", label: "Lab" },
  { href: "/guides", label: "Guides" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function SiteHeader() {
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
    (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="site-header">
      <Link className="brand" href="/">
        <span aria-hidden>AA</span><b>Ahmed Akram</b>
      </Link>
      <nav aria-label="Main navigation" className="site-nav-desktop">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? "page" : undefined}>
            {link.label}
          </Link>
        ))}
      </nav>
      <Link className="header-contact" href="/#contact">Let&apos;s talk <span aria-hidden>&darr;</span></Link>
      <button type="button" className="nav-toggle" aria-expanded={open} aria-controls="mobile-nav"
        aria-label="Open menu" onClick={() => setOpen(true)}>
        <span /><span /><span />
      </button>
      <dialog ref={dialogRef} id="mobile-nav" className="mobile-nav" data-open={open}
        aria-label="Site navigation" onClose={() => setOpen(false)}>
        <button type="button" className="mobile-nav-close" onClick={() => setOpen(false)} autoFocus>
          Close <span aria-hidden>&times;</span>
        </button>
        <nav aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="mobile-nav-cta" href="/#contact" onClick={() => setOpen(false)}>
          Let&apos;s talk <span aria-hidden>&darr;</span>
        </Link>
      </dialog>
    </header>
  );
}
