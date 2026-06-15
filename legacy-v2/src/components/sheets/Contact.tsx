import Sheet from "../Sheet";
import TitleBlock from "../TitleBlock";
import { site } from "@/lib/site";

const rows = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "GitHub", value: "github.com/Akram898", href: site.github },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/ahmedakram",
    href: site.linkedin,
  },
  { label: "Location", value: `${site.location} · ${site.timezone}`, href: null },
];

export default function Contact() {
  return (
    <Sheet id="contact" kicker="Contact" title="Issued for construction">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="max-w-md leading-relaxed text-dim">
            If you&apos;re building something that needs AI systems with real
            engineering underneath — or an enterprise platform that&apos;s
            ready for AI on top — I&apos;d like to hear about it.
          </p>
          <a
            href={`mailto:${site.email}?subject=Project%20inquiry`}
            className="mt-8 inline-block rounded-full bg-trace px-7 py-3.5 font-mono text-sm font-medium text-paper transition-opacity duration-150 hover:opacity-85"
          >
            Start a conversation ▷
          </a>
        </div>
        <dl>
          {rows.map((r) => (
            <div
              key={r.label}
              className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-3"
            >
              <dt className="label">{r.label}</dt>
              <dd className="font-mono text-sm">
                {r.href ? (
                  <a
                    href={r.href}
                    target={r.href.startsWith("http") ? "_blank" : undefined}
                    rel={r.href.startsWith("http") ? "noreferrer" : undefined}
                    className="transition-colors duration-150 hover:text-trace"
                  >
                    {r.value} {r.href.startsWith("http") ? "↗" : ""}
                  </a>
                ) : (
                  r.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <TitleBlock sheet="contact" meta={`${site.location.toUpperCase()} · ${site.timezone}`} />
      <p className="label mt-10">
        Drawn &amp; built by Ahmed Akram · Bricolage Grotesque, Public Sans,
        IBM Plex Mono · © {new Date().getFullYear()}
      </p>
    </Sheet>
  );
}
