/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#1e293b', // Slate 800
        secondary: '#475569', // Slate 600
        accent: '#f97316', // Orange 500
        'glass-bg': 'rgba(30, 41, 59, 0.7)', // Slate 800 with 70% opacity
        'glass-border': 'rgba(255, 255, 255, 0.1)',
        'glow-accent': 'rgba(249, 115, 22, 0.5)', // Orange 500 with 50% opacity
      },
      gridTemplateColumns: {
        // Custom grid for the dashboard layout
        dashboard: '300px 1fr',
      },
      animation: {
        'gradient-x':'gradient-x 15s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size':'200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size':'200% 200%',
            'background-position': 'right center'
          }
        }
      }
    },
  },
  plugins: [],
};
