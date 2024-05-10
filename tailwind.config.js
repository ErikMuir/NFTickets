/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    colors: {
      "primary": "#7e57c2",
      "secondary": "#e1a026",
      "success": "#5fa052",
      "info": "#3b719f",
      "warning": "#ed6c02",
      "error": "#ef5350",
      "default": "#333333",
      "black": "#000000",
      "gray-dark": "#333333",
      "gray-medium": "#888888",
      "gray-light": "#cccccc",
      "off-white": "#faf9f6",
      "white": "#ffffff",
    },
    fontFamily: {
      "sans": ["Oswald", "serif"],
    },
  },
  plugins: [],
}
