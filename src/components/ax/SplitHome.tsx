"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import portrait from "@/assets/portrait.jpg";
import type { Copy } from "@/lib/site-content";
import AmbientVideo from "../biz/AmbientVideo";
import AxHeader from "./AxHeader";
import MotionRoot from "./MotionRoot";
import IconField from "./IconField";
import { businessTiles, techTiles } from "./tiles";

type Side = "p" | "s";

const stars = Array.from({ length: 28 }, (_, i) => ({
  x: (i * 47 + 13) % 100,
  y: (i * 71 + 19) % 100,
  s: 1 + (i % 3),
  d: (i % 9) * 0.35,
}));

/* The home page is a door with two leaves. Hover leans one open; a click swings it
   fully open (the curtain), then the route changes underneath. */
export default function SplitHome({ t }: { t: Copy }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<Side | null>(null);
  const [open, setOpen] = useState<Side | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const ar = t.locale === "ar";
  const hrefs = { p: ar ? "/ar/portfolio" : "/portfolio", s: ar ? "/ar/services" : "/services" } as const;

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const sy = useSpring(py, { stiffness: 60, damping: 20 });

  useEffect(() => {
    router.prefetch(hrefs.p);
    router.prefetch(hrefs.s);
    /* Coming back with the browser's back button: close the door again. */
    const reset = () => setOpen(null);
    window.addEventListener("pageshow", reset);
    return () => {
      window.removeEventListener("pageshow", reset);
      window.clearTimeout(timer.current);
    };
  }, [router, hrefs.p, hrefs.s]);

  function go(side: Side) {
    return (event: MouseEvent<HTMLAnchorElement>) => {
      if (reduce || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      event.preventDefault();
      setOpen(side);
      timer.current = window.setTimeout(() => router.push(hrefs[side]), 760);
    };
  }

  const state = open ?? hover;
  const share = open === "p" ? 100 : open === "s" ? 0 : hover === "p" ? 60 : hover === "s" ? 40 : 50;

  return (
    <MotionRoot>
    <div className="ax ax-home" lang={t.locale} dir={t.dir}>
      <AxHeader t={t} page="home" />
      <main
        id="main-content"
        tabIndex={-1}
        className="split"
        data-state={state ?? "none"}
        data-open={open ?? "none"}
        style={{ "--share": `${share}%` } as React.CSSProperties}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width - 0.5);
          py.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
          setHover(null);
        }}
      >
        <h1 className="sr-only">{t.ui.name}: {t.split.portfolio.word}, {t.split.services.word}</h1>

        {/* Portfolio leaf */}
        <Link
          href={hrefs.p}
          className="leaf leaf-p"
          onMouseEnter={() => setHover("p")}
          onFocus={() => setHover("p")}
          onClick={go("p")}
        >
          <div className="leaf-inner">
            <div className="leaf-stars" aria-hidden>
              {stars.map((s, i) => (
                <i key={i} style={{ insetInlineStart: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }} />
              ))}
            </div>
            <IconField tiles={techTiles} px={sx} py={sy} />
            <div className="leaf-copy">
              <span className="leaf-word">{t.split.portfolio.word}</span>
              <span className="leaf-line">{t.split.portfolio.line}</span>
              <span className="leaf-cta">
                {t.split.portfolio.cta}
                {t.split.portfolio.note && <small>{t.split.portfolio.note}</small>}
                <Arrow />
              </span>
            </div>
          </div>
        </Link>

        {/* Services leaf */}
        <Link
          href={hrefs.s}
          className="leaf leaf-s"
          onMouseEnter={() => setHover("s")}
          onFocus={() => setHover("s")}
          onClick={go("s")}
        >
          <div className="leaf-inner">
            <AmbientVideo className="leaf-video" src="/media/hero-night-street.mp4" poster="/media/hero-night-street.jpg" />
            <div className="leaf-glow" aria-hidden />
            <IconField tiles={businessTiles} px={sx} py={sy} />
            <div className="leaf-copy">
              <span className="leaf-word">{t.split.services.word}</span>
              <span className="leaf-line">{t.split.services.line}</span>
              <span className="leaf-cta">
                {t.split.services.cta}
                <Arrow />
              </span>
            </div>
          </div>
        </Link>

        {/* The seam, with the person in it */}
        <div className="seam" aria-hidden>
          <span className="seam-line" />
          <span className="seam-id">
            <span className="seam-photo">
              <Image src={portrait} alt="" placeholder="blur" sizes="96px" priority />
            </span>
            <b>{t.ui.name}</b>
            <small>{t.ui.role}</small>
          </span>
        </div>
      </main>
    </div>
    </MotionRoot>
  );
}

function Arrow() {
  return (
    <svg className="leaf-arrow" viewBox="0 0 24 24" aria-hidden focusable="false">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
