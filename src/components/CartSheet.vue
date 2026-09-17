<script setup>
import { computed } from "vue";
import { useCart } from "../composables/useCart";
import { cartSalesWhatsApp, formatCOP } from "../composables/useProducts";
import ProductImage from "./ProductImage.vue";

const { items, count, total, isOpen, close, remove } = useCart();
const whatsappHref = computed(() => cartSalesWhatsApp(items.value, total.value));
</script>

<template>
  <Transition name="cart-backdrop">
    <div v-if="isOpen" class="cart-layer" @click.self="close">
      <Transition name="cart-sheet" appear>
        <aside v-if="isOpen" class="cart-sheet" aria-label="Bolsa de compra">
          <div class="cart-grabber"></div>
          <header class="cart-header">
            <div>
              <span class="cart-eyebrow">TGMOBILE · BOLSA</span>
              <h2>Tu selección</h2>
            </div>
            <button
              class="cart-close"
              type="button"
              aria-label="Cerrar bolsa"
              @click="close"
            >
              ×
            </button>
          </header>

          <div v-if="items.length" class="cart-items">
            <article v-for="item in items" :key="item.id" class="cart-item">
              <ProductImage :src="item.image" :alt="item.name" loading="lazy" />
              <div class="cart-item-copy">
                <small
                  >{{ item.brand }} · {{ item.quantity }} unidad{{
                    item.quantity === 1 ? "" : "es"
                  }}</small
                ><strong>{{ item.name }}</strong
                ><b>{{ formatCOP(item.price * item.quantity) }}</b>
              </div>
              <button
                type="button"
                class="cart-remove"
                :aria-label="`Eliminar ${item.name}`"
                @click="remove(item.id)"
              >
                ×
              </button>
            </article>
          </div>
          <div v-else class="cart-empty">
            <span>⌁</span><strong>Tu bolsa está vacía</strong>
            <p>Explora el catálogo y guarda aquí tus favoritos.</p>
            <RouterLink class="btn btn-primary" to="/catalogo" @click="close"
              >Explorar catálogo</RouterLink
            >
          </div>

          <footer v-if="items.length" class="cart-footer">
            <div>
              <span>{{ count }} producto{{ count === 1 ? "" : "s" }}</span
              ><strong>{{ formatCOP(total) }}</strong>
            </div>
            <a
              class="btn btn-primary cart-checkout"
              :href="whatsappHref"
              target="_blank"
              rel="noopener"
              @click="close"
              >Continuar por WhatsApp <span>↗</span></a
            >
          </footer>
        </aside>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.cart-layer {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: end;
  justify-content: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.46);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.cart-sheet {
  width: min(100%, 38rem);
  max-height: min(80vh, 44rem);
  overflow: auto;
  padding: 0.65rem 1.25rem 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 1.7rem;
  background: linear-gradient(
    145deg,
    rgba(48, 51, 57, 0.96),
    rgba(19, 21, 24, 0.98)
  );
  box-shadow:
    0 -20px 70px rgba(0, 0, 0, 0.45),
    inset 0 1px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px) saturate(140%);
  -webkit-backdrop-filter: blur(30px) saturate(140%);
}
.cart-grabber {
  width: 2.8rem;
  height: 0.25rem;
  margin: 0.1rem auto 0.9rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.3);
}
.cart-header {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 1rem;
}
.cart-eyebrow {
  color: var(--warning);
  font-size: 0.62rem;
  font-weight: 750;
  letter-spacing: 0.12em;
}
.cart-header h2 {
  margin-top: 0.25rem;
  font-size: 1.7rem;
  letter-spacing: -0.05em;
}
.cart-close {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
}
.cart-items {
  display: grid;
  gap: 0.55rem;
  margin: 1.2rem 0;
}
.cart-item {
  display: grid;
  grid-template-columns: 4.3rem 1fr auto;
  gap: 0.8rem;
  align-items: center;
  padding: 0.65rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.06);
}
.cart-item .smart-image {
  width: 4.3rem;
  height: 4.3rem;
  border-radius: 0.7rem;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}
.cart-item .smart-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cart-item-copy {
  display: grid;
  min-width: 0;
  gap: 0.16rem;
}
.cart-item-copy small {
  color: var(--text-muted);
  font-size: 0.62rem;
}
.cart-item-copy strong {
  overflow: hidden;
  font-size: 0.8rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cart-item-copy b {
  color: var(--accent);
  font-size: 0.82rem;
}
.cart-remove {
  align-self: start;
  border: 0;
  background: transparent;
  color: var(--text-dim);
  cursor: pointer;
  font-size: 1.1rem;
}
.cart-empty {
  display: grid;
  justify-items: center;
  gap: 0.55rem;
  padding: 3rem 1rem;
  text-align: center;
}
.cart-empty > span {
  display: grid;
  width: 3.5rem;
  height: 3.5rem;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 1.2rem;
  background: rgba(255, 255, 255, 0.08);
  font-size: 1.7rem;
}
.cart-empty p {
  max-width: 17rem;
  color: var(--text-muted);
  font-size: 0.85rem;
}
.cart-footer {
  display: grid;
  gap: 0.8rem;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}
.cart-footer > div {
  display: flex;
  justify-content: space-between;
  color: var(--text-muted);
  font-size: 0.78rem;
}
.cart-footer strong {
  color: white;
  font-size: 1.1rem;
}
.cart-checkout {
  width: 100%;
}
.cart-backdrop-enter-active,
.cart-backdrop-leave-active {
  transition: opacity 0.3s ease;
}
.cart-backdrop-enter-from,
.cart-backdrop-leave-to {
  opacity: 0;
}
.cart-sheet-enter-active,
.cart-sheet-leave-active {
  transition:
    transform 0.52s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    opacity 0.25s ease;
}
.cart-sheet-enter-from,
.cart-sheet-leave-to {
  transform: translateY(105%) scale(0.96);
  opacity: 0;
}
@media (max-width: 899px) {
  .cart-layer {
    padding: 0.5rem;
  }
  .cart-sheet {
    width: 100%;
    max-height: 84vh;
    border-radius: 1.45rem;
  }
}
</style>
