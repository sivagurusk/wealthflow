/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#064e3b', // Deep Emerald
        'brand-green': '#10b981', // Emerald
      }
    },
  },
  plugins: [],
}
