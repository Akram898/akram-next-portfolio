import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        dim: "var(--dim)",
        line: "var(--line)",
        trace: "var(--trace)",
        signal: "var(--signal)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      transitionTimingFunction: {
        sheet: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      maxWidth: {
        sheet: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
