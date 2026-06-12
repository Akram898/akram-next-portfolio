"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  NODE_LABELS,
  TRACE_END,
  TRACE_EVENTS,
  eventsAt,
  legsAt,
  polylineAt,
  type NodeId,
  type Point,
  type TraceKind,
} from "@/lib/dispatch";

/* ── Geometry ──────────────────────────────────────────── */

interface NodeBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Layout {
  viewBox: string;
  nodes: Record<NodeId, NodeBox>;
  edges: { from: NodeId; to: NodeId; points: Point[]; kind: TraceKind }[];
  /* annotation anchor + text-anchor per node (desktop only) */
  notes: Partial<Record<NodeId, { x: number; y: number; anchor: "start" | "end" }>>;
  fontSize: number;
}

const DESKTOP: Layout = {
  viewBox: "0 0 880 400",
  fontSize: 11,
  nodes: {
    gateway: { x: 8, y: 178, w: 110, h: 44 },
    auth: { x: 150, y: 178, w: 110, h: 44 },
    planner: { x: 310, y: 178, w: 110, h: 44 },
    research: { x: 480, y: 48, w: 110, h: 44 },
    synthesis: { x: 480, y: 178, w: 110, h: 44 },
    critique: { x: 480, y: 308, w: 110, h: 44 },
    evalGate: { x: 656, y: 178, w: 110, h: 44 },
    response: { x: 800, y: 178, w: 72, h: 44 },
  },
  edges: [
    { from: "gateway", to: "auth", kind: "main", points: [{ x: 118, y: 200 }, { x: 150, y: 200 }] },
    { from: "auth", to: "planner", kind: "main", points: [{ x: 260, y: 200 }, { x: 310, y: 200 }] },
    { from: "planner", to: "research", kind: "fanout", points: [{ x: 420, y: 200 }, { x: 450, y: 200 }, { x: 450, y: 70 }, { x: 480, y: 70 }] },
    { from: "planner", to: "synthesis", kind: "main", points: [{ x: 420, y: 200 }, { x: 480, y: 200 }] },
    { from: "planner", to: "critique", kind: "fanout", points: [{ x: 420, y: 200 }, { x: 450, y: 200 }, { x: 450, y: 330 }, { x: 480, y: 330 }] },
    { from: "critique", to: "synthesis", kind: "loop", points: [{ x: 535, y: 308 }, { x: 535, y: 222 }] },
    { from: "research", to: "evalGate", kind: "fanout", points: [{ x: 590, y: 70 }, { x: 626, y: 70 }, { x: 626, y: 200 }, { x: 656, y: 200 }] },
    { from: "synthesis", to: "evalGate", kind: "main", points: [{ x: 590, y: 200 }, { x: 656, y: 200 }] },
    { from: "critique", to: "evalGate", kind: "fanout", points: [{ x: 590, y: 330 }, { x: 626, y: 330 }, { x: 626, y: 200 }, { x: 656, y: 200 }] },
    { from: "evalGate", to: "response", kind: "main", points: [{ x: 766, y: 200 }, { x: 800, y: 200 }] },
  ],
  notes: {
    gateway: { x: 8, y: 246, anchor: "start" },
    auth: { x: 150, y: 266, anchor: "start" },
    planner: { x: 310, y: 246, anchor: "start" },
    research: { x: 480, y: 36, anchor: "start" },
    synthesis: { x: 480, y: 170, anchor: "start" },
    critique: { x: 480, y: 376, anchor: "start" },
    evalGate: { x: 656, y: 246, anchor: "start" },
    response: { x: 872, y: 266, anchor: "end" },
  },
};

const MOBILE: Layout = {
  viewBox: "0 0 360 470",
  fontSize: 12,
  nodes: {
    gateway: { x: 128, y: 12, w: 104, h: 40 },
    auth: { x: 128, y: 84, w: 104, h: 40 },
    planner: { x: 128, y: 156, w: 104, h: 40 },
    research: { x: 12, y: 248, w: 104, h: 40 },
    synthesis: { x: 128, y: 248, w: 104, h: 40 },
    critique: { x: 244, y: 248, w: 104, h: 40 },
    evalGate: { x: 128, y: 340, w: 104, h: 40 },
    response: { x: 144, y: 412, w: 72, h: 40 },
  },
  edges: [
    { from: "gateway", to: "auth", kind: "main", points: [{ x: 180, y: 52 }, { x: 180, y: 84 }] },
    { from: "auth", to: "planner", kind: "main", points: [{ x: 180, y: 124 }, { x: 180, y: 156 }] },
    { from: "planner", to: "research", kind: "fanout", points: [{ x: 180, y: 196 }, { x: 180, y: 222 }, { x: 64, y: 222 }, { x: 64, y: 248 }] },
    { from: "planner", to: "synthesis", kind: "main", points: [{ x: 180, y: 196 }, { x: 180, y: 248 }] },
    { from: "planner", to: "critique", kind: "fanout", points: [{ x: 180, y: 196 }, { x: 180, y: 222 }, { x: 296, y: 222 }, { x: 296, y: 248 }] },
    { from: "critique", to: "synthesis", kind: "loop", points: [{ x: 244, y: 278 }, { x: 232, y: 278 }] },
    { from: "research", to: "evalGate", kind: "fanout", points: [{ x: 64, y: 288 }, { x: 64, y: 314 }, { x: 180, y: 314 }, { x: 180, y: 340 }] },
    { from: "synthesis", to: "evalGate", kind: "main", points: [{ x: 180, y: 288 }, { x: 180, y: 340 }] },
    { from: "critique", to: "evalGate", kind: "fanout", points: [{ x: 296, y: 288 }, { x: 296, y: 314 }, { x: 180, y: 314 }, { x: 180, y: 340 }] },
    { from: "evalGate", to: "response", kind: "main", points: [{ x: 180, y: 380 }, { x: 180, y: 412 }] },
  ],
  notes: {},
};

/* ── Component ─────────────────────────────────────────── */

export default function Dispatch() {
  const reduced = useReducedMotion();
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const raf = useRef(0);
  const startAt = useRef(0);

  const run = useCallback(() => {
    if (reduced) {
      setElapsed(TRACE_END);
      setHasRun(true);
      return;
    }
    cancelAnimationFrame(raf.current);
    setHasRun(true);
    setRunning(true);
    startAt.current = performance.now();
    const tick = (now: number) => {
      const t = now - startAt.current;
      if (t >= TRACE_END) {
        setElapsed(TRACE_END);
        setRunning(false);
        return;
      }
      setElapsed(t);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [reduced]);

  /* one auto-run as the page-load sequence */
  useEffect(() => {
    if (reduced) {
      setElapsed(TRACE_END);
      setHasRun(true);
      return;
    }
    const t = setTimeout(run, 900);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf.current);
    };
  }, [reduced, run]);

  const fired = eventsAt(hasRun ? elapsed : -1);
  const inFlight = running ? legsAt(elapsed) : [];
  const activeNodes = new Set(fired.map((e) => e.node));
  const counter = Math.min(Math.round(elapsed), 4150);

  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
      <figcaption className="flex items-center justify-between gap-2 border-b border-line px-3 py-2 sm:px-4">
        <span className="label">
          Dispatch trace
          <span className="hidden sm:inline"> · simulated · deterministic</span>
        </span>
        <span className="flex items-center gap-3">
          <span
            className="label whitespace-nowrap tabular-nums !text-ink"
            aria-label={`Trace time ${counter} milliseconds`}
          >
            t = {String(counter).padStart(4, "0")} ms
          </span>
          <button
            type="button"
            onClick={run}
            disabled={running}
            className="label whitespace-nowrap rounded-full border border-line px-3 py-1.5 !text-ink transition-colors duration-150 hover:border-trace hover:!text-trace disabled:opacity-40"
          >
            {running ? "RUNNING" : hasRun ? "RUN AGAIN ▷" : "RUN ▷"}
          </button>
        </span>
      </figcaption>

      <div className="hidden p-2 sm:block">
        <Schematic layout={DESKTOP} fired={fired} inFlight={inFlight} activeNodes={activeNodes} />
      </div>
      <div className="p-2 sm:hidden">
        <Schematic layout={MOBILE} fired={fired} inFlight={inFlight} activeNodes={activeNodes} />
      </div>

      {/* trace log: the annotations as text — visible on mobile,
          screen-reader-only on desktop */}
      <ol className="space-y-1 border-t border-line px-3 py-3 sm:sr-only" aria-label="Dispatch trace log">
        {(hasRun ? fired : []).map((e, i) => (
          <li
            key={`${e.node}-${e.at}-${i}`}
            className={`font-mono text-[11px] leading-relaxed ${e.kind === "loop" ? "text-signal" : "text-dim"}`}
          >
            <span className="tabular-nums">[{(e.at / 1000).toFixed(2)}s]</span>{" "}
            {NODE_LABELS[e.node].toLowerCase()} — {e.annotation}
          </li>
        ))}
        {!hasRun && (
          <li className="font-mono text-[11px] text-dim">
            awaiting dispatch — press RUN
          </li>
        )}
      </ol>
    </figure>
  );
}

/* ── SVG renderer (shared by both layouts) ─────────────── */

function Schematic({
  layout,
  fired,
  inFlight,
  activeNodes,
}: {
  layout: Layout;
  fired: ReturnType<typeof eventsAt>;
  inFlight: ReturnType<typeof legsAt>;
  activeNodes: Set<NodeId>;
}) {
  const edgeOf = (from: NodeId, to: NodeId) =>
    layout.edges.find((e) => e.from === from && e.to === to);

  /* latest annotation per node wins (the loop overwrites synthesis) */
  const noteByNode = new Map<NodeId, { text: string; kind: TraceKind }>();
  for (const e of fired) noteByNode.set(e.node, { text: e.annotation, kind: e.kind });

  return (
    <svg
      viewBox={layout.viewBox}
      role="img"
      aria-label="Schematic of a multi-agent control plane: a request passes the gateway, is verified by an OIDC identity service, decomposed by a planner into research, synthesis and critique agents, revised once after critique, then released through an evaluation gate as a successful response."
      className="block h-auto w-full"
    >
      <defs>
        <marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--trace)" opacity="0.7" />
        </marker>
      </defs>

      {/* edges */}
      {layout.edges.map((e, i) => (
        <polyline
          key={i}
          points={e.points.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke={e.kind === "loop" ? "var(--signal)" : "var(--trace)"}
          strokeWidth="1.5"
          strokeDasharray={e.kind === "loop" ? "4 4" : undefined}
          opacity={e.kind === "loop" ? 0.9 : 0.55}
          markerEnd={e.kind === "loop" ? undefined : "url(#arr)"}
        />
      ))}

      {/* nodes */}
      {(Object.keys(layout.nodes) as NodeId[]).map((id) => {
        const n = layout.nodes[id];
        const active = activeNodes.has(id);
        return (
          <g key={id}>
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              rx="2"
              fill="var(--paper)"
              stroke={active ? "var(--trace)" : "var(--line)"}
              strokeWidth={active ? 1.5 : 1}
              style={{ transition: "stroke 160ms ease-out" }}
            />
            <text
              x={n.x + n.w / 2}
              y={n.y + n.h / 2 + layout.fontSize / 3}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize={layout.fontSize}
              letterSpacing="0.06em"
              fill={active ? "var(--ink)" : "var(--dim)"}
              style={{ transition: "fill 160ms ease-out" }}
            >
              {NODE_LABELS[id]}
            </text>
          </g>
        );
      })}

      {/* annotations (desktop layout only), haloed to knock out linework */}
      {Object.entries(layout.notes).map(([id, pos]) => {
        const note = noteByNode.get(id as NodeId);
        return (
          <text
            key={id}
            x={pos.x}
            y={pos.y}
            textAnchor={pos.anchor}
            fontFamily="var(--font-mono)"
            fontSize={layout.fontSize}
            fill={note?.kind === "loop" ? "var(--signal)" : "var(--dim)"}
            stroke="var(--surface)"
            strokeWidth="4"
            paintOrder="stroke"
            strokeLinejoin="round"
            opacity={note ? 1 : 0}
            style={{ transition: "opacity 450ms cubic-bezier(0.22,1,0.36,1)" }}
            aria-hidden
          >
            {note?.text ?? ""}
          </text>
        );
      })}

      {/* pulses in flight */}
      {inFlight.map(({ leg, progress }, i) => {
        const edge = edgeOf(leg.from, leg.to);
        if (!edge) return null;
        const p = polylineAt(edge.points, progress);
        return (
          <g key={`${leg.from}-${leg.to}-${i}`}>
            <circle cx={p.x} cy={p.y} r="9" fill="var(--signal)" opacity="0.25" />
            <circle cx={p.x} cy={p.y} r="3.5" fill="var(--signal)" />
          </g>
        );
      })}
    </svg>
  );
}
