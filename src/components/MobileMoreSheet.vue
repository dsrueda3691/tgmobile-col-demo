<script setup>
const props = defineProps({ open: Boolean })
const emit = defineEmits(['close'])
const links = [
  { label: 'Inicio', detail: 'Centro TGMOBILE', to: '/' },
  { label: 'Catálogo', detail: 'Todos los equipos', to: '/catalogo' },
  { label: 'Ofertas', detail: 'Remates y oportunidades', to: { path: '/catalogo', query: { tags: 'remate,oferta' } } },
  { label: 'Crédito', detail: 'Compra con financiación', to: '/credito' },
  { label: 'Garantía', detail: 'Respaldo postventa', to: '/garantia' },
  { label: 'Ubicación', detail: 'Visítanos en Santa Marta', to: '/ubicacion' },
  { label: 'Contacto', detail: 'Habla con un asesor', to: '/contacto' }
]
</script>

<template>
  <Transition name="more-menu">
    <div v-if="props.open" class="mobile-more-layer" @click.self="emit('close')">
      <section class="mobile-more-sheet">
        <div class="cart-grabber"></div>
        <header class="mobile-more-header"><div><span class="cart-eyebrow">TGMOBILE · MENÚ</span><h2>Explora la tienda</h2></div><button class="cart-close" type="button" @click="emit('close')">×</button></header>
        <nav class="mobile-more-grid" aria-label="Todas las secciones">
          <RouterLink v-for="link in links" :key="link.label" :to="link.to" @click="emit('close')"><span>{{ link.label.slice(0, 1) }}</span><strong>{{ link.label }}</strong><small>{{ link.detail }}</small><b>›</b></RouterLink>
        </nav>
      </section>
    </div>
  </Transition>
</template>

<style scoped>
.mobile-more-layer { position: fixed; inset: 0; z-index: 190; display: flex; align-items: end; padding: .5rem; background: rgba(0,0,0,.4); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }.mobile-more-sheet { width: 100%; padding: .65rem 1rem 1rem; border: 1px solid rgba(255,255,255,.16); border-radius: 1.5rem; background: linear-gradient(145deg, rgba(48,51,57,.97), rgba(19,21,24,.98)); box-shadow: 0 -20px 70px rgba(0,0,0,.45); }.cart-grabber { width: 2.8rem; height: .25rem; margin: .1rem auto .9rem; border-radius: 999px; background: rgba(255,255,255,.3); }.cart-eyebrow { color: var(--warning); font-size: .62rem; font-weight: 750; letter-spacing: .12em; }.cart-close { display: grid; width: 2rem; height: 2rem; place-items: center; border: 1px solid rgba(255,255,255,.14); border-radius: 50%; background: rgba(255,255,255,.08); color: white; cursor: pointer; font-size: 1.2rem; }.mobile-more-header { display: flex; justify-content: space-between; align-items: start; }.mobile-more-header h2 { margin-top: .25rem; font-size: 1.5rem; }.mobile-more-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: .5rem; margin-top: 1.1rem; }.mobile-more-grid a { position: relative; display: grid; grid-template-columns: 2rem 1fr auto; gap: .15rem .6rem; align-items: center; padding: .7rem; border: 1px solid rgba(255,255,255,.1); border-radius: .9rem; background: rgba(255,255,255,.05); }.mobile-more-grid a > span { display: grid; grid-row: span 2; width: 2rem; height: 2rem; place-items: center; border-radius: .6rem; background: rgba(255,255,255,.12); color: var(--warning); font-weight: 800; }.mobile-more-grid strong { font-size: .75rem; }.mobile-more-grid small { color: var(--text-muted); font-size: .58rem; }.mobile-more-grid b { grid-column: 3; grid-row: 1 / span 2; color: var(--text-dim); }.more-menu-enter-active, .more-menu-leave-active { transition: opacity .25s ease; }.more-menu-enter-active .mobile-more-sheet, .more-menu-leave-active .mobile-more-sheet { transition: transform .45s cubic-bezier(.175,.885,.32,1.275); }.more-menu-enter-from, .more-menu-leave-to { opacity: 0; }.more-menu-enter-from .mobile-more-sheet, .more-menu-leave-to .mobile-more-sheet { transform: translateY(105%); }
@media (max-width: 620px) { .mobile-more-grid { grid-template-columns: 1fr; max-height: 55vh; overflow-y: auto; -webkit-overflow-scrolling: touch; } }
</style>
