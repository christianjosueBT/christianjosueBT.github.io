/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        karnak: ['karnak-condensed', 'sans-serif'],
        clearSans: ['clear-sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
        boldSans: ['clear-sans-bold', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
