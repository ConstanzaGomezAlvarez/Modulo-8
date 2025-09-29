// Simulación de API REST para productos
const products = [
  {
    id: 1,
    name: "Gabinete Crystal Black RGB E-ATX Vidrio Templado USB 3.0",
    description: "Diseño elegante con panel lateral de vidrio templado, excelente flujo de aire y espacio optimizado para configuraciones de alto rendimiento.",
    price: 49990,
    category: "Gabinetes",
    stock: 30,
    image: "assets/img/001.png"
  },
  {
    id: 2,
    name: "Audífonos Dual Blade 7.1 USB RGB",
    description: "Sonido envolvente, micrófono con cancelación de ruido y diseño ergonómico para largas sesiones de juego con máxima inmersión.",
    price: 29990,
    category: "Audio",
    stock: 0,
    image: "assets/img/002.png"
  },
  {
    id: 3,
    name: "Teclado Gamer TKL Kronos RGB Mecánico",
    description: "Formato compacto sin pad numérico, retroiluminación RGB y switches mecánicos para precisión y velocidad en cada partida.",
    price: 19990,
    category: "Accesorios",
    stock: 4,
    image: "assets/img/003.png"
  }
  ,
  {
    id: 4,
    name: "Silla Gamer Argo 180°",
    description: "Elección perfecta para gamers, streamers y profesionales que buscan ergonomía y estilo. Con materiales premium y ajustes avanzados, esta silla te brindará soporte durante largas horas de uso.",
    price: 129990,
    category: "Mobiliario",
    stock: 4,
    image: "assets/img/004.webp"
  },
  {
    id: 5,
    name: "Escritorio Mesa Gamer Griffin",
    description: "Está diseñado para gamers y profesionales que exigen resistencia, espacio inteligente y un estilo agresivo. Con un tablero de 120cm x 60cm y 75cm de altura, ofrece el equilibrio perfecto entre amplitud y ergonomía.",
    price: 69990,
    category: "Mobiliario",
    stock: 5,
    image: "assets/img/005.webp"
  },
  {
    id: 6,
    name: "Micrófono Profesional Mistral",
    description: "Captura de voz nítida con condensador de alta sensibilidad, iluminación RGB personalizable y diseño ideal para streaming, podcasting o gaming.",
    price: 39990,
    category: "Audio",
    stock: 32,
    image: "assets/img/006.jpg"
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