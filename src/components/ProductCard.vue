<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { formatCOP, productSalesWhatsApp } from '../composables/useProducts'
import { useCart } from '../composables/useCart'
import ProductImage from './ProductImage.vue'

const props = defineProps({
  product: { type: Object, required: true }
})

const router = useRouter()
const launching = ref(false)
const waHref = computed(() => productSalesWhatsApp(props.product))
const { add } = useCart()

function openProduct(event) {
  if (launching.value) return
  event.preventDefault()
  launching.value = true
  window.setTimeout(() => router.push(`/producto/${props.product.id}`), 360)
}

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
  <article class="product-card" :class="{ launching }">
    <RouterLink :to="`/producto/${product.id}`" class="product-media springboard-link" @click="openProduct">
      <div class="product-badges">
        <span v-for="b in badges" :key="b.t" class="badge" :class="b.c">{{ b.t }}</span>
      </div>
      <ProductImage :src="product.image" :alt="product.name" loading="lazy" />
    </RouterLink>
    <div class="product-body">
      <div class="product-brand">{{ product.brand }}</div>
      <RouterLink :to="`/producto/${product.id}`" class="product-name springboard-link" @click="openProduct">{{ product.name }}</RouterLink>
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
        <button class="btn btn-primary btn-sm btn-add" type="button" @click="add(product)">Añadir</button>
        <a class="btn btn-wa btn-sm" :href="waHref" target="_blank" rel="noopener">Comprar</a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.product-card { transform-style: preserve-3d; perspective: 900px; transition: transform .45s cubic-bezier(.2,.8,.2,1), border-color .3s, box-shadow .45s; }.product-card:hover { transform: translateY(-8px) rotateX(1deg); }.product-card.launching { position: relative; z-index: 20; animation: springboard-launch .42s cubic-bezier(.175,.885,.32,1.275) forwards; }.product-media { transform: translateZ(1px); }.btn-add { background: rgba(245,246,247,.1); border-color: rgba(245,246,247,.22); }.btn-add:hover { background: #f5f6f7; color: #111316; }.product-card.launching .product-media { border-radius: 1.6rem; }.product-card.launching ~ * { opacity: .25; transition: opacity .22s ease; }
@keyframes springboard-launch { 0% { transform: scale(1) translateZ(0); filter: brightness(1); } 38% { transform: scale(1.045) translateZ(30px); filter: brightness(1.15); } 100% { transform: scale(1.16) translateZ(70px); filter: brightness(1.3); opacity: .3; } }
</style>
