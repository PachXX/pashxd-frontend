/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        // PashxD brand. These are the literals that were previously pasted as
        // raw hex into every landing component (#15803D, #0A2540, ...). New
        // markup must use the token names so a palette change is one edit
        // here instead of a repo-wide find-and-replace.
        brand: {
          green: "#15803D",
          "green-hover": "#166534",
          "green-light": "#22C55E",
          "green-mid": "#16A34A",
          navy: "#0A2540",
          "navy-deep": "#081F33",
          ink: "#0B0F14",
        },
      },
    },
  },
  // line-clamp ships in core since Tailwind v3.3, so the old
  // @tailwindcss/line-clamp plugin line here was both dead and unreachable
  // (it sat after the default export, where it was parsed as a label).
  plugins: [],
};