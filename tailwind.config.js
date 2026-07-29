/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Mirrors the CSS variables in src/index.css — keep the two in sync.
      colors: {
        blue: '#233877',
        purple: '#9F8EC2',
        bg: '#F5F5F7',
        whatsapp: '#25D366',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['Magistral', 'Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'grad-main': 'linear-gradient(135deg, #233877 0%, #9F8EC2 100%)',
        'grad-reverse': 'linear-gradient(135deg, #9F8EC2 0%, #233877 100%)',
        'grad-vertical': 'linear-gradient(180deg, #233877 0%, #9F8EC2 100%)',
      },
      boxShadow: {
        card: '0 2px 18px rgba(35, 56, 119, 0.07)',
        'card-hover': '0 12px 36px rgba(35, 56, 119, 0.13)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-soft': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        blink: {
          '0%, 80%, 100%': { opacity: '0.2' },
          '40%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        blink: 'blink 1.4s infinite both',
      },
    },
  },
  plugins: [],
};
