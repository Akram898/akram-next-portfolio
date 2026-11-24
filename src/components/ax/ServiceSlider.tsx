"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Copy, ServiceSlide } from "@/lib/site-content";
import { site, whatsappLink } from "@/lib/site";
import AmbientVideo from "../biz/AmbientVideo";
import { WhatsAppIcon } from "../biz/icons";

/* Desktop: the section pins and vertical scroll slides the services sideways.
   Phones and reduced motion: a plain swipe carousel with scroll snap.
   Same markup in both, so it works before hydration and without JS. */
export default function ServiceSlider({ t }: { t: Copy }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [dist, setDist] = useState(0);
  const [active, setActive] = useState(0);
  const list = t.slides.list;
  const n = list.length;
  const rtl = t.dir === "rtl";
  const num = (v: number) => v.toLocaleString(rtl ? "ar-EG" : "en");

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    const apply = () => setPinned(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el || !pinned) return;
    const measure = () => setDist(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  /* Swipe mode: the card most in view is the active one. */
  useEffect(() => {
    const el = track.current;
    if (!el || pinned) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".slide"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(cards.indexOf(e.target as HTMLElement));
        }
      },
      { root: el, threshold: 0.6 },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => (pinned ? v * dist * (rtl ? 1 : -1) : 0));
  const bar = useTransform(scrollYProgress, (v) => (pinned ? v : 0));

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (pinned) setActive(Math.min(n - 1, Math.max(0, Math.round(v * (n - 1)))));
  });

  function goTo(i: number) {
    const target = Math.min(n - 1, Math.max(0, i));
    if (pinned && wrap.current) {
      const top = wrap.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + (target / (n - 1)) * dist + 2, behavior: "smooth" });
      return;
    }
    const card = track.current?.querySelectorAll<HTMLElement>(".slide")[target];
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  return (
    <section
      ref={wrap}
      id="services"
      className={`rail${pinned ? " is-pinned" : ""}`}
      style={pinned ? { height: `calc(100vh + ${dist}px)` } : undefined}
      aria-roledescription="carousel"
      aria-labelledby="rail-title"
    >
      <div className="rail-sticky">
        <div className="rail-head">
          <h2 id="rail-title">{t.slides.label}</h2>
          <div className="rail-meter" aria-hidden>
            <span className="rail-count">
              <b>{num(active + 1)}</b> / {num(n)}
            </span>
            <span className="rail-bar">
              <motion.i style={pinned ? { scaleX: bar } : { scaleX: (active + 1) / n }} />
            </span>
          </div>
          <div className="rail-arrows">
            <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label={t.slides.prev}>
              <Chevron back={!rtl} />
            </button>
            <button type="button" onClick={() => goTo(active + 1)} disabled={active === n - 1} aria-label={t.slides.next}>
              <Chevron back={rtl} />
            </button>
          </div>
        </div>

        <motion.div ref={track} className="rail-track" style={{ x }}>
          {list.map((s, i) => (
            <Slide key={s.id} s={s} i={i} n={n} t={t} progress={scrollYProgress} pinned={pinned} num={num} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Slide({
  s,
  i,
  n,
  t,
  progress,
  pinned,
  num,
}: {
  s: ServiceSlide;
  i: number;
  n: number;
  t: Copy;
  progress: MotionValue<number>;
  pinned: boolean;
  num: (v: number) => string;
}) {
  const centre = i / (n - 1);
  const near = useTransform(progress, (v) => (pinned ? Math.min(1, Math.abs(v - centre) * (n - 1)) : 0));
  const scale = useTransform(near, [0, 1], [1, 0.9]);
  const opacity = useTransform(near, [0, 1], [1, 0.45]);
  const mediaX = useTransform(progress, (v) => (pinned ? `${(v - centre) * 18}%` : "0%"));
  const partner = s.id === "hosting" && site.hostingPartner.name ? site.hostingPartner : null;

  return (
    <motion.article
      className="slide"
      style={{ scale, opacity }}
      aria-roledescription="slide"
      aria-label={`${num(i + 1)} / ${num(n)}: ${s.title}`}
    >
      <div className="slide-media">
        <motion.div className="slide-media-inner" style={{ x: mediaX }}>
          <AmbientVideo src={`/media/service-${s.clip}.mp4`} poster={`/media/service-${s.clip}.jpg`} />
        </motion.div>
      </div>
      <div className="slide-body">
        <h3>{s.title}</h3>
        <p>{s.line}</p>
        <ul className="slide-tags">
          {s.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        <div className="slide-actions">
          <a className="slide-ask" href={whatsappLink(t.slides.askText.replace("{title}", s.title))} target="_blank" rel="noreferrer">
            <WhatsAppIcon className="ax-ico" />
            {t.slides.ask}
          </a>
          {partner && (
            <a className="slide-partner" href={partner.url} target="_blank" rel="noreferrer">
              {partner.name}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function Chevron({ back }: { back: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false">
      <path d={back ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}
