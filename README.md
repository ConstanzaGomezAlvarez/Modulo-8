# Portafolio — Constanza Gómez Álvarez

[![Deploy status](https://github.com/ConstanzaGomezAlvarez/Modulo-8/actions/workflows/deploy.yml/badge.svg)](https://github.com/ConstanzaGomezAlvarez/Modulo-8/actions/workflows/deploy.yml)

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

### Cómo crear y añadir un PAT (GH_PAGES_TOKEN)

Si tu ejecución falla por permisos (403) —por ejemplo cuando la ejecución proviene de un fork o tienes reglas estrictas de protección de ramas— puedes crear un Personal Access Token (PAT) y añadirlo como secreto del repositorio para que el workflow lo use al hacer push.

1. Generar el PAT:

	a. Ve a GitHub → tu avatar (esquina superior derecha) → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token.
	b. Describe el token (por ejemplo: `gh-pages-deploy`) y selecciona el alcance mínimo necesario:
		- Si tu repo es público: marca `public_repo`.
		- Si tu repo es privado o necesitas control total: marca `repo`.
	c. Genera el token y copia el valor (se verá solo una vez). Guarda ese valor en un lugar seguro temporalmente.

2. Añadir el secret al repositorio:

	a. Abre tu repositorio en GitHub → Settings → Secrets and variables → Actions → New repository secret.
	b. Pon el nombre exacto: `GH_PAGES_TOKEN`.
	c. Pega el token que copiaste y guarda el secret.

3. Reintentar el workflow:

	- Puedes re-ejecutar el job desde la pestaña Actions → abre la ejecución fallida → "Re-run jobs" → "Re-run all jobs".
	- O bien empuja un commit para disparar el workflow (PowerShell):

```powershell
cd c:\Users\mornc\Documents\GitHub\Modulo-8
git add .github/workflows/deploy.yml README.md
git commit -m "ci: add GH_PAGES_TOKEN secret support"
git push origin main
```

4. Nota sobre uso en el workflow

	- El workflow ya incluye soporte opcional para `GH_PAGES_TOKEN` y lo pasará a la acción `peaceiris/actions-gh-pages` como `personal_token` si el secret existe. No es necesario modificar el workflow manualmente.

Seguridad y buenas prácticas:

- No compartas tu PAT. Trátalo como una contraseña.
- Usa el menor alcance posible (`public_repo` si el repo es público y solo necesitas publicar Pages).
- Revoca el PAT si ya no lo necesitas.


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



