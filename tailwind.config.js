module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto-fit': 'repeat(auto-fit,minmax(280, 1fr))'
      },
      flex:{
        '2':'2 2 0%'
      },
      colors: {
        'black_coffee': '#362c2c',
        'baby_powder': '#fffffc',
        'khaki_web': '#beb7a4',
        'saddle_brown': '#934c0f',
        'red_orange': '#ff3f00',
      },
    },
  },
  plugins: [],
};
