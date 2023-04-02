const { mayumi, patterns } = require('mayumi/plugin')

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', patterns],
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp'), mayumi],
}
