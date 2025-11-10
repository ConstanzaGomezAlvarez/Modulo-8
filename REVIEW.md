ABP2-M7 — Revisión rápida y lista de acciones

Estado actual del producto

- Implementado un listado de productos, búsqueda y conteos.
- Formulario para agregar productos (guardados en Vuex).
- Rutas: /store, /store/products, /store/add.
- Mock de autenticación disponible; integración con Firebase mediante .env.

Acciones realizadas

- Unificación del store en src/store/index.js con getters: productCount, totalStock, filteredProducts, featuredProducts.
- Añadido AddProductForm, vistas StoreHome/ProductList/StoreAdd.
- Registrado store en main.js y rutas en router/index.js.
- Archivo duplicado src/views/HomePage.vue marcado como archivado (contenido reemplazado por nota).

Problemas detectados y recomendaciones

- Hay múltiples versiones de la UI (Home.vue vs Store*). Recomiendo decidir cuál será la principal y archivar/eliminar la otra.
- Falta de tests automatizados. Recomiendo añadir vitest y tests para los getters y acciones.
- Validaciones faltantes en formulario (evitar códigos duplicados).
- UX: añadir confirmaciones visuales (toasts) al agregar producto.
- Seguridad: si alguna credencial fue expuesta, rotarla y mantener .env fuera del repo.


