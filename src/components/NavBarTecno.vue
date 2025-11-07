<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">TecnoChile</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><router-link class="nav-link" to="/store">Inicio</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/store/products">Productos</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/store/add">Agregar</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default { name: 'NavBarTecno' }
</script>

<style scoped>
/* pequeños ajustes */
.navbar-brand { font-weight: 700 }
</style>
