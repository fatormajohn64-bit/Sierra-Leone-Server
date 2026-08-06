/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sls: {
          bg: '#0A0D14',      // Deep background
          card: '#11151E',    // Card background
          border: '#1D2432',  // Subtle borders
          muted: '#8A94A6',   // Muted text
          green: '#10B981',   // Online status / Success
          blue: '#3B82F6',    // RAM / Web
          purple: '#8B5CF6',  // Storage / DB
          red: '#EF4444',     // AI Services
          yellow: '#F59E0B'   // Bandwidth / Warnings
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
