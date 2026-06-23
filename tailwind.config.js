/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'selector', // ⭐ Change 'class' to 'selector'
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};