<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import DemoBanner from './components/DemoBanner.vue'
import SiteNav from './components/SiteNav.vue'
import SiteFooter from './components/SiteFooter.vue'
import WhatsAppFloat from './components/WhatsAppFloat.vue'

const route = useRoute()
const menuOpen = ref(false)

watch(() => route.fullPath, () => {
  menuOpen.value = false
})
</script>

<template>
  <DemoBanner />
  <SiteNav :menu-open="menuOpen" @toggle="menuOpen = !menuOpen" />
  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
  <WhatsAppFloat />
</template>
