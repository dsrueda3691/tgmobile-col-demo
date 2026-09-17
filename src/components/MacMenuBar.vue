<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useCart } from '../composables/useCart'

const activeMenu = ref('')
const now = ref(new Date())
let clock

const time = computed(() => now.value.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false }))
const menus = {
  TGMOBILE: [{ label: 'Inicio', to: '/' }, { label: 'Conoce la tienda', to: '/contacto' }],
  Comprar: [{ label: 'Ver todo el catálogo', to: '/catalogo' }, { label: 'Ofertas y remates', to: { path: '/catalogo', query: { tags: 'remate,oferta' } } }, { label: 'Accesorios', to: { path: '/catalogo', query: { category: 'accesorios' } } }],
  Financiamiento: [{ label: 'Compra a crédito', to: '/credito' }, { label: 'Garantía y respaldo', to: '/garantia' }],
  Tienda: [{ label: 'Visítanos en Santa Marta', to: '/ubicacion' }, { label: 'Horarios y ubicación', to: '/ubicacion' }, { label: 'Pantalla completa', action: 'fullscreen' }],
  Asesoría: [{ label: 'Hablar con un asesor', to: '/contacto' }, { label: 'Soporte postventa', to: '/garantia' }]
}
const { count, open } = useCart()

function toggle(menu) {
  activeMenu.value = activeMenu.value === menu ? '' : menu
}

function closeMenu() {
  activeMenu.value = ''
}

function runAction(action) {
  if (action === 'fullscreen') {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen?.()
  }
  closeMenu()
}

onMounted(() => {
  clock = window.setInterval(() => { now.value = new Date() }, 1000)
  window.addEventListener('click', closeMenu)
})
onUnmounted(() => {
  window.clearInterval(clock)
  window.removeEventListener('click', closeMenu)
})
</script>

<template>
  <div class="mac-menu-bar" @click.stop>
    <div class="mac-menu-left">
      <RouterLink class="mac-apple" to="/" aria-label="Inicio">⌘</RouterLink>
      <RouterLink class="mac-brand" to="/">TGMOBILE</RouterLink>
      <div v-for="(_, menu) in menus" :key="menu" class="mac-menu-item">
        <button type="button" :class="{ active: activeMenu === menu }" @click="toggle(menu)">{{ menu }}</button>
        <div v-if="activeMenu === menu" class="mac-dropdown">
          <template v-for="item in menus[menu]" :key="item.label">
            <RouterLink v-if="item.to" :to="item.to" @click="closeMenu">{{ item.label }}</RouterLink>
            <button v-else type="button" @click="runAction(item.action)">{{ item.label }}</button>
          </template>
        </div>
      </div>
    </div>
    <div class="mac-menu-right"><span>Santa Marta</span><span>{{ time }}</span><span>⌁ ᯤ ▰</span><button class="mac-bag" type="button" @click="open">Bolsa <b v-if="count">{{ count }}</b></button></div>
  </div>
</template>

<style scoped>
.mac-menu-bar { position: sticky; top: 0; z-index: 9999; display: flex; align-items: center; justify-content: space-between; min-height: 2rem; padding: 0 .9rem; background: rgba(38,41,46,.94); border-bottom: 1px solid rgba(255,255,255,.08); color: #f1f2f3; font-size: .65rem; backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); transition: transform .42s cubic-bezier(.175,.885,.32,1.275), opacity .28s ease; }.mac-menu-left, .mac-menu-right { display: flex; align-items: center; gap: .15rem; }.mac-menu-right { gap: .8rem; color: #aeb4bc; }.mac-apple, .mac-brand, .mac-menu-item button { padding: .25rem .45rem; border: 0; border-radius: .3rem; background: transparent; color: inherit; font: inherit; font-weight: 600; cursor: pointer; }.mac-apple { font-size: .9rem; line-height: 1; }.mac-brand { font-weight: 800; letter-spacing: .04em; }.mac-menu-item { position: relative; }.mac-menu-item button:hover, .mac-menu-item button.active { background: rgba(255,255,255,.12); }.mac-dropdown { position: absolute; top: 1.65rem; left: 0; min-width: 12rem; padding: .35rem; border: 1px solid rgba(255,255,255,.14); border-radius: .55rem; background: rgba(35,38,43,.96); box-shadow: 0 18px 35px rgba(0,0,0,.4); backdrop-filter: blur(22px); -webkit-backdrop-filter: blur(22px); animation: menu-drop .18s cubic-bezier(.175,.885,.32,1.275); }.mac-dropdown a, .mac-dropdown button { display: block; width: 100%; padding: .5rem .6rem; border: 0; background: transparent; text-align: left; color: #d7dbe0; font: inherit; font-size: .66rem; font-weight: 500; cursor: pointer; }.mac-dropdown a:hover, .mac-dropdown button:hover { background: rgba(255,255,255,.1); }.mac-bag { border: 1px solid rgba(255,255,255,.14); border-radius: 999px; background: rgba(255,255,255,.08); color: #f5f6f7; font: inherit; font-size: .62rem; cursor: pointer; padding: .25rem .5rem; }.mac-bag b { display: inline-grid; min-width: .9rem; height: .9rem; place-items: center; margin-left: .2rem; border-radius: 50%; background: var(--warning); color: #17130b; font-size: .5rem; }
@keyframes menu-drop { from { opacity: 0; transform: translateY(-5px) scale(.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
@media (max-width: 899px) { .mac-menu-bar { display: none; } }
@media (min-width: 900px) and (max-width: 1099px) { .mac-menu-bar { min-height: 2rem; } }
@media (min-width: 1100px) { .mac-menu-bar { position: absolute; top: 0; left: 0; right: 0; height: 27px; } }
</style>
