/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'alpha-bg': '#06080a',
        'alpha-surface': '#0b0f12',
        'alpha-panel': 'rgba(255,255,255,0.025)',
        'alpha-border': 'rgba(255,255,255,0.08)',
        'alpha-edge': 'rgba(255,255,255,0.05)',
        'alpha-ink': '#e8ecf2',
        'alpha-muted': '#8b94a7',
        'alpha-faint': '#565f72',
        'alpha-accent': '#34d399',
        'alpha-accent-2': '#5eead4',
        'alpha-success': '#34d399',
        'alpha-warn': '#fbbf24',
        'alpha-danger': '#f87171',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      letterSpacing: {
        widest2: '0.18em',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(52,211,153,0.18), 0 20px 60px -30px rgba(52,211,153,0.25)',
      },
    },
  },
  plugins: [],
};
