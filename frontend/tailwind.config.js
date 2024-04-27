/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",

  theme: {
    extend: {
      colors:{
        "primary": "#6C63FF", // Purple
        "bg-dark-1": "#333333", // Dark Gray
        "bg-dark-2": "#1E1E1E", // Very Dark Gray
        "bg-light-1": "#FFFFFF", // White
        "bg-light-2": "#F2F2F2", // Light Gray
        "font-dark-1": "#FFFFFF", // White
        "font-dark-2": "#CCCCCC", // Light Gray
        "font-light-1": "#333333", // Dark Gray
        "font-light-2": "#666666", // Medium Gray
      }
    },
  },
  plugins: [],
}