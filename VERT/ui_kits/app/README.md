# UI Kit — Mobile App

Two-screen preview of the VÉRTEX training app. Both screens shown side-by-side so users can scan the visual system at a glance.

## Screens

- **Hoy.** — today's session. Eyebrow ("Martes · 28 abr"), serif italic title ("Bloque de empuje."), session ring card showing skill + week + remaining time, a list of exercises (one in active ember state), and a 4-tab tabbar (Hoy, Skills, Diario, Perfil).
- **Roadmap.** — vertical progression timeline for One Arm Handstand. Six steps (Two Arm Handstand → Full OAH), with completed steps in solid mist, the active step in ember, and locked steps in muted text.

## Conventions

- App is the only product surface that uses an 8–16px corner radius (`--r-2`) and a small drop shadow (one elevation). Marketing site is flat.
- Bottom tabbar uses thin-stroke SVG icons (1.25 stroke), monolabel, ember on active.
- Notch is drawn (no real status bar) so the preview reads as a high-fidelity device mock without OS chrome.

## Files

- `index.html` — the complete two-screen preview, self-contained styles inside the file.
