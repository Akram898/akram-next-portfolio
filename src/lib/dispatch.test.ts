import {
  NODE_LABELS,
  TRACE_END,
  TRACE_EVENTS,
  TRACE_LEGS,
  eventsAt,
  legsAt,
  polylineAt,
} from "./dispatch";

describe("trace script integrity", () => {
  it("events are in chronological order", () => {
    for (let i = 1; i < TRACE_EVENTS.length; i++) {
      expect(TRACE_EVENTS[i].at).toBeGreaterThanOrEqual(
        TRACE_EVENTS[i - 1].at,
      );
    }
  });

  it("every event and leg references a labeled node", () => {
    for (const e of TRACE_EVENTS) expect(NODE_LABELS[e.node]).toBeDefined();
    for (const l of TRACE_LEGS) {
      expect(NODE_LABELS[l.from]).toBeDefined();
      expect(NODE_LABELS[l.to]).toBeDefined();
    }
  });

  it("each leg arrives exactly when its destination event fires", () => {
    for (const leg of TRACE_LEGS) {
      const arrival = TRACE_EVENTS.find(
        (e) => e.node === leg.to && e.at === leg.end,
      );
      expect(arrival).toBeDefined();
    }
  });

  it("legs end after they start, inside the trace window", () => {
    for (const l of TRACE_LEGS) {
      expect(l.end).toBeGreaterThan(l.start);
      expect(l.end).toBeLessThanOrEqual(TRACE_END);
    }
  });

  it("contains exactly one critique loop", () => {
    expect(TRACE_EVENTS.filter((e) => e.kind === "loop")).toHaveLength(1);
    expect(TRACE_LEGS.filter((l) => l.kind === "loop")).toHaveLength(1);
  });

  it("the trace terminates at the response node", () => {
    const last = TRACE_EVENTS[TRACE_EVENTS.length - 1];
    expect(last.node).toBe("response");
    expect(last.at).toBeLessThan(TRACE_END);
  });
});

describe("eventsAt / legsAt", () => {
  it("returns nothing before the run starts", () => {
    expect(eventsAt(-1)).toHaveLength(0);
  });

  it("returns the full script at the end of the trace", () => {
    expect(eventsAt(TRACE_END)).toHaveLength(TRACE_EVENTS.length);
  });

  it("reports in-flight legs with normalized progress", () => {
    const mid = (TRACE_LEGS[0].start + TRACE_LEGS[0].end) / 2;
    const flights = legsAt(mid);
    expect(flights.length).toBeGreaterThan(0);
    for (const f of flights) {
      expect(f.progress).toBeGreaterThanOrEqual(0);
      expect(f.progress).toBeLessThanOrEqual(1);
    }
  });
});

describe("polylineAt", () => {
  const line = [
    { x: 0, y: 0 },
    { x: 10, y: 0 },
    { x: 10, y: 10 },
  ];

  it("clamps to endpoints", () => {
    expect(polylineAt(line, -0.5)).toEqual({ x: 0, y: 0 });
    expect(polylineAt(line, 2)).toEqual({ x: 10, y: 10 });
  });

  it("interpolates across segment boundaries by arc length", () => {
    expect(polylineAt(line, 0.5)).toEqual({ x: 10, y: 0 });
    expect(polylineAt(line, 0.25)).toEqual({ x: 5, y: 0 });
    expect(polylineAt(line, 0.75)).toEqual({ x: 10, y: 5 });
  });

  it("throws on an empty polyline", () => {
    expect(() => polylineAt([], 0.5)).toThrow();
  });
});
