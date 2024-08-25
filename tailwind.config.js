/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      mono: ["Oxygen Mono", "monospace"]
    },
    extend: {
      animation: {
        cursorBlink: "cursorBlink 0.6s ease-in-out alternate infinite"
      },
      keyframes: {
        cursorBlink: {
          "0%": { borderBottom: "#000000 4px solid"},
          "100%": { borderBottom: "none"},
        }
      }
    },
  },
  plugins: [],
}

