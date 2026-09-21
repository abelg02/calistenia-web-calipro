@AGENTS.md

# CaliPro: landing de calistenia

Web real para CaliPro ("Calistenia Profesional"), un negocio de calistenia con 10 años de experiencia. Objetivo: conseguir clientes para el entrenamiento personalizado 1:1, vender merch, difundir los códigos de descuento y llevar a la futura app (rutinas, ejercicios y planes de pago).

**Estado (2026-09-21):** web funcionando en `/es` y `/en`: home (hero con recorrido por scroll, confianza, servicios, método, adelanto de skills, adelanto de tienda, códigos, CTA final), **páginas de skills** (`/[lang]/skills` y `/[lang]/skills/[slug]`, con "Siguiente skill") y **tienda** (`/es/tienda` · `/en/shop`, filtros por categoría, ficha de producto con galería/3D, tallas y pedido por WhatsApp), páginas legales provisionales. Faltan los datos pendientes (abajo), el blog, SEO final y el despliegue.

**Comandos:** `npm run dev` (desarrollo en http://localhost:3000) · `npm run build` · `npm run lint` · `node scripts/build-models.mjs` (regenera los `.glb` de muestra).

**Next.js 16:** cambia cosas respecto a versiones anteriores (`proxy.ts` en vez de `middleware.ts`, `images.qualities`, `PageProps`/`LayoutProps` globales). Antes de usar una API, consulta `node_modules/next/dist/docs/`.

## Documentos fuente (leer antes de trabajar)
- `ARQUITECTURA.md`: stack, mapa del sitio, estructura de carpetas, componentes por sección, responsive y fases.
- `COPY.md`: ángulo de diferenciación y copy de referencia en EN y ES.
- **Textos de la web:** `src/i18n/dictionaries/en.ts` (se escribe primero) y `es.ts` (adaptación). Nunca se escriben textos dentro de los componentes.
- **Datos (contacto, redes, códigos):** `src/config/site.ts`. **Skills:** `src/content/skills.ts` (datos de la antigua app de Abel en `VERT/`, ES + EN). **Productos:** `src/content/products.ts` (todos son muestra; precio y material pendientes). Rutas en `src/lib/routes.ts`; `/en/shop` es un rewrite de `/[lang]/tienda` en `next.config.ts`.
- `VERT/`: diseño y web antiguos de Abel ("VÉRTEX"), solo como referencia de estructura. No se copia su estética; está excluido de lint. El número de teléfono está en `site.phone` (hoy es un marcador `+34000000000`).
- `Assets/Logo`: logo (negro + oro). `Assets/Trabajo/cal1-3.png`: fotos del parque de barras. Son originales: se optimizan hacia `public/` y nunca se sirven desde `Assets/`.

## Stack y decisiones cerradas
- Next.js (App Router) + TypeScript + Tailwind v4. Despliegue en Vercel.
- Idiomas por **rutas** `/es` (por defecto) y `/en` con el i18n nativo de Next 16: `src/proxy.ts` redirige según el idioma del navegador y `src/i18n/` carga los diccionarios. Se descartó `next-intl` para no añadir dependencias en una one-page. No usar un toggle de idioma en el cliente.
- Home en una sola página + páginas de detalle para skills, productos y posts.
- Leads por **WhatsApp (principal) y llamada** (`tel:`, añadida a petición del usuario), además de email y redes. Sin formularios. Cada CTA abre WhatsApp con su propio mensaje prellenado en su idioma. Los enlaces se generan en `src/lib/contact.ts`.
- Productos 3D con `<model-viewer>` (`.glb`), cargado solo al llegar a la sección, con AR en móvil (`src/components/shop/ProductViewer3D.tsx`). Los modelos actuales (paralelas y bidón) son **muestras** generadas por código en `scripts/build-models.mjs`; sus portadas (`public/images/tienda/*-3d.jpg`) se renderizaron desde el propio modelo. Ropa de muestra: fotos generadas con APIMart con el logo real.
- Imágenes de las skills: figuras doradas al estilo de la figura del logo (APIMart), no fotos de personas.
- Diseño: tema oscuro único (marca negro + oro), paleta piedra natural (basalto, pizarra, granito, travertino, piedra pómez) + oro como único acento, esquinas rectas en todo, tipografía Archivo (condensada y en cursiva para titulares) + Geist Mono para códigos. Tokens en `src/app/globals.css`.
- Blog (futuro): MDX.
- Server Components por defecto. Solo son cliente las piezas interactivas (menú, idioma, filtros, galería, tallas, copiar código, visor 3D).
- Header y footer viven en `src/app/[lang]/layout.tsx`, dentro de `MotionProvider` (`MotionConfig reducedMotion="user"`). **No condicionar `initial`/`style` a `useReducedMotion()`**: el servidor no conoce esa preferencia y provoca errores de hidratación.
- Lo que se ve al cargar una página (títulos arriba del todo) no va dentro de `<Reveal>`: debe pintarse sin esperar a JavaScript.
- Al capturar con Playwright aparece un aviso de hidratación por `caret-color` en los inputs: lo inyecta Playwright, no es un fallo de la web.

## Reglas del proyecto
1. **No inventar datos.** Solo son reales: los 10 años entrenando, las fotos del parque, el logo y los servicios del briefing. Cualquier otro dato (nombre, contacto, precios, alumnos, materiales, códigos, ciudad) va como `[PENDING: …]` / `[PENDIENTE: …]` en ambos idiomas hasta que el usuario lo confirme. Un pendiente no se "rellena" con algo verosímil.
2. **Copy:** tono profesional y cercano, de tú, sin superlativos vacíos y **sin en dash ni em dash** (– —). Primero se escribe en inglés y luego se adapta al español de España con el mismo ángulo, sin traducir literalmente. Ángulo: "Las barras ya las tienes. Lo que te falta es el orden."
3. **Mobile-first:** diseñar a 375 px y comprobar en 360 / 390 / 768 / 1024 / 1440. Zonas táctiles de al menos 44 px, `svh`/`dvh` en el hero, carruseles con scroll-snap en móvil. Objetivo Lighthouse móvil ≥ 90.
4. **Marca:** negro + oro del logo. Evitar los looks por defecto de IA (degradados morados, glassmorphism en todo, tres tarjetas iguales).
5. **Imágenes:** con IA se pueden generar o retocar escenarios (parque, luz, más sol). **Nunca fotos de la persona** detrás de CaliPro: se usan solo fotos reales.
6. Páginas legales (aviso legal, privacidad, cookies) obligatorias: el sitio está dirigido a España/UE.
7. No hacer commits sin que el usuario lo pida.

## Skills del proyecto (`.claude/skills/`)
- `taste-skill` (design-taste-frontend): úsalo al diseñar o maquetar cada sección.
- `web-design-guidelines`: auditoría de accesibilidad y UX al terminar cada sección.
- `scroll-world`: hero cinemático opcional (fase 5). ⚠️ **Cuesta dinero real** (~27 $ por cadena vía Monid o créditos de Higgsfield) y requiere ffmpeg. **No ejecutarlo sin OK explícito del usuario.**

## Generación de imágenes y vídeo
- **Principal: APIMart**, con el skill global `apimart-generate` (`~/.claude/skills/apimart-generate/`). Es mucho más barato que Higgsfield. La clave está en la variable de entorno `APIMART_API_KEY`: nunca mostrarla ni escribirla en archivos. Borradores a `1k` y resultados en `Assets/generated/`. Cada llamada gasta dinero del usuario: antes de un vídeo o de más de 3 imágenes, decir el coste aproximado y pedir OK.
- **Higgsfield** (MCP + CLI + skills) también está instalado, pero la cuenta tiene 0 créditos. Solo se usa si el usuario lo pide.
- Úsalos para fondos, portadas del blog y mockups, nunca para fotos de la persona.
- Hero en uso: **recorrido por el parque controlado por el scroll** (`src/components/sections/HeroScroll.tsx`). 3 vistas reales del mismo parque (`cal1`, `cal3`, `cal2` reiluminadas: `Assets/generated/hero-cal1-sol.png`, `recorrido-b-cal3.png`, `recorrido-c-cal2.png`) unidas por 2 clips Seedance de 8 s (`recorrido-clip1/2.mp4`, el 2.º empieza en el último fotograma del 1.º) con un fundido de 0,3 s en la costura. Salida: `public/video/recorrido-parque.mp4` (1280 px, GOP 12) y `recorrido-parque-movil.mp4` (960 px, GOP 6); los GOP cortos hacen falta para que el scrub sea fluido. Coste total: ~1,40 $.
- Motion: para valores ligados al scroll usa `useTransform` con **función**, no con rangos; con rangos Motion delega en ScrollTimeline nativo y la opacidad se desincronizó.
- Para reencodar vídeo hace falta ffmpeg (no está instalado en el sistema; se usó `ffmpeg-static` de npm fuera del proyecto).
- `kits-webs-3d/` es un kit externo del usuario (webs 3D con Higgsfield). No forma parte de la web; está excluido de lint.

## Sobre el usuario
Abel habla español y no es experto en web ni en marketing: prefiere que se le **recomiende una opción con su porqué** en lugar de recibir listas de alternativas. Responder en español.

## Datos pendientes del usuario
Nombre del titular · **número de teléfono/WhatsApp** · email · formato, ciudad y precio del 1:1 · precios de la app · productos del merch (nombre, material, tallas, precio, modelos 3D reales) · caducidad de los códigos y confirmar el enlace de Tutempire · confirmar las skills · dominio.

**Ya confirmados:** Instagram `@pedrohr_2`, TikTok `@phr_02`, Zumub `PHRSW2` (10 %, zumu.be/vipphrsw2), Tutempire `PHRSW25` (25 %).
