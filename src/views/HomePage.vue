<template>
  <div class="container px-4 px-lg-5">
    <!-- Head-->
    <div class="row gx-4 gx-lg-5 align-items-center my-5">
      <div class="col-lg-7">
        <img
          class="img-fluid rounded mb-4 mb-lg-0"
          src="https://www.openenglish.com/blog/es/wp-content/uploads/sites/2/2024/07/Hardware-y-Software-que-son-v001.jpg"
          alt="..."
        />
      </div>
      <div class="col-lg-5">
        <h1 class="font-weight-light">Tecno Chile</h1>
        <p>
          Tecno Chile te conecta con lo mejor en computadores, componentes y
          periféricos. Nuestra tienda en línea está diseñada para ofrecerte una
          experiencia rápida, segura y eficiente, con soluciones tecnológicas
          que se adaptan a tus necesidades. ¡Compra inteligente, compra con
          Tecno Chile!
        </p>
        <router-link to="/catalogo" class="btn btn-primary"
          >Tienda Online!</router-link
        >
      </div>
    </div>
    <!-- Carrusel-->
    <div
      id="carouselExampleAutoplaying"
      class="carousel slide mb-4 mb-lg-0"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="../assets/img/carrusel001.png"
            class="d-block w-100"
            alt="carrusel001"
          />
        </div>
        <div class="carousel-item">
          <img
            src="../assets/img/carrusel002.png"
            class="d-block w-100"
            alt="carrusel002"
          />
        </div>
        <div class="carousel-item">
          <img
            src="../assets/img/carrusel003.png"
            class="d-block w-100"
            alt="carrusel003"
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
      </button>
    </div>
    <!--Cartas destacados-->
    <div class="container-fluid bg-dark text-white p-2 mt-4" id="destacados">
      <h2 class="text-center text-white my-5">Productos Destacados</h2>
      <p class="text-center">
        Descubre nuestra selección de productos destacados, ideales para
        potenciar tu experiencia tecnológica.
      </p>
    </div>
    <div class="row my-5 gx-4 gx-lg-5">
      <div class="col-sm-4 mb-3 mb-sm-0">
        <div class="card">
          <img
            src="../assets/img/001.png"
            class="card-img-top"
            alt="gabinete crystal black"
          />
          <div class="card-body">
            <h5 class="card-title">Gabinete "Crystal Black"</h5>
            <p class="card-text">
              Diseño elegante con panel lateral de vidrio templado, excelente
              flujo de aire y espacio optimizado para configuraciones de alto
              rendimiento.
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-4 mb-3 mb-sm-0">
        <div class="card">
          <img
            src="../assets/img/002.png"
            class="card-img-top"
            alt="audifonos dual blade"
          />
          <div class="card-body">
            <h5 class="card-title">Audífonos "Dual Blade"</h5>
            <p class="card-text">
              Sonido envolvente, micrófono con cancelación de ruido y diseño
              ergonómico para largas sesiones de juego con máxima inmersión.
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-4 mb-3 mb-sm-0">
        <div class="card">
          <img
            src="../assets/img/003.png"
            class="card-img-top"
            alt="teclado gamer kronos"
          />
          <div class="card-body">
            <h5 class="card-title">Teclado Gamer "Kronos"</h5>
            <p class="card-text">
              Formato compacto sin pad numérico, retroiluminación RGB y switches
              mecánicos para precisión y velocidad en cada partida.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Lógica específica para la página de inicio, si la hay
</script>

<style scoped>
/* Estilos específicos para HomePage si es necesario */
</style>
