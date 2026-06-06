import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gold: "rgb(var(--gold-rgb) / <alpha-value>)",
        "gold-light": "rgb(var(--gold-light-rgb) / <alpha-value>)",
        "gold-dark": "rgb(var(--gold-dark-rgb) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        cream: "rgb(var(--cream-rgb) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-roboto)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
}
export default config
