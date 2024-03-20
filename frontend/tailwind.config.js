module.exports = {
  content: [
    "./src/**/*.{jsx,tsx}", // Include all JSX/TSX files in the src directory
  ],
  theme: {
    extend: {
      colors: {
        'logo-green': '#00B16D',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    }, // Add custom theme configurations if needed
  },
  plugins: [], // Add plugins if desired
  darkMode: 'class'
  // darkMode: 'media'
};
