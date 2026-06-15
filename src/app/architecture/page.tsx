import type { Metadata } from "next";
import Link from "next/link";
import ArchitectureField from "@/components/ArchitectureField";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import {
  AgentsDiagram,
  ApiDiagram,
  IdentityDiagram,
  MlopsDiagram,
} from "@/components/diagrams";

export const metadata: Metadata = {
  title: "Architecture | Ahmed Akram",
  description:
    "Applied AI, MLOps, identity, and API architecture case studies by Ahmed Akram.",
};

const work = [
  {
    type: "Applied AI / Multi-agent systems",
    title: "Automation that exercises judgment.",
    problem: "Recurring analysis and content workflows needed multi-step decisions, not another brittle scheduled script.",
    decision: "Planner and specialist agent topologies with scoped MCP tools, n8n orchestration, and an evaluation gate before external action.",
    impact: "Auditable systems that plan, act, critique, and revise their own work on schedule.",
    Diagram: AgentsDiagram,
  },
  {
    type: "MLOps / Model operations",
    title: "Models that notice when the world changes.",
    problem: "Production models degrade quietly as live data moves away from the distributions they learned.",
    decision: "PSI and KS drift monitoring, automated retraining in CI, versioned models, and explicit promotion gates.",
    impact: "Model updates become evidence-led engineering events instead of emergency fixes.",
    Diagram: MlopsDiagram,
  },
  {
    type: "Enterprise / Identity",
    title: "One identity layer. Millions of users.",
    problem: "Fragmented login flows made every channel inconsistent and every migration risky.",
    decision: "A phased move to a central Okta platform using OAuth 2.0 and OIDC without interrupting daily traffic.",
    impact: "A shared trust layer across web, mobile, and partner channels.",
    Diagram: IdentityDiagram,
  },
  {
    type: "Enterprise / API platforms",
    title: "A typed contract behind every profile.",
    problem: "Tightly coupled services turned every profile change into a shared deployment bottleneck.",
    decision: "NestJS and TypeScript microservices behind GraphQL, with Couchbase and deliberate caching tiers.",
    impact: "Independent teams, predictable contracts, and low-latency reads at enterprise scale.",
    Diagram: ApiDiagram,
  },
];

export default function ArchitecturePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero architecture-page-hero">
          <p className="eyebrow">Architecture / Operating systems for intelligence</p>
          <h1>Make the<br /><span>whole system</span><br />think.</h1>
          <p>AI runtimes, model operations, identity, and APIs designed as one production architecture.</p>
          <div className="page-hero-orbit" aria-hidden><i /><i /><i /><b /></div>
        </section>

        <section className="section runtime-section">
          <Reveal>
            <div className="section-heading">
              <p className="eyebrow">Live architecture</p>
              <h2>One mind.<br />Three operating planes.</h2>
              <p>Select a system and watch the active path redraw around the engineering intent.</p>
            </div>
          </Reveal>
          <Reveal><ArchitectureField /></Reveal>
        </section>

        <section className="section" id="work">
          <Reveal>
            <div className="section-heading">
              <p className="eyebrow">Selected systems</p>
              <h2>Architecture is the work.</h2>
              <p>Proprietary details stay private. The decisions and their consequences do not.</p>
            </div>
          </Reveal>
          <div className="work-list">
            {work.map((item, index) => (
              <Reveal key={item.title}>
                <article className="work-row">
                  <div className="work-index">0{index + 1}</div>
                  <div className="work-story">
                    <p className="eyebrow">{item.type}</p>
                    <h3>{item.title}</h3>
                    <dl>
                      <div><dt>Problem</dt><dd>{item.problem}</dd></div>
                      <div><dt>Decision</dt><dd>{item.decision}</dd></div>
                      <div><dt>Impact</dt><dd>{item.impact}</dd></div>
                    </dl>
                  </div>
                  <div className="work-diagram"><item.Diagram /></div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section capabilities">
          <Reveal><p className="eyebrow">Capabilities / In order of focus</p></Reveal>
          <div className="capability-grid">
            <Reveal><article><span>01</span><h2>Applied AI<br />&amp; Agents</h2><p>Multi-agent systems with MCP. Claude, GPT, Gemini, and OpenRouter integration. RAG, tool use, prompt engineering, evals, and n8n orchestration.</p></article></Reveal>
            <Reveal delay={0.08}><article><span>02</span><h2>MLOps<br />&amp; DevOps</h2><p>Training, model versioning, drift monitoring, automated retraining, Docker, CI/CD, GitHub Actions, observability, AWS, and Vercel.</p></article></Reveal>
            <Reveal delay={0.16}><article><span>03</span><h2>Engineering<br />&amp; Architecture</h2><p>Okta, OAuth/OIDC, NestJS, TypeScript, GraphQL, REST, Couchbase, microservices, and high-traffic identity and profile platforms.</p></article></Reveal>
          </div>
        </section>

        <section className="route-next">
          <p>Next system</p>
          <Link href="/lab">Enter the AI lab <span>↗</span></Link>
        </section>
      </main>
    </>
  );
}
