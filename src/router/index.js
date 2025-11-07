import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import CatalogPage from '../views/CatalogPage.vue'
import AdminPage from '../views/AdminPage.vue'
import StoreHome from '../views/StoreHome.vue'
import ProductList from '../views/ProductList.vue'
import StoreAdd from '../views/StoreAdd.vue'
import { Auth } from '../services/Auth.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Inicio - Mi Tienda'
    }
  },
  {
    path: '/store',
    name: 'StoreHome',
    component: StoreHome,
    meta: { title: 'TecnoChile - Inicio' }
  },
  {
    path: '/store/products',
    name: 'StoreProducts',
    component: ProductList,
    meta: { title: 'TecnoChile - Productos' }
  },
  {
    path: '/store/add',
    name: 'StoreAdd',
    component: StoreAdd,
    meta: { title: 'TecnoChile - Agregar Producto' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Iniciar Sesión - Mi Tienda',
      hideForAuth: true // Ocultar si ya está autenticado
    }
  },
  {
    path: '/catalogo',
    name: 'Catalog',
    component: CatalogPage,
    meta: {
      title: 'Catálogo - Mi Tienda'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    meta: {
      title: 'Administración - Mi Tienda',
      requiresAuth: true // Requiere autenticación
    }
  },
  // Redireccionamiento para rutas no encontradas
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Comportamiento de scroll personalizado
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
})

// Guard de navegación global
router.beforeEach(async (to, from, next) => {
  // Actualizar el título de la página
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  // Verificar autenticación para rutas protegidas
  if (to.meta.requiresAuth) {
    try {
      const user = await Auth.getCurrentUser();
      if (!user) {
        // Redirigir al login con la ruta de destino
        next({
          name: 'Login',
          query: { redirect: to.fullPath }
        });
        return;
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      next({
        name: 'Login',
        query: { redirect: to.fullPath }
      });
      return;
    }
  }

  // Redirigir usuarios autenticados lejos de login
  if (to.meta.hideForAuth) {
    try {
      const user = await Auth.getCurrentUser();
      if (user) {
        next({ name: 'Home' });
        return;
      }
    } catch (error) {
      // Continuar al login si hay error verificando auth
    }
  }

  next();
});

// Guard después de cada navegación
router.afterEach((to) => {
  // Scroll al top en navegaciones de página completa
  if (to.name && !to.hash) {
    window.scrollTo(0, 0);
  }
});

export default router
