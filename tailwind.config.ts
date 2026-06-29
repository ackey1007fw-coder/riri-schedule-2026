import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        porcelain: "#fffdf7",
        blush: "#f6dad2",
        rosefog: "#c8385a",
        lavender: "#e7c9a6",
        lilac: "#9a3048",
        champagne: "#c29a4a",
        ink: "#312a2e",
        moss: "#60705c"
      },
      fontFamily: {
        display: [
          "Playfair Display",
          "Georgia",
          "Yu Mincho",
          "Hiragino Mincho ProN",
          "serif"
        ],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "Yu Gothic",
          "Hiragino Sans",
          "sans-serif"
        ]
      },
      boxShadow: {
        paper: "0 18px 50px rgba(120, 30, 50, 0.12)",
        button: "0 12px 24px rgba(194, 154, 74, 0.20)"
      }
    }
  },
  plugins: []
} satisfies Config;
