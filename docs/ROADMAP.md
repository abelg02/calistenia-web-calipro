# CaliPro — Plan de construcción

Cada fase termina con algo desplegado y visible. Nada de "todo o nada".

---

## Fase 0 — Base (sin diseño todavía)

- `create-next-app` con TypeScript, Tailwind v4, App Router, ESLint + Prettier.
- `next-intl`: `routing.ts`, `request.ts`, `navigation.ts`, `middleware.ts`, `app/[locale]/layout.tsx`.
- `pathnames` traducidos (`/es/tienda` ↔ `/en/shop`).
- Esquemas Zod de `content/` + cargadores en `lib/content/`.
- Tokens de diseño en `globals.css` (`@theme`): color, tipografía, espaciado, radios, sombras.
- `Container`, `Button`, `SectionHeading`, `Header` y `Footer` mínimos.
- Deploy a Vercel con dominio provisional. **Resultado: dos URLs vivas, `/es` y `/en`.**

## Fase 1 — La landing completa, sin 3D y sin cinemática

- Todas las secciones del home con contenido real (§4.2 de `ARCHITECTURE.md`), hero con imagen fija.
- `/skills` + las 5 páginas de detalle.
- `/codes` con copiado funcionando.
- `/blog` con 2-3 posts reales.
- `/shop` con fotos (aún sin 3D).
- `/app` con la lista de espera funcionando de verdad (Resend).
- WhatsApp operativo en hero, contacto y barra fija móvil.
- Auditoría con `web-design-guidelines` + Lighthouse móvil.

**Aquí la web ya sirve para el negocio.** Todo lo que viene después suma, no desbloquea.

## Fase 2 — 3D en la tienda

*(Requiere el MCP de Higgsfield desde tu Claude Code local.)*

- Producción de modelos: foto/render → `.glb` → **optimizar sí o sí** (`gltf-transform`: Draco +
  KTX2 + resize a 1024).
- `Product3DViewer` con las reglas de §5 de `ARCHITECTURE.md`.
- Secuencia 360° de respaldo generada desde el mismo `.glb` (36 frames webp).
- Pruebas en un Android de gama baja real, no solo en el simulador. Si un modelo tarda más de 3s
  en móvil, se reduce el modelo — no se acepta.

## Fase 3 — Hero cinemático (`scroll-world`)

- Guion de 4-5 escenas (calle → parque de calistenia → interior del gimnasio → app).
- Generación de clips con Higgsfield vía la skill `scroll-world`.
- Motor de scroll-scrub, con variante ligera para móvil y desactivación con `prefers-reduced-motion`.
- Regla: si el hero cinemático empeora el LCP móvil por encima de 2.5s, **el móvil se queda con el
  poster**. La cinemática es un lujo, la velocidad no.

## Fase 4 — Crecimiento

- Más posts (el blog es lo que trae tráfico orgánico sostenido).
- Más skills.
- Conexión con la app: badges reales de App Store / Google Play, deep links por skill.
- Newsletter sobre la lista ya capturada.
- Opcional: AR en productos, tienda propia con pagos.

---

## Lo que hace falta de tu amigo (cuanto antes, mejor)

| Dato | Se usa en | Bloquea |
|---|---|---|
| Número de WhatsApp (internacional) | CTA principal de toda la web | Fase 1 |
| Email de contacto | Sección de contacto, legal | Fase 1 |
| URLs de Instagram y TikTok | Redes, footer | Fase 1 |
| Bio + foto suya | `AboutCoach` | Fase 1 |
| Logo y colores de marca (o libertad para definirlos) | Tokens de diseño | Fase 0 |
| **Los códigos promo** (marca, código, descuento, enlace, caducidad, logo) | `/codes` | Fase 1 |
| Las 5 skills que quiere destacar + su progresión real | `/skills` | Fase 1 |
| Fotos de producto y precios | `/shop` | Fase 1 |
| Datos fiscales (nombre, NIF, dirección) | Aviso legal y privacidad — **obligatorio en España** si se recogen emails | Fase 1 |
| Modelos 3D o fotos para fotogrametría | Visor 3D | Fase 2 |
| Texto en inglés (o presupuesto para traducirlo bien) | Versión `en` | Fase 1 |

> Sobre el último punto: si no hay traducción humana, es mejor lanzar **solo en español** y añadir el
> inglés después. Una versión en inglés mal traducida posiciona peor que no tenerla, y da mala imagen
> justo en el mercado al que quieres llegar.
