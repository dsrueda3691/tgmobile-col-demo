<script setup>
import { useProducts } from '../composables/useProducts'
import { useReveal } from '../composables/useReveal'

const { campaign } = useProducts()
const { el } = useReveal()
</script>

<template>
  <section v-if="campaign.active" class="container">
    <div ref="el" class="campaign reveal">
      <div>
        <span class="campaign-badge">{{ campaign.badge }}</span>
        <h2>{{ campaign.title }}</h2>
        <p>{{ campaign.subtitle }}</p>
      </div>
      <RouterLink class="btn btn-primary" :to="{ path: '/catalogo', query: { tags: 'remate,oferta' } }">
        {{ campaign.cta }}
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.campaign { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin: .5rem auto 2rem; padding: 1.25rem 1.5rem; border: 1px solid rgba(240,180,41,.35); border-radius: var(--radius); background: var(--grad-campaign); box-shadow: var(--shadow-soft); }.campaign-badge { display: inline-block; margin-bottom: .4rem; padding: .25rem .55rem; border-radius: 999px; background: var(--warning); color: #1a1408; font-size: .7rem; font-weight: 700; letter-spacing: .12em; }.campaign h2 { font-size: 1.15rem; }.campaign p { color: var(--text-muted); font-size: .9rem; }
</style>
