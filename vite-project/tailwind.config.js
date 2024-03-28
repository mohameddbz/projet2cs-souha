/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,svelte}",
  ],
  theme: {
    extend: {
      fontSize: {
        'rsm': '1.5vw', // Petite taille pour les petits écrans
        'rmd': '2.75vw', // Taille moyenne pour les écrans moyens
        'rlg': '3vw', // Grande taille pour les grands écrans
      },
    },
  },
  plugins: [],
}