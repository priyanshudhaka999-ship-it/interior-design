/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F7F3',
        sand: '#EFEBE3',
        charcoal: '#292824',
        muted: '#77746D',
        olive: '#777C61',
        borderSubtle: '#DEDAD1',
        surfaceWhite: '#FFFFFF',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        editorial: '1360px',
      },
    },
  },
  plugins: [],
};
