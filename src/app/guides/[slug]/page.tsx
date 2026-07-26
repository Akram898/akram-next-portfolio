import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import { getAllGuides, getGuide, getGuideSlugs } from "@/lib/guides";
import { site } from "@/lib/site";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return { title: "Guide not found | Ahmed Akram" };

  const url = `${site.url}/guides/${guide.slug}`;
  return {
    title: `${guide.title} | Ahmed Akram`,
    description: guide.summary,
    alternates: { canonical: url },
    // A draft is reachable at its URL for review but must never be indexed.
    robots: guide.status === "live" ? undefined : { index: false, follow: false },
    openGraph: {
      title: guide.title,
      description: guide.summary,
      url,
      type: "article",
      publishedTime: guide.publishedAt || undefined,
      modifiedTime: guide.updatedAt || undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.summary,
    },
  };
}

export default function GuidePage({ params }: Params) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  const others = getAllGuides().filter((g) => g.slug !== guide.slug).slice(0, 2);

  return (
    <>
      <SiteHeader />
      <main>
        <article>
          <header className="guide-hero">
            <Link className="guide-back" href="/guides">
              ← All guides
            </Link>

            <p className="eyebrow">
              Guide / {guide.keyword}
              {guide.status === "draft" && " · DRAFT"}
            </p>

            <h1>{guide.title}</h1>
            <p className="guide-lede">{guide.summary}</p>

            <div className="guide-meta">
              <span>
                <time dateTime={guide.publishedAt}>{guide.publishedAt}</time>
              </span>
              <span>{guide.readingMinutes} min read</span>
              {guide.updatedAt && guide.updatedAt !== guide.publishedAt && (
                <span>Updated {guide.updatedAt}</span>
              )}
              {guide.video?.url && (
                <a href={guide.video.url} target="_blank" rel="noreferrer">
                  Watch the video ↗
                </a>
              )}
            </div>

            {guide.tags.length > 0 && (
              <ul className="guide-tags">
                {guide.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
          </header>

          {/* Parsed at build time in this Server Component, so no markdown parser and no
              extra JS reaches the browser. Content is authored in this repo, not user
              input. */}
          <div
            className="guide-body"
            dangerouslySetInnerHTML={{ __html: guide.html }}
          />
        </article>

        {others.length > 0 && (
          <section className="section">
            <Reveal>
              <div className="section-heading">
                <p className="eyebrow">Keep reading</p>
                <h2>More guides.</h2>
              </div>
            </Reveal>
            <div className="guide-grid">
              {others.map((other, index) => (
                <Reveal key={other.slug} delay={index * 0.05}>
                  <Link href={`/guides/${other.slug}`} className="guide-card lab-card-blue">
                    <header className="guide-card-head">
                      <span className="guide-card-kw">{other.keyword}</span>
                      <span className="guide-card-time">{other.readingMinutes} min read</span>
                    </header>
                    <h3>{other.title}</h3>
                    <p>{other.summary}</p>
                    <footer className="guide-card-foot">
                      <time dateTime={other.publishedAt}>{other.publishedAt}</time>
                      <strong>Read the guide ↗</strong>
                    </footer>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}

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
