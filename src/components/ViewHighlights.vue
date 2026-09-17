<script setup>
defineProps({
  items: { type: Array, required: true }
})
</script>

<template>
  <div class="view-highlights" role="list">
    <div v-for="item in items" :key="item.label" class="view-highlight" role="listitem">
      <span>{{ item.icon }}</span><strong>{{ item.value }}</strong><small>{{ item.label }}</small>
    </div>
  </div>
</template>

<style scoped>
.view-highlights { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); width: min(100% - 2rem, 1120px); margin: -1rem auto 2rem; padding: .7rem; border: 1px solid var(--border); border-radius: 1.2rem; background: rgba(255,255,255,.055); box-shadow: 0 14px 35px rgba(0,0,0,.18); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); }.view-highlight { display: grid; grid-template-columns: auto 1fr; gap: .1rem .55rem; align-items: center; padding: .6rem .8rem; border-right: 1px solid var(--border-soft); }.view-highlight:last-child { border-right: 0; }.view-highlight > span { grid-row: span 2; display: grid; width: 2rem; height: 2rem; place-items: center; border-radius: .65rem; background: rgba(255,255,255,.1); color: var(--warning); font-size: .7rem; }.view-highlight strong { font-size: .82rem; }.view-highlight small { color: var(--text-muted); font-size: .62rem; }
@media (max-width: 620px) { .view-highlights { grid-template-columns: 1fr; margin-top: -1.1rem; }.view-highlight { border-right: 0; border-bottom: 1px solid var(--border-soft); }.view-highlight:last-child { border-bottom: 0; } }
</style>
