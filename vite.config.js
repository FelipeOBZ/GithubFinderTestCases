import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // Protección HSTS (asegúrate de que tu dominio esté en la lista de precarga si usas preload)
      'Strict-Transport-Security':
        'max-age=31536000; includeSubDomains; preload',

      // Política de seguridad de contenido para mitigar XSS
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-inline';
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data: https:;
        connect-src 'self' https://api.github.com https://github-contributions-api.jogruber.de ws://localhost:* wss://localhost:*;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
        block-all-mixed-content;
      `
        .replace(/\s{2,}/g, ' ')
        .trim(),

      // Protege contra MIME sniffing
      'X-Content-Type-Options': 'nosniff',

      // Previene ataques de clickjacking
      'X-Frame-Options': 'DENY',

      // Control de políticas de referrer
      'Referrer-Policy': 'strict-origin-when-cross-origin',

      // Control de permisos para APIs sensibles
      'Permissions-Policy':
        'geolocation=(), microphone=(), camera=(), fullscreen=(), payment=()',
    },
  },
})
