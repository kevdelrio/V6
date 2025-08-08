/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme'); // Utiliser require

module.exports = { // Utiliser module.exports
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange-vif': '#F97316',
        'orange-vif-dark': '#EA580C',
        'blue-deep': '#1E40AF',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}