<script setup>
import CampaignBanner from '../components/CampaignBanner.vue'
import CategoryGrid from '../components/CategoryGrid.vue'
import ProductCard from '../components/ProductCard.vue'
import ProductImage from '../components/ProductImage.vue'
import IOSWorkspace from '../components/IOSWorkspace.vue'
import RevealBlock from '../components/RevealBlock.vue'
import { useProducts, formatCOP, assetUrl } from '../composables/useProducts'

const { featured, remates, dailyDeals, all } = useProducts()

const newArrivals = all.value.filter((p) => p.inStock && p.condition === 'nuevo').slice(0, 4)
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

    <section class="section categories-section">
      <div class="container">
        <RevealBlock>
          <div class="section-head">
            <div>
              <span class="section-kicker">Elige tu próximo equipo</span>
              <h2>Compra por categoría</h2>
              <p>Todo lo que necesitas, en un solo lugar.</p>
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
              <span class="section-kicker">Selección TGMOBILE</span>
              <h2>Los favoritos de la semana</h2>
              <p>Equipos que están llamando la atención.</p>
            </div>
            <RouterLink class="btn btn-ghost btn-sm" to="/catalogo">Ver todos <span>→</span></RouterLink>
          </div>
          <div class="product-grid">
            <ProductCard v-for="p in featured.slice(0, 6)" :key="p.id" :product="p" />
          </div>
        </RevealBlock>
      </div>
    </section>

    <section class="section new-arrivals-section" v-if="newArrivals.length">
      <div class="container">
        <RevealBlock>
          <div class="section-head arrivals-head">
            <div>
              <span class="section-kicker">Recién llegados</span>
              <h2>Lo nuevo ya está aquí</h2>
            </div>
            <RouterLink class="text-link" to="/catalogo">Ver catálogo <span>→</span></RouterLink>
          </div>

          <div class="arrivals-scroller" role="list">
            <RouterLink
              v-for="(p, index) in newArrivals"
              :key="p.id"
              class="arrival-card"
              role="listitem"
              :to="`/producto/${p.id}`"
              :style="{ '--i': index }"
            >
              <span class="arrival-index">{{ String(index + 1).padStart(2, '0') }}</span>
              <div class="arrival-media">
                <ProductImage :src="p.image" :alt="p.name" loading="lazy" />
              </div>
              <div class="arrival-body">
                <small>{{ p.brand }} · {{ p.storage || 'Nuevo' }}</small>
                <strong>{{ p.name }}</strong>
                <b>{{ formatCOP(p.price) }}</b>
              </div>
            </RouterLink>
          </div>
        </RevealBlock>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <RevealBlock>
          <div class="section-head">
            <div>
              <span class="section-kicker">Precio especial</span>
              <h2>Ofertas y remates</h2>
              <p>Oportunidades que no se quedan mucho tiempo.</p>
            </div>
            <RouterLink class="btn btn-ghost btn-sm" :to="{ path: '/catalogo', query: { tags: 'remate,oferta' } }">Ver remates <span>→</span></RouterLink>
          </div>
          <div class="product-grid">
            <ProductCard v-for="p in remates.slice(0, 6)" :key="p.id" :product="p" />
          </div>
        </RevealBlock>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-premium {
  min-height: 640px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.hero-showcase {
  min-height: 500px;
}
.hero-showcase .smart-image {
  width: 88%;
  height: 320px;
}
.hero-showcase .showcase-copy {
  margin-top: 0.5rem;
}
.section + .section {
  border-top: 1px solid rgba(255, 255, 255, 0.045);
}

/* Announcement — dark iOS (overrides global light theme) */
.announcement-section {
  background: transparent !important;
  color: var(--text) !important;
}
.announcement-grid {
  display: grid;
  gap: 2rem;
  align-items: start;
}
@media (min-width: 900px) {
  .announcement-grid {
    grid-template-columns: 0.9fr 1.1fr;
    gap: 3.5rem;
    align-items: center;
  }
}
.announcement-copy .section-kicker {
  color: var(--text-dim) !important;
}
.announcement-copy h2 {
  margin: 0.55rem 0 0.9rem;
  font-size: clamp(1.85rem, 4.5vw, 3.2rem);
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: var(--text);
}
.announcement-copy h2 em {
  font-style: normal;
  color: rgba(242, 243, 245, 0.45);
}
.announcement-copy p {
  max-width: 28rem;
  color: var(--text-muted) !important;
  margin-bottom: 1.25rem;
  line-height: 1.55;
}
.announcement-copy .text-link {
  color: var(--text) !important;
  font-size: 0.85rem;
  font-weight: 650;
}
.announcement-list article {
  display: grid;
  grid-template-columns: 2.25rem 1fr auto;
  align-items: start;
  gap: 0.85rem;
  padding: 1.15rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
}
.announcement-list article:first-child {
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
}
.announcement-number {
  color: var(--warning) !important;
  font-size: 0.7rem;
  font-weight: 700;
  padding-top: 0.2rem;
}
.announcement-list strong {
  font-size: 1rem;
  color: var(--text);
}
.announcement-list p {
  color: var(--text-muted) !important;
  font-size: 0.82rem;
  margin-top: 0.2rem;
  line-height: 1.4;
}
.announcement-arrow {
  color: rgba(242, 243, 245, 0.35) !important;
}

.categories-section {
  background: transparent;
}

/* New arrivals — horizontal iOS cards */
.new-arrivals-section {
  background: linear-gradient(180deg, rgba(20, 22, 26, 0.65), transparent) !important;
  padding-bottom: 2.5rem;
}
.arrivals-head {
  margin-bottom: 1rem;
}
.arrivals-scroller {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding: 0.25rem 0.1rem 1rem;
  margin: 0 -0.15rem;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.arrivals-scroller::-webkit-scrollbar {
  display: none;
}

.arrival-card {
  scroll-snap-align: start;
  flex: 0 0 min(78vw, 280px);
  display: flex !important;
  flex-direction: column;
  grid-template-columns: none !important;
  gap: 0.75rem;
  padding: 0.85rem !important;
  border-radius: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  transition:
    transform 0.4s cubic-bezier(0.32, 0.72, 0, 1),
    background 0.25s ease,
    border-color 0.25s ease;
  animation: arrival-in 0.55s cubic-bezier(0.32, 0.72, 0, 1) both;
  animation-delay: calc(var(--i, 0) * 60ms);
}
.arrival-card:active {
  transform: scale(0.97);
}
.arrival-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.09) !important;
  border-color: rgba(255, 255, 255, 0.14);
}

.arrival-index {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgba(242, 243, 245, 0.4);
}

.arrival-media {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: 0.9rem;
  overflow: hidden;
  background: linear-gradient(160deg, #3a3f46, #2a2e34);
}
.arrival-media :deep(.smart-image) {
  width: 100%;
  height: 100%;
}
.arrival-media :deep(.smart-image img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
}
.arrival-media :deep(.image-corner) {
  display: none;
}

.arrival-body {
  display: grid;
  gap: 0.2rem;
  min-width: 0;
  padding: 0 0.15rem 0.15rem;
  grid-column: auto !important;
}
.arrival-body small {
  color: rgba(242, 243, 245, 0.5);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.arrival-body strong {
  font-size: 0.92rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.arrival-body b {
  margin-top: 0.25rem;
  font-size: 1rem;
  font-weight: 700;
  color: #f0b429;
}

@keyframes arrival-in {
  from {
    opacity: 0;
    transform: translateX(18px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (min-width: 900px) {
  .hero-premium {
    padding-bottom: 3.5rem;
  }
  .hero-showcase {
    min-height: 560px;
  }
  .hero-showcase .smart-image {
    height: 360px;
  }
  .arrival-card {
    flex-basis: 240px;
  }
}

@media (max-width: 899px) {
  .hero-premium {
    min-height: auto;
    padding-top: 2rem;
  }
  .hero-showcase {
    min-height: 390px;
  }
  .hero-showcase .smart-image {
    width: 90%;
    height: 220px;
  }
}

@media (max-width: 520px) {
  .hero-showcase {
    min-height: 340px;
  }
  .hero-showcase .smart-image {
    height: 175px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .arrival-card {
    animation: none;
  }
}
</style>
