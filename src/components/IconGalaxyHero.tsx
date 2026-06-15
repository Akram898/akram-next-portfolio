"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import portrait from "@/assets/portrait.jpg";
import { heroTiles, HeroTile } from "./brandIcons";

const words = [ "Software", "AI agents", "LLM pipelines", "Architecture", "cloud runtimes"];

const stars = Array.from({ length: 90 }, (_, index) => ({
  x: (index * 47 + 13) % 100,
  y: (index * 71 + 19) % 100,
  size: 1 + (index % 3),
  delay: (index % 11) * 0.18,
}));

function BrandGlyph({ tile }: { tile: HeroTile }) {
  const gradientId = `tile-grad-${tile.id}`;
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={tile.title}>
      {tile.gradient ? (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={tile.gradient[0]} />
              <stop offset="52%" stopColor={tile.gradient[1]} />
              <stop offset="100%" stopColor={tile.gradient[2]} />
            </linearGradient>
          </defs>
          <path fill={`url(#${gradientId})`} d={tile.path} />
        </>
      ) : (
        <path fill={tile.fg} d={tile.path} />
      )}
    </svg>
  );
}

function FloatingTile({
  tile,
  index,
  pointerX,
  pointerY,
  warp,
}: {
  tile: HeroTile;
  index: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  warp: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();

  /* Pointer parallax + scroll warp: tiles fly away from center as
     the visitor scrolls out of the section. */
  const parallaxX = useTransform(pointerX, [-0.5, 0.5], [-26 * tile.depth, 26 * tile.depth]);
  const parallaxY = useTransform(pointerY, [-0.5, 0.5], [-20 * tile.depth, 20 * tile.depth]);
  const warpX = useTransform(warp, [0, 1], [0, (tile.x - 50) * 9 * tile.depth]);
  const warpY = useTransform(warp, [0, 1], [0, (tile.y - 50) * 7 * tile.depth]);
  const x = useTransform([parallaxX, warpX], ([a, b]: number[]) => a + b);
  const y = useTransform([parallaxY, warpY], ([a, b]: number[]) => a + b);
  const opacity = useTransform(warp, [0, 0.7], [1, 0]);

  return (
    <motion.div
      className="hero-tile"
      style={{
        left: `${tile.x}%`,
        top: `${tile.y}%`,
        x: reduceMotion ? 0 : x,
        y: reduceMotion ? 0 : y,
        opacity: reduceMotion ? 1 : opacity,
        "--tile-scale": tile.size,
        "--tile-bg": tile.bg,
        "--tile-glow": tile.glow ?? "rgba(0, 0, 0, 0.5)",
      } as React.CSSProperties}
      initial={{ scale: 0, rotate: index % 2 ? 10 : -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 160,
        damping: 15,
        delay: 0.35 + index * 0.07,
      }}
    >
      <motion.span
        className="hero-tile-body"
        animate={
          reduceMotion
            ? undefined
            : { y: [0, -9 - (index % 4) * 2, 0], rotate: [0, index % 2 ? 2.4 : -2.4, 0] }
        }
        transition={{
          y: { duration: 4.2 + (index % 5) * 0.45, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 5.4 + (index % 4) * 0.5, repeat: Infinity, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.14, rotate: 0 }}
      >
        <BrandGlyph tile={tile} />
      </motion.span>
    </motion.div>
  );
}

export default function IconGalaxyHero() {
  const [wordIndex, setWordIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 22 });

  const pageScroll = useScroll();
  const progressX = useSpring(pageScroll.scrollYProgress, {
    stiffness: 120,
    damping: 24,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const warp = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });
  const copyScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "32%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.62], [1, 0]);
  const hazeRotate = useTransform(scrollYProgress, [0, 1], [0, 26]);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % words.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progressX }} />
      <section
        ref={sectionRef}
        className="icon-hero"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          pointerX.set(0);
          pointerY.set(0);
        }}
      >
        <motion.div
          className="hero-nebula"
          aria-hidden
          style={{ rotate: reduceMotion ? 0 : hazeRotate }}
        >
          <i className="nebula-a" />
          <i className="nebula-b" />
          <i className="nebula-c" />
        </motion.div>
        <div className="hero-horizon" aria-hidden />
        <div className="star-field" aria-hidden>
          {stars.map((star, index) => (
            <motion.i
              key={index}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
              }}
              animate={reduceMotion ? undefined : { opacity: [0.16, 0.9, 0.16] }}
              transition={{
                duration: 2.4 + (index % 5) * 0.45,
                delay: star.delay,
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        <div className="hero-tile-field" aria-label="Technology stack">
          {heroTiles.map((tile, index) => (
            <FloatingTile
              key={tile.id}
              tile={tile}
              index={index}
              pointerX={smoothX}
              pointerY={smoothY}
              warp={warp}
            />
          ))}
        </div>

        <motion.div
          className="icon-hero-copy"
          style={{
            scale: reduceMotion ? 1 : copyScale,
            y: reduceMotion ? 0 : copyY,
            opacity: reduceMotion ? 1 : copyOpacity,
          }}
        >
          <motion.p
            className="hero-portfolio-label"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Selected work / systems portfolio
          </motion.p>
          <motion.div
            className="hero-name-lockup"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero-avatar">
              <Image
                src={portrait}
                alt=""
                placeholder="blur"
                sizes="(max-width: 760px) 58px, 76px"
                priority
              />
            </span>
            <h1>Ahmed Akram</h1>
          </motion.div>
          <motion.p
            className="hero-role"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
          >
            AI Solutions Engineer <span /> Architect <span /> Dubai, UAE
          </motion.p>
          <motion.div
            className="hero-specialty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.38 }}
          >
            <span className="hero-lead">I design and ship</span>
            <span className="hero-word-window">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[wordIndex]}
                  className="hero-word"
                  initial={reduceMotion ? false : { y: "108%", rotateX: -54, opacity: 0.4 }}
                  animate={{ y: 0, rotateX: 0, opacity: 1 }}
                  exit={reduceMotion ? undefined : { y: "-108%", rotateX: 54, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {words[wordIndex]}.
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>
          <motion.p
            className="hero-summary"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Shipped with enterprise discipline — orchestration, evaluation,
            security, and observability designed in from day one.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.52 }}
          >
            <Link href="/architecture" className="hero-pill hero-pill-solid">
              Explore architecture <span aria-hidden>↗</span>
            </Link>
            <Link href="/lab" className="hero-pill hero-pill-ghost">
              Enter the lab <span aria-hidden>↗</span>
            </Link>
          </motion.div>
        </motion.div>

        <div className="hero-status">
          <span><i /> Available for selected systems</span>
          <span className="hero-scroll-cue">Scroll to enter orbit ↓</span>
        </div>
      </section>
    </>
  );
}
