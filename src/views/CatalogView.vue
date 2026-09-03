<script setup>
import { computed, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import ProductFilters from '../components/ProductFilters.vue'
import { useProducts } from '../composables/useProducts'

const route = useRoute()
const router = useRouter()
const { filterProducts } = useProducts()

const EMPTY_FILTERS = {
  q: '',
  category: '',
  brand: '',
  condition: '',
  minPrice: '',
  maxPrice: '',
  tags: ''
}

const filters = reactive({
  ...EMPTY_FILTERS,
  q: route.query.q || '',
  category: route.query.category || '',
  brand: route.query.brand || '',
  condition: route.query.condition || '',
  minPrice: route.query.minPrice || '',
  maxPrice: route.query.maxPrice || '',
  tags: route.query.tags || ''
})

function queryFromFilters(f) {
  const query = {}
  Object.entries(f).forEach(([k, v]) => {
    if (v !== '' && v != null) query[k] = String(v)
  })
  return query
}

function queriesEqual(a, b) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)])
  for (const k of keys) {
    if (String(a[k] ?? '') !== String(b[k] ?? '')) return false
  }
  return true
}

function syncFiltersFromQuery(q) {
  Object.assign(filters, EMPTY_FILTERS, {
    q: q.q || '',
    category: q.category || '',
    brand: q.brand || '',
    condition: q.condition || '',
    minPrice: q.minPrice || '',
    maxPrice: q.maxPrice || '',
    tags: q.tags || ''
  })
}

/** Mutate the same reactive object — do not reassign it. */
function applyFilterUpdate(next = {}) {
  Object.assign(filters, EMPTY_FILTERS, {
    q: next.q || '',
    category: next.category || '',
    brand: next.brand || '',
    condition: next.condition || '',
    minPrice: next.minPrice || '',
    maxPrice: next.maxPrice || '',
    tags: next.tags || ''
  })
}

watch(
  () => route.query,
  (q) => {
    const fromRoute = queryFromFilters({
      q: q.q || '',
      category: q.category || '',
      brand: q.brand || '',
      condition: q.condition || '',
      minPrice: q.minPrice || '',
      maxPrice: q.maxPrice || '',
      tags: q.tags || ''
    })
    if (queriesEqual(fromRoute, queryFromFilters(filters))) return
    syncFiltersFromQuery(q)
  }
)

watch(
  filters,
  (f) => {
    const query = queryFromFilters(f)
    if (queriesEqual(query, route.query)) return
    router.replace({ query })
  },
  { deep: true }
)

const results = computed(() => filterProducts({ ...filters }))

const title = computed(() => {
  if (filters.tags) return 'Ofertas / Remates'
  if (filters.category === 'iphone') return 'iPhone'
  if (filters.category === 'otras-marcas') return 'Otras marcas'
  if (filters.category === 'usados-seminuevos') return 'Usados / Seminuevos'
  if (filters.category === 'ipad') return 'iPad'
  if (filters.category === 'macbook') return 'MacBook'
  if (filters.category === 'accesorios') return 'Accesorios'
  return 'Catálogo completo'
})
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <h1>{{ title }}</h1>
        <p>Busca y filtra. Al agregar o quitar entradas en <code>src/data/products.json</code>, el catálogo se actualiza solo.</p>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <ProductFilters
          :model-value="filters"
          @update:model-value="applyFilterUpdate"
        />
        <div class="results-meta">
          <span>{{ results.length }} producto{{ results.length === 1 ? '' : 's' }}</span>
          <RouterLink class="btn btn-ghost btn-sm" to="/catalogo">Ver todos</RouterLink>
        </div>

        <div v-if="results.length" class="product-grid">
          <ProductCard v-for="p in results" :key="p.id" :product="p" />
        </div>
        <div v-else class="empty">
          No hay productos con esos filtros. Prueba “Ver todos”.
        </div>
      </div>
    </section>
  </div>
</template>
