# ☕ Costa Rica y su Café — Mini Documental Interactivo

Proyecto personal desarrollado como mini documental web interactivo sobre la cultura cafetalera de Costa Rica. Construido con Vue 3 y Vite, combina video inmersivo, secciones narrativas, estadísticas animadas y exploración visual de un cafetal.

---

## Estructura del proyecto

```
src/
├── components/
│   └── documentary/
│       ├── content/
│       │   ├── CoffeeFacts.vue        # Curiosidades rotativas sobre el café
│       │   ├── CoffeeFarmExplorer.vue # Mapa interactivo de un cafetal con hotspots
│       │   └── DocumentarySection.vue # Sección narrativa con carta interactiva (flip)
│       ├── inmersive/
│       │   ├── ImmersiveVideo.vue     # Video de fondo fijo con transición
│       │   └── StatsCounter.vue       # Contador animado de estadísticas
│       └── layout/
│           ├── DocumentaryFooter.vue  # Footer con fuentes y autor
│           ├── DocumentaryHero.vue    # Hero con video y título principal
│           └── DocumentaryNav.vue     # Navegación fija inferior por secciones
├── composables/
│   └── useScrollReveal.js             # Composable para detectar visibilidad en scroll
├── views/
│   └── DocumentaryView.vue            # Vista principal que orquesta el documental
└── public/
    └── data/
        └── documentary.json           # Datos del documental (secciones, hero, stats, etc.)
```

---

## Instalación y uso

```sh
# Instalar dependencias
npm install

# Servidor de desarrollo con hot-reload
npm run dev

# Build para producción
npm run build

# Tests unitarios
npm run test:unit

# Lint
npm run lint
```

---

## Entorno de desarrollo recomendado

**Editor:** [VS Code](https://code.visualstudio.com/) con la extensión [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (desactivar Vetur si está instalado).

**Navegadores:**

- Chromium (Chrome, Edge, Brave): [Vue.js Devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) · [Custom Object Formatters](http://bit.ly/object-formatters)
- Firefox: [Vue.js Devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/) · [Custom Object Formatters](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

---

## Convenciones del proyecto

- Componentes en **PascalCase** (`DocumentarySection.vue`)
- Props en **camelCase** en script, **kebab-case** en template (`:active-section`)
- Estilos con `scoped` en todos los componentes
- Variables CSS globales: `--primary-color`, `--secondary-color`
- Datos del documental centralizados en `public/data/documentary.json`
