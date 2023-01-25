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
      animation: {
        scale: 'scale 0.1s linear',
        wiggle: 'wiggle 0.2s ease-in-out 3',
      },
      keyframes: {
        scale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        wiggle: {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '33%': {
            transform: 'translateX(-2.5%)',
          },
          '66%': {
            transform: 'translateX(2.5%)',
          },
        },
      },
    },
  },
  plugins: [],
}
