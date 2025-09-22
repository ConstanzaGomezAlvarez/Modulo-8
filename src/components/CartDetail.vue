<template>
  <!-- Modal del carrito -->
  <div 
    class="modal fade" 
    id="cartModal" 
    tabindex="-1" 
    aria-labelledby="cartModalLabel" 
    aria-hidden="true"
    ref="cartModal"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="cartModalLabel">
            <i class="bi bi-cart3"></i>
            Carrito de Compras
          </h5>
          <button 
            type="button" 
            class="btn-close btn-close-white" 
            data-bs-dismiss="modal" 
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- Carrito vacío -->
          <div v-if="cartItems.length === 0" class="text-center py-5">
            <i class="bi bi-cart-x display-1 text-muted"></i>
            <h4 class="mt-3">Tu carrito está vacío</h4>
            <p class="text-muted">Agrega algunos productos para comenzar</p>
            <button 
              type="button" 
              class="btn btn-primary" 
              data-bs-dismiss="modal"
            >
              Continuar Comprando
            </button>
          </div>

          <!-- Items del carrito -->
          <div v-else>
            <!-- Lista de productos -->
            <div class="cart-items">
              <div 
                v-for="item in cartItems" 
                :key="item.product.id"
                class="cart-item border-bottom pb-3 mb-3"
              >
                <div class="row align-items-center">
                  <div class="col-md-2">
                    <img 
                      :src="item.product.image" 
                      :alt="item.product.name"
                      class="img-fluid rounded cart-item-image"
                      @error="handleImageError"
                    />
                  </div>
                  <div class="col-md-4">
                    <h6 class="mb-1">{{ item.product.name }}</h6>
                    <small class="text-muted">{{ item.product.description }}</small>
                    <br>
                    <span class="badge bg-secondary">{{ item.product.category }}</span>
                  </div>
                  <div class="col-md-2 text-center">
                    <strong class="text-primary">${{ item.product.price.toFixed(2) }}</strong>
                  </div>
                  <div class="col-md-3">
                    <div class="input-group input-group-sm">
                      <button 
                        class="btn btn-outline-secondary" 
                        type="button"
                        @click="decreaseQuantity(item.product.id)"
                        :disabled="item.quantity <= 1"
                      >
                        -
                      </button>
                      <input 
                        type="text" 
                        class="form-control text-center" 
                        :value="item.quantity"
                        readonly
                      />
                      <button 
                        class="btn btn-outline-secondary" 
                        type="button"
                        @click="increaseQuantity(item.product.id)"
                        :disabled="item.quantity >= item.product.stock"
                      >
                        +
                      </button>
                    </div>
                    <small class="text-muted">Stock: {{ item.product.stock }}</small>
                  </div>
                  <div class="col-md-1 text-center">
                    <button 
                      class="btn btn-outline-danger btn-sm"
                      @click="removeFromCart(item.product.id)"
                      title="Eliminar producto"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-md-8"></div>
                  <div class="col-md-4 text-end">
                    <strong>Subtotal: ${{ (item.product.price * item.quantity).toFixed(2) }}</strong>
                  </div>
                </div>
              </div>
            </div>

            <!-- Resumen del carrito -->
            <div class="cart-summary bg-light p-3 rounded">
              <div class="row">
                <div class="col-md-6">
                  <h6>Resumen del Pedido</h6>
                  <p class="mb-1">
                    <small>{{ totalItems }} producto{{ totalItems !== 1 ? 's' : '' }}</small>
                  </p>
                </div>
                <div class="col-md-6 text-end">
                  <h5 class="text-primary">Total: ${{ totalPrice.toFixed(2) }}</h5>
                </div>
              </div>
              
              <!-- Descuentos simulados -->
              <div v-if="totalPrice > 500" class="alert alert-success mt-2 mb-0">
                <i class="bi bi-gift"></i>
                ¡Envío gratis! Tu pedido supera los $500
              </div>
            </div>
          </div>
        </div>
        
        <!-- Footer del modal -->
        <div v-if="cartItems.length > 0" class="modal-footer">
          <button 
            type="button" 
            class="btn btn-secondary" 
            data-bs-dismiss="modal"
          >
            Seguir Comprando
          </button>
          <button 
            type="button" 
            class="btn btn-outline-danger"
            @click="clearCart"
          >
            <i class="bi bi-trash"></i>
            Vaciar Carrito
          </button>
          <button 
            type="button" 
            class="btn btn-success"
            @click="proceedToCheckout"
          >
            <i class="bi bi-credit-card"></i>
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de confirmación para vaciar carrito -->
  <div 
    class="modal fade" 
    id="confirmClearModal" 
    tabindex="-1" 
    aria-hidden="true"
    ref="confirmClearModal"
  >
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirmar Acción</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <p>¿Estás seguro de que quieres vaciar el carrito?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Cancelar
          </button>
          <button type="button" class="btn btn-danger" @click="confirmClearCart">
            Sí, Vaciar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  name: 'CartDetail',
  props: {
    cartItems: {
      type: Array,
      required: true,
      default: () => []
    },
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modalInstance: null,
      confirmModalInstance: null
    };
  },
  computed: {
    totalItems() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice() {
      return this.cartItems.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
      }, 0);
    }
  },
  mounted() {
    // Inicializar los modales de Bootstrap
    this.modalInstance = new Modal(this.$refs.cartModal);
    this.confirmModalInstance = new Modal(this.$refs.confirmClearModal);
  },
  watch: {
    isVisible(newValue) {
      if (newValue) {
        this.show();
      } else {
        this.hide();
      }
    }
  },
  methods: {
    show() {
      if (this.modalInstance) {
        this.modalInstance.show();
      }
    },

    hide() {
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
    },

    increaseQuantity(productId) {
      this.$emit('increase-quantity', productId);
    },

    decreaseQuantity(productId) {
      this.$emit('decrease-quantity', productId);
    },

    removeFromCart(productId) {
      this.$emit('remove-from-cart', productId);
    },

    clearCart() {
      // Mostrar modal de confirmación
      this.confirmModalInstance.show();
    },

    confirmClearCart() {
      this.$emit('clear-cart');
      this.confirmModalInstance.hide();
    },

    proceedToCheckout() {
      // Emitir evento para proceder al pago
      this.$emit('proceed-to-checkout');
      
      // Cerrar el modal
      this.hide();
      
      // Mostrar mensaje temporal
      this.showCheckoutMessage();
    },

    showCheckoutMessage() {
      // Crear y mostrar un toast de información
      const toastHTML = `
        <div class="toast align-items-center text-bg-info border-0 position-fixed bottom-0 end-0 m-3" style="z-index: 1060">
          <div class="d-flex">
            <div class="toast-body">
              <i class="bi bi-info-circle"></i>
              Redirigiendo al proceso de pago... (funcionalidad pendiente)
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
      `;
      
      document.body.insertAdjacentHTML('beforeend', toastHTML);
      
      const toastElement = document.querySelector('.toast:last-child');
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
      
      // Remover el elemento después de que se oculte
      toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
      });
    },

    handleImageError(event) {
      event.target.src = '/assets/img/placeholder.png';
    }
  }
};
</script>

<style scoped>
.cart-item {
  transition: background-color 0.2s ease;
}

.cart-item:hover {
  background-color: #f8f9fa;
}

.cart-item-image {
  max-height: 80px;
  object-fit: cover;
}

.cart-summary {
  border: 1px solid #dee2e6;
}

.input-group-sm .form-control {
  font-size: 0.875rem;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.775rem;
}

/* Animaciones */
.cart-item {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .modal-lg {
    max-width: 95%;
  }
  
  .cart-item .row {
    text-align: center;
  }
  
  .cart-item .col-md-2,
  .cart-item .col-md-4,
  .cart-item .col-md-3,
  .cart-item .col-md-1 {
    margin-bottom: 10px;
  }
  
  .cart-item-image {
    max-height: 60px;
  }
}

/* Efectos visuales */
.btn {
  transition: all 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.badge {
  font-size: 0.7rem;
}

.modal-content {
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-header {
  border-bottom: 2px solid #495057;
}
</style>