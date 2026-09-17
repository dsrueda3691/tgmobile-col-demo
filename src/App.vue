<script setup>
import DemoBanner from './components/DemoBanner.vue'
import AmbientCursor from './components/AmbientCursor.vue'
import CartSheet from './components/CartSheet.vue'
import DynamicIsland from './components/DynamicIsland.vue'
import DesktopNotice from './components/DesktopNotice.vue'
import MacMenuBar from './components/MacMenuBar.vue'
import MobileDock from './components/MobileDock.vue'
import MobileMoreSheet from './components/MobileMoreSheet.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import SiteFooter from './components/SiteFooter.vue'
import WhatsAppFloat from './components/WhatsAppFloat.vue'
import { useCart } from './composables/useCart'
import { ref } from 'vue'

const { open: openCart, close: closeCart, isOpen: cartOpen } = useCart()
const moreOpen = ref(false)

function showCart() {
  moreOpen.value = false
  openCart()
}

function showMore() {
  closeCart()
  moreOpen.value = true
}
</script>

<template>
  <div class="ios-shell" :class="{ 'cart-is-open': cartOpen, 'more-is-open': moreOpen }">
    <AmbientCursor />
    <ScrollProgress />
    <DynamicIsland @open-cart="showCart" />
    <DesktopNotice />
    <DemoBanner />
    <MacMenuBar />
    <MobileDock @open-cart="showCart" @open-more="showMore" />
    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <SiteFooter />
    <WhatsAppFloat />
    <CartSheet />
    <MobileMoreSheet :open="moreOpen" @close="moreOpen = false" />
  </div>
</template>
