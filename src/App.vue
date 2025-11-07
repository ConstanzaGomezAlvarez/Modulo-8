<template>
  <div id="app">
    <Navbar 
      :cartItems="cartItems"
      @toggle-cart="toggleCartModal"
      @user-logged-out="handleUserLoggedOut"
    />
    
    <WelcomeModal v-if="!currentUser && !hideWelcomeModal" @close="hideWelcomeModal = true" />
    
    <main class="main-content">
      <router-view 
        @add-to-cart="addToCart"
        @user-logged-in="handleUserLoggedIn"
      />
    </main>
    
    <Footer />
    
    <CartDetail 
      :cartItems="cartItems"
      :isVisible="showCartModal"
      @increase-quantity="increaseQuantity"
      @decrease-quantity="decreaseQuantity"
      @remove-from-cart="removeFromCart"
      @clear-cart="clearCart"
      @proceed-to-checkout="proceedToCheckout"
    />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import WelcomeModal from "./components/WelcomeModal.vue";
import CartDetail from "./components/CartDetail.vue";
import { Auth } from "./services/Auth.js";

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    WelcomeModal,
    CartDetail
  },
  data() {
    return {
      cartItems: [],
      currentUser: null,
      showCartModal: false,
      hideWelcomeModal: false
    };
  },
  async mounted() {
    await this.initializeApp();
    this.loadCartFromStorage();
  },
  methods: {
    async initializeApp() {
      try {
        // Verificar si hay un usuario logueado
        this.currentUser = await Auth.getCurrentUser();
        
        // Si hay usuario, ocultar modal de bienvenida
        if (this.currentUser) {
          this.hideWelcomeModal = true;
        }
      } catch (error) {
        console.error('Error initializing app:', error);
        this.currentUser = null;
      }
    },

    // ==================== GESTIÓN DEL CARRITO ====================
    
    addToCart(data) {
      const { product, quantity } = data;
      
      // Buscar si el producto ya existe en el carrito
      const existingItemIndex = this.cartItems.findIndex(
        item => item.product.id === product.id
      );
      
      if (existingItemIndex > -1) {
        // Si existe, actualizar cantidad
        this.cartItems[existingItemIndex].quantity += quantity;
        
        // Verificar que no exceda el stock
        if (this.cartItems[existingItemIndex].quantity > product.stock) {
          this.cartItems[existingItemIndex].quantity = product.stock;
        }
      } else {
        // Si no existe, agregar nuevo item
        this.cartItems.push({
          product: { ...product },
          quantity: Math.min(quantity, product.stock)
        });
      }
      
      this.saveCartToStorage();
      this.showSuccessMessage(`${product.name} agregado al carrito`);
    },

    increaseQuantity(productId) {
      const item = this.cartItems.find(item => item.product.id === productId);
      if (item && item.quantity < item.product.stock) {
        item.quantity++;
        this.saveCartToStorage();
      }
    },

    decreaseQuantity(productId) {
      const item = this.cartItems.find(item => item.product.id === productId);
      if (item && item.quantity > 1) {
        item.quantity--;
        this.saveCartToStorage();
      }
    },

    removeFromCart(productId) {
      const itemIndex = this.cartItems.findIndex(item => item.product.id === productId);
      if (itemIndex > -1) {
        const removedItem = this.cartItems.splice(itemIndex, 1)[0];
        this.saveCartToStorage();
        this.showSuccessMessage(`${removedItem.product.name} eliminado del carrito`);
      }
    },

    clearCart() {
      this.cartItems = [];
      this.saveCartToStorage();
      this.showSuccessMessage('Carrito vaciado');
    },

    // ==================== PERSISTENCIA DEL CARRITO ====================
    
    saveCartToStorage() {
      try {
        localStorage.setItem('cart_items', JSON.stringify(this.cartItems));
      } catch (error) {
        console.error('Error saving cart to storage:', error);
      }
    },

    loadCartFromStorage() {
      try {
        const savedCart = localStorage.getItem('cart_items');
        if (savedCart) {
          this.cartItems = JSON.parse(savedCart);
        }
      } catch (error) {
        console.error('Error loading cart from storage:', error);
        this.cartItems = [];
      }
    },

    // ==================== MODAL DEL CARRITO ====================
    
    toggleCartModal() {
      this.showCartModal = !this.showCartModal;
    },

    // ==================== GESTIÓN DE USUARIOS ====================
    
    handleUserLoggedIn(user) {
      this.currentUser = user;
      this.hideWelcomeModal = true;
      this.showSuccessMessage(`¡Bienvenido, ${user.name}!`);
    },

    handleUserLoggedOut() {
      this.currentUser = null;
      // Opcional: limpiar carrito al hacer logout
      // this.clearCart();
    },

    // ==================== CHECKOUT ====================
    
    proceedToCheckout() {
      if (this.cartItems.length === 0) {
        this.showErrorMessage('El carrito está vacío');
        return;
      }

      // Simular proceso de checkout
      const total = this.cartItems.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity);
      }, 0);

      console.log('Proceeding to checkout:', {
        items: this.cartItems,
        total: total,
        user: this.currentUser
      });

      // Aquí iría la lógica real del checkout
      this.showSuccessMessage(`Procesando compra por $${total.toFixed(2)}`);
    },

    // ==================== MENSAJES Y NOTIFICACIONES ====================
    
    showSuccessMessage(message) {
      this.showToast(message, 'success');
    },

    showErrorMessage(message) {
      this.showToast(message, 'error');
    },

    showToast(message, type = 'success') {
      const bgClass = type === 'success' ? 'text-bg-success' : 'text-bg-danger';
      const icon = type === 'success' ? 'bi-check-circle' : 'bi-exclamation-triangle';
      
      const toastHTML = `
        <div class="toast align-items-center ${bgClass} border-0 position-fixed bottom-0 end-0 m-3" style="z-index: 1060">
          <div class="d-flex">
            <div class="toast-body">
              <i class="bi ${icon}"></i>
              ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
      `;
      
      document.body.insertAdjacentHTML('beforeend', toastHTML);
      
      const toastElement = document.querySelector('.toast:last-child');
      if (window.bootstrap && window.bootstrap.Toast) {
        const toast = new window.bootstrap.Toast(toastElement);
        toast.show();
        
        toastElement.addEventListener('hidden.bs.toast', () => {
          toastElement.remove();
        });
      } else {
        // Fallback si Bootstrap no está disponible
        setTimeout(() => {
          toastElement.remove();
        }, 3000);
      }
    }
  },

  // ==================== WATCHERS ====================
  
  watch: {
    cartItems: {
      handler(newItems) {
        // Actualizar título con cantidad de items
        const totalItems = newItems.reduce((total, item) => total + item.quantity, 0);
        if (totalItems > 0) {
          document.title = `(${totalItems}) Mi Tienda`;
        } else {
          document.title = 'Mi Tienda';
        }
      },
      deep: true
    }
  }
};
</script>

<style>
/* Estilos globales de la aplicación */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

/* Mejoras de Bootstrap Icons */
.bi {
  line-height: 1;
}

/* Animaciones globales */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Estilos para toasts personalizados */
.toast {
  min-width: 300px;
  font-weight: 500;
}

.toast .toast-body {
  padding: 1rem;
}

.toast .bi {
  margin-right: 0.5rem;
}

/* Scroll suave global */
html {
  scroll-behavior: smooth;
}

/* Mejoras de accesibilidad */
*:focus {
  outline: 2px solid #0d6efd;
  outline-offset: 2px;
}

*:focus:not(:focus-visible) {
  outline: none;
}

/* Responsive typography */
@media (max-width: 768px) {
  .display-1 { font-size: 3rem; }
  .display-2 { font-size: 2.5rem; }
  .display-3 { font-size: 2rem; }
  .display-4 { font-size: 1.75rem; }
  .display-5 { font-size: 1.5rem; }
  .display-6 { font-size: 1.25rem; }
}

/* Loading states */
.loading {
  opacity: 0.6;
  pointer-events: none;
}

/* Animación de entrada para elementos */
.animate-in {
  animation: slideInUp 0.6s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mejorar contraste para mejor accesibilidad */
.text-muted {
  color: #6c757d !important;
}

/* Efectos hover consistentes */
.btn, .card, .nav-link {
  transition: all 0.3s ease;
}

/* Personalización de scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
