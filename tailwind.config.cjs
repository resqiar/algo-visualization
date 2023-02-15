/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'lofi',
      'corporate',
      'cyberpunk',
      {
        forest: {
          ...require('daisyui/src/colors/themes')['[data-theme=forest]'],
          '.dark-white': {
            'background-color': 'rgb(30, 184, 84)',
          },
        },
      },
      {
        black: {
          ...require('daisyui/src/colors/themes')['[data-theme=black]'],
          '.dark-white': {
            'background-color': 'rgba(255, 255, 255, 0.8)',
          },
        },
      },
      {
        luxury: {
          ...require('daisyui/src/colors/themes')['[data-theme=luxury]'],
          '.dark-white': {
            'background-color': 'rgb(171, 128, 59)',
          },
        },
      },
      {
        night: {
          ...require('daisyui/src/colors/themes')['[data-theme=night]'],
          '.dark-white': {
            'background-color': 'rgb(179, 197, 239)',
          },
        },
      },
    ],
  },
};
