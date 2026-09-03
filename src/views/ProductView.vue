<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useProducts, formatCOP, productSalesWhatsApp } from '../composables/useProducts'

const route = useRoute()
const { getById } = useProducts()

const product = computed(() => getById(route.params.id))

const waHref = computed(() => {
  if (!product.value) return '#'
  return productSalesWhatsApp(product.value)
})
</script>

<template>
  <div class="container" style="padding: 2rem 0 3rem">
    <p v-if="!product" class="empty">Producto no encontrado. <RouterLink to="/catalogo">Volver al catálogo</RouterLink></p>

    <template v-else>
      <p style="margin-bottom:1rem">
        <RouterLink to="/catalogo" style="color:var(--text-muted);font-size:0.9rem">← Catálogo</RouterLink>
      </p>
      <div class="product-detail">
        <div class="detail-media">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="detail-info">
          <div class="product-brand">{{ product.brand }} · {{ product.condition }}</div>
          <h1>{{ product.name }}</h1>
          <div class="product-price-row">
            <span class="price">{{ formatCOP(product.price) }}</span>
            <span v-if="product.compareAtPrice" class="compare">{{ formatCOP(product.compareAtPrice) }}</span>
          </div>
          <p class="detail-desc">{{ product.description }}</p>
          <div class="detail-specs">
            <div><span>Categoría</span><strong>{{ product.category }}</strong></div>
            <div v-if="product.storage"><span>Almacenamiento</span><strong>{{ product.storage }}</strong></div>
            <div v-if="product.batteryPercent"><span>Batería</span><strong>{{ product.batteryPercent }}%</strong></div>
            <div><span>Stock</span><strong>{{ product.inStock ? 'Disponible' : 'Agotado' }}</strong></div>
            <div v-if="product.tags?.length"><span>Tags</span><strong>{{ product.tags.join(', ') }}</strong></div>
          </div>
          <div class="hero-actions">
            <a class="btn btn-wa" :href="waHref" target="_blank" rel="noopener">Quiero comprar por WhatsApp</a>
            <RouterLink class="btn btn-ghost" to="/credito">Ver crédito</RouterLink>
          </div>
          <p style="margin-top:1rem;font-size:0.8rem;color:var(--text-dim)">Precio de ejemplo · demo de propuesta</p>
        </div>
      </div>
    </template>
  </div>
</template>
