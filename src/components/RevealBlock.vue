<script setup>
import { useReveal } from '../composables/useReveal'
const { el } = useReveal()
</script>

<template>
  <div ref="el" class="reveal">
    <slot />
  </div>
</template>
