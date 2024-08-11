import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Bind to all network interfaces
    port: 2100,        // You can change the port if needed
    // You can add more server options here if needed
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase limit to 1000 KB (or another value)
  },
})
