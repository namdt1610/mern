/** @type {import('tailwindcss').Config} */

export const content = ['./src/**/*.{html,js,jsx,ts,tsx,css}']

export const theme = {
    extend: {},
}

export const plugins = [require('@tailwindcss/typography'), require('daisyui')]

export const daisyui = {
    themes: ['light', 'dark'],
}
