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
      primary: '#201E43',
      secondary: '#134B70',
      third:'#508C9B',
      fourth: '#EEEEEE',
    },
  },
  plugins: [],
}

