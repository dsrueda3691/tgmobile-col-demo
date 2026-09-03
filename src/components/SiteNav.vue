<script setup>
defineProps({ menuOpen: Boolean })
defineEmits(['toggle'])

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/credito', label: 'Crédito' },
  { to: '/garantia', label: 'Garantía' },
  { to: '/ubicacion', label: 'Ubicación' },
  { to: '/contacto', label: 'Contacto' }
]
</script>

<template>
  <header class="site-nav">
    <div class="container nav-inner">
      <RouterLink to="/" class="logo" aria-label="TGMOBILE COL">
        <img class="logo-img" src="/images/logo.png" alt="" width="40" height="40" />
        <span class="logo-text">
          <span class="logo-mark">TGMOBILE COL</span>
          <span class="logo-slogan">Los mejores con los mejores</span>
        </span>
      </RouterLink>

      <nav class="nav-links" aria-label="Principal">
        <RouterLink v-for="l in links" :key="l.to" :to="l.to">{{ l.label }}</RouterLink>
      </nav>

      <button class="nav-toggle" type="button" aria-label="Menú" @click="$emit('toggle')">
        {{ menuOpen ? 'Cerrar' : 'Menú' }}
      </button>
    </div>

    <div class="mobile-menu" :class="{ open: menuOpen }">
      <div class="container">
        <RouterLink v-for="l in links" :key="l.to" :to="l.to">{{ l.label }}</RouterLink>
      </div>
    </div>
  </header>
</template>
