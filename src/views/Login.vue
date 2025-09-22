<template>
  <div class="login-page">
    <div class="container-fluid">
      <div class="row min-vh-100">
        <!-- Sección izquierda - Información -->
        <div class="col-lg-6 bg-primary d-flex align-items-center justify-content-center">
          <div class="text-white text-center p-4">
            <i class="bi bi-shop display-1 mb-4"></i>
            <h1 class="display-4 fw-bold mb-3">Mi Tienda</h1>
            <p class="lead mb-4">
              Accede a tu cuenta para disfrutar de una experiencia de compra personalizada
            </p>
            <div class="features-list text-start">
              <div class="feature-item d-flex align-items-center mb-3">
                <i class="bi bi-check-circle-fill me-3 fs-4"></i>
                <span>Historial de compras</span>
              </div>
              <div class="feature-item d-flex align-items-center mb-3">
                <i class="bi bi-check-circle-fill me-3 fs-4"></i>
                <span>Ofertas exclusivas</span>
              </div>
              <div class="feature-item d-flex align-items-center mb-3">
                <i class="bi bi-check-circle-fill me-3 fs-4"></i>
                <span>Seguimiento de pedidos</span>
              </div>
              <div class="feature-item d-flex align-items-center">
                <i class="bi bi-check-circle-fill me-3 fs-4"></i>
                <span>Soporte prioritario</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección derecha - Formulario de login -->
        <div class="col-lg-6 d-flex align-items-center justify-content-center">
          <div class="login-form-container p-4 w-100" style="max-width: 400px;">
            <!-- Header del formulario -->
            <div class="text-center mb-4">
              <h2 class="fw-bold mb-2">Iniciar Sesión</h2>
              <p class="text-muted">Ingresa tus credenciales para continuar</p>
            </div>

            <!-- Alertas -->
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              <i class="bi bi-exclamation-triangle"></i>
              {{ errorMessage }}
            </div>

            <div v-if="successMessage" class="alert alert-success" role="alert">
              <i class="bi bi-check-circle"></i>
              {{ successMessage }}
            </div>

            <!-- Formulario -->
            <form @submit.prevent="handleLogin" novalidate>
              <!-- Email -->
              <div class="mb-3">
                <label for="email" class="form-label">
                  <i class="bi bi-envelope"></i>
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': emailError }"
                  id="email"
                  v-model="form.email"
                  @blur="validateEmail"
                  @input="clearEmailError"
                  placeholder="usuario1@mitienda.com"
                  required
                  autocomplete="email"
                />
                <div v-if="emailError" class="invalid-feedback">
                  {{ emailError }}
                </div>
              </div>

              <!-- Password -->
              <div class="mb-3">
                <label for="password" class="form-label">
                  <i class="bi bi-lock"></i>
                  Contraseña
                </label>
                <div class="input-group">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control"
                    :class="{ 'is-invalid': passwordError }"
                    id="password"
                    v-model="form.password"
                    @blur="validatePassword"
                    @input="clearPasswordError"
                    placeholder="password"
                    required
                    autocomplete="current-password"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="togglePasswordVisibility"
                  >
                    <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                  </button>
                </div>
                <div v-if="passwordError" class="invalid-feedback">
                  {{ passwordError }}
                </div>
              </div>

              <!-- Remember me -->
              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="rememberMe"
                  v-model="form.rememberMe"
                />
                <label class="form-check-label" for="rememberMe">
                  Recordar mi sesión
                </label>
              </div>

              <!-- Botón de submit -->
              <div class="d-grid mb-3">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg"
                  :disabled="loading || !isFormValid"
                >
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  <i v-else class="bi bi-box-arrow-in-right me-2"></i>
                  {{ loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
                </button>
              </div>
            </form>

            <!-- Credenciales de prueba -->
            <div class="alert alert-info">
              <h6 class="alert-heading">
                <i class="bi bi-info-circle"></i>
                Credenciales de prueba:
              </h6>
              <p class="mb-1"><strong>Email:</strong> usuario1@mitienda.com</p>
              <p class="mb-0"><strong>Contraseña:</strong> password</p>
            </div>

            <!-- Enlaces adicionales -->
            <div class="text-center">
              <p class="text-muted">
                ¿No tienes cuenta? 
                <a href="#" class="text-primary text-decoration-none">Regístrate aquí</a>
              </p>
              <p class="text-muted">
                <a href="#" class="text-primary text-decoration-none">¿Olvidaste tu contraseña?</a>
              </p>
            </div>

            <!-- Botón para volver -->
            <div class="text-center mt-4">
              <router-link to="/" class="btn btn-outline-secondary">
                <i class="bi bi-arrow-left"></i>
                Volver a la tienda
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth } from '../services/Auth.js';

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        email: '',
        password: '',
        rememberMe: false
      },
      loading: false,
      errorMessage: '',
      successMessage: '',
      emailError: '',
      passwordError: '',
      showPassword: false
    };
  },
  computed: {
    isFormValid() {
      return this.form.email && 
             this.form.password && 
             !this.emailError && 
             !this.passwordError;
    }
  },
  async mounted() {
    // Verificar si ya está logueado
    try {
      const user = await Auth.getCurrentUser();
      if (user) {
        this.$router.push('/');
      }
    } catch (error) {
      // No hacer nada si no está logueado
    }
  },
  methods: {
    async handleLogin() {
      if (!this.isFormValid) {
        this.validateForm();
        return;
      }

      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      try {
        const user = await Auth.login({
          email: this.form.email,
          password: this.form.password
        });

        this.successMessage = `¡Bienvenido, ${user.name}!`;
        
        // Emitir evento al componente padre
        this.$emit('user-logged-in', user);

        // Esperar un momento para mostrar el mensaje de éxito
        setTimeout(() => {
          // Redirigir al home o a la página anterior
          const redirectTo = this.$route.query.redirect || '/';
          this.$router.push(redirectTo);
        }, 1500);

      } catch (error) {
        this.errorMessage = error.message || 'Error al iniciar sesión';
        
        // Limpiar el formulario en caso de error
        this.form.password = '';
        
        // Focus al campo de email después de un error
        setTimeout(() => {
          document.getElementById('email').focus();
        }, 100);
      } finally {
        this.loading = false;
      }
    },

    validateForm() {
      this.validateEmail();
      this.validatePassword();
    },

    validateEmail() {
      if (!this.form.email) {
        this.emailError = 'El email es requerido';
      } else if (!this.isValidEmail(this.form.email)) {
        this.emailError = 'Ingresa un email válido';
      } else {
        this.emailError = '';
      }
    },

    validatePassword() {
      if (!this.form.password) {
        this.passwordError = 'La contraseña es requerida';
      } else if (this.form.password.length < 3) {
        this.passwordError = 'La contraseña debe tener al menos 3 caracteres';
      } else {
        this.passwordError = '';
      }
    },

    clearEmailError() {
      if (this.emailError) {
        this.emailError = '';
      }
    },

    clearPasswordError() {
      if (this.passwordError) {
        this.passwordError = '';
      }
    },

    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
  }
};
</script>

<style scoped>
.login-page {
  background-color: #f8f9fa;
}

.bg-primary {
  background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%) !important;
}

.login-form-container {
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.feature-item {
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.feature-item:hover {
  opacity: 1;
}

.form-control {
  border-radius: 8px;
  border: 1px solid #ced4da;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.btn {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-primary {
  background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
  border: none;
}

.alert {
  border-radius: 8px;
  border: none;
}

.alert-info {
  background-color: #e7f3ff;
  color: #0c63e4;
  border-left: 4px solid #0d6efd;
}

/* Animaciones */
.login-form-container {
  animation: slideInRight 0.6s ease-out;
}

.bg-primary > div {
  animation: slideInLeft 0.6s ease-out;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive */
@media (max-width: 991.98px) {
  .col-lg-6:first-child {
    display: none;
  }
  
  .min-vh-100 {
    min-height: 100vh;
  }
  
  .login-form-container {
    margin: 2rem 1rem;
  }
}

@media (max-width: 576px) {
  .login-form-container {
    margin: 1rem 0.5rem;
    padding: 1.5rem !important;
  }
  
  .display-4 {
    font-size: 2rem;
  }
}

/* Estados del formulario */
.form-control.is-invalid {
  border-color: #dc3545;
  background-image: none;
}

.form-control.is-invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

/* Mejoras de accesibilidad */
.btn:focus,
.form-control:focus,
.form-check-input:focus {
  outline: none;
}

/* Loading state */
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Efectos hover para enlaces */
a {
  transition: color 0.3s ease;
}

a:hover {
  color: #0a58ca !important;
}
</style>