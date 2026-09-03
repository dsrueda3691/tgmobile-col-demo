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
