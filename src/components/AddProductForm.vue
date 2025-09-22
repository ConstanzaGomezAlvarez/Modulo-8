<template>
  <form @submit.prevent="emitAddProduct" class="mb-4">
    <div class="row g-3">
      <div class="col-md-6 col-lg-4">
        <input
          type="text"
          class="form-control"
          v-model="newProduct.nombre"
          placeholder="Nombre"
          required
        />
      </div>
      <div class="col-md-6 col-lg-4">
        <input
          type="number"
          class="form-control"
          v-model.number="newProduct.precio"
          placeholder="Precio"
          required
        />
      </div>
      <div class="col-md-6 col-lg-4">
        <input
          type="text"
          class="form-control"
          v-model="newProduct.categoria"
          placeholder="Categoría"
          required
        />
      </div>
      <div class="col-md-6 col-lg-4">
        <input
          type="number"
          class="form-control"
          v-model.number="newProduct.stock"
          placeholder="Cantidad"
          required
        />
      </div>
      <div class="col-md-6 col-lg-4">
        <input
          type="text"
          class="form-control"
          v-model="newProduct.description"
          placeholder="Descripción"
          required
        />
      </div>
      <div class="col-md-6 col-lg-4">
        <input
          type="text"
          class="form-control"
          v-model="newProduct.imagen"
          placeholder="URL Imagen"
          required
        />
      </div>
      <div class="col-12 text-end">
        <button type="submit" class="btn btn-success px-4">Agregar</button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["add-product"]);

const newProduct = ref({
  nombre: "",
  precio: null,
  categoria: "",
  stock: null,
  description: "",
  imagen: "",
});

const emitAddProduct = () => {
  if (!newProduct.value.nombre || newProduct.value.precio === null || newProduct.value.precio === "") {
    alert("Nombre y precio son obligatorios");
    return;
  }
  if (newProduct.value.stock === null || newProduct.value.stock === "") {
    alert("La cantidad es obligatoria");
    return;
  }
  emit("add-product", { ...newProduct.value });
  // Limpiar el formulario
  newProduct.value = {
    nombre: "",
    precio: null,
    categoria: "",
    stock: null,
    description: "",
    imagen: "",
  };
};
</script>

<style scoped>
/* Estilos específicos para AddProductForm si es necesario */
</style>
