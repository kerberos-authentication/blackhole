
/** @type {import('tailwindcss').Config} */ 

const plugin = require("tailwindcss/plugin")
const MyClass =plugin(function({addUtilities}){
  addUtilities({
    ".my-rotate-y-180":{
      transform:"rotateY(180deg)"
    },
     ".preserve-3d" :{
      transformStyle: "preserve-3d",
    },
    ".perspective" :{
      perspective: "1000px",
    },
    ".backface-hidden":{
      backfaceVisibility : "hidden",
    }
  })
})


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan these files for Tailwind classes
  ],
  theme: { screen:{"xsm": {min:"320px", max:"640px"},
        
        "sm-between": {'max': '767px', min: '640px'},
        "sm-max":     {'max': '767px'},

        
        "md-between":  {'max': '1023px', 'min': '768px'},
        "md-max":      {'max': '1023px'},

        
        "lg-between":  {'max': '1279px', 'min': '1024px'},
        "lg-max":      {'max': '1279px'},

        
        "xl-between":  {'max': '1535px', 'min': '1280px'},
        "xl-max":      {'max': '1535px'},

        "2xl": "1536",},
    extend: {extend: {
      backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                       },
    fontFamily:{
      'blotus':['blotus']
               },

       colors: {
        'black-rgba': 'rgba(0, 0, 0, 0.54)',
      },
      
    },
},
  },
  plugins: [ MyClass],
};
