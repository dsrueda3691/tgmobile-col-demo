<script setup>
import { computed } from 'vue'
import { useProducts } from '../composables/useProducts'

const { categories, filterProducts } = useProducts()

const items = computed(() =>
  categories.map((c) => ({
    ...c,
    count: filterProducts(c.query).length
  }))
)
</script>

<template>
  <div class="category-grid">
    <RouterLink
      v-for="c in items"
      :key="c.id"
      class="cat-card"
      :to="{ path: '/catalogo', query: c.query }"
    >
      <div>
        <div class="icon">{{ c.icon }}</div>
        <h3>{{ c.label }}</h3>
      </div>
      <span>{{ c.count }} productos</span>
    </RouterLink>
  </div>
</template>

<style scoped>
.category-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .85rem; }.cat-card { display: flex; min-height: 120px; flex-direction: column; justify-content: space-between; padding: 1.25rem; border: 1px solid var(--border); border-radius: var(--radius); background: var(--grad-surface); box-shadow: var(--shadow-soft); transition: transform .25s, border-color .25s, background .25s, box-shadow .25s; }.cat-card:hover { transform: translateY(-3px); border-color: #6b7280; box-shadow: var(--shadow); }.cat-card .icon { margin-bottom: .75rem; font-size: 1.4rem; }.cat-card h3 { font-size: .95rem; }.cat-card span { color: var(--text-dim); font-size: .8rem; }
@media (min-width: 700px) { .category-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } } @media (min-width: 1000px) { .category-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
</style>
