module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        accent: "#F59E42",
        secondary: "#F3F4F6",
        background: "#fff",
        foreground: "#171717",
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', "sans-serif"],
        mono: ['var(--font-geist-mono)', "monospace"],
      },
    },
  },
  plugins: [],
};
