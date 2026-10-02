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
          50:  "#F0FAFC",
          100: "#DFF3F7",
          200: "#BDE7EF",
          300: "#88D2E0",
          400: "#4EB7CD",
          500: "#0891B2",
          600: "#087EA4",
          700: "#076789",
          800: "#075985",
          900: "#123B4A",
          950: "#092A36",
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
        "ocean-gradient": "linear-gradient(135deg, #075985 0%, #087EA4 52%, #2DD4BF 100%)",
        "wave-gradient":  "linear-gradient(180deg, #F0FAFC 0%, #ffffff 100%)",
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
          primary:             "#087EA4",
          "primary-content":   "#ffffff",
          secondary:           "#2DD4BF",
          "secondary-content": "#ffffff",
          accent:              "#0891B2",
          neutral:             "#123B4A",
          "base-100":          "#ffffff",
          "base-200":          "#F0FAFC",
          "base-300":          "#DFF3F7",
          info:                "#0891B2",
          success:             "#0D9488",
          warning:             "#f59e0b",
          error:               "#ef4444",
        },
      },
    ],
  },
};

export default config;
