// tailwind.config.js
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        primary: '#f0fdf4', // Personaliza el color principal
        secondary: 'f0fdf4', // Personaliza un segundo color
        danger: '#e3342f', // Personaliza un tercer color
      },
      textColor: {
        // Define tus colores de texto personalizados aquí
        primary: '#7dd3fc',  // Ejemplo: 'primary' como clase de color de texto
        secondary: '#00d853',
        danger: '#text-indigo-50',   // Ejemplo: 'danger' como clase de color de texto
        customPurple: '#fecdd3',
      },
    },
  },
  variants: {},
  plugins: [],
};


