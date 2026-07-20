import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
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
        muted: 'var(--color-muted)',
        glass: 'var(--color-glass)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(0, 245, 160, 0.12), 0 24px 80px rgba(0, 245, 160, 0.1)',
        'glow-sm': '0 0 20px rgba(0, 245, 160, 0.1)',
        'glow-lg': '0 0 60px rgba(0, 245, 160, 0.2), 0 0 120px rgba(0, 245, 160, 0.05)',
        panel: '0 24px 80px rgba(0, 0, 0, 0.55)',
        'panel-lg': '0 32px 100px rgba(0, 0, 0, 0.65)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -12px, 0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 50%' },
          '100%': { backgroundPosition: '-200% 50%' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '33%': { transform: 'translate3d(18px, -14px, 0)' },
          '66%': { transform: 'translate3d(-12px, 16px, 0)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
        drift: 'drift 16s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'spin-slow': 'spin-slow 20s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, rgba(0,245,160,0.1), rgba(0,217,255,0.08), rgba(255,255,255,0.02))',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
};

export default config;
