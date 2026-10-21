"use client";

import { motion } from "framer-motion";

/* Visible in server HTML, with a 16px rise + fade on entering the viewport.
   prefers-reduced-motion is handled in CSS (globals.css forces
   [data-reveal] to its final frame), which avoids any server/client
   branch and the hydration mismatch that comes with it. */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={false}
      whileInView={{ opacity: [0, 1], y: [16, 0] }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: Math.min(delay, 0.2), ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
