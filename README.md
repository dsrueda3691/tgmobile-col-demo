# TGMOBILE COL — Demo de tienda online

**Demo en vivo:** [https://dsrueda3691.github.io/tgmobile-col-demo/](https://dsrueda3691.github.io/tgmobile-col-demo/)

Propuesta web funcional para **TGMOBILE COL** (Santa Marta · Soho Bavaria local 2).
Interfaz estilo iOS, catálogo, ofertas y compra por WhatsApp.

> Banner permanente en la demo: *DEMO DE PROPUESTA — precios de ejemplo*

---

## Por qué existe este proyecto

TGMOBILE COL vende equipos de alta gama. Hoy gran parte de la conversación ocurre en Instagram y WhatsApp. Eso funciona, pero genera:

- Preguntas repetidas (“¿tienen…?”, “¿cuánto cuesta?”)
- Ofertas que se pierden en stories de 24 horas
- Una imagen de marca menos sólida que el producto que venden

Esta demo muestra cómo una **tienda online ligera** ordena el catálogo, destaca ofertas y prepara al cliente para escribir por WhatsApp **listo para comprar**.

No reemplaza WhatsApp: **lo potencia**.

---

## Qué incluye la demo

| Módulo | Qué hace |
|--------|----------|
| **Inicio** | Hero, ofertas del día, categorías, favoritos, recién llegados |
| **Catálogo** | Búsqueda y filtros (categoría, marca, condición, precio) |
| **Producto** | Detalle, precio, condición, batería (usados), CTA WhatsApp |
| **Crédito** | Explicación clara del proceso de compra a crédito |
| **Garantía / postventa** | Confianza después de la venta |
| **Ubicación y contacto** | Local en Santa Marta + WhatsApp segmentados |
| **Diseño iOS** | Glassmorphism, animaciones suaves, navegación tipo dock |

---

## Stack técnico

- **Vue 3** + **Vite** + **Vue Router**
- CSS propio (tema oscuro, estilo iOS)
- Datos en JSON (`products.json`, `campaigns.json`)
- Deploy automático a **GitHub Pages**

```
src/
  components/   # Nav, cards, filtros, WhatsApp, imágenes
  views/        # Home, Catálogo, Producto, Crédito, Garantía, Ubicación, Contacto
  data/         # products.json, campaigns.json
  composables/  # useProducts, useCart, useReveal
  router/
  assets/       # CSS global
```

---

## Cómo correr en local

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
npm run preview
```

---

## Documentación comercial

- **[Guía de venta y requisitos](./docs/VENTA_Y_REQUISITOS.md)** — cómo presentar la demo, mensaje de contacto e ingeniería de requisitos.

---

## Contacto de la marca (referencia)

| Canal | Dato |
|-------|------|
| Instagram | [@tgmobile.col](https://instagram.com/tgmobile.col) |
| WhatsApp ventas | [+57 324 237 2232](https://wa.me/573242372232) |
| Mayoreo | [+57 324 667 6835](https://wa.me/573246676835) |
| Postventa | [+57 300 513 1340](https://wa.me/573005131340) |
| Local | Santa Marta · Soho Bavaria local 2 |

---

## Estado

Demo de **propuesta comercial**. Precios y stock son de ejemplo.  
La versión de producción se alimenta con productos, fotos y textos reales de TGMOBILE COL.
