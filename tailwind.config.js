const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blueGray: colors.blueGray,
        success: colors.emerald,
        danger: colors.red,
        warning: colors.yellow,
        info: colors.cyan,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
