<script setup>
import { computed } from 'vue'
import { useCart } from '../composables/useCart'

const { count, lastAdded } = useCart()
const expanded = computed(() => Boolean(lastAdded.value))
defineEmits(['open-cart', 'open-more'])
</script>

<template>
  <div class="dynamic-island" :class="{ expanded, 'has-notice': lastAdded }" role="status" aria-live="polite">
    <div v-if="!expanded" class="island-idle"><span class="island-camera"></span><span v-if="count" class="island-count">{{ count }}</span></div>
    <template v-else>
      <Transition name="island-content" mode="out-in">
        <div class="island-product" v-if="lastAdded" :key="lastAdded.id">
        <span class="island-check">✓</span>
        <span><strong>Agregado a tu bolsa</strong><small>{{ lastAdded.name }}</small></span>
        </div>
      </Transition>
      <button class="island-action" @click="$emit('open-cart')">Ver bolsa</button>
    </template>
  </div>
</template>

<style scoped>
.dynamic-island { position: fixed; top: max(.7rem, env(safe-area-inset-top)); left: 50%; z-index: 130; width: 7rem; height: 2.15rem; transform: translateX(-50%); display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid rgba(255,255,255,.08); border-radius: 999px; background: rgba(7,8,10,.92); box-shadow: 0 10px 32px rgba(0,0,0,.35), inset 0 1px 1px rgba(255,255,255,.08); backdrop-filter: blur(22px) saturate(150%); -webkit-backdrop-filter: blur(22px) saturate(150%); transition: width .52s cubic-bezier(.175,.885,.32,1.275), height .52s cubic-bezier(.175,.885,.32,1.275), border-radius .52s cubic-bezier(.175,.885,.32,1.275), background .3s ease; }
.dynamic-island.expanded { width: min(21rem, calc(100vw - 2rem)); height: 4rem; border-radius: 1.35rem; background: rgba(24,26,30,.88); }.dynamic-island.has-notice { animation: island-bounce .65s cubic-bezier(.175,.885,.32,1.275); }.island-idle { display: flex; align-items: center; gap: .5rem; }.island-camera { width: .42rem; height: .42rem; border-radius: 50%; background: #22262c; box-shadow: 0 0 0 2px rgba(255,255,255,.05); }.island-count { display: grid; min-width: .85rem; height: .85rem; place-items: center; margin-left: .2rem; border-radius: 50%; background: #e7b550; color: #17130b; font-size: .52rem; font-weight: 800; animation: count-pop .35s cubic-bezier(.175,.885,.32,1.275); }
.island-product { display: flex; align-items: center; gap: .65rem; width: 100%; padding: .4rem .65rem .4rem .75rem; }.island-product > span:nth-child(2) { display: grid; gap: .12rem; min-width: 0; }.island-product strong { overflow: hidden; color: #f5f6f7; font-size: .7rem; text-overflow: ellipsis; white-space: nowrap; }.island-product small { overflow: hidden; color: #a9afb7; font-size: .65rem; text-overflow: ellipsis; white-space: nowrap; }.island-check { display: grid; flex: 0 0 auto; width: 1.45rem; height: 1.45rem; place-items: center; border-radius: 50%; background: #d9f26b; color: #12150f; font-size: .8rem; font-weight: 800; }.island-action { flex: 0 0 auto; margin-left: auto; padding: .5rem .7rem; border: 1px solid rgba(255,255,255,.14); border-radius: 999px; color: #f5f6f7; font-size: .65rem; transition: background .2s, transform .2s; }.island-action:hover { background: rgba(255,255,255,.1); transform: scale(1.03); }
.island-content-enter-active, .island-content-leave-active { transition: opacity .18s ease, transform .22s cubic-bezier(.175,.885,.32,1.275); }.island-content-enter-from { opacity: 0; transform: translateY(8px) scale(.95); }.island-content-leave-to { opacity: 0; transform: translateY(-8px) scale(.95); }
@keyframes island-bounce { 0% { transform: translateX(-50%) scale(.86); } 55% { transform: translateX(-50%) scale(1.04); } 100% { transform: translateX(-50%) scale(1); } } @keyframes count-pop { from { opacity: 0; transform: scale(.5); } to { opacity: 1; transform: scale(1); } }
@media (min-width: 1100px) { .dynamic-island { display: none; } } @media (max-width: 620px) { .dynamic-island { top: max(.55rem, env(safe-area-inset-top)); }.dynamic-island.expanded { width: calc(100vw - 2rem); } }
</style>
