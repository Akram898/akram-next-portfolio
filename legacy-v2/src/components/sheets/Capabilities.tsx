import Reveal from "../Reveal";
import Sheet from "../Sheet";
import TitleBlock from "../TitleBlock";

const pillars = [
  {
    title: "Applied AI & Agents",
    body: "Multi-agent systems are architecture problems before they are prompt problems. I design planner/specialist topologies over MCP, integrate Claude, GPT, Gemini and OpenRouter behind provider-agnostic layers, orchestrate with n8n, and treat prompts and evals as versioned engineering artifacts. RAG and tool use where they earn their place — and an eval gate before anything touches the real world.",
  },
  {
    title: "MLOps & DevOps",
    body: "A model is a dependency that changes behind your back, so I build the lifecycle around it: training, versioning, drift monitoring, automated retraining, registries and promotion gates. The same discipline runs the rest of the stack — Docker, GitHub Actions pipelines, observability and structured logging, Lerna monorepos, deployments on Vercel and AWS.",
  },
  {
    title: "Engineering & Architecture",
    body: "The foundation: senior engineer and solution lead on identity and API modernization for large-scale enterprise platforms. Okta identity systems and OAuth/OIDC flows, NestJS/TypeScript microservices, GraphQL and REST APIs, Couchbase — high-traffic platforms serving millions of users, where “it works” is the entry requirement, not the goal.",
  },
];

export default function Capabilities() {
  return (
    <Sheet id="capabilities" kicker="Capabilities" title="Three load-bearing walls">
      <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <article className="border-t border-trace pt-6">
              <h3 className="font-display text-2xl font-bold">{p.title}</h3>
              <p className="mt-4 leading-relaxed text-dim">{p.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <TitleBlock sheet="capabilities" meta="ORDERED BY ALTITUDE, NOT DATE" />
    </Sheet>
  );
}
