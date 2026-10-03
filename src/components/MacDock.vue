<script setup>
import { assetUrl } from '../composables/useProducts'
import { useCart } from '../composables/useCart'

defineEmits(['open-cart'])
const { count } = useCart()

const items = [
  { to: '/', label: 'Inicio', icon: 'logo' },
  { to: '/catalogo', label: 'Catálogo', icon: '⌕' },
  { to: '/credito', label: 'Crédito', icon: '↗' },
  { to: '/ubicacion', label: 'Ubicación', icon: '⌖' },
  { to: '/contacto', label: 'Soporte', icon: '◌' },
  { to: '/garantia', label: 'Garantía', icon: '✓' }
]
</script>

<template>
  <nav class="mac-dock" aria-label="Dock macOS TGMOBILE">
    <div class="mac-dock-inner">
      <RouterLink
        v-for="item in items"
        :key="item.label"
        :to="item.to"
        class="mac-dock-item"
        :title="item.label"
      >
        <span class="mac-dock-icon" :class="{ 'is-logo': item.icon === 'logo' }">
          <img v-if="item.icon === 'logo'" :src="assetUrl('/images/logo.png')" alt="TGMOBILE" />
          <template v-else>{{ item.icon }}</template>
        </span>
        <span class="mac-dock-label">{{ item.label }}</span>
      </RouterLink>

      <span class="mac-dock-sep" aria-hidden="true"></span>

      <button type="button" class="mac-dock-item" title="Bolsa" @click="$emit('open-cart')">
        <span class="mac-dock-icon mac-dock-bag">
          ⌁
          <b v-if="count" class="mac-dock-badge">{{ count > 9 ? '9+' : count }}</b>
        </span>
        <span class="mac-dock-label">Bolsa</span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.mac-dock {
  display: none;
}

@media (min-width: 900px) {
  .mac-dock {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0.85rem;
    z-index: 9998;
    justify-content: center;
    pointer-events: none;
  }

  .mac-dock-inner {
    pointer-events: auto;
    display: flex;
    align-items: flex-end;
    gap: 0.35rem;
    padding: 0.45rem 0.55rem 0.4rem;
    border-radius: 1.15rem;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(28, 30, 35, 0.72);
    backdrop-filter: blur(28px) saturate(160%);
    -webkit-backdrop-filter: blur(28px) saturate(160%);
    box-shadow:
      0 18px 50px rgba(0, 0, 0, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .mac-dock-item {
    position: relative;
    display: grid;
    justify-items: center;
    gap: 0.2rem;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
    text-decoration: none;
    padding: 0 0.12rem;
  }

  .mac-dock-icon {
    display: grid;
    place-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 0.85rem;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: linear-gradient(160deg, #4a5058, #1c1f24);
    color: #f5f6f7;
    font-size: 1.25rem;
    font-weight: 650;
    transition:
      transform 0.28s cubic-bezier(0.34, 1.4, 0.64, 1),
      filter 0.2s ease,
      box-shadow 0.2s ease;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.18);
  }

  .mac-dock-icon.is-logo {
    overflow: hidden;
    padding: 0.28rem;
    background: #f2f3f4;
  }

  .mac-dock-icon.is-logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.55rem;
  }

  .mac-dock-item:hover .mac-dock-icon {
    transform: translateY(-14px) scale(1.22);
    filter: brightness(1.12);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.22);
  }

  .mac-dock-item:hover .mac-dock-label {
    opacity: 1;
    transform: translateY(0);
  }

  .mac-dock-label {
    position: absolute;
    top: -1.55rem;
    padding: 0.15rem 0.4rem;
    border-radius: 0.35rem;
    background: rgba(20, 22, 26, 0.92);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #f0f2f5;
    font-size: 0.58rem;
    font-weight: 650;
    white-space: nowrap;
    opacity: 0;
    transform: translateY(4px);
    transition: opacity 0.2s ease, transform 0.2s ease;
    pointer-events: none;
  }

  .mac-dock-sep {
    width: 1px;
    height: 2.4rem;
    margin: 0 0.25rem 0.3rem;
    background: rgba(255, 255, 255, 0.14);
    align-self: center;
  }

  .mac-dock-bag {
    position: relative;
  }

  .mac-dock-badge {
    position: absolute;
    top: -0.25rem;
    right: -0.25rem;
    min-width: 0.95rem;
    height: 0.95rem;
    padding: 0 0.2rem;
    border-radius: 999px;
    background: #f0b429;
    color: #1a1408;
    font-size: 0.52rem;
    font-weight: 800;
    display: grid;
    place-items: center;
  }

  .mac-dock-item.router-link-active .mac-dock-icon {
    box-shadow:
      0 6px 14px rgba(0, 0, 0, 0.28),
      inset 0 1px 0 rgba(255, 255, 255, 0.18),
      0 0 0 2px rgba(240, 180, 41, 0.35);
  }
}

@media (min-width: 1100px) {
  .mac-dock-icon {
    width: 3.25rem;
    height: 3.25rem;
  }
}
</style>
