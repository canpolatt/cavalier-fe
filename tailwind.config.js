module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto-fit': 'repeat(auto-fit,minmax(280, 1fr))'
      }
    },
  },
  plugins: [],
};
