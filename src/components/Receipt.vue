<template>
  <div class="container my-5">
    <h2>Boleta Electrónica</h2>
    <div v-if="orderDetails && orderDetails.length > 0" id="detalleProductos">
      <h4>Detalle de Productos:</h4>
      <ul class="list-group mb-3">
        <li
          v-for="(item, index) in orderDetails"
          :key="index"
          class="list-group-item d-flex justify-content-between lh-sm"
        >
          <div>
            <h6 class="my-0">{{ item.nombre }} (x{{ item.cantidad }})</h6>
            <small class="text-muted"
              >Precio Unitario: ${{
                Number(item.precioUnitario).toLocaleString()
              }}</small
            >
          </div>
          <span class="text-muted"
            >Total: ${{ Number(item.total).toLocaleString() }}</span
          >
        </li>
      </ul>
    </div>

    <div v-if="shippingInfo" id="infoDespacho" class="mt-3">
      <h4>Información de Despacho:</h4>
      <p><strong>Nombre:</strong> {{ shippingInfo.nombre }}</p>
      <p><strong>Correo:</strong> {{ shippingInfo.email }}</p>
      <p><strong>Dirección:</strong> {{ shippingInfo.direccion }}</p>
      <p><strong>Región:</strong> {{ shippingInfo.region }}</p>
    </div>

    <div v-if="cartTotalInfo" id="resumenCompra" class="mt-3">
      <h4>Resumen de Compra:</h4>
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
      </p>
      <p>
        <strong>Valor Total:</strong> ${{
          cartTotalInfo.total.toLocaleString()
        }}.-
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  orderDetails: { type: Array, default: () => [] },
  shippingInfo: { type: Object, default: () => ({}) },
  cartTotalInfo: {
    type: Object,
    default: () => ({ neto: 0, iva: 0, despacho: 0, total: 0 }),
  },
});
</script>

<style scoped>
/* Estilos específicos para Receipt si es necesario */
</style>
