import Link from "next/link";
import type { Copy } from "@/lib/site-content";
import { site, whatsappLink } from "@/lib/site";
import LeadForm from "../biz/LeadForm";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "../biz/icons";
import AxHeader from "./AxHeader";
import MotionRoot from "./MotionRoot";
import Reveal from "./Reveal";
import ServiceSlider from "./ServiceSlider";
import ServicesHero from "./ServicesHero";
import "./ax.css";

export default function ServicesPage({ t }: { t: Copy }) {
  const ar = t.locale === "ar";
  const num = (v: number) => v.toLocaleString(ar ? "ar-EG" : "en");
  const socials = [
    { href: site.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: ar ? site.instagramAr : site.instagram, label: ar ? "Instagram عربي" : "Instagram", Icon: InstagramIcon },
    { href: ar ? site.instagram : site.instagramAr, label: ar ? "Instagram EN" : "Instagram عربي", Icon: InstagramIcon },
    { href: site.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: site.youtube, label: "YouTube", Icon: YouTubeIcon },
  ].filter((s) => s.href);

  return (
    <MotionRoot>
    <div className="ax ax-services" lang={t.locale} dir={t.dir}>
      <AxHeader t={t} page="services" />
      <main id="main-content" tabIndex={-1}>
        <ServicesHero t={t} />
        <ServiceSlider t={t} />

        <section className="steps" aria-labelledby="steps-title">
          <h2 id="steps-title">{t.steps.title}</h2>
          <ol>
            {t.steps.list.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.12}>
                <span className="step-n" aria-hidden>{num(i + 1)}</span>
                <b>{s.title}</b>
                <span>{s.text}</span>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="talk" id="contact" aria-labelledby="talk-title">
          <Reveal>
            <h2 id="talk-title">{t.contact.title}</h2>
            <p className="talk-lead">{t.contact.lead}</p>
          </Reveal>
          <div className="talk-ways">
            <a className="way way-wa" href={whatsappLink(t.hero.whatsappText)} target="_blank" rel="noreferrer">
              <WhatsAppIcon className="way-ico" />
              <b>{t.contact.whatsapp}</b>
              <small dir="ltr">{site.phone}</small>
            </a>
            <a className="way" href={site.phoneHref}>
              <PhoneIcon className="way-ico" />
              <b>{t.contact.call}</b>
              <small dir="ltr">{site.phone}</small>
            </a>
            <a className="way" href={`mailto:${site.email}?subject=${encodeURIComponent(t.contact.form.emailSubject)}`}>
              <MailIcon className="way-ico" />
              <b>{t.contact.email}</b>
              <small dir="ltr">{site.email}</small>
            </a>
          </div>
          <ul className="talk-socials">
            {socials.map(({ href, label, Icon }) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
                  <Icon className="ax-ico" />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
          <details className="talk-form">
            <summary>{t.contact.formToggle}</summary>
            <LeadForm
              form={t.contact.form}
              needs={t.slides.list.map((s) => s.title)}
              formKey={process.env.WEB3FORMS_ACCESS_KEY || undefined}
            />
          </details>
        </section>
      </main>

      <footer className="ax-footer">
        <span>© {new Date().getFullYear()} {t.ui.name}</span>
        <nav aria-label="Footer">
          <Link href={ar ? "/ar/portfolio" : "/portfolio"}>{t.ui.portfolio}</Link>
          <Link href="/guides">{t.footer.guides}</Link>
          <Link href="/privacy">{t.footer.privacy}</Link>
          <a href={t.ui.switchServicesHref} hrefLang={t.ui.switchLang} lang={t.ui.switchLang}>{t.ui.switchLabel}</a>
        </nav>
      </footer>

      <a className="ax-wa-float" href={whatsappLink(t.hero.whatsappText)} target="_blank" rel="noreferrer" aria-label={t.ui.whatsapp}>
        <WhatsAppIcon className="ax-ico" />
      </a>
    </div>
    </MotionRoot>
  );
}
