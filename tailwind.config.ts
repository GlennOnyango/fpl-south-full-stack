import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      blue: "#1fb6ff",
      gray: "#8492a6",
      black: "#222222",
      white: "#ffffff",
      lime: "#09ff87",
      "dark-txt": "#270031",
      "gray-dark": "#273444",
      "gray-light": "#d3dce6",
      "glenn-dark": "#1a1a1a",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      backgroundColor: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        tertiary: "var(--color-bg-tertiary)",
        quaternary: "var(--color-bg-quaternary)",
        quinary: "var(--color-bg-quinary)",
        senary: "var(--color-bg-senary)",
        septenary: "var(--color-bg-septenary)",
        octonary: "var(--color-bg-octonary)",
        nonary: "var(--color-bg-nonary)",
        denary: "var(--color-bg-denary)",
      },
    },
  },
  plugins: [],
};
export default config;
