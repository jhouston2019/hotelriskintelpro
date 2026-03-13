/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "hrip-navy": "#1e3a8a",
        "hrip-blue": "#3b82f6",
        "hrip-light": "#eff6ff",
        "hrip-gold": "#f59e0b",
        "hrip-orange": "#fb923c",
      },
    },
  },
  plugins: [],
};



