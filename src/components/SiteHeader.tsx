"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  // The mobile panel portals into document.body (see below), which needs a real DOM
  // node that only exists client-side, so it can't render during SSR.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close the menu on route change, so a link tap doesn't leave the panel open behind the next page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // The mobile panel is position:fixed (viewport-relative, so it can never overshoot
  // the screen the way an absolutely-positioned child of the sticky header would).
  // It needs the header's real height as padding-top so its content starts below it,
  // measured live rather than hardcoded since the toggle button changes header height.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    function setHeaderHeight() {
      document.documentElement.style.setProperty("--header-h", `${header!.offsetHeight}px`);
    }
    setHeaderHeight();

    const observer = new ResizeObserver(setHeaderHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  // Lock background scroll while the panel is open, and let Escape close it.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <header className="site-header" ref={headerRef}>
      <Link className="brand" href="/" aria-label="Ahmed Akram, home">
        <span>AA</span>
        <b>Ahmed Akram</b>
      </Link>

      <nav aria-label="Main navigation" className="site-nav-desktop">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      <Link className="header-contact" href="/#contact">
        Let&apos;s talk <span aria-hidden>↓</span>
      </Link>

      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>

      {mounted &&
        createPortal(
          <div
            id="mobile-nav"
            className="mobile-nav"
            data-open={open}
            aria-hidden={!open}
          >
            <nav aria-label="Mobile navigation">
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ transitionDelay: open ? `${60 + index * 45}ms` : "0ms" }}
                  tabIndex={open ? 0 : -1}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link
              className="mobile-nav-cta"
              href="/#contact"
              tabIndex={open ? 0 : -1}
            >
              Let&apos;s talk <span aria-hidden>↓</span>
            </Link>
          </div>,
          document.body
        )}
    </header>
  );
}
