import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        green: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
          cream: {
          50: "#fdfcfa",
          100: "#f7f3ec",
          200: "#ebe4d7",
          300: "#ddd4c4",
          400: "#c9bba8",
          500: "#b5a892",
          600: "#9d8f7a",
        },
        // Brand specific (Verdant Pearl)
        brand: {
          green: "#2a5245",
          "green-light": "#4d8b73",
          "green-dark": "#1a332b",
          gold: "#c6a94c",
          "gold-light": "#dcc875",
          "gold-dark": "#8b6914",
          cream: "#f7f3ec",
          white: "#fafaf9",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, rgba(26,50,43,0.9) 0%, rgba(42,82,69,0.78) 50%, rgba(198,169,76,0.28) 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #8b6914 0%, #c6a94c 45%, #dcc875 100%)",
        "green-gradient":
          "linear-gradient(135deg, #1a332b 0%, #2a5245 50%, #4d8b73 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "fade-up": "fadeUp 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.6s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        luxury: "0 20px 60px rgba(28,24,20,0.12), 0 4px 16px rgba(28,24,20,0.08)",
        gold: "0 4px 22px rgba(198,169,76,0.32)",
        "gold-lg": "0 10px 42px rgba(198,169,76,0.42)",
        green: "0 4px 22px rgba(42,82,69,0.32)",
        glass: "0 10px 36px rgba(28,24,20,0.1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
};

export default config;
