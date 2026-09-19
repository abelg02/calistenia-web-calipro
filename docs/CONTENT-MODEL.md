# CaliPro — Modelo de contenido

Todo el contenido editable vive en `content/`. Cada archivo se valida con **Zod** en tiempo de build:
si falta un campo o un slug está duplicado, el build falla antes de desplegar.

Convención bilingüe: los campos traducibles son objetos `{ es, en }`. Los que no se traducen
(slug, nivel, precio, URL) son valores planos.

---

## 1. `content/site.json` — datos del negocio

```jsonc
{
  "brand":      { "name": "CaliPro", "tagline": { "es": "...", "en": "..." } },
  "coach":      { "name": "...", "bio": { "es": "...", "en": "..." }, "photo": "/images/coach.jpg" },
  "whatsapp":   { "number": "34600000000", "presetMessage": { "es": "Hola, vengo de la web...", "en": "Hi, I found you on..." } },
  "email":      "contacto@...",
  "social":     { "instagram": "https://instagram.com/...", "tiktok": "https://tiktok.com/@...", "youtube": null },
  "app":        { "status": "coming-soon", "ios": null, "android": null },
  "stats":      [ { "value": "120K", "label": { "es": "Seguidores", "en": "Followers" } } ],
  "legal":      { "businessName": "...", "nif": "...", "address": "..." }
}
```

`whatsapp.number` en formato internacional **sin** `+` ni espacios (lo exige `wa.me`).

---

## 2. `content/skills/<slug>.json` — una skill por archivo

```jsonc
{
  "slug": "planche",
  "name":     { "es": "Planche", "en": "Planche" },
  "tagline":  { "es": "El pulso horizontal", "en": "..." },
  "category": "push",              // push | pull | core | handstand | legs
  "level": 5,                      // 1..5
  "featured": true,                // aparece en el home (máx. 5)
  "order": 3,
  "muscles": ["deltoids", "biceps-tendon", "core", "serratus"],
  "timeToMaster": { "es": "18-36 meses", "en": "18-36 months" },
  "media": {
    "poster": "/images/skills/planche.jpg",
    "clip":   "/video/skills/planche.webm",
    "model":  null                 // .glb opcional, fase 2
  },
  "prerequisites": [
    { "text": { "es": "30s de pseudo planche push-up hold", "en": "..." }, "skillSlug": null },
    { "text": { "es": "Pino contra pared 60s", "en": "..." }, "skillSlug": "handstand" }
  ],
  "progression": [
    { "step": 1, "name": { "es": "Tuck planche", "en": "..." },
      "description": { "es": "...", "en": "..." }, "free": true },
    { "step": 2, "name": { "es": "Adv. tuck planche", "en": "..." },
      "description": { "es": "...", "en": "..." }, "free": true },
    { "step": 3, "name": { "es": "Straddle planche", "en": "..." },
      "description": null, "free": false }          // free:false => tarjeta bloqueada -> app
  ],
  "commonMistakes": [ { "title": { "es": "...", "en": "..." }, "fix": { "es": "...", "en": "..." } } ],
  "appDeepLink": null,             // "calipro://routine/planche" cuando exista la app
  "nextSkill": "front-lever",
  "seo": { "title": { "es": "...", "en": "..." }, "description": { "es": "...", "en": "..." } }
}
```

**Las 5 skills de arranque:** `handstand-one-arm`, `planche`, `front-lever`, `muscle-up`, `human-flag`.

Regla de negocio: **`free: true` en los 2-3 primeros pasos, `false` en el resto.** Esa es la frontera
web/app. Si se libera todo, la app pierde su razón de ser; si no se libera nada, la página no aporta
valor y no posiciona.

---

## 3. `content/products/<slug>.json`

```jsonc
{
  "slug": "camiseta-calipro-negra",
  "name":        { "es": "Camiseta CaliPro Negra", "en": "CaliPro Black Tee" },
  "description": { "es": "...", "en": "..." },
  "price": { "amount": 2495, "currency": "EUR" },   // céntimos, entero
  "featured": true,
  "images": ["/images/products/tee-black-1.jpg", "..."],
  "model3d": {
    "glb": "/models/tee-black.glb",
    "usdz": null,                                   // AR iOS, fase 2
    "fallback360": "/models/360/tee-black/",        // 36 .webp: 000.webp .. 035.webp
    "poster": "/images/products/tee-black-poster.jpg",
    "camera": { "minDistance": 1.2, "maxDistance": 3, "autoRotateSpeed": 0.6 },
    "hotspots": []                                  // fase 2
  },
  "variants": { "colors": ["black", "white"], "sizes": ["S", "M", "L", "XL"] },
  "buy": { "type": "external", "url": "https://..." },   // external | whatsapp
  "sizeGuide": "tops",
  "inStock": true
}
```

`buy.type: "whatsapp"` genera un `wa.me` con el producto y la talla en el mensaje: sirve mientras no
haya tienda real montada.

---

## 4. `content/promo-codes.json`

```jsonc
[
  {
    "id": "marca-x-2026",
    "brand": "Marca X",
    "logo": "/images/brands/marca-x.svg",
    "category": "supplements",          // supplements | apparel | equipment | other
    "code": "CALIPRO15",
    "discount": { "es": "15% de descuento", "en": "15% off" },
    "description": { "es": "En toda la web", "en": "Sitewide" },
    "url": "https://...",               // se renderiza con rel="sponsored noopener"
    "expiresAt": "2026-12-31",          // null = sin caducidad
    "featured": true
  }
]
```

Un código caducado **no se borra**: se muestra atenuado con etiqueta "Caducado", o se oculta según
el flag `hideExpired`. Borrarlo rompe los enlaces que tu amigo ya compartió en historias.

---

## 5. `content/blog/<locale>/<slug>.mdx`

```mdx
---
title: "Cómo comer para ganar fuerza relativa"
description: "..."
category: nutrition          # nutrition | gear | training | diary
publishedAt: 2026-03-12
updatedAt: null
cover: /images/blog/nutricion-fuerza.jpg
author: coach
draft: false
translationKey: relative-strength-nutrition   # une la versión es y la en
---
```

`translationKey` es lo que permite que el selector de idioma lleve del post en español **al mismo post**
en inglés, y no al listado. Si un post solo existe en un idioma, el selector lleva al listado y se
marca con `hreflang` solo ese idioma.

---

## 6. `src/messages/{es,en}.json` — textos de interfaz

Namespaces por sección, tipados con `next-intl`:

```
common.*      nav.*        hero.*        stats.*       skills.*
app.*         shop.*       codes.*       blog.*        contact.*
footer.*      forms.*      a11y.*        seo.*         errors.*
```

Regla: en `messages/` van **solo textos de UI** (botones, etiquetas, errores). El contenido real
(skills, productos, posts, códigos) vive en `content/`. Mezclarlos es lo que convierte una web
bilingüe en algo imposible de mantener.
