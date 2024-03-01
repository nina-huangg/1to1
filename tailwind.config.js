/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./src/Login/login.html",
    "./src/MyMeetings/index.html",
  ],
  theme: {
    extend: {
      colors: {
        "background-color": "#F4F3ED",
        "logo-color": "#005A5B",
        "primary-blue": "#52B7B1",
        "primary-blue-hover": "#2B928B",
        orange: "#EE6A4C",
        "orange-hover": "#DD4522",
        turquoise: "#6EB3AF",
        pinkie: "#FBB5A5", // Corrected color definition without extra comma
      },
      fontFamily: {
        serif: [
          "Aleo",
          "ui-serif",
          "Georgia",
          ...defaultTheme.fontFamily.serif,
        ],
      },
      plugins: [],
    },
  },
};
