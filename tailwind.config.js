/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark mode palette with high contrast
        dark: {
          bg: '#000000',        // Pure black background
          surface: '#0a0a0a',   // Slightly lighter surface
          card: '#111111',      // Card backgrounds
          border: '#1a1a1a',    // Subtle borders
          hover: '#1f1f1f',     // Hover states
        },
        neon: {
          cyan: '#00ffff',      // Bright cyan
          green: '#00ff00',     // Electric green
          pink: '#ff00ff',      // Hot pink
          yellow: '#ffff00',    // Electric yellow
          blue: '#0080ff',      // Electric blue
          purple: '#8000ff',    // Electric purple
        },
        contrast: {
          high: '#ffffff',      // Pure white text
          medium: '#e5e5e5',    // Light gray text
          low: '#999999',       // Dimmed text
          accent: '#00ffff',    // Cyan accent
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'neon-pulse': 'neon-pulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { 
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
            filter: 'brightness(1)'
          },
          '100%': { 
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
            filter: 'brightness(1.2)'
          }
        },
        'neon-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
            opacity: '1'
          },
          '50%': { 
            boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
            opacity: '0.8'
          }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'dark-grid': 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '20px 20px',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      typography: {
        'neon': {
          css: {
            '--tw-prose-headings': '#ffffff',
            '--tw-prose-body': '#e5e5e5',
            '--tw-prose-links': '#00ffff',
          }
        }
      }
    },
  },
  plugins: [],
}
