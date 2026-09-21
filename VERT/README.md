# VÉRTEX — Design System

> *Working name. The brand mark, real wordmark, and final logo are placeholders — to be replaced once the user finalizes naming.*

VÉRTEX is a premium calisthenics brand and training platform. The system covers a marketing website, a companion mobile training app (skill roadmaps, routines, progression tracking), an editorial blog/journal, and a small streetwear merchandising line (hoodies, compression shirts, grips, wrist wraps).

The brand sits at the intersection of **editorial fashion magazine**, **Apple-grade restraint**, and **Equinox-style premium fitness**. It is not a SaaS, not a tech startup, not a "wellness" brand. It is a discipline brand — quiet, cinematic, demanding.

---

## Sources & inputs

- No codebase, Figma, brand book, or font files were attached.
- The product context comes entirely from the user's brief (Spanish, Spain): premium calisthenics platform, mobile app exists in development (skills like One Arm Handstand, Planche, Front Lever, Human Flag, Maltese), merchandise, blog updated bi-weekly with nutrition/technique articles.
- All visual/verbal decisions were made for this project and are documented below — they are recommendations the user can edit.

---

## Index

| File | What it is |
|------|------------|
| `README.md` | This file. Brand fundamentals, content voice, visual rules. |
| `colors_and_type.css` | All design tokens (color, type, spacing, radii, motion). |
| `fonts/` | Webfont licenses + `@font-face` references (Google Fonts CDN — see TYPOGRAPHY note). |
| `assets/` | Logo lockups, icon set, photography placeholders, grain texture. |
| `preview/` | Design system cards (one HTML per concept) shown in the Design System tab. |
| `ui_kits/website/` | Full marketing website — hero, skills, platform, manifesto, methodology, journal, shop, app, contact, footer. |
| `ui_kits/app/` | Mobile app screen — skill roadmap, today's session, progression. |
| `SKILL.md` | Cross-compatible skill manifest for reusing this system. |

---

## CONTENT FUNDAMENTALS

### Voice

**Castellano (Spain), formal-but-direct, editorial, no marketing slop.**

- **Tutea, no usted.** ("Empieza", "tu cuerpo", "entrena").
- **Phrases are short. Sentences are surgical.** Hemingway-meets-Vogue.
- **Nothing aspirational-empty.** Banned forever in this brand: *"transforma tu vida"*, *"unlock your potential"*, *"conviértete en la mejor versión de ti"*, *"comunidad"* used as a sales word, *"viaje"* as in fitness journey.
- **Earned, never promised.** "Domina tu cuerpo" is fine. "Cambiamos tu vida" is not.
- **No exclamation marks. Ever.** Period.
- **No emoji.** Anywhere. The system is silent.
- **Numerals over words for measurements.** "12 semanas", "3 series", "2 min". Spell out small counts in body prose: "tres skills fundamentales".
- **Acentuation is mandatory.** "Vértex", "técnica", "método", "rutinas" — never strip diacritics.
- **Title case is reserved for skills (One Arm Handstand, Planche, Front Lever, Human Flag, Maltese).** Skills are proper nouns and stay in English — they're the lingua franca of calisthenics.
- **Sections use single-word or two-word labels.** "Skills.", "Método.", "Diario.", "Tienda.", "App." — always with a closing period. The period is part of the brand mark.

### Sample copy (use these, adapt freely)

| Surface | Copy |
|---|---|
| Hero H1 | *Domina tu cuerpo.* |
| Hero sub | Entrenamiento de calistenia estructurado. Skills reales, progresión medida, sin atajos. |
| Hero CTA primary | Explorar skills |
| Hero CTA secondary | Cómo entrenamos |
| Skills section eyebrow | (none — a single period: `.`) |
| Skills section title | Cinco movimientos. Una vida de práctica. |
| Platform section | Un sistema, no una app más. |
| Manifesto opener | No vendemos transformación. Enseñamos un oficio. |
| Shop section | Equipo. Hecho para entrenar, no para fotografiarse. |
| Contact | Escríbenos. Respondemos en 48 horas. |
| Newsletter | Una carta cada dos semanas. Técnica, lecturas, una sesión. Cero ruido. |

### What we never write

- "Revoluciona", "potencia", "desbloquea", "boost", "game-changer".
- "AI-powered", "smart", "next-gen", "futuro del fitness".
- Stats invented for hero credibility ("+10.000 atletas", "98% éxito"). If we don't have the number, we don't show one.
- Stock-photo gym clichés (chrome dumbbells, smiling group classes, supplement scoops).

---

## VISUAL FOUNDATIONS

### Color

A radically restricted palette. Three foundations + one accent.

| Token | Value | Use |
|---|---|---|
| `--ink` | `oklch(13% 0.005 50)` (`#0E0D0B`) | Primary background. Cinematic black with the faintest warm cast — never pure `#000`. |
| `--ink-2` | `oklch(18% 0.006 50)` (`#16140F`) | Elevated surfaces, cards on dark. |
| `--bone` | `oklch(95% 0.01 80)` (`#F1ECE2`) | The "respiro claro" — light mode background, contrasting sections. Warm paper, not white. |
| `--bone-2` | `oklch(89% 0.012 80)` (`#E0D8C8`) | Card surface on bone. |
| `--ember` | `oklch(58% 0.12 40)` (`#C2553A`) | **The single accent.** Oxidized copper / dried blood. Used sparingly for the brand period (`.`), one CTA fill, one hover state, one underline. Never as a gradient. |
| `--ash` | `oklch(55% 0.005 60)` | Body text on bone. Mid-grey, warm. |
| `--mist` | `oklch(72% 0.005 60)` | Body text on ink. Soft, never pure white. |
| `--line` | `oklch(28% 0.006 50)` on ink / `oklch(82% 0.012 80)` on bone | Hairlines. Always 1px, never thicker. |

**Rules:**
- Sections alternate `ink` / `bone`. Two backgrounds, no more.
- `--ember` appears at most twice per fold. It's a punctuation mark, not a wallpaper.
- No gradients used as decoration. The only gradient allowed is a `radial-gradient` *protection wash* on cinematic imagery so text stays readable.
- Imagery is **black and white with a subtle warm grade**, never saturated.

### Typography

**Display:** *Instrument Serif* (Google Fonts) — italic-leaning editorial serif for hero, section titles, manifesto pull-quotes. Used at huge sizes (clamp 4rem → 9rem). Letter-spacing tight (`-0.02em`).

**Body & UI:** *Geist* (Google Fonts) — neutral, modern grotesque. Replaces the more obvious Inter/Söhne defaults. Used at 15–18px body, 13px small labels.

**Mono:** *JetBrains Mono* — micro-labels (timer, set counter, skill code "OAH-01"), spec sheets.

> **SUBSTITUTION FLAG:** No font files were provided. I'm using Google Fonts equivalents (Instrument Serif, Geist, JetBrains Mono). If the user owns licenses for *PP Editorial New*, *Söhne*, or *ABC Diatype*, replace the `@font-face` block in `colors_and_type.css` and drop `.woff2` files into `fonts/`.

**Scale (mobile-first, clamp-based):**
- Hero display: `clamp(3.5rem, 9vw, 8.5rem)`, italic, line-height 0.95
- H2 section: `clamp(2.25rem, 4vw, 3.75rem)`, italic, line-height 1.0
- H3 card: `1.5rem`, regular roman, line-height 1.15
- Body: `1.0625rem` / `1.125rem`, line-height 1.55, max measure 62ch
- Eyebrow / micro: `0.75rem`, JetBrains Mono, `letter-spacing: 0.18em`, uppercase

**The brand period.** Every section title and the wordmark ends with `.` rendered in `--ember`. This is the single most repeated brand signature.

### Spacing & layout

- **Base unit: 8px.** Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256.
- Sections separated by `clamp(96px, 14vh, 192px)` vertical padding. Cinematic, not cramped.
- Container max-width: 1440px. Editorial gutters (96px desktop / 24px mobile).
- 12-column grid, with **deliberate asymmetry** — content rarely fills all 12 columns. A title in cols 2-7, an image in cols 8-12 is the default rhythm.
- Hairlines (1px, `--line`) replace boxes wherever possible. The system is built on rules, not borders.

### Corner radii

- **Almost zero radius is the brand.** `--r-0: 0` is the default.
- `--r-1: 2px` for inputs and small chips.
- `--r-2: 8px` for product cards (shop) and app screens only.
- **Never** pill buttons. Never circle avatars (squares, slightly rounded).

### Shadows & elevation

- **No drop shadows** on the website. Elevation is communicated through background contrast (ink on ink-2) and 1px hairlines.
- The mobile app gets one shadow: `0 1px 0 rgba(0,0,0,0.04), 0 24px 60px -32px rgba(0,0,0,0.18)` for floating sheets.

### Borders

- 1px hairlines only. Color: `--line`.
- No double borders, no inset borders.
- Buttons: 1px border on outline variant; no border on filled variant.

### Backgrounds & atmosphere

- **Grain overlay** (`assets/grain.svg`) at 4% opacity on every dark section. The defining texture of the brand — analogue, not digital.
- **Cinematic photography** (full-bleed, 16:9 or vertical 9:16) with a `radial-gradient(ellipse at center, transparent 30%, var(--ink) 95%)` protection wash for text legibility.
- **No mesh gradients. No glassmorphism. No glows.**
- **Loop video in hero** — slow, 8-12 second cinematic loop of a single skill (one-arm handstand hold). Grayscale, slight contrast bump. Muted, autoplay, loop, `playsinline`.

### Motion

- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` — slow-out, very long. Premium feel.
- **Durations:** 600ms for reveals, 400ms for hover, 250ms for micro.
- **Scroll-driven:** title characters fade-up sequentially as the section enters viewport (CSS `animation-timeline: view()` where supported, IntersectionObserver fallback).
- **Image scale-in:** images enter at `scale(1.05)` and ease to `scale(1.0)` over 1.2s — extremely subtle parallax.
- **Hover:** images darken via `filter: brightness(0.7)` + a thin `--ember` underline appears under the title. No transforms on hover for product cards (luxury rule: no bouncing).
- **Press:** `opacity: 0.7`, no scale. Discipline, not playfulness.
- **No bounces, no springs, no elastic.** Ever.

### Imagery direction

- B&W or warm desaturated. Grain. Always shot indoors against textured walls (concrete, plaster) or against pure black void.
- Bodies in motion mid-skill — never finished, never smiling at camera.
- Negative space dominates. The athlete is small in frame.
- Banned: chrome dumbbells, gym mirrors, supplement product shots, "lifestyle" coffee-and-laptop, group classes.

### Iconography

- **Phosphor Icons** (CDN: `@phosphor-icons/web`) at *Light* weight only (`ph-thin`). Linework matches the editorial aesthetic.
- 16px or 20px, `currentColor`, never filled.
- **No emoji. No unicode glyphs as icons.**
- The brand period (`.`) is the only "icon-character" used.

See `assets/` for: `logo-vertex.svg`, `wordmark.svg`, `grain.svg`, photography placeholders. Phosphor is loaded via CDN in HTML files (no local copy needed).

---

## Component patterns (covered by `ui_kits/website/`)

- `Nav` — split nav: wordmark left, three links centered, account/CTA right. Sticky, 64px tall. Becomes 56px + frosted on scroll.
- `Hero` — full-bleed video loop, centered editorial display title, two CTAs.
- `SkillCard` — 3:4 image card, skill name in serif italic, difficulty as 1-5 dots, `OAH-01` style code in mono.
- `PlatformMockup` — laptop frame containing a stylized dashboard.
- `ManifestoBlock` — large pull-quote, byline-style attribution.
- `MethodStep` — numbered (01, 02, 03) editorial step with hairline rule.
- `JournalCard` — magazine article preview: image, category in mono, headline in serif, dek in body.
- `ProductCard` — 4:5 product image, name, price, *no* "add to cart" button on grid (luxury — click into product).
- `AppPromo` — phone frame with app screen, copy beside.
- `ContactForm` — three fields, hairline-only inputs, single button.
- `Footer` — wordmark large, four columns of links, newsletter inline, fine print.

## Component patterns (covered by `ui_kits/app/`)

- `AppHeader` — title + back chevron.
- `SkillRoadmap` — vertical timeline of progressions (Tuck Planche → Adv Tuck → Straddle → Full).
- `SessionCard` — today's session with exercises, sets, rest.
- `ProgressRing` — single circular ring for skill mastery %.
- `TabBar` — 4 tabs: Hoy, Skills, Diario, Perfil.
