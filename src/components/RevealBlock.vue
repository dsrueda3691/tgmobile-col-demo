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
.reveal { opacity: 0; transform: translateY(18px); transition: opacity .6s ease, transform .6s ease; }.reveal.is-visible { opacity: 1; transform: none; }
</style>
