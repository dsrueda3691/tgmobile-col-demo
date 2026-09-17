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
    <span class="image-corner image-corner-tl" aria-hidden="true"></span>
    <span class="image-corner image-corner-br" aria-hidden="true"></span>
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
.smart-image { position: relative; display: grid; place-items: center; width: 100%; height: 100%; min-width: 0; min-height: 0; }.smart-image img { max-width: 100%; max-height: 100%; opacity: 0; transition: opacity .45s ease, transform .45s ease; }.smart-image.is-loaded img { opacity: 1; }.smart-image:hover img { transform: scale(1.035); }.image-skeleton { position: absolute; inset: 10%; border-radius: 12px; background: linear-gradient(105deg, rgba(255,255,255,.03) 25%, rgba(255,255,255,.11) 40%, rgba(255,255,255,.03) 55%); background-size: 220% 100%; animation: skeleton-pulse 1.5s linear infinite; }.smart-image.has-error img { opacity: .65; }.image-corner { position: absolute; z-index: 2; width: 1rem; height: 1rem; border-color: rgba(255,255,255,.45); opacity: .65; transition: width .3s ease, height .3s ease, opacity .3s ease; pointer-events: none; }.image-corner-tl { top: .7rem; left: .7rem; border-top: 1px solid; border-left: 1px solid; }.image-corner-br { right: .7rem; bottom: .7rem; border-right: 1px solid; border-bottom: 1px solid; }.smart-image:hover .image-corner { width: 1.35rem; height: 1.35rem; opacity: 1; }
@keyframes skeleton-pulse { from { background-position: 200% 0; } to { background-position: -20% 0; } }
</style>
