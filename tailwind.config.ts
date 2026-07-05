import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        porcelain: "#fffafc",
        blush: "#f8dce8",
        rosefog: "#f2b8cd",
        lavender: "#dcd4ff",
        lilac: "#b7a6e8",
        champagne: "#d7ad62",
        // champagneは白背景だと約2.1:1しかコントラストが出ないため、
        // 本文として読ませるラベル・テキストには濃いめのこちらを使う（装飾・アイコンはchampagneのまま）。
        champagneInk: "#8e6824",
        ink: "#312a2e",
        moss: "#60705c"
      },
      fontFamily: {
        display: ["Georgia", "Yu Mincho", "Hiragino Mincho ProN", "serif"],
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
        paper: "0 18px 50px rgba(94, 62, 81, 0.12)",
        button: "0 12px 24px rgba(215, 173, 98, 0.18)"
      }
    }
  },
  plugins: []
} satisfies Config;
