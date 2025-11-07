import { createStore } from 'vuex'

export default createStore({
  state: {
    productos: [
      { codigo: '0001', nombre: 'Audifonos', stock: 100, precio: 30000, color: 'blue', destacado: true },
      { codigo: '0002', nombre: 'Televisor', stock: 500, precio: 10000, color: 'red', destacado: false },
      { codigo: '0003', nombre: 'Telefono', stock: 200, precio: 20000, color: 'red', destacado: false },
      { codigo: '0004', nombre: 'Reloj', stock: 300, precio: 40000, color: 'red', destacado: true }
    ],
    filtroTexto: ''
  },
  getters: {
    // Devuelve todos los productos (sin filtrar)
    allProducts(state) {
      return state.productos
    },
    // Cantidad de productos individuales registrados
    productCount(state) {
      return state.productos.length
    },
    // Suma total del stock de todos los productos
    totalStock(state) {
      return state.productos.reduce((sum, p) => sum + Number(p.stock), 0)
    },
    // Filtra por nombre (case-insensitive)
    filteredProducts: (state) => (search) => {
      const q = (search ?? state.filtroTexto).toString().trim().toLowerCase()
      if (!q) return state.productos
      return state.productos.filter(p => p.nombre.toString().toLowerCase().includes(q))
    }
    ,
    // Productos destacados
    featuredProducts(state) {
      return state.productos.filter(p => !!p.destacado)
    }
  },
  mutations: {
    setFiltro(state, texto) {
      state.filtroTexto = texto
    },
    addProduct(state, producto) {
      state.productos.push(producto)
    }
  },
  actions: {
    setFiltro({ commit }, texto) {
      commit('setFiltro', texto)
    },
    addProduct({ commit }, producto) {
      commit('addProduct', producto)
    }
  }
})
