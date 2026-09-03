<script setup>
import { whatsappLink, WHATSAPP } from '../composables/useProducts'
const href = whatsappLink(WHATSAPP.ventas, 'Hola TGMOBILE COL, quiero información sobre crédito / financiamiento.')
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <h1>Crédito</h1>
        <p>Facilitamos la compra de tu equipo con opciones de financiamiento. Consulta disponibilidad según producto y perfil.</p>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="container info-grid">
        <div class="info-card">
          <h3>Cómo funciona</h3>
          <ul>
            <li>Elige el equipo en el catálogo</li>
            <li>Escríbenos por WhatsApp ventas</li>
            <li>Te orientamos con cuotas y requisitos</li>
            <li>Retiro en tienda o envío a tu ciudad</li>
          </ul>
        </div>
        <div class="info-card">
          <h3>Qué tener a la mano</h3>
          <ul>
            <li>Documento de identidad</li>
            <li>Datos de contacto</li>
            <li>Producto de interés</li>
            <li>Ciudad de envío (si aplica)</li>
          </ul>
        </div>
        <div class="info-card">
          <h3>Mayoreo</h3>
          <p>¿Compras por volumen? Escríbenos a la línea de mayoreo para cotización especial.</p>
          <p style="margin-top:1rem">
            <a class="btn btn-ghost btn-sm" :href="`https://wa.me/${WHATSAPP.mayoreo}`" target="_blank" rel="noopener">WhatsApp mayoreo</a>
          </p>
        </div>
        <div class="info-card">
          <h3>Asesoría</h3>
          <p>Los mejores con los mejores: te ayudamos a elegir según presupuesto y uso.</p>
          <p style="margin-top:1rem">
            <a class="btn btn-wa btn-sm" :href="href" target="_blank" rel="noopener">Pedir info de crédito</a>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
