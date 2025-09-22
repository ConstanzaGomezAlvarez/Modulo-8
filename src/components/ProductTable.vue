<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Categoría</th>
        <th>Stock</th>
        <th>Descripción</th>
        <th>Imagen</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="loading">
        <td colspan="8" class="text-center">Cargando productos...</td>
      </tr>
      <tr v-else-if="error">
        <td colspan="8" class="text-danger text-center">{{ error }}</td>
      </tr>
      <tr v-else-if="products.length === 0">
        <td colspan="8" class="text-center">No hay productos para mostrar.</td>
      </tr>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.id }}</td>
        <td>{{ product.nombre }}</td>
        <td>${{ Number(product.precio).toLocaleString() }}</td>
        <td>{{ product.categoria }}</td>
        <td>{{ product.stock }}</td>
        <td>{{ product.description }}</td>
        <td>
          <img
            :src="product.imagen || 'https://via.placeholder.com/50'"
            alt="img"
            style="max-width: 50px; max-height: 50px"
          />
        </td>
        <td>
          <button
            class="btn btn-sm btn-warning me-2"
            @click="emitEditProduct(product)"
          >
            <i class="bi bi-pencil-square"></i>
          </button>
          <button
            class="btn btn-sm btn-danger"
            @click="emitDeleteProduct(product.id)"
          >
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  products: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  error: { type: String, default: null },
});

const emit = defineEmits(["edit-product", "delete-product"]);

const emitEditProduct = (product) => {
  emit("edit-product", product);
};

const emitDeleteProduct = (productId) => {
  emit("delete-product", productId);
};
</script>

<style scoped>
/* Estilos específicos para ProductTable si es necesario */
</style>
