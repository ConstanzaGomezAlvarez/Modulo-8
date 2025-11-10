<template>
  <div class="card p-3">
    <h4 class="card-title">Agregar Producto</h4>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <form @submit.prevent="onSubmit">
      <div class="mb-2">
        <label class="form-label">Código</label>
        <input v-model="producto.codigo" class="form-control" required />
      </div>
      <div class="mb-2">
        <label class="form-label">Nombre</label>
        <input v-model="producto.nombre" class="form-control" required />
      </div>
      <div class="mb-2">
        <label class="form-label">Stock</label>
        <input v-model.number="producto.stock" type="number" min="0" class="form-control" required />
      </div>
      <div class="mb-2">
        <label class="form-label">Precio</label>
        <input v-model.number="producto.precio" type="number" min="0" class="form-control" required />
      </div>
      <div class="mb-2">
        <label class="form-label">Color</label>
        <input v-model="producto.color" class="form-control" />
      </div>
      <div class="form-check mb-3">
        <input v-model="producto.destacado" class="form-check-input" type="checkbox" id="destacado" />
        <label class="form-check-label" for="destacado">Destacado</label>
      </div>
      <div>
        <button class="btn btn-success me-2" type="submit">Agregar</button>
        <button class="btn btn-secondary" type="button" @click="reset">Limpiar</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddProductForm',
  data() {
    return {
      producto: {
        codigo: '',
        nombre: '',
        stock: 0,
        precio: 0,
        color: '',
        destacado: false
      }
      ,
      errorMessage: ''
    }
  },
  methods: {
    onSubmit() {
      // Normalizar código
      const code = (this.producto.codigo || '').toString().trim()
      if (!code || !this.producto.nombre) {
        this.errorMessage = 'Código y nombre son obligatorios.'
        return
      }

      // Validación: evitar códigos duplicados
      if (this.$store.getters.hasProductCode(code)) {
        this.errorMessage = `El código "${code}" ya existe. Usa uno diferente.`
        return
      }

      // Limpiar mensaje de error y enviar
      this.errorMessage = ''
      this.$store.dispatch('addProduct', { ...this.producto, codigo: code })
      this.$router.push({ name: 'StoreProducts' })
    },
    reset() {
      this.producto = { codigo: '', nombre: '', stock: 0, precio: 0, color: '', destacado: false }
    }
  }
}
</script>

<style scoped>
</style>
