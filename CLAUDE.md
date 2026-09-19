# CaliPro — reglas del proyecto

Landing page de un negocio real de calistenia. Bilingüe (es/en), móvil y escritorio.

Lee antes de tocar nada: `docs/ARCHITECTURE.md`, `docs/CONTENT-MODEL.md`, `docs/ROADMAP.md`.

## Stack

Next.js (App Router, RSC) · TypeScript `strict` · Tailwind v4 · next-intl · Radix UI ·
Framer Motion + GSAP (solo hero) · @react-three/fiber (solo tienda) · MDX + Zod · Vercel.

## Reglas

- **Server Components por defecto.** `'use client'` solo donde hay interacción real, y lo más abajo
  posible del árbol.
- **Móvil primero.** Cada componente se piensa a 360px antes que a 1440px.
- **Nada de texto incrustado en los componentes.** UI → `src/messages/{es,en}.json`;
  contenido → `content/`. Un string en castellano dentro de un `.tsx` es un bug.
- **Rutas siempre con `Link`/`useRouter` de `lib/i18n/navigation`**, nunca los de `next/link` —
  si no, se pierde el idioma.
- **El 3D y GSAP nunca entran en el bundle inicial.** `next/dynamic` con `ssr: false`, siempre.
- **Toda animación respeta `prefers-reduced-motion`.**
- **Sin scroll horizontal** en ninguna anchura.
- Objetivos táctiles ≥ 44px. `100svh`/`100dvh`, nunca `100vh`.
- Validar el contenido con Zod en build: mejor que falle el build que la web.

## Skills disponibles (`.claude/skills/`)

- `taste-skill` — dirección de diseño al construir secciones. Evitar estética de plantilla.
- `web-design-guidelines` — auditoría de UI/accesibilidad antes de cerrar cada fase.
- `scroll-world` — solo para el hero cinemático (fase 3).

## MCP

`higgsfield` está declarado en `.mcp.json` (scope de proyecto), así que viaja con el repositorio.
El archivo solo guarda la URL, nunca credenciales: cada máquina se autentica por su cuenta con `/mcp`.

Se usa **fuera del runtime**, para producir assets (clips del hero, renders, portadas). La salida se
optimiza y se commitea en `public/`. La web no llama a Higgsfield en runtime.

## Presupuestos que no se negocian

LCP móvil ≤ 2.5s · CLS < 0.1 · INP < 200ms · JS inicial del home ≤ 180 KB ·
Lighthouse móvil ≥ 90 en Performance y Accesibilidad.
