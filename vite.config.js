import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    headers: {
      'Content-Security-Policy':
        "default-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; object-src 'none';",
      'Strict-Transport-Security':
        'max-age=31536000; includeSubDomains; preload',
    },
  },
  plugins: [react()],
})
