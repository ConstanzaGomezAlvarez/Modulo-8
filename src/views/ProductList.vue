<template>
  <div class="container mt-4">
    <NavBarTecno />

    <div class="d-flex justify-content-between align-items-center my-3">
      <h2>Productos</h2>
      <div class="w-50">
        <input v-model="q" @input="onFilter" class="form-control" placeholder="Buscar por nombre..." />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-6">
        <div class="alert alert-info">Productos registrados: <strong>{{ productCount }}</strong></div>
      </div>
      <div class="col-6">
        <div class="alert alert-warning">Stock total: <strong>{{ totalStock }}</strong></div>
      </div>
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Stock</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in productos" :key="p.codigo">
          <td>{{ p.codigo }}</td>
          <td>
            {{ p.nombre }}
            <span v-if="p.destacado" class="badge bg-success ms-2">Destacado</span>
          </td>
          <td>
            <span :style="{ color: p.color || 'inherit' }">{{ p.stock }}</span>
          </td>
          <td>{{ formatPrice(p.precio) }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NavBarTecno from '../components/NavBarTecno.vue'

export default {
  name: 'ProductList',
  components: { NavBarTecno },
  data() {
    return { q: '' }
  },
  computed: {
    ...mapGetters(['productCount', 'totalStock']),
    productos() {
      return this.$store.getters.filteredProducts(this.q)
    }
  },
  methods: {
    ...mapActions(['setFiltro']),
    onFilter() {
      this.setFiltro(this.q)
    },
    formatPrice(v) {
      return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(v)
    }
  }
}
</script>

<style scoped>
</style>
