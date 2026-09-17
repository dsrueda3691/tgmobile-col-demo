<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useProducts } from '../composables/useProducts'
import { assetUrl } from '../composables/useProducts'

const { dailyDeals } = useProducts()
const now = ref(new Date())
let clock

const time = computed(() => now.value.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false }))
const date = computed(() => now.value.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' }))
const featured = computed(() => dailyDeals.value[0])

const apps = [
  { label: 'Catálogo', icon: '⌕', tone: 'app-dark', to: '/catalogo' },
  { label: 'Ofertas', icon: '%', tone: 'app-gold', to: { path: '/catalogo', query: { tags: 'remate,oferta' } } },
  { label: 'Crédito', icon: '↗', tone: 'app-blue', to: '/credito' },
  { label: 'Garantía', icon: '✓', tone: 'app-green', to: '/garantia' },
  { label: 'Ubicación', icon: '⌖', tone: 'app-purple', to: '/ubicacion' },
  { label: 'Soporte', icon: '◌', tone: 'app-red', to: '/contacto' }
]

onMounted(() => { clock = window.setInterval(() => { now.value = new Date() }, 1000) })
onUnmounted(() => window.clearInterval(clock))
</script>

<template>
  <section class="ios-workspace" aria-label="Centro de control TGMOBILE">
    <div class="ios-status-row">
      <span>{{ time }}</span>
      <span class="status-location">Santa Marta · Soho Bavaria</span>
      <span class="status-icons">⌁ ᯤ ▰</span>
    </div>
    <div class="workspace-heading">
      <div><span class="workspace-date">{{ date }}</span><h2>Hola, ¿qué buscas hoy?</h2></div>
      <span class="workspace-avatar">TG</span>
    </div>
    <div class="workspace-layout">
      <div class="app-grid">
        <RouterLink v-for="app in apps" :key="app.label" :to="app.to" class="ios-app-icon">
          <span class="app-icon" :class="app.tone">{{ app.icon }}</span><small>{{ app.label }}</small>
        </RouterLink>
      </div>
      <RouterLink class="ios-widget" :to="featured ? `/producto/${featured.id}` : '/catalogo'">
        <span class="widget-kicker">Ahora en TGMOBILE</span>
        <strong>{{ featured?.name || 'Tecnología para tu día' }}</strong>
        <span class="widget-cta">Ver oportunidad <b>↗</b></span>
        <span class="widget-orbit"></span>
      </RouterLink>
    </div>
    <div class="ios-dock">
      <RouterLink to="/" class="dock-app dock-brand"><img :src="assetUrl('/images/logo.png')" alt="TGMOBILE" /></RouterLink>
      <RouterLink to="/catalogo" class="dock-app">⌕</RouterLink>
      <RouterLink to="/contacto" class="dock-app">◌</RouterLink>
      <RouterLink to="/credito" class="dock-app">＋</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.ios-workspace { position: relative; isolation: isolate; overflow: hidden; width: min(100% - 2rem, 1120px); margin: 1rem auto 0; padding: 1.25rem 1.35rem 1.35rem; border: 1px solid rgba(255,255,255,.16); border-radius: 1.65rem; background: linear-gradient(145deg, rgba(48,52,59,.92), rgba(20,22,26,.98)); box-shadow: 0 24px 65px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.08); }.ios-workspace::before { content: ''; position: absolute; inset: -50% -20%; z-index: -1; background: conic-gradient(from 0deg, transparent 0 30%, rgba(255,255,255,.07) 38%, transparent 48% 70%, rgba(220,177,92,.07) 78%, transparent 88%); animation: workspace-sweep 16s linear infinite; }.ios-status-row { display: flex; align-items: center; justify-content: space-between; color: rgba(245,246,247,.72); font-size: .65rem; font-weight: 650; letter-spacing: .03em; }.status-location { color: var(--text-dim); }.status-icons { letter-spacing: .22em; }.workspace-heading { display: flex; align-items: end; justify-content: space-between; gap: 1rem; margin: 2.2rem 0 1.4rem; }.workspace-date { color: var(--text-muted); font-size: .7rem; text-transform: capitalize; }.workspace-heading h2 { margin-top: .3rem; font-size: clamp(1.5rem, 3vw, 2.3rem); letter-spacing: -.05em; }.workspace-avatar { display: grid; width: 2.6rem; height: 2.6rem; place-items: center; border: 1px solid rgba(255,255,255,.22); border-radius: 50%; background: linear-gradient(145deg, #4e555e, #17191d); color: white; font-size: .68rem; font-weight: 800; }.workspace-layout { display: grid; grid-template-columns: 1.25fr .75fr; gap: 1.2rem; align-items: stretch; }.app-grid { display: grid; grid-template-columns: repeat(6, minmax(3.4rem, 1fr)); gap: 1.1rem .75rem; align-content: center; }.ios-app-icon { display: grid; justify-items: center; gap: .45rem; color: var(--text); font-size: .68rem; transition: transform .35s cubic-bezier(.175,.885,.32,1.275); }.ios-app-icon:hover { transform: translateY(-7px) scale(1.08); }.ios-app-icon small { color: rgba(245,246,247,.82); font-size: .68rem; }.app-icon { display: grid; width: 3.25rem; height: 3.25rem; place-items: center; border: 1px solid rgba(255,255,255,.2); border-radius: .92rem; box-shadow: 0 8px 16px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.3); color: white; font-size: 1.4rem; font-weight: 700; }.app-dark { background: linear-gradient(145deg, #51565e, #141619); }.app-gold { background: linear-gradient(145deg, #f0c774, #9e6334); }.app-blue { background: linear-gradient(145deg, #70a4e9, #345184); }.app-green { background: linear-gradient(145deg, #8ebda1, #32624e); }.app-purple { background: linear-gradient(145deg, #9c91db, #4e477c); }.app-red { background: linear-gradient(145deg, #ef8d7e, #863b42); }.ios-widget { position: relative; display: grid; align-content: space-between; min-height: 11rem; overflow: hidden; padding: 1rem; border: 1px solid rgba(255,255,255,.15); border-radius: 1.25rem; background: linear-gradient(145deg, rgba(255,255,255,.12), rgba(255,255,255,.025)); transition: transform .4s cubic-bezier(.175,.885,.32,1.275), border-color .3s; }.ios-widget:hover { transform: scale(1.025) rotate(-1deg); border-color: rgba(255,255,255,.4); }.widget-kicker { color: var(--text-muted); font-size: .64rem; text-transform: uppercase; letter-spacing: .1em; }.ios-widget strong { position: relative; z-index: 1; max-width: 12rem; font-size: 1.25rem; line-height: 1.05; letter-spacing: -.04em; }.widget-cta { position: relative; z-index: 1; color: var(--accent); font-size: .72rem; }.widget-cta b { margin-left: .3rem; }.widget-orbit { position: absolute; right: -2rem; bottom: -3rem; width: 11rem; height: 11rem; border: 1px solid rgba(255,255,255,.2); border-radius: 50%; box-shadow: 0 0 0 1rem rgba(255,255,255,.025), 0 0 0 2rem rgba(255,255,255,.018); animation: widget-orbit 8s ease-in-out infinite; }.ios-dock { display: flex; justify-content: center; gap: .65rem; margin: 1.4rem auto 0; padding: .45rem; width: max-content; max-width: 100%; border: 1px solid rgba(255,255,255,.12); border-radius: 1.05rem; background: rgba(255,255,255,.09); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); }.dock-app { display: grid; width: 2.65rem; height: 2.65rem; place-items: center; border: 1px solid rgba(255,255,255,.16); border-radius: .75rem; background: linear-gradient(145deg, #4c535c, #1b1e23); color: white; font-size: 1.25rem; transition: transform .3s cubic-bezier(.175,.885,.32,1.275), filter .3s; }.dock-app:hover { transform: translateY(-8px) scale(1.1); filter: brightness(1.25); }.dock-brand { overflow: hidden; padding: .25rem; background: #f2f3f4; }.dock-brand img { width: 100%; height: 100%; object-fit: cover; border-radius: .58rem; }
@keyframes workspace-sweep { to { transform: rotate(360deg); } } @keyframes widget-orbit { 0%, 100% { transform: rotate(-8deg) scale(.96); } 50% { transform: rotate(12deg) scale(1.06); } }
@media (min-width: 1100px) { .ios-workspace { width: min(100% - 3rem, 1280px); margin-top: 1.4rem; padding: 1.5rem 1.75rem 1.5rem; } }.ios-workspace + .hero { padding-top: 3.5rem; }
@media (max-width: 700px) { .ios-workspace { margin-top: .65rem; padding: 1rem .85rem .85rem; border-radius: 1.45rem; }.status-location { display: none; }.workspace-heading { margin: 1.7rem 0 1rem; }.workspace-heading h2 { font-size: 1.45rem; }.workspace-layout { grid-template-columns: 1fr; gap: 1rem; }.app-grid { grid-template-columns: repeat(6, 1fr); gap: .8rem .25rem; }.app-icon { width: 2.7rem; height: 2.7rem; border-radius: .78rem; font-size: 1.2rem; }.ios-app-icon small { font-size: .58rem; }.ios-widget { min-height: 8.5rem; }.ios-dock { display: none; } }.ios-workspace + .hero { padding-top: 2.5rem; }
@media (max-width: 420px) { .app-grid { grid-template-columns: repeat(3, 1fr); row-gap: .9rem; }.ios-widget { min-height: 8rem; } }
</style>
