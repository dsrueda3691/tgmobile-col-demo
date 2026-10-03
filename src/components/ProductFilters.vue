<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useProducts } from '../composables/useProducts'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) }
})
const emit = defineEmits(['update:modelValue'])

const { brands } = useProducts()
const open = ref(false)

const empty = () => ({
  q: '',
  category: '',
  brand: '',
  condition: '',
  minPrice: '',
  maxPrice: '',
  tags: ''
})

const draft = reactive({
  ...empty(),
  q: props.modelValue.q || '',
  category: props.modelValue.category || '',
  brand: props.modelValue.brand || '',
  condition: props.modelValue.condition || '',
  minPrice: props.modelValue.minPrice || '',
  maxPrice: props.modelValue.maxPrice || '',
  tags: props.modelValue.tags || ''
})

watch(
  () => props.modelValue,
  (v) => {
    Object.assign(draft, {
      q: v.q || '',
      category: v.category || '',
      brand: v.brand || '',
      condition: v.condition || '',
      minPrice: v.minPrice || '',
      maxPrice: v.maxPrice || '',
      tags: v.tags || ''
    })
  },
  { deep: true }
)

const activeCount = computed(() => {
  let n = 0
  if (draft.category) n++
  if (draft.brand) n++
  if (draft.condition) n++
  if (draft.minPrice || draft.maxPrice) n++
  if (draft.tags) n++
  return n
})

function emitDraft() {
  emit('update:modelValue', { ...draft })
}

function onSearchInput() {
  emitDraft()
}

function applyFilters() {
  emitDraft()
  open.value = false
}

function clearAll() {
  Object.assign(draft, empty())
  emitDraft()
}

function clearAdvanced() {
  draft.category = ''
  draft.brand = ''
  draft.condition = ''
  draft.minPrice = ''
  draft.maxPrice = ''
  draft.tags = ''
  emitDraft()
}
</script>

<template>
  <div class="pf">
    <!-- Search always visible -->
    <div class="pf-search">
      <span class="pf-search-icon" aria-hidden="true">⌕</span>
      <input
        v-model="draft.q"
        type="search"
        placeholder="Buscar iPhone, Samsung, AirPods…"
        autocomplete="off"
        @input="onSearchInput"
      />
      <button
        v-if="draft.q"
        type="button"
        class="pf-clear-q"
        aria-label="Limpiar búsqueda"
        @click="draft.q = ''; emitDraft()"
      >×</button>
    </div>

    <!-- Toggle advanced -->
    <div class="pf-bar">
      <button
        type="button"
        class="pf-toggle"
        :class="{ active: open || activeCount > 0 }"
        @click="open = !open"
      >
        <span class="pf-toggle-icon">⚙</span>
        Filtros
        <span v-if="activeCount" class="pf-badge">{{ activeCount }}</span>
        <span class="pf-chevron" :class="{ open }">▾</span>
      </button>
      <button
        v-if="activeCount"
        type="button"
        class="pf-reset"
        @click="clearAdvanced"
      >
        Limpiar
      </button>
    </div>

    <!-- Advanced panel (collapsible) -->
    <Transition name="pf-slide">
      <div v-if="open" class="pf-panel">
        <div class="pf-grid">
          <div class="pf-field">
            <label>Categoría</label>
            <select v-model="draft.category">
              <option value="">Todas</option>
              <option value="iphone">iPhone</option>
              <option value="otras-marcas">Otras marcas</option>
              <option value="usados-seminuevos">Usados / Seminuevos</option>
              <option value="ipad">iPad</option>
              <option value="macbook">MacBook</option>
              <option value="accesorios">Accesorios</option>
            </select>
          </div>
          <div class="pf-field">
            <label>Marca</label>
            <select v-model="draft.brand">
              <option value="">Todas</option>
              <option v-for="b in brands" :key="b" :value="b">{{ b }}</option>
            </select>
          </div>
          <div class="pf-field">
            <label>Condición</label>
            <select v-model="draft.condition">
              <option value="">Todas</option>
              <option value="nuevo">Nuevo</option>
              <option value="seminuevo">Seminuevo</option>
              <option value="usado">Usado</option>
            </select>
          </div>
          <div class="pf-field pf-price">
            <label>Precio (COP)</label>
            <div class="pf-price-row">
              <input v-model="draft.minPrice" type="number" min="0" placeholder="Mín" inputmode="numeric" />
              <span class="pf-dash">—</span>
              <input v-model="draft.maxPrice" type="number" min="0" placeholder="Máx" inputmode="numeric" />
            </div>
          </div>
        </div>
        <div class="pf-actions">
          <button type="button" class="btn btn-primary btn-sm" @click="applyFilters">Aplicar</button>
          <button type="button" class="btn btn-ghost btn-sm" @click="clearAll">Todo limpio</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.pf {
  display: grid;
  gap: 0.65rem;
  margin-bottom: 0.5rem;
}

.pf-search {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.05);
  transition: border-color 0.2s, background 0.2s;
}
.pf-search:focus-within {
  border-color: rgba(240, 180, 41, 0.45);
  background: rgba(255, 255, 255, 0.07);
}
.pf-search-icon {
  color: var(--text-dim);
  font-size: 1rem;
  line-height: 1;
  flex-shrink: 0;
}
.pf-search input {
  flex: 1;
  min-width: 0;
  border: 0;
  background: transparent;
  color: var(--text);
  outline: none;
  font-size: 0.9rem;
}
.pf-search input::placeholder {
  color: var(--text-dim);
}
.pf-clear-q {
  flex-shrink: 0;
  width: 1.6rem;
  height: 1.6rem;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
}

.pf-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.pf-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.85rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.pf-toggle.active,
.pf-toggle:hover {
  color: var(--text);
  border-color: rgba(240, 180, 41, 0.4);
  background: rgba(240, 180, 41, 0.1);
}
.pf-toggle-icon {
  font-size: 0.85rem;
  opacity: 0.85;
}
.pf-badge {
  display: inline-grid;
  place-items: center;
  min-width: 1.15rem;
  height: 1.15rem;
  padding: 0 0.3rem;
  border-radius: 999px;
  background: var(--warning);
  color: #1a1408;
  font-size: 0.65rem;
  font-weight: 800;
}
.pf-chevron {
  font-size: 0.7rem;
  transition: transform 0.25s;
  opacity: 0.7;
}
.pf-chevron.open {
  transform: rotate(180deg);
}
.pf-reset {
  margin-left: auto;
  border: 0;
  background: transparent;
  color: var(--text-dim);
  font-size: 0.72rem;
  cursor: pointer;
  padding: 0.35rem 0.5rem;
}
.pf-reset:hover {
  color: var(--text);
}

.pf-panel {
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 1.1rem;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: var(--shadow-soft);
}
.pf-grid {
  display: grid;
  gap: 0.75rem;
}
@media (min-width: 700px) {
  .pf-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .pf-price {
    grid-column: 1 / -1;
  }
}
.pf-field {
  display: grid;
  gap: 0.3rem;
}
.pf-field label {
  color: var(--text-dim);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.pf-field select,
.pf-field input {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: #22252a;
  color: var(--text);
  outline: none;
  font-size: 0.88rem;
}
.pf-field select:focus,
.pf-field input:focus {
  border-color: rgba(240, 180, 41, 0.4);
}
.pf-price-row {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}
.pf-price-row input {
  flex: 1;
  min-width: 0;
}
.pf-dash {
  color: var(--text-dim);
  flex-shrink: 0;
}
.pf-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.9rem;
}
.pf-actions .btn {
  flex: 1;
}

.pf-slide-enter-active,
.pf-slide-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.pf-slide-enter-from,
.pf-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
