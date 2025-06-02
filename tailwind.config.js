/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1e40af'
        }
      }
    }
  },
  plugins: []
}
