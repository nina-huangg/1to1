/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
    presets: [require('tailwindcss/defaultTheme')],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'background-color': '#F4F3ED',
                'logo-color': '#005A5B',
                'primary-blue': '#52B7B1',
                'primary-blue-hover': '#2B928B',
                orange: '#EE6A4C',
                'orange-hover': '#DD4522',
                turquoise: '#6EB3AF',
                pinkie: '#FBB5A5',
            },
            fontFamily: {
                serif: ['Aleo', 'ui-serif', 'Georgia'],
            },
        },
    },
    plugins: [],
};
