<template>
  <nav class="navbar navbar-expand-lg bg-dark">
    <div class="container px-5">
      <router-link class="navbar-brand text-white" to="/">
        <i class="bi bi-shop"></i>
        Mi Tienda
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link 
              class="nav-link text-white" 
              :class="{ active: $route.path === '/' }"
              to="/"
            >
              <i class="bi bi-house"></i>
              Inicio
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              class="nav-link text-white" 
              :class="{ active: $route.path === '/catalogo' }"
              to="/catalogo"
            >
              <i class="bi bi-grid"></i>
              Catálogo
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              class="nav-link text-white" 
              :class="{ active: $route.path === '/admin' }"
              to="/admin"
            >
              <i class="bi bi-gear"></i>
              Administración
            </router-link>
          </li>
        </ul>
        
        <!-- Sección derecha del navbar -->
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <!-- Mensaje de bienvenida si está logueado -->
          <li v-if="currentUser" class="nav-item d-none d-md-block">
            <span class="navbar-text text-white me-3">
              <i class="bi bi-person-circle"></i>
              Hola, {{ currentUser.name }}
            </span>
          </li>
          
          <!-- Botón del carrito -->
          <li class="nav-item">
            <button 
              class="btn btn-outline-light position-relative me-2"
              @click="toggleCart"
              :disabled="cartItemsCount === 0"
            >
              <i class="bi bi-cart3"></i>
              Carrito
              <span 
                v-if="cartItemsCount > 0" 
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {{ cartItemsCount }}
                <span class="visually-hidden">productos en carrito</span>
              </span>
            </button>
          </li>
          
          <!-- Botón de login/logout -->
          <li class="nav-item">
            <router-link 
              v-if="!currentUser"
              class="btn btn-primary"
              to="/login"
            >
              <i class="bi bi-box-arrow-in-right"></i>
              Iniciar Sesión
            </router-link>
            <button 
              v-else
              class="btn btn-outline-light"
              @click="handleLogout"
            >
              <i class="bi bi-box-arrow-right"></i>
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { Auth } from '../services/Auth.js';

export default {
  name: 'Navbar',
  props: {
    cartItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentUser: null,
    };
  },
  computed: {
    cartItemsCount() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    }
  },
  async mounted() {
    await this.checkCurrentUser();
  },
  methods: {
    async checkCurrentUser() {
      try {
        this.currentUser = await Auth.getCurrentUser();
      } catch (error) {
        console.error('Error checking current user:', error);
        this.currentUser = null;
      }
    },

    async handleLogout() {
      try {
        await Auth.logout();
        this.currentUser = null;
        this.$emit('user-logged-out');
        
        // Redirigir a home
        if (this.$route.path !== '/') {
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    },

    toggleCart() {
      this.$emit('toggle-cart');
    }
  },
  watch: {
    '$route'() {
      // Re-verificar el usuario cuando cambie la ruta
      this.checkCurrentUser();
    }
  }
};
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}

.nav-link {
  transition: all 0.3s ease;
  border-radius: 4px;
  margin: 0 2px;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: bold;
}

.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.navbar-text {
  font-size: 0.9rem;
}

.badge {
  font-size: 0.7rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .navbar-brand {
    font-size: 1.2rem;
  }
  
  .nav-link {
    margin: 2px 0;
    padding: 8px 12px;
  }
  
  .btn {
    margin: 2px 0;
    width: 100%;
  }
}

/* Animation for cart badge */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) translate(-50%, -50%);
  }
  40% {
    transform: translateY(-3px) translate(-50%, -50%);
  }
  60% {
    transform: translateY(-1px) translate(-50%, -50%);
  }
}

.badge {
  animation: bounce 0.6s ease-in-out;
}
</style>
