import type { Metadata } from "next";
import Link from "next/link";
import ProjectArchive from "@/components/ProjectArchive";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "AI Lab | Ahmed Akram",
  description:
    "AI agents, MLOps, AI security, system design, and public projects by Ahmed Akram.",
};

const GITHUB = "https://github.com/Akram898";

const labs = [
  {
    slug: "agent-orchestra",
    num: "01",
    category: "AI · Agents",
    label: "Multi-agent playground",
    description:
      "Type a task — a Planner decomposes it, Researcher gathers context, Writer synthesises, Critic reviews. All four agents stream their thinking live through a real-time execution graph.",
    stack: ["Next.js 14", "Claude API", "SSE Streaming", "TypeScript"],
    liveUrl: "https://agent-orchestra-five.vercel.app/",
    tone: "blue",
    status: "Live on Vercel",
  },
  {
    slug: "drift-watch",
    num: "02",
    category: "ML · MLOps",
    label: "Model drift monitor",
    description:
      "Trains a classifier, injects production drift, detects it with PSI and KS statistical tests, triggers automatic retraining, and versions every model in a JSON registry with a live dashboard.",
    stack: ["Python", "scikit-learn", "FastAPI", "GitHub Actions"],
    liveUrl: null,
    tone: "orange",
    status: "Run locally · Python",
  },
  {
    slug: "prompt-sentinel",
    num: "03",
    category: "AI Security",
    label: "LLM firewall",
    description:
      "Paste any prompt — 64 layered heuristics screen it for injection attempts, PII leakage, jailbreaks, and unsafe content. Returns a 0-100 risk score, per-category breakdown, and a persisted audit log.",
    stack: ["Next.js 14", "Heuristics", "LLM Judge", "TypeScript"],
    liveUrl: "https://prompt-sentinel.vercel.app/",
    tone: "red",
    status: "Live on Vercel",
  },
  {
    slug: "api-blueprint",
    num: "04",
    category: "Architecture",
    label: "API architecture explorer",
    description:
      "An interactive SVG node graph of a global identity and loyalty API. Click any node — gateway, OAuth, Redis, Postgres, queue — to read the design decision, trade-offs, and real config. Backed by a live rate-limited endpoint.",
    stack: ["Next.js 14", "SVG Diagram", "Rate-limited API", "TypeScript"],
    liveUrl: "https://api-blueprint-sooty.vercel.app/",
    tone: "violet",
    status: "Live on Vercel",
  },
];

const toneMap: Record<string, { card: string; badge: string; dot: string; preview: string }> = {
  blue:   { card: "lab-card-blue",   badge: "badge-blue",   dot: "dot-blue",   preview: "preview-blue"   },
  orange: { card: "lab-card-orange", badge: "badge-orange", dot: "dot-orange", preview: "preview-orange" },
  red:    { card: "lab-card-red",    badge: "badge-red",    dot: "dot-red",    preview: "preview-red"    },
  violet: { card: "lab-card-violet", badge: "badge-violet", dot: "dot-violet", preview: "preview-violet" },
};

export default function LabPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero lab-page-hero">
          <p className="eyebrow">AI Lab / Open, runnable proof</p>
          <h1>Ideas become<br /><span>working systems.</span></h1>
          <p>Small scope. Serious execution. Every project exists to make one engineering capability undeniable.</p>
          <div className="lab-hero-graph" aria-hidden>
            {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
            <b /><b /><b />
          </div>
        </section>

        <section className="section lab-section">
          <Reveal>
            <div className="section-heading split">
              <div>
                <p className="eyebrow">Current experiments</p>
                <h2>Built to be run,<br />read, and tested.</h2>
              </div>
              <p>Four compact systems, each its own public repo, three live on Vercel right now.</p>
            </div>
          </Reveal>

          <div className="lab-grid">
            {labs.map((lab, index) => {
              const tone = toneMap[lab.tone];
              return (
                <Reveal key={lab.slug} delay={index * 0.05}>
                  <article className={`lab-card lab-card-rich ${tone.card}`}>

                    {/* CSS preview panel */}
                    <div className={`lab-preview ${tone.preview}`} aria-hidden>
                      <div className="lab-preview-chrome">
                        <span /><span /><span />
                      </div>
                      <div className="lab-preview-content" />
                    </div>

                    <header className="lab-card-header">
                      <span className="lab-number">LAB / {lab.num}</span>
                      <span className={`lab-badge ${tone.badge}`}>{lab.category}</span>
                    </header>

                    <div className="lab-card-body">
                      <p className="lab-card-label">{lab.label}</p>
                      <h3 className="lab-card-slug">{lab.slug}</h3>
                      <p className="lab-card-desc">{lab.description}</p>

                      <ul className="lab-stack">
                        {lab.stack.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    </div>

                    <footer className="lab-card-footer">
                      <span className={`lab-status-dot ${tone.dot}`} />
                      <span className="lab-status-text">{lab.status}</span>
                      <div className="lab-card-links">
                        <a
                          href={`${GITHUB}/${lab.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="lab-link lab-link-ghost"
                          aria-label={`View ${lab.slug} source on GitHub`}
                        >
                          GitHub ↗
                        </a>
                        {lab.liveUrl && (
                          <a
                            href={lab.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="lab-link lab-link-solid"
                            aria-label={`Visit ${lab.slug} live demo`}
                          >
                            Visit ↗
                          </a>
                        )}
                      </div>
                    </footer>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="section archive-section">
          <Reveal>
            <div className="section-heading split">
              <div>
                <p className="eyebrow">Project archive / Built over time</p>
                <h2>Shipped before<br />the AI wave.</h2>
              </div>
              <p>Selected public work from the path into senior engineering. Original interfaces, recast as a tactile project gallery.</p>
            </div>
          </Reveal>
          <ProjectArchive />
        </section>

        <section className="route-next">
          <p>Explore the foundations</p>
          <Link href="/architecture">View architecture <span>↗</span></Link>
        </section>
      </main>
    </>
  );
}
