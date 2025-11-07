<template>
  <div class="container mt-4">
    <NavBarTecno />
    <div class="row justify-content-center mt-4">
      <div class="col-12 col-md-8">
        <AddProductForm />
      </div>
    </div>
  </div>
</template>

<script>
import NavBarTecno from '../components/NavBarTecno.vue'
import AddProductForm from '../components/AddProductForm.vue'

export default {
  name: 'StoreAdd',
  components: { NavBarTecno, AddProductForm }
}
</script>

<style scoped></style>
