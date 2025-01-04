/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Mencakup semua file di folder src
    "./src/pages/**/*.{js,jsx}", // Semua file di folder pages
    "./src/components/**/*.{js,jsx}", // Semua file di folder components
    "./src/styles/**/*.css", // Semua file CSS di folder styles
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
