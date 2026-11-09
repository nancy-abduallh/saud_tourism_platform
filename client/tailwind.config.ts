import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 50: '#eef2fb', 100: '#d9e1f5', 200: '#b3c3ea', 300: '#7f98d6', 400: '#4d6ebd', 500: '#2c4a98', 600: '#1c3578', 700: '#142857', 800: '#0e1d40', 900: '#0a1631', 950: '#060d1f' },
        gold: { 50: '#fdf9ec', 100: '#f9efc9', 200: '#f3e2a5', 300: '#e8cf8a', 400: '#d9b563', 500: '#c9a24b', 600: '#a8812f', 700: '#86641f' },
      },
      fontFamily: {
        sans: ['Tajawal', 'Cairo', '"Noto Sans Arabic"', 'Arial', 'sans-serif'],
        display: ['Cairo', 'Tajawal', '"Noto Sans Arabic"', 'Arial', 'sans-serif'],
        dancing: ['"Dancing Script"', 'cursive'],
        allura: ['Allura', 'cursive'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg,#fff0b8 0%,#f3d37a 30%,#dfb34f 65%,#f9e59d 100%)',
        'navy-gradient': 'linear-gradient(160deg,#0e1d40 0%,#0a1631 55%,#060d1f 100%)',
      },
      boxShadow: {
        gold: '0 10px 30px -10px rgba(201,162,75,.55)',
        goldlg: '0 18px 40px -10px rgba(201,162,75,.65)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        ring: { '0%': { transform: 'scale(1)', opacity: '.6' }, '100%': { transform: 'scale(1.8)', opacity: '0' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 45s linear infinite',
        ring: 'ring 2s ease-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
