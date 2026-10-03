<script setup>
import { whatsappLink, WHATSAPP } from '../composables/useProducts'
import ViewHighlights from '../components/ViewHighlights.vue'

const href = whatsappLink(WHATSAPP.postventa, 'Hola TGMOBILE COL, necesito soporte de garantía / postventa.')
const highlights = [
  { icon: '✓', value: 'Respaldo', label: 'Acompañamiento real' },
  { icon: '09–16', value: 'L–V', label: 'Horario garantía' },
  { icon: '⌁', value: 'Directo', label: 'Canal postventa' }
]
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <span class="page-kicker">RESPALDO</span>
        <h1>Garantía</h1>
        <p>Atención de garantía en horario especial. Conserva tu factura y empaque cuando sea posible.</p>
        <div class="hero-cta">
          <a class="btn btn-wa" :href="href" target="_blank" rel="noopener">WhatsApp postventa</a>
          <RouterLink class="btn btn-ghost" to="/ubicacion">Cómo llegar</RouterLink>
        </div>
      </div>
    </section>

    <ViewHighlights :items="highlights" />

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="warranty-grid">
          <article class="info-card schedule-card">
            <h3>Horario de garantía</h3>
            <div class="schedule-block">
              <strong>Lunes a viernes</strong>
              <span>9:00 – 12:00</span>
              <span>14:00 – 16:00</span>
            </div>
            <p class="schedule-note">Fuera de ese horario: tienda abre L–S 9:00–19:30 · Dom/festivos 9:00–16:30</p>
          </article>

          <article class="info-card">
            <h3>Recomendaciones</h3>
            <ul class="check-list">
              <li>Guarda factura y accesorios</li>
              <li>Describe el fallo con claridad</li>
              <li>No abras equipos sellados sin autorización</li>
              <li>Pregunta cobertura según condición (nuevo / semi / usado)</li>
            </ul>
          </article>

          <article class="info-card full">
            <h3>Postventa</h3>
            <p>Escríbenos a la línea de postventa para agendar revisión o seguimiento de tu caso. Te acompañamos de forma directa.</p>
            <a class="btn btn-wa btn-sm" style="margin-top:1rem" :href="href" target="_blank" rel="noopener">Abrir canal postventa</a>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-kicker {
  display: inline-block;
  margin-bottom: 0.6rem;
  color: var(--warning);
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.14em;
}
.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.25rem;
}
.warranty-grid {
  display: grid;
  gap: 0.85rem;
}
@media (min-width: 700px) {
  .warranty-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .full {
    grid-column: 1 / -1;
  }
}
.schedule-block {
  display: grid;
  gap: 0.2rem;
  margin: 0.85rem 0 0.75rem;
}
.schedule-block strong {
  color: var(--text);
  font-size: 1rem;
}
.schedule-block span {
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}
.schedule-note {
  color: var(--text-dim);
  font-size: 0.82rem;
  line-height: 1.4;
}
.check-list {
  display: grid;
  gap: 0.45rem;
  margin-top: 0.75rem;
}
.check-list li {
  position: relative;
  padding-left: 1.25rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}
.check-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--success);
  font-weight: 700;
}
</style>
