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
  { label: 'Android', query: { category: 'otras-marcas' } },
  { label: 'Ofertas', query: { tags: 'remate,oferta' } },
  { label: 'Seminuevos', query: { condition: 'seminuevo' } },
  { label: 'iPad', query: { category: 'ipad' } },
  { label: 'MacBook', query: { category: 'macbook' } },
  { label: 'Accesorios', query: { category: 'accesorios' } }
]

function useQuickFilter(query) {
  // Keep search text when switching chips
  applyFilterUpdate({ ...query, q: filters.q })
}

function isQuickActive(query) {
  const current = {
    category: filters.category,
    brand: filters.brand,
    condition: filters.condition,
    tags: filters.tags,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice
  }
  return queriesEqual(queryFromFilters(current), queryFromFilters(query))
}

const title = computed(() => {
  if (filters.tags) return 'Ofertas y remates'
  if (filters.category === 'iphone') return 'iPhone'
  if (filters.category === 'otras-marcas') return 'Android y más'
  if (filters.category === 'usados-seminuevos') return 'Usados y seminuevos'
  if (filters.category === 'ipad') return 'iPad'
  if (filters.category === 'macbook') return 'MacBook'
  if (filters.category === 'accesorios') return 'Accesorios'
  if (filters.condition === 'seminuevo') return 'Seminuevos'
  if (filters.q) return `Resultados para “${filters.q}”`
  return 'Catálogo'
})
</script>

<template>
  <div class="catalog-page">
    <section class="page-hero catalog-hero">
      <div class="container">
        <span class="page-kicker">TGMOBILE · EXPLORAR</span>
        <h1>{{ title }}</h1>
        <p>Selección curada. Filtra por categoría o busca lo que necesitas.</p>
      </div>
    </section>

    <section class="section catalog-body">
      <div class="container">
        <!-- Quick chips -->
        <div class="catalog-chips" role="toolbar" aria-label="Filtros rápidos">
          <button
            v-for="quick in quickFilters"
            :key="quick.label"
            type="button"
            :class="{ active: isQuickActive(quick.query) }"
            @click="useQuickFilter(quick.query)"
          >{{ quick.label }}</button>
        </div>

        <!-- Search + collapsible filters -->
        <ProductFilters
          :model-value="filters"
          @update:model-value="applyFilterUpdate"
        />

        <!-- Toolbar -->
        <div class="catalog-toolbar">
          <div class="results-meta">
            <strong>{{ sortedResults.length }}</strong>
            <span>producto{{ sortedResults.length === 1 ? '' : 's' }}</span>
          </div>
          <label class="sort-control">
            <span class="sort-label">Ordenar</span>
            <select v-model="sortBy">
              <option value="featured">Recomendados</option>
              <option value="newest">Más nuevos</option>
              <option value="price-low">Menor precio</option>
              <option value="price-high">Mayor precio</option>
            </select>
          </label>
        </div>

        <div v-if="sortedResults.length" class="product-grid catalog-products">
          <ProductCard v-for="p in sortedResults" :key="p.id" :product="p" />
        </div>
        <div v-else class="empty catalog-empty">
          <p>No hay productos con esos filtros.</p>
          <button type="button" class="btn btn-ghost btn-sm" @click="useQuickFilter({})">Ver todo el catálogo</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.catalog-hero {
  padding-bottom: 1.25rem;
}
.page-kicker {
  display: inline-block;
  margin-bottom: 0.6rem;
  color: var(--warning);
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.14em;
}
.catalog-body {
  padding-top: 0.75rem;
}

.catalog-chips {
  display: flex;
  gap: 0.4rem;
  overflow-x: auto;
  padding: 0.15rem 0.05rem 0.85rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  margin-bottom: 0.15rem;
}
.catalog-chips::-webkit-scrollbar {
  display: none;
}
.catalog-chips button {
  flex: 0 0 auto;
  padding: 0.55rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
}
.catalog-chips button:hover {
  color: var(--text);
  border-color: #6b7280;
}
.catalog-chips button.active {
  background: #f2f3f5;
  color: #17191c;
  border-color: #f2f3f5;
  transform: translateY(-1px);
}

.catalog-toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0.85rem 0 1.1rem;
  padding: 0.55rem 0.15rem;
}
.results-meta {
  flex: 1;
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  color: var(--text-muted);
  font-size: 0.85rem;
}
.results-meta strong {
  color: var(--text);
  font-size: 1.05rem;
}
.sort-control {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-dim);
  font-size: 0.7rem;
}
.sort-label {
  display: none;
}
@media (min-width: 480px) {
  .sort-label {
    display: inline;
  }
}
.sort-control select {
  border: 0;
  background: transparent;
  color: var(--text);
  font-size: 0.78rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
}
.sort-control option {
  background: #22252a;
}

.catalog-products {
  animation: catalog-in 0.5s both;
}
.catalog-empty {
  display: grid;
  gap: 1rem;
  justify-items: center;
}
@keyframes catalog-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
