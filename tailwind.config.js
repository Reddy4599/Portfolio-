/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Orbitron", "sans-serif"],
        body: ["DM Sans", "sans-serif"]
      },
      colors: {
        cosmic: {
          950: "#03060f",
          900: "#070b16",
          850: "#0b1020",
          800: "#101735"
        },
        neon: {
          cyan: "#22f3ff",
          violet: "#a855f7",
          blue: "#4f7cff"
        }
      },
      boxShadow: {
        neon: "0 0 30px rgba(34, 243, 255, 0.25)",
        violet: "0 0 30px rgba(168, 85, 247, 0.25)"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 12px rgba(34, 243, 255, 0.35)" },
          "50%": { boxShadow: "0 0 26px rgba(168, 85, 247, 0.55)" }
        },
        sweep: {
          "0%": { transform: "translateX(-120%) rotate(18deg)" },
          "100%": { transform: "translateX(220%) rotate(18deg)" }
        }
      },
      animation: {
        shimmer: "shimmer 1.8s linear infinite",
        float: "float 5s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.8s ease-in-out infinite",
        sweep: "sweep 2.1s ease-in-out infinite"
      },
      backgroundImage: {
        radialGrid:
          "radial-gradient(circle at 20% 20%, rgba(34,243,255,0.08), transparent 30%), radial-gradient(circle at 80% 80%, rgba(168,85,247,0.08), transparent 26%)"
      }
    }
  },
  plugins: []
};
