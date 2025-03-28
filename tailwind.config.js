/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,tsx,js,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "header": "url('/bg.jpg')",
      }
    },
    colors: {
      cream: '#F2EFE7',
      lightBlue: '#9ACBD0',
      teal: '#48A6A7',
      darkTeal: '#006A71',
    },
  },
  plugins: [],
}

