<script setup>
import MacMenuBar from './MacMenuBar.vue'

defineEmits(['open-cart'])
</script>

<template>
  <header class="site-nav">
    <MacMenuBar />

    <nav class="ios-tab-bar" aria-label="Navegación móvil">
      <RouterLink to="/" aria-label="Inicio"><span>⌂</span><small>Inicio</small></RouterLink>
      <RouterLink to="/catalogo" aria-label="Catálogo"><span>⌕</span><small>Explorar</small></RouterLink>
      <RouterLink to="/credito" aria-label="Crédito"><span>＋</span><small>Crédito</small></RouterLink>
      <RouterLink to="/contacto" aria-label="Contacto"><span>◌</span><small>Ayuda</small></RouterLink>
      <button type="button" aria-label="Abrir bolsa" @click="$emit('open-cart')"><span>⌁</span><small>Bolsa</small></button>
    </nav>
  </header>
</template>

<style scoped>
.site-nav { min-height: 0; }.ios-tab-bar { display: none; }
</style>
