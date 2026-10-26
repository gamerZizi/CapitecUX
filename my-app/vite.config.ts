import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Import Tailwind

const PORT = 3000; // Your Node.js backend port

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(), // 2. Add it to the plugins array
    ],
    server: {
        port:5173, //fontend port
        proxy: {
            '/api': {
                target: 'http://localhost:3000', // Replace with your backend port
                changeOrigin: true,
                secure: false,
            },
        },
    },
})
