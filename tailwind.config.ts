import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
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
        cinzel: ["var(--font-cinzel)", "serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
        rajdhani: ["var(--font-rajdhani)", "sans-serif"],
      },
    },
  },
  plugins: [],
}
export default config
