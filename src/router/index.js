import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue'), meta: { title: 'Inicio' } },
  { path: '/catalogo', name: 'catalog', component: () => import('../views/CatalogView.vue'), meta: { title: 'Catálogo' } },
  { path: '/producto/:id', name: 'product', component: () => import('../views/ProductView.vue'), meta: { title: 'Producto' } },
  { path: '/credito', name: 'credit', component: () => import('../views/CreditView.vue'), meta: { title: 'Crédito' } },
  { path: '/garantia', name: 'warranty', component: () => import('../views/WarrantyView.vue'), meta: { title: 'Garantía' } },
  { path: '/ubicacion', name: 'location', component: () => import('../views/LocationView.vue'), meta: { title: 'Ubicación' } },
  { path: '/contacto', name: 'contact', component: () => import('../views/ContactView.vue'), meta: { title: 'Contacto' } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  const base = 'TGMOBILE COL'
  document.title = to.meta.title ? `${to.meta.title} · ${base}` : `${base} — Los mejores con los mejores`
})

export default router
