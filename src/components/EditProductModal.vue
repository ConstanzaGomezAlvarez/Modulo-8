<template>
  <div
    class="modal fade"
    id="editProductModal"
    tabindex="-1"
    aria-labelledby="editProductModalLabel"
    aria-hidden="true"
    ref="modalElement"
  >
    <div class="modal-dialog">
      <form class="modal-content" @submit.prevent="emitSaveChanges">
        <div class="modal-header">
          <h5 class="modal-title" id="editProductModalLabel">
            Editar Producto
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Cerrar"
            @click="emitCloseModal"
          ></button>
        </div>
        <div class="modal-body">
          <input type="hidden" v-model="editedProduct.id" />
          <div class="mb-2">
            <label class="form-label">Nombre</label>
            <input
              type="text"
              class="form-control"
              v-model="editedProduct.nombre"
              required
            />
          </div>
          <div class="mb-2">
            <label class="form-label">Precio</label>
            <input
              type="number"
              class="form-control"
              v-model.number="editedProduct.precio"
              min="0"
              required
            />
          </div>
          <div class="mb-2">
            <label class="form-label">Categoría</label>
            <input
              type="text"
              class="form-control"
              v-model="editedProduct.categoria"
              required
            />
          </div>
          <div class="mb-2">
            <label class="form-label">Stock</label>
            <input
              type="number"
              class="form-control"
              v-model.number="editedProduct.stock"
              min="0"
              required
            />
          </div>
          <div class="mb-2">
            <label class="form-label">Imagen (URL)</label>
            <input
              type="text"
              class="form-control"
              v-model="editedProduct.imagen"
            />
          </div>
          <div class="mb-2">
            <label class="form-label">Descripción</label>
            <textarea
              class="form-control"
              v-model="editedProduct.description"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="emitCloseModal"
          >
            Cancelar
          </button>
          <button type="submit" class="btn btn-primary">Guardar cambios</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { Modal } from "bootstrap";

const props = defineProps({
  productToEdit: { type: Object, default: null },
});

const emit = defineEmits(["close-modal", "product-updated", "update-product"]);

const editedProduct = ref({});
const modalElement = ref(null);
let bsModal = null;

watch(
  () => props.productToEdit,
  (newProduct) => {
    if (newProduct) {
      editedProduct.value = { ...newProduct };
      if (bsModal) bsModal.show();
    } else {
      if (bsModal) bsModal.hide();
    }
  }
);

onMounted(() => {
  bsModal = new Modal(modalElement.value);
  modalElement.value.addEventListener("hidden.bs.modal", () => {
    emit("close-modal");
  });
});

const emitSaveChanges = async () => {
  // Emitir el producto editado al componente padre
  emit("product-updated", { ...editedProduct.value });
};

const emitCloseModal = () => {
  emit("close-modal");
};
</script>

<style scoped>
/* Estilos específicos para EditProductModal si es necesario */
</style>
