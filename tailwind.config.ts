/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        // "2xl": "1400px",
        xs: "357px",
        sm: "540px",
        md: "880px",
        lg: "1280px",
        xl: "1440px",
        "2xl": "1680px",
        "3xl": "1920px",
        "4xl": "2240px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Lato", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "afruna-base": "#3C3C3C",
        "afruna-blue": "#282C4B",
        "afruna-gold": "#FF9017",
        "afruna-gray": "#747582",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "gradient-newsletter":
          "linear-gradient(135deg, #F2F4FF 0%, #FAFAFF 100%)",
        "gradient-showcase":
          "linear-gradient(93.46deg, #06598F 69.49%, #FED6AC 137.07%)",
        "gradient-action-btn":
          "linear-gradient(135deg, #52E5E7 0%, #130CB7 100%)",
        "gradient-action-provider":
          "linear-gradient(135deg, #00AEEF 0%, #0C0E3B 100%)",
        "gradient-action-service":
          "linear-gradient(160deg, rgba(155, 228, 255, 0.45) 0%, rgba(242, 243, 255, 0.00) 219.28%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
