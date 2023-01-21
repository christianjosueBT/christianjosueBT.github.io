/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        karnak: ['karnak-condensed', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
