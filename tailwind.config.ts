import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#172026",
        basalt: "#23343c",
        saffron: "#d99a29",
        mint: "#1f9d7a",
        clay: "#c76442",
        paper: "#f7f4ec"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 32, 38, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
