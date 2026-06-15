import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import IconGalaxyHero from "@/components/IconGalaxyHero";
import ProjectArchive from "@/components/ProjectArchive";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import TechMarquee from "@/components/TechMarquee";
import portrait from "@/assets/portrait.jpg";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <IconGalaxyHero />

        <section className="proof" aria-label="Professional summary">
          <p><strong>14+</strong><span>Years building<br />software systems</span></p>
          <p><strong>Millions</strong><span>Users served by<br />enterprise platforms</span></p>
          <p><strong>4</strong><span>LLM providers<br />orchestrated</span></p>
          <p><strong>DXB</strong><span>Based in Dubai.<br />Working globally.</span></p>
        </section>

        <TechMarquee />

        <section className="section portal-section" aria-label="Explore portfolio">
          <Reveal>
            <p className="eyebrow">Choose a system</p>
          </Reveal>
          <div className="portal-grid">
            <Reveal>
              <Link href="/architecture" className="portal-card portal-architecture">
                <span className="portal-code">SYSTEM / 01</span>
                <div className="portal-visual portal-orbits" aria-hidden>
                  <i /><i /><i /><b />
                </div>
                <div>
                  <h2>Architecture</h2>
                  <p>Agent runtimes, model lifecycles, identity, APIs, and the decisions beneath them.</p>
                </div>
                <strong>Enter system ↗</strong>
              </Link>
            </Reveal>
            <Reveal delay={0.08}>
              <Link href="/lab" className="portal-card portal-lab">
                <span className="portal-code">SYSTEM / 02</span>
                <div className="portal-visual portal-nodes" aria-hidden>
                  <i /><i /><i /><i /><b /><b />
                </div>
                <div>
                  <h2>AI Lab</h2>
                  <h4>& Shipped Work</h4>
                  <p>Open proof, experiments, agent systems, MLOps tools, and an archive of shipped work.</p>
                </div>
                <strong>Enter lab ↗</strong>
              </Link>
            </Reveal>
          </div>
          {/* <Reveal>
            <div className="portal-shipped-heading">
              <p className="eyebrow">Shipped work</p>
              <p>A compact view of the public projects collected in the AI Lab.</p>
            </div>
            <ProjectArchive compact />
          </Reveal> */}
        </section>

        <section className="section home-statement">
          <Reveal>
            <p className="eyebrow">Working principle</p>
            <blockquote>
              AI is not the feature.
              <span>The operating system around it is.</span>
            </blockquote>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="statement-note">
              Models change. Providers change. Production expectations do not.
              I design the orchestration, evaluation, security, observability,
              and enterprise foundations that let AI survive contact with reality.
            </p>
          </Reveal>
        </section>

        <section className="section about" id="about">
          <Reveal className="about-image">
            <Image
              src={portrait}
              alt="Portrait of Ahmed Akram"
              placeholder="blur"
              sizes="(min-width: 900px) 42vw, 92vw"
            />
            <span>Ahmed Akram / Dubai, UAE</span>
          </Reveal>
          <Reveal className="about-copy">
            <p className="eyebrow">Engineer / Architect / Mentor</p>
            <h2>I learned systems before I learned software.</h2>
            <p className="about-lead">
              Civil engineering and military service came first. Then a
              self-made transition into software, senior engineering on
              large-scale enterprise platforms, and now applied AI systems.
            </p>
            <p>
              That path shaped how I work: understand the load, make trade-offs
              explicit, and design for operation rather than demonstration. I
              mentor junior engineers and translate comfortably between deep
              technical teams and business stakeholders.
            </p>
            <ul>
              <li>AWS Solutions Architect Associate</li>
              <li>B.Sc. Computer Science, in progress</li>
              <li><a href="https://www.npmjs.com/package/json-friendly-cleaner" target="_blank" rel="noreferrer">Published npm package ↗</a></li>
            </ul>
          </Reveal>
        </section>

        <TechMarquee reverse />
        <ContactSection />
      </main>

      <footer>
        <span>© {new Date().getFullYear()} Ahmed Akram</span>
        <span>Designed and engineered in Dubai</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
