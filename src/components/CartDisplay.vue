<template>
  <div class="container mt-4">
    <h3 v-if="cartItems.length === 0">El carrito está vacío.</h3>
    <div v-else>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Valor</th>
            <th>Total</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cartItems" :key="item.id">
            <td>{{ item.nombre }}</td>
            <td>
              <input
                type="number"
                min="0"
                :max="item.stock"
                :value="item.quantity"
                @change="emitUpdateQuantity(item.id, $event.target.value)"
                class="form-control"
                style="width: 80px"
              />
            </td>
            <td>${{ Number(item.precio).toLocaleString() }}</td>
            <td>${{ (item.precio * item.quantity).toLocaleString() }}</td>
            <td>
              <button
                class="btn btn-danger btn-sm"
                @click="emitRemoveFromCart(item.id)"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-end mt-3">
        <button class="btn btn-danger" @click="emitClearCart">
          Vaciar carrito
        </button>
        <button class="btn btn-success ms-2" @click="emitShowShippingForm">
          Confirmar compra
        </button>
      </div>
      <div class="mt-3">
        <p>
          <strong>Valor neto:</strong> ${{
            cartTotalInfo.neto.toLocaleString()
          }}.-
        </p>
        <p>
          <strong>IVA 19%:</strong> ${{ cartTotalInfo.iva.toLocaleString() }}.-
        </p>
        <p v-if="cartTotalInfo.despacho > 0">
          <strong>Despacho:</strong> ${{
            cartTotalInfo.despacho.toLocaleString()
          }}.-
          <small>(Envío gratis para compras superiores a $100.000)</small>
        </p>
        <p>
          <strong>Valor Total:</strong> ${{
            cartTotalInfo.total.toLocaleString()
          }}.-
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cartItems: { type: Array, default: () => [] },
  cartTotalInfo: {
    type: Object,
    default: () => ({ neto: 0, iva: 0, despacho: 0, total: 0 }),
  },
});

const emit = defineEmits([
  "update-quantity",
  "remove-from-cart",
  "clear-cart",
  "show-shipping-form",
]);

const emitUpdateQuantity = (productId, newQty) => {
  emit("update-quantity", productId, parseInt(newQty, 10));
};

const emitRemoveFromCart = (productId) => {
  emit("remove-from-cart", productId);
};

const emitClearCart = () => {
  emit("clear-cart");
};

const emitShowShippingForm = () => {
  emit("show-shipping-form");
};
</script>

<style scoped>
/* Estilos específicos para CartDisplay si es necesario */
</style>
