<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import ProductFilters from '../components/ProductFilters.vue'
import { useProducts } from '../composables/useProducts'

const route = useRoute()
const router = useRouter()
const { filterProducts } = useProducts()
const sortBy = ref('featured')

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
const sortedResults = computed(() => {
  const list = [...results.value]
  if (sortBy.value === 'price-low') return list.sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price-high') return list.sort((a, b) => b.price - a.price)
  if (sortBy.value === 'newest') return list.sort((a, b) => Number(b.condition === 'nuevo') - Number(a.condition === 'nuevo'))
  return list.sort((a, b) => Number(b.featured) - Number(a.featured))
})

const quickFilters = [
  { label: 'Todo', query: {} },
  { label: 'iPhone', query: { category: 'iphone' } },
  { label: 'Ofertas', query: { tags: 'remate,oferta' } },
  { label: 'Seminuevos', query: { condition: 'seminuevo' } },
  { label: 'Accesorios', query: { category: 'accesorios' } }
]

function useQuickFilter(query) {
  applyFilterUpdate(query)
}

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
        <span class="page-kicker">TGMOBILE · EXPLORAR</span><h1>{{ title }}</h1>
        <p>Una selección curada de tecnología para tu próximo upgrade.</p>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="catalog-quick-filters" role="toolbar" aria-label="Filtros rápidos">
          <button v-for="quick in quickFilters" :key="quick.label" type="button" :class="{ active: queriesEqual(queryFromFilters(filters), queryFromFilters(quick.query)) }" @click="useQuickFilter(quick.query)">{{ quick.label }}</button>
        </div>
        <ProductFilters
          :model-value="filters"
          @update:model-value="applyFilterUpdate"
        />
        <div class="catalog-toolbar">
          <div class="results-meta"><span><strong>{{ sortedResults.length }}</strong> producto{{ sortedResults.length === 1 ? '' : 's' }}</span><small>Disponibles para entrega</small></div>
          <label class="sort-control"><span>Ordenar</span><select v-model="sortBy"><option value="featured">Recomendados</option><option value="newest">Más nuevos</option><option value="price-low">Menor precio</option><option value="price-high">Mayor precio</option></select></label>
          <RouterLink class="btn btn-ghost btn-sm" to="/catalogo">Ver todos</RouterLink>
        </div>

        <div v-if="sortedResults.length" class="product-grid catalog-products">
          <ProductCard v-for="p in sortedResults" :key="p.id" :product="p" />
        </div>
        <div v-else class="empty">
          No hay productos con esos filtros. Prueba “Ver todos”.
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.catalog-quick-filters { display: flex; gap: .45rem; overflow-x: auto; padding: .8rem .1rem 1rem; -webkit-overflow-scrolling: touch; scrollbar-width: none; }.catalog-quick-filters::-webkit-scrollbar { display: none; }.catalog-quick-filters button { flex: 0 0 auto; padding: .6rem .9rem; border: 1px solid var(--border); border-radius: 999px; background: rgba(255,255,255,.05); color: var(--text-muted); font-size: .75rem; cursor: pointer; transition: background .25s, color .25s, transform .25s; }.catalog-quick-filters button:hover, .catalog-quick-filters button.active { background: var(--text); color: #17191c; transform: translateY(-2px); }.catalog-toolbar { display: flex; align-items: center; gap: .75rem; margin: 1.2rem 0; padding: .7rem .8rem .7rem 1rem; border: 1px solid var(--border); border-radius: 1rem; background: rgba(255,255,255,.045); }.catalog-toolbar .results-meta { flex: 1; margin: 0; display: grid; gap: .15rem; }.catalog-toolbar .results-meta strong { color: var(--text); }.catalog-toolbar .results-meta small { color: var(--text-dim); font-size: .65rem; }.sort-control { display: flex; align-items: center; gap: .4rem; color: var(--text-dim); font-size: .65rem; }.sort-control select { border: 0; background: transparent; color: var(--text); font-size: .72rem; outline: none; }.sort-control option { background: #22252a; }.catalog-products { animation: catalog-in .55s both; }.page-kicker { display: inline-block; margin-bottom: .75rem; color: var(--warning); font-size: .65rem; font-weight: 800; letter-spacing: .14em; }
@keyframes catalog-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 620px) { .catalog-toolbar { align-items: stretch; flex-wrap: wrap; }.catalog-toolbar .results-meta { flex-basis: 100%; }.sort-control { flex: 1; min-height: 2.5rem; padding: .45rem .6rem; border: 1px solid var(--border); border-radius: .7rem; }.sort-control select { flex: 1; }.catalog-toolbar > .btn { flex: 1; } }
</style>
