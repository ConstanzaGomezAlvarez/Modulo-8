<template>
  <div class="products-container">
    <!-- Sección de búsqueda -->
    <div class="search-section mb-4">
      <div class="row">
        <div class="col-md-6">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Buscar productos..."
              v-model="searchQuery"
              @input="handleSearch"
            />
            <button class="btn btn-outline-secondary" type="button" @click="clearSearch">
              <i class="bi bi-x-circle"></i>
            </button>
          </div>
        </div>
        <div class="col-md-6 text-end">
          <span class="text-muted">{{ filteredProducts.length }} productos encontrados</span>
        </div>
      </div>
    </div>

    <!-- Estado de carga -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-2">Cargando productos...</p>
    </div>

    <!-- Estado de error -->
    <div v-else-if="error" class="alert alert-danger" role="alert">
      <i class="bi bi-exclamation-triangle"></i>
      Error al cargar productos: {{ error }}
      <button class="btn btn-sm btn-outline-danger ms-2" @click="loadProducts">
        Reintentar
      </button>
    </div>

    <!-- Lista de productos -->
    <div v-else-if="filteredProducts.length > 0" class="row">
      <div 
        v-for="product in filteredProducts" 
        :key="product.id"
        class="col-lg-4 col-md-6 mb-4"
      >
        <div class="card h-100 product-card">
          <img 
            :src="product.image" 
            class="card-img-top product-image" 
            :alt="product.name"
            @error="handleImageError"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text text-muted small">{{ product.description }}</p>
            <div class="mt-auto">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge bg-secondary">{{ product.category }}</span>
                <span class="text-muted small">Stock: {{ product.stock }}</span>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <h6 class="text-primary mb-0">${{ product.price.toFixed(2) }}</h6>
                <div class="d-flex align-items-center">
                  <div class="input-group input-group-sm me-2" style="width: 100px;">
                    <button 
                      class="btn btn-outline-secondary" 
                      type="button"
                      @click="decreaseQuantity(product.id)"
                      :disabled="getProductQuantity(product.id) <= 1"
                    >
                      -
                    </button>
                    <input 
                      type="text" 
                      class="form-control text-center" 
                      :value="getProductQuantity(product.id)"
                      readonly
                    />
                    <button 
                      class="btn btn-outline-secondary" 
                      type="button"
                      @click="increaseQuantity(product.id)"
                      :disabled="getProductQuantity(product.id) >= product.stock"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    class="btn btn-primary btn-sm"
                    @click="addToCart(product)"
                    :disabled="product.stock === 0"
                  >
                    <i class="bi bi-cart-plus"></i>
                    {{ product.stock === 0 ? 'Sin stock' : 'Agregar' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Estado vacío -->
    <div v-else class="text-center py-5">
      <i class="bi bi-search display-1 text-muted"></i>
      <h4 class="mt-3">No se encontraron productos</h4>
      <p class="text-muted">
        {{ searchQuery ? 'Intenta con otros términos de búsqueda' : 'No hay productos disponibles' }}
      </p>
      <button v-if="searchQuery" class="btn btn-outline-primary" @click="clearSearch">
        Limpiar búsqueda
      </button>
    </div>

    <!-- Toast de confirmación -->
    <div
      class="toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-3"
      style="z-index: 1050"
      ref="toast"
    >
      <div class="d-flex">
        <div class="toast-body">
          <i class="bi bi-check-circle"></i>
          {{ toastMessage }}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="hideToast"></button>
      </div>
    </div>
  </div>
</template>

<script>
import { Products } from '../services/API.js';

export default {
  name: 'Products',
  data() {
    return {
      products: [],
      filteredProducts: [],
      loading: false,
      error: null,
      searchQuery: '',
      searchTimeout: null,
      quantities: {}, // Almacena las cantidades seleccionadas para cada producto
      toastMessage: '',
    };
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      this.loading = true;
      this.error = null;
      
      try {
        this.products = await Products.all();
        this.filteredProducts = [...this.products];
        
        // Inicializar cantidades
        this.products.forEach(product => {
          this.quantities[product.id] = 1;
        });
      } catch (err) {
        this.error = err.message || 'Error al cargar productos';
        console.error('Error loading products:', err);
      } finally {
        this.loading = false;
      }
    },

    handleSearch() {
      // Debounce la búsqueda
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      
      this.searchTimeout = setTimeout(() => {
        this.performSearch();
      }, 300);
    },

    async performSearch() {
      if (!this.searchQuery.trim()) {
        this.filteredProducts = [...this.products];
        return;
      }

      try {
        this.loading = true;
        this.filteredProducts = await Products.search(this.searchQuery);
      } catch (err) {
        console.error('Error searching products:', err);
        this.error = 'Error al buscar productos';
      } finally {
        this.loading = false;
      }
    },

    clearSearch() {
      this.searchQuery = '';
      this.filteredProducts = [...this.products];
    },

    getProductQuantity(productId) {
      return this.quantities[productId] || 1;
    },

    increaseQuantity(productId) {
      const product = this.products.find(p => p.id === productId);
      if (this.quantities[productId] < product.stock) {
        this.quantities[productId] = this.quantities[productId] + 1;
      }
    },

    decreaseQuantity(productId) {
      if (this.quantities[productId] > 1) {
        this.quantities[productId] = this.quantities[productId] - 1;
      }
    },

    addToCart(product) {
      const quantity = this.getProductQuantity(product.id);
      
      // Emitir evento al componente padre
      this.$emit('add-to-cart', {
        product: { ...product },
        quantity: quantity
      });

      // Mostrar toast de confirmación
      this.toastMessage = `${product.name} agregado al carrito (${quantity})`;
      this.showToast();

      // Resetear cantidad a 1
      this.quantities[product.id] = 1;
    },

    showToast() {
      const toastElement = this.$refs.toast;
      if (toastElement) {
        toastElement.classList.add('show');
        setTimeout(() => {
          this.hideToast();
        }, 3000);
      }
    },

    hideToast() {
      const toastElement = this.$refs.toast;
      if (toastElement) {
        toastElement.classList.remove('show');
      }
    },

    handleImageError(event) {
      // Imagen por defecto si no se puede cargar
      event.target.src = '/assets/img/placeholder.png';
    }
  }
};
</script>

<style scoped>
.products-container {
  padding: 20px 0;
}

.product-card {
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #e0e0e0;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-image {
  height: 200px;
  object-fit: cover;
  object-position: center;
}

.search-section {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.toast {
  display: none;
}

.toast.show {
  display: block;
}

.input-group-sm .form-control {
  font-size: 0.875rem;
}

.badge {
  font-size: 0.7rem;
}

@media (max-width: 768px) {
  .product-card .d-flex {
    flex-direction: column;
    align-items: stretch !important;
  }
  
  .product-card .input-group {
    margin-bottom: 10px;
    margin-right: 0 !important;
  }
}
</style>
