# Portafolio — Constanza Gómez Álvarez

Un portafolio digital construido con buenas prácticas web y herramientas modernas (Vite + Vue 3). Este repositorio contiene la versión de desarrollo (fuente) en `src/` y una página estática lista para desplegar.

## Demo (hosting)

La versión pública prevista para este repositorio está disponible en (después de desplegar):

https://ConstanzaGomezAlvarez.github.io/Modulo-8

## Capturas

Se incluyen imágenes de ejemplo que se usan en el proyecto. Si GitHub Pages está activo, estas rutas serán relativas y se mostrarán correctamente.

![Hero 800](src/assets/images/optimized/hero-800.avif)
![Hero 1200](src/assets/images/optimized/hero-1200.avif)

> Si no ves las imágenes aquí en la vista previa del README, revisa que los archivos existan en `src/assets/images/optimized/` (ya incluidos en el repo).

## Tecnologías

- HTML5
- CSS3 (variables y diseño responsive)
- JavaScript (ES6+)
- Vue 3 (Single File Components)
- Vite (bundler / dev server)

## Instalación y uso (desarrollo)

1. Clona el repositorio y entra al directorio:

```powershell
git clone https://github.com/ConstanzaGomezAlvarez/Modulo-8.git
cd Modulo-8
```

2. Instala dependencias:

```powershell
npm install
```

3. Levanta el servidor de desarrollo:

```powershell
npm run dev
```

4. Construye la versión de producción:

```powershell
npm run build
```

5. (Opcional) Previsualiza la build localmente:

```powershell
npm run preview
```

## Despliegue (GitHub Pages)

He añadido un workflow de GitHub Actions en `.github/workflows/deploy.yml` que ejecuta `npm ci`, `npm run build` y publica `dist/` a GitHub Pages usando `peaceiris/actions-gh-pages`. Pasos para publicar desde tu máquina:

1. Asegúrate de que todos los cambios estén commiteados y empuja a `main`:

```powershell
git add .
git commit -m "Preparar despliegue: README + workflow"
git push origin main
```

2. Abre la pestaña Actions en GitHub y revisa la ejecución del workflow `Deploy to GitHub Pages`.
3. Cuando termine, la página estará disponible en la URL indicada arriba (o en la sección _Pages_ del repositorio si requieres ajustes adicionales).

Si prefieres usar Netlify o Vercel, sube los archivos de `dist/` o conecta el repo; esas plataformas detectan Vite automáticamente.

## Buenas prácticas para tu perfil de GitHub

- Añade una bio corta y una foto profesional.
- Fija este repositorio en tu perfil (pin) y escribe una descripción breve arriba del README (primer párrafo) que resuma el alcance.
- Añade enlaces a LinkedIn y/o un CV en la bio.
- Mantén una rama `main` limpia y usa PRs y releases cuando sea posible.

## Qué cambié / añadí

- README.md con instrucciones completas, capturas y URL prevista de Pages.
- Workflow de GitHub Actions para desplegar `dist/` a GitHub Pages al hacer push a `main`.

---
npm run build
```



