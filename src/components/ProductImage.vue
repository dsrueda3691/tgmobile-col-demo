<script setup>
import { ref } from 'vue'
import { assetUrl } from '../composables/useProducts'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  fallback: { type: String, default: '/images/logo.png' },
  loading: { type: String, default: 'lazy' }
})

const isLoaded = ref(false)
const hasError = ref(false)

function handleError(event) {
  if (hasError.value) return
  hasError.value = true
  event.target.src = assetUrl(props.fallback)
}
</script>

<template>
  <div class="smart-image" :class="{ 'is-loaded': isLoaded, 'has-error': hasError }">
    <div v-if="!isLoaded" class="image-skeleton" aria-hidden="true"></div>
    <img
      :src="assetUrl(src)"
      :alt="alt"
      :loading="loading"
      decoding="async"
      referrerpolicy="no-referrer"
      @load="isLoaded = true"
      @error="handleError"
    />
  </div>
</template>

<style scoped>
.smart-image {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  /* Fondo estilo catálogo (blanco limpio como Falabella) */
  background: #f5f6f7;
  border-radius: 1rem;
  overflow: hidden;
}

.smart-image img {
  width: 88%;
  height: 88%;
  object-fit: contain;
  object-position: center;
  opacity: 0;
  transition:
    opacity 0.45s ease,
    transform 0.45s cubic-bezier(0.32, 0.72, 0, 1);
}

.smart-image.is-loaded img {
  opacity: 1;
}

.smart-image:hover img {
  transform: scale(1.04);
}

.image-skeleton {
  position: absolute;
  inset: 12%;
  border-radius: 12px;
  background: linear-gradient(
    105deg,
    rgba(0, 0, 0, 0.03) 25%,
    rgba(0, 0, 0, 0.07) 40%,
    rgba(0, 0, 0, 0.03) 55%
  );
  background-size: 220% 100%;
  animation: skeleton-pulse 1.5s linear infinite;
}

.smart-image.has-error img {
  opacity: 0.55;
  object-fit: contain;
  padding: 1.5rem;
}

@keyframes skeleton-pulse {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -20% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .smart-image img {
    transition: opacity 0.3s ease;
  }
  .smart-image:hover img {
    transform: none;
  }
}
</style>
