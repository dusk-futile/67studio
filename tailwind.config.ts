import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        netflix: {
          red: "#E50914",
          redHover: "#B81D24",
          black: "#000000",         // Pure cinema pitch black
          canvas: "#000000",
          deep: "#000000",
          card: "#121212",          // Clean dark card
          cardElevated: "#181818",  // Elevated hover drawer
          hover: "#222222",
          match: "#46D369",
          muted: "#808080",
          secondary: "#B3B3B3",
          border: "rgba(255, 255, 255, 0.12)",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
