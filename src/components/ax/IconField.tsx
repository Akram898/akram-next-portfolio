"use client";

import { motion, useReducedMotion, useTransform, type MotionStyle, type MotionValue } from "framer-motion";
import type { HeroTile } from "../brandIcons";

function Glyph({ tile }: { tile: HeroTile }) {
  const gradientId = `ax-grad-${tile.id}`;
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false">
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

function Tile({
  tile,
  index,
  px,
  py,
  warp,
}: {
  tile: HeroTile;
  index: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
  warp?: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const zero = useTransform(px, () => 0);
  const w = warp ?? zero;
  /* Pointer parallax plus scroll warp: tiles drift outward from the centre and fade as
     the section leaves. With reduced motion every value stays at rest. The style object
     is the same on server and client either way, so hydration matches. */
  const x = useTransform([px, w], ([p, k]: number[]) =>
    reduce ? 0 : p * 60 * tile.depth + k * (tile.x - 50) * 8 * tile.depth);
  const y = useTransform([py, w], ([p, k]: number[]) =>
    reduce ? 0 : p * 44 * tile.depth + k * ((tile.y - 50) * 6 * tile.depth - 120 * tile.depth));
  const opacity = useTransform(w, (k) => (reduce ? 1 : Math.max(0, 1 - k / 0.8)));

  return (
    <motion.div
      className="ax-tile"
      style={{
        insetInlineStart: `${tile.x}%`,
        top: `${tile.y}%`,
        x,
        y,
        opacity,
        "--tile-scale": tile.size,
        "--tile-bg": tile.bg,
        "--tile-glow": tile.glow ?? "rgba(0, 0, 0, 0.45)",
      } as MotionStyle}
      initial={{ scale: 0.4, rotate: index % 2 ? 14 : -14 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 14, delay: 0.25 + index * 0.06 }}
    >
      <motion.span
        className="ax-tile-body"
        title={tile.title}
        animate={reduce ? undefined : { y: [0, -10 - (index % 4) * 2, 0], rotate: [0, index % 2 ? 3 : -3, 0] }}
        transition={{
          y: { duration: 4.4 + (index % 5) * 0.5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 5.6 + (index % 4) * 0.6, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <Glyph tile={tile} />
      </motion.span>
    </motion.div>
  );
}

export default function IconField({
  tiles,
  px,
  py,
  warp,
  className = "",
}: {
  tiles: HeroTile[];
  px: MotionValue<number>;
  py: MotionValue<number>;
  warp?: MotionValue<number>;
  className?: string;
}) {
  return (
    <div className={`ax-field ${className}`} aria-hidden>
      {tiles.map((tile, i) => (
        <Tile key={tile.id} tile={tile} index={i} px={px} py={py} warp={warp} />
      ))}
    </div>
  );
}
