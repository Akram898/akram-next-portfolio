import Image from "next/image";
import Reveal from "../Reveal";
import Sheet from "../Sheet";
import TitleBlock from "../TitleBlock";
import portrait from "@/assets/portrait.jpg";

const revisions = [
  {
    rev: "R0",
    name: "Origin",
    note: "Civil engineering and military service. First training on systems whose failures are physical — bridges don't get hotfixes.",
  },
  {
    rev: "R1",
    name: "Transition",
    note: "A self-made move into software. Freelance web work first; the discipline caught up with the curiosity fast.",
  },
  {
    rev: "R2",
    name: "Scale",
    note: "Senior software engineer & solution lead — identity and API modernization on large-scale enterprise platforms serving millions of users.",
  },
  {
    rev: "R3",
    name: "Current",
    note: "AI solutions engineering: multi-agent platforms, MCP, MLOps pipelines — built with the same enterprise discipline. Mentor to junior engineers; fluent in both engineer and stakeholder.",
  },
];

const credentials = [
  { label: "AWS Solutions Architect — Associate", href: null },
  { label: "B.Sc. Computer Science — in progress", href: null },
  {
    label: "npm: json-friendly-cleaner",
    href: "https://www.npmjs.com/package/json-friendly-cleaner",
  },
];

export default function About() {
  return (
    <Sheet id="revisions" kicker="About" title="Revision history">
      <div className="grid gap-12 lg:grid-cols-[1fr_minmax(260px,340px)]">
        <div>
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Career history presented as an engineering drawing revision table
            </caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="label py-3 pr-4 font-normal">
                  Rev
                </th>
                <th scope="col" className="label py-3 pr-4 font-normal">
                  Stage
                </th>
                <th scope="col" className="label py-3 font-normal">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {revisions.map((r) => (
                <tr key={r.rev} className="border-b border-line align-top">
                  <td className="py-4 pr-4 font-mono text-sm text-signal">
                    {r.rev}
                  </td>
                  <td className="py-4 pr-4 font-display text-sm font-bold">
                    {r.name}
                  </td>
                  <td className="py-4 text-sm leading-relaxed text-dim">
                    {r.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="mt-8 space-y-2">
            {credentials.map((c) => (
              <li key={c.label} className="font-mono text-sm">
                <span aria-hidden className="text-signal">
                  ▪{" "}
                </span>
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-line underline-offset-4 transition-colors duration-150 hover:text-trace"
                  >
                    {c.label} ↗
                  </a>
                ) : (
                  c.label
                )}
              </li>
            ))}
          </ul>
        </div>
        <Reveal className="self-start">
          <figure className="overflow-hidden rounded-2xl border border-line bg-surface p-3">
            <Image
              src={portrait}
              alt="Portrait of Ahmed Akram"
              placeholder="blur"
              sizes="(min-width: 1024px) 340px, 90vw"
              className="block h-auto w-full rounded-xl grayscale"
            />
            <figcaption className="label mt-3">
              A. Akram · Dubai · approved for issue
            </figcaption>
          </figure>
        </Reveal>
      </div>
      <TitleBlock sheet="revisions" meta="R0 → R3 · CURRENT" />
    </Sheet>
  );
}
