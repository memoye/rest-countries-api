/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["'Nunito Sans'", "ui-sans-serif", "sans-serif", "system-ui"],
    },
    fontWeight: {
      normal: "300",
      semibold: "600",
      bold: "800",
    },
    extend: {
      colors: {
        dark: {
          element: "hsl(var(--dark-element) / <alpha-value>)",
          background: "hsl(var(--dark-background) / <alpha-value>)",
          text: {
            DEFAULT: "hsl(var(--dark-text) / <alpha-value>)",
            input: "hsl(var(--dark-text-input) / <alpha-value>)",
          },
        },
        light: {
          element: "hsl(var(--light-element) / <alpha-value>)",
          background: "hsl(var(--light-background) / <alpha-value>)",
          text: {
            DEFAULT: "hsl(var(--light-text) / <alpha-value>)",
            input: "hsl(var(--light-text-input) / <alpha-value>)",
          },
        },
      },
    },
  },
  plugins: [],
};
