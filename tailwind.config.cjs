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
        extrabold: 800,
        black: 900,
        extrablack: 1000,
      },
      colors: {
        // Nouvelle palette de couleurs
        "purple-10": "#D9D7F0",
        "purple-20": "#A19BD9",
        "purple-50": "#7950E5",
        "purple-80": "#563B9A",
        "purple-100": "#1A1A2E",
        black: "#10101C",

        // Couleurs d'accent
        "yellow-50": "#FECD19",
        "orange-50": "#FFA43D",
        "orange-80": "#BF7B2E",
        "green-50": "#97E851",
        "green-80": "#6CB928",
        "turquoise-50": "#3AE8BD",
        "turquoise-80": "#1F9C7D",
        "blue-50": "#00A2FE",
        "red-50": "#E94560",

        // Anciennes couleurs pour compatibilité
        "geoguessr-green": "#97E851",
        "geoguessr-dark-green": "#6CB928",
        "geoguessr-blue": "#00A2FE",
        "geoguessr-dark-blue": "#0367b4",
        "geoguessr-red": "#E94560",
        "geoguessr-dark-red": "#cd4c4c",
        "geoguessr-yellow": "#FECD19",
        "geoguessr-dark-yellow": "#BF7B2E",
        "geoguessr-purple": "#7950E5",
        "geoguessr-dark-purple": "#563B9A",
        "geoguessr-grey": "#e7e7e7",
        "geoguessr-dark-grey": "#d5d5d5",
        "geoguessr-black": "#10101C",
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
