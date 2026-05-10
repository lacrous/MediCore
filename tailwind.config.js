/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
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
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
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
        // MediCore custom colors (dark defaults, overridden in light via CSS vars)
        mc: {
          bg: 'var(--mc-bg)',
          surface: 'var(--mc-surface)',
          'surface-elevated': 'var(--mc-surface-elevated)',
          gold: 'var(--mc-gold)',
          'gold-hover': 'var(--mc-gold-hover)',
          orange: 'var(--mc-orange)',
          'orange-hover': 'var(--mc-orange-hover)',
          'text-primary': 'var(--mc-text-primary)',
          'text-secondary': 'var(--mc-text-secondary)',
          'text-muted': 'var(--mc-text-muted)',
          border: 'var(--mc-border)',
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'mc-card': '0 1px 3px rgba(0,0,0,0.12), 0 0 0 1px var(--mc-border)',
        'mc-card-dark': '0 1px 3px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)',
        'mc-card-hover': '0 4px 12px rgba(0,0,0,0.15), 0 0 0 1px var(--mc-border-active)',
        'mc-card-hover-dark': '0 4px 12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)',
        'mc-button': '0 2px 8px rgba(255,107,0,0.3)',
        'mc-button-hover': '0 4px 16px rgba(255,107,0,0.4)',
        'mc-gold-glow': '0 0 20px rgba(212,175,55,0.15)',
        'mc-gold-active': '0 0 8px rgba(212,175,55,0.3)',
        'mc-dropdown': '0 8px 24px rgba(0,0,0,0.12)',
        'mc-dropdown-dark': '0 8px 24px rgba(0,0,0,0.5)',
        'mc-notify': '0 12px 32px rgba(0,0,0,0.15)',
        'mc-notify-dark': '0 12px 32px rgba(0,0,0,0.5)',
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "sparkline-draw": {
          from: { strokeDashoffset: "var(--sparkline-length)" },
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "sparkline-draw": "sparkline-draw 0.6s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
