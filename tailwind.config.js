/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        gold: {
          50: '#fdfbf7',
          100: '#faf6ed',
          200: '#f4ebd3',
          300: '#eddeb9',
          400: '#e0c785',
          500: '#d4b051',
          600: '#bf9e49',
          700: '#9f833d',
          800: '#7f6831',
          900: '#675528',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
