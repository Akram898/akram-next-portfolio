"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import heroPortrait from "../../public/ahmed-hero-cinematic.png";

const notes = [
  { label: "MCP", note: "TOOLS", x: 24, y: 44, depth: 1.5, tone: "blue" },
  { label: "RAG", note: "CONTEXT", x: 42, y: 26, depth: 1.8, tone: "light" },
  { label: "CI/CD", note: "SHIP", x: 62, y: 22, depth: 0.7, tone: "dark" },
  { label: "OIDC", note: "TRUST", x: 73, y: 78, depth: 1.25, tone: "violet" },
  { label: "EVALS", note: "PROOF", x: 85, y: 36, depth: 1.3, tone: "sand" },
  { label: "n8n", note: "FLOW", x: 90, y: 62, depth: 1.8, tone: "orange" },
];

function FloatingNote({
  item,
  index,
  pointerX,
  pointerY,
}: {
  item: (typeof notes)[number];
  index: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();
  const x = useTransform(pointerX, [-0.5, 0.5], [-22 * item.depth, 22 * item.depth]);
  const y = useTransform(pointerY, [-0.5, 0.5], [-17 * item.depth, 17 * item.depth]);
  const rotateX = useTransform(pointerY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(pointerX, [-0.5, 0.5], [-11, 11]);

  return (
    <motion.div
      className={`tech-orbit tech-${item.tone}`}
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        x: reduceMotion ? 0 : x,
        y: reduceMotion ? 0 : y,
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
      }}
      initial={{ opacity: 0, scale: 0.45 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        translateY: reduceMotion ? 0 : [0, -8 - index, 0],
        rotateZ: reduceMotion ? 0 : [0, index % 2 ? 2 : -2, 0],
      }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{
        opacity: { delay: 0.3 + index * 0.08, duration: 0.55 },
        scale: { delay: 0.3 + index * 0.08, duration: 0.7 },
        translateY: {
          duration: 4.5 + index * 0.28,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotateZ: {
          duration: 5.5 + index * 0.25,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <span>{item.note}</span>
      <strong>{item.label}</strong>
      <i aria-hidden />
    </motion.div>
  );
}

export default function PortraitSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 22 });
  const reduceMotion = useReducedMotion();

  /* Entrance: the whole frame scales open as it reaches the viewport. */
  const enter = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.18"],
  });
  const frameScale = useTransform(enter.scrollYProgress, [0, 1], [0.9, 1]);
  const frameRadius = useTransform(enter.scrollYProgress, [0, 1], [48, 0]);

  /* Exit: portrait and copy drift at different speeds while leaving. */
  const exit = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(exit.scrollYProgress, [0, 1], ["0%", "14%"]);
  const galaxyRotate = useTransform(exit.scrollYProgress, [0, 1], [0, 18]);
  const copyY = useTransform(exit.scrollYProgress, [0, 1], ["0%", "28%"]);
  const galaxyX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const galaxyY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      ref={sectionRef}
      className="cinematic-hero"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <motion.div
        className="cinematic-frame"
        style={{
          scale: reduceMotion ? 1 : frameScale,
          borderRadius: reduceMotion ? 0 : frameRadius,
        }}
      >
        <motion.div className="hero-portrait" style={{ y: reduceMotion ? 0 : portraitY }}>
          <Image
            src={heroPortrait}
            alt="Ahmed Akram, AI Solutions Engineer and Architect"
            fill
            sizes="100vw"
            quality={92}
          />
        </motion.div>

        <div className="hero-vignette" />
        <div className="hero-grid-lines" aria-hidden />
        <div className="galaxy-haze galaxy-haze-a" aria-hidden />
        <div className="galaxy-haze galaxy-haze-b" aria-hidden />

        <motion.div
          className="ai-galaxy"
          aria-hidden
          style={{
            rotate: reduceMotion ? 0 : galaxyRotate,
            x: reduceMotion ? 0 : galaxyX,
            y: reduceMotion ? 0 : galaxyY,
          }}
        >
          <span className="galaxy-ring galaxy-ring-one" />
          <span className="galaxy-ring galaxy-ring-two" />
          <span className="galaxy-ring galaxy-ring-three" />
          <span className="galaxy-core"><b>AI</b><i /></span>
          <span className="orbit-satellite satellite-one">01</span>
          <span className="orbit-satellite satellite-two">02</span>
          <span className="orbit-satellite satellite-three">03</span>
        </motion.div>

        <motion.div className="hero-copy" style={{ y: reduceMotion ? 0 : copyY }}>
          <motion.p
            className="hero-overline"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.55 }}
          >
            The operator <span /> behind the stack
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Engineer.
            <br />
            Architect.
            <br />
            <span className="hero-accent">I ship agent runtimes.</span>
          </motion.h2>
          <motion.p
            className="hero-summary"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Applied AI, multi-agent platforms, and MLOps pipelines built with
            enterprise discipline.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/architecture" className="hero-cta">
              See how the systems fit together <span aria-hidden>↗</span>
            </Link>
          </motion.div>
        </motion.div>

        <div className="technology-field" aria-hidden>
          {notes.map((item, index) => (
            <FloatingNote
              key={item.label}
              item={item}
              index={index}
              pointerX={smoothX}
              pointerY={smoothY}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
