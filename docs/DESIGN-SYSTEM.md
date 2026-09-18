# Design system — actual implementation

Inspected 19 September 2026. This documents the current cascade, not a proposed redesign. Public pages load `styles.css`, then `academic.css`, navigation/Skills Lab overrides, scholarship styles and any relevant page-specific assets. Earlier base tokens are overridden; changing only the first declaration may have no effect.

## Colour and theme

| Semantic token | Light academic theme | Dark academic theme |
| --- | --- | --- |
| Page (`--light`) | `#f3f5f2` | `#080c0c` |
| Surface | `#ffffff` | `#111817` |
| Strong surface | `#e7eeea` | `#16211f` |
| Primary text (`--dark`) | `#0f1715` | `#f4f7f1` |
| Secondary text (`--darkgray`) | `#22312c` | `#c7d0ca` |
| Muted text (`--gray`) | `#52615b` | `#93a09c` |
| Border (`--lightgray`) | `#c8d2cb` | `#1f2b2a` |
| Green accent (`--secondary`) | `#1f5f58` | `#5eead4` |
| Secondary accent (`--tertiary`) | `#2d6e67` | `#a7f3d0` |

Warm/categorical accents remain: post, essay, guide and presentation colours, with muted red, green, blue and gold variants in each theme. Green marks links, focus, small borders and the movement visual sparingly. Avoid assuming decorative border contrast qualifies it as a form-control boundary.

`data-theme` on the root switches tokens. `script.js` uses `portfolio-theme-v2`, falling back to the operating-system preference. Storage failure now leaves controls functional but cannot persist a preference. Student and game themes have separate scripts; the public switch is not a universal cross-shell setting.

## Typography and dimensions

The base root is 18px. Font variables are Outfit for headings/UI, Crimson Pro for reading, and JetBrains Mono for code, with system/Georgia/monospace fallbacks. Academic body styling uses the title/UI font; individual reading surfaces override it. Chinese root-language rules select Noto Sans TC or SC. Google Fonts are external and fallback rendering must remain usable.

There is no single formal spacing scale. Repeated gaps/padding use .5, .75, 1, 1.25, 1.5 and 2rem with responsive `clamp()` values. `.academic-page` is capped at 1120px with horizontal padding `clamp(1rem,4vw,3.5rem)`; prose limits also use ch/rem (commonly 60–72ch). Specialist layouts have their own widths; do not force the game board into the article width.

## Components

Cards use semantic surface backgrounds, 1px borders and predominantly 6px or 8px corners (`--radius-sm` / `--radius-md`). Some pills have 999px radii. Grid cards typically use 1–1.5rem gaps and collapse at component breakpoints. Existing shadows include `--shadow-soft`: 0 16px 38px with 18% black in dark mode or 12% dark green in light mode; mobile navigation has its own lateral shadow. Not all cards use shadows.

Buttons/links reuse `.primary-link`, `.secondary-link` and icon buttons where the page does so; standalone games retain their own controls. Focus is normally a 2px accent outline with 2px offset; Skills Lab/navigation links explicitly use 3px/3px. Preserve native buttons, labels and disabled states. Search now traps Tab within its open overlay and Escape restores opener focus; mobile menu uses `inert`, expanded state and its own focus loop.

Public desktop navigation has two rows at wide widths. The Phase 4 override switches to the fixed mobile menu at 1200px, avoiding compressed nine-item text. Student Login and all three language names remain exposed. This override lives in `assets/css/skills-lab.css`, so that stylesheet is intentionally global on generated public pages.

## Motion

Public reveal effects use IntersectionObserver, `data-reveal`, `reveal-ready` and `is-visible`; items reveal once. Without JavaScript, observer support or with reduced motion, content remains readable. CSS removes transitions/animations for reduced motion. Reading-progress work is passive and requestAnimationFrame-batched.

Teaching alone loads `assets/css/movement-feature.css` and `assets/js/movement-feature.js`. Its decorative side-view SVG is hidden from assistive technology and accompanied by explanatory copy. It is an illustrative walking loop, not biomechanically precise assessment. A visible pause/resume control supports stopping motion. Without JS it is a useful static pose.

One parallax location moves the movement backdrop at factor .18, clamped to ±18px. It uses a passive listener and a single pending animation frame, suspends offscreen/in hidden tabs, and has no continuous JS animation loop. Reduced-motion preference disables walking and parallax, including live preference changes. No animation library, GIF/video or fixed mobile background is used.

## Responsive rules and Skills Lab relationship

The cascade contains historical component breakpoints at 1480, 1000, 900, 760, 720, 620 and 520px; they are not a unified token system. Current public navigation is overridden at 1200px; Skills Lab categories collapse at 600px; the movement block at 680px. Media's capped 720px card preserves a 16:9 frame at every width. Validate cascade outcomes at 390, 768, 1024 and 1440px instead of reasoning from one rule alone.

Skills Lab's central page and Mobility overview share the public academic shell and tokens. Student login/dashboard and playable games have purpose-specific shells, board dimensions and assets. Public discovery, authenticated progress and clinical gameplay are distinct layers. Mobility's dashed/in-development treatment must not imply playability.

## Accessibility limits

Token contrast is checked in Phase 8 alongside focused keyboard tests; that is not full WCAG certification. SVG/game spatial tasks, third-party iframe accessibility, external font loading, device/browser differences and untranslated content still need human review. Preserve meaningful alt text, intrinsic image dimensions and explicit reduced-motion behaviour when adding content.
