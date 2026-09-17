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

<style scoped>
.site-footer { margin-top: auto; padding: 2.5rem 0 2rem; overflow: hidden; border-top: 1px solid var(--border-soft); background: linear-gradient(180deg, #25282d, #0b0c0e); }.footer-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }.site-footer h4 { margin-bottom: .75rem; color: var(--text-muted); font-size: .85rem; letter-spacing: .08em; text-transform: uppercase; }.site-footer p, .site-footer a { color: var(--text-muted); font-size: .9rem; }.footer-links { display: grid; gap: .4rem; }.footer-bottom { display: flex; flex-wrap: wrap; justify-content: space-between; gap: .75rem; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border-soft); color: var(--text-dim); font-size: .8rem; }
@media (min-width: 700px) { .footer-grid { grid-template-columns: 1.4fr 1fr 1fr; } }
</style>
