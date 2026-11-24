"use client";

import { useEffect, useState } from "react";

/* Dark is the brand default. The choice is stored and applied before paint by the
   inline script in layout.tsx, so there is no flash on reload. */
export default function ThemeSwitch({ toLight, toDark }: { toLight: string; toDark: string }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.getAttribute("data-theme") === "light");
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    const root = document.documentElement;
    root.classList.add("theme-anim");
    if (next) {
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      root.removeAttribute("data-theme");
      localStorage.removeItem("theme");
    }
    window.setTimeout(() => root.classList.remove("theme-anim"), 500);
  }

  return (
    <button type="button" className="ax-theme" onClick={toggle} aria-label={light ? toDark : toLight} title={light ? toDark : toLight}>
      <svg viewBox="0 0 24 24" aria-hidden focusable="false">
        {light ? (
          <path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
          </>
        )}
      </svg>
    </button>
  );
}
