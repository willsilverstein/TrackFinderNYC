import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#1D9E75",
          50: "#E8F7F2",
          100: "#C5EBD9",
          500: "#1D9E75",
          600: "#178A64",
          700: "#117352",
        },
      },
    },
  },
  plugins: [],
};
export default config;
