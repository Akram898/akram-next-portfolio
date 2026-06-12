import { sheets, type SheetId } from "@/lib/site";
import Reveal from "./Reveal";

/* Standard sheet shell: //0n marker, oversized display title, content. */
export default function Sheet({
  id,
  kicker,
  title,
  children,
}: {
  id: SheetId;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  const num = sheets.find((x) => x.id === id)!.num;
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <div className="mx-auto max-w-sheet px-5 py-28 sm:px-8 sm:py-40">
        <Reveal>
          <p className="label !text-trace">
            //{String(num).padStart(2, "0")} · {kicker}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl"
          >
            {title}
          </h2>
        </Reveal>
        <div className="mt-16">{children}</div>
      </div>
    </section>
  );
}
