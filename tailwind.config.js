// //  @type {import('tailwindcss').Config} 
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: { 
//       colors:{
//         '001d3d':"#001d3d"
//       },
//       fontFamily: {
//       'playwrite': ['"Playwrite GB S"', 'cursive'],
//     },
//     },
//   },
//   plugins: [],
// }

//  @type {import('tailwindcss').Config} 
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        '001d3d': "#001d3d"
      },
      fontFamily: {
        'playwrite': ['"Playwrite GB S"', 'cursive'],
        'sans': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        typing: 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite',
        'blink-caret': 'blink-caret .75s step-end infinite',
        'bounce-ping': 'pingPong 0.6s ease-in-out infinite',
      },
      keyframes: {
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        pingPong: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'blink-caret': {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'orange' },
        },
      },
    },
  },
  plugins: [],
}
