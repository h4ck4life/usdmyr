// eslint-disable-next-line no-undef
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'google': ['Dosis', '"sans-serif"']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
