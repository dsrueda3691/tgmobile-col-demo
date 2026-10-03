<script setup>
import { whatsappLink, WHATSAPP } from '../composables/useProducts'
import ViewHighlights from '../components/ViewHighlights.vue'

const href = whatsappLink(WHATSAPP.ventas, 'Hola TGMOBILE COL, quiero información sobre crédito / financiamiento.')
const highlights = [
  { icon: '↗', value: 'Hoy', label: 'Puedes iniciar' },
  { icon: '⌁', value: '24 h', label: 'Respuesta WhatsApp' },
  { icon: '✓', value: 'Simple', label: 'Proceso acompañado' }
]
const steps = [
  { n: '01', title: 'Elige tu equipo', text: 'Explora el catálogo y selecciona el producto que te interesa.' },
  { n: '02', title: 'Escríbenos', text: 'Contacta ventas por WhatsApp con el modelo y tu ciudad.' },
  { n: '03', title: 'Te orientamos', text: 'Te explicamos cuotas, requisitos y opciones disponibles.' },
  { n: '04', title: 'Recibe o retira', text: 'Retiro en tienda (Santa Marta) o envío a tu ciudad.' }
]
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <span class="page-kicker">FINANCIAMIENTO</span>
        <h1>Compra a crédito</h1>
        <p>Facilitamos tu próximo equipo con opciones de financiamiento. Consulta disponibilidad según producto y perfil.</p>
        <div class="hero-cta">
          <a class="btn btn-wa" :href="href" target="_blank" rel="noopener">Pedir info de crédito</a>
          <RouterLink class="btn btn-ghost" to="/catalogo">Ver catálogo</RouterLink>
        </div>
      </div>
    </section>

    <ViewHighlights :items="highlights" />

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="section-kicker">Proceso</span>
            <h2>Cómo funciona</h2>
          </div>
        </div>
        <div class="steps-grid">
          <article v-for="s in steps" :key="s.n" class="step-card">
            <span class="step-n">{{ s.n }}</span>
            <strong>{{ s.title }}</strong>
            <p>{{ s.text }}</p>
          </article>
        </div>

        <div class="info-grid credit-extra">
          <div class="info-card">
            <h3>Qué tener a la mano</h3>
            <ul class="check-list">
              <li>Documento de identidad</li>
              <li>Datos de contacto</li>
              <li>Producto de interés</li>
              <li>Ciudad de envío (si aplica)</li>
            </ul>
          </div>
          <div class="info-card">
            <h3>Mayoreo</h3>
            <p>¿Compras por volumen? Línea dedicada para cotizaciones especiales y aliados.</p>
            <a
              class="btn btn-ghost btn-sm"
              style="margin-top:1rem"
              :href="`https://wa.me/${WHATSAPP.mayoreo}`"
              target="_blank"
              rel="noopener"
            >WhatsApp mayoreo</a>
          </div>
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
.section-kicker {
  display: block;
  margin-bottom: 0.35rem;
  color: var(--text-dim);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.steps-grid {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
@media (min-width: 640px) {
  .steps-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 1000px) {
  .steps-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
.step-card {
  padding: 1.15rem 1.2rem;
  border: 1px solid var(--border);
  border-radius: 1.1rem;
  background: rgba(255, 255, 255, 0.04);
  display: grid;
  gap: 0.35rem;
}
.step-n {
  color: var(--warning);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}
.step-card strong {
  font-size: 0.95rem;
}
.step-card p {
  color: var(--text-muted);
  font-size: 0.85rem;
  line-height: 1.45;
}
.credit-extra {
  margin-top: 0.5rem;
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
