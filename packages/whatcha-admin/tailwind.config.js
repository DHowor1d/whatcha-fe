export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#024caa',
        secondary: '#ec8305',
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}