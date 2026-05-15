/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-core': '#020502',
        'phos-base': '#00FF41',
        'phos-bright': '#39FF14',
        'phos-muted': '#0A3300',
        'amber-warn': '#FFB000',
        'sodium': '#FCE588',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
