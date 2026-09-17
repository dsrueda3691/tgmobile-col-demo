import { computed, ref } from 'vue'

const items = ref([])
const lastAdded = ref(null)
const isOpen = ref(false)
let clearNoticeTimer

export function useCart() {
  const count = computed(() => items.value.reduce((total, item) => total + item.quantity, 0))
  const total = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

  function add(product) {
    const existing = items.value.find((item) => item.id === product.id)
    if (existing) existing.quantity += 1
    else items.value.push({ ...product, quantity: 1 })
    lastAdded.value = product
    window.clearTimeout(clearNoticeTimer)
    clearNoticeTimer = window.setTimeout(() => { lastAdded.value = null }, 2600)
  }

  function remove(productId) {
    items.value = items.value.filter((item) => item.id !== productId)
  }

  function open() { isOpen.value = true }
  function close() { isOpen.value = false }
  function toggle() { isOpen.value = !isOpen.value }

  return { items, count, total, lastAdded, isOpen, add, remove, open, close, toggle }
}
