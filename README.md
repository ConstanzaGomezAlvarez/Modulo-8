# Proyecto Vue.js con Backend de Productos

Este proyecto consiste en una aplicación web desarrollada con Vue.js en el frontend y un servidor proxy Node.js en el backend para gestionar productos.

## Estructura del Proyecto

El repositorio está dividido en dos partes principales:

- `vue-project/`: Contiene el frontend de la aplicación desarrollado con Vue 3 y Vite.
- `proxy-servers/`: Contiene el backend desarrollado con Node.js, Express y un archivo JSON para simular una base de datos de productos.

## Configuración y Ejecución

Para poner en marcha el proyecto, sigue los siguientes pasos:

### 1. Instalación de Dependencias

#### Frontend (Vue.js)

Dirígete al directorio raíz del proyecto (`vue-project/`) e instala las dependencias:

```sh
npm install
```

#### Backend (Node.js)

Dirígete al directorio `proxy-servers/` e instala las dependencias:

```sh
cd proxy-servers
npm install
cd ..
```

### 2. Ejecución de la Aplicación

#### Iniciar el Backend

Desde el directorio `proxy-servers/`, inicia el servidor backend:

```sh
cd proxy-servers
npm start
cd ..
```

El servidor backend se ejecutará en `http://localhost:3000` (o el puerto configurado).

#### Iniciar el Frontend

Desde el directorio raíz del proyecto (`vue-project/`), inicia la aplicación Vue.js:

```sh
npm run dev
```

La aplicación frontend se ejecutará en `http://localhost:5173` (o el puerto configurado por Vite).

## API de Productos

El backend expone una API RESTful para la gestión de productos. Puedes encontrar la definición de la API en el archivo `proxy-servers/swagger.json`.

### Endpoints principales:

- `GET /productos`: Obtener todos los productos.
- `GET /productos/:id`: Obtener un producto por su ID.
- `POST /productos`: Crear un nuevo producto.
- `PUT /productos/:id`: Actualizar un producto existente.
- `DELETE /productos/:id`: Eliminar un producto.

## IDE Recomendado

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (y deshabilitar Vetur).

## Personalización de la Configuración

Consulta la [Referencia de Configuración de Vite](https://vite.dev/config/).
