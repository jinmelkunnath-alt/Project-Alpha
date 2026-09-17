/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'alpha-bg': '#f8fafc',
        'alpha-surface': '#ffffff',
        'alpha-panel': '#f1f5f9',
        'alpha-border': '#e2e8f0',
        'alpha-edge': '#cbd5e1',
        'alpha-ink': '#0f172a',
        'alpha-muted': '#475569',
        'alpha-faint': '#64748b',
        'alpha-accent': '#059669',
        'alpha-accent-2': '#0d9488',
        'alpha-success': '#059669',
        'alpha-warn': '#d97706',
        'alpha-danger': '#dc2626',
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
        serif: [
          'Newsreader',
          'Instrument Serif',
          'Georgia',
          'Cambria',
          'Times New Roman',
          'serif',
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
