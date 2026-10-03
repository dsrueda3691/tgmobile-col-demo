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
      v-for="(c, i) in items"
      :key="c.id"
      class="cat-card"
      :style="{ '--delay': `${i * 40}ms` }"
      :to="{ path: '/catalogo', query: c.query }"
    >
      <div class="cat-icon" aria-hidden="true">{{ c.icon }}</div>
      <div class="cat-body">
        <h3>{{ c.label }}</h3>
        <span>{{ c.count }} producto{{ c.count === 1 ? '' : 's' }}</span>
      </div>
      <span class="cat-arrow" aria-hidden="true">›</span>
    </RouterLink>
  </div>
</template>

<style scoped>
.category-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
}

.cat-card {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.75rem;
  min-height: 4.5rem;
  padding: 0.95rem 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.15rem;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  color: #f2f3f5;
  text-decoration: none;
  overflow: hidden;
  transition:
    transform 0.35s cubic-bezier(0.32, 0.72, 0, 1),
    background 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.35s ease;
  animation: cat-in 0.5s cubic-bezier(0.32, 0.72, 0, 1) both;
  animation-delay: var(--delay, 0ms);
}

.cat-card:active {
  transform: scale(0.97);
}

.cat-card:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.28);
}

.cat-icon {
  display: grid;
  place-items: center;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 0.85rem;
  background: rgba(255, 255, 255, 0.1);
  font-size: 1.25rem;
  flex-shrink: 0;
}

.cat-body {
  min-width: 0;
  display: grid;
  gap: 0.15rem;
}

.cat-body h3 {
  margin: 0;
  font-size: 0.88rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: #f5f6f7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cat-body span {
  font-size: 0.72rem;
  color: rgba(242, 243, 245, 0.55);
}

.cat-arrow {
  color: rgba(242, 243, 245, 0.35);
  font-size: 1.25rem;
  font-weight: 300;
  line-height: 1;
  transition: transform 0.25s ease, color 0.25s ease;
}

.cat-card:hover .cat-arrow {
  color: rgba(242, 243, 245, 0.75);
  transform: translateX(2px);
}

@keyframes cat-in {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (min-width: 700px) {
  .category-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1000px) {
  .category-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .cat-card {
    min-height: 5rem;
    padding: 1.1rem 1rem;
  }
}
</style>
