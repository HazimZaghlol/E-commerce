/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Add your file paths here
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f2f8fc",
          100: "#e0eff9",
          200: "#b9dcf2",
          300: "#86c2ea",
          400: "#4d9de0",
          500: "#007abe", // Main color
          600: "#006da6",
          700: "#00588a",
          800: "#00456d",
          900: "#003355",
        },
        accent: "#ff5722", // Example accent color
      },
    },
  },
  plugins: [],
};
