/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00c2b3',
        secondary: '#3498db',
        dark: {
          DEFAULT: '#0f172a',
          lighter: '#1e293b'
        },
        light: {
          DEFAULT: '#f8fafc',
          darker: '#e2e8f0'
        }
      }
    }
  },
  plugins: []
}
