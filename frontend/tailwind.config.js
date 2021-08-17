const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        patternTop: "url('/patternTop.svg')",
        patternBottom: "url('/patternBottom.svg')",
      }),
      colors: {
        violet: colors.violet,
        purple: "#635bf6",
        "purple-dark": "#4945d3",
      },
      minHeight: {
        "0": "0",
        "25": "25%",
        "50": "50%",
        "75": "75%",
        full: "100%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
