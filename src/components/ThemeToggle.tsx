"use client";

import { useEffect, useState } from "react";

/* Dark is the brand default; light is the alternative. */
export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(localStorage.getItem("theme") === "light");
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    if (next) {
      localStorage.setItem("theme", "light");
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      localStorage.removeItem("theme");
      document.documentElement.removeAttribute("data-theme");
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={light}
      className="label flex min-h-11 items-center gap-1.5 rounded-full border border-line px-3 transition-colors duration-150 hover:border-trace hover:!text-trace"
    >
      <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-trace" />
      {light ? "DAY" : "NIGHT"}
      <span className="sr-only"> theme — activate to switch</span>
    </button>
  );
}
