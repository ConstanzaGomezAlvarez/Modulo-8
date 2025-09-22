// Simulación de API REST para autenticación
const validCredentials = {
  email: "usuario1@mitienda.com",
  password: "password"
};

const userProfile = {
  id: 1,
  name: "Usuario Demo",
  email: "usuario1@mitienda.com",
  role: "customer",
  avatar: "/assets/img/user-avatar.png"
};

export const Auth = {
  /**
   * Simula el login del usuario
   * @param {Object} credentials - Credenciales del usuario
   * @param {string} credentials.email - Email del usuario
   * @param {string} credentials.password - Contraseña del usuario
   * @returns {Promise<Object>} Promesa que resuelve a un objeto User o lanza error
   */
  login(credentials) {
    return new Promise((resolve, reject) => {
      // Simula latencia de red
      setTimeout(() => {
        if (!credentials || !credentials.email || !credentials.password) {
          reject(new Error("Email y contraseña son requeridos"));
          return;
        }

        if (
          credentials.email === validCredentials.email &&
          credentials.password === validCredentials.password
        ) {
          // Login exitoso
          const user = {
            ...userProfile,
            token: this.generateToken(),
            loginTime: new Date().toISOString()
          };
          
          // Simular almacenamiento del token
          localStorage.setItem("auth_token", user.token);
          localStorage.setItem("user_data", JSON.stringify(user));
          
          resolve(user);
        } else {
          reject(new Error("Credenciales inválidas"));
        }
      }, 1000);
    });
  },

  /**
   * Simula el logout del usuario
   * @returns {Promise<boolean>} Promesa que resuelve cuando el logout es exitoso
   */
  logout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
        resolve(true);
      }, 200);
    });
  },

  /**
   * Verifica si el usuario está autenticado
   * @returns {Promise<Object|null>} Promesa que resuelve al usuario autenticado o null
   */
  getCurrentUser() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const token = localStorage.getItem("auth_token");
        const userData = localStorage.getItem("user_data");
        
        if (token && userData) {
          try {
            const user = JSON.parse(userData);
            resolve(user);
          } catch (error) {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      }, 100);
    });
  },

  /**
   * Genera un token simulado
   * @returns {string} Token simulado
   */
  generateToken() {
    return btoa(Math.random().toString(36).substring(2) + Date.now().toString(36));
  },

  /**
   * Verifica si un token es válido
   * @param {string} token - Token a verificar
   * @returns {boolean} True si el token es válido
   */
  isValidToken(token) {
    const storedToken = localStorage.getItem("auth_token");
    return token === storedToken;
  }
};