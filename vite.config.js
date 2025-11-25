import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno basándose en el modo actual (por defecto 'development')
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
      svgr(),
      VitePWA({
        registerType: 'autoUpdate', // Actualiza la PWA automáticamente
        manifest: {
          name: 'GameShelf',
          short_name: 'GameShelf',
          description: 'Tu estantería personal de juegos de mesa.',
          theme_color: '#111317', // El color de la barra de herramientas (tu --darker)
          background_color: '#111317', // El color de la pantalla de bienvenida
          icons: [
            {
              src: 'icon-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'icon-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ],
    server: {
      proxy: {
        // Cuando la aplicación llame a /api/bgg...
        '/api/bgg': {
          // ...redirige la solicitud a la URL base de BGG.
          target: 'https://boardgamegeek.com',
          changeOrigin: true, // Necesario para que parezca una llamada del mismo origen
          // Reescribe la ruta para eliminar /api/bgg antes de enviarla a BGG
          rewrite: (path) => path.replace(/^\/api\/bgg/, ''),
          // Inyecta el token de autorización en cada solicitud
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              // Solo añade el header si el token existe
              if (env.VITE_BGG_API_TOKEN) {
                console.log('Adding Authorization header to request:', req.url);
                proxyReq.setHeader('Authorization', `Bearer ${env.VITE_BGG_API_TOKEN}`);
              } else {
                console.warn('VITE_BGG_API_TOKEN is missing! Authorization header not added.');
              }
            });
          }
        }
      }
    }
  }
})