import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import { getAllGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides | Ahmed Akram",
  description:
    "Practical write-ups on AI engineering — model cost, agents, MLOps and AI security. Every number checked against a primary source and linked.",
};

const toneMap: Record<string, string> = {
  blue: "lab-card-blue",
  orange: "lab-card-orange",
  red: "lab-card-red",
  violet: "lab-card-violet",
};

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <p className="eyebrow">Guides / Working notes</p>
          <h1>
            The long version
            <br />
            <span>of the short video.</span>
          </h1>
          <p>
            Each guide is the companion to something I posted — the numbers, the commands,
            and the sources, with room to show the work. Every figure is checked against a
            primary source and linked back to it.
          </p>
        </section>

        <section className="section">
          <Reveal>
            <div className="section-heading split">
              <div>
                <p className="eyebrow">
                  {guides.length > 0
                    ? `${guides.length} published`
                    : "Publishing shortly"}
                </p>
                <h2>
                  Read it,
                  <br />
                  then go run it.
                </h2>
              </div>
              <p>
                Short enough to finish, specific enough to act on the same day. No
                introductions, no throat-clearing.
              </p>
            </div>
          </Reveal>

          {guides.length === 0 ? (
            <Reveal>
              <p className="guide-empty">
                The first guides are being published now. In the meantime the{" "}
                <Link href="/lab">Lab</Link> has runnable projects.
              </p>
            </Reveal>
          ) : (
            <div className="guide-grid">
              {guides.map((guide, index) => (
                <Reveal key={guide.slug} delay={index * 0.05}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className={`guide-card ${toneMap[guide.tone] ?? toneMap.blue}`}
                  >
                    <header className="guide-card-head">
                      <span className="guide-card-kw">{guide.keyword}</span>
                      <span className="guide-card-time">
                        {guide.readingMinutes} min read
                      </span>
                    </header>

                    <h3>{guide.title}</h3>
                    <p>{guide.summary}</p>

                    {guide.tags.length > 0 && (
                      <ul className="guide-card-tags">
                        {guide.tags.slice(0, 4).map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    )}

                    <footer className="guide-card-foot">
                      <time dateTime={guide.publishedAt}>{guide.publishedAt}</time>
                      <strong>Read the guide ↗</strong>
                    </footer>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </section>

        <section className="route-next">
          <p>Next</p>
          <Link href="/lab">
            <span>AI Lab &amp; shipped work</span>
            <span aria-hidden>↗</span>
          </Link>
        </section>
      </main>
    </>
  );
}
