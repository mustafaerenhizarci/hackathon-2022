/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#FFFFFF",
          secondary: "#67686D",
          accent: "#FF8700",
          neutral: "#EEEEEE",
          "base-100": "#242A32",
          "base-200": "#3A3F47",
          "base-300": "#67686D",
          info: "#0296E5",
          success: "#9CB686",
          warning: "#FFD261",
          error: "#FC9783",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
