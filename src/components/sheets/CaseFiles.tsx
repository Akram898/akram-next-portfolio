import Reveal from "../Reveal";
import Sheet from "../Sheet";
import TitleBlock from "../TitleBlock";
import {
  AgentsDiagram,
  ApiDiagram,
  IdentityDiagram,
  MlopsDiagram,
} from "../diagrams";

const files = [
  {
    code: "CF-01",
    domain: "Enterprise · Identity",
    title: "Identity, modernized in flight",
    problem:
      "A global enterprise serving millions of users ran login on aging, fragmented flows — every channel slightly different, every change risky.",
    decision:
      "Standardize every channel on OAuth 2.0 / OIDC through a central identity platform (Okta), migrating in phases so daily traffic never stopped while the old stack was retired underneath it.",
    impact:
      "One identity layer across web, mobile and partner channels — fewer ways to sign in, fewer ways to fail, and a platform new products plug into instead of rebuilding auth.",
    diagram: IdentityDiagram,
  },
  {
    code: "CF-02",
    domain: "Enterprise · APIs",
    title: "The profile platform behind every request",
    problem:
      "Member profile data sat behind tightly coupled services — every team's change shipped through the same bottleneck, at traffic measured in millions of users.",
    decision:
      "Decompose into NestJS/TypeScript microservices behind a GraphQL gateway, with Couchbase for low-latency profile reads and explicit caching tiers.",
    impact:
      "Teams deploy independently, consumers get one typed contract, and profile reads stay fast under high traffic.",
    diagram: ApiDiagram,
  },
  {
    code: "CF-03",
    domain: "AI · Agents",
    title: "Automation that exercises judgment",
    problem:
      "Recurring workflows — market analysis, content production — needed multi-step judgment, not just scheduling. Plain scripts either broke or escalated to a human every run.",
    decision:
      "Planner/specialist agent topologies: a planner decomposes each run, specialists act through scoped MCP tool access, n8n orchestrates, and an eval step gates any external action.",
    impact:
      "Pipelines that run unattended on schedule — trading analysis and content systems that produce, criticize, and revise their own output, with an audit trail.",
    diagram: AgentsDiagram,
  },
  {
    code: "CF-04",
    domain: "AI · MLOps",
    title: "Models that notice their own drift",
    problem:
      "A model that is right today degrades quietly as production data shifts — and nobody is watching the distribution tails.",
    decision:
      "Treat the lifecycle as the system: drift detection (PSI / KS tests) on live features, automated retraining in CI via GitHub Actions, versioned models in a registry with promotion gates.",
    impact:
      "Model updates become routine, reviewable CI events instead of incidents — retraining is triggered by evidence, not by emergency.",
    diagram: MlopsDiagram,
  },
];

export default function CaseFiles() {
  return (
    <Sheet id="case-files" kicker="Selected work" title="Case files">
      <p className="max-w-2xl text-dim">
        Work from large-scale enterprise platforms and applied-AI systems. The
        employer stays unnamed; the architecture doesn&apos;t.
      </p>
      <div className="mt-12 space-y-16">
        {files.map((f) => (
          <Reveal key={f.code}>
            <article
              aria-label={`${f.code}: ${f.title}`}
              className="grid gap-8 border-t border-line pt-8 lg:grid-cols-[1fr_minmax(280px,380px)]"
            >
              <div>
                <p className="label">
                  <span className="!text-signal">{f.code}</span> · {f.domain}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">
                  {f.title}
                </h3>
                <dl className="mt-6 space-y-4">
                  <div>
                    <dt className="label">Problem</dt>
                    <dd className="mt-1 leading-relaxed text-dim">{f.problem}</dd>
                  </div>
                  <div>
                    <dt className="label">Decision</dt>
                    <dd className="mt-1 leading-relaxed text-dim">{f.decision}</dd>
                  </div>
                  <div>
                    <dt className="label !text-signal">Impact</dt>
                    <dd className="mt-1 leading-relaxed">{f.impact}</dd>
                  </div>
                </dl>
              </div>
              <div className="self-center rounded-2xl border border-line bg-surface p-4">
                <f.diagram />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <TitleBlock sheet="case-files" meta="ENTERPRISE + AI · 4 FILES" />
    </Sheet>
  );
}
