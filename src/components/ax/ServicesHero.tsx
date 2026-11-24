"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Copy } from "@/lib/site-content";
import { whatsappLink } from "@/lib/site";
import AmbientVideo from "../biz/AmbientVideo";
import { WhatsAppIcon } from "../biz/icons";
import IconField from "./IconField";
import { businessHeroTiles } from "./tiles";

/* Opens where the home's services leaf left off: same night street, same tiles.
   Scrolling pushes the tiles outward and lets the big word sink behind the slider. */
export default function ServicesHero({ t }: { t: Copy }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const sy = useSpring(py, { stiffness: 60, damping: 20 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const warp = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });
  const wordY = useTransform(scrollYProgress, (v) => (reduce ? "0%" : `${v * 45}%`));
  const copyY = useTransform(scrollYProgress, (v) => (reduce ? "0%" : `${v * -30}%`));
  const copyOpacity = useTransform(scrollYProgress, (v) => (reduce ? 1 : Math.max(0, 1 - v / 0.6)));
  const videoScale = useTransform(scrollYProgress, (v) => (reduce ? 1 : 1 + v * 0.18));
  const warpOrStill = useTransform(warp, (v) => (reduce ? 0 : v));

  return (
    <section
      ref={ref}
      className="sv-hero"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <motion.div className="sv-hero-media" style={{ scale: videoScale }} aria-hidden>
        <AmbientVideo className="sv-hero-video" src="/media/hero-night-street.mp4" poster="/media/hero-night-street.jpg" />
      </motion.div>
      <div className="sv-hero-shade" aria-hidden />
      <IconField tiles={businessHeroTiles} px={sx} py={sy} warp={warpOrStill} className="sv-hero-field" />

      <motion.div className="sv-hero-copy" style={{ y: copyY, opacity: copyOpacity }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.hero.title}
        </motion.h1>
        <motion.div
          className="sv-hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <a className="btn btn-wa" href={whatsappLink(t.hero.whatsappText)} target="_blank" rel="noreferrer">
            <WhatsAppIcon className="ax-ico" />
            {t.hero.primary}
          </a>
          <a className="btn btn-ghost" href="#services">{t.hero.secondary}</a>
        </motion.div>
      </motion.div>

      <motion.p className="sv-hero-word" aria-hidden style={{ y: wordY }}>
        {t.hero.word}
      </motion.p>
    </section>
  );
}
