<script setup>
import { whatsappLink, WHATSAPP } from '../composables/useProducts'
const href = whatsappLink(WHATSAPP.postventa, 'Hola TGMOBILE COL, necesito soporte de garantía / postventa.')
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <h1>Garantía</h1>
        <p>Atención de garantía en horario especial. Conserva tu factura y empaque cuando sea posible.</p>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="container info-grid">
        <div class="info-card">
          <h3>Horario de garantía</h3>
          <p><strong style="color:var(--text)">Lunes a viernes</strong></p>
          <p>9:00 – 12:00</p>
          <p>14:00 – 16:00</p>
          <p style="margin-top:0.75rem;color:var(--text-dim)">Fuera de ese horario: tienda abre L–S 9:00–19:30 · Dom/festivos 9:00–16:30</p>
        </div>
        <div class="info-card">
          <h3>Postventa</h3>
          <p>Escríbenos a la línea de postventa para agendar revisión o seguimiento de tu caso.</p>
          <p style="margin-top:1rem">
            <a class="btn btn-wa btn-sm" :href="href" target="_blank" rel="noopener">WhatsApp postventa</a>
          </p>
        </div>
        <div class="info-card">
          <h3>Recomendaciones</h3>
          <ul>
            <li>Guarda factura y accesorios</li>
            <li>Describe el fallo con claridad</li>
            <li>No abras equipos sellados sin autorización</li>
            <li>Pregunta cobertura según condición (nuevo / semi / usado)</li>
          </ul>
        </div>
        <div class="info-card">
          <h3>Ubicación</h3>
          <p>Santa Marta · Soho Bavaria local 2</p>
          <p style="margin-top:1rem">
            <RouterLink class="btn btn-ghost btn-sm" to="/ubicacion">Cómo llegar</RouterLink>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
