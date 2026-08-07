import type { Config } from "tailwindcss";

/**
 * StoneWave design tokens.
 *
 * Evolved from the Provable Outcomes cues (navy ink, warm paper, ember
 * orange, proof green) into a paper-first editorial system. Rhymes with
 * PO and DealControl without cloning either.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#071b2d", // PO navy
          deep: "#04101c",
          raise: "#0c2740",
          line: "#1c3a55",
          mute: "#5b7186",
        },
        paper: {
          DEFAULT: "#f7f5ef", // PO paper
          bright: "#fdfcf8",
          shade: "#eeeade",
          line: "#ddd6c4",
        },
        ember: {
          DEFAULT: "#d77125", // PO orange
          deep: "#b85c15",
          wash: "#f9e9db",
        },
        proof: {
          DEFAULT: "#39734f", // PO green
          deep: "#2c5a3e",
          wash: "#e4eee7",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        wrap: "72rem",
        prose: "38rem",
      },
      transitionTimingFunction: {
        swift: "cubic-bezier(0.22, 1, 0.36, 1)",
        soft: "cubic-bezier(0.33, 1, 0.68, 1)",
      },
      boxShadow: {
        island:
          "0 1px 2px rgba(7,27,45,0.06), 0 8px 28px rgba(7,27,45,0.12)",
        card: "0 1px 2px rgba(7,27,45,0.05), 0 10px 32px rgba(7,27,45,0.07)",
        lift: "0 2px 4px rgba(7,27,45,0.07), 0 18px 48px rgba(7,27,45,0.13)",
        "ink-card":
          "0 1px 2px rgba(0,0,0,0.25), 0 12px 36px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
