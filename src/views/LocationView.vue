<script setup>
import ViewHighlights from '../components/ViewHighlights.vue'

const highlights = [
  { icon: '⌖', value: 'Local 2', label: 'Soho Bavaria' },
  { icon: '09–19', value: 'L–S', label: 'Horario de tienda' },
  { icon: '▣', value: 'Colombia', label: 'Envíos nacionales' }
]
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <span class="page-kicker">SANTA MARTA</span>
        <h1>Ubicación</h1>
        <p>Visítanos en Soho Bavaria. También hacemos envíos a todo Colombia.</p>
        <div class="hero-cta">
          <a
            class="btn btn-primary"
            href="https://www.google.com/maps/search/?api=1&query=Soho+Bavaria+Santa+Marta"
            target="_blank"
            rel="noopener"
          >Abrir en Maps</a>
          <RouterLink class="btn btn-ghost" to="/contacto">Contacto</RouterLink>
        </div>
      </div>
    </section>

    <ViewHighlights :items="highlights" />

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="location-grid">
          <article class="info-card">
            <h3>Tienda</h3>
            <p class="store-name">TGMOBILE COL</p>
            <p>Soho Bavaria · Local 2</p>
            <p>Santa Marta, Colombia</p>
            <p class="store-slogan">Los mejores con los mejores</p>
          </article>

          <article class="info-card">
            <h3>Horarios</h3>
            <ul class="hours-list">
              <li><span>Lunes a sábado</span><strong>9:00 – 19:30</strong></li>
              <li><span>Domingos y festivos</span><strong>9:00 – 16:30</strong></li>
              <li><span>Garantía (L–V)</span><strong>9–12 · 14–16</strong></li>
            </ul>
          </article>

          <article class="info-card map-card">
            <h3>Cómo llegar</h3>
            <p>Busca “Soho Bavaria Santa Marta” en Google Maps o Waze.</p>
            <div class="map-placeholder">
              <div class="map-inner">
                <span class="map-pin">📍</span>
                <strong>Soho Bavaria · Local 2</strong>
                <span>Santa Marta</span>
                <a
                  class="btn btn-primary btn-sm"
                  href="https://www.google.com/maps/search/?api=1&query=Soho+Bavaria+Santa+Marta"
                  target="_blank"
                  rel="noopener"
                >Abrir en Maps</a>
              </div>
            </div>
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
.location-grid {
  display: grid;
  gap: 0.85rem;
}
@media (min-width: 700px) {
  .location-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .map-card {
    grid-column: 1 / -1;
  }
}
.store-name {
  color: var(--text);
  font-weight: 700;
  font-size: 1.05rem;
  margin: 0.5rem 0 0.25rem;
}
.store-slogan {
  margin-top: 0.85rem;
  color: var(--text-dim);
  font-style: italic;
  font-size: 0.9rem;
}
.hours-list {
  display: grid;
  gap: 0.65rem;
  margin-top: 0.75rem;
}
.hours-list li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.55rem;
  border-bottom: 1px solid var(--border-soft);
  font-size: 0.9rem;
}
.hours-list li:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}
.hours-list span {
  color: var(--text-muted);
}
.hours-list strong {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.map-placeholder {
  margin-top: 1rem;
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid var(--border);
  aspect-ratio: 16 / 9;
  background: linear-gradient(160deg, #393d42, #2c3034);
  display: grid;
  place-items: center;
}
.map-inner {
  display: grid;
  gap: 0.35rem;
  justify-items: center;
  text-align: center;
  padding: 1.5rem;
}
.map-pin {
  font-size: 1.6rem;
}
.map-inner strong {
  font-size: 1rem;
}
.map-inner span {
  color: var(--text-muted);
  font-size: 0.9rem;
}
.map-inner .btn {
  margin-top: 0.75rem;
}
</style>
