<template>
  <div class="home-page">
    <!-- Sección Hero -->
    <section class="hero-section bg-primary text-white text-center py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-3">
              Bienvenido a Mi Tienda
            </h1>
            <p class="lead mb-4">
              Descubre nuestra increíble selección de productos de alta calidad 
              con los mejores precios del mercado.
            </p>
            <button 
              class="btn btn-light btn-lg"
              @click="scrollToProducts"
            >
              <i class="bi bi-arrow-down-circle"></i>
              Ver Productos
            </button>
          </div>
          <div class="col-lg-6">
            <div class="hero-image">
              <i class="bi bi-shop display-1"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Estadísticas rápidas -->
    <section class="stats-section py-4 bg-light">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-3 mb-3">
            <div class="stat-item">
              <i class="bi bi-box-seam display-6 text-primary"></i>
              <h4>{{ totalProducts }}</h4>
              <p class="text-muted">Productos</p>
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <div class="stat-item">
              <i class="bi bi-truck display-6 text-success"></i>
              <h4>Envío Gratis</h4>
              <p class="text-muted">Compras +$500</p>
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <div class="stat-item">
              <i class="bi bi-shield-check display-6 text-info"></i>
              <h4>100% Seguro</h4>
              <p class="text-muted">Compra Protegida</p>
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <div class="stat-item">
              <i class="bi bi-headset display-6 text-warning"></i>
              <h4>24/7</h4>
              <p class="text-muted">Soporte</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de productos -->
    <section id="products-section" class="products-section py-5">
      <div class="container">
        <div class="row mb-4">
          <div class="col-12 text-center">
            <h2 class="display-5 fw-bold mb-3">Nuestros Productos</h2>
            <p class="lead text-muted">
              Explora nuestra amplia gama de productos cuidadosamente seleccionados
            </p>
          </div>
        </div>
        
        <!-- Componente de productos -->
        <Products @add-to-cart="handleAddToCart" />
      </div>
    </section>

    <!-- Sección de características -->
    <section class="features-section py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center mb-5">
            <h2 class="display-6 fw-bold">¿Por qué elegir Mi Tienda?</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="feature-card text-center p-4">
              <i class="bi bi-lightning-charge display-4 text-warning mb-3"></i>
              <h4>Entrega Rápida</h4>
              <p class="text-muted">
                Recibe tus productos en tiempo récord con nuestro sistema de 
                logística optimizado.
              </p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="feature-card text-center p-4">
              <i class="bi bi-award display-4 text-success mb-3"></i>
              <h4>Calidad Garantizada</h4>
              <p class="text-muted">
                Todos nuestros productos pasan por estrictos controles de calidad 
                antes de llegar a ti.
              </p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="feature-card text-center p-4">
              <i class="bi bi-arrow-clockwise display-4 text-info mb-3"></i>
              <h4>Devolución Fácil</h4>
              <p class="text-muted">
                ¿No estás satisfecho? Tienes 30 días para devolver tu compra 
                sin complicaciones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter sección -->
    <section class="newsletter-section py-5 bg-dark text-white">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h3 class="fw-bold mb-2">¡No te pierdas nuestras ofertas!</h3>
            <p class="mb-0">
              Suscríbete a nuestro newsletter y recibe descuentos exclusivos.
            </p>
          </div>
          <div class="col-lg-6">
            <form @submit.prevent="subscribeNewsletter" class="d-flex gap-2">
              <input 
                type="email" 
                class="form-control" 
                placeholder="Tu email aquí..."
                v-model="emailNewsletter"
                required
              />
              <button type="submit" class="btn btn-primary">
                <i class="bi bi-envelope"></i>
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Products from '../components/Products.vue';
import { Products as ProductsAPI } from '../services/API.js';

export default {
  name: 'HomePage',
  components: {
    Products
  },
  data() {
    return {
      totalProducts: 0,
      emailNewsletter: '',
    };
  },
  async mounted() {
    await this.loadProductStats();
  },
  methods: {
    async loadProductStats() {
      try {
        const products = await ProductsAPI.all();
        this.totalProducts = products.length;
      } catch (error) {
        console.error('Error loading product stats:', error);
        this.totalProducts = 0;
      }
    },

    handleAddToCart(data) {
      // Propagar el evento al componente padre (App.vue)
      this.$emit('add-to-cart', data);
    },

    scrollToProducts() {
      const element = document.getElementById('products-section');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    },

    subscribeNewsletter() {
      if (this.emailNewsletter) {
        // Simular suscripción
        this.showSuccessMessage(`¡Gracias! ${this.emailNewsletter} ha sido suscrito correctamente.`);
        this.emailNewsletter = '';
      }
    },

    showSuccessMessage(message) {
      // Crear toast de éxito
      const toastHTML = `
        <div class="toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-3" style="z-index: 1060">
          <div class="d-flex">
            <div class="toast-body">
              <i class="bi bi-check-circle"></i>
              ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
      `;
      
      document.body.insertAdjacentHTML('beforeend', toastHTML);
      
      const toastElement = document.querySelector('.toast:last-child');
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
      
      // Limpiar después de ocultar
      toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
      });
    }
  }
};
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.hero-image {
  opacity: 0.8;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.stats-section {
  border-bottom: 1px solid #dee2e6;
}

.stat-item {
  padding: 1rem;
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-item h4 {
  font-weight: bold;
  color: #495057;
  margin: 1rem 0 0.5rem 0;
}

.products-section {
  background-color: #ffffff;
}

.feature-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.newsletter-section {
  background: linear-gradient(135deg, #212529 0%, #495057 100%);
}

.newsletter-section .form-control {
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.newsletter-section .btn {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
}

/* Responsive design */
@media (max-width: 768px) {
  .hero-section {
    min-height: 50vh;
    text-align: center;
  }
  
  .hero-section .display-4 {
    font-size: 2rem;
  }
  
  .newsletter-section .d-flex {
    flex-direction: column;
  }
  
  .newsletter-section .btn {
    width: 100%;
    margin-top: 10px;
  }
  
  .feature-card {
    margin-bottom: 2rem;
  }
}

/* Animaciones adicionales */
.stat-item i {
  transition: all 0.3s ease;
}

.stat-item:hover i {
  transform: scale(1.1);
}

.feature-card i {
  transition: all 0.3s ease;
}

.feature-card:hover i {
  transform: rotate(5deg) scale(1.1);
}

/* Scroll suave */
html {
  scroll-behavior: smooth;
}

/* Mejoras de accesibilidad */
.btn:focus,
.form-control:focus {
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

/* Efectos de entrada */
.stats-section,
.products-section,
.features-section,
.newsletter-section {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>