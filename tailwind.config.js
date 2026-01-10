/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#7EA7E0",
                secondary: "#C5B4E7",
                accent: "#F9E0D4",
                indigo: "#4F67A0",
                offwhite: "#F0F8FF",
                sparkle: "#FFDE9E",
            },
            fontFamily: {
                sans: ['Pretendard', 'Noto Sans KR', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}
