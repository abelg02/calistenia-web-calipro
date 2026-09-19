# CaliPro — Arquitectura del proyecto

> Documento de arquitectura y plan de componentes. **No contiene código de producción todavía.**
> Stack: Next.js (App Router) + TypeScript + Tailwind.

---

## 1. Decisiones principales (y por qué)

### 1.1 Idioma: **rutas** (`/es`, `/en`), no toggle de estado

**Decisión:** rutas con prefijo de idioma usando `next-intl` + segmento dinámico `app/[locale]/`.
El header lleva un selector de idioma, pero ese selector **navega** a la misma página en el otro idioma
(`/es/skills/planche` → `/en/skills/planche`), no cambia un estado en cliente.

Por qué rutas y no un toggle:

| | Rutas `/es` `/en` | Toggle en cliente |
|---|---|---|
| SEO | Google indexa **las dos** versiones; `hreflang` correcto | Google solo ve un idioma |
| Compartir enlaces | El enlace llega en el idioma correcto | Siempre abre en el idioma por defecto |
| Server Components | Traducción en servidor, HTML ya traducido | Hay que hidratar, parpadeo de idioma |
| Peso de JS | Solo se envía el diccionario del idioma activo | Se envían los dos diccionarios |

Como el objetivo es que la web **capte tráfico** (SEO de skills, blog, marcas de los códigos promo),
las rutas son la única opción razonable.

**Config concreta:**
- `defaultLocale: 'es'`, `locales: ['es','en']`, `localePrefix: 'always'` → `/` redirige a `/es`.
  Siempre hay prefijo: cero ambigüedad, URLs predecibles, cacheo simple en CDN.
- `middleware.ts` detecta `Accept-Language` en la **primera** visita y guarda la elección en cookie
  (`NEXT_LOCALE`). A partir de ahí manda la elección del usuario, no el navegador.
- **Los segmentos de carpeta están en inglés**, las URLs públicas se traducen con `pathnames` de
  `next-intl`. Un solo árbol de archivos, dos juegos de URLs:

| Carpeta | URL `es` | URL `en` |
|---|---|---|
| `[locale]/page.tsx` | `/es` | `/en` |
| `[locale]/skills` | `/es/skills` | `/en/skills` |
| `[locale]/shop` | `/es/tienda` | `/en/shop` |
| `[locale]/codes` | `/es/codigos` | `/en/codes` |
| `[locale]/blog` | `/es/blog` | `/en/blog` |
| `[locale]/app` | `/es/app` | `/en/app` |
| `[locale]/legal/privacy` | `/es/legal/privacidad` | `/en/legal/privacy` |

- `<html lang>` se fija en `app/[locale]/layout.tsx`.
- Cada página emite `alternates.languages` (hreflang es/en + `x-default`) desde `generateMetadata`.

### 1.2 Captación de leads: **WhatsApp primero, formulario mínimo como apoyo**

**Decisión:** el CTA principal en toda la web es **WhatsApp** (`wa.me` con mensaje pre-rellenado).
El `tel:` (click-to-call) queda **fuera** salvo que tu amigo lo pida expresamente.
Y sí hay **un** formulario, pero uno solo y de dos campos: la lista de espera de la app.

Por qué esta combinación y no "solo WhatsApp" ni "solo formulario":

- **WhatsApp gana en móvil y en este nicho.** El público es 18-35, viene de Instagram/TikTok, y ya
  está en el móvil. Un `wa.me` con el mensaje escrito ("Hola, quiero info sobre...") convierte muy por
  encima de un formulario: cero fricción, respuesta en el canal donde tu amigo ya vive.
- **Click-to-call no.** Nadie llama por teléfono a un creador de fitness; además en escritorio el
  `tel:` no hace nada útil y el número personal queda expuesto a spam. Si algún día hay servicio de
  coaching presencial, se añade y ya.
- **Un formulario sí, pero solo para la app.** La lista de espera es el único lead que *no* puedes
  capturar por WhatsApp: necesitas el **email** para avisar del lanzamiento y para poder hacer email
  marketing el día que la app salga. Eso es un activo real. Dos campos: email + idioma (implícito).
- **El contacto general no lleva formulario**: bloque de contacto = botón WhatsApp + `mailto:` +
  Instagram + TikTok. Menos código, menos spam, cero backend que mantener.

Implementación del lead de la app: `POST /api/lead` → guarda en el proveedor de email
(Resend audience / Mailchimp / Brevo, a elegir) + `honeypot` + rate-limit por IP. Sin base de datos propia.

**Anti-spam / privacidad:** honeypot + `ts` mínimo de relleno (no reCAPTCHA, penaliza LCP), checkbox de
consentimiento con enlace a `/legal/privacidad` (RGPD, obligatorio en España al recoger emails).

### 1.3 ¿Una sola página o varias? **Híbrido: una landing narrativa + rutas propias para el contenido**

**Decisión:**

- **Home (`/es`)** = una landing larga, con scroll narrativo, que presenta *todo*: hero, skills,
  app, tienda, códigos, blog, contacto. Es la página que se enlaza desde la bio de Instagram.
- **Rutas propias** para lo que tiene contenido real y necesita URL propia:
  `/skills`, `/skills/[slug]`, `/shop`, `/shop/[slug]`, `/codes`, `/blog`, `/blog/[slug]`, `/app`.

Por qué no todo en una sola página:

1. **SEO.** "cómo hacer planche", "front lever progresión", "código descuento <marca>" son búsquedas
   distintas. Cada una necesita su URL, su `<title>` y su JSON-LD. En one-page compites por una sola.
2. **Peso.** Los visores 3D, los modelos `.glb` y los vídeos de las skills pesan. En one-page todo eso
   lastra el LCP del home. Separado, el 3D solo se carga en `/shop/[slug]`.
3. **Compartir.** Tu amigo querrá mandar "mira esta skill" o "usa este código" por historia de Instagram.
   Un `#ancla` no sirve: la página entera se carga entera.
4. **La app.** Cuando exista, cada skill de la web enlaza a su rutina en la app (deep link). Eso
   necesita una página por skill.

Lo que **sí** vive solo como sección del home (sin ruta propia): contacto, redes y sobre-mí.

---

## 2. Stack

| Capa | Elección | Nota |
|---|---|---|
| Framework | **Next.js 15+, App Router, RSC** | Server Components por defecto; `'use client'` solo donde hay interacción |
| Lenguaje | **TypeScript** (`strict: true`) | |
| Estilos | **Tailwind CSS v4** + tokens en `@theme` | Sin CSS-in-JS |
| Primitivos UI | **Radix UI** (Dialog, Accordion, Tabs, Tooltip) | Accesibilidad de serie; estilado con Tailwind |
| i18n | **next-intl** | Rutas + `pathnames` traducidos + mensajes tipados |
| Animación | **Framer Motion** (micro-interacciones) + **GSAP ScrollTrigger** (scroll scrubbing del hero) | GSAP solo en el hero, cargado dinámicamente |
| 3D | **@react-three/fiber** + **@react-three/drei** | Ver §5 |
| Contenido | **MDX** para blog, **JSON + Zod** para skills/productos/códigos | Sin CMS en fase 1 |
| Iconos | **lucide-react** | Tree-shakeable |
| Fuentes | `next/font/local` (display) + `next/font/google` (texto) | `display: swap`, subset latin |
| Formulario | Server Action + Zod | Un solo formulario (waitlist) |
| Email/leads | **Resend** (audience + transaccional) | Alternativa: Brevo |
| Analítica | **Vercel Analytics** + eventos propios | Sin cookies → sin banner de cookies |
| Deploy | **Vercel** | ISR en blog, estático en el resto |
| Tests | Vitest (lógica/schemas) + Playwright (smoke móvil+desktop) | |

**MCP de Higgsfield:** se usa **fuera del runtime de la web**, en fase de producción de assets
(clips del hero scroll-world, renders de producto, imágenes de portada del blog). La salida se
optimiza y se commitea en `public/`. La web **no** llama a Higgsfield en runtime.

> Nota: el MCP de Higgsfield está conectado en tu máquina local, no en esta sesión remota. Los pasos
> que lo usan se ejecutan desde tu Claude Code local (ver `docs/ROADMAP.md`, Fase 2).

---

## 3. Estructura de carpetas

```
calistenia-web/
├── .claude/
│   └── skills/
│       ├── taste-skill/              # dirección de diseño, anti-plantilla
│       ├── web-design-guidelines/    # auditoría UI/a11y (Vercel)
│       └── scroll-world/             # hero cinemático con scroll-scrub
├── docs/
│   ├── ARCHITECTURE.md               # este archivo
│   ├── CONTENT-MODEL.md              # esquemas de datos
│   └── ROADMAP.md                    # fases + qué hace falta de tu amigo
├── content/                          # contenido editable sin tocar código
│   ├── skills/*.json                 # una skill por archivo (es+en dentro)
│   ├── products/*.json
│   ├── promo-codes.json
│   ├── site.json                     # redes, WhatsApp, email, handles
│   └── blog/
│       ├── es/*.mdx
│       └── en/*.mdx
├── public/
│   ├── models/                       # .glb comprimidos (Draco/meshopt)
│   ├── models/360/                   # secuencias de imágenes (fallback sin WebGL)
│   ├── video/                        # clips del hero (webm + mp4, poster)
│   ├── images/
│   └── og/
├── src/
│   ├── middleware.ts                 # detección y prefijo de idioma
│   ├── app/
│   │   ├── layout.tsx                # shell mínimo
│   │   ├── globals.css               # tokens Tailwind v4
│   │   ├── robots.ts
│   │   ├── sitemap.ts                # incluye ambos idiomas
│   │   ├── api/
│   │   │   └── lead/route.ts         # alta en lista de espera
│   │   └── [locale]/
│   │       ├── layout.tsx            # <html lang>, Header, Footer, StickyCta
│   │       ├── page.tsx              # LANDING
│   │       ├── opengraph-image.tsx
│   │       ├── not-found.tsx
│   │       ├── skills/
│   │       │   ├── page.tsx
│   │       │   └── [slug]/page.tsx
│   │       ├── shop/
│   │       │   ├── page.tsx
│   │       │   └── [slug]/page.tsx
│   │       ├── codes/page.tsx
│   │       ├── blog/
│   │       │   ├── page.tsx
│   │       │   └── [slug]/page.tsx
│   │       ├── app/page.tsx
│   │       └── legal/
│   │           ├── privacy/page.tsx
│   │           └── legal-notice/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── sections/
│   │   ├── skills/
│   │   ├── shop/
│   │   ├── three/
│   │   ├── blog/
│   │   ├── codes/
│   │   ├── motion/
│   │   └── ui/
│   ├── lib/
│   │   ├── i18n/{routing.ts,request.ts,navigation.ts}
│   │   ├── content/{skills.ts,products.ts,codes.ts,posts.ts,site.ts}
│   │   ├── schemas/*.ts              # Zod: valida el contenido en build
│   │   ├── seo/{metadata.ts,jsonld.ts}
│   │   ├── analytics.ts
│   │   └── utils.ts
│   ├── hooks/
│   │   ├── use-media-query.ts
│   │   ├── use-reduced-motion.ts
│   │   ├── use-in-view.ts
│   │   ├── use-can-render-3d.ts
│   │   └── use-copy-to-clipboard.ts
│   ├── messages/
│   │   ├── es.json
│   │   └── en.json
│   └── types/
└── CLAUDE.md
```

**Regla de oro de `content/`:** tu amigo (o tú) puede cambiar un precio, añadir un código promo o
publicar un post **sin tocar un solo componente**. Todo lo editable vive en `content/`, validado por Zod
en build: si falta un campo, el build falla y te enteras antes de desplegar.

---

## 4. Plan de componentes

### 4.1 Layout (`components/layout/`)

| Componente | Tipo | Responsive |
|---|---|---|
| `Header` | client | Desktop: nav horizontal + `LocaleSwitcher` + CTA WhatsApp. Móvil: logo + botón menú. Transparente sobre el hero → sólido con blur al hacer scroll |
| `MobileMenu` | client | `Sheet` de Radix a pantalla completa, trap de foco, cierra con Esc y al navegar |
| `NavLinks` | server | Enlaces desde `pathnames` de next-intl; marca el activo con `aria-current="page"` |
| `LocaleSwitcher` | client | Navega a la misma ruta en el otro idioma; **no** recarga al home. Muestra "ES / EN", no banderas (una bandera no es un idioma) |
| `Footer` | server | 4 columnas en desktop, acordeón en móvil. Nav, redes, legal, selector de idioma |
| `StickyCta` | client | **Solo móvil**: barra fija abajo con "WhatsApp" + "Descargar app". Aparece al pasar el hero, se oculta al llegar al footer. Respeta `env(safe-area-inset-bottom)` |

### 4.2 Secciones de la landing (`components/sections/`) — en orden

| # | Componente | Qué muestra | Móvil vs escritorio |
|---|---|---|---|
| 1 | `HeroScrollWorld` | Cinemática con scroll-scrub (skill `scroll-world`): la cámara recorre el "mundo CaliPro". Encima: claim, subclaim, CTA WhatsApp + CTA app | Desktop: scrub de vídeo a pantalla completa. Móvil: **el mismo vídeo con menos frames** o poster + vídeo corto en loop; nunca scrub pesado en móvil. Con `prefers-reduced-motion`: imagen estática + texto |
| 2 | `StatsStrip` | 3-4 cifras (seguidores, atletas formados, años entrenando) | Fila de 4 → grid 2×2 en móvil |
| 3 | `SkillsShowcase` | Las 5 skills destacadas en tarjetas | Desktop: grid 5 (o 3+2) con hover que reproduce un clip corto. Móvil: carrusel con `scroll-snap`, sin hover, con indicadores |
| 4 | `ServicesSection` | Las tres formas de entrenar (gratis / app / uno a uno) en tarjetas comparables | Desktop: 3 columnas, la del medio destacada. Móvil: apiladas, la recomendada primero |
| 5 | `AppTeaser` | Mockup del móvil + 3 beneficios + `WaitlistForm` | Desktop: 2 columnas (mockup / texto). Móvil: mockup arriba, texto debajo |
| 6 | `ShopTeaser` | 3 productos destacados con **preview 3D** + ficha de materiales | Desktop: 3 tarjetas, 3D se activa al hacer hover/entrar en viewport. Móvil: carrusel, 3D **solo** al pulsar "Ver en 3D" |
| 7 | `PromoCodesSection` | Grid de marcas con su código y descuento | Grid 3-4 → 1 columna en móvil. Botón "copiar" grande (≥44px) |
| 8 | `BlogTeaser` | Los 3 últimos posts | Grid 3 → carrusel/stack en móvil |
| 9 | `AboutCoach` | Foto + bio corta del entrenador | 2 columnas → 1 |
| 10 | `ContactSocial` | CTA WhatsApp (primario), `mailto:`, Instagram, TikTok | Botones a ancho completo en móvil |

Cada sección: `<section id>` + `SectionHeading` + `RevealOnScroll` (fade/slide de 200-300ms, desactivado con `prefers-reduced-motion`).

**El texto de cada sección ya está escrito**, en inglés y español, en `COPY-EN.md` y `COPY-ES.md`.
Ningún componente se construye con texto improvisado: si falta una línea, se añade primero al copy.

### 4.3 Skills (`components/skills/`)

**Listado `/skills`:** `SkillFilters` (categoría, nivel) + `SkillGrid` → `SkillCard`.

**Detalle `/skills/[slug]`:**

| Componente | Contenido |
|---|---|
| `SkillHero` | Nombre, clip en loop (o visor 3D del movimiento en fase 2), badges de categoría y nivel |
| `SkillMeta` | Categoría, nivel (1-5), músculos implicados, tiempo estimado de dominio |
| `SkillPrerequisites` | Checklist de requisitos ("15 dominadas estrictas", "pino contra pared 60s"), cada uno enlaza a su skill si existe |
| `SkillProgression` | Timeline vertical de pasos. **Los 2-3 primeros pasos visibles**; el resto en `ProgressionLockedCard` → "Progresión completa en la app" |
| `SkillMistakes` | Acordeón "errores comunes" |
| `AppCtaInline` | Botón de descarga / lista de espera |
| `NextSkillNav` | "Siguiente skill →" (prev/next según nivel) |

`SkillProgression` es el **puente web→app**: la web enseña lo suficiente para dar valor, la rutina
completa está en la app. Ese es el motor de conversión.

### 4.4 Tienda (`components/shop/` + `components/three/`)

| Componente | Notas |
|---|---|
| `ProductGrid` / `ProductCard` | Imagen estática por defecto (nunca 3D en el listado) |
| `ProductGallery` | Tabs: [3D] [Fotos]. El 3D es la pestaña por defecto solo en escritorio |
| `Product3DViewer` | `next/dynamic({ ssr:false })`, se monta con IntersectionObserver. Ver §5 |
| `ProductInfo` | Nombre, precio, descripción, variantes de color/talla |
| `SizeGuide` | `Dialog` de Radix con tabla de tallas |
| `BuyButton` | Enlace a la tienda externa o pedido por WhatsApp con el producto pre-rellenado |
| `ShippingInfo` | Acordeón envíos/devoluciones |

### 4.5 Códigos promo (`components/codes/`)

| Componente | Notas |
|---|---|
| `PromoCodeCard` | Logo de la marca, descuento, código, caducidad, botón copiar |
| `CopyCodeButton` | Copia + `Toast` de confirmación + evento de analítica. Estado `copiado` visible 2s |
| `PromoCodeFilters` | Por categoría (suplementos, ropa, material) |
| `BrandLogo` | Logo en contenedor de ratio fijo (evita CLS) |

Los enlaces de marca salen con `rel="sponsored noopener"` y `target="_blank"` — es un enlace de
afiliado, marcarlo así es lo correcto y lo que Google pide.

### 4.6 Blog (`components/blog/`)

`PostCard`, `PostHeader`, `PostBody` (MDX con componentes propios: `Callout`, `Figure`, `Table`, `VideoEmbed`),
`TableOfContents` (sticky en desktop, acordeón plegado en móvil), `RelatedPosts`, `ShareButtons`
(Web Share API en móvil, enlaces en desktop).

Categorías de arranque: **Nutrición**, **Material y equipo**, **Entrenamiento**, **Diario**.

### 4.7 UI compartida (`components/ui/`)

`Button` (variants: primary / secondary / ghost / whatsapp), `Badge`, `Card`, `Dialog`, `Sheet`,
`Accordion`, `Tabs`, `Toast`, `Skeleton`, `Carousel` (scroll-snap nativo + botones en desktop),
`SectionHeading`, `AspectImage`, `Container`.

### 4.8 Conversión (`components/shared/`)

| Componente | Detalle |
|---|---|
| `WhatsAppCta` | Construye `https://wa.me/<num>?text=<mensaje>`. El mensaje cambia según el contexto ("Hola, vengo de la web, me interesa X") y según el idioma. Dispara evento de analítica |
| `WaitlistForm` | Email + consentimiento + honeypot. Server Action. Estados: idle / enviando / éxito / error. El éxito no navega, se convierte en mensaje inline |
| `SocialLinks` | Instagram, TikTok, YouTube (opcional) desde `content/site.json` |
| `AppStoreBadges` | Placeholders deshabilitados hasta que la app exista, con tooltip "Próximamente" |

---

## 5. Producto 3D: cómo se hace bien en móvil **y** escritorio

**Motor:** `@react-three/fiber` + `@react-three/drei` (`OrbitControls`, `useGLTF`, `Stage`, `Environment`, `Html`).
Escogido sobre `<model-viewer>` porque ya estamos en React, se controlan mejor las luces/materiales y
se puede compartir el canvas entre productos.

**Reglas no negociables:**

1. **Carga diferida triple:** `next/dynamic` con `ssr:false` → el bundle 3D no toca el resto de la web;
   `IntersectionObserver` → no se monta hasta que se ve; en móvil, **además**, hace falta un toque
   explícito en "Ver en 3D".
2. **Presupuesto de modelo:** `.glb` ≤ 3 MB, ≤ 60k triángulos, texturas **KTX2/Basis** a 1024px,
   geometría con **Draco** o **meshopt**. Un `.glb` de 25 MB mata el móvil, sin excepciones.
3. **`frameloop="demand"`**: solo se renderiza cuando el usuario interactúa o el modelo autorrota.
   Ahorra batería, que es de lo que se queja la gente en móvil.
4. **DPR limitado:** `dpr={[1, 2]}` en escritorio, `dpr={[1, 1.5]}` en móvil.
5. **Controles:** `OrbitControls` con `enablePan={false}`, zoom acotado (`minDistance`/`maxDistance`),
   y **rotación limitada en el eje polar** para que no se vea el producto desde abajo. Autorrotación
   suave hasta la primera interacción; se detiene al tocar.
6. **Gestos en móvil:** el arrastre horizontal rota el modelo pero **no debe secuestrar el scroll
   vertical** de la página. Se resuelve dejando pasar el gesto vertical (`touch-action: pan-y` en el
   contenedor) — es el fallo número uno de los visores 3D en móvil.
7. **Estados:** `poster` (imagen estática, LCP) → `Skeleton` con progreso mientras carga → modelo.
   Nunca un canvas en blanco.
8. **Degradación en cascada:**
   - Sin WebGL, o `deviceMemory < 4`, o `saveData: true` → **secuencia 360°** (36 webp, arrastre
     horizontal). Misma sensación, 300 KB.
   - `prefers-reduced-motion` → sin autorrotación, el usuario rota si quiere.
   - JS deshabilitado → foto del producto y a otra cosa.
9. **Fase 2 (opcional):** AR en móvil. iOS necesita un `.usdz` aparte (Quick Look), Android usa
   Scene Viewer con el mismo `.glb`. Un botón "Ver en tu casa" que solo aparece si el dispositivo lo soporta.

---

## 6. Responsive: el contrato

Móvil **primero**, siempre. Breakpoints de Tailwind: `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`.

- **Objetivos de verificación:** 360×640 (Android pequeño), 390×844 (iPhone), 768 (iPad vertical),
  1280, 1920. Playwright hace captura en 360, 768 y 1440 en cada PR.
- **Táctiles ≥ 44×44 px** y separación ≥ 8px entre objetivos.
- **Nada de `100vh`** en móvil: `100svh` / `100dvh` (la barra del navegador se come el `vh`).
- **Tipografía fluida** con `clamp()` en display y headings; el body se queda en 16-18px fijo.
- **Contenedor:** ancho máx. 1280px, `padding-inline` de 16px (móvil) → 24 → 48.
- **Sin scroll horizontal jamás**: test automático que falla si `document.scrollWidth > clientWidth`.
- **Imágenes:** `next/image` con `sizes` explícito, AVIF/WebP, `priority` solo en el hero.
- **Hover ≠ funcionalidad:** todo lo que se revela con hover en escritorio es visible o pulsable en móvil.
- **Safe areas** de iOS en la `StickyCta` y en el footer.

## 7. Rendimiento (presupuesto por ruta)

| Ruta | JS inicial | LCP móvil (4G) | Notas |
|---|---|---|---|
| `/[locale]` | ≤ 180 KB | ≤ 2.5 s | Hero: poster como LCP, el vídeo entra después |
| `/skills/[slug]` | ≤ 140 KB | ≤ 2.0 s | Estático, clips en `preload="none"` |
| `/shop/[slug]` | ≤ 140 KB + 3D bajo demanda | ≤ 2.5 s | El chunk de three.js **nunca** entra en el bundle inicial |
| `/blog/[slug]` | ≤ 110 KB | ≤ 1.8 s | ISR |

CLS < 0.1 (ratios fijos en toda imagen/logo/canvas), INP < 200 ms.
CI: Lighthouse móvil en cada PR, falla por debajo de 90 en Performance o Accesibilidad.

## 8. Accesibilidad

Objetivo **WCAG 2.2 AA**. Contraste ≥ 4.5:1 (ojo con el texto sobre el vídeo del hero: lleva capa de
oscurecimiento medida, no "a ojo"). Navegación completa por teclado con foco visible. Un solo `<h1>`
por página y jerarquía real. Enlace "saltar al contenido". `prefers-reduced-motion` respetado en
**todas** las animaciones, incluido el scroll-scrub. Vídeos sin audio y sin autoplay con sonido.
Auditoría con la skill `web-design-guidelines` antes de cada merge.

## 9. SEO

- `generateMetadata` por ruta, con `alternates.languages` (es/en/x-default).
- `sitemap.ts` con las dos versiones de idioma de cada URL.
- JSON-LD: `Organization` + `Person` (el coach) en el layout; `HowTo` en cada skill; `Product` en cada
  producto; `Article` en cada post; `BreadcrumbList` en las rutas anidadas.
- OG dinámico con `opengraph-image.tsx` por skill, producto y post.
- **Regla de contenido:** el inglés es traducción real, no automática. Una traducción mala posiciona peor
  que no tener inglés.

## 10. Analítica y eventos

Vercel Analytics (sin cookies → **sin banner de cookies**, menos fricción y menos código).
Eventos propios a registrar:

`whatsapp_click` (con `source`: hero/contacto/sticky/producto) · `waitlist_submit` ·
`promo_code_copy` (con `brand`) · `product_3d_open` (con `product`) · `skill_view` (con `slug`) ·
`app_cta_click` · `locale_switch` (de → a).

Estos siete eventos responden a la única pregunta que importa el mes que viene: *¿qué sección trae clientes?*

## 11. Skills de Claude instaladas

| Skill | Cuándo se usa |
|---|---|
| `.claude/skills/taste-skill` | Al definir la dirección visual y al construir cada sección. Evita que la web parezca una plantilla |
| `.claude/skills/web-design-guidelines` | Auditoría de UI/accesibilidad antes de cerrar cada fase |
| `.claude/skills/scroll-world` | Solo para el hero cinemático. Genera las escenas con Higgsfield y monta el motor de scroll-scrub |

## 12. Lo que queda fuera a propósito (fase 1)

Carrito y pagos (la venta va a tienda externa o WhatsApp) · CMS · login de usuario · comentarios en el
blog · vídeos autoalojados pesados (van a Mux/Cloudflare Stream si crecen) · la app móvil (`/app` es
solo página de captación hasta que exista).
