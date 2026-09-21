---
name: vertex-design
description: Use this skill to generate well-branded interfaces and assets for VÉRTEX, a premium calisthenics brand and training platform — for production code, prototypes, mocks, slides, or any visual artifact. Contains the full design system: tokens, type, color, voice, components, and UI kits for both the marketing site and the mobile app.
user-invocable: true
---

# VÉRTEX design skill

Read `README.md` first. It defines the brand: editorial fashion meets Apple restraint meets Equinox-grade fitness. Quiet luxury, cinematic, demanding. Not a SaaS. Not "wellness". A discipline brand.

## Files

- `README.md` — brand context, content fundamentals, visual foundations, iconography
- `colors_and_type.css` — every design token (color, type, spacing, motion). Import on every artifact.
- `assets/` — wordmark, mark, grain texture
- `preview/` — small HTML cards showing each token / component in isolation
- `ui_kits/website/` — full marketing site (hero, skills, plataforma, manifiesto, método, diario, tienda, app, contacto, footer)
- `ui_kits/app/` — mobile app preview (Hoy + Roadmap screens)

## How to use

If creating visual artifacts (slides, mocks, throwaway prototypes), copy `colors_and_type.css`, `assets/grain.svg`, and `assets/wordmark.svg` into the artifact's folder and link them. Reference the component patterns in `ui_kits/website/index.html` for editorial layout, hairline-only chrome, and the brand period.

If working on production code, lift the tokens from `colors_and_type.css` into the project's CSS variable scope. Substitute `Instrument Serif` / `Geist` / `JetBrains Mono` (Google Fonts) for the user's actual licensed faces if available (`PP Editorial New`, `Söhne`, `ABC Diatype`).

## Hard rules — never break these

- **One accent color only:** ember `#C2553A`. Never gradients. Never additional brand colors.
- **No emoji. No exclamation marks. No "transforma tu vida".** Castellano, tutea, surgical sentences.
- **The brand period:** every section title and the wordmark end with `.` in ember.
- **Imagery is grayscale or warm-desaturated, with grain.** No chrome dumbbells, no smiling group classes, no supplement shots, no stock-photo gym clichés.
- **Hairlines only.** 1px. No drop shadows on the website. No double borders. No pill buttons.
- **No bounces, no springs, no elastic motion.** Easing is `cubic-bezier(0.22, 1, 0.36, 1)`, durations 250–1200ms.
- **Skills (One Arm Handstand, Planche, Front Lever, Human Flag, Maltese) stay in English** — they are proper nouns of the discipline.

## When invoked without guidance

Ask the user what they want to build, ask 3–5 focused questions about scope and audience, then produce HTML artifacts or production code as an expert designer working within these constraints.
