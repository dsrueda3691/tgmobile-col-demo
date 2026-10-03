<script setup>
import { useReveal } from '../composables/useReveal'
const { el } = useReveal()
</script>

<template>
  <div ref="el" class="reveal">
    <slot />
  </div>
</template>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(22px) scale(0.985);
  filter: blur(4px);
  transition:
    opacity 0.65s cubic-bezier(0.32, 0.72, 0, 1),
    transform 0.65s cubic-bezier(0.32, 0.72, 0, 1),
    filter 0.55s ease;
  will-change: opacity, transform, filter;
}

.reveal.is-visible {
  opacity: 1;
  transform: none;
  filter: none;
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;
  }
}
</style>
