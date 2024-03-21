const {nextui} = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./node_modules/@nextui-org/theme/dist/components/progress.js","./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}

