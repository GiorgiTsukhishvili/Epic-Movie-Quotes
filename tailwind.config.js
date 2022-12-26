/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-gradient':
          'linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%)',
      },
      colors: {
        zinc: {
          150: '#F0F0F0',
        },
        red: {
          650: '#E31221',
        },
      },
    },
  },
  plugins: [],
};
