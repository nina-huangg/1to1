/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./src/**/*.{html,js}", "./src/Login/login.html"],
  theme: {
    extend: {
      colors: {
        'background-color': '#F4F3ED',
        'logo-color': "#005A5B",
        'dark-green': '#005A5B',
        'orange': '#EE6A4C',

    },
    fontFamily: {
      'serif': ['Aleo', 'ui-serif', 'Georgia', ...defaultTheme.fontFamily.serif],
    }
  },
  plugins: [],
}

}