import { sheets, type SheetId } from "@/lib/site";

/* Sheet marker — one quiet hairline row closing each section.
   The drawing-set metadata survives the redesign, without the boxes. */
export default function TitleBlock({
  sheet,
  meta,
  children,
}: {
  sheet: SheetId;
  meta?: string;
  children?: React.ReactNode;
}) {
  const s = sheets.find((x) => x.id === sheet)!;
  return (
    <div className="mt-20 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-4">
      <span className="label !text-ink">
        //{String(s.num).padStart(2, "0")} · {s.title}
      </span>
      <span className="label">SHT {s.num}/{sheets.length}</span>
      {meta ? <span className="label hidden sm:inline">{meta}</span> : null}
      {children ? <span className="ml-auto">{children}</span> : null}
    </div>
  );
}
