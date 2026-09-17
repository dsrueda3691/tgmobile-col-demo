<script setup>
import CampaignBanner from '../components/CampaignBanner.vue'
import CategoryGrid from '../components/CategoryGrid.vue'
import ProductCard from '../components/ProductCard.vue'
import ProductImage from '../components/ProductImage.vue'
import IOSWorkspace from '../components/IOSWorkspace.vue'
import RevealBlock from '../components/RevealBlock.vue'
import { useProducts, formatCOP, assetUrl } from '../composables/useProducts'

const { featured, remates, dailyDeals, all } = useProducts()

const newArrivals = all.value.filter((p) => p.inStock && p.condition === 'nuevo').slice(0, 3)
const stats = [
  { value: '100%', label: 'equipos revisados' },
  { value: '24 h', label: 'respuesta por WhatsApp' },
  { value: '32', label: 'departamentos con envíos' }
]

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
    <IOSWorkspace />
    <section class="hero hero-premium">
      <div class="container hero-grid">
        <div>
          <div class="hero-brand-row">
            <img class="hero-logo" :src="assetUrl('/images/logo.png')" alt="TGMOBILE COL" width="68" height="68" />
            <div class="hero-kicker" style="margin-bottom:0">Santa Marta · Soho Bavaria local 2</div>
          </div>
          <div class="hero-eyebrow"><span></span> Tecnología que sí se siente</div>
          <h1>Tu próximo <em>upgrade</em> empieza aquí.</h1>
          <p class="hero-slogan">Los mejores con los mejores</p>
          <p>
            iPhone, Android, iPad, MacBook y accesorios seleccionados. Compra con asesoría real,
            opciones de crédito y envíos a todo Colombia.
          </p>
          <div class="hero-actions">
            <RouterLink class="btn btn-primary" to="/catalogo">Explorar catálogo <span>↗</span></RouterLink>
            <RouterLink class="btn btn-ghost" to="/contacto">Quiero asesoría</RouterLink>
          </div>

          <div class="hero-proof">
            <div class="avatar-stack"><span>✦</span><span>✓</span><span>+</span></div>
            <span>La tienda de tecnología de<br /><strong>Santa Marta para Colombia</strong></span>
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
                <ProductImage :src="p.image" :alt="p.name" loading="lazy" />
                <div class="deal-chip-body">
                  <div class="deal-chip-tag">{{ dealTag(p) }}</div>
                  <div class="deal-chip-name">{{ p.name }}</div>
                  <div class="deal-chip-price">{{ formatCOP(p.price) }}</div>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="hero-card hero-showcase">
          <div class="showcase-glow"></div>
          <div class="showcase-label"><span class="live-dot"></span> Disponible hoy</div>
          <ProductImage :src="dailyDeals[0]?.image || '/images/logo.png'" :alt="dailyDeals[0]?.name || 'TGMOBILE COL'" loading="eager" />
          <div class="showcase-copy" v-if="dailyDeals[0]">
            <small>Oferta destacada</small>
            <strong>{{ dailyDeals[0].name }}</strong>
            <span>{{ formatCOP(dailyDeals[0].price) }}</span>
          </div>
          <RouterLink class="showcase-link" :to="dailyDeals[0] ? `/producto/${dailyDeals[0].id}` : '/catalogo'">Ver producto <span>→</span></RouterLink>
        </div>
      </div>
      <div class="container hero-stats">
        <div v-for="stat in stats" :key="stat.label" class="hero-stat">
          <strong>{{ stat.value }}</strong><span>{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <section class="intent-strip">
      <div class="container intent-grid">
        <RouterLink class="intent-card intent-sale" :to="{ path: '/catalogo', query: { tags: 'remate,oferta' } }">
          <span class="intent-icon">%</span><span><strong>Ofertas relámpago</strong><small>Precios que vuelan</small></span><b>→</b>
        </RouterLink>
        <RouterLink class="intent-card intent-new" to="/catalogo">
          <span class="intent-icon">✦</span><span><strong>Recién llegados</strong><small>Lo último en tecnología</small></span><b>→</b>
        </RouterLink>
        <RouterLink class="intent-card intent-credit" to="/credito">
          <span class="intent-icon">↗</span><span><strong>Compra a crédito</strong><small>Tu equipo, hoy</small></span><b>→</b>
        </RouterLink>
      </div>
    </section>

    <section class="section announcement-section">
      <div class="container announcement-grid">
        <div class="announcement-copy">
          <span class="section-kicker">Lo que está pasando</span>
          <h2>Más que una tienda.<br /><em>Tu centro tech.</em></h2>
          <p>Encuentra el equipo que va contigo, conoce nuestras novedades y recibe acompañamiento antes, durante y después de comprar.</p>
          <RouterLink class="text-link" to="/contacto">Conoce la experiencia TGMOBILE <span>↗</span></RouterLink>
        </div>
        <div class="announcement-list">
          <article><span class="announcement-number">01</span><div><strong>Preventa exclusiva</strong><p>Reserva los lanzamientos antes de que lleguen a vitrina.</p></div><span class="announcement-arrow">↗</span></article>
          <article><span class="announcement-number">02</span><div><strong>Seminuevos con criterio</strong><p>Equipos seleccionados y revisados para comprar tranquilo.</p></div><span class="announcement-arrow">↗</span></article>
          <article><span class="announcement-number">03</span><div><strong>Asesoría que entiende</strong><p>Te ayudamos a elegir por uso, presupuesto y estilo de vida.</p></div><span class="announcement-arrow">↗</span></article>
        </div>
      </div>
    </section>

    <CampaignBanner />

    <section class="section section-light">
      <div class="container">
        <RevealBlock>
          <div class="section-head">
            <div><span class="section-kicker">Elige tu próximo equipo</span><h2>Compra por categoría</h2><p>Todo lo que necesitas, en un solo lugar.</p></div>
          </div>
          <CategoryGrid />
        </RevealBlock>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <RevealBlock>
          <div class="section-head"><div><span class="section-kicker">Selección TGMOBILE</span><h2>Los favoritos de la semana</h2><p>Equipos que están llamando la atención.</p></div><RouterLink class="btn btn-ghost btn-sm" to="/catalogo">Ver todos <span>→</span></RouterLink></div>
          <div class="product-grid"><ProductCard v-for="p in featured.slice(0, 6)" :key="p.id" :product="p" /></div>
        </RevealBlock>
      </div>
    </section>

    <section class="section new-arrivals-section" v-if="newArrivals.length">
      <div class="container">
        <RevealBlock>
          <div class="section-head"><div><span class="section-kicker">Recién llegados</span><h2>Lo nuevo ya está aquí</h2></div><RouterLink class="text-link" to="/catalogo">Ver catálogo <span>→</span></RouterLink></div>
          <div class="new-arrivals-grid">
            <RouterLink v-for="(p, index) in newArrivals" :key="p.id" class="arrival-card" :to="`/producto/${p.id}`">
              <span>0{{ index + 1 }}</span><ProductImage :src="p.image" :alt="p.name" loading="lazy" /><div><small>{{ p.brand }} · {{ p.storage || 'Nuevo' }}</small><strong>{{ p.name }}</strong><b>{{ formatCOP(p.price) }}</b></div>
            </RouterLink>
          </div>
        </RevealBlock>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <RevealBlock>
          <div class="section-head"><div><span class="section-kicker">Precio especial</span><h2>Ofertas y remates</h2><p>Oportunidades que no se quedan mucho tiempo.</p></div><RouterLink class="btn btn-ghost btn-sm" :to="{ path: '/catalogo', query: { tags: 'remate,oferta' } }">Ver remates <span>→</span></RouterLink></div>
          <div class="product-grid"><ProductCard v-for="p in remates.slice(0, 6)" :key="p.id" :product="p" /></div>
        </RevealBlock>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-premium { min-height: 640px; display: flex; flex-direction: column; justify-content: center; }.hero-showcase { min-height: 500px; }.hero-showcase .smart-image { width: 88%; height: 320px; }.hero-showcase .showcase-copy { margin-top: .5rem; }.section + .section { border-top: 1px solid rgba(255,255,255,.045); }.new-arrivals-grid { gap: 1px; }.catalog-products { animation: home-section-in .55s both; }
@keyframes home-section-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@media (min-width: 900px) { .hero-premium { padding-bottom: 3.5rem; }.hero-showcase { min-height: 560px; }.hero-showcase .smart-image { height: 360px; } }
@media (max-width: 899px) { .hero-premium { min-height: auto; padding-top: 2rem; }.hero-showcase { min-height: 390px; }.hero-showcase .smart-image { width: 90%; height: 220px; } }
@media (max-width: 520px) { .hero-showcase { min-height: 340px; }.hero-showcase .smart-image { height: 175px; } }
</style>
