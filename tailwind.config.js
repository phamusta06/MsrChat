/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
     
    ],
    theme: {
      extend: {
        spacing: {
          'screen-64': 'calc(100vh - 40px)',
        },
        colors:{
          'gray-10':'#F3F3F3',
          'gray-20':'#EDEFF2',

           
  
        }
      },
    },
    // eslint-disable-next-line no-undef
    plugins: [ require('tailwind-scrollbar'),],
  };