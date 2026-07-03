/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 40px rgba(34, 197, 94, 0.12)',
      },
      colors: {
        brand: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63'
        }
      },
      backgroundImage: {
        'radial-grid': 'radial-gradient(circle at top left, rgba(34, 197, 94, 0.18), transparent 30%), radial-gradient(circle at bottom right, rgba(14, 165, 233, 0.18), transparent 24%)'
      }
    }
  },
  plugins: []
};
