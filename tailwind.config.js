/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#071A35', 2: '#0B2745', 3: '#103258' },
        gold: { DEFAULT: '#D9AD2B', 2: '#E8C766', 3: '#B8932B', light: '#F5E8B5' },
        silver: { DEFAULT: '#C0C0C0' },
        dark: { DEFAULT: '#090909', 2: '#111111' },
        'light-grey': { DEFAULT: '#F7F8FA', 2: '#F1F4F7' },
        'border-grey': '#D9E0E8',
        'body-text': '#34445A',
        'muted-text': '#68778C',
      },
      borderRadius: { lux: '20px' },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        sub: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
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
