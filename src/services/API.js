// Simulación de API REST para productos
const products = [
  {
    id: 1,
    name: "Smartphone Samsung Galaxy",
    price: 299.99,
    description: "Smartphone con pantalla de 6.5 pulgadas",
    image: "/assets/img/001.png",
    category: "Electronics",
    stock: 10
  },
  {
    id: 2,
    name: "Laptop Dell Inspiron",
    price: 799.99,
    description: "Laptop con procesador Intel i5 y 8GB RAM",
    image: "/assets/img/002.png",
    category: "Electronics",
    stock: 5
  },
  {
    id: 3,
    name: "Auriculares Bluetooth",
    price: 59.99,
    description: "Auriculares inalámbricos con cancelación de ruido",
    image: "/assets/img/003.png",
    category: "Electronics",
    stock: 15
  },
  {
    id: 4,
    name: "Camiseta Deportiva",
    price: 24.99,
    description: "Camiseta transpirable para deportes",
    image: "/assets/img/004.webp",
    category: "Clothing",
    stock: 20
  },
  {
    id: 5,
    name: "Zapatillas Running",
    price: 89.99,
    description: "Zapatillas cómodas para correr",
    image: "/assets/img/005.webp",
    category: "Clothing",
    stock: 8
  },
  {
    id: 6,
    name: "Reloj Inteligente",
    price: 199.99,
    description: "Smartwatch con monitor de actividad",
    image: "/assets/img/006.jpg",
    category: "Electronics",
    stock: 12
  }
];

export const Products = {
  /**
   * Obtiene todos los productos
   * @returns {Promise<Array>} Promesa que resuelve a un array de productos
   */
  all() {
    return new Promise((resolve) => {
      // Simula latencia de red
      setTimeout(() => {
        resolve([...products]);
      }, 500);
    });
  },

  /**
   * Busca productos por nombre
   * @param {string} query - Término de búsqueda
   * @returns {Promise<Array>} Promesa que resuelve a productos filtrados
   */
  search(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = products.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 300);
    });
  },

  /**
   * Obtiene un producto por ID
   * @param {number} id - ID del producto
   * @returns {Promise<Object|null>} Promesa que resuelve al producto encontrado
   */
  getById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = products.find(p => p.id === id);
        resolve(product || null);
      }, 200);
    });
  }
};