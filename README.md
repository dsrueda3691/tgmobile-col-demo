# TGMOBILE COL — Demo Vue 3 + Vite

**GitHub Pages (live):** https://dsrueda3691.github.io/tgmobile-col-demo/

Propuesta web demo para **TGMOBILE COL** (Santa Marta · Soho Bavaria local 2).

**Slogan:** Los mejores con los mejores

> Banner permanente: *DEMO DE PROPUESTA — precios de ejemplo*

## Cómo correr

```bash
cd /workspace/tgmobile-vue
npm install
npm run dev
```

Abrir la URL que muestre Vite (por defecto `http://127.0.0.1:5173`).

### Build de producción

```bash
npm run build
npm run preview
```

## Cómo agregar o quitar productos

1. Edita `src/data/products.json`.
2. Cada producto debe incluir al menos:

| Campo | Tipo | Notas |
|-------|------|--------|
| `id` | string | Único (URL: `/producto/:id`) |
| `name` | string | Nombre visible |
| `brand` | string | Apple, Samsung, etc. |
| `category` | string | `iphone`, `otras-marcas`, `usados-seminuevos`, `ipad`, `macbook`, `accesorios` |
| `condition` | string | `nuevo` \| `seminuevo` \| `usado` |
| `price` | number | COP |
| `compareAtPrice` | number? | Precio tachado (opcional) |
| `storage` | string? | Ej. `256GB` |
| `batteryPercent` | number? | Para semi/usados |
| `image` | string | Ruta bajo `/public` |
| `featured` | boolean | Aparece en Destacados |
| `tags` | string[] | Ej. `oferta`, `remate`, `cargadores`, `audifonos`, `parlantes` |
| `season` | string? | Ej. `remate` (campañas) |
| `inStock` | boolean | Stock |
| `description` | string | Texto corto |

3. Guarda el archivo: el home, las tarjetas de sección y el catálogo se actualizan solos (cuentan y filtran desde el JSON).

### Campañas / remates

Edita `src/data/campaigns.json`:

- `active: true` muestra el banner de temporada.
- Productos con `season` igual a `campaign.season` o tags `remate`/`oferta` alimentan la sección de ofertas.

## Estructura

```
src/
  components/   # Nav, cards, filtros, WhatsApp, etc.
  views/        # Home, Catálogo, Producto, Crédito, Garantía, Ubicación, Contacto
  data/         # products.json, campaigns.json
  composables/  # useProducts, useReveal
  router/       # Vue Router
  assets/       # CSS global
```

## Contacto de la marca (demo)

- IG [@tgmobile.col](https://instagram.com/tgmobile.col)
- WhatsApp ventas: https://wa.me/573242372232
- Mayoreo: https://wa.me/573246676835
- Postventa: https://wa.me/573005131340
- Envíos a todo Colombia
