/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'my-columns': 'auto 1fr auto'
      }
    },
  },
  plugins: [],
}