import { computed } from 'vue'
import productsData from '../data/products.json'
import campaignsData from '../data/campaigns.json'

const products = productsData
const campaign = campaignsData

export const CATEGORIES = [
  { id: 'ofertas', label: 'Ofertas / Remates', query: { tags: 'remate,oferta' }, icon: '🔥' },
  { id: 'iphone', label: 'iPhone', query: { category: 'iphone' }, icon: '📱' },
  { id: 'otras-marcas', label: 'Otras marcas', query: { category: 'otras-marcas' }, icon: '✨' },
  { id: 'usados-seminuevos', label: 'Usados / Seminuevos', query: { category: 'usados-seminuevos' }, icon: '♻️' },
  { id: 'ipad', label: 'iPad', query: { category: 'ipad' }, icon: '📲' },
  { id: 'macbook', label: 'MacBook', query: { category: 'macbook' }, icon: '💻' },
  { id: 'accesorios', label: 'Accesorios', query: { category: 'accesorios' }, icon: '🎧' }
]

export function useProducts() {
  const all = computed(() => products)

  const brands = computed(() =>
    [...new Set(products.map((p) => p.brand))].sort()
  )

  const featured = computed(() => products.filter((p) => p.featured && p.inStock))

  const remates = computed(() =>
    products.filter(
      (p) =>
        p.inStock &&
        (p.season === campaign.season ||
          (p.tags || []).includes('remate') ||
          (p.tags || []).includes('oferta'))
    )
  )

  const dailyDeals = computed(() => {
    const ids = campaign.dailyDeals || []
    const dealTags = ['oferta-dia', 'oferta-mes', 'remate']
    const byId = ids.map((id) => products.find((p) => p.id === id)).filter((p) => p && p.inStock)
    if (byId.length) return byId
    return products.filter(
      (p) => p.inStock && (p.tags || []).some((t) => dealTags.includes(t))
    )
  })

  function getById(id) {
    return products.find((p) => p.id === id)
  }

  function filterProducts(filters = {}) {
    let list = [...products]

    if (filters.q) {
      const q = String(filters.q).toLowerCase().trim()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(q))
      )
    }

    if (filters.category) {
      const cats = String(filters.category).split(',').map((c) => c.trim()).filter(Boolean)
      if (cats.length) {
        list = list.filter((p) => {
          if (cats.includes(p.category)) return true
          // usados-seminuevos also matches condition
          if (cats.includes('usados-seminuevos') && ['usado', 'seminuevo'].includes(p.condition)) return true
          return false
        })
      }
    }

    if (filters.brand) {
      const brandsF = String(filters.brand).split(',').map((b) => b.trim()).filter(Boolean)
      if (brandsF.length) list = list.filter((p) => brandsF.includes(p.brand))
    }

    if (filters.condition) {
      const conds = String(filters.condition).split(',').map((c) => c.trim()).filter(Boolean)
      if (conds.length) list = list.filter((p) => conds.includes(p.condition))
    }

    if (filters.tags) {
      const tags = String(filters.tags).split(',').map((t) => t.trim()).filter(Boolean)
      if (tags.length) {
        list = list.filter(
          (p) =>
            tags.some((t) => (p.tags || []).includes(t)) ||
            (tags.includes('remate') && p.season === 'remate') ||
            (tags.includes('featured') && p.featured)
        )
      }
    }

    if (filters.minPrice != null && filters.minPrice !== '') {
      list = list.filter((p) => p.price >= Number(filters.minPrice))
    }
    if (filters.maxPrice != null && filters.maxPrice !== '') {
      list = list.filter((p) => p.price <= Number(filters.maxPrice))
    }

    if (filters.inStock === true || filters.inStock === 'true') {
      list = list.filter((p) => p.inStock)
    }

    return list
  }

  return {
    all,
    brands,
    featured,
    remates,
    dailyDeals,
    campaign,
    getById,
    filterProducts,
    categories: CATEGORIES
  }
}

export function formatCOP(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(value)
}

export function whatsappLink(phone, text) {
  const msg = encodeURIComponent(text)
  return `https://wa.me/${phone}?text=${msg}`
}

export const WHATSAPP = {
  ventas: '573242372232',
  mayoreo: '573246676835',
  postventa: '573005131340'
}

export function productSalesMessage(product) {
  const parts = [
    product.name,
    product.brand ? `Marca: ${product.brand}` : null,
    product.condition ? `Condición: ${product.condition}` : null,
    product.storage ? `Almacenamiento: ${product.storage}` : null,
    `Precio: ${formatCOP(product.price)}`
  ].filter(Boolean)

  return [
    'Hola TGMOBILE COL, quiero comprar este producto:',
    '',
    ...parts.map((p, i) => (i === 0 ? `• ${p}` : `• ${p}`)),
    '',
    '¿Está disponible? Gracias.'
  ].join('\n')
}

export function productSalesWhatsApp(product) {
  return whatsappLink(WHATSAPP.ventas, productSalesMessage(product))
}
