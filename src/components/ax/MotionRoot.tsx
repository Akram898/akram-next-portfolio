"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/* Visitors who ask for reduced motion get no movement (transforms jump to their end),
   while server and client still render the same markup. */
export default function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
