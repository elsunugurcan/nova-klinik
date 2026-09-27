import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: { brand: "rgb(15 118 110 / <alpha-value>)", brandDeep: "rgb(19 78 74 / <alpha-value>)", mint: "rgb(204 251 241 / <alpha-value>)", ink: "rgb(15 23 42 / <alpha-value>)", sand: "rgb(250 249 246 / <alpha-value>)", stone2: "rgb(100 116 139 / <alpha-value>)" },
      fontFamily: { sans: ["var(--font-poppins)", "system-ui", "sans-serif"], serif: ["var(--font-lora)", "Georgia", "serif"] },
      boxShadow: { soft: "0 1px 2px rgba(15,23,42,.04), 0 24px 48px -32px rgba(15,23,42,.25)" },
    },
  },
  plugins: [],
};
export default config;
