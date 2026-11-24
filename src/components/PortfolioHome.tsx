import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import IconGalaxyHero from "@/components/IconGalaxyHero";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import TechMarquee from "@/components/TechMarquee";
import portrait from "@/assets/portrait.jpg";
import type { PortfolioCopy } from "@/lib/portfolio-content";

const portalVisual = {
  architecture: { className: "portal-orbits", dots: 3, bars: 1 },
  lab: { className: "portal-nodes", dots: 4, bars: 2 },
  guides: { className: "portal-lines", dots: 4, bars: 1 },
} as const;

/* The engineer portfolio, shared by /portfolio (English) and /ar/portfolio (Arabic). */
export default function PortfolioHome({ t }: { t: PortfolioCopy }) {
  const ar = t.locale === "ar";
  return (
    <div className={ar ? "pf-ar" : undefined} lang={t.locale} dir={t.dir}>
      <SiteHeader nav={t.nav} />
      <main id="main-content" tabIndex={-1}>
        <IconGalaxyHero t={t} />

        <section className="proof" aria-label={ar ? "ملخص" : "Professional summary"}>
          {t.proof.map((p) => (
            <p key={p.value}><strong>{p.value}</strong><span>{p.label[0]}<br />{p.label[1]}</span></p>
          ))}
        </section>

        <TechMarquee />

        <section className="section portal-section" aria-label={t.portal.eyebrow}>
          <Reveal>
            <p className="eyebrow">{t.portal.eyebrow}</p>
          </Reveal>
          <div className="portal-grid">
            {t.portal.cards.map((card, i) => {
              const v = portalVisual[card.kind];
              return (
                <Reveal key={card.kind} delay={i * 0.08}>
                  <Link href={card.href} className={`portal-card portal-${card.kind}`} hrefLang="en">
                    <span className="portal-code">{card.code}</span>
                    <div className={`portal-visual ${v.className}`} aria-hidden>
                      {Array.from({ length: v.dots }, (_, k) => <i key={`i${k}`} />)}
                      {Array.from({ length: v.bars }, (_, k) => <b key={`b${k}`} />)}
                    </div>
                    <div>
                      <h2>{card.title}</h2>
                      {card.subtitle && <p className="portal-subtitle">{card.subtitle}</p>}
                      <p>{card.text}</p>
                    </div>
                    <strong>{card.cta}</strong>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="section home-statement">
          <Reveal>
            <p className="eyebrow">{t.statement.eyebrow}</p>
            <blockquote>
              {t.statement.quote}
              <span>{t.statement.quoteEnd}</span>
            </blockquote>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="statement-note">{t.statement.note}</p>
          </Reveal>
        </section>

        <section className="section about" id="about">
          <Reveal className="about-image">
            <Image src={portrait} alt={t.about.portraitAlt} placeholder="blur" sizes="(min-width: 900px) 42vw, 92vw" />
            <span>{t.about.caption}</span>
          </Reveal>
          <Reveal className="about-copy">
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2>{t.about.title}</h2>
            <p className="about-lead">{t.about.lead}</p>
            <p>{t.about.text}</p>
            <ul>
              {t.about.facts.map((f) => <li key={f}>{f}</li>)}
              <li><a href="https://www.npmjs.com/package/json-friendly-cleaner" target="_blank" rel="noreferrer">{t.about.npm}</a></li>
            </ul>
          </Reveal>
        </section>

        <TechMarquee reverse />
        <ContactSection t={t} />
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} {t.hero.name}</span>
        <span>{t.footer.made}</span>
        <a href="#main-content">{t.footer.top}</a>
      </footer>
    </div>
  );
}
