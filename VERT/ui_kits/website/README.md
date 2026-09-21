# UI Kit — Marketing Website

Full single-page marketing site for VÉRTEX. Built with vanilla HTML + the design tokens from `../../colors_and_type.css` and `site.css`.

## Sections (in order)

1. **Nav** — sticky, transparent → frosted on scroll. Wordmark left, links centered, account + CTA right.
2. **Hero** — full-bleed cinematic image (Unsplash placeholder; user should swap for owned video loop), centered editorial display title `Domina tu cuerpo.`, two CTAs, scroll hint with animated rule.
3. **Skills** — 5-column hairline grid: One Arm Handstand, Planche, Front Lever, Human Flag, Maltese. Each card has skill code (mono), serif name, difficulty dots in ember.
4. **Plataforma** — 5-item numbered list of platform advantages + a stylized macOS-style dashboard mockup with a holds card and a 12-week volume chart.
5. **Manifiesto** — surface flips to bone (warm paper). Editorial pull-quote, two-column body, mono signature.
6. **Método** — three numbered hairline cards: Posición, Densidad, Registro.
7. **Diario** — magazine-style: one feature article + four list items with thumbnails.
8. **Tienda** — surface flips to bone again. 4-product grid, luxury minimal (no add-to-cart on the grid).
9. **App** — two phone mockups (today's session + roadmap) with copy and "Próximamente" badges.
10. **Contacto** — split: contact channels left, hairline-only form right. Form submits to a no-op state change.
11. **Footer** — huge wordmark, newsletter inline, four columns of links, fine print bar.

## Files

- `index.html` — the complete site
- `site.css` — site-specific component styles (nav, hero, sections, cards, footer)

## Notes

- All photography is currently linked from Unsplash as placeholders. **Replace with owned cinematic content** before launch. Hero should ideally be a 8–12s muted video loop (`<video autoplay muted loop playsinline>`).
- The site uses the design system tokens directly — no hardcoded colors, type sizes, or spacing values.
- Responsive breakpoints: 1100, 1000, 900, 800, 700, 600 px. Single-column collapse below 700.
- Accessibility: all sections are `<section>` with `id`, the form has labels, contrast verified for WCAG AA on both ink and bone surfaces, `prefers-reduced-motion` respected (handled in `colors_and_type.css`).
