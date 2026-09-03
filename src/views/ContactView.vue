<script setup>
import { whatsappLink, WHATSAPP } from '../composables/useProducts'

const channels = [
  {
    title: 'Ventas',
    phone: WHATSAPP.ventas,
    desc: 'Asesoría de productos, disponibilidad y crédito.',
    href: whatsappLink(WHATSAPP.ventas, 'Hola TGMOBILE COL, quiero asesoría de ventas.')
  },
  {
    title: 'Mayoreo',
    phone: WHATSAPP.mayoreo,
    desc: 'Cotizaciones por volumen y aliados comerciales.',
    href: whatsappLink(WHATSAPP.mayoreo, 'Hola TGMOBILE COL, quiero cotización de mayoreo.')
  },
  {
    title: 'Postventa',
    phone: WHATSAPP.postventa,
    desc: 'Garantía, revisiones y seguimiento.',
    href: whatsappLink(WHATSAPP.postventa, 'Hola TGMOBILE COL, necesito postventa / garantía.')
  }
]
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <h1>Contacto</h1>
        <p>Escríbenos por WhatsApp o síguenos en Instagram. Envíos a todo Colombia.</p>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="container info-grid">
        <div v-for="c in channels" :key="c.title" class="info-card">
          <h3>{{ c.title }}</h3>
          <p>{{ c.desc }}</p>
          <p style="margin:0.75rem 0;color:var(--text-dim)">wa.me/{{ c.phone }}</p>
          <a class="btn btn-wa btn-sm" :href="c.href" target="_blank" rel="noopener">Abrir WhatsApp</a>
        </div>
        <div class="info-card">
          <h3>Redes</h3>
          <p>Instagram oficial</p>
          <p style="margin:0.75rem 0"><strong style="color:var(--text)">@tgmobile.col</strong></p>
          <a class="btn btn-ghost btn-sm" href="https://instagram.com/tgmobile.col" target="_blank" rel="noopener">Abrir Instagram</a>
        </div>
      </div>
    </section>
  </div>
</template>
