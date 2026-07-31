import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Premium dark-navy / blue / champagne-gold system (matches the app dashboard)
        night: "#080C18", // page base — near-black navy
        cosmic: "#131C30", // elevated surface / hairline border (de-purpled)
        genie: "#2563EB", // primary royal-blue accent (de-purpled)
        gold: "#D4AF37", // champagne gold accent
        cream: "#F5F8FF", // heading / high-contrast text
        azure: "#3B82F6", // bright blue for gradient tops & glows
        abyss: "#04060E", // deepest navy for vignette edges
        slate: "#8FA0BE", // muted cool-slate body text
        champagne: "#F0D98A", // lighter gold highlight for gradients
        edge: "rgba(122,150,205,0.12)", // cool-white hairline border
      },
      boxShadow: {
        "glow-blue": "0 0 40px rgba(37,99,235,0.35)",
        "glow-gold": "0 0 32px rgba(212,175,55,0.30)",
      },
      fontFamily: {
        heading: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
