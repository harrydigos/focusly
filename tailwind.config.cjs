/* eslint-disable no-undef */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["var(--primary-font)"],
      },
    },
  },
  plugins: [require("prettier-plugin-tailwindcss")],
};
