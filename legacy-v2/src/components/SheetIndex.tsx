"use client";

import { sheets } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

/* The fixed "sheet index" of the drawing set — the site's only nav. */
export default function SheetIndex() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-md">
      <nav
        aria-label="Sheet index"
        className="mx-auto flex h-14 max-w-sheet items-center justify-between gap-4 px-4 sm:px-8"
      >
        <a
          href="#control-plane"
          className="label flex items-center px-1 py-3 !text-ink transition-colors duration-150 hover:!text-trace"
        >
          A·AKRAM
        </a>
        <div className="flex items-center gap-2 sm:gap-5">
          <ul className="hidden items-center gap-1 sm:flex">
            {sheets.slice(1).map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="label flex items-center px-2.5 py-3 transition-colors duration-150 hover:!text-trace"
                >
                  {s.nav}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex items-center sm:hidden">
            {sheets.slice(1).map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="label flex h-11 min-w-9 items-center justify-center px-1.5 transition-colors duration-150 hover:!text-trace"
                >
                  {s.num}
                  <span className="sr-only"> — {s.nav}</span>
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
