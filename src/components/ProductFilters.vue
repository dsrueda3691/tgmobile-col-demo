<script setup>
import { reactive, watch } from 'vue'
import { useProducts } from '../composables/useProducts'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) }
})
const emit = defineEmits(['update:modelValue', 'apply'])

const { brands } = useProducts()

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

function applyFilters() {
  const next = { ...draft }
  emit('update:modelValue', next)
  emit('apply', next)
}

function clearAll() {
  Object.assign(draft, empty())
  const next = { ...draft }
  emit('update:modelValue', next)
  emit('apply', next)
}
</script>

<template>
  <div class="filters">
    <div class="field">
      <label for="q">Buscar</label>
      <input id="q" v-model="draft.q" type="search" placeholder="iPhone, Samsung, AirPods…" />
    </div>
    <div class="field">
      <label for="category">Categoría</label>
      <select id="category" v-model="draft.category">
        <option value="">Todas</option>
        <option value="iphone">iPhone</option>
        <option value="otras-marcas">Otras marcas</option>
        <option value="usados-seminuevos">Usados / Seminuevos</option>
        <option value="ipad">iPad</option>
        <option value="macbook">MacBook</option>
        <option value="accesorios">Accesorios</option>
      </select>
    </div>
    <div class="field">
      <label for="brand">Marca</label>
      <select id="brand" v-model="draft.brand">
        <option value="">Todas</option>
        <option v-for="b in brands" :key="b" :value="b">{{ b }}</option>
      </select>
    </div>
    <div class="field">
      <label for="condition">Condición</label>
      <select id="condition" v-model="draft.condition">
        <option value="">Todas</option>
        <option value="nuevo">Nuevo</option>
        <option value="seminuevo">Seminuevo</option>
        <option value="usado">Usado</option>
      </select>
    </div>
    <div class="field">
      <label>Precio (COP)</label>
      <div class="price-fields">
        <input v-model="draft.minPrice" type="number" min="0" placeholder="Mín" />
        <input v-model="draft.maxPrice" type="number" min="0" placeholder="Máx" />
      </div>
    </div>
    <div class="filters-actions">
      <button class="btn btn-primary" type="button" @click="applyFilters">Aplicar filtros</button>
      <button class="btn btn-ghost" type="button" @click="clearAll">Limpiar</button>
    </div>
  </div>
</template>
