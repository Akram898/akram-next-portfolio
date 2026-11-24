import { site, whatsappLink } from "@/lib/site";
import type { PortfolioCopy } from "@/lib/portfolio-content";
import ContactForm from "@/components/ContactForm";
import { SocialCards } from "@/components/SocialLinks";

export default function ContactSection({ t }: { t: PortfolioCopy }) {
  const c = t.contact;
  const body = t.locale === "ar"
    ? "ببني إيه:%0A%0Aالمشكلة:%0A%0Aالمدة:%0A"
    : "What%20I%27m%20building%3A%0A%0AThe%20challenge%3A%0A%0ATimeline%3A%0A";
  return (
    <section className="contact" id="contact">
      <div className="contact-heading">
        <p className="eyebrow">{c.eyebrow}</p>
        <h2>{c.title}</h2>
        <p className="contact-intro">{c.intro}</p>
      </div>

      <div className="contact-direct">
        <p>{c.start}</p>
        <a href={`mailto:${site.email}?subject=${encodeURIComponent(c.emailSubject)}&body=${body}`}>
          <span>{c.emailLabel}</span>
          <strong dir="ltr">{site.email}</strong>
        </a>
        <a href={whatsappLink(c.whatsappText)} target="_blank" rel="noreferrer">
          <span>{c.whatsapp} ↗</span>
          <strong dir="ltr">{site.phone}</strong>
        </a>
        <a href={site.phoneHref}>
          <span>{c.mobile}</span>
          <strong dir="ltr">{site.phone}</strong>
        </a>
      </div>

      {/* The key is read here on the server; a client component can't see non-public env vars. */}
      <ContactForm t={c.form} accessKey={process.env.WEB3FORMS_ACCESS_KEY || undefined} />

      <SocialCards locale={t.locale} whatsappText={c.whatsappText} title={c.socialsTitle} />

      <div className="contact-meta">
        <p>{c.location}<br /><span dir="ltr">GST, UTC+4</span></p>
        <p>{c.tagline[0]}<br />{c.tagline[1]}</p>
      </div>
    </section>
  );
}
