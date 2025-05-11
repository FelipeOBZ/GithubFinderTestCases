import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    headers: {
      'Content-Security-Policy':
        "default-src 'self'; script-src 'self'; object-src 'none';",
      'Strict-Transport-Security':
        'max-age=31536000; includeSubDomains; preload',
    },
  },
  plugins: [react()],
})
