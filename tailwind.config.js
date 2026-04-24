/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        color_layer_001: "var(--color_layer_001)",
        color_layer_002: "var(--color_layer_002)",
        color_layer_007: "var(--color_layer_007)",
        color_layer_008: "var(--color_layer_008)",
        color_layer_052: "var(--color_layer_052)",
        color_layer_039: "var(--color_layer_039)",
        color_layer_045: "var(--color_layer_045)",
        color_layer_070: "var(--color_layer_070)",
        color_layer_053: "var(--color_layer_053)",
        // #color_layer_007
        background: "var(--background)",
        foreground: "var(--foreground)",
        transparent: "transparent",
      }
    },
  },
  plugins: [],
}

