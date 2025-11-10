import { describe, it, expect, beforeEach } from 'vitest'
import storeInstance from '../src/store/index.js'

describe('Vuex store basic getters and actions', () => {
  let store
  const initialProducts = JSON.parse(JSON.stringify(storeInstance.state.productos))

  beforeEach(() => {
    // reutilizamos la instancia importada pero reseteamos el estado a la semilla
    store = storeInstance
    store.state.productos = JSON.parse(JSON.stringify(initialProducts))
    store.state.filtroTexto = ''
  })

  it('productCount getter returns initial count', () => {
    const count = store.getters.productCount
    expect(count).toBeDefined()
    expect(count).toBe(store.state.productos.length)
  })

  it('totalStock sums stock correctly', () => {
    const total = store.getters.totalStock
    const manual = store.state.productos.reduce((s, p) => s + Number(p.stock), 0)
    expect(total).toBe(manual)
  })

  it('filteredProducts filters by name (case-insensitive)', () => {
    const result = store.getters.filteredProducts('tele')
    expect(Array.isArray(result)).toBe(true)
    // debe incluir Televisor
    expect(result.some(p => p.nombre.toLowerCase().includes('tele'))).toBe(true)
  })

  it('hasProductCode returns true for existing code and false otherwise', () => {
    const existing = store.state.productos[0].codigo
    expect(store.getters.hasProductCode(existing)).toBe(true)
    expect(store.getters.hasProductCode('___NO_EXISTE___')).toBe(false)
  })

  it('addProduct action adds a new product', () => {
    const before = store.getters.productCount
    const newProd = { codigo: 'TEST-99', nombre: 'Prueba', stock: 1, precio: 10, color: 'green', destacado: false }
    store.dispatch('addProduct', newProd)
    const after = store.getters.productCount
    expect(after).toBe(before + 1)
    expect(store.getters.hasProductCode('TEST-99')).toBe(true)
  })
})
