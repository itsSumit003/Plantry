// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        ternary: "var(--ternary-color)",
        textSecondary: "var(--text-secondary-color)",
        blue: "var(--blue-color)",
        yellow: "var(--yellow-color)",
        grey: "var(--bg-grey)",
        danger: "var(--danger-color)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        bree: ["Bree Serif", "serif"],
      },
    },
  },
  plugins: [],
};
