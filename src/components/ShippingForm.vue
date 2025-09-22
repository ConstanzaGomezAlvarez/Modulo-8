<template>
  <div class="container my-5">
    <div class="card mt-4">
      <div class="card-body">
        <h2 class="card-title">
          <b>Datos para el despacho y confirmación por correo</b>
        </h2>
        <form @submit.prevent="submitForm">
          <div class="row g-3">
            <div class="col-md-6">
              <input
                class="form-control"
                type="text"
                v-model="shippingData.nombre"
                placeholder="Nombre quien recibe"
                required
              />
            </div>
            <div class="col-md-6">
              <input
                class="form-control"
                type="email"
                v-model="shippingData.email"
                placeholder="Correo electrónico"
                required
              />
            </div>
            <div class="col-md-6">
              <input
                class="form-control"
                type="text"
                v-model="shippingData.direccion"
                placeholder="Dirección"
                required
              />
            </div>
            <div class="col-md-6">
              <input
                class="form-control"
                type="text"
                v-model="shippingData.region"
                placeholder="Región"
                required
              />
            </div>
            <div class="col-12">
              <textarea
                class="form-control"
                v-model="shippingData.mensaje"
                rows="3"
                placeholder="Mensaje"
                required
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary">
              Confirmar Compra
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  cartItems: { type: Array, default: () => [] },
});

const emit = defineEmits(["purchase-confirmed"]);

const shippingData = ref({
  nombre: "",
  email: "",
  direccion: "",
  region: "",
  mensaje: "",
});

// Observar cambios en cartItems para actualizar el mensaje de resumen de compra
watch(
  () => props.cartItems,
  (newCartItems) => {
    shippingData.value.mensaje = `Resumen de compra: ${newCartItems
      .map((p) => `${p.nombre} x${p.quantity}`)
      .join(", ")}`;
  },
  { immediate: true }
);

const submitForm = () => {
  emit("purchase-confirmed", shippingData.value);
};
</script>

<style scoped>
/* Estilos específicos para ShippingForm si es necesario */
</style>
