/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{html,js}',
    './pages/**/*.{html,js}',
    './index.html',
    './public/index.html',
    './src/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF5722',
        primaryText: '#FFFFFF',
        secondary: '#4CAF50',
        secondaryText: '#FFFFFF',
        accent: '#FFC107',
        background: '#F5F5F5',
        text: '#333333',
        muted: '#757575',
        danger: '#F44336',
        success: '#4CAF50',
      },
      borderRadius: {
        'lg': '12px', // Custom border radius for buttons
      },
    },
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: true,
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
}
