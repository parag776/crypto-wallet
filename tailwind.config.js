/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: 'var(--dark-color)',
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        'primary-hover': 'var(--primary-hover-color)',
        'secondary-hover': 'var(--secondary-hover-color)',
        'primary-active': 'var(--primary-active-color)',
        'secondary-active': 'var(--secondary-active-color)',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '200': '50rem',
      },
    },
  },
  plugins: [],
}