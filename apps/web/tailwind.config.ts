import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07111f"
      },
      boxShadow: {
        glow: "0 0 80px rgba(56, 189, 248, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
