<script setup>
import { WHATSAPP } from '../composables/useProducts'
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <h4>TGMOBILE COL</h4>
        <p style="margin-bottom:0.5rem"><strong style="color:var(--text)">Los mejores con los mejores</strong></p>
        <p>Santa Marta · Soho Bavaria local 2</p>
        <p style="margin-top:0.5rem">Envíos a todo Colombia</p>
      </div>
      <div>
        <h4>Horarios</h4>
        <p>L–S 9:00–19:30</p>
        <p>Dom / festivos 9:00–16:30</p>
        <p style="margin-top:0.5rem">Garantía: L–V 9–12 y 14–16</p>
      </div>
      <div>
        <h4>Contacto</h4>
        <div class="footer-links">
          <a :href="`https://wa.me/${WHATSAPP.ventas}`" target="_blank" rel="noopener">WhatsApp ventas</a>
          <a :href="`https://wa.me/${WHATSAPP.mayoreo}`" target="_blank" rel="noopener">WhatsApp mayoreo</a>
          <a :href="`https://wa.me/${WHATSAPP.postventa}`" target="_blank" rel="noopener">WhatsApp postventa</a>
          <a href="https://instagram.com/tgmobile.col" target="_blank" rel="noopener">IG @tgmobile.col</a>
        </div>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© {{ new Date().getFullYear() }} TGMOBILE COL</span>
      <span>Demo de propuesta web · precios de ejemplo</span>
    </div>
  </footer>
</template>
