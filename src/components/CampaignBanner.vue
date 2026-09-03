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
