import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        primary: "#009848",
        transparent: "rgba(0, 0, 0, 0)",
        black: "#232933",
        ["dark-blue"]: "#003452",
        ["cyan-blue"]: "#BDE3FF",
        ["orange-bricks"]: "#BF5540",
        blue: {
          DEFAULT: "#448AFF",
          // 200: "#8b8c92",
          // 900: "#1C44D5",
        },
        green: {
          DEFAULT: "#14AE5C",
          300: "#AFF4C6",
        },
        grey: {
          300: "#F2F4F7",
          400: "#F2EFED",
          800: "#8B95A5",
          900: "#626B79",
        },
      },
      animation: {
        // marquee: "marquee 25s linear infinite",
        rotateTop: "marquee 30s linear infinite",
        rotateBottom: "rotate 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateY(33%)" },
          "50%": { transform: "translateY(-33%)" },
          "100%": { transform: "translateY(33%)" },
        },
        rotate: {
          "0%": { transform: "translateY(-33%)" },
          "50%": { transform: "translateY(33%)" },
          "100%": { transform: "translateY(-33%)" },
        },
      },
    },
  },
  screens: {
    sm: [{ min: "320px", max: "668px" }],
    md: [{ min: "668px", max: "1100px" }],
    lg: "1100px",
    xl: "1400px",
  },
  darkMode: "class",
  plugins: [heroui()],
};
