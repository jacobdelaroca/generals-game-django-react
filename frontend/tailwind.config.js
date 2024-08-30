/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light": "#ECDFCC",
        "medium-1": "#697565",
        "medium-2": "#3C3D37",
        "dark": "#1E201E",
      }
    },
  },
  plugins: [],
}