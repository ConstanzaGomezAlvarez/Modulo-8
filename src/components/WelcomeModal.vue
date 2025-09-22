<template>
  <div id="modalCliente" class="custom-modal">
    <div class="modal-content">
      <h2>Bienvenido</h2>
      <p>Por favor, ingrese su nombre y apellido</p>
      <input
        type="text"
        id="inputNombre"
        placeholder="Nombre"
        v-model="nombre"
      />
      <input
        type="text"
        id="inputApellido"
        placeholder="Apellido"
        v-model="apellido"
      />
      <button id="btnGuardarCliente" @click="guardarCliente">Guardar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const nombre = ref("");
const apellido = ref("");

const guardarCliente = () => {
  if (!nombre.value.trim() || !apellido.value.trim()) {
    alert("Por favor complete ambos campos");
    return;
  }
  localStorage.setItem("nombre", nombre.value);
  localStorage.setItem("apellido", apellido.value);
  // Aquí podrías emitir un evento o usar Pinia para notificar a otros componentes
  // Por ahora, simplemente recargamos para simular el comportamiento original
  window.location.reload();
};

onMounted(() => {
  const nombreGuardado = localStorage.getItem("nombre");
  const apellidoGuardado = localStorage.getItem("apellido");
  if (nombreGuardado && apellidoGuardado) {
    // Si ya existe, podemos ocultar el modal o redirigir
    // Por ahora, no lo mostramos si ya hay datos
    const modalElement = document.getElementById("modalCliente");
    if (modalElement) {
      modalElement.style.display = "none"; // Ocultar si ya está logueado
    }
  }
});
</script>

<style scoped>
/* Estilos del modal (pueden necesitar ajustes para ser un modal de Bootstrap real) */
.modal {
  display: flex; /* Oculto por defecto */
  position: fixed; /* Permanece en su lugar */
  z-index: 1; /* Se superpone a todo */
  left: 0;
  top: 0;
  width: 100%; /* Ancho completo */
  height: 100%; /* Alto completo */
  overflow: auto; /* Habilitar scroll si es necesario */
  background-color: rgba(0, 0, 0, 0.4); /* Fondo oscuro */
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #fefefe;
  margin: auto; /* Centrar vertical y horizontalmente */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Podría ser responsive */
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

input {
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
