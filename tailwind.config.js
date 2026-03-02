/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{gleam,js,mjs}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'hsl(199, 89%, 48%)',
                'primary-hover': 'hsl(199, 89%, 40%)',
                secondary: 'hsl(225, 63%, 45%)',
            }
        },
    },
    plugins: [],
}
