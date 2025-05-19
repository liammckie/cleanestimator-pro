
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      zIndex: {
        '100': '100',
        '1000': '1000',
      },
      colors: {
        border: 'hsl(0 0% 20%)',
        input: 'hsl(0 0% 20%)',
        ring: 'hsl(141 72% 45%)',
        background: 'hsl(0 0% 8%)',
        foreground: 'hsl(0 0% 100%)',
        primary: {
          DEFAULT: '#1db954',
          foreground: '#FFFFFF'
        },
        secondary: {
          DEFAULT: '#2f2f2f',
          foreground: '#FFFFFF'
        },
        destructive: {
          DEFAULT: '#ff5252',
          foreground: '#FFFFFF'
        },
        muted: {
          DEFAULT: '#2c2c2c',
          foreground: '#999999'
        },
        accent: {
          DEFAULT: '#232e3c',
          foreground: '#FFFFFF'
        },
        popover: {
          DEFAULT: '#1A1F2C',
          foreground: '#FFFFFF'
        },
        card: {
          DEFAULT: '#232e3c',
          foreground: '#FFFFFF'
        },
        sidebar: {
          DEFAULT: '#121212',
          foreground: '#FFFFFF',
          border: '#333333',
          accent: '#232e3c',
          'accent-foreground': '#FFFFFF',
          ring: '#1db954',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
