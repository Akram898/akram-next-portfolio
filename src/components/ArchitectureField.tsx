"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Mode = "agents" | "mlops" | "identity";

const modes: Record<
  Mode,
  {
    label: string;
    code: string;
    title: string;
    detail: string;
    nodes: string[];
    path: string;
  }
> = {
  agents: {
    label: "Agent runtime",
    code: "RUN / 01",
    title: "Orchestrate judgment.",
    detail: "Planner, specialists, scoped tools, eval gate.",
    nodes: ["INPUT", "PLANNER", "RESEARCH", "CRITIC", "EVAL", "ACTION"],
    path: "M52 220 C118 220 105 93 190 93 S265 220 338 220 S395 93 480 93 S548 220 620 220",
  },
  mlops: {
    label: "Model lifecycle",
    code: "RUN / 02",
    title: "Operate the model.",
    detail: "Observe, detect drift, retrain, promote.",
    nodes: ["TRAFFIC", "MONITOR", "DRIFT", "TRAIN", "REGISTRY", "DEPLOY"],
    path: "M52 220 C130 220 115 220 190 220 S270 93 338 93 S406 220 480 220 S548 93 620 93",
  },
  identity: {
    label: "Identity plane",
    code: "RUN / 03",
    title: "Trust every request.",
    detail: "OIDC, policy, token exchange, API boundary.",
    nodes: ["CLIENT", "GATEWAY", "OIDC", "POLICY", "TOKEN", "API"],
    path: "M52 93 C126 93 116 220 190 220 S266 93 338 93 S406 220 480 220 S548 220 620 220",
  },
};

const positions = [
  { x: 52, y: 220 },
  { x: 190, y: 93 },
  { x: 190, y: 220 },
  { x: 338, y: 220 },
  { x: 480, y: 93 },
  { x: 620, y: 220 },
];

export default function ArchitectureField() {
  const [mode, setMode] = useState<Mode>("agents");
  const reduceMotion = useReducedMotion();
  const active = modes[mode];

  return (
    <div className="architecture-field" aria-label="Interactive systems architecture">
      <div className="field-topline">
        <span>{active.code}</span>
        <span className="field-live"><i /> SYSTEM ONLINE</span>
      </div>

      <div className="field-copy" aria-live="polite">
        <p>{active.title}</p>
        <span>{active.detail}</span>
      </div>

      <svg viewBox="0 0 672 300" role="img" aria-label={`${active.label} architecture diagram`}>
        <defs>
          <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="var(--line)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="672" height="300" fill="url(#grid)" />
        <path className="field-path-base" d={active.path} />
        <motion.path
          key={mode}
          className="field-path-active"
          d={active.path}
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        {positions.map((position, index) => (
          <g key={`${mode}-${active.nodes[index]}`}>
            <motion.circle
              cx={position.x}
              cy={position.y}
              r="18"
              className={index === 1 || index === 4 ? "field-node active" : "field-node"}
              initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.06 }}
            />
            <text x={position.x} y={position.y + 38} textAnchor="middle">
              {active.nodes[index]}
            </text>
          </g>
        ))}
      </svg>

      <div className="field-switcher" role="tablist" aria-label="Architecture modes">
        {(Object.keys(modes) as Mode[]).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={mode === key}
            onClick={() => setMode(key)}
          >
            <span>0{Object.keys(modes).indexOf(key) + 1}</span>
            {modes[key].label}
          </button>
        ))}
      </div>
    </div>
  );
}
