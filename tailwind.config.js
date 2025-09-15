/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Legal theme typography
        'heading': ['"Merriweather"', '"Playfair Display"', 'serif'],
        'body': ['"Inter"', '"Roboto"', 'sans-serif'],
        // Legacy fonts for backward compatibility
        'work-sans': ['"Work Sans"', 'sans-serif'],
        'quicksand': ['"Quicksand"', 'sans-serif'],
        'great-vibes': ['"Great Vibes"', 'cursive'],
        'Nunito' : ['"Nunito"', 'sans-serif'],
        'Lato' : ['"Lato"', 'serif']
      },
      colors: {
        // Legal theme color palette
        'lexi': {
          'primary': '#2C3E50',
          'primary-dark': '#1A252F',
          'primary-light': '#34495E',
          'accent': '#00BCD4',
          'accent-dark': '#00ACC1',
          'accent-light': '#26C6DA',
          'background': '#F9FAFB',
          'surface': '#FFFFFF',
          'text': '#2C3E50',
          'text-light': '#6B7280',
          'border': '#E5E7EB'
        },
        // Legacy colors for backward compatibility
        'custom-bg': '#283142f9',
      },
    },
  },
  plugins: [],
}