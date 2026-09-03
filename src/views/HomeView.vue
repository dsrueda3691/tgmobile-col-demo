<script setup>
import CampaignBanner from '../components/CampaignBanner.vue'
import CategoryGrid from '../components/CategoryGrid.vue'
import ProductCard from '../components/ProductCard.vue'
import RevealBlock from '../components/RevealBlock.vue'
import { useProducts, formatCOP } from '../composables/useProducts'

const { featured, remates, dailyDeals } = useProducts()

const dealTag = (p) => {
  const tags = p.tags || []
  if (tags.includes('oferta-dia')) return 'Oferta del día'
  if (tags.includes('remate') || p.season === 'remate') return 'Remate'
  if (tags.includes('oferta-mes')) return 'Oferta del mes'
  return 'Oferta'
}
</script>

<template>
  <div>
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <div class="hero-brand-row">
            <img class="hero-logo" src="/images/logo.png" alt="TGMOBILE COL" width="68" height="68" />
            <div class="hero-kicker" style="margin-bottom:0">Santa Marta · Soho Bavaria local 2</div>
          </div>
          <h1>TGMOBILE COL</h1>
          <p class="hero-slogan">Los mejores con los mejores</p>
          <p>
            iPhone, Android, iPad, MacBook y accesorios. Nuevos, seminuevos y usados con
            asesoría real, crédito y envíos a todo Colombia.
          </p>
          <div class="hero-actions">
            <RouterLink class="btn btn-primary" to="/catalogo">Ver catálogo</RouterLink>
            <RouterLink class="btn btn-ghost" to="/contacto">Hablar por WhatsApp</RouterLink>
          </div>

          <div class="daily-deals" v-if="dailyDeals.length">
            <div class="daily-deals-head">
              <h2><span class="dot" aria-hidden="true"></span> Ofertas del día</h2>
              <RouterLink :to="{ path: '/catalogo', query: { tags: 'oferta-dia,remate,oferta' } }">
                Ver remates →
              </RouterLink>
            </div>
            <div class="daily-deals-scroller" role="list">
              <RouterLink
                v-for="p in dailyDeals.slice(0, 4)"
                :key="p.id"
                class="deal-chip"
                role="listitem"
                :to="`/producto/${p.id}`"
              >
                <img :src="p.image" :alt="p.name" width="240" height="160" loading="lazy" />
                <div class="deal-chip-body">
                  <div class="deal-chip-tag">{{ dealTag(p) }}</div>
                  <div class="deal-chip-name">{{ p.name }}</div>
                  <div class="deal-chip-price">{{ formatCOP(p.price) }}</div>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="hero-card">
          <h3>Info rápida</h3>
          <div class="hero-meta">
            <div><span>Horario</span><strong>L–S 9:00–19:30</strong></div>
            <div><span>Dom / festivos</span><strong>9:00–16:30</strong></div>
            <div><span>Garantía</span><strong>L–V 9–12 y 14–16</strong></div>
            <div><span>Instagram</span><strong>@tgmobile.col</strong></div>
            <div><span>Envíos</span><strong>Todo Colombia</strong></div>
          </div>
        </div>
      </div>
    </section>

    <CampaignBanner />

    <section class="section">
      <div class="container">
        <RevealBlock>
          <div class="section-head">
            <div>
              <h2>Explora por sección</h2>
              <p>Las secciones se actualizan solas al editar el JSON de productos.</p>
            </div>
          </div>
          <CategoryGrid />
        </RevealBlock>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <RevealBlock>
          <div class="section-head">
            <div>
              <h2>Destacados</h2>
              <p>Selección featured del catálogo · precios de ejemplo</p>
            </div>
            <RouterLink class="btn btn-ghost btn-sm" to="/catalogo">Ver todos</RouterLink>
          </div>
          <div class="product-grid">
            <ProductCard v-for="p in featured.slice(0, 6)" :key="p.id" :product="p" />
          </div>
        </RevealBlock>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <RevealBlock>
          <div class="section-head">
            <div>
              <h2>Ofertas y remates</h2>
              <p>Productos con tags de oferta/remate o campaña activa</p>
            </div>
            <RouterLink class="btn btn-ghost btn-sm" :to="{ path: '/catalogo', query: { tags: 'remate,oferta' } }">
              Ver remates
            </RouterLink>
          </div>
          <div class="product-grid">
            <ProductCard v-for="p in remates.slice(0, 6)" :key="p.id" :product="p" />
          </div>
        </RevealBlock>
      </div>
    </section>
  </div>
</template>
