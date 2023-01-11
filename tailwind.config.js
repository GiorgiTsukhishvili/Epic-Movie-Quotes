/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'helvetica-ka': ['HelveticaKa'],
        'helvetica-en': ['HelveticaEn'],
      },
      backgroundImage: {
        'main-gradient':
          'linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%)',
        'landing-gradient':
          'linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%)',
        'landing-top-gradient':
          'linear-gradient(180deg, #11101A 0%, #08080D 50.52%, rgba(0, 0, 0, 0) 100%)',
        interstellar: 'url(/assets/imgs/interstellar.jpg)',
        'the-royal-tenenbaums': 'url(/assets/imgs/the-royal-tenenbaums.jpg)',
        'lord-of-the-rings': 'url(/assets/imgs/lord-of-the-rings.jpg)',
        'interstellar-gradient':
          'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%);',
        'the-royal-tenenbaums-gradient':
          'linear-gradient(180deg, rgba(17, 16, 26, 0.95) 0%, rgba(8, 8, 13, 0.13) 50%, rgba(0, 0, 0, 0) 100%)',
        'lord-of-the-rings-gradient':
          'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%);',
        'email-sent':
          'linear-gradient(112.94deg, rgba(239, 239, 239, 0.3) -1.81%, rgba(239, 239, 239, 0.00514528) 102.5%, rgba(1, 1, 1, 0.00260417) 102.51%, rgba(239, 239, 239, 0.05) 102.52%);',
      },
      colors: {
        zinc: {
          150: '#F0F0F0',
          350: '#D9D9D9',
          850: '#222030',
          750: '#24222F',
        },
        gray: {
          550: '#6C757D',
          350: '#CED4DA',
          950: '#181624',
        },
        red: {
          550: '#DC3545',
          650: '#E31221',
          750: '#CC0E10',
          850: '#E33812',
        },
        orange: {
          250: '#DDCCAA',
        },
        blue: {
          650: '#0D6EFD',
        },
        green: {
          750: '#198754',
        },
        neutral: {
          950: '#11101A',
        },
        'border-transparent': '#efefef33',
      },
    },
    boxShadow: {
      'input-custom': '0px 0px 0px 4px rgba(13, 110, 253, 0.25)',
    },
    backdropBlur: {
      'user-page': '25px',
      'main-page': '3px',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
