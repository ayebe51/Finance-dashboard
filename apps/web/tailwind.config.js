/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#2bee6c",
        "primary-hover": "#24c95b",
        "background-light": "#f6f8f6",
        "background-dark": "#112217",
        "card-dark": "#1c3624",
        "surface-dark": "#1c3624",
        "border-dark": "#23482f",
        "text-muted": "#92c9a4",
        "text-secondary": "#92c9a4",
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"],
        "body": ["Manrope", "sans-serif"],
      },
      borderRadius: {
        "lg": "0.5rem", 
        "xl": "0.75rem", 
      },
      keyframes: {
        "slide-down": {
          "0%": { height: "0", opacity: "0" },
          "100%": { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "slide-up": {
          "0%": { height: "var(--radix-accordion-content-height)", opacity: "1" },
          "100%": { height: "0", opacity: "0" },
        },
        "fade-in-down": {
            "0%": { opacity: "0", transform: "translateY(-10px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
        }
      },
      animation: {
        "slide-down": "slide-down 0.2s ease-out",
        "slide-up": "slide-up 0.2s ease-out",
        "fade-in-down": "fade-in-down 0.3s ease-out",
      },
    },
  },
  plugins: [],
}
