<script setup>
import { useCart } from '../composables/useCart'

const { lastAdded } = useCart()
</script>

<template>
  <Transition name="desktop-notice">
    <div v-if="lastAdded" class="desktop-notice" role="status">
      <span class="desktop-notice-icon">✓</span>
      <span><strong>Producto añadido</strong><small>{{ lastAdded.name }}</small></span>
      <span class="desktop-notice-line"></span>
    </div>
  </Transition>
</template>

<style scoped>
.desktop-notice { position: fixed; top: 4.3rem; right: 1.25rem; z-index: 180; display: flex; align-items: center; gap: .65rem; min-width: 15rem; padding: .65rem .75rem; border: 1px solid rgba(255,255,255,.16); border-radius: 1rem; background: rgba(29,31,36,.86); box-shadow: 0 16px 40px rgba(0,0,0,.35), inset 0 1px rgba(255,255,255,.1); backdrop-filter: blur(22px); -webkit-backdrop-filter: blur(22px); }.desktop-notice-icon { display: grid; width: 1.5rem; height: 1.5rem; place-items: center; border-radius: 50%; background: #d9f26b; color: #12150f; font-size: .7rem; font-weight: 800; }.desktop-notice > span:nth-child(2) { display: grid; gap: .12rem; min-width: 0; }.desktop-notice strong { font-size: .7rem; }.desktop-notice small { overflow: hidden; color: var(--text-muted); font-size: .62rem; text-overflow: ellipsis; white-space: nowrap; }.desktop-notice-line { position: absolute; right: .75rem; bottom: .28rem; left: .75rem; height: 1px; background: var(--warning); transform-origin: left; animation: notice-timer 2.6s linear both; }.desktop-notice-enter-active, .desktop-notice-leave-active { transition: opacity .3s ease, transform .45s cubic-bezier(.175,.885,.32,1.275); }.desktop-notice-enter-from, .desktop-notice-leave-to { opacity: 0; transform: translateY(-12px) scale(.94); }
@keyframes notice-timer { from { transform: scaleX(1); } to { transform: scaleX(0); } } @media (max-width: 899px) { .desktop-notice { display: none; } }
</style>
