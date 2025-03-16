/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#2D1B69',
        'light-purple': '#6B46C1',
        'player-x': '#3B82F6', // Blue for X
        'player-o': '#EF4444', // Red for O
      },
      animation: {
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-once': 'bounce 0.5s ease-in-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 