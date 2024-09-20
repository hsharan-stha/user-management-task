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
        primary: '#FF5722', // Button background
        primaryText: '#FFFFFF', // Button text color
        secondary: '#4CAF50', // Secondary button background
        secondaryText: '#FFFFFF', // Secondary button text color
        accent: '#FFC107', // Accent color
        background: '#F5F5F5', // Main background color
        text: '#333333', // Main text color
        muted: '#757575', // Muted text color
        danger: '#F44336', // Error or danger color
        success: '#4CAF50', // Success color
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
