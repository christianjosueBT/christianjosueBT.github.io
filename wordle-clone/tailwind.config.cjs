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
        wiggle: 'wiggle 0.1s ease-in-out 4',
        flip: 'flip 0.75s ease-in 1',
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
          // '55%': {
          //   transform: 'rotateX(90deg)',
          // },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animation-delay')],
}
