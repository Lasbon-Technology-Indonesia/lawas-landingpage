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
      },
      theme: {
      extend: {
        animation: {
          'float-1': 'float 6s ease-in-out infinite',
          'float-2': 'float 7s ease-in-out infinite',
          'float-3': 'float 5s ease-in-out infinite',
          'float-4': 'float 8s ease-in-out infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
        },
      },
    }
    }
  },
  plugins: []
}
