/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    colors: {
      primary: "#7e57c2",
      secondary: '#e1a026',
      default: "#333333",
      white: "#ffffff",
      black: "#000000",
      darkGray: "",
      lightGrey: "",
    },
    fontFamily: {
      'sans': ['Oswald', 'serif'],
    },
  },
  plugins: [],
}
