/** @type {import('tailwindcss').Config} */
const siteFontStack = ['Inter', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'];

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0B1F3A', 2: '#163A63', 3: '#163A63' },
        'accent-blue': { DEFAULT: '#0B1F3A', 2: '#163A63', 3: '#0B1F3A', light: '#EAF1F8' },
        silver: { DEFAULT: '#C0C0C0' },
        dark: { DEFAULT: '#090909', 2: '#111111' },
        'light-grey': { DEFAULT: '#F4F6F8', 2: '#EAF1F8' },
        'border-grey': '#D7DEE7',
        'body-text': '#334155',
        'muted-text': '#68778C',
      },
      borderRadius: { lux: '20px' },
      fontFamily: {
        inter: siteFontStack,
        heading: siteFontStack,
        sub: siteFontStack,
        body: siteFontStack,
      },
      fontWeight: {
        thin: '400',
        extralight: '400',
        light: '400',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '700',
        black: '700',
      },
      spacing: { 18: '4.5rem', 22: '5.5rem', 30: '7.5rem' },
      maxWidth: { '8xl': '1440px' },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-rev': 'marquee 35s linear infinite reverse',
        'shimmer': 'shimmer 3s linear infinite',
        'glow': 'glow-pulse 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
      },
    },
  },
  plugins: [],
};
