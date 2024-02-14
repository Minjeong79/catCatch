const customHeight = {
  60: '60%',
  70: '70%',
  80: '80%',
  90: '90%',
  'custom': '100%'
}

const customHeightVh = {
  60: '60vh',
  65: '65vh',
  70: '70vh',
  75: '75vh',
  80: '80vh',
  90: '90vh',
  'custom': '100vh'
}

const customWidthPx = {
  300: '300px',
  400: '400px',
  500: '500px',
  600: '600px',
  'custom:': '100px',
}

//애니메이션

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      height: {
        ...customHeight,
        ...customHeightVh,
      },
      width: {
        ...customWidthPx,
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#f3f0e8',
        'secondary': '#d4c3b3',

      }),
      borderColor: theme => ({
        ...theme('colors'),
        'primary': '#f3f0e8',
        'secondary': '#d4c3b3',

      }),
    },
  },
  plugins: [],
}