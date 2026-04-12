import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#141715",
        paper: "#f2f5f1",
        chalk: "#fbfdf9",
        mist: "#d8ddd6",
        graphite: "#3c443d",
        accent: "#1f6b5b",
        cypress: "#123a34",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 24px 80px rgba(23, 21, 19, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
