export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1B32',
          800: '#12264A',
          700: '#1C335C',
        },
        ink: '#161A20',
        steel: '#343A43',
        muted: '#5B636E',
        brand: {
          DEFAULT: '#D62828',
          dark: '#A8171F',
          soft: '#FBEAEA',
        },
        paper: '#F5F6F7',
        line: '#E4E7EB',
        gold: '#C89B45',
      },
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        site: '84rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,27,50,0.06), 0 10px 28px -16px rgba(11,27,50,0.22)',
        lift: '0 2px 4px rgba(11,27,50,0.06), 0 24px 48px -24px rgba(11,27,50,0.35)',
        header: '0 1px 0 rgba(11,27,50,0.06), 0 8px 24px -18px rgba(11,27,50,0.3)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
};
