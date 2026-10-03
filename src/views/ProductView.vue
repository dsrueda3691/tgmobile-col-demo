<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useProducts, formatCOP, productSalesWhatsApp } from '../composables/useProducts'
import ProductImage from '../components/ProductImage.vue'
import { useCart } from '../composables/useCart'

const route = useRoute()
const { getById } = useProducts()
const { add } = useCart()

const product = computed(() => getById(route.params.id))

const waHref = computed(() => {
  if (!product.value) return '#'
  return productSalesWhatsApp(product.value)
})

const conditionLabel = computed(() => {
  const c = product.value?.condition
  if (c === 'nuevo') return 'Nuevo'
  if (c === 'seminuevo') return 'Seminuevo'
  if (c === 'usado') return 'Usado'
  return c || ''
})
</script>

<template>
  <div class="product-page">
    <div class="container">
      <p v-if="!product" class="empty">
        Producto no encontrado.
        <RouterLink to="/catalogo">Volver al catálogo</RouterLink>
      </p>

      <template v-else>
        <nav class="product-crumb">
          <RouterLink to="/catalogo">Catálogo</RouterLink>
          <span aria-hidden="true">/</span>
          <span>{{ product.name }}</span>
        </nav>

        <div class="product-detail">
          <div class="detail-media">
            <ProductImage :src="product.image" :alt="product.name" loading="eager" />
          </div>

          <div class="detail-info">
            <div class="detail-brand-row">
              <span class="product-brand">{{ product.brand }}</span>
              <span v-if="conditionLabel" class="condition-pill" :data-cond="product.condition">{{ conditionLabel }}</span>
            </div>

            <h1>{{ product.name }}</h1>

            <div class="product-price-row">
              <span class="price">{{ formatCOP(product.price) }}</span>
              <span v-if="product.compareAtPrice" class="compare">{{ formatCOP(product.compareAtPrice) }}</span>
            </div>

            <p class="detail-desc">{{ product.description }}</p>

            <div class="detail-specs">
              <div v-if="product.storage">
                <span>Almacenamiento</span>
                <strong>{{ product.storage }}</strong>
              </div>
              <div v-if="product.batteryPercent">
                <span>Batería</span>
                <strong>{{ product.batteryPercent }}%</strong>
              </div>
              <div>
                <span>Disponibilidad</span>
                <strong :class="product.inStock ? 'in-stock' : 'out-stock'">
                  {{ product.inStock ? 'Disponible' : 'Agotado' }}
                </strong>
              </div>
            </div>

            <div class="detail-actions">
              <button class="btn btn-primary" type="button" @click="add(product)">Añadir a la bolsa</button>
              <a class="btn btn-wa" :href="waHref" target="_blank" rel="noopener">Comprar por WhatsApp</a>
              <RouterLink class="btn btn-ghost" to="/credito">Ver crédito</RouterLink>
            </div>

            <p class="demo-note">Precio de ejemplo · demo de propuesta</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.product-page {
  padding: 1.25rem 0 3rem;
}
.product-crumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
  font-size: 0.8rem;
  color: var(--text-dim);
}
.product-crumb a {
  color: var(--text-muted);
}
.product-crumb a:hover {
  color: var(--text);
}
.product-detail {
  display: grid;
  gap: 1.75rem;
  animation: product-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
@media (min-width: 800px) {
  .product-detail {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
    align-items: start;
  }
}
.detail-media {
  border-radius: 1.25rem;
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--grad-media);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  padding: 1.5rem;
}
.detail-brand-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
}
.product-brand {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
}
.condition-pill {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: rgba(148, 163, 184, 0.12);
  color: #c5cad0;
}
.condition-pill[data-cond='nuevo'] {
  background: rgba(52, 211, 153, 0.14);
  color: #34d399;
  border-color: rgba(52, 211, 153, 0.3);
}
.detail-info h1 {
  font-size: clamp(1.45rem, 3.5vw, 1.9rem);
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin-bottom: 0.75rem;
}
.product-price-row {
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
  margin-bottom: 1rem;
}
.price {
  font-size: 1.35rem;
  font-weight: 700;
}
.compare {
  font-size: 0.9rem;
  color: var(--text-dim);
  text-decoration: line-through;
}
.detail-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.15rem;
}
.detail-specs {
  display: grid;
  gap: 0.55rem;
  padding: 0.95rem 1.05rem;
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.04);
  margin-bottom: 1.25rem;
}
.detail-specs > div {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.88rem;
}
.detail-specs span {
  color: var(--text-dim);
}
.in-stock {
  color: var(--success);
}
.out-stock {
  color: var(--danger);
}
.detail-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
.detail-actions .btn {
  flex: 1 1 auto;
  min-width: 140px;
}
.demo-note {
  margin-top: 1rem;
  font-size: 0.75rem;
  color: var(--text-dim);
}
@keyframes product-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
