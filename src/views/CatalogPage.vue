<template>
  <div class="container mt-4">
    <h2 class="text-center">Búsqueda de Productos</h2>
    <!-- Filtros -->
    <section class="card p-3 mb-4">
      <h2 class="h5 mb-3">Filtros</h2>
      <div class="row g-3 align-items-end">
        <div class="col-12 col-md-4">
          <label class="form-label">Categoría</label>
          <select
            v-model="filters.category"
            @change="applyFilters"
            class="form-select"
          >
            <option v-for="cat in productCategories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label"
            >Precio máximo:
            <span id="price-value"
              >${{ filters.maxPrice.toLocaleString() }}</span
            ></label
          >
          <input
            type="range"
            v-model.number="filters.maxPrice"
            :min="0"
            :max="maxProductPrice"
            step="1000"
            class="form-range"
            @input="applyFilters"
          />
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label">Buscador</label>
          <input
            type="text"
            v-model="filters.searchText"
            class="form-control"
            placeholder="Buscar por nombre, descripción, categoría o etiqueta"
            @input="applyFilters"
          />
        </div>
      </div>
    </section>
    <!--catalogo-->
    <div v-if="loading" class="text-center text-muted py-4">
      Cargando productos...
    </div>
    <div v-else-if="error" class="alert alert-danger text-center">
      {{ error }}
    </div>
    <div
      v-else-if="filteredProducts.length"
      class="container-fluid text-center catalogo my-5"
    >
      <div class="row row-cols-xxl-3 row-cols-sm-2 g-4">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="handleAddToCart"
        />
      </div>
    </div>
    <div v-else class="col text-center text-muted py-4">
      No se encontraron productos.
    </div>
  </div>

  <!-- tabla carrito-->
  <CartDisplay
    :cart-items="cart"
    :cart-total-info="cartTotal"
    @update-quantity="updateCartItemQuantity"
    @remove-from-cart="removeFromCart"
    @clear-cart="clearCart"
    @show-shipping-form="showShippingForm = true"
  />

  <!-- Formulario despacho-->
  <ShippingForm
    v-if="showShippingForm"
    @purchase-confirmed="handlePurchaseConfirmed"
  />
  <div v-if="purchaseMessage" class="container my-5" id="mensaje-correo">
    <div :class="[`alert alert-${purchaseMessage.type}`]">
      {{ purchaseMessage.text }}
    </div>
  </div>

  <!-- Boleta -->
  <Receipt
    v-if="showReceipt"
    :order-details="orderDetailsForReceipt"
    :shipping-info="shippingInfoForReceipt"
    :cart-total-info="cartTotal"
  />
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
// Importamos de nuevo los componentes, pero sin el store de Pinia
import ProductCard from "../components/ProductCard.vue";
import CartDisplay from "../components/CartDisplay.vue";
import ShippingForm from "../components/ShippingForm.vue";
import Receipt from "../components/Receipt.vue";

// Estado local
const products = ref([]);
const cart = ref([]);
const filters = ref({
  category: "Todas",
  maxPrice: 0,
  searchText: "",
});
const loading = ref(false);
const error = ref(null);

const showShippingForm = ref(false);
const showReceipt = ref(false);
const purchaseMessage = ref(null); // { text: string, type: 'success' | 'danger' }
const orderDetailsForReceipt = ref(null);
const shippingInfoForReceipt = ref(null);

const API_BASE_URL = "http://localhost:3000/api";

// Funciones de API (equivalentes a las acciones del store)
const fetchProducts = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await fetch(`${API_BASE_URL}/productos`);
    if (!res.ok) throw new Error("Error al cargar productos");
    const data = await res.json();
    products.value = data.map((p) => ({
      ...p,
      categoria: Array.isArray(p.categoria)
        ? p.categoria
        : String(p.categoria || "")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
      tags: Array.isArray(p.tags)
        ? p.tags
        : String(p.tags || "")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
    }));
    filters.value.maxPrice = maxProductPrice.value; // Inicializar filtro de precio
  } catch (e) {
    console.error("Error cargando productos:", e);
    error.value = "Error al cargar productos";
  } finally {
    loading.value = false;
  }
};

const updateProductStock = async (productId, newStock) => {
  try {
    const res = await fetch(`${API_BASE_URL}/productos/${productId}/stock`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: newStock }),
    });
    if (!res.ok) throw new Error("Error al actualizar stock");
    const product = products.value.find((p) => p.id === productId);
    if (product) {
      product.stock = newStock;
    }
    return true;
  } catch (err) {
    console.error("Error al actualizar stock", err);
    error.value = "Error al actualizar stock";
    return false;
  }
};

const sendEmail = async (emailData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/enviar-correo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailData),
    });
    if (!res.ok) throw new Error("Error al enviar correo");
    return await res.json();
  } catch (err) {
    console.error("Error al enviar correo", err);
    error.value = "Error al enviar correo";
    throw err; // Re-lanzar para que handlePurchaseConfirmed lo capture
  }
};

// Computed properties (equivalentes a los getters del store)
const productCategories = computed(() => {
  const allCats = products.value.flatMap(
    (p) => p.categoria || ["Sin categoría"]
  );
  return ["Todas", ...new Set(allCats)];
});

const maxProductPrice = computed(() => {
  return products.value.length
    ? Math.max(...products.value.map((p) => p.precio)) + 100000
    : 0;
});

const filteredProducts = computed(() => {
  const { category, maxPrice, searchText } = filters.value;
  let filtered = products.value;

  if (category !== "Todas") {
    filtered = filtered.filter((p) =>
      (Array.isArray(p.categoria) ? p.categoria : [p.categoria]).includes(
        category
      )
    );
  }

  filtered = filtered.filter((p) => p.precio <= maxPrice);

  if (searchText) {
    const q = searchText.toLowerCase();
    filtered = filtered.filter((p) => {
      const haystack = [
        p.nombre,
        p.description,
        ...(Array.isArray(p.categoria) ? p.categoria : [p.categoria]),
        ...(Array.isArray(p.tags) ? p.tags : []),
      ]
        .filter(Boolean)
        .map((s) => String(s).toLowerCase());
      return haystack.some((str) => str.includes(q));
    });
  }
  return filtered;
});

const cartTotal = computed(() => {
  const neto = cart.value.reduce((acc, p) => acc + p.precio * p.quantity, 0);
  const iva = neto * 0.19;
  let total = neto + iva;
  const despacho = total > 100000 ? total * 0.05 : 0;
  total += despacho;
  return { neto, iva, despacho, total };
});

// Lógica del carrito
const handleAddToCart = (product, quantity) => {
  const productInProducts = products.value.find((p) => p.id === product.id);
  if (productInProducts && quantity > productInProducts.stock) {
    alert(
      `No hay suficiente stock disponible para ${product.nombre}. Stock actual: ${productInProducts.stock}`
    );
    return;
  }

  const existingItem = cart.value.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.value.push({ ...product, quantity });
  }
  // Oculta el formulario de despacho y la boleta si se añade un producto, por si ya estaban visibles
  showShippingForm.value = false;
  showReceipt.value = false;
  purchaseMessage.value = null;
};

const updateCartItemQuantity = (productId, newQty) => {
  const item = cart.value.find((item) => item.id === productId);
  if (!item) return;

  const productInProducts = products.value.find((p) => p.id === productId);

  if (newQty <= 0) {
    if (confirm("¿Quieres eliminar este producto del carrito?")) {
      cart.value = cart.value.filter((i) => i.id !== productId);
    } else {
      item.quantity = 1; // Revertir a la cantidad mínima deseada si se cancela
    }
    return;
  }
  if (productInProducts && newQty > productInProducts.stock) {
    alert(
      `No hay suficiente stock disponible. Stock actual: ${productInProducts.stock}`
    );
    item.quantity = productInProducts.stock; // Revertir a la cantidad máxima disponible
    return;
  }
  item.quantity = newQty;
};

const removeFromCart = (productId) => {
  if (confirm("¿Seguro que deseas eliminar este producto del carrito?")) {
    cart.value = cart.value.filter((item) => item.id !== productId);
  }
};

const clearCart = () => {
  if (cart.value.length === 0) {
    alert("El carrito ya está vacío.");
    return;
  }
  if (confirm("¿Seguro que quieres vaciar el carrito?")) {
    cart.value = [];
  }
};

const handlePurchaseConfirmed = async (shippingData) => {
  if (cart.value.length === 0) {
    purchaseMessage.value = {
      text: "El carrito está vacío. Agrega productos antes de confirmar la compra.",
      type: "danger",
    };
    return;
  }
  try {
    const emailData = {
      nombre: shippingData.nombre,
      email: shippingData.email,
      direccion: shippingData.direccion,
      mensaje: `Resumen de compra: ${cart.value
        .map((p) => `${p.nombre} x${p.quantity}`)
        .join(", ")}`,
      region: shippingData.region,
    };
    const emailResult = await sendEmail(emailData);
    purchaseMessage.value = { text: emailResult.mensaje, type: "success" };

    // Actualizar stock de cada producto en el carrito
    for (const item of cart.value) {
      const success = await updateProductStock(
        item.id,
        products.value.find((p) => p.id === item.id).stock - item.quantity
      );
      if (!success) {
        throw new Error(
          `Error al actualizar el stock del producto ${item.nombre}`
        );
      }
    }

    // Preparar datos para la boleta
    orderDetailsForReceipt.value = cart.value.map((item) => ({
      nombre: item.nombre,
      cantidad: item.quantity,
      precioUnitario: item.precio,
      total: item.precio * item.quantity,
    }));
    shippingInfoForReceipt.value = shippingData;
    showReceipt.value = true;

    cart.value = []; // Vaciar carrito después de la compra
    showShippingForm.value = false; // Ocultar formulario de despacho
    alert("Compra confirmada y correo enviado correctamente.");
  } catch (err) {
    purchaseMessage.value = {
      text: "Error al procesar la compra.",
      type: "danger",
    };
    console.error("Error al confirmar la compra:", err);
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
/* Estilos específicos para CatalogPage si es necesario */
</style>
