/* The Dispatch — data layer.
   The hero schematic plays a scripted, deterministic trace of a request
   moving through a multi-agent control plane. No API calls, no randomness:
   the architecture is the point. This module is pure so the timeline can
   be unit-tested and the reduced-motion frame derived from the same data. */

export type NodeId =
  | "gateway"
  | "auth"
  | "planner"
  | "research"
  | "synthesis"
  | "critique"
  | "evalGate"
  | "response";

export type TraceKind = "main" | "fanout" | "loop";

export interface TraceEvent {
  /** ms from run start at which the node activates and annotates */
  at: number;
  node: NodeId;
  annotation: string;
  kind: TraceKind;
}

export interface TraceLeg {
  from: NodeId;
  to: NodeId;
  start: number;
  end: number;
  kind: TraceKind;
}

export const NODE_LABELS: Record<NodeId, string> = {
  gateway: "GATEWAY",
  auth: "IDENTITY · OIDC",
  planner: "PLANNER",
  research: "RESEARCH",
  synthesis: "SYNTHESIS",
  critique: "CRITIQUE",
  evalGate: "EVAL GATE",
  response: "200 ▸",
};

export const TRACE_EVENTS: TraceEvent[] = [
  { at: 0, node: "gateway", annotation: "POST /dispatch · rate-limit OK", kind: "main" },
  { at: 520, node: "auth", annotation: "token verified · scope: agent.dispatch", kind: "main" },
  { at: 1100, node: "planner", annotation: "task decomposed → 3 subtasks", kind: "main" },
  { at: 1750, node: "research", annotation: "retrieval · sources ranked", kind: "fanout" },
  { at: 1750, node: "synthesis", annotation: "drafting · streaming tokens", kind: "fanout" },
  { at: 1750, node: "critique", annotation: "reviewing draft against spec", kind: "fanout" },
  { at: 2750, node: "synthesis", annotation: "revision requested · loop ×1", kind: "loop" },
  { at: 3700, node: "evalGate", annotation: "eval: PASS · score 0.92", kind: "main" },
  { at: 4150, node: "response", annotation: "200 OK · dispatch complete", kind: "main" },
];

export const TRACE_LEGS: TraceLeg[] = [
  { from: "gateway", to: "auth", start: 120, end: 520, kind: "main" },
  { from: "auth", to: "planner", start: 700, end: 1100, kind: "main" },
  { from: "planner", to: "research", start: 1300, end: 1750, kind: "fanout" },
  { from: "planner", to: "synthesis", start: 1300, end: 1750, kind: "fanout" },
  { from: "planner", to: "critique", start: 1300, end: 1750, kind: "fanout" },
  { from: "critique", to: "synthesis", start: 2350, end: 2750, kind: "loop" },
  { from: "research", to: "evalGate", start: 3300, end: 3700, kind: "fanout" },
  { from: "synthesis", to: "evalGate", start: 3300, end: 3700, kind: "main" },
  { from: "critique", to: "evalGate", start: 3300, end: 3700, kind: "fanout" },
  { from: "evalGate", to: "response", start: 3850, end: 4150, kind: "main" },
];

/** trace duration incl. settle at the end */
export const TRACE_END = 4400;

export interface Point {
  x: number;
  y: number;
}

/** Position along a polyline at normalized progress t ∈ [0,1]. */
export function polylineAt(points: Point[], t: number): Point {
  if (points.length === 0) throw new Error("polylineAt: empty polyline");
  if (points.length === 1 || t <= 0) return points[0];
  if (t >= 1) return points[points.length - 1];

  const segLengths: number[] = [];
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const d = Math.hypot(
      points[i].x - points[i - 1].x,
      points[i].y - points[i - 1].y,
    );
    segLengths.push(d);
    total += d;
  }
  let target = t * total;
  for (let i = 0; i < segLengths.length; i++) {
    if (target <= segLengths[i] || i === segLengths.length - 1) {
      const f = segLengths[i] === 0 ? 0 : target / segLengths[i];
      return {
        x: points[i].x + (points[i + 1].x - points[i].x) * f,
        y: points[i].y + (points[i + 1].y - points[i].y) * f,
      };
    }
    target -= segLengths[i];
  }
  return points[points.length - 1];
}

/** Events that have fired by `elapsed` ms. */
export function eventsAt(elapsed: number): TraceEvent[] {
  return TRACE_EVENTS.filter((e) => e.at <= elapsed);
}

/** Legs in flight at `elapsed` ms, with normalized progress. */
export function legsAt(
  elapsed: number,
): { leg: TraceLeg; progress: number }[] {
  return TRACE_LEGS.filter(
    (l) => elapsed >= l.start && elapsed <= l.end,
  ).map((leg) => ({
    leg,
    progress: (elapsed - leg.start) / (leg.end - leg.start),
  }));
}
