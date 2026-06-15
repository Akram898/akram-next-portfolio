/* Case-file mini-schematics — static SVG, drawn in the same linework
   language as The Dispatch. Server-rendered, zero JS. */

function DBox({
  x,
  y,
  w = 92,
  h = 32,
  label,
  accent = false,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="2"
        fill="var(--paper)"
        stroke={accent ? "var(--trace)" : "var(--line)"}
        strokeWidth={accent ? 1.5 : 1}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 3.5}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="0.05em"
        fill={accent ? "var(--ink)" : "var(--dim)"}
      >
        {label}
      </text>
    </g>
  );
}

function DEdge({
  d,
  dashed = false,
  signal = false,
}: {
  d: string;
  dashed?: boolean;
  signal?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={signal ? "var(--signal)" : "var(--trace)"}
      strokeWidth="1.2"
      strokeDasharray={dashed ? "4 4" : undefined}
      opacity={signal ? 0.9 : 0.55}
      markerEnd={signal ? "url(#darr-s)" : "url(#darr)"}
    />
  );
}

function Frame({
  label,
  children,
  viewBox = "0 0 380 150",
}: {
  label: string;
  children: React.ReactNode;
  viewBox?: string;
}) {
  return (
    <svg viewBox={viewBox} role="img" aria-label={label} className="block h-auto w-full">
      <defs>
        <marker id="darr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--trace)" opacity="0.7" />
        </marker>
        <marker id="darr-s" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--signal)" opacity="0.9" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

export function IdentityDiagram() {
  return (
    <Frame label="Schematic: web, mobile and partner channels authenticate through one OIDC identity provider, exchanging tokens before reaching the APIs.">
      <DBox x={8} y={10} label="WEB" />
      <DBox x={8} y={59} label="MOBILE" />
      <DBox x={8} y={108} label="PARTNER" />
      <DEdge d="M100,26 H126 V63 H144" />
      <DEdge d="M100,75 H144" />
      <DEdge d="M100,124 H126 V87 H144" />
      <DBox x={144} y={59} w={100} label="IDP · OIDC" accent />
      <DEdge d="M244,75 H272" />
      <DBox x={272} y={59} w={100} label="TOKEN → APIS" />
    </Frame>
  );
}

export function ApiDiagram() {
  return (
    <Frame label="Schematic: clients call a GraphQL gateway that fans out to profile, preference and loyalty microservices backed by Couchbase and a cache tier.">
      <DBox x={8} y={59} label="CLIENTS" />
      <DEdge d="M100,75 H128" />
      <DBox x={128} y={59} w={96} label="GRAPHQL GW" accent />
      <DEdge d="M224,75 H244 V26 H264" />
      <DEdge d="M224,75 H264" />
      <DEdge d="M224,75 H244 V124 H264" />
      <DBox x={264} y={10} w={106} label="PROFILE SVC" />
      <DBox x={264} y={59} w={106} label="PREFS SVC" />
      <DBox x={264} y={108} w={106} label="CACHE · KV" />
    </Frame>
  );
}

export function AgentsDiagram() {
  return (
    <Frame label="Schematic: a scheduled trigger reaches a planner that drives specialist agents through MCP tools, with an evaluation step before any external action, all audited.">
      <DBox x={8} y={59} label="CRON / EVENT" />
      <DEdge d="M100,75 H126" />
      <DBox x={126} y={59} w={88} label="PLANNER" accent />
      <DEdge d="M214,75 H240" />
      <DBox x={240} y={59} w={88} label="MCP TOOLS" />
      <DEdge d="M284,59 V36 H214" dashed signal />
      <DBox x={126} y={10} w={88} label="EVALS" />
      <DEdge d="M284,91 V124 H264" />
      <DBox x={156} y={108} w={108} label="AUDIT LOG" />
    </Frame>
  );
}

export function MlopsDiagram() {
  return (
    <Frame label="Schematic: live traffic is watched by a drift monitor; detected drift triggers a CI retraining run that versions the model into a registry and redeploys, closing the loop.">
      <DBox x={8} y={59} label="LIVE TRAFFIC" />
      <DEdge d="M100,75 H126" />
      <DBox x={126} y={59} w={110} label="DRIFT · PSI/KS" accent />
      <DEdge d="M236,75 H262" signal />
      <DBox x={262} y={59} w={108} label="RETRAIN · CI" />
      <DEdge d="M316,91 V124 H246" />
      <DBox x={136} y={108} w={110} label="REGISTRY vN+1" />
      <DEdge d="M136,124 H110 V91" dashed />
    </Frame>
  );
}
