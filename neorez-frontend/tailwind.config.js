/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,

      padding: {
        DEFAULT: "1rem",
        // sm: "2rem",
        // lg: "4rem",
        // xl: "5rem",
        // "2xl": "6rem",
      },
    },

    extend: {
      screens: {
        xs: "430px",
        sm: "640px",
        lg: "992px",
        lg10: "1024px",
        xl: "1280px",
        "2xl": "1500px",
        "3xl": "1600px",
      },
      boxShadow: {
        'custom-shadow': '0px 0px 5px 0px rgba(138,131,138,1)',
      },
    },
  },
  plugins: [],
};
