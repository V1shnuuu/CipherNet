import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}', './server/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        card: 'var(--color-card)',
        border: 'var(--color-border)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        success: 'var(--color-success)',
        accent: 'var(--color-accent)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(0, 245, 160, 0.14), 0 24px 80px rgba(0, 245, 160, 0.12)',
        panel: '0 20px 80px rgba(0, 0, 0, 0.55)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -12px, 0)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' }
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '33%': { transform: 'translate3d(18px, -14px, 0)' },
          '66%': { transform: 'translate3d(-12px, 16px, 0)' }
        }
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
        shimmer: 'shimmer 10s linear infinite',
        drift: 'drift 16s ease-in-out infinite'
      },
      backgroundImage: {
        'grid-fine':
          'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
        'gradient-radial-soft': 'radial-gradient(circle at center, rgba(0, 245, 160, 0.22), transparent 65%)',
        'gradient-metal':
          'linear-gradient(135deg, rgba(0, 245, 160, 0.18), rgba(0, 217, 255, 0.14), rgba(255, 255, 255, 0.04))'
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace']
      },
      backdropBlur: {
        xs: '2px'
      },
      borderRadius: {
        '3xl': '1.75rem'
      }
    }
  },
  plugins: []
};

export default config;
