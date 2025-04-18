/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      colors: {
        // Geoguessr palette
        "geoguessr-green": "#54d988",
        "geoguessr-dark-green": "#43ac6a",
        "geoguessr-blue": "#0790f1",
        "geoguessr-dark-blue": "#0367b4",
        "geoguessr-red": "#f25c5c",
        "geoguessr-dark-red": "#cd4c4c",
        "geoguessr-yellow": "#ffdb5c",
        "geoguessr-dark-yellow": "#d1b143",
        "geoguessr-purple": "#c490d1",
        "geoguessr-dark-purple": "#a276af",
        "geoguessr-grey": "#e7e7e7",
        "geoguessr-dark-grey": "#d5d5d5",
        "geoguessr-black": "#252525",
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "1rem",
      },
      boxShadow: {
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
