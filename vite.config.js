import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Ensure this is here

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // This "teaches" Vite how to find that @import
  ],
})