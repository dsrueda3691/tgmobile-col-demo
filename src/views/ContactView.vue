<script setup>
import { whatsappLink, WHATSAPP } from '../composables/useProducts'
import ViewHighlights from '../components/ViewHighlights.vue'

const channels = [
  {
    title: 'Ventas',
    phone: WHATSAPP.ventas,
    desc: 'Asesoría de productos, disponibilidad y crédito.',
    href: whatsappLink(WHATSAPP.ventas, 'Hola TGMOBILE COL, quiero asesoría de ventas.'),
    accent: 'ventas'
  },
  {
    title: 'Mayoreo',
    phone: WHATSAPP.mayoreo,
    desc: 'Cotizaciones por volumen y aliados comerciales.',
    href: whatsappLink(WHATSAPP.mayoreo, 'Hola TGMOBILE COL, quiero cotización de mayoreo.'),
    accent: 'mayoreo'
  },
  {
    title: 'Postventa',
    phone: WHATSAPP.postventa,
    desc: 'Garantía, revisiones y seguimiento de tu equipo.',
    href: whatsappLink(WHATSAPP.postventa, 'Hola TGMOBILE COL, necesito postventa / garantía.'),
    accent: 'post'
  }
]
const highlights = [
  { icon: '⌁', value: '3', label: 'Canales especializados' },
  { icon: '24', value: '24 h', label: 'Respuesta ágil' },
  { icon: '◎', value: '@tgmobile.col', label: 'Instagram oficial' }
]
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <span class="page-kicker">HABLA CON NOSOTROS</span>
        <h1>Contacto</h1>
        <p>Tres canales claros. Elige el que necesitas y te respondemos por WhatsApp.</p>
      </div>
    </section>

    <ViewHighlights :items="highlights" />

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="channels-grid">
          <article v-for="c in channels" :key="c.title" class="channel-card" :data-accent="c.accent">
            <div class="channel-top">
              <h3>{{ c.title }}</h3>
              <span class="channel-dot" aria-hidden="true"></span>
            </div>
            <p>{{ c.desc }}</p>
            <div class="channel-phone">+{{ c.phone }}</div>
            <a class="btn btn-wa btn-sm" :href="c.href" target="_blank" rel="noopener">Abrir WhatsApp</a>
          </article>

          <article class="channel-card channel-social">
            <div class="channel-top">
              <h3>Instagram</h3>
            </div>
            <p>Novedades, ofertas y el día a día de la tienda.</p>
            <div class="channel-phone">@tgmobile.col</div>
            <a
              class="btn btn-ghost btn-sm"
              href="https://instagram.com/tgmobile.col"
              target="_blank"
              rel="noopener"
            >Abrir Instagram</a>
          </article>
        </div>

        <p class="contact-note">Envíos a todo Colombia · Santa Marta · Soho Bavaria local 2</p>
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
.channels-grid {
  display: grid;
  gap: 0.85rem;
}
@media (min-width: 640px) {
  .channels-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
.channel-card {
  padding: 1.35rem 1.3rem;
  border: 1px solid var(--border);
  border-radius: 1.15rem;
  background: rgba(255, 255, 255, 0.04);
  display: grid;
  gap: 0.55rem;
  transition: border-color 0.2s, transform 0.2s;
}
.channel-card:hover {
  border-color: #6b7280;
  transform: translateY(-2px);
}
.channel-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.channel-top h3 {
  font-size: 1.05rem;
  letter-spacing: -0.02em;
}
.channel-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: var(--wa);
  box-shadow: 0 0 0 4px rgba(37, 211, 102, 0.15);
}
.channel-card[data-accent='mayoreo'] .channel-dot {
  background: var(--warning);
  box-shadow: 0 0 0 4px rgba(240, 180, 41, 0.15);
}
.channel-card[data-accent='post'] .channel-dot {
  background: #60a5fa;
  box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.15);
}
.channel-card p {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.45;
}
.channel-phone {
  font-size: 0.8rem;
  color: var(--text-dim);
  font-variant-numeric: tabular-nums;
}
.channel-card .btn {
  margin-top: 0.35rem;
  justify-self: start;
}
.channel-social .channel-dot {
  display: none;
}
.contact-note {
  margin-top: 1.5rem;
  text-align: center;
  color: var(--text-dim);
  font-size: 0.8rem;
}
</style>
