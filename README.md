# Portafolio — Constanza Gómez Álvarez

Portafolio digital:

Mejoras aplicadas (resumen):

- Diseño responsive: rejilla adaptable, navegación móvil y ajustes en pantallas pequeñas.
- Navegación accesible: skip link, botón de menú con atributos ARIA y soporte para Escape.
- Estilos modernizados: variables CSS, mejoras de tipografía, tarjetas y estados de foco.
- Interacciones JS: toggle de menú, smooth scroll y validación básica del formulario de contacto.

Migración a Vite + Vue 3 (SFC)

He migrado el proyecto a una configuración de desarrollo profesional usando Vite y Vue 3 (Single File Components).

Pasos para ejecutar en desarrollo:

1. Instala dependencias:

```powershell
npm install
```

2. Inicia el servidor de desarrollo (abre el navegador automáticamente):

```powershell
npm run dev
```

3. Para construir la versión de producción:

```powershell
npm run build
```

Notas:

- La aplicación fuente ahora está en `src/` y los estilos globales en `src/assets/styles.css`.
- Mantengo las imágenes y otros assets en la carpeta `assets/` para compatibilidad.
- Si prefieres no usar Node/Vite, también puedes seguir abriendo `index.html` antiguo localmente, pero las mejoras SFC requieren `npm install`.


