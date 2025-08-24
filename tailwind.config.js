module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@mayumi-org/toc/dist/**/*.{cjs,mjs}',
  ],
  prefix: '',
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography'), require('@mayumi-org/mayumi-theme')],
}
