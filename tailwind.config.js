/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dashboard: {
          navy: "#0f172a",
          blue: "#2563eb",
          green: "#16a34a",
          muted: "#64748b",
        },
      },
    },
  },
  plugins: [],
};
