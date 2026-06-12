import Reveal from "../Reveal";
import Sheet from "../Sheet";
import TitleBlock from "../TitleBlock";
import { site } from "@/lib/site";

const projects = [
  {
    name: "agent-orchestra",
    domain: "AI · Agents",
    claim:
      "Give it a task; a planner decomposes it and routes subtasks to researcher, writer and critic agents — and the graph streams its thinking live. Provider-agnostic: Anthropic, OpenAI, Gemini, OpenRouter.",
    stack: "Next.js · server-side LLM layer · streaming UI",
  },
  {
    name: "drift-watch",
    domain: "ML · MLOps",
    claim:
      "Trains a scikit-learn model, injects drift into simulated production traffic, detects it with PSI/KS tests, retrains automatically, and versions every model in a registry view. CI runs tests and training.",
    stack: "Python · scikit-learn · GitHub Actions",
  },
  {
    name: "prompt-sentinel",
    domain: "AI Security",
    claim:
      "A defensive firewall for LLM apps: layered heuristics plus an LLM judge screen inputs and outputs for injection attempts, PII leakage and unsafe content — risk-scored audit log, eval scorecard.",
    stack: "Next.js · heuristics + LLM judge · eval suite",
  },
  {
    name: "api-blueprint",
    domain: "Architecture",
    claim:
      "An interactive system-design walkthrough of a global identity & loyalty API: click any node — gateway, OAuth, cache, queue — for the decision and its trade-offs, backed by a live, instrumented demo endpoint.",
    stack: "Next.js · interactive diagram · rate-limited API",
  },
];

export default function Lab() {
  return (
    <Sheet id="lab" kicker="AI lab" title="Open, runnable proof">
      <p className="max-w-2xl text-dim">
        Four small systems — each its own repository, each deployable, each
        built to be read as much as run.
      </p>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06} className="h-full">
            <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors duration-150 hover:border-trace sm:p-8">
              <p className="label !text-signal">{p.domain}</p>
              <h3 className="mt-2 font-mono text-lg font-medium tracking-tight">
                {p.name}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-dim">
                {p.claim}
              </p>
              <p className="label mt-4">{p.stack}</p>
              <p className="mt-5 flex gap-3">
                <span className="label rounded-full border border-line px-3 py-1.5 opacity-60">
                  Live · deploying
                </span>
                <a
                  href={`${site.github}/${p.name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="label rounded-full border border-line px-3 py-1.5 !text-ink transition-colors duration-150 hover:border-trace hover:!text-trace"
                >
                  Source ↗
                </a>
              </p>
            </article>
          </Reveal>
        ))}
      </div>
      <TitleBlock sheet="lab" meta="4 REPOS · OPEN SOURCE" />
    </Sheet>
  );
}
