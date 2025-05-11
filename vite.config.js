import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    headers: {
      'Content-Security-Policy':
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' https://*.githubusercontent.com https://*.github.com; " +
        "connect-src 'self' https://api.github.com; " +
        "frame-src 'self' https://github.com; " +
        "navigate-to 'self' https://github.com; " +
        "object-src 'none'; " +
        'upgrade-insecure-requests; ' +
        "frame-ancestors 'self';",
      'Strict-Transport-Security':
        'max-age=31536000; includeSubDomains; preload',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy':
        'geolocation=(), microphone=(), camera=(), fullscreen=(), payment=()',
    },
  },
  plugins: [react()],
})
