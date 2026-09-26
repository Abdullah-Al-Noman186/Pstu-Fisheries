/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50:  "#eff8ff",
          100: "#dbeefe",
          200: "#bfe2fe",
          300: "#93cffd",
          400: "#60b3fa",
          500: "#3b93f6",
          600: "#1d72eb",
          700: "#155dd8",
          800: "#174caf",
          900: "#19428a",
          950: "#142a54",
        },
        teal: {
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
        },
        sand: "#f0f4f8",
        wave: "#e8f4fd",
      },
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["Merriweather", "Georgia", "serif"],
      },
      backgroundImage: {
        "ocean-gradient": "linear-gradient(135deg, #142a54 0%, #1d72eb 50%, #14b8a6 100%)",
        "wave-gradient":  "linear-gradient(180deg, #eff8ff 0%, #ffffff 100%)",
      },
      animation: {
        wave:  "wave 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%":      { transform: "translateY(-12px) rotate(2deg)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        fisheries: {
          primary:             "#1d72eb",
          "primary-content":   "#ffffff",
          secondary:           "#14b8a6",
          "secondary-content": "#ffffff",
          accent:              "#3b93f6",
          neutral:             "#142a54",
          "base-100":          "#ffffff",
          "base-200":          "#eff8ff",
          "base-300":          "#dbeefe",
          info:                "#3b93f6",
          success:             "#14b8a6",
          warning:             "#f59e0b",
          error:               "#ef4444",
        },
      },
    ],
  },
};

export default config;