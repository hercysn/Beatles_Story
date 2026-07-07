import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f3f5e9",
        cream: "#fffdf7",
        ink: "#161412",
        muted: "#5f6659",
        mustard: "#d1a334",
        apple: "#4f7f3a",
        tomato: "#b9533f",
        grove: "#dfe8d2",
        moss: "#829b69",
        vinyl: "#24201c",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
