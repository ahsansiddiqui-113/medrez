/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        MedrezGreen: "#11BE79",
        MedrezBlue: "#073AA8",
        MedrezLightGray: "#F5F5F5",
        MedrezTextGray: "#6E6E6E",
        ButtonGrey: "#E5E5E5",
      },
    },
  },
  plugins: [],
};
