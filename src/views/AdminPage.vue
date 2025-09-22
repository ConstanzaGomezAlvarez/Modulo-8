<template>
  <div class="container my-5">
    <h2>Administrador de Inventario</h2>
    <!-- Formulario para agregar producto -->
    <AddProductForm @add-product="handleAddProduct" />
    <ProductTable
      :products="products"
      :loading="loading"
      :error="error"
      @edit-product="handleEditProduct"
      @delete-product="handleDeleteProduct"
    />
  </div>
  <!-- Modal de edición -->
  <EditProductModal
    :product-to-edit="productToEdit"
    @close-modal="productToEdit = null"
    @product-updated="handleProductUpdated"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import AddProductForm from "../components/AddProductForm.vue";
import ProductTable from "../components/ProductTable.vue";
import EditProductModal from "../components/EditProductModal.vue";

const products = ref([]);
const loading = ref(false);
const error = ref(null);
const productToEdit = ref(null);

const API_BASE_URL = "http://localhost:3000/api";

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await fetch(`${API_BASE_URL}/productos`);
    if (!res.ok) throw new Error("Error al cargar productos");
    products.value = await res.json();
  } catch (e) {
    console.error("Error cargando productos:", e);
    error.value = "Error al cargar productos";
  } finally {
    loading.value = false;
  }
};

const addProduct = async (newProduct) => {
  try {
    const res = await fetch(`${API_BASE_URL}/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    if (!res.ok) throw new Error("Error al agregar producto");
    await fetchProducts(); // Recargar la lista después de agregar
    return true;
  } catch (err) {
    console.error("Error al agregar producto", err);
    error.value = "Error al agregar producto";
    return false;
  }
};

const updateProduct = async (updatedProduct) => {
  try {
    const res = await fetch(`${API_BASE_URL}/productos/${updatedProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });
    if (!res.ok) throw new Error("Error al actualizar producto");
    await fetchProducts(); // Recargar la lista después de actualizar
    return true;
  } catch (err) {
    console.error("Error al actualizar producto", err);
    error.value = "Error al actualizar producto";
    return false;
  }
};

const deleteProduct = async (productId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/productos/${productId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar producto");
    await fetchProducts(); // Recargar la lista después de eliminar
    return true;
  } catch (err) {
    console.error("Error al eliminar producto", err);
    error.value = "Error al eliminar producto";
    return false;
  }
};

const handleAddProduct = async (productData) => {
  const success = await addProduct(productData);
  if (success) {
    alert("Producto agregado correctamente");
  } else {
    alert("Error al agregar el producto");
  }
};

const handleEditProduct = (product) => {
  productToEdit.value = { ...product };
};

const handleProductUpdated = async (updatedProduct) => {
  const success = await updateProduct(updatedProduct);
  if (success) {
    productToEdit.value = null; // Cerrar el modal
    alert("Producto actualizado correctamente");
  } else {
    alert("Error al actualizar el producto");
  }
};

const handleDeleteProduct = async (productId) => {
  const productToDelete = products.value.find((p) => p.id === productId);
  if (
    productToDelete &&
    confirm(
      `¿Seguro que deseas eliminar el producto "${productToDelete.nombre}"?`
    )
  ) {
    const success = await deleteProduct(productId);
    if (!success) {
      alert("Error al eliminar el producto");
    }
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
/* Estilos específicos para AdminPage si es necesario */
</style>
