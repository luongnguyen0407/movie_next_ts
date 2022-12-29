/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0C111B",
        active: "#FF0000",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
