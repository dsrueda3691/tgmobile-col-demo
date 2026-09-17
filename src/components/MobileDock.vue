<script setup>
defineEmits(['open-cart', 'open-more'])
</script>

<template>
  <nav class="ios-tab-bar mobile-dock" aria-label="Navegación móvil">
    <RouterLink to="/" aria-label="Inicio"><span>⌂</span><small>Inicio</small></RouterLink>
    <RouterLink to="/catalogo" aria-label="Catálogo"><span>⌕</span><small>Explorar</small></RouterLink>
    <RouterLink to="/credito" aria-label="Crédito"><span>＋</span><small>Crédito</small></RouterLink>
    <RouterLink to="/contacto" aria-label="Contacto"><span>◌</span><small>Ayuda</small></RouterLink>
    <button type="button" aria-label="Abrir bolsa" @click="$emit('open-cart')"><span>⌁</span><small>Bolsa</small></button>
    <button type="button" class="dock-more" aria-label="Más secciones" @click="$emit('open-more')"><span>•••</span><small>Más</small></button>
  </nav>
</template>

<style scoped>
.mobile-dock { position: fixed; left: .75rem; right: .75rem; bottom: max(.65rem, env(safe-area-inset-bottom)); z-index: 9999; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); padding: .45rem .35rem .35rem; border: 1px solid rgba(255,255,255,.13); border-radius: 1.35rem; background: rgba(23,25,29,.82); box-shadow: 0 12px 36px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.08); backdrop-filter: blur(22px) saturate(140%); -webkit-backdrop-filter: blur(22px) saturate(140%); transition: transform .42s cubic-bezier(.175,.885,.32,1.275), opacity .28s ease; }.mobile-dock a, .mobile-dock button { display: grid; justify-items: center; gap: .1rem; min-height: 2.8rem; padding: .25rem .2rem; border: 0; border-radius: .85rem; background: transparent; color: #8e959e; font: inherit; cursor: pointer; transition: color .25s, background .25s, transform .25s; }.mobile-dock span { font-size: 1.22rem; line-height: 1; }.mobile-dock small { font-size: .58rem; font-weight: 600; }.mobile-dock a.router-link-active, .mobile-dock button:hover { color: #f5f6f7; background: rgba(255,255,255,.1); transform: translateY(-2px); }
</style>
