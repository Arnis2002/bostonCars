export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ivory: '#F3F0E9',
        paper: '#FAF8F3',
        ink: { DEFAULT: '#202522', soft: '#4D524E' },
        forest: { DEFAULT: '#233E35', deep: '#17291F', soft: '#DDE4DF' },
        line: { DEFAULT: '#D9D3C6', strong: '#B6AE9F' },
        clay: { DEFAULT: '#8A4520', soft: '#F2E4D6' },
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '3px',
        sm: '2px',
        md: '4px',
        lg: '6px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(32,37,34,0.06), 0 8px 24px -12px rgba(32,37,34,0.18)',
        bar: '0 -6px 20px -12px rgba(32,37,34,0.25)',
      },
      maxWidth: { site: '1320px' },
    },
  },
};
