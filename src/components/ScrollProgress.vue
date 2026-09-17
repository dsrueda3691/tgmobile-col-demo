<script setup>
import { onMounted, onUnmounted } from 'vue'

function updateProgress() {
  const page = document.documentElement
  const scrollable = page.scrollHeight - page.clientHeight
  const progress = scrollable > 0 ? page.scrollTop / scrollable : 0
  page.style.setProperty('--scroll-progress', `${progress * 100}%`)
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})
</script>

<template>
  <div class="scroll-progress" aria-hidden="true"></div>
</template>

<style scoped>
.scroll-progress { position: fixed; top: 0; left: 0; z-index: 120; width: var(--scroll-progress); height: 2px; background: linear-gradient(90deg, var(--warning), #f5f6f7); box-shadow: 0 0 14px rgba(231,181,80,.65); transition: width .12s linear; }
</style>
