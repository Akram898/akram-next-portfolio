import type { ComponentType } from "react";
import { site, whatsappLink } from "@/lib/site";
import type { Locale } from "@/lib/site-content";
import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "./biz/icons";

type Social = {
  id: string;
  href: string;
  name: string;
  handle: string;
  /** Brand colour, used for the hover glow and the card accent. */
  brand: string;
  Icon: ComponentType<{ className?: string }>;
};

/* Every profile in one place. Facebook and YouTube stay hidden until their links are
   filled in src/lib/site.ts. The visitor's language decides which Instagram comes first. */
export function getSocials(locale: Locale, whatsappText: string): Social[] {
  const igEn: Social = { id: "ig-en", href: site.instagram, name: locale === "ar" ? "Instagram EN" : "Instagram", handle: "@theakram.ai", brand: "#E1306C", Icon: InstagramIcon };
  const igAr: Social = { id: "ig-ar", href: site.instagramAr, name: "Instagram عربي", handle: "@thearabicakram.ai", brand: "#E1306C", Icon: InstagramIcon };
  return [
    { id: "linkedin", href: site.linkedin, name: "LinkedIn", handle: "in/ahmedakram", brand: "#0A66C2", Icon: LinkedInIcon },
    { id: "github", href: site.github, name: "GitHub", handle: "Akram898", brand: "#8B949E", Icon: GitHubIcon },
    ...(locale === "ar" ? [igAr, igEn] : [igEn, igAr]),
    { id: "whatsapp", href: whatsappLink(whatsappText), name: locale === "ar" ? "واتساب" : "WhatsApp", handle: site.phone, brand: "#25D366", Icon: WhatsAppIcon },
    { id: "facebook", href: site.facebook, name: "Facebook", handle: "Facebook", brand: "#0866FF", Icon: FacebookIcon },
    { id: "youtube", href: site.youtube, name: "YouTube", handle: "YouTube", brand: "#FF0000", Icon: YouTubeIcon },
  ].filter((s) => s.href);
}

/** Round glass buttons under the hero buttons. */
export function SocialOrbit({ locale, whatsappText, label }: { locale: Locale; whatsappText: string; label: string }) {
  return (
    <ul className="social-orbit" aria-label={label}>
      {getSocials(locale, whatsappText).map(({ id, href, name, brand, Icon }) => (
        <li key={id} style={{ "--brand": brand } as React.CSSProperties}>
          <a href={href} target="_blank" rel="noreferrer" aria-label={name} title={name}>
            <Icon className="social-orbit-icon" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Cards with name and handle, for the contact section. */
export function SocialCards({ locale, whatsappText, title }: { locale: Locale; whatsappText: string; title: string }) {
  return (
    <div className="social-cards">
      <p>{title}</p>
      <ul>
        {getSocials(locale, whatsappText).map(({ id, href, name, handle, brand, Icon }) => (
          <li key={id} style={{ "--brand": brand } as React.CSSProperties}>
            <a href={href} target="_blank" rel="noreferrer">
              <span className="social-card-icon"><Icon /></span>
              <span className="social-card-text">
                <b>{name}</b>
                <small dir="ltr">{handle}</small>
              </span>
              <span className="social-card-arrow" aria-hidden>↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
