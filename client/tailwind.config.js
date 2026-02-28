/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'xs': '320px',
            },
            colors: {
                'bg-primary': 'var(--bg-primary)',
                'bg-card': 'var(--bg-card)',
                'bg-header': 'var(--bg-header)',
                'border-color': 'var(--border-color)',
                'accent-primary': 'var(--accent-primary)',
                'accent-secondary': 'var(--accent-secondary)',
                'accent-success': 'var(--accent-success)',
                'accent-warning': 'var(--accent-warning)',
                'accent-danger': 'var(--accent-danger)',
                'text-dark': 'var(--text-dark)',
                'text-muted': 'var(--text-muted)',
                // Legacy support matching index.css mapping
                'accent-peach': 'var(--accent-primary)',
                'accent-mint': 'var(--accent-success)',
                'accent-yellow': 'var(--accent-warning)',
                'accent-lavender': 'var(--accent-primary)',
                'completed-bar': 'var(--accent-primary)',
            }
        },
    },
    plugins: [],
}
