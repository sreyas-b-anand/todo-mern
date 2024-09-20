/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this based on your project structure
  ],
  theme: {
    extend: {
      colors: {
        // Primary background
        bg: "#F7FAFC", // Light Gray / Off-White

        // Secondary background
        bgcard: "#E2E8F0", // Cool Light Gray

        // Accent color for buttons, links, etc.
        accent: "#4A90E2", // Soft Blue for action elements

        // Text colors
        textPrimary: "#2D3748", // Dark Gray for high readability
        textSecondary: "#718096", // Medium Gray for secondary text

        // Highlight or urgent tasks
        highlight: "#FF6B6B", // Light Red for urgency

        // Completed tasks color
        completedTask: "#48BB78", // Green to indicate success/completion

        // Border colors for task containers
        borderPrimary: "#CBD5E0", // Light Gray for borders and dividers
        navbg: "#1A202C", // Dark gray/charcoal
        navText: "#F7FAFC", // Light gray/off-white
        navbarHover: "#4A90E2", // Soft blue for hover
      },
    },
  },
  plugins: [],
};
