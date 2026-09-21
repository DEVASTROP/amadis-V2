/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C1810',
        accent: '#D4A853',
        secondary: '#8B1A1A',
        bg: '#FAF7F2',
        'hero-bg': '#F5A623',
        whatsapp: '#25D366',
        text: '#1A1A1A',
        'text-light': '#6B6B6B',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
      aspectRatio: {
        'portrait': '3 / 4',
      },
      boxShadow: {
        'product': '0 2px 8px -2px rgba(44, 24, 16, 0.08), 0 0 0 1px #D4A853',
        'product-hover': '0 8px 24px -4px rgba(44, 24, 16, 0.12), 0 0 0 1px #D4A853',
      },
      transitionDuration: {
        'subtle': '200ms',
      },
    },
  },
  plugins: [],
}