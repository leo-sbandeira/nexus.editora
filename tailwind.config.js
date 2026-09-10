/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        azul: "#0a4b74",
        "azul-escuro": "#073752",
        cinza: "#b1b2b3",
        "cinza-claro": "#e7e8e8",
        preto: "#0a0a0a",
        branco: "#ffffff",
      },
      fontFamily: {
        display: ["var(--font-nexus)", "sans-serif"],
        sans: ["var(--font-nexus)", "sans-serif"],
      },
      borderRadius: {
        none: "0px",
      },
    },
  },
  plugins: [],
};
