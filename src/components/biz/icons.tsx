import { siFacebook, siGithub, siInstagram, siWhatsapp, siYoutube } from "simple-icons";

type IconProps = { className?: string };

const brand = (path: string) =>
  function BrandIcon({ className }: IconProps) {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden focusable="false">
        <path d={path} fill="currentColor" />
      </svg>
    );
  };

export const WhatsAppIcon = brand(siWhatsapp.path);
export const InstagramIcon = brand(siInstagram.path);
export const FacebookIcon = brand(siFacebook.path);
export const YouTubeIcon = brand(siYoutube.path);
export const GitHubIcon = brand(siGithub.path);
/* LinkedIn left simple-icons under its brand policy; a plain "in" mark instead. */
export const LinkedInIcon = brand(
  "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
);

const stroke = (d: string) =>
  function StrokeIcon({ className }: IconProps) {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden focusable="false" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    );
  };

export const PhoneIcon = stroke(
  "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z",
);
export const MailIcon = stroke("M3 5h18v14H3zM3 6l9 7 9-7");
export const CheckIcon = stroke("M20 6 9 17l-5-5");
export const FileIcon = stroke("M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8zM14 3v5h5");
