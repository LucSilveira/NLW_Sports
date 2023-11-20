/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    fontFamily :{
      sans : ['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage : {
        fundoGalaxy : "url('./src/assets/fundo-galaxy.png')",
        nlwGradient : "linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 33.95%, #E1D55D 44.57%)",
        gameGradient : "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.90) 67.08%)"
      }
    },
  },
  plugins: [],
}

