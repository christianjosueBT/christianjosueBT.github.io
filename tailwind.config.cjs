/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  // safelist: ['opacity-0'],
  theme: {
    extend: {
      fontFamily: {
        karnak: ['karnak-condensed', 'sans-serif'],
        clearSans: ['clear-sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
        boldSans: ['clear-sans-bold', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        scale: 'scale 0.1s linear',
        wiggle: 'wiggle 0.1s ease-in-out 4',
        flip: 'flip 0.5s ease-in-out 1',
        bounce: 'bounce 0.4s ease-in-out 1.5',
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
            transform: 'translateX(-1%)',
          },
          '66%': {
            transform: 'translateX(1%)',
          },
        },
        flip: {
          '0%, 100%': {
            transform: 'rotateX(0)',
          },
          '50%': {
            transform: 'rotateX(90deg)',
          },
        },
        bounce: {
          '10%, 40%, 70%': {
            transform: 'translsateY(0)',
          },
          '30%': {
            transform: 'translsateY(-30px)',
          },
          '60%': {
            transform: 'translsateY(-15px)',
          },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animation-delay')],
}
