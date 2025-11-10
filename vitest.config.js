import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// Configuración de vitest que registra explícitamente el plugin Vue
export default defineConfig({
  plugins: [vue()],
  test: {
    // usar jsdom para pruebas de componentes que interactúan con el DOM
    environment: 'jsdom',
    globals: true,
    include: ['test/**/*.spec.js'],
    // deps.inline está deprecado en versiones recientes de vitest/vite;
    // no lo necesitamos ahora que registramos el plugin explícitamente.
  }
})
