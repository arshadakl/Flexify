module.exports = {
  content: [
    "./src/**/*.{jsx,tsx}",
    "./node_modules/flowbite/**/*.js", 
    'node_modules/flowbite-react/lib/esm/**/*.js',
    'node_modules/preline/dist/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'logo-green': '#00B16D',
        "flexy-green": "#0A4226"
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      height: (theme) => ({
        '50vh': '50vh',
        '80vh': '80vh',
        '90vh': '90vh',
        '95vh': '93vh',
        // Add more viewport height values as needed
      })
    }, // Add custom theme configurations if needed
  },
  plugins: [
    require('preline/plugin')
  ], // Add plugins if desired
  darkMode: 'class'
  // darkMode: 'media'
};
