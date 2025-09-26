import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' // Importa el plugin
import { VitePWA } from 'vite-plugin-pwa' // 👈 Importa el plugin

// https://vite.dev/config/
export default defineConfig({
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
})