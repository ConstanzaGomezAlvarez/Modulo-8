<template>
  <div class="col">
    <div class="card h-100">
      <img
        :src="
          product.imagen || 'https://via.placeholder.com/600x400?text=Producto'
        "
        class="card-img-top"
        :alt="product.nombre"
      />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ product.nombre }}</h5>
        <div class="mb-2">
          <span
            v-for="cat in product.categoria || ['Sin categoría']"
            :key="cat"
            class="badge bg-primary me-1"
            >{{ cat }}</span
          >
        </div>
        <p class="card-text">{{ product.description || "" }}</p>
        <p v-if="product.stock === 0" class="text-danger mt-auto">
          <strong>Agotado</strong>
        </p>
        <p
          v-else-if="product.stock === 1"
          class="card-text text-warning mt-auto"
        >
          <strong>¡Solo una unidad restante!</strong>
        </p>
        <p v-else-if="product.stock < 5" class="card-text text-info mt-auto">
          <strong>¡Últimas Unidades!</strong>
        </p>
        <p class="card-text mt-auto">Stock: {{ product.stock }}</p>
        <div class="mb-2">
          <span
            v-for="tag in product.tags || []"
            :key="tag"
            class="badge bg-secondary me-1"
            >{{ tag }}</span
          >
        </div>
      </div>
      <div class="card-footer bg-transparent border-0">
        <h4 class="card-subtitle mb-2">
          Precio: ${{ Number(product.precio).toLocaleString() }}
        </h4>
        <input
          type="number"
          v-model.number="quantityToAdd"
          class="form-control mb-2"
          placeholder="Cantidad"
          min="1"
          :max="product.stock"
          :disabled="product.stock === 0"
        />
        <button
          class="btn btn-primary w-100"
          :disabled="product.stock === 0 || quantityToAdd <= 0"
          @click="emitAddToCart"
        >
          {{ product.stock === 0 ? "Sin stock" : "Agregar al carrito" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  product: { type: Object, required: true },
});

const emit = defineEmits(["add-to-cart"]);

const quantityToAdd = ref(1);

const emitAddToCart = () => {
  if (quantityToAdd.value > 0 && quantityToAdd.value <= props.product.stock) {
    emit("add-to-cart", props.product, quantityToAdd.value);
    quantityToAdd.value = 1; // Resetear cantidad después de añadir
  } else if (quantityToAdd.value <= 0) {
    alert("La cantidad debe ser al menos 1.");
  } else {
    alert("No hay suficiente stock disponible para la cantidad seleccionada.");
  }
};
</script>

<style scoped>
/* Estilos específicos para ProductCard si es necesario */
</style>
