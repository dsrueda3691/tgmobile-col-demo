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
  /* Fondo oscuro iOS detrás de ilustraciones con fondo blanco */
  background:
    radial-gradient(ellipse at 50% 40%, rgba(90, 96, 110, 0.35), transparent 65%),
    linear-gradient(160deg, #3a3f46 0%, #2a2e34 100%);
  border-radius: 1rem;
  overflow: hidden;
}

.smart-image img {
  max-width: 88%;
  max-height: 88%;
  width: auto;
  height: auto;
  object-fit: contain;
  opacity: 0;
  /* Quita el “cuadro blanco” de las ilustraciones sobre fondo oscuro */
  mix-blend-mode: multiply;
  filter: contrast(1.05) saturate(1.05);
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
    rgba(255, 255, 255, 0.03) 25%,
    rgba(255, 255, 255, 0.1) 40%,
    rgba(255, 255, 255, 0.03) 55%
  );
  background-size: 220% 100%;
  animation: skeleton-pulse 1.5s linear infinite;
}

.smart-image.has-error img {
  opacity: 0.65;
  mix-blend-mode: normal;
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
