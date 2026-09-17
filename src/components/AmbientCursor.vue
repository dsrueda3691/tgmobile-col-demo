<script setup>
import { onMounted, onUnmounted } from 'vue'

function updatePointer(event) {
  document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`)
  document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`)
}

onMounted(() => window.addEventListener('pointermove', updatePointer, { passive: true }))
onUnmounted(() => window.removeEventListener('pointermove', updatePointer))
</script>

<template>
  <div class="ambient-cursor" aria-hidden="true"></div>
</template>

<style scoped>
.ambient-cursor { position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: .55; background: radial-gradient(420px circle at var(--pointer-x) var(--pointer-y), rgba(255,255,255,.055), transparent 70%); mix-blend-mode: screen; transition: background .15s ease; }
@media (pointer: coarse) { .ambient-cursor { display: none; } }
</style>
