import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AddProductForm from '../src/components/AddProductForm.vue'
import store from '../src/store/index.js'

describe('AddProductForm integration', () => {
  let pushMock

  beforeEach(() => {
    // reset store to initial seed
    store.state.productos = JSON.parse(JSON.stringify(store.state.productos))
    store.state.filtroTexto = ''
    pushMock = vi.fn()
  })

  it('shows error when adding a product with an existing code', async () => {
    const existingCode = store.state.productos[0].codigo
    const wrapper = mount(AddProductForm, {
      global: {
        plugins: [store],
        mocks: {
          $router: { push: pushMock }
        }
      }
    })

    // set form data directly
    await wrapper.setData({ producto: { codigo: existingCode, nombre: 'Test duplicado', stock: 1, precio: 10, color: '', destacado: false } })

    await wrapper.find('form').trigger('submit.prevent')

    // Debe mostrar mensaje de error y no hacer push
    expect(wrapper.text()).toContain('ya existe')
    expect(pushMock).not.toHaveBeenCalled()
  })

  it('adds a new product and navigates on success', async () => {
    const newCode = 'INT-123'
    // ensure it doesn't exist
    if (store.getters.hasProductCode(newCode)) {
      // remove if somehow exists
      store.state.productos = store.state.productos.filter(p => p.codigo !== newCode)
    }

    const wrapper = mount(AddProductForm, {
      global: {
        plugins: [store],
        mocks: {
          $router: { push: pushMock }
        }
      }
    })

    await wrapper.setData({ producto: { codigo: newCode, nombre: 'Producto Integra', stock: 2, precio: 50, color: '', destacado: false } })

    const before = store.getters.productCount
    await wrapper.find('form').trigger('submit.prevent')

    expect(store.getters.hasProductCode(newCode)).toBe(true)
    expect(store.getters.productCount).toBe(before + 1)
    expect(pushMock).toHaveBeenCalledWith({ name: 'StoreProducts' })
  })
})
