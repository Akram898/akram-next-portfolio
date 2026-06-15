"use client";

import { motion } from "framer-motion";

/* Scroll reveal: 16px rise + fade, GPU-only properties.
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
