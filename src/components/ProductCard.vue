<script setup>
import { computed } from 'vue'
import { formatCOP, productSalesWhatsApp } from '../composables/useProducts'

const props = defineProps({
  product: { type: Object, required: true }
})

const waHref = computed(() => productSalesWhatsApp(props.product))

const badges = computed(() => {
  const list = []
  if ((props.product.tags || []).includes('oferta') || props.product.compareAtPrice) list.push({ t: 'Oferta', c: 'badge-oferta' })
  if ((props.product.tags || []).includes('remate') || props.product.season === 'remate') list.push({ t: 'Remate', c: 'badge-oferta' })
  if (props.product.condition === 'nuevo') list.push({ t: 'Nuevo', c: 'badge-nuevo' })
  if (props.product.condition === 'seminuevo') list.push({ t: 'Seminuevo', c: 'badge-seminuevo' })
  if (props.product.condition === 'usado') list.push({ t: 'Usado', c: 'badge-usado' })
  return list.slice(0, 2)
})
</script>

<template>
  <article class="product-card">
    <RouterLink :to="`/producto/${product.id}`" class="product-media">
      <div class="product-badges">
        <span v-for="b in badges" :key="b.t" class="badge" :class="b.c">{{ b.t }}</span>
      </div>
      <img :src="product.image" :alt="product.name" loading="lazy" />
    </RouterLink>
    <div class="product-body">
      <div class="product-brand">{{ product.brand }}</div>
      <RouterLink :to="`/producto/${product.id}`" class="product-name">{{ product.name }}</RouterLink>
      <div class="product-meta">
        <span v-if="product.storage">{{ product.storage }}</span>
        <span v-if="product.batteryPercent"> · Batería {{ product.batteryPercent }}%</span>
      </div>
      <div class="product-price-row">
        <span class="price">{{ formatCOP(product.price) }}</span>
        <span v-if="product.compareAtPrice" class="compare">{{ formatCOP(product.compareAtPrice) }}</span>
      </div>
      <div class="product-actions">
        <RouterLink class="btn btn-ghost btn-sm" :to="`/producto/${product.id}`">Ver</RouterLink>
        <a class="btn btn-wa btn-sm" :href="waHref" target="_blank" rel="noopener">Comprar</a>
      </div>
    </div>
  </article>
</template>
