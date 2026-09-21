import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        brand: {
          DEFAULT: "#ff6b2c",
          foreground: "#160c04",
          50: "#fff4ec",
          100: "#ffe7d6",
          200: "#ffcea8",
          300: "#ffb07a",
          400: "#ff8f4d",
          500: "#ff6b2c",
          600: "#e85213",
          700: "#c23f0b",
          800: "#9a3309",
          900: "#7a2b0c",
        },
        oil: {
          50: "#f6f8fa",
          100: "#ecf0f4",
          200: "#d7dde5",
          300: "#b9c2ce",
          400: "#98a3b3",
          500: "#3d4a5a",
          600: "#2a3542",
          700: "#1f2833",
          800: "#151b22",
          850: "#10151b",
          900: "#0c1015",
          950: "#07090c",
        },
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        glow: "var(--shadow-glow)",
        "glow-sm": "var(--shadow-glow-sm)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        display: [
          "clamp(2.5rem, 1.5rem + 4.5vw, 4.5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "800" },
        ],
        h1: [
          "clamp(2.125rem, 1.5rem + 2.5vw, 3.5rem)",
          { lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "800" },
        ],
        h2: [
          "clamp(1.75rem, 1.375rem + 1.8vw, 2.75rem)",
          { lineHeight: "1.12", letterSpacing: "-0.015em", fontWeight: "700" },
        ],
        h3: [
          "clamp(1.375rem, 1.25rem + 0.8vw, 1.75rem)",
          { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        h4: [
          "clamp(1.125rem, 1.0625rem + 0.25vw, 1.25rem)",
          { lineHeight: "1.3", letterSpacing: "0", fontWeight: "600" },
        ],
        lead: [
          "clamp(1.0625rem, 1rem + 0.2vw, 1.25rem)",
          { lineHeight: "1.6", letterSpacing: "0.01em" },
        ],
        sm: ["0.875rem", { lineHeight: "1.5" }],
        xs: ["0.75rem", { lineHeight: "1.4" }],
      },
      spacing: {
        grid: "var(--grid-step)",
        "4px": "var(--grid-step)",
        "8px": "calc(var(--grid-step) * 2)",
        "12px": "calc(var(--grid-step) * 3)",
        "16px": "calc(var(--grid-step) * 4)",
        "20px": "calc(var(--grid-step) * 5)",
        "24px": "calc(var(--grid-step) * 6)",
        "32px": "calc(var(--grid-step) * 8)",
        "40px": "calc(var(--grid-step) * 10)",
        "48px": "calc(var(--grid-step) * 12)",
        "56px": "calc(var(--grid-step) * 14)",
        "64px": "calc(var(--grid-step) * 16)",
        "80px": "calc(var(--grid-step) * 20)",
        "96px": "calc(var(--grid-step) * 24)",
        "120px": "calc(var(--grid-step) * 30)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
        "glow-ember":
          "radial-gradient(closest-side, rgba(255, 107, 44, 0.3), rgba(255, 107, 44, 0.08) 45%, transparent 100%)",
        "glow-cool":
          "radial-gradient(closest-side, rgba(143, 176, 217, 0.18), transparent 100%)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(1rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        "fade-in": "fade-in 0.8s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;