export default {
  darkMode: "class",

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        heroFade: {
          "0%": {
            opacity: 0,
            transform: "scale(0.98)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
          },
        },
        heroContent: {
          "0%": {
            opacity: 0,
            transform: "translateY(16px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        shimmer: "shimmer 1.4s infinite",
        "hero-fade": "heroFade 700ms ease-out forwards",
        "hero-content": "heroContent 500ms ease-out 150ms forwards",
      },
    },
  },

  plugins: [],
};
