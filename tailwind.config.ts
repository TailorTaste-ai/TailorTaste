import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#141715",
        paper: "#eee8dc",
        chalk: "#fffaf1",
        mist: "#d7d3c7",
        graphite: "#403f39",
        accent: "#8a5b37",
        cypress: "#123a34",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 28px 80px rgba(23, 21, 19, 0.13)",
      },
    },
  },
  plugins: [],
};

export default config;
