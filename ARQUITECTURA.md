# CaliPro — Arquitectura de la landing

> Estado: plan aprobado pendiente. Todavía no hay código.
> Marca: negro + oro (ver `Assets/Logo`). Claim: "Calistenia Profesional".

---

## 1. Decisiones clave

| Tema | Decisión | Por qué |
|---|---|---|
| Stack | Next.js (App Router) + TypeScript + Tailwind v4 | Pedido. SSG/ISR = web rápida y buen SEO. |
| Idiomas | **Rutas por idioma** (`/es/...`, `/en/...`) con `next-intl`, no un toggle | Google indexa las dos versiones por separado (hreflang), cada link compartido abre en su idioma y el selector solo cambia de ruta. |
| Idioma por defecto | Español. `/` redirige según el idioma del navegador | Público principal hispanohablante. |
| URLs traducidas | `/es/tienda` ↔ `/en/shop`, `/es/legal/privacidad` ↔ `/en/legal/privacy` | Más natural y mejor SEO en cada idioma. |
| Una página vs varias | **Híbrido**: home de una sola página con todas las secciones resumidas + páginas propias para lo que tiene profundidad (cada skill, cada producto, cada post) | La home convierte (scroll, CTA). Las páginas de detalle posicionan en Google ("cómo hacer planche") y se pueden compartir. |
| Captura de leads | **WhatsApp como canal principal** (botón flotante + mensajes prellenados según la sección), email (`mailto`) como secundario, DM de Instagram/TikTok en redes. **Sin formulario y sin click-to-call** | Para un creador de fitness, WhatsApp es donde la gente escribe de verdad. Una llamada genera fricción (el usuario no sabe si molesta y él no puede atenderlas). El mensaje prellenado ("Hola, vengo de la web y me interesa el front lever") le dice a tu amigo de dónde viene cada contacto. |
| 3D de productos | `<model-viewer>` (Google) con modelos `.glb` | Rotar con el dedo o el ratón, zoom y **AR gratis en móvil** ("ver en tu espacio"). Mucho más ligero que montar Three.js para un visor de producto. |
| Contenido | Datos tipados en TS (skills, productos, códigos) + MDX para el blog | Sin CMS de pago al principio; más adelante se puede migrar a un CMS sin tocar componentes. |
| Compra | Fase 1: botón "Lo quiero" → WhatsApp o link externo. Fase 2: Shopify o Stripe | No montar un checkout hasta confirmar volumen y productos. Hay una capa `commerce` para cambiarlo sin rehacer la UI. |
| Despliegue | Vercel | Nativo para Next.js, previews por rama y dominio propio. |

---

## 2. Mapa del sitio

```
/es                     Home (one-page)          /en
/es/skills              Todas las skills          /en/skills
/es/skills/[slug]       Detalle de skill          /en/skills/[slug]
/es/tienda              Merch                     /en/shop
/es/tienda/[slug]       Producto + visor 3D       /en/shop/[slug]
/es/blog                Diario / blog             /en/blog
/es/blog/[slug]         Post                      /en/blog/[slug]
/es/legal/[doc]         Aviso legal, privacidad, cookies (obligatorio en España/UE)
```

Los códigos promocionales y el contacto viven en la home (anclas `#codigos`, `#contacto`) y en el footer. No necesitan página propia.

### Secciones de la home (en orden)

1. **Hero**: logo/claim, titular, vídeo o imagen de tu amigo en acción, CTA "Explora las skills" + "Escríbeme".
2. **Sobre él**: quién es, logros, cifras (seguidores, años entrenando). Da confianza a todo lo demás.
3. **Skills**: 5 tarjetas (pino a una mano, planche, front lever, muscle-up, bandera humana). Al pulsar una se abre `/skills/[slug]`.
4. **Códigos promo**: tarjetas con marca, descuento, botón "copiar código" y enlace a la tienda.
5. **Merch**: 3–4 productos destacados con miniatura 3D → tienda.
6. **App**: "Próximamente". Rutinas, ejercicios y planes. Badges de App Store/Google Play desactivados hasta el lanzamiento, controlados por un flag.
7. **Blog / diario**: últimos 3 posts (nutrición, equipo, detrás de cámaras).
8. **Contacto**: WhatsApp, email, Instagram y TikTok como botones grandes.
9. **Footer**: navegación, redes, selector de idioma y legales.

### Detalle de una skill (`/skills/[slug]`)

- Categoría (empuje / tracción / equilibrio / estático), nivel (1–5) y tiempo estimado.
- Requisitos previos ("antes de empezar necesitas…") con enlaces a otras skills.
- Progresión resumida (pasos 1→N, solo títulos). **La rutina completa está en la app** → CTA de descarga (o de WhatsApp mientras no exista).
- Navegación "← Skill anterior / Siguiente skill →".

---

## 3. Estructura de carpetas

```
calistenia-web-calipro/
├── .claude/skills/              # taste-skill, web-design-guidelines, scroll-world
├── Assets/                      # originales (logo, fotos). NO se sirven; se optimizan hacia /public
├── public/
│   ├── brand/                   # logo (svg/png), favicon, og-default
│   ├── images/{hero,about,skills,shop,blog}/
│   ├── models/                  # productos 3D (.glb) + poster .webp de cada uno
│   └── video/                   # clips del hero / scroll-world
├── messages/
│   ├── es.json                  # textos de interfaz (botones, títulos de sección)
│   └── en.json
└── src/
    ├── proxy.ts                 # detección/redirección de idioma (next-intl)
    ├── i18n/
    │   ├── routing.ts           # locales, idioma por defecto, pathnames traducidos
    │   ├── request.ts           # carga de mensajes por petición
    │   └── navigation.ts        # Link/redirect/usePathname conscientes del idioma
    ├── app/
    │   ├── [locale]/
    │   │   ├── layout.tsx       # <html lang>, fuentes, Header, Footer, WhatsAppFab
    │   │   ├── page.tsx         # Home: compone las secciones
    │   │   ├── skills/
    │   │   │   ├── page.tsx
    │   │   │   └── [slug]/page.tsx
    │   │   ├── tienda/          # se sirve como /en/shop vía pathnames
    │   │   │   ├── page.tsx
    │   │   │   └── [slug]/page.tsx
    │   │   ├── blog/
    │   │   │   ├── page.tsx
    │   │   │   └── [slug]/page.tsx
    │   │   ├── legal/[doc]/page.tsx
    │   │   └── not-found.tsx
    │   ├── sitemap.ts           # incluye ambas versiones + hreflang
    │   ├── robots.ts
    │   └── opengraph-image.tsx  # imagen para compartir en redes, por idioma
    ├── components/
    │   ├── layout/              # Header, DesktopNav, MobileMenu, LocaleSwitcher, Footer, WhatsAppFab
    │   ├── sections/            # una por sección de la home (ver §4)
    │   ├── skills/
    │   ├── shop/
    │   ├── promo/
    │   ├── blog/
    │   ├── contact/
    │   ├── app-promo/
    │   └── ui/                  # piezas base reutilizables
    ├── content/
    │   ├── skills.ts            # datos tipados { slug, name:{es,en}, category, level, prereqs, steps… }
    │   ├── products.ts          # { slug, name, price, model:'/models/x.glb', poster, buyUrl… }
    │   ├── promo-codes.ts       # { brand, logo, code, discount, url, expires }
    │   ├── social.ts            # handles de IG, TikTok, WhatsApp y email
    │   └── blog/
    │       ├── es/*.mdx
    │       └── en/*.mdx
    ├── lib/
    │   ├── contact.ts           # genera links wa.me/mailto con mensaje prellenado según contexto
    │   ├── commerce.ts          # capa de compra (hoy WhatsApp/link externo; mañana Shopify/Stripe)
    │   ├── blog.ts              # lectura de MDX + frontmatter
    │   ├── seo.ts               # metadata, hreflang y JSON-LD (Person, Product, Article)
    │   └── cn.ts
    ├── config/site.ts           # nombre, dominio, flags (APP_LAUNCHED, SHOP_CHECKOUT)
    ├── types/                   # Skill, Product, PromoCode, Post
    └── styles/globals.css       # tokens Tailwind v4 (@theme): colores, tipografía, espaciado
```

---

## 4. Plan de componentes por sección

| Sección | Componentes | Server/Client | Notas |
|---|---|---|---|
| Layout | `Header`, `DesktopNav`, `MobileMenu` (sheet a pantalla completa), `LocaleSwitcher`, `Footer`, `WhatsAppFab` | Header server; MobileMenu, LocaleSwitcher y Fab client | El Fab se oculta al llegar a `#contacto` para no duplicar. |
| Hero | `HeroSection`, `HeroMedia` (vídeo con poster), `HeroCtas` | server + media client | Vídeo `muted playsinline`, con poster para que se vea algo antes de cargar. Opción avanzada: `ScrollWorldHero` (§6). |
| Sobre él | `AboutSection`, `StatCounter` | server | |
| Skills | `SkillsSection`, `SkillCard`, `LevelBadge`, `CategoryTag` | server | Carrusel con scroll-snap en móvil y grid en escritorio. |
| Detalle skill | `SkillHero`, `PrerequisiteList`, `ProgressionTimeline`, `AppGateCta`, `SkillPager` | server | La timeline enseña los pasos; el detalle "bloqueado" invita a la app. |
| Códigos | `PromoSection`, `PromoCodeCard`, `CopyCodeButton` | Copy button client | Feedback "¡Copiado!" y caducidad visible. |
| Merch | `ShopPreviewSection`, `ProductCard`, `ProductViewer3D`, `ProductInfo`, `BuyButton` | Viewer client (carga diferida) | El poster se ve al instante y el 3D carga al entrar en pantalla. Botón AR en móvil. |
| App | `AppPromoSection`, `StoreBadges`, `PhoneMockup` | server | Controlado por `APP_LAUNCHED`. |
| Blog | `BlogPreviewSection`, `PostCard`, `PostHeader`, `MdxComponents` | server | Categorías: nutrición, equipo, diario. |
| Contacto | `ContactSection`, `ContactChannel`, `SocialLinks` | server | Cada botón abre un mensaje prellenado distinto. |
| UI base | `Button`, `Container`, `Section`, `SectionHeading`, `Badge`, `Reveal` (animación al entrar), `Sheet` | mixto | `Reveal` respeta `prefers-reduced-motion`. |

Regla general: todo es Server Component por defecto y solo es cliente lo interactivo (copiar, 3D, menú, idioma). Así la web pesa poco en móvil.

---

## 5. Móvil y escritorio

- **Mobile-first**: se diseña a 375 px y se amplía. Se revisa en 360 / 390 / 768 / 1024 / 1440 px.
- Tipografía fluida con `clamp()`: el titular del hero escala sin saltos.
- Alturas con `svh`/`dvh` para que la barra del navegador móvil no corte el hero.
- Zonas táctiles de al menos 44 px. Botón de WhatsApp en la zona del pulgar.
- Navegación: menú a pantalla completa en móvil y nav horizontal fija en escritorio.
- Grids que pasan a carruseles con scroll-snap en móvil (skills, productos, códigos).
- 3D: rotar con un dedo, zoom con pellizco, sin secuestrar el scroll de la página. En escritorio, arrastrar con el ratón.
- Imágenes con `next/image` y `sizes` correctos. Vídeos en versión ligera para móvil.
- Objetivo Lighthouse móvil ≥ 90 (rendimiento, accesibilidad, SEO).

---

## 6. Herramientas de IA en el proyecto

| Herramienta | Uso |
|---|---|
| `design-taste-frontend` (taste-skill) | Dirección visual: evitar el look de plantilla. Se aplica al diseñar cada sección. |
| `web-design-guidelines` | Auditoría de accesibilidad/UX al terminar cada sección. |
| `scroll-world` | **Opcional, fase 3.** Hero cinemático que "vuela" por escenas (parque de barras → gimnasio → competición). ⚠️ Cuesta dinero real (~27 $ por cadena vía Monid, o créditos de Higgsfield) y necesita ffmpeg. Solo con tu OK explícito y con fallback de imagen fija en móviles lentos. |
| Higgsfield MCP | Imágenes del hero y de fondos, portadas del blog, ilustraciones de skills y mockups de merch. Las fotos reales de tu amigo siempre ganan en autenticidad. |

Los modelos 3D (`.glb`) de los productos se sacarán del proveedor del merch o de una herramienta de imagen→3D. Está por decidir cuando haya productos.

---

## 7. Fases

1. **Base**: scaffold Next.js, i18n, tokens de marca, layout (header/footer/Fab) y páginas legales.
2. **Home**: Hero, Sobre él, Skills, Códigos, Contacto.
3. **Profundidad**: detalle de skills, tienda + visor 3D, blog con 2–3 posts.
4. **Pulido**: SEO/OG, sitemap, auditoría `web-design-guidelines`, pruebas en móvil real y deploy en Vercel.
5. **Extra**: scroll-world hero, checkout real y conexión con la app cuando exista.

---

## 8. Lo que necesito de ti

- Nombre de tu amigo, foto(s) y bio corta.
- Número de WhatsApp, email, @ de Instagram y TikTok.
- Códigos promo: marca, código, % descuento, link y caducidad.
- Merch: lista de productos, precios, fotos y si hay modelos 3D.
- Confirmar las 5 skills (o cambiarlas).
- Dominio (si ya lo tiene).
