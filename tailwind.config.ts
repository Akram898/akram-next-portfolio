import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "var(--void)",
        carbon: "var(--carbon)",
        chalk: "var(--chalk)",
        fog: "var(--fog)",
        line: "var(--line)",
        pulse: "var(--pulse)",
        signal: "var(--signal)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      maxWidth: {
        frame: "90rem",
      },
    },
  },
  plugins: [],
};

export default config;
