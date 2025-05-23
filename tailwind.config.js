/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1E90FF',
      },
      fontFamily: {
        spaceMono: ['SpaceMono', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
