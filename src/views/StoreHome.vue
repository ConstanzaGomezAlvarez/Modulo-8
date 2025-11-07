<template>
  <div class="container mt-4">
    <NavBarTecno />
    <div class="text-center my-4">
      <h1>TecnoChile</h1>
      <p class="text-muted">Prototipo de sistema de gestión de productos</p>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <router-link class="btn btn-primary mb-3" to="/store/products">Ver Productos</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import NavBarTecno from '../components/NavBarTecno.vue'

export default {
  name: 'StoreHome',
  components: { NavBarTecno }
}
</script>

<style scoped>
</style>
