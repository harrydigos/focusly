/* eslint-disable no-undef */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["var(--primary-font)"],
      },
      colors: {
        bgColor: "var(--bg-color)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("prettier-plugin-tailwindcss"),
  ],
};
