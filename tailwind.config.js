/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "hrip-navy": "#020617",
        "hrip-charcoal": "#0b1120",
        "hrip-gold": "#fbbf24",
      },
    },
  },
  plugins: [],
};


